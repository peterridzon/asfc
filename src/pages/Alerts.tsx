import { DisclaimerDialog } from '../components/DisclaimerDialog'
import { FullScreenImages } from '../components/FullScreenImages'
import { useTranslation } from '../lib/i18n/useTranslation'
import { usePosts } from '../lib/usePosts'
import { useDocumentMeta } from '../lib/useDocumentMeta'

/** Alerts images, one per screenful, each with its text printed underneath. */
export function Alerts() {
  const { t, lang } = useTranslation()
  useDocumentMeta(t('alerts.title'), t('alerts.metaDesc'))
  const { posts, loading, error } = usePosts('alerts', lang)

  return (
    <>
      <DisclaimerDialog />
      <FullScreenImages
        posts={posts}
        loading={loading}
        error={error}
        emptyHint={t('alerts.emptyHint')}
      />
    </>
  )
}
