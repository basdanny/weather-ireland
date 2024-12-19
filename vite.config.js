import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Weather Ireland',
        short_name: 'Weather',
        description: 'Weather - Ireland',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'weather-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'weather-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        display: "standalone",
        screenshots: [
          {
            "src": "sample.jpg",
             "sizes": "458x912",
             "type": "image/jpg",
             "form_factor": "narrow",
             "label": "default"
           }
        ]
      }
    })
  ]
})