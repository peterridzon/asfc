import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { devCmsApi } from './vite-plugins/devCmsApi.ts'

export default defineConfig(({ mode }) => ({
  // An empty prefix loads unprefixed variables; they stay on the dev server and
  // are never exposed to the client bundle.
  plugins: [react(), tailwindcss(), devCmsApi(loadEnv(mode, process.cwd(), ''))],
}))
