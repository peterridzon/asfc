import { Link } from 'react-router-dom'
import type { TranslationKey } from '../lib/i18n/translations'
import { countryTranslationKey } from '../lib/i18n/translations'
import { useTranslation } from '../lib/i18n/useTranslation'
import { OUTLOOK_REGIONS } from '../lib/sections'
import { DisclaimerDialog } from './DisclaimerDialog'

interface RegionChooserProps {
  titleKey: TranslationKey
  /** Where each region's page lives, e.g. "/outlook" or "/archive". */
  basePath: string
  /** Template with a {country} placeholder, e.g. "FORECAST FOR {country}". */
  labelKey: TranslationKey
}

/** The button-per-country page that sits in front of the outlook and archive pages. */
export function RegionChooser({ titleKey, basePath, labelKey }: RegionChooserProps) {
  const { t } = useTranslation()
  const title = t(titleKey)

  return (
    <>
      <DisclaimerDialog />

      <div className="mx-auto flex min-h-[calc(100dvh-14rem)] max-w-4xl flex-col justify-center px-4 py-12 sm:px-6">
        <h1 className="text-center font-mono text-3xl font-extrabold tracking-[0.1em] text-navy uppercase sm:text-4xl">
          {title}
        </h1>

        <nav aria-label={title} className="mt-10">
          <ul className="grid grid-cols-1 gap-4">
            {OUTLOOK_REGIONS.map((region) => (
              <li key={region.slug}>
                <Link
                  to={`${basePath}/${region.slug}`}
                  className="flex min-h-28 items-center justify-center bg-[rgb(255,208,0)] px-4 text-center font-mono text-base leading-tight font-bold tracking-[0.06em] text-navy shadow-sm transition hover:bg-[rgb(232,189,0)] sm:text-lg sm:tracking-[0.1em]"
                >
                  {t(labelKey, { country: t(countryTranslationKey(region.slug)) })}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
