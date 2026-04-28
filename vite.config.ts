import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Inline the bundled CSS into index.html as a <style data-bundle> block + inject
// preload links for critical above-the-fold fonts (using hashed filenames
// resolved from the bundle).
//
// CSS inlining: Vite's default is a render-blocking <link rel="stylesheet">
// which adds ~1.5s on simulated mobile 4G. Inlining the gzipped 13 KiB CSS into
// the HTML lets the bundled styles be available the moment the HTML parses, no
// second request. The CSS asset is INTENTIONALLY kept on disk (not deleted from
// the bundle) so scripts/prerender.tsx can swap the inline <style data-bundle>
// back to a <link> before running Beasties — Beasties extracts a tiny critical
// CSS for the prerendered DOM and async-loads the rest, cutting ~80 KiB of
// CSS-parse work off the LCP critical path. Non-prerendered SPA routes fall
// back to dist/index.html with the inline <style data-bundle>, so they keep
// the current "no extra request" behaviour with no regression.
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
    // H1 LCP element — Playfair Display 600 normal. Italic isn't on the
    // mobile critical path anymore (the H1 accent line dropped italic to
    // avoid a second woff2 fetch that was gating LCP); the desktop italic
    // caption isn't an LCP candidate so we let it lazy-load via @font-face.
    /playfair-display-latin-600-normal-.*\.woff2$/,
];

// Rewrite the @font-face blocks emitted by @fontsource so Playfair Display
// uses `font-display: optional` instead of `swap`. With `swap` the H1 paints
// in a fallback first and re-paints when Playfair arrives — the second paint
// counts as a fresh LCP candidate and gates the Lighthouse score on the slow
// woff2 fetch (Lighthouse simulates 4G; the italic woff2 takes ~2.5 s on
// that pipe). With `optional` the browser only swaps if the font is in
// cache when the H1 first paints; otherwise the fallback is permanent for
// this navigation and LCP fires at FCP. Inter is left as `swap` because
// body copy isn't an LCP candidate and the swap is barely perceptible.
function rewriteFontDisplay(css: string): string {
    return css.replace(
        /@font-face\s*\{([^}]+)\}/g,
        (block, body: string) => {
            if (/font-family\s*:\s*['"]?Playfair Display/i.test(body)) {
                return `@font-face{${body.replace(/font-display\s*:\s*swap/g, 'font-display:optional')}}`;
            }
            return block;
        },
    );
}

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

        // Patch font-display before we either inline or hand to Beasties.
        cssAsset.source = rewriteFontDisplay(String(cssAsset.source));
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
        // inline <style data-bundle> block. The data-bundle marker lets the
        // prerender script find this exact <style> (vs. the small inline base
        // style for the dark page background) and swap it back to an external
        // <link> before running Beasties for critical-CSS extraction.
        html = html.replace(
            /<link\s+rel="stylesheet"[^>]*href="[^"]+\.css"[^>]*>/g,
            `<style data-bundle>${css}</style>`,
        );

        htmlAsset.source = html;

        // Note: CSS asset is intentionally kept on disk. Prerender script
        // re-references it for Beasties' async-load split.
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
            // Function form so we can pin react/jsx-runtime into react-vendor
            // explicitly. With the simple object form Rollup sometimes hoists
            // jsx-runtime into the first chunk that imports it (framer-motion
            // bundles a CJS interop wrapper that touches it), which then
            // makes every JSX-emitting component statically import the
            // framer-motion chunk — putting framer-motion on the LCP
            // critical chain even when no above-the-fold component uses it.
            manualChunks(id) {
              if (id.includes('node_modules/react/jsx-runtime') ||
                  id.includes('node_modules/react/cjs/react-jsx-runtime') ||
                  id.includes('node_modules/react/index.') ||
                  id.includes('node_modules/react/cjs/react.') ||
                  id.includes('node_modules/react-dom/') ||
                  id.includes('node_modules/scheduler/') ||
                  id.includes('node_modules/react-router-dom/') ||
                  id.includes('node_modules/react-router/')) {
                return 'react-vendor';
              }
              if (id.includes('node_modules/framer-motion/') ||
                  id.includes('node_modules/motion-dom/') ||
                  id.includes('node_modules/motion-utils/')) {
                return 'framer-motion';
              }
              if (id.includes('node_modules/lucide-react/')) {
                return 'lucide';
              }
            },
          },
        },
      },
    };
});
