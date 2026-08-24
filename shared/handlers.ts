/**
 * The CMS request handlers. Written against plain Request/Response and a KV
 * interface so the very same code runs inside Cloudflare Pages Functions and
 * inside the local dev shim.
 */
import { clearSessionCookie, createSessionCookie, isSignedIn, passwordMatches } from './auth'
import {
  ALLOWED_IMAGE_TYPES,
  EXTENSION_BY_TYPE,
  MAX_IMAGE_BYTES,
  imageKey,
  isSection,
  json,
  newId,
  readPosts,
  writePosts,
  type CmsEnv,
  type KvNamespace,
  type Post,
} from './cms'

function requireKv(env: CmsEnv): KvNamespace | Response {
  if (!env.ASFC_KV) {
    return json(
      { error: 'Storage is not configured. Bind a KV namespace called ASFC_KV.' },
      503,
    )
  }
  return env.ASFC_KV
}

async function requireAuth(request: Request, env: CmsEnv): Promise<Response | null> {
  if (await isSignedIn(request, env.AUTH_SECRET)) return null
  return json({ error: 'Not signed in.' }, 401)
}

/* ---------------------------------------------------------------- login --- */

export async function handleLogin(request: Request, env: CmsEnv): Promise<Response> {
  if (!env.ADMIN_PASSWORD || !env.AUTH_SECRET) {
    return json(
      { error: 'Admin is not configured. Set ADMIN_PASSWORD and AUTH_SECRET.' },
      503,
    )
  }

  let password = ''
  try {
    const body = (await request.json()) as { password?: unknown }
    password = String(body.password ?? '')
  } catch {
    return json({ error: 'Bad request.' }, 400)
  }

  if (!(await passwordMatches(password, env.ADMIN_PASSWORD, env.AUTH_SECRET))) {
    return json({ error: 'Wrong password.' }, 401)
  }

  return json({ ok: true }, 200, { 'set-cookie': await createSessionCookie(env.AUTH_SECRET) })
}

export function handleLogout(): Response {
  return json({ ok: true }, 200, { 'set-cookie': clearSessionCookie() })
}

export async function handleSession(request: Request, env: CmsEnv): Promise<Response> {
  return json({
    signedIn: await isSignedIn(request, env.AUTH_SECRET),
    configured: Boolean(env.ADMIN_PASSWORD && env.AUTH_SECRET && env.ASFC_KV),
  })
}

/* ---------------------------------------------------------------- posts --- */

export async function handleListPosts(env: CmsEnv): Promise<Response> {
  const kv = requireKv(env)
  if (kv instanceof Response) return json({ posts: [] })
  return json({ posts: await readPosts(kv) }, 200, {
    'cache-control': 'public, max-age=30, s-maxage=60',
  })
}

export async function handleCreatePost(request: Request, env: CmsEnv): Promise<Response> {
  const unauthorised = await requireAuth(request, env)
  if (unauthorised) return unauthorised

  const kv = requireKv(env)
  if (kv instanceof Response) return kv

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return json({ error: 'Expected a multipart form.' }, 400)
  }

  const section = form.get('section')
  if (!isSection(section)) return json({ error: 'Pick Storm Outlook or Alerts.' }, 400)

  const file = form.get('image')
  if (!(file instanceof File) || file.size === 0) {
    return json({ error: 'Choose an image.' }, 400)
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return json({ error: 'That image is bigger than 20 MB.' }, 413)
  }

  const contentType = file.type || 'application/octet-stream'
  if (!ALLOWED_IMAGE_TYPES.has(contentType)) {
    return json({ error: `Unsupported image type "${contentType}".` }, 415)
  }

  const id = newId()
  await kv.put(imageKey(id), await file.arrayBuffer(), { metadata: { contentType } })

  const post: Post = {
    id,
    section,
    image: `/api/images/${id}.${EXTENSION_BY_TYPE[contentType] ?? 'bin'}`,
    alt: String(form.get('alt') ?? '').trim(),
    text: String(form.get('text') ?? '').trim(),
    createdAt: new Date().toISOString(),
  }

  await writePosts(kv, [post, ...(await readPosts(kv))])
  return json({ ok: true, post })
}

export async function handleDeletePost(
  request: Request,
  env: CmsEnv,
  id: string,
): Promise<Response> {
  const unauthorised = await requireAuth(request, env)
  if (unauthorised) return unauthorised

  const kv = requireKv(env)
  if (kv instanceof Response) return kv

  const posts = await readPosts(kv)
  const remaining = posts.filter((post) => post.id !== id)
  if (remaining.length === posts.length) return json({ error: 'No such post.' }, 404)

  await writePosts(kv, remaining)
  await kv.delete(imageKey(id))
  return json({ ok: true })
}

/* --------------------------------------------------------------- images --- */

export async function handleGetImage(env: CmsEnv, rawId: string): Promise<Response> {
  const kv = requireKv(env)
  if (kv instanceof Response) return kv

  // The URL carries a friendly extension; the id is everything before it.
  const id = rawId.replace(/\.[a-z0-9]+$/i, '')
  const stored = await kv.getWithMetadata<{ contentType?: string }>(imageKey(id), 'arrayBuffer')
  if (!stored.value) return new Response('Not found', { status: 404 })

  return new Response(stored.value, {
    headers: {
      'content-type': stored.metadata?.contentType ?? 'application/octet-stream',
      // Ids are unique per upload, so a stored image never changes.
      'cache-control': 'public, max-age=31536000, immutable',
    },
  })
}
