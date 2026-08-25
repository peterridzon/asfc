import { useParams } from 'react-router-dom'
import { DisclaimerDialog } from '../components/DisclaimerDialog'
import { FullScreenImages } from '../components/FullScreenImages'
import { getOutlookRegion } from '../lib/sections'
import { usePosts } from '../lib/usePosts'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { NotFound } from './NotFound'

/** One country's outlook images, one per screenful, on a plain white page. */
export function Outlook() {
  const { region: slug = '' } = useParams()
  const region = getOutlookRegion(slug)

  // Set here rather than in <NotFound />: child effects run first, so this
  // component would otherwise overwrite the 404 title.
  useDocumentMeta(
    region ? region.title : 'Page not found',
    region
      ? `Experimental amateur storm outlook images published by ASFC — ${region.title}.`
      : 'This ASFC page does not exist.',
  )

  const { posts, loading, error } = usePosts(region?.section)

  if (!region) return <NotFound />

  return (
    <>
      <DisclaimerDialog />
      <FullScreenImages
        posts={posts}
        loading={loading}
        error={error}
        emptyHint={`No outlooks published for ${region.title.replace('Forecast for ', '')} yet.`}
      />
    </>
  )
}
