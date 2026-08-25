import { RegionChooser } from '../components/RegionChooser'
import { useDocumentMeta } from '../lib/useDocumentMeta'

/** Reached from the yellow homepage button: pick which country to look at. */
export function OutlookRegions() {
  useDocumentMeta(
    'Storm Outlook',
    'Experimental amateur storm outlooks published by ASFC for Slovakia and Czechia.',
  )

  return (
    <RegionChooser
      title="Storm Outlook"
      basePath="/outlook"
      labelFor={(country) => `FORECAST FOR ${country.toUpperCase()}`}
    />
  )
}
