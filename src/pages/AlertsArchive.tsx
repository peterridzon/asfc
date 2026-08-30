import { DisclaimerDialog } from '../components/DisclaimerDialog'
import { FullScreenImages } from '../components/FullScreenImages'
import { useTranslation } from '../lib/i18n/useTranslation'
import { usePosts } from '../lib/usePosts'
import { useDocumentMeta } from '../lib/useDocumentMeta'

/** Alerts manually archived from /admin — everything else stays on /alerts. */
export function AlertsArchive() {
  const { t, lang } = useTranslation()
  useDocumentMeta(t('archive.alertsArchive'), t('archive.alertsArchiveMetaDesc'))
  const { posts, loading, error } = usePosts('alerts', lang)
  const archived = posts.filter((post) => post.archived)

  return (
    <>
      <DisclaimerDialog />
      <FullScreenImages
        posts={archived}
        loading={loading}
        error={error}
        emptyHint={t('archive.alertsArchiveEmptyHint')}
      />
    </>
  )
}
