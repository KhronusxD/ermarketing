import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Inline the bundled CSS into index.html as a <style> block + inject preload
// links for critical above-the-fold fonts (using hashed filenames resolved
// from the bundle). Vite's default is a render-blocking <link rel="stylesheet">
// which adds ~1.5s on simulated mobile 4G. We tried the async-CSS (media=print
// swap) pattern, but on a JS-rendered SPA the DOM ends up painted *before*
// the swap completes — so the styled paint becomes the LCP and lands later
// than render-blocking would. Inlining the gzipped 13 KiB CSS into the HTML
// lets the bundled styles be available the moment the HTML parses, no second
// request.
//
// Font preloads: @fontsource-imported faces are discovered by the parser only
// after the inline CSS is parsed, which puts the font fetch off the critical
// path of the LCP element (a Playfair Display H1 on /restaurantes-manaus).
// We inject explicit <link rel="preload" as="font" crossorigin> for the
// fonts the hero/header actually use so the browser starts the fetch in
// parallel with HTML parsing — the H1 paints with the target font on first
// stable LCP candidate, no swap-induced re-paint pushing LCP later.
const CRITICAL_FONT_PATTERNS = [
    // Body copy — Inter 400 (paragraphs) and 500 (subtle emphasis spans)
    /inter-latin-400-normal-.*\.woff2$/,
    /inter-latin-500-normal-.*\.woff2$/,
    // Hero CTA / SectionLabel uses Inter 600/700, but those are smaller text
    // areas and tolerate a swap. Skipping their preloads keeps total preload
    // bytes under ~50 KiB so we don't choke the slow-4G pipe.
    // H1 LCP element — Playfair Display 600 normal + the italic span
    /playfair-display-latin-600-normal-.*\.woff2$/,
    /playfair-display-latin-600-italic-.*\.woff2$/,
];

const inlineCssPlugin = (): Plugin => ({
    name: 'inline-css',
    enforce: 'post',
    apply: 'build',
    generateBundle(_, bundle) {
        const cssAsset = Object.values(bundle).find(
            (a) => a.type === 'asset' && a.fileName.endsWith('.css'),
        );
        const htmlAsset = Object.values(bundle).find(
            (a) => a.type === 'asset' && a.fileName.endsWith('.html'),
        );
        if (!cssAsset || !htmlAsset || cssAsset.type !== 'asset' || htmlAsset.type !== 'asset') return;

        const css = String(cssAsset.source);
        let html = String(htmlAsset.source);

        // Resolve hashed font filenames from the bundle and build preload tags.
        const criticalFontFiles = Object.keys(bundle).filter((f) =>
            CRITICAL_FONT_PATTERNS.some((re) => re.test(f)),
        );
        const fontPreloads = criticalFontFiles
            .map((f) => `<link rel="preload" as="font" type="font/woff2" href="/${f}" crossorigin>`)
            .join('\n  ');

        if (fontPreloads) {
            html = html.replace('</head>', `  ${fontPreloads}\n</head>`);
        }

        // Replace any <link rel="stylesheet" ... href=".../*.css" ...> with an
        // inline <style> block. Drops crossorigin/media attrs since they're
        // pointless on inline styles.
        html = html.replace(
            /<link\s+rel="stylesheet"[^>]*href="[^"]+\.css"[^>]*>/g,
            `<style>${css}</style>`,
        );

        htmlAsset.source = html;

        // Remove the CSS asset from the bundle — nothing references it now.
        delete (bundle as Record<string, unknown>)[cssAsset.fileName];
    },
});

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), inlineCssPlugin()],
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
