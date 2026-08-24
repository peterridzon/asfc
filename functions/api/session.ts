import { handleSession } from '../../shared/handlers'
import type { CmsEnv } from '../../shared/cms'

export const onRequestGet = (context: { request: Request; env: CmsEnv }) =>
  handleSession(context.request, context.env)
