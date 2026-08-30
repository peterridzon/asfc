import { RegionChooser } from '../components/RegionChooser'
import { useTranslation } from '../lib/i18n/useTranslation'
import { useDocumentMeta } from '../lib/useDocumentMeta'

/** Reached from the Archive root: pick whose older outlooks to browse. */
export function ArchiveOutlookRegions() {
  const { t } = useTranslation()
  useDocumentMeta(t('archive.chooserTitle'), t('archive.chooserMetaDesc'))

  return (
    <RegionChooser
      titleKey="archive.chooserTitle"
      basePath="/archive/outlook"
      labelKey="archive.countryArchive"
    />
  )
}
