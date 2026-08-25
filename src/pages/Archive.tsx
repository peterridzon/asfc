import { useParams } from 'react-router-dom'
import { DisclaimerDialog } from '../components/DisclaimerDialog'
import { FullScreenImages } from '../components/FullScreenImages'
import { getOutlookRegion } from '../lib/sections'
import { usePosts } from '../lib/usePosts'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { NotFound } from './NotFound'

/** Every outlook for one country except the current one. */
export function Archive() {
  const { region: slug = '' } = useParams()
  const region = getOutlookRegion(slug)

  useDocumentMeta(
    region ? `${region.country} outlook archive` : 'Page not found',
    region
      ? `Previously published ASFC storm outlooks for ${region.country}.`
      : 'This ASFC page does not exist.',
  )

  const { posts, loading, error } = usePosts(region?.section)

  if (!region) return <NotFound />

  return (
    <>
      <DisclaimerDialog />
      <FullScreenImages
        // The first entry is the current outlook and lives on /outlook.
        posts={posts.slice(1)}
        loading={loading}
        error={error}
        emptyHint={`No older outlooks for ${region.country} yet.`}
      />
    </>
  )
}
