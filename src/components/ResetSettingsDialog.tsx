import { resetAllSettings } from '../lib/countryPreference'
import { Modal } from './Modal'

/** Confirmation before wiping every preference stored in this browser. */
export function ResetSettingsDialog({ onClose }: { onClose: () => void }) {
  const confirm = () => {
    resetAllSettings()
    // Reload so every component picks up the cleared preferences.
    window.location.reload()
  }

  return (
    <Modal label="Reset settings" onClose={onClose}>
      <p className="text-center text-base leading-relaxed font-semibold text-navy sm:text-lg">
        are you sure you want to reset settings
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onClose}
          className="border border-navy px-8 py-3.5 font-mono text-base font-bold tracking-[0.14em] text-navy uppercase transition hover:bg-sky-canvas"
        >
          No
        </button>
        <button
          type="button"
          onClick={confirm}
          className="bg-[rgb(196,26,26)] px-8 py-3.5 font-mono text-base font-bold tracking-[0.14em] text-white uppercase transition hover:bg-[rgb(168,22,22)]"
        >
          Yes
        </button>
      </div>
    </Modal>
  )
}
