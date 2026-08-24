import { handleCreatePost, handleListPosts } from '../../shared/handlers'
import type { CmsEnv } from '../../shared/cms'

export const onRequestGet = (context: { env: CmsEnv }) => handleListPosts(context.env)

export const onRequestPost = (context: { request: Request; env: CmsEnv }) =>
  handleCreatePost(context.request, context.env)
