import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "prompt",
      devOptions: {
        enabled: true,
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 20 * 1024 * 1024, // 20 MB
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2,mp3,ttf,jpg,jpeg}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\./i,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24,
              },
            },
          },
        ],
      },
      manifest: {
        name: "LikDai",
        short_name: "LikDai",
        start_url: ".",
        display: "standalone",
        theme_color: "#2b2e31",
        background_color: "#040303",
        description:
          "LikDai ၼႆႉ ပဵၼ်ဢႅပ်ႉၽိုၵ်းပေႃႉလိၵ်ႈ ဢၼ်ၶိုၵ်ႉတွၼ်း လႄႈ လႆႈႁဵတ်းဝႆႉ တႃႇႁႂ်ႈၽူႈၸႂ်ႉတိုဝ်းၶဝ် တေမေႃပေႃႉလိၵ်ႈ ၽႃႇသႃႇတႆး။",
        categories: ["education", "productivity"],
        lang: "en",
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable any",
          },
        ],
        screenshots: [
          {
            src: "/images/screenshot-one.png",
            sizes: "640x320",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/images/screenshot-two.png",
            sizes: "640x320",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/images/screenshot-three.png",
            sizes: "640x320",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/images/screenshot-four.png",
            sizes: "640x320",
            type: "image/png",
            form_factor: "wide",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3001,
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
      },
    },
  },
});
