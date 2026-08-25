import { useEffect, useRef, type ReactNode } from 'react'

interface ModalProps {
  label: string
  /**
   * Share of the screen the panel should cover, e.g. 0.55 for 55%. Each edge
   * is the square root of it, so 0.742 x 0.742 = 0.55. Leave it out to size
   * the panel to its content.
   */
  area?: number
  onClose: () => void
  children: ReactNode
}

/** Dimmed backdrop plus a white panel — what makes a dialog visible here. */
export function Modal({ label, area, onClose, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    panelRef.current?.querySelector('button')?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  const edge = area ? `${(Math.sqrt(area) * 100).toFixed(1)}` : null

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center bg-navy/60 p-4">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        style={
          edge
            ? {
                width: `max(${edge}vw, 300px)`,
                height: `${edge}dvh`,
                // Only the viewport limits an area-sized panel, so the share
                // of the screen it covers stays what was asked for.
                maxWidth: 'calc(100vw - 2rem)',
              }
            : undefined
        }
        className={`flex max-h-[calc(100dvh-2rem)] flex-col justify-center gap-7 overflow-y-auto bg-white p-6 shadow-2xl sm:p-10 ${
          edge ? '' : 'w-full max-w-[min(560px,calc(100vw-2rem))]'
        }`}
      >
        {children}
      </div>
    </div>
  )
}
