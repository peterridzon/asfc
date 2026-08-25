import { Link } from 'react-router-dom'
import { DisclaimerDialog } from '../components/DisclaimerDialog'
import { OUTLOOK_REGIONS } from '../lib/sections'
import { useDocumentMeta } from '../lib/useDocumentMeta'

/** Reached from the yellow homepage button: pick which country to look at. */
export function OutlookRegions() {
  useDocumentMeta(
    'Storm Outlook',
    'Experimental amateur storm outlooks published by ASFC for Slovakia and Czechia.',
  )

  return (
    <>
      <DisclaimerDialog />

      <div className="mx-auto flex min-h-[calc(100dvh-14rem)] max-w-4xl flex-col justify-center px-4 py-12 sm:px-6">
        <h1 className="text-center font-mono text-3xl font-extrabold tracking-[0.1em] text-navy uppercase sm:text-4xl">
          Storm Outlook
        </h1>

        <nav aria-label="Outlook regions" className="mt-10">
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {OUTLOOK_REGIONS.map((region) => (
              <li key={region.slug}>
                <Link
                  to={`/outlook/${region.slug}`}
                  className="flex min-h-28 items-center justify-center bg-[rgb(255,208,0)] px-4 text-center font-mono text-base leading-tight font-bold tracking-[0.06em] text-navy shadow-sm transition hover:bg-[rgb(232,189,0)] sm:text-lg sm:tracking-[0.1em]"
                >
                  {region.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
