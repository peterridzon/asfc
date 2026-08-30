/**
 * The CMS request handlers. Written against plain Request/Response and a KV
 * interface so the very same code runs inside Cloudflare Pages Functions and
 * inside the local dev shim.
 */
import { clearSessionCookie, createSessionCookie, isSignedIn, passwordMatches } from './auth'
import {
  AI_TARGET_LANG,
  ALLOWED_IMAGE_TYPES,
  EXTENSION_BY_TYPE,
  MAX_IMAGE_BYTES,
  imageKey,
  isSection,
  isTranslatableLang,
  json,
  newId,
  readPosts,
  translationKey,
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

/** Splits on sentence boundaries, keeping the punctuation on each sentence. */
function splitSentences(text: string): string[] {
  return (text.match(/[^.!?]+[.!?]*(?:\s+|$)/g) ?? [text]).map((part) => part.trim()).filter(Boolean)
}

async function translateSentence(env: CmsEnv, sentence: string, targetWord: string): Promise<string> {
  try {
    const result = (await env.AI!.run('@cf/meta/m2m100-1.2b', {
      text: sentence,
      source_lang: 'english',
      target_lang: targetWord,
    })) as { translated_text?: string }
    return result.translated_text?.trim() || sentence
  } catch {
    // A translation hiccup should never take the post off the page.
    return sentence
  }
}

/**
 * Translates one field through Workers AI. Empty text and a missing binding
 * both fall through unchanged — the post still displays, just untranslated.
 *
 * Sentences are translated one at a time rather than as one block: testing
 * against the live model showed multi-sentence captions losing whole
 * sentences, and in one case mistranslating "Hungary" as "Greenland" — both
 * disappeared once each sentence went through on its own.
 */
async function translateField(env: CmsEnv, text: string, targetWord: string): Promise<string> {
  if (!text || !env.AI) return text
  const sentences = splitSentences(text)
  const translated = await Promise.all(
    sentences.map((sentence) => translateSentence(env, sentence, targetWord)),
  )
  return translated.join(' ')
}

/**
 * Posts are never edited after publishing (only created or deleted), so a
 * translation cached under a post's id can never go stale — it is computed
 * once, on whichever request happens to need it first.
 */
async function translatePost(env: CmsEnv, kv: KvNamespace, post: Post, lang: string): Promise<Post> {
  const targetWord = AI_TARGET_LANG[lang]
  if (!targetWord || (!post.alt && !post.text)) return post

  const key = translationKey(post.id, lang)
  const cached = await kv.get(key, 'text')
  if (cached) {
    try {
      const parsed = JSON.parse(cached) as { alt: string; text: string }
      return { ...post, alt: parsed.alt, text: parsed.text }
    } catch {
      /* corrupt cache entry — fall through and re-translate */
    }
  }

  const [alt, text] = await Promise.all([
    translateField(env, post.alt, targetWord),
    translateField(env, post.text, targetWord),
  ])
  await kv.put(key, JSON.stringify({ alt, text }))
  return { ...post, alt, text }
}

export async function handleListPosts(env: CmsEnv, lang?: string | null): Promise<Response> {
  const kv = requireKv(env)
  if (kv instanceof Response) return json({ posts: [] })
  const posts = await readPosts(kv)

  if (!isTranslatableLang(lang)) {
    return json({ posts }, 200, { 'cache-control': 'public, max-age=30, s-maxage=60' })
  }

  const translated = await Promise.all(posts.map((post) => translatePost(env, kv, post, lang)))
  return json({ posts: translated }, 200, { 'cache-control': 'public, max-age=30, s-maxage=60' })
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

export async function handleUpdatePost(
  request: Request,
  env: CmsEnv,
  id: string,
): Promise<Response> {
  const unauthorised = await requireAuth(request, env)
  if (unauthorised) return unauthorised

  const kv = requireKv(env)
  if (kv instanceof Response) return kv

  let body: { alt?: unknown; text?: unknown; archived?: unknown }
  try {
    body = (await request.json()) as typeof body
  } catch {
    return json({ error: 'Bad request.' }, 400)
  }

  const posts = await readPosts(kv)
  const index = posts.findIndex((post) => post.id === id)
  if (index === -1) return json({ error: 'No such post.' }, 404)

  const current = posts[index]
  const updated: Post = {
    ...current,
    alt: typeof body.alt === 'string' ? body.alt.trim() : current.alt,
    text: typeof body.text === 'string' ? body.text.trim() : current.text,
    archived: typeof body.archived === 'boolean' ? body.archived : current.archived,
  }
  posts[index] = updated
  await writePosts(kv, posts)

  // Cached translations were computed from the old text. Posts up to now were
  // never edited after publishing, which is what made caching them forever
  // safe — an edit breaks that assumption, so the affected cache entries are
  // dropped and will simply regenerate from the new text next time they're
  // requested in each language.
  await Promise.all(
    Object.keys(AI_TARGET_LANG).map((lang) => kv.delete(translationKey(id, lang))),
  )

  return json({ ok: true, post: updated })
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

/* --------------------------------------------------------------- router --- */

/**
 * Maps a request path (already stripped of the `/api` prefix) onto a handler.
 * Shared by the deployed Worker and the local dev server so both behave
 * identically.
 */
export async function routeCmsRequest(
  request: Request,
  env: CmsEnv,
  path: string,
): Promise<Response> {
  const method = request.method

  if (path === '/session' && method === 'GET') return handleSession(request, env)
  if (path === '/login' && method === 'POST') return handleLogin(request, env)
  if (path === '/logout' && method === 'POST') return handleLogout()
  if (path === '/posts' && method === 'GET') {
    return handleListPosts(env, new URL(request.url).searchParams.get('lang'))
  }
  if (path === '/posts' && method === 'POST') return handleCreatePost(request, env)
  if (path.startsWith('/posts/') && method === 'PATCH') {
    return handleUpdatePost(request, env, decodeURIComponent(path.slice('/posts/'.length)))
  }
  if (path.startsWith('/posts/') && method === 'DELETE') {
    return handleDeletePost(request, env, decodeURIComponent(path.slice('/posts/'.length)))
  }
  if (path.startsWith('/images/') && method === 'GET') {
    return handleGetImage(env, decodeURIComponent(path.slice('/images/'.length)))
  }

  return new Response('Not found', { status: 404 })
}
