import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Cache-busting comment added to force a clean build.
  plugins: [react()],
  preview: {
    host: '0.0.0.0',
    port: 10000,
    allowedHosts: ['gt-social-media.onrender.com']
  }
})