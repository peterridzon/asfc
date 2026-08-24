import { handleLogin } from '../../shared/handlers'
import type { CmsEnv } from '../../shared/cms'

export const onRequestPost = (context: { request: Request; env: CmsEnv }) =>
  handleLogin(context.request, context.env)
