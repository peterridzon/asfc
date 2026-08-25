import { RegionChooser } from '../components/RegionChooser'
import { useDocumentMeta } from '../lib/useDocumentMeta'

/** Reached from the homepage: pick whose older outlooks to browse. */
export function ArchiveRegions() {
  useDocumentMeta(
    'Outlook Archive',
    'Previously published ASFC storm outlooks for Slovakia and Czechia.',
  )

  return (
    <RegionChooser
      title="Outlook Archive"
      basePath="/archive"
      labelFor={(country) => `${country.toUpperCase()} OUTLOOK ARCHIVE`}
    />
  )
}
