import { useEffect, useRef, useState, type FormEvent } from 'react'
import { LazyImage } from '../components/LazyImage'
import {
  createPost,
  deletePost,
  fetchSession,
  login,
  logout,
  type Post,
  type Section,
} from '../lib/api'
import { prepareImage } from '../lib/prepareImage'
import { usePosts } from '../lib/usePosts'
import { useDocumentMeta } from '../lib/useDocumentMeta'

const SECTIONS: Array<{ value: Section; label: string }> = [
  { value: 'outlook', label: 'Storm Outlook' },
  { value: 'alerts', label: 'Alerts / Varovania' },
]

const field =
  'w-full border border-hairline bg-white px-4 py-3 text-base text-navy outline-none focus:border-navy'

/** Password-protected page for publishing images from any device. */
export function Admin() {
  useDocumentMeta('Admin', 'ASFC publishing.')

  const [session, setSession] = useState<{ signedIn: boolean; configured: boolean } | null>(null)

  useEffect(() => {
    fetchSession().then(setSession).catch(() => setSession({ signedIn: false, configured: false }))
  }, [])

  if (!session) {
    return <Shell><p className="text-navy-soft">Checking…</p></Shell>
  }

  if (!session.configured) {
    return (
      <Shell>
        <h1 className="font-mono text-2xl font-bold tracking-[0.1em] text-navy uppercase">Admin</h1>
        <p className="mt-4 max-w-prose text-navy-soft">
          Publishing is not set up on this deployment yet. It needs a KV namespace bound as{' '}
          <code className="font-mono">ASFC_KV</code> plus the{' '}
          <code className="font-mono">ADMIN_PASSWORD</code> and{' '}
          <code className="font-mono">AUTH_SECRET</code> secrets. The README has the exact steps.
        </p>
      </Shell>
    )
  }

  if (!session.signedIn) {
    return <SignIn onSignedIn={() => setSession({ ...session, signedIn: true })} />
  }

  return <Publisher onSignedOut={() => setSession({ ...session, signedIn: false })} />
}

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">{children}</div>
}

function SignIn({ onSignedIn }: { onSignedIn: () => void }) {
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const password = String(new FormData(event.currentTarget).get('password') ?? '')
    setBusy(true)
    setError(null)
    try {
      await login(password)
      onSignedIn()
    } catch (cause) {
      setError((cause as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <Shell>
      <h1 className="font-mono text-2xl font-bold tracking-[0.1em] text-navy uppercase">Admin</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block">
          <span className="label-tech">Password</span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            className={`mt-1 ${field}`}
          />
        </label>
        <button
          type="submit"
          disabled={busy}
          className="w-full bg-navy px-6 py-4 font-mono text-lg font-bold tracking-[0.12em] text-white uppercase transition hover:bg-navy-soft disabled:opacity-50"
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
        {error && <p className="text-sm text-[rgb(196,26,26)]">{error}</p>}
      </form>
    </Shell>
  )
}

function Publisher({ onSignedOut }: { onSignedOut: () => void }) {
  const { posts, loading, reload } = usePosts()
  const formRef = useRef<HTMLFormElement>(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const chosen = data.get('image')

    if (!(chosen instanceof File) || chosen.size === 0) {
      setMessage({ ok: false, text: 'Choose an image first.' })
      return
    }

    setBusy(true)
    setMessage(null)
    try {
      // Shrinks big photos and converts iPad HEIC into something browsers show.
      data.set('image', await prepareImage(chosen))
      await createPost(data)
      form.reset()
      setMessage({ ok: true, text: 'Published. It is live now.' })
      reload()
    } catch (cause) {
      setMessage({ ok: false, text: (cause as Error).message })
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete(post: Post) {
    if (!window.confirm(`Delete this image from ${post.section}?`)) return
    try {
      await deletePost(post.id)
      reload()
    } catch (cause) {
      setMessage({ ok: false, text: (cause as Error).message })
    }
  }

  return (
    <Shell>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-mono text-2xl font-bold tracking-[0.1em] text-navy uppercase">Admin</h1>
        <button
          type="button"
          onClick={() => logout().then(onSignedOut)}
          className="border border-hairline px-4 py-2 font-mono text-xs tracking-[0.12em] text-navy-soft uppercase transition hover:bg-sky-canvas hover:text-navy"
        >
          Sign out
        </button>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="mt-6 space-y-4">
        <fieldset>
          <legend className="label-tech">Page</legend>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {SECTIONS.map((section, index) => (
              <label
                key={section.value}
                className="flex cursor-pointer items-center gap-2 border border-hairline px-4 py-3 text-sm text-navy has-checked:border-navy has-checked:bg-sky-canvas"
              >
                <input
                  type="radio"
                  name="section"
                  value={section.value}
                  defaultChecked={index === 0}
                  className="accent-navy"
                />
                {section.label}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="block">
          <span className="label-tech">Image</span>
          <input type="file" name="image" accept="image/*" className={`mt-1 ${field}`} />
        </label>

        <label className="block">
          <span className="label-tech">Alt text — describes the picture for screen readers</span>
          <input type="text" name="alt" className={`mt-1 ${field}`} placeholder="Storm outlook for 24 August" />
        </label>

        <label className="block">
          <span className="label-tech">Text under the image (optional)</span>
          <textarea name="text" rows={4} className={`mt-1 ${field}`} placeholder="Write the text shown under the image…" />
        </label>

        <button
          type="submit"
          disabled={busy}
          className="w-full bg-navy px-6 py-4 font-mono text-lg font-bold tracking-[0.12em] text-white uppercase transition hover:bg-navy-soft disabled:opacity-50"
        >
          {busy ? 'Publishing…' : 'Publish'}
        </button>

        {message && (
          <p className={`text-sm ${message.ok ? 'text-navy' : 'text-[rgb(196,26,26)]'}`}>
            {message.text}
          </p>
        )}
      </form>

      <h2 className="mt-12 font-mono text-sm font-bold tracking-[0.14em] text-navy-soft uppercase">
        Published ({posts.length})
      </h2>

      {loading ? (
        <p className="mt-4 text-sm text-navy-soft">Loading…</p>
      ) : posts.length === 0 ? (
        <p className="mt-4 text-sm text-navy-soft">Nothing published yet.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {posts.map((post) => (
            <li key={post.id} className="flex items-center gap-4 border border-hairline p-3">
              <LazyImage src={post.image} alt={post.alt} className="h-20 w-28 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[11px] tracking-[0.12em] text-navy-faint uppercase">
                  {post.section} · {new Date(post.createdAt).toLocaleString()}
                </p>
                <p className="truncate text-sm text-navy">{post.alt || post.text || '(no text)'}</p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(post)}
                className="shrink-0 border border-hairline px-3 py-2 font-mono text-[11px] tracking-[0.12em] text-navy-soft uppercase transition hover:border-[rgb(196,26,26)] hover:text-[rgb(196,26,26)]"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </Shell>
  )
}
