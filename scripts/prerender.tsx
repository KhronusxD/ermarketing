/**
 * Build-time static pre-rendering for high-traffic + SEO-critical routes.
 *
 * Vite is an SPA — its default index.html ships an empty <div id="root"></div>
 * that React fills after the JS bundle parses. On simulated mobile 4G that
 * adds 4-5 seconds to LCP because the browser has nothing to paint until JS
 * runs. This script runs after `vite build` and writes a per-route HTML file
 * with the React tree pre-rendered into the root div, so the LCP element is
 * in the HTML the browser parses on first byte.
 *
 * For the blog routes the win is double: pre-rendering also gives Google
 * full article HTML on the first request, with per-page <title>, <meta
 * description>, OpenGraph tags and JSON-LD (BlogPosting / Article schema).
 * That's what surfaces sitelinks and rich results in SERPs.
 *
 * Critical CSS extraction: after rendering each route, Beasties analyses the
 * static markup and emits only the CSS rules whose selectors apply to it.
 * The remaining CSS is async-loaded via <link rel="preload" as="style">.
 *
 * Run: tsx scripts/prerender.tsx (chained from `npm run build`).
 */
import { writeFileSync, readFileSync, readdirSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Beasties from 'beasties';
import App from '../App';
import { POSTS } from '../components/Blog/posts';
import { AUTHOR } from '../components/Blog/types';

const SITE_ORIGIN = 'https://ermarketing.com.br';
const DEFAULT_OG = `${SITE_ORIGIN}/assets/red-logo.png`;

interface RouteMeta {
    title: string;
    description: string;
    canonical: string;
    ogType?: 'website' | 'article';
    publishedAt?: string;
    /** Optional JSON-LD object — stringified and inserted before </head>. */
    jsonLd?: Record<string, unknown>;
}

interface RouteSpec {
    path: string;
    out: string;
    meta: RouteMeta;
}

const blogIndexMeta: RouteMeta = {
    title: 'Blog ER Marketing · Marketing de performance sem rodeio',
    description:
        'Análises, guias e bastidor de operação sobre tráfego pago, marketing digital em Manaus e ROI real. Por Ed Rodrigues, gestor de mais de R$ 5 milhões em mídia paga.',
    canonical: `${SITE_ORIGIN}/blog`,
    ogType: 'website',
    jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Blog ER Marketing',
        url: `${SITE_ORIGIN}/blog`,
        publisher: {
            '@type': 'Organization',
            name: 'ER Marketing',
            url: SITE_ORIGIN,
            logo: `${SITE_ORIGIN}/assets/red-logo.png`,
        },
        blogPost: POSTS.map((p) => ({
            '@type': 'BlogPosting',
            headline: p.title,
            url: `${SITE_ORIGIN}/blog/${p.slug}`,
            datePublished: p.publishedAt,
        })),
    },
};

const ROUTES: RouteSpec[] = [
    {
        path: '/restaurantes-manaus',
        out: 'restaurantes-manaus/index.html',
        meta: {
            title:
                'Marketing para Restaurantes em Manaus · ER Marketing',
            description:
                'Estratégia, tráfego pago e captação audiovisual presencial pra restaurantes em Manaus. Mais de 280% em reservas no Taychi Sushi Bar e 190% em pedidos diretos no La Pizza Rio.',
            canonical: `${SITE_ORIGIN}/restaurantes-manaus`,
            ogType: 'website',
        },
    },
    { path: '/blog', out: 'blog/index.html', meta: blogIndexMeta },
    ...POSTS.map<RouteSpec>((p) => ({
        path: `/blog/${p.slug}`,
        out: `blog/${p.slug}/index.html`,
        meta: {
            title: `${p.title} · Blog ER Marketing`,
            description: p.description,
            canonical: `${SITE_ORIGIN}/blog/${p.slug}`,
            ogType: 'article',
            publishedAt: p.publishedAt,
            jsonLd: {
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                headline: p.title,
                description: p.description,
                datePublished: p.publishedAt,
                author: {
                    '@type': 'Person',
                    name: AUTHOR.name,
                    description: `${AUTHOR.role}. ${AUTHOR.bio}`,
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'ER Marketing',
                    url: SITE_ORIGIN,
                    logo: {
                        '@type': 'ImageObject',
                        url: `${SITE_ORIGIN}/assets/red-logo.png`,
                    },
                },
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': `${SITE_ORIGIN}/blog/${p.slug}`,
                },
                articleSection: p.category,
                keywords: p.tags.join(', '),
            },
        },
    })),
];

const distDir = path.resolve('dist');
const template = readFileSync(path.join(distDir, 'index.html'), 'utf-8');

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
    inlineFonts: true,
    preload: 'swap',
    pruneSource: false,
    logLevel: 'silent',
});

// Replaces the default <title> and adds meta + canonical + JSON-LD into the
// <head>. We intentionally edit the HTML as a string so it works even when
// the template doesn't have a predictable head structure.
const injectHead = (html: string, meta: RouteMeta): string => {
    const og = DEFAULT_OG;
    const tags = [
        `<title>${escapeHtml(meta.title)}</title>`,
        `<meta name="description" content="${escapeAttr(meta.description)}">`,
        `<link rel="canonical" href="${meta.canonical}">`,
        `<meta property="og:title" content="${escapeAttr(meta.title)}">`,
        `<meta property="og:description" content="${escapeAttr(meta.description)}">`,
        `<meta property="og:url" content="${meta.canonical}">`,
        `<meta property="og:type" content="${meta.ogType ?? 'website'}">`,
        `<meta property="og:image" content="${og}">`,
        `<meta property="og:site_name" content="ER Marketing">`,
        `<meta property="og:locale" content="pt_BR">`,
        `<meta name="twitter:card" content="summary_large_image">`,
        `<meta name="twitter:title" content="${escapeAttr(meta.title)}">`,
        `<meta name="twitter:description" content="${escapeAttr(meta.description)}">`,
        `<meta name="twitter:image" content="${og}">`,
    ];
    if (meta.publishedAt) {
        tags.push(
            `<meta property="article:published_time" content="${meta.publishedAt}">`,
            `<meta property="article:author" content="${AUTHOR.name}">`,
        );
    }
    if (meta.jsonLd) {
        tags.push(
            `<script type="application/ld+json">${JSON.stringify(meta.jsonLd)}</script>`,
        );
    }
    const block = tags.join('\n    ');

    // Strip the SPA's default <title>...</title> first so we don't end up
    // with two titles in the head — duplicate <title> tags break SEO tools.
    let out = html.replace(
        /<title>[^<]*<\/title>/,
        '',
    );
    out = out.replace('</head>', `    ${block}\n  </head>`);
    return out;
};

const escapeHtml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escapeAttr = (s: string) =>
    s
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

for (const { path: routePath, out, meta } of ROUTES) {
    const markup = renderToStaticMarkup(
        React.createElement(
            StaticRouter,
            { location: routePath },
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

    html = injectHead(html, meta);

    html = await beasties.process(html);

    const outPath = path.join(distDir, out);
    mkdirSync(path.dirname(outPath), { recursive: true });
    writeFileSync(outPath, html);
    const sizeKb = (Buffer.byteLength(html) / 1024).toFixed(1);
    console.log(`✓ Pre-rendered ${routePath.padEnd(50)} -> ${out}  (${sizeKb} KiB)`);
}

// Generate sitemap.xml — lists every static + dynamic blog route so Google
// can crawl them on first visit. Lastmod uses each post's publishedAt for
// the blog entries and today for the catalog pages.
const today = new Date().toISOString().slice(0, 10);
const sitemapEntries: Array<{ loc: string; lastmod: string; priority?: number }> = [
    { loc: `${SITE_ORIGIN}/`, lastmod: today, priority: 1.0 },
    { loc: `${SITE_ORIGIN}/auditoria-de-lucro-invisivel`, lastmod: today, priority: 0.9 },
    { loc: `${SITE_ORIGIN}/restaurantes-manaus`, lastmod: today, priority: 0.8 },
    { loc: `${SITE_ORIGIN}/blog`, lastmod: today, priority: 0.7 },
    ...POSTS.map((p) => ({
        loc: `${SITE_ORIGIN}/blog/${p.slug}`,
        lastmod: p.publishedAt,
        priority: 0.6,
    })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
    .map(
        (e) => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <priority>${e.priority?.toFixed(1) ?? '0.5'}</priority>
  </url>`,
    )
    .join('\n')}
</urlset>
`;
writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
console.log(`✓ Wrote sitemap.xml with ${sitemapEntries.length} URLs`);
