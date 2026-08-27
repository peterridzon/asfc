import { resetAllSettings } from '../lib/countryPreference'
import { useTranslation } from '../lib/i18n/useTranslation'
import { Modal } from './Modal'

/** Confirmation before wiping every preference stored in this browser. */
export function ResetSettingsDialog({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation()

  const confirm = () => {
    resetAllSettings()
    // Reload so every component picks up the cleared preferences.
    window.location.reload()
  }

  return (
    <Modal label={t('settings.resetSettings')} onClose={onClose}>
      <p className="text-center text-base leading-relaxed font-semibold text-navy sm:text-lg">
        {t('resetDialog.confirm')}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onClose}
          className="border border-navy px-8 py-3.5 font-mono text-base font-bold tracking-[0.14em] text-navy uppercase transition hover:bg-sky-canvas"
        >
          {t('resetDialog.no')}
        </button>
        <button
          type="button"
          onClick={confirm}
          className="bg-[rgb(196,26,26)] px-8 py-3.5 font-mono text-base font-bold tracking-[0.14em] text-white uppercase transition hover:bg-[rgb(168,22,22)]"
        >
          {t('resetDialog.yes')}
        </button>
      </div>
    </Modal>
  )
}
