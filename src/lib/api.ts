import type { Post, Section } from '../../shared/cms'

export type { Post, Section }

export interface SessionState {
  signedIn: boolean
  /** False until the KV namespace and the admin secrets are set up. */
  configured: boolean
}

async function readError(response: Response, fallback: string): Promise<string> {
  try {
    const body = (await response.json()) as { error?: string }
    return body.error || fallback
  } catch {
    return fallback
  }
}

export async function fetchPosts(signal?: AbortSignal, lang?: string): Promise<Post[]> {
  // 'en' is the language every post is written in, so there is nothing to ask
  // the server to translate.
  const query = lang && lang !== 'en' ? `?lang=${encodeURIComponent(lang)}` : ''
  const response = await fetch(`/api/posts${query}`, { signal })
  if (!response.ok) throw new Error(await readError(response, `HTTP ${response.status}`))
  const body = (await response.json()) as { posts?: Post[] }
  return body.posts ?? []
}

export async function fetchSession(): Promise<SessionState> {
  const response = await fetch('/api/session')
  if (!response.ok) return { signedIn: false, configured: false }
  return (await response.json()) as SessionState
}

export async function login(password: string): Promise<void> {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ password }),
  })
  if (!response.ok) throw new Error(await readError(response, 'Could not sign in.'))
}

export async function logout(): Promise<void> {
  await fetch('/api/logout', { method: 'POST' })
}

export async function createPost(form: FormData): Promise<Post> {
  const response = await fetch('/api/posts', { method: 'POST', body: form })
  if (!response.ok) throw new Error(await readError(response, 'Could not publish.'))
  const body = (await response.json()) as { post: Post }
  return body.post
}

export async function deletePost(id: string): Promise<void> {
  const response = await fetch(`/api/posts/${encodeURIComponent(id)}`, { method: 'DELETE' })
  if (!response.ok) throw new Error(await readError(response, 'Could not delete.'))
}
