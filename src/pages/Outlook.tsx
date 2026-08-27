import { useParams } from 'react-router-dom'
import { DisclaimerDialog } from '../components/DisclaimerDialog'
import { FullScreenImages } from '../components/FullScreenImages'
import { countryTranslationKey } from '../lib/i18n/translations'
import { useTranslation } from '../lib/i18n/useTranslation'
import { getOutlookRegion } from '../lib/sections'
import { usePosts } from '../lib/usePosts'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { NotFound } from './NotFound'

/**
 * The current outlook for one country — only the newest one. Everything older
 * moves to /archive/<country>.
 */
export function Outlook() {
  const { region: slug = '' } = useParams()
  const region = getOutlookRegion(slug)
  const { t, lang } = useTranslation()
  const country = region ? t(countryTranslationKey(region.slug)) : ''

  // Set here rather than in <NotFound />: child effects run first, so this
  // component would otherwise overwrite the 404 title.
  useDocumentMeta(
    region ? t('outlook.forecastFor', { country }) : t('notFound.title'),
    region ? t('outlook.pageMetaDesc', { country }) : t('notFound.metaDesc'),
  )

  const { posts, loading, error } = usePosts(region?.section, lang)

  if (!region) return <NotFound />

  return (
    <>
      <DisclaimerDialog />
      <FullScreenImages
        posts={posts.slice(0, 1)}
        loading={loading}
        error={error}
        emptyHint={t('outlook.emptyHint', { country })}
      />
    </>
  )
}
