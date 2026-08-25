import { useEffect, useRef, useState } from 'react'
import {
  acknowledgeDisclaimer,
  disclaimerHandled,
  hideDisclaimerForever,
} from '../lib/disclaimer'

const DISCLAIMER_TEXT =
  "Disclaimer: This website is for experimental purposes only! warnings, alerts and storm outlooks are not official and they don't replace official warnings, so if a warning is issued, double-check it on official warning platforms!"

/**
 * Shown every time the Storm Outlook or Alerts page is opened.
 *
 * "Got it!" closes it for now; "Don't show this again" remembers the choice in
 * localStorage so it never appears again on this browser.
 *
 * The panel covers half the area of the viewport: 70.7% of the width and 70.7%
 * of the height, because 0.707 x 0.707 = 0.5.
 */
export function DisclaimerDialog() {
  const [open, setOpen] = useState(() => !disclaimerHandled())
  const confirmRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    confirmRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        acknowledgeDisclaimer()
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  if (!open) return null

  const neverAgain = () => {
    hideDisclaimerForever()
    setOpen(false)
  }

  return (
    // The dimmed backdrop is what makes a white panel visible on a white page.
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-navy/60 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="asfc-disclaimer-text"
        className="flex h-[70.7dvh] max-h-[calc(100dvh-2rem)] w-[max(70.7vw,300px)] max-w-[min(880px,calc(100vw-2rem))] flex-col justify-center gap-8 overflow-y-auto bg-white p-6 shadow-2xl sm:p-10"
      >
        <p
          id="asfc-disclaimer-text"
          className="text-center text-base leading-relaxed font-semibold text-navy sm:text-lg"
        >
          {DISCLAIMER_TEXT}
        </p>

        <div className="flex flex-col items-center gap-3">
          <button
            ref={confirmRef}
            type="button"
            onClick={() => {
              acknowledgeDisclaimer()
              setOpen(false)
            }}
            className="w-full bg-navy px-6 py-5 font-mono text-xl font-bold tracking-[0.12em] text-white uppercase transition hover:bg-navy-soft sm:text-2xl"
          >
            Got it!
          </button>

          <button
            type="button"
            onClick={neverAgain}
            className="border border-hairline px-4 py-2.5 font-mono text-xs tracking-[0.12em] text-navy-soft uppercase transition hover:bg-sky-canvas hover:text-navy"
          >
            Don&rsquo;t show this again
          </button>
        </div>
      </div>
    </div>
  )
}
