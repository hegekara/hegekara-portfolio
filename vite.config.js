import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // "/github-api" ile başlayan istekleri yakala ve github.com'a yönlendir
      '/github-api': {
        target: 'https://github.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/github-api/, ''),
        // GitHub'ın beklediği AJAX header'ını doğrudan proxy üzerinden yolluyoruz
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      }
    }
  }
})