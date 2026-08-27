import { useParams } from 'react-router-dom'
import { DisclaimerDialog } from '../components/DisclaimerDialog'
import { FullScreenImages } from '../components/FullScreenImages'
import { countryTranslationKey } from '../lib/i18n/translations'
import { useTranslation } from '../lib/i18n/useTranslation'
import { getOutlookRegion } from '../lib/sections'
import { usePosts } from '../lib/usePosts'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { NotFound } from './NotFound'

/** Every outlook for one country except the current one. */
export function Archive() {
  const { region: slug = '' } = useParams()
  const region = getOutlookRegion(slug)
  const { t, lang } = useTranslation()
  const country = region ? t(countryTranslationKey(region.slug)) : ''

  useDocumentMeta(
    region ? t('archive.countryArchive', { country }) : t('notFound.title'),
    region ? t('archive.pageMetaDesc', { country }) : t('notFound.metaDesc'),
  )

  const { posts, loading, error } = usePosts(region?.section, lang)

  if (!region) return <NotFound />

  return (
    <>
      <DisclaimerDialog />
      <FullScreenImages
        // The first entry is the current outlook and lives on /outlook.
        posts={posts.slice(1)}
        loading={loading}
        error={error}
        emptyHint={t('archive.emptyHint', { country })}
      />
    </>
  )
}
