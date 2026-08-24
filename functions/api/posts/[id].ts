import { handleDeletePost } from '../../../shared/handlers'
import type { CmsEnv } from '../../../shared/cms'

export const onRequestDelete = (context: {
  request: Request
  env: CmsEnv
  params: { id: string | string[] }
}) => handleDeletePost(context.request, context.env, String(context.params.id))
