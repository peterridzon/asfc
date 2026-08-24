import { handleGetImage } from '../../../shared/handlers'
import type { CmsEnv } from '../../../shared/cms'

export const onRequestGet = (context: { env: CmsEnv; params: { id: string | string[] } }) =>
  handleGetImage(context.env, String(context.params.id))
