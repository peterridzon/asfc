import type { CmsEnv } from '../shared/cms'
import { routeCmsRequest } from '../shared/handlers'

/**
 * The ASFC API.
 *
 * Static files are served straight from Cloudflare's asset store; this Worker
 * is only invoked for `/api/*` (see `run_worker_first` in wrangler.jsonc).
 */
export default {
  async fetch(request: Request, env: CmsEnv): Promise<Response> {
    const { pathname } = new URL(request.url)
    if (!pathname.startsWith('/api/')) {
      return new Response('Not found', { status: 404 })
    }
    return routeCmsRequest(request, env, pathname.slice('/api'.length))
  },
}
