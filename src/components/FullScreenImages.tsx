import { LazyImage } from './LazyImage'
import type { Post } from '../lib/api'

interface FullScreenImagesProps {
  posts: Post[]
  loading: boolean
  error: string | null
  emptyHint: string
}

/**
 * One image per screenful. The picture is scaled to fill as much of the
 * viewport as it can without being cropped, so nothing on a weather map is
 * ever cut off. Any text on the entry is printed underneath.
 */
export function FullScreenImages({ posts, loading, error, emptyHint }: FullScreenImagesProps) {
  if (loading || error || posts.length === 0) {
    return (
      <div className="flex min-h-[calc(100dvh-10rem)] items-center justify-center px-6 text-center">
        <p className="max-w-md text-sm text-navy-soft">
          {loading ? 'Loading…' : error ? error : emptyHint}
        </p>
      </div>
    )
  }

  return (
    <>
      {posts.map((post, index) => (
        <section
          key={post.id}
          className="flex min-h-[calc(100dvh-4.5rem)] flex-col items-center justify-center gap-5 px-4 py-6 sm:px-6"
        >
          <LazyImage
            src={post.image}
            alt={post.alt}
            eager={index === 0}
            className="max-h-[calc(100dvh-9rem)] w-auto max-w-full"
          />
          {post.text && (
            <p className="max-w-3xl text-center text-base leading-relaxed whitespace-pre-line text-navy sm:text-lg">
              {post.text}
            </p>
          )}
        </section>
      ))}
    </>
  )
}
