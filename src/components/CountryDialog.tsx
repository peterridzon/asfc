import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const [picking, setPicking] = useState(false)
  const navigate = useNavigate()

  const choose = (slug: CountrySlug) => {
    setPreferredCountry(slug)
    onChosen(slug)
    onClose()
  }

  return (
    <Modal label="Select your country" area={0.55} onClose={onClose}>
      <p className="text-center text-base leading-relaxed font-semibold text-navy sm:text-lg">
        select your country so you will only get a storm outlook automatically for your selected
        country.
      </p>

      {picking ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {OUTLOOK_REGIONS.map((region) => (
            <button
              key={region.slug}
              type="button"
              onClick={() => choose(region.slug as CountrySlug)}
              className="flex min-h-20 items-center justify-center bg-[rgb(255,208,0)] px-4 font-mono text-base font-bold tracking-[0.1em] text-navy uppercase transition hover:bg-[rgb(232,189,0)] sm:text-lg"
            >
              {region.country}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <button type="button" onClick={() => setPicking(true)} className={`w-full ${primary}`}>
            OK
          </button>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" onClick={onClose} className={secondary}>
              No thanks
            </button>
            <button type="button" onClick={() => navigate('/')} className={secondary}>
              Back to home
            </button>
          </div>
        </div>
      )}
    </Modal>
  )
}
