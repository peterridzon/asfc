import { useCallback, useEffect, useState } from 'react'
import { fetchPosts, type Post, type Section } from './api'

export interface PostsState {
  posts: Post[]
  loading: boolean
  error: string | null
  reload: () => void
}

/**
 * Loads the published posts, optionally filtered to one section and
 * translated server-side into the given language (anything other than
 * 'en' asks the Worker to run the post's alt text and caption through
 * Cloudflare Workers AI, cached per post so it only happens once).
 */
export function usePosts(section?: Section, lang?: string): PostsState {
  const [posts, setPosts] = useState<Post[]>([])
  // Starts true and is only ever set from the request's callbacks, never
  // synchronously inside the effect.
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [nonce, setNonce] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    fetchPosts(controller.signal, lang)
      .then((all) => {
        if (!active) return
        setPosts(section ? all.filter((post) => post.section === section) : all)
        setError(null)
      })
      .catch((cause: unknown) => {
        if (!active || controller.signal.aborted) return
        setError((cause as Error).message || 'Could not load images.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [section, lang, nonce])

  const reload = useCallback(() => setNonce((value) => value + 1), [])
  return { posts, loading, error, reload }
}
