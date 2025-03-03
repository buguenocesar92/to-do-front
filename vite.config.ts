import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'node:path'

export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@fortawesome': path.resolve(__dirname, 'node_modules/@fortawesome')
    }
  },
  server: {
    fs: {
      allow: [
        path.resolve(__dirname, './'),
        'C:/Users/admin/dev/to-do-app/to-do-front/node_modules/.pnpm'
      ]
    }
  }
})
