/**
 * Session handling for the ASFC admin.
 *
 * The password never leaves the server, and the cookie carries only an expiry
 * plus an HMAC of it — there is nothing in the cookie an attacker could forge
 * without AUTH_SECRET.
 */

const COOKIE_NAME = 'asfc_session'
const SESSION_MS = 30 * 24 * 60 * 60 * 1000 // 30 days

const encoder = new TextEncoder()

function base64url(bytes: ArrayBuffer): string {
  let binary = ''
  for (const byte of new Uint8Array(bytes)) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function hmac(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  return base64url(await crypto.subtle.sign('HMAC', key, encoder.encode(value)))
}

/** Length-independent comparison so a wrong guess leaks no timing information. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function passwordMatches(
  candidate: string,
  expected: string,
  secret: string,
): Promise<boolean> {
  // Hash both sides first: the comparison then runs over fixed-length digests.
  const [left, right] = await Promise.all([hmac(candidate, secret), hmac(expected, secret)])
  return safeEqual(left, right)
}

export async function createSessionCookie(secret: string): Promise<string> {
  const expiresAt = Date.now() + SESSION_MS
  const token = `${expiresAt}.${await hmac(String(expiresAt), secret)}`
  const maxAge = Math.floor(SESSION_MS / 1000)
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`
}

export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`
}

function readCookie(header: string | null, name: string): string | null {
  if (!header) return null
  for (const part of header.split(';')) {
    const [key, ...rest] = part.trim().split('=')
    if (key === name) return rest.join('=')
  }
  return null
}

export async function isSignedIn(request: Request, secret: string | undefined): Promise<boolean> {
  if (!secret) return false
  const token = readCookie(request.headers.get('cookie'), COOKIE_NAME)
  if (!token) return false

  const [expiresAt, signature] = token.split('.')
  if (!expiresAt || !signature) return false
  if (Number(expiresAt) < Date.now()) return false

  return safeEqual(signature, await hmac(expiresAt, secret))
}
