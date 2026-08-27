import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { countryTranslationKey } from '../lib/i18n/translations'
import { useTranslation } from '../lib/i18n/useTranslation'
import { setPreferredCountry, type CountrySlug } from '../lib/countryPreference'
import { OUTLOOK_REGIONS } from '../lib/sections'
import { Modal } from './Modal'

const primary =
  'bg-navy px-8 py-4 font-mono text-base font-bold tracking-[0.14em] text-white uppercase transition hover:bg-navy-soft'
const secondary =
  'border border-hairline px-5 py-3 font-mono text-xs tracking-[0.1em] text-navy-soft uppercase transition hover:bg-sky-canvas hover:text-navy'

interface CountryDialogProps {
  onClose: () => void
  onChosen: (slug: CountrySlug) => void
}

/** Two steps: explain what picking a country does, then pick one. */
export function CountryDialog({ onClose, onChosen }: CountryDialogProps) {
  const { t } = useTranslation()
  const [picking, setPicking] = useState(false)
  const navigate = useNavigate()

  const choose = (slug: CountrySlug) => {
    setPreferredCountry(slug)
    onChosen(slug)
    onClose()
  }

  return (
    <Modal label={t('settings.selectCountry')} area={0.55} onClose={onClose}>
      <p className="text-center text-base leading-relaxed font-semibold text-navy sm:text-lg">
        {t('countryDialog.explain')}
      </p>

      {picking ? (
        <div className="flex flex-col items-center gap-3">
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
            {OUTLOOK_REGIONS.map((region) => (
              <button
                key={region.slug}
                type="button"
                onClick={() => choose(region.slug)}
                className="flex min-h-20 items-center justify-center bg-[rgb(255,208,0)] px-4 font-mono text-base font-bold tracking-[0.1em] text-navy uppercase transition hover:bg-[rgb(232,189,0)] sm:text-lg"
              >
                {t(countryTranslationKey(region.slug))}
              </button>
            ))}
          </div>
          <button type="button" onClick={onClose} className={secondary}>
            {t('header.close')}
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <button type="button" onClick={() => setPicking(true)} className={`w-full ${primary}`}>
            {t('countryDialog.ok')}
          </button>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" onClick={onClose} className={secondary}>
              {t('countryDialog.noThanks')}
            </button>
            <button type="button" onClick={() => navigate('/')} className={secondary}>
              {t('countryDialog.backToHome')}
            </button>
          </div>
        </div>
      )}
    </Modal>
  )
}
