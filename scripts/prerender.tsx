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
 * Hydration: the same component tree is re-rendered on the client and
 * `hydrateRoot` reuses the existing DOM (see index.tsx). For the routes
 * pre-rendered here, the corresponding route component is imported eagerly
 * in App.tsx so the server- and client-rendered output match exactly.
 *
 * Run: tsx scripts/prerender.tsx (chained from `npm run build`).
 */
import { writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
// react-router v7 exports StaticRouter directly from the main package; the
// /server subpath that v6 used is gone.
import { StaticRouter } from 'react-router-dom';
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

for (const { path: routePath, out } of ROUTES) {
    const markup = renderToStaticMarkup(
        React.createElement(StaticRouter, { location: routePath },
            React.createElement(App),
        ),
    );

    const html = template.replace(
        '<div id="root"></div>',
        `<div id="root">${markup}</div>`,
    );

    const outPath = path.join(distDir, out);
    mkdirSync(path.dirname(outPath), { recursive: true });
    writeFileSync(outPath, html);
    const sizeKb = (Buffer.byteLength(html) / 1024).toFixed(1);
    console.log(`✓ Pre-rendered ${routePath.padEnd(28)} -> ${out}  (${sizeKb} KiB)`);
}
