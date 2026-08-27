import { RegionChooser } from '../components/RegionChooser'
import { useTranslation } from '../lib/i18n/useTranslation'
import { useDocumentMeta } from '../lib/useDocumentMeta'

/** Reached from the homepage: pick whose older outlooks to browse. */
export function ArchiveRegions() {
  const { t } = useTranslation()
  useDocumentMeta(t('archive.chooserTitle'), t('archive.chooserMetaDesc'))

  return (
    <RegionChooser
      titleKey="archive.chooserTitle"
      basePath="/archive"
      labelKey="archive.countryArchive"
    />
  )
}
