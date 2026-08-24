import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Connect, Plugin } from 'vite'
import type { CmsEnv, KvNamespace } from '../shared/cms.ts'
import { routeCmsRequest } from '../shared/handlers.ts'

/**
 * Local stand-in for Cloudflare KV, backed by a folder that is git-ignored.
 * It only needs the handful of methods shared/handlers.ts actually calls.
 */
function fileKv(directory: string): KvNamespace {
  mkdirSync(directory, { recursive: true })
  const file = (key: string) => resolve(directory, encodeURIComponent(key))

  return {
    async get(key) {
      try {
        return readFileSync(file(key), 'utf8')
      } catch {
        return null
      }
    },
    async getWithMetadata(key) {
      try {
        const value = readFileSync(file(key))
        let metadata = null
        try {
          metadata = JSON.parse(readFileSync(`${file(key)}.meta`, 'utf8'))
        } catch {
          /* no metadata stored */
        }
        return {
          value: value.buffer.slice(value.byteOffset, value.byteOffset + value.byteLength),
          metadata,
        }
      } catch {
        return { value: null, metadata: null }
      }
    },
    async put(key, value, options) {
      writeFileSync(
        file(key),
        typeof value === 'string' ? value : Buffer.from(new Uint8Array(value)),
      )
      if (options?.metadata) {
        writeFileSync(`${file(key)}.meta`, JSON.stringify(options.metadata), 'utf8')
      }
    },
    async delete(key) {
      rmSync(file(key), { force: true })
      rmSync(`${file(key)}.meta`, { force: true })
    },
  }
}

/** Rebuilds a WHATWG Request from Node's incoming message. */
async function toRequest(message: Connect.IncomingMessage, origin: string): Promise<Request> {
  const chunks: Buffer[] = []
  for await (const chunk of message) chunks.push(chunk as Buffer)
  const body = Buffer.concat(chunks)
  const method = message.method ?? 'GET'

  return new Request(new URL(message.url ?? '/', origin), {
    method,
    headers: message.headers as Record<string, string>,
    body: method === 'GET' || method === 'HEAD' ? undefined : body,
  })
}

/**
 * Serves the same /api/* contract as the Cloudflare Pages Functions, so
 * `npm run dev` behaves exactly like the deployed site — including the admin.
 */
export function devCmsApi(env: Record<string, string | undefined>): Plugin {
  return {
    name: 'asfc-dev-cms-api',
    apply: 'serve',
    configureServer(server) {
      const cms: CmsEnv = {
        ASFC_KV: fileKv(resolve(server.config.root, '.dev-data')),
        // Dev-only defaults so the admin works straight after `npm run dev`.
        ADMIN_PASSWORD: env.ADMIN_PASSWORD || 'admin',
        AUTH_SECRET: env.AUTH_SECRET || 'local-development-secret',
      }

      server.middlewares.use('/api', async (message, res) => {
        const origin = `http://${message.headers.host ?? 'localhost'}`
        const request = await toRequest(message, origin)
        // Connect has already stripped the /api prefix from `message.url`.
        const path = new URL(request.url).pathname.replace(/^\/api/, '') || '/'
        const response = await routeCmsRequest(request, cms, path)

        res.statusCode = response.status
        response.headers.forEach((value, key) => res.setHeader(key, value))
        res.end(Buffer.from(await response.arrayBuffer()))
      })
    },
  }
}
