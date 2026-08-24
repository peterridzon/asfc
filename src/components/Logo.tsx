import { useState } from 'react'

/**
 * The project logo, shown immediately to the left of the ASFC wordmark.
 *
 * The file lives at public/logo.png. If it is missing the component renders
 * nothing at all, so the wordmark never sits next to a broken-image icon.
 *
 * It is marked decorative because the word "ASFC" is always right next to it —
 * a screen reader would otherwise announce the same name twice.
 */
export function Logo({ className = '' }: { className?: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null

  return (
    <img
      src="/logo.png"
      alt=""
      aria-hidden="true"
      decoding="async"
      onError={() => setFailed(true)}
      className={`shrink-0 object-contain ${className}`}
    />
  )
}
