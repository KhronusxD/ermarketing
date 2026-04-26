import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Vite default-injects the bundled stylesheet as a render-blocking
// <link rel="stylesheet">. With ~90 KiB of CSS (Tailwind + every fontsource
// @font-face), simulated mobile 4G turns that into ~1.5s of render-blocking
// time and tanked our LCP. Switch to the standard async-CSS pattern: ship the
// stylesheet as media="print" so the browser fetches but doesn't apply it,
// then flip media="all" on load. Inline body bg in index.html prevents the
// flash, and a <noscript> fallback keeps the site styled with JS disabled.
const asyncCssPlugin = (): Plugin => ({
    name: 'async-css',
    enforce: 'post',
    transformIndexHtml(html) {
        return html.replace(
            /<link rel="stylesheet"([^>]*?)>/g,
            (match, attrs) => {
                const hrefMatch = attrs.match(/href="([^"]+)"/);
                if (!hrefMatch) return match;
                const href = hrefMatch[1];
                return `<link rel="stylesheet"${attrs} media="print" onload="this.media='all';this.onload=null"><noscript><link rel="stylesheet" href="${href}"></noscript>`;
            },
        );
    },
});

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), asyncCssPlugin()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // Modern target — kills legacy JS transforms/polyfills that Lighthouse
        // flags. Mobile Safari ≥ iOS 15 and evergreen Chrome/Firefox already
        // ship native top-level await, optional chaining, etc.
        target: 'es2022',
        // Skip eager <link rel="modulepreload"> for chunks that aren't on the
        // critical path of the LCP. framer-motion is only needed by below-the-
        // fold sections (lazy on every LP), so preloading it in <head> just
        // burns mobile bandwidth before the hero finishes painting. The runtime
        // still preloads it the moment a lazy chunk that uses it is requested.
        modulePreload: {
          resolveDependencies: (filename, deps) =>
            deps.filter((d) => !/framer-motion|lucide/.test(d)),
        },
        // Split heavy libs into stable, separately-cacheable chunks so a
        // returning visitor doesn't re-download react/framer-motion/lucide
        // when only the app code changes.
        rollupOptions: {
          output: {
            manualChunks: {
              'react-vendor': ['react', 'react-dom', 'react-router-dom'],
              'framer-motion': ['framer-motion'],
              'lucide': ['lucide-react'],
            },
          },
        },
      },
    };
});
