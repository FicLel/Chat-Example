import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: '3002',
  },
  plugins: [
    vue(),
    VitePWA({
      mode: "development",
      base: "/",
      srcDir: "src",
      filename: "sw.js",
      includeAssets: ["/favicon.png"],
      strategies: "injectManifest",
      manifest: {
        name: "web_chat",
        short_name: "web_chat",
        theme_color: "#ffffff",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        icons: [
          {
            "src": "/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/android-chrome-256x256.png",
            "sizes": "256x256",
            "type": "image/png"
          },
        ],
      },
    }),
  ]
})
