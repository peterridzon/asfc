import { useState } from 'react'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  /** The first image on a page can skip lazy loading. */
  eager?: boolean
}

/** Lazy-loaded image with a graceful fallback when the file is missing. */
export function LazyImage({ src, alt, className = '', eager }: LazyImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="flex aspect-[3/2] w-full max-w-xl items-center justify-center border border-dashed border-hairline">
        <span className="px-4 text-center font-mono text-[11px] tracking-[0.1em] text-navy-soft uppercase">
          Image not available
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-contain ${className}`}
    />
  )
}
