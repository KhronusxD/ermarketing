/**
 * Build-time static pre-rendering for high-traffic routes.
 *
 * Vite is an SPA — its default index.html ships an empty <div id="root"></div>
 * that React fills after the JS bundle parses. On simulated mobile 4G that
 * adds 4-5 seconds to LCP because the browser has nothing to paint until JS
 * runs. This script runs after `vite build` and writes a per-route HTML file
 * with the React tree pre-rendered into the root div, so the LCP element is
 * in the HTML the browser parses on first byte.
 *
 * Critical CSS extraction: after rendering each route, Beasties analyses the
 * static markup and emits only the CSS rules whose selectors apply to it.
 * The remaining CSS is async-loaded via <link rel="preload" as="style">. This
 * cuts ~80 KiB (and ~200-400 ms of CSS parse on the Lighthouse Moto G CPU
 * profile) off the LCP critical path on /restaurantes-manaus.
 *
 * The Vite plugin (vite.config.ts) keeps the bundled CSS inline as
 * <style data-bundle> in the SPA template. Here we swap that <style> back to
 * a <link rel="stylesheet"> before invoking Beasties so it has an external
 * stylesheet to split critical / deferred from.
 *
 * Hydration: the same component tree is re-rendered on the client and
 * `hydrateRoot` reuses the existing DOM (see index.tsx). For the routes
 * pre-rendered here, the corresponding route component is imported eagerly
 * in App.tsx so the server- and client-rendered output match exactly.
 *
 * Run: tsx scripts/prerender.tsx (chained from `npm run build`).
 */
import { writeFileSync, readFileSync, readdirSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
// react-router v7 exports StaticRouter directly from the main package; the
// /server subpath that v6 used is gone.
import { StaticRouter } from 'react-router-dom';
import Beasties from 'beasties';
import App from '../App';

interface RouteSpec {
    path: string;
    /** Output path relative to dist/, e.g. 'restaurantes-manaus/index.html' */
    out: string;
}

// Add more routes here as we eager-import their landings in App.tsx.
const ROUTES: RouteSpec[] = [
    { path: '/restaurantes-manaus', out: 'restaurantes-manaus/index.html' },
];

const distDir = path.resolve('dist');
const template = readFileSync(path.join(distDir, 'index.html'), 'utf-8');

// Locate the bundled CSS file Vite emitted. The inlineCssPlugin keeps it on
// disk (despite inlining it into dist/index.html) so we can re-link it here.
const cssAssetFile = readdirSync(path.join(distDir, 'assets')).find((f) => f.endsWith('.css'));
if (!cssAssetFile) {
    throw new Error(
        'Bundled CSS file not found in dist/assets/. The Vite inline-css plugin must keep the CSS asset on disk for Beasties to split critical/deferred.',
    );
}
const cssLink = `<link rel="stylesheet" href="/assets/${cssAssetFile}">`;

const beasties = new Beasties({
    path: distDir,
    publicPath: '/',
    // Keep @font-face declarations in the inline critical CSS. The 4 critical
    // woff2 files are preloaded from vite.config.ts; for those preloads to
    // actually be USED on first paint, the parser has to see the matching
    // @font-face block in the critical inline CSS — otherwise the preloaded
    // bytes sit in cache while the H1 paints with a fallback font, then
    // re-paints once the deferred stylesheet arrives (the exact LCP swap we
    // are trying to avoid). The cost is ~3 KiB of inline @font-face rules.
    inlineFonts: true,
    // Async-load the deferred CSS via <link rel="preload" as="style"
    // onload="this.rel='stylesheet'"> with a <noscript> stylesheet fallback.
    preload: 'swap',
    // Don't strip the deferred file — keep it as the full stylesheet, since
    // hydration may apply utility classes that Beasties' static analysis
    // didn't see (e.g. classes added by JS state).
    pruneSource: false,
    logLevel: 'silent',
});

for (const { path: routePath, out } of ROUTES) {
    const markup = renderToStaticMarkup(
        React.createElement(StaticRouter, { location: routePath },
            React.createElement(App),
        ),
    );

    let html = template.replace(
        '<div id="root"></div>',
        `<div id="root">${markup}</div>`,
    );

    // Swap the inline bundle <style> back to an external <link> so Beasties
    // can read the CSS from disk and split critical / deferred.
    html = html.replace(/<style data-bundle>[\s\S]*?<\/style>/, cssLink);

    html = await beasties.process(html);

    const outPath = path.join(distDir, out);
    mkdirSync(path.dirname(outPath), { recursive: true });
    writeFileSync(outPath, html);
    const sizeKb = (Buffer.byteLength(html) / 1024).toFixed(1);
    console.log(`✓ Pre-rendered ${routePath.padEnd(28)} -> ${out}  (${sizeKb} KiB)`);
}
