import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import { VitePWA } from 'vite-plugin-pwa';

/**
 * `CORTEX_BASE` sets the URL path the app is served from.
 *
 * Default `/` suits a dedicated host. A project page on GitHub Pages lives at
 * `/cortex/`, and every asset URL and the service worker scope have to agree
 * with that or the app loads a blank page.
 */
const base = process.env.CORTEX_BASE ?? '/';

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['apple-touch-icon.png', 'favicon-32.png'],
      manifest: {
        // Plain ASCII on purpose: an app name is rendered by the OS launcher,
        // and a stray encoding problem there is both ugly and hard to notice.
        name: 'Cortex - Biology and Chemistry',
        short_name: 'Cortex',
        description:
          'Answer first, read second. Spaced practice for AP Biology and Honors Chemistry.',
        lang: 'en',
        // Portrait only: every screen is a single column, and a rotated phone
        // just makes the question text span an uncomfortable line length.
        orientation: 'portrait',
        display: 'standalone',
        theme_color: '#ffc542',
        background_color: '#fffdf7',
        start_url: base,
        scope: base,
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Everything is precached, so the app works with no network at all.
        // The content bundle is part of the JS, so questions come offline too.
        globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2}'],
        // Any unknown path falls back to the app shell, so a deep link or a
        // refresh inside the installed app does not 404.
        navigateFallback: `${base}index.html`,
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    environment: 'node',
    environmentMatchGlobs: [['src/**/*.test.tsx', 'jsdom']],
    setupFiles: ['src/test/setup-indexeddb.ts'],
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'scripts/**/*.test.ts'],
  },
});
