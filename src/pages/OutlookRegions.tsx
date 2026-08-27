import { RegionChooser } from '../components/RegionChooser'
import { useTranslation } from '../lib/i18n/useTranslation'
import { useDocumentMeta } from '../lib/useDocumentMeta'

/** Reached from the yellow homepage button: pick which country to look at. */
export function OutlookRegions() {
  const { t } = useTranslation()
  useDocumentMeta(t('outlook.chooserTitle'), t('outlook.chooserMetaDesc'))

  return (
    <RegionChooser titleKey="outlook.chooserTitle" basePath="/outlook" labelKey="outlook.forecastFor" />
  )
}
