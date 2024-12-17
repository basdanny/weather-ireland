import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Weather Ireland',
        short_name: 'Weather',
        description: 'Weather Progressive Web App',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/weather-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/weather-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})