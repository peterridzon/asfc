import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  alertPopupsEnabled,
  alertsSeenThisVisit,
  dismissAlertForever,
  dismissedAlertIds,
  markAlertsSeenThisVisit,
} from '../lib/alertSettings'
import { usePosts } from '../lib/usePosts'
import { disclaimerHandled } from '../lib/disclaimer'
import { LazyImage } from './LazyImage'

/** Routes that greet the visitor with the experimental-use disclaimer. */
const DISCLAIMER_ROUTES = /^\/(outlook|archive|alerts)/

/**
 * Shows the published alerts when someone opens the site: the picture on the
 * left, its text on the right.
 *
 * "OK" closes the window for this visit. "Don't show this alert again" hides
 * that one alert for good — any other alert still gets its turn, which is why
 * they are worked through one at a time rather than shown together.
 *
 * The window covers 40% of the screen: 63.2% of the width and of the height,
 * because 0.632 x 0.632 = 0.4.
 */
export function AlertPopup() {
  const { pathname } = useLocation()
  const { posts } = usePosts('alerts')

  const [queue, setQueue] = useState<string[] | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Never stack on top of the disclaimer that those routes show first.
  const blockedByDisclaimer = DISCLAIMER_ROUTES.test(pathname) && !disclaimerHandled()

  const candidates = useMemo(() => {
    if (!alertPopupsEnabled() || alertsSeenThisVisit()) return []
    const dismissed = new Set(dismissedAlertIds())
    return posts.filter((post) => post.image && !dismissed.has(post.id))
  }, [posts])

  // Fix the queue once, so dismissing an alert cannot reshuffle what is left.
  useEffect(() => {
    if (queue === null && candidates.length > 0) {
      setQueue(candidates.map((post) => post.id))
    }
  }, [candidates, queue])

  const remaining = queue ?? []
  const current = posts.find((post) => post.id === remaining[0]) ?? null
  const visible = Boolean(current) && !blockedByDisclaimer

  useEffect(() => {
    if (!visible) return

    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeAll()
    }
    document.addEventListener('keydown', onKeyDown)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  if (!visible || !current) return null

  function closeAll() {
    markAlertsSeenThisVisit()
    setQueue([])
  }

  function neverAgain() {
    if (current) dismissAlertForever(current.id)
    const rest = remaining.slice(1)
    setQueue(rest)
    if (rest.length === 0) markAlertsSeenThisVisit()
  }

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center bg-navy/60 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Weather alert"
        className="flex h-[63.2dvh] max-h-[calc(100dvh-2rem)] w-[max(63.2vw,300px)] max-w-[min(1000px,calc(100vw-2rem))] flex-col gap-4 overflow-y-auto bg-white p-5 shadow-2xl sm:p-7"
      >
        <div className="flex min-h-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex min-h-0 flex-1 items-center justify-center">
            <LazyImage
              src={current.image}
              alt={current.alt}
              eager
              className="max-h-full max-w-full"
            />
          </div>

          {current.text && (
            <p className="flex-1 text-sm leading-relaxed whitespace-pre-line text-navy sm:text-base">
              {current.text}
            </p>
          )}
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              ref={closeRef}
              type="button"
              onClick={closeAll}
              className="bg-navy px-8 py-3 font-mono text-base font-bold tracking-[0.14em] text-white uppercase transition hover:bg-navy-soft"
            >
              OK
            </button>

            <button
              type="button"
              onClick={neverAgain}
              className="border border-hairline px-4 py-2.5 font-mono text-xs tracking-[0.1em] text-navy-soft uppercase transition hover:bg-sky-canvas hover:text-navy"
            >
              Don&rsquo;t show this alert again
            </button>
          </div>

          <p className="text-center text-xs text-navy-faint">you can change this in settings.</p>
        </div>
      </div>
    </div>
  )
}
