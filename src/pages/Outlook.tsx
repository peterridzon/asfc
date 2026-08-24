import { DisclaimerDialog } from '../components/DisclaimerDialog'
import { FullScreenImages } from '../components/FullScreenImages'
import { usePosts } from '../lib/usePosts'
import { useDocumentMeta } from '../lib/useDocumentMeta'

/** Storm outlook images, one per screenful, on a plain white page. */
export function Outlook() {
  useDocumentMeta('Storm Outlook', 'Experimental amateur storm outlook images published by ASFC.')
  const { posts, loading, error } = usePosts('outlook')

  return (
    <>
      <DisclaimerDialog />
      <FullScreenImages
        posts={posts}
        loading={loading}
        error={error}
        emptyHint="No storm outlooks published yet."
      />
    </>
  )
}
