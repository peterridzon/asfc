/**
 * Types and helpers shared by the Cloudflare Pages Functions and the local dev
 * shim, so both speak exactly the same HTTP contract.
 */

/** Every collection of images the site can publish to. */
export type Section =
  | 'outlook-austria'
  | 'outlook-czechia'
  | 'outlook-slovakia'
  | 'outlook-hungary'
  | 'alerts'

export const SECTIONS: readonly Section[] = [
  'outlook-austria',
  'outlook-czechia',
  'outlook-slovakia',
  'outlook-hungary',
  'alerts',
]

export interface Post {
  id: string
  section: Section
  /** URL the browser loads the picture from, e.g. "/api/images/abc123". */
  image: string
  alt: string
  text: string
  /** ISO timestamp; the list is kept newest-first. */
  createdAt: string
  /**
   * Alerts only, set manually from /admin. A archived alert moves from
   * /alerts to /archive/alerts instead of disappearing or staying live
   * forever. Outlook posts ignore this — their archive is automatic
   * (newest first), so this is always undefined for them.
   */
  archived?: boolean
}

/** Minimal shape of a Cloudflare KV binding — avoids a types dependency. */
export interface KvNamespace {
  get(key: string, type: 'text'): Promise<string | null>
  getWithMetadata<M>(
    key: string,
    type: 'arrayBuffer',
  ): Promise<{ value: ArrayBuffer | null; metadata: M | null }>
  put(key: string, value: string | ArrayBuffer, options?: { metadata?: unknown }): Promise<void>
  delete(key: string): Promise<void>
}

/** Minimal shape of the Workers AI binding — only what the translator calls. */
export interface AiBinding {
  run: (
    model: string,
    input: { text: string; source_lang?: string; target_lang: string },
  ) => Promise<{ translated_text?: string } | unknown>
}

export interface CmsEnv {
  ASFC_KV?: KvNamespace
  ADMIN_PASSWORD?: string
  AUTH_SECRET?: string
  /** Powers automatic translation of published alt text and captions. */
  AI?: AiBinding
}

/**
 * The languages ASFC can translate published content into, mapped to the
 * word Cloudflare's m2m100 translation model expects for `target_lang`.
 * English is the language everything is written in, so it needs no entry.
 */
export const AI_TARGET_LANG: Record<string, string> = {
  de: 'german',
  cs: 'czech',
  sk: 'slovak',
  hu: 'hungarian',
}

export function isTranslatableLang(value: string | null | undefined): value is keyof typeof AI_TARGET_LANG {
  return !!value && value in AI_TARGET_LANG
}

/** KV key holding the cached translation of one post into one language. */
export const translationKey = (postId: string, lang: string) => `tr:${postId}:${lang}`

export const POSTS_KEY = 'posts'
export const imageKey = (id: string) => `img:${id}`

export const MAX_IMAGE_BYTES = 20 * 1024 * 1024

export const ALLOWED_IMAGE_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'image/avif',
  'image/svg+xml',
])

export const EXTENSION_BY_TYPE: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
  'image/svg+xml': 'svg',
}

export function isSection(value: unknown): value is Section {
  return SECTIONS.includes(value as Section)
}

export function json(data: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...headers },
  })
}

/** Short, URL-safe, collision-resistant enough for a personal site. */
export function newId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(9))
  return [...bytes].map((byte) => byte.toString(36).padStart(2, '0')).join('').slice(0, 14)
}

export async function readPosts(kv: KvNamespace): Promise<Post[]> {
  const raw = await kv.get(POSTS_KEY, 'text')
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? (parsed as Post[]) : []
  } catch {
    return []
  }
}

export async function writePosts(kv: KvNamespace, posts: Post[]): Promise<void> {
  await kv.put(POSTS_KEY, JSON.stringify(posts))
}
