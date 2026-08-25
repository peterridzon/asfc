import { useState } from 'react'
import { CountryDialog } from '../components/CountryDialog'
import { ResetSettingsDialog } from '../components/ResetSettingsDialog'
import {
  alertPopupsEnabled,
  clearDismissedAlerts,
  dismissedAlertIds,
  setAlertPopupsEnabled,
} from '../lib/alertSettings'
import { clearPreferredCountry, preferredCountry, type CountrySlug } from '../lib/countryPreference'
import { OUTLOOK_REGIONS } from '../lib/sections'
import { useDocumentMeta } from '../lib/useDocumentMeta'

const button =
  'w-full bg-navy px-6 py-4 text-left font-mono text-base font-bold tracking-[0.12em] text-white uppercase transition hover:bg-navy-soft sm:text-lg'

/** Visitor preferences. Everything here is stored in their own browser. */
export function Settings() {
  useDocumentMeta('Settings', 'Choose what ASFC shows you when you open the site.')

  const [alertsOpen, setAlertsOpen] = useState(false)
  const [popups, setPopups] = useState(alertPopupsEnabled)
  const [dismissedCount, setDismissedCount] = useState(() => dismissedAlertIds().length)
  const [countryOpen, setCountryOpen] = useState(false)
  const [resetOpen, setResetOpen] = useState(false)
  const [country, setCountry] = useState<CountrySlug | null>(preferredCountry)

  const countryName = OUTLOOK_REGIONS.find((region) => region.slug === country)?.country

  const togglePopups = () => {
    const next = !popups
    setAlertPopupsEnabled(next)
    setPopups(next)
  }

  const restoreAlerts = () => {
    clearDismissedAlerts()
    setDismissedCount(0)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-mono text-3xl font-extrabold tracking-[0.1em] text-navy uppercase sm:text-4xl">
        Settings
      </h1>

      <div className="mt-8 space-y-3">
        <button
          type="button"
          onClick={() => setAlertsOpen((open) => !open)}
          aria-expanded={alertsOpen}
          className={button}
        >
          Alert settings
        </button>

        {alertsOpen && (
          <div className="space-y-3 border-l-2 border-hairline pl-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={togglePopups}
                aria-pressed={popups}
                className="flex-1 border border-navy px-5 py-3.5 text-left font-mono text-sm font-bold tracking-[0.08em] text-navy uppercase transition hover:bg-sky-canvas sm:text-base"
              >
                Show alert windows at opening website
              </button>
              <span
                className={`font-mono text-lg font-bold tracking-[0.14em] uppercase ${
                  popups ? 'text-asfc-green' : 'text-[rgb(196,26,26)]'
                }`}
              >
                {popups ? 'on' : 'off'}
              </span>
            </div>

            <p className="text-sm text-navy-soft">
              {popups
                ? 'Alerts appear in a window when you open the site.'
                : 'Alert windows stay hidden until you switch this back on.'}
            </p>

            {dismissedCount > 0 && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={restoreAlerts}
                  className="border border-hairline px-4 py-2.5 font-mono text-xs tracking-[0.1em] text-navy-soft uppercase transition hover:bg-sky-canvas hover:text-navy"
                >
                  Show hidden alerts again ({dismissedCount})
                </button>
                <p className="mt-2 text-xs text-navy-faint">
                  Brings back the alerts you hid with “Don’t show this alert again”.
                </p>
              </div>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={() => setCountryOpen(true)}
          className={button}
        >
          Select your country
        </button>

        {country && (
          <div className="flex flex-wrap items-center gap-3 border-l-2 border-hairline pl-4">
            <p className="text-sm text-navy-soft">
              Storm Outlook opens <span className="font-semibold text-navy">{countryName}</span>{' '}
              straight away.
            </p>
            <button
              type="button"
              onClick={() => {
                clearPreferredCountry()
                setCountry(null)
              }}
              className="border border-hairline px-4 py-2 font-mono text-xs tracking-[0.1em] text-navy-soft uppercase transition hover:bg-sky-canvas hover:text-navy"
            >
              Clear
            </button>
          </div>
        )}

        <button type="button" onClick={() => setResetOpen(true)} className={button}>
          Reset settings
        </button>
      </div>

      {countryOpen && (
        <CountryDialog onClose={() => setCountryOpen(false)} onChosen={setCountry} />
      )}
      {resetOpen && <ResetSettingsDialog onClose={() => setResetOpen(false)} />}
    </div>
  )
}
