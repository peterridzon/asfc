import { DisclaimerDialog } from '../components/DisclaimerDialog'
import { FullScreenImages } from '../components/FullScreenImages'
import { usePosts } from '../lib/usePosts'
import { useDocumentMeta } from '../lib/useDocumentMeta'

/** Alerts images, one per screenful, each with its text printed underneath. */
export function Alerts() {
  useDocumentMeta('Alerts / Varovania', 'Severe weather images published by ASFC.')
  const { posts, loading, error } = usePosts('alerts')

  return (
    <>
      <DisclaimerDialog />
      <FullScreenImages
        posts={posts}
        loading={loading}
        error={error}
        emptyHint="No alerts published yet."
      />
    </>
  )
}
