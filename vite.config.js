import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://api.skygroupvn.com.vn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
  plugins: [vue(), tailwindcss(), vueDevTools()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'vue-auth3/drivers/auth/bearer.js': path.resolve(__dirname, 'node_modules/vue-auth3/dist/drivers/auth/bearer.js'),
      'vue-auth3/drivers/http/axios.js': path.resolve(__dirname, 'node_modules/vue-auth3/dist/drivers/http/axios.js'),
    },
  },
})
