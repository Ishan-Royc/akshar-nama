import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures assets load correctly when hosted on GitHub Pages sub-paths
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
      clientPort: 5173,
    },
  },
})
