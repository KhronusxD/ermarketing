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
 * For blog/about routes the win is double: pre-rendering also gives Google
 * + AI search crawlers full HTML on the first request, with per-page <title>,
 * <meta description>, OpenGraph tags and JSON-LD (Organization, LocalBusiness,
 * Article, FAQ, Breadcrumb…). That's what surfaces sitelinks and rich
 * results in SERPs and feeds the knowledge graph used by AI search.
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
import { SERVICES as NORTE_SERVICES } from '../components/Norte/services';

// O site é servido em trafegomanaus.com.br. Até aqui o SITE_ORIGIN
// apontava pra ermarketing.com.br, que não resolve DNS — ou seja, cada
// canonical, cada URL do sitemap e o llms.txt diziam ao Google que a
// versão oficial de cada página mora num domínio inexistente. Canonical
// cruzado assim é o tipo de coisa que tira a página inteira do índice.
const SITE_ORIGIN = 'https://trafegomanaus.com.br';
const DEFAULT_OG = `${SITE_ORIGIN}/assets/red-logo.png`;
const PHONE_E164 = '+55-92-98514-6299';

// ──────────────────────────────────────────────────────────────────────
// Reusable schema fragments. Embedded directly in the per-route JSON-LD.
// ──────────────────────────────────────────────────────────────────────

const ORG_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_ORIGIN}/#organization`,
    name: 'Norte Marketing',
    alternateName: 'ER Marketing',
    legalName: 'ER Marketing',
    url: SITE_ORIGIN,
    logo: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/assets/red-logo.png`,
    },
    description:
        'Agência de marketing de performance baseada em Manaus. Tráfego pago, copy, criativos, CRM e BI ponta a ponta.',
    foundingDate: '2018',
    sameAs: [
        'https://instagram.com/edrodrigues.mkt',
        'https://www.linkedin.com/in/edrodriguesmkt/',
    ],
    contactPoint: {
        '@type': 'ContactPoint',
        telephone: PHONE_E164,
        contactType: 'customer service',
        availableLanguage: ['Portuguese'],
        areaServed: 'BR',
    },
    founder: [
        { '@type': 'Person', name: 'Ed Rodrigues' },
        { '@type': 'Person', name: 'Brenno Soares' },
        { '@type': 'Person', name: 'Francyelle Barbosa' },
    ],
    knowsAbout: [
        'Marketing de performance',
        'Meta Ads',
        'Google Ads',
        'TikTok Ads',
        'API de Conversões',
        'Funil de WhatsApp',
        'Tráfego pago em Manaus',
        'Marketing digital pra restaurantes',
    ],
};

const LOCAL_BUSINESS_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_ORIGIN}/#localbusiness`,
    name: 'Norte Marketing',
    alternateName: 'ER Marketing',
    image: `${SITE_ORIGIN}/assets/red-logo.png`,
    url: SITE_ORIGIN,
    telephone: PHONE_E164,
    priceRange: 'R$ 1.500 - R$ 10.000+',
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Manaus',
        addressRegion: 'AM',
        addressCountry: 'BR',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: -3.119,
        longitude: -60.0212,
    },
    areaServed: [
        { '@type': 'Place', name: 'Manaus' },
        { '@type': 'Place', name: 'Amazonas' },
        { '@type': 'Country', name: 'Brasil' },
    ],
    openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
    },
};

const WEBSITE_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_ORIGIN}/#website`,
    url: SITE_ORIGIN,
    name: 'Norte Marketing',
    description:
        'Agência de marketing de performance em Manaus. Tráfego pago, criativo, CRM e BI.',
    publisher: { '@id': `${SITE_ORIGIN}/#organization` },
    potentialAction: {
        '@type': 'SearchAction',
        target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_ORIGIN}/blog?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
    },
    inLanguage: 'pt-BR',
};

// Mirrors the questions in components/FAQ.tsx so Google can surface them
// as a FAQ rich result on the homepage.
const FAQ_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Como funciona a reunião de diagnóstico?',
            acceptedAnswer: {
                '@type': 'Answer',
                text:
                    'É uma call de 15 minutos com um dos sócios. Antes dela, você responde um questionário rápido (3 minutos) que serve pra gente já entrar na reunião com o contexto do seu negócio. Na call, mostramos onde está o gargalo e o plano dos próximos 90 dias.',
            },
        },
        {
            '@type': 'Question',
            name: 'Qual o investimento necessário pra começar com a ER Marketing?',
            acceptedAnswer: {
                '@type': 'Answer',
                text:
                    'A partir de R$ 1.500/mês de fee + R$ 1.000/mês de verba mínima recomendada em mídia paga. Total: R$ 2.500/mês. Não trabalhamos com pacotes fechados — desenhamos pra cada momento.',
            },
        },
        {
            '@type': 'Question',
            name: 'Quais nichos a ER Marketing atende?',
            acceptedAnswer: {
                '@type': 'Answer',
                text:
                    'A metodologia é agnóstica de nicho porque é baseada em fundamentos de negócio. Cases consolidados em e-commerce, infoproduto, serviços B2B, food service, varejo local e educação digital — com forte concentração em Manaus.',
            },
        },
        {
            '@type': 'Question',
            name: 'A ER Marketing faz só tráfego pago?',
            acceptedAnswer: {
                '@type': 'Answer',
                text:
                    'Não. Somos uma assessoria completa de performance: gestão de tráfego, copy, criativos, landing pages, CRM, automação, social media, produção audiovisual e estratégia comercial.',
            },
        },
        {
            '@type': 'Question',
            name: 'Em quanto tempo eu vejo resultado?',
            acceptedAnswer: {
                '@type': 'Answer',
                text:
                    'Os primeiros 30 dias são de aprendizado (tracking, ajuste de público, teste de criativos). Os 60 dias seguintes são de aceleração. Quem espera curva real de retorno antes de 90 dias geralmente desliga o canal antes de ele aprender.',
            },
        },
    ],
};

// Generic breadcrumb generator — used on every non-home page.
// FAQ da home da Norte — mesmo conteúdo que aparece na página, que é o
// que o Google espera: schema tem que refletir texto visível.
const NORTE_FAQ_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        [
            'Como funciona a primeira conversa?',
            'Você chama no WhatsApp, a gente entende o momento do teu negócio e devolve um plano claro de por onde começar. Sem compromisso e sem call de vendas disfarçada.',
        ],
        [
            'Qual o investimento pra começar?',
            'Não trabalhamos com pacote fechado. O projeto é desenhado pro teu momento e objetivo — focamos em negócios que já investem em marketing ou têm capacidade pra começar.',
        ],
        [
            'Quais nichos vocês atendem?',
            'A metodologia é agnóstica de nicho. Temos cases em e-commerce, infoproduto, food service, saúde, construção, varejo local e educação — em Manaus e fora.',
        ],
        [
            'A Norte faz só tráfego pago?',
            'Não. Somos agência 360: tráfego, social media, branding, sites, captação de conteúdo e eventos. Cada frente alimenta a outra.',
        ],
        [
            'Em quanto tempo vejo resultado?',
            'Os primeiros 30 dias são de calibração (tracking, público, criativo). Dos 60 aos 90 dias a curva acelera. Quem desliga antes disso nunca vê o canal maduro.',
        ],
    ].map(([q, a]) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
    })),
};

const breadcrumb = (items: Array<{ name: string; href: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: it.name,
        item: `${SITE_ORIGIN}${it.href}`,
    })),
});

// ──────────────────────────────────────────────────────────────────────
// Route metadata
// ──────────────────────────────────────────────────────────────────────

interface RouteMeta {
    title: string;
    description: string;
    canonical: string;
    ogType?: 'website' | 'article' | 'profile';
    publishedAt?: string;
    /** One or many JSON-LD blocks — each stringified separately. */
    jsonLd?: Array<Record<string, unknown>>;
}

interface RouteSpec {
    path: string;
    out: string;
    meta: RouteMeta;
}

const ROUTES: RouteSpec[] = [
    // Homepage — agora é a Norte. Carrega Organization + LocalBusiness +
    // WebSite + FAQ pra alimentar tanto rich result clássico quanto card
    // de conhecimento de busca por IA.
    {
        path: '/',
        out: 'index.html',
        meta: {
            title: 'Norte · Agência de Marketing em Manaus',
            description:
                'A gente aponta a direção, você caminha. Tráfego pago, social media, branding, sites, captação de conteúdo e eventos — agência 360 em Manaus com +R$ 5M em mídia gerida.',
            canonical: `${SITE_ORIGIN}/`,
            ogType: 'website',
            jsonLd: [ORG_SCHEMA, LOCAL_BUSINESS_SCHEMA, WEBSITE_SCHEMA, NORTE_FAQ_SCHEMA],
        },
    },

    // /er-marketing — a LP de performance que era a home antes do
    // rebrand. Continua no ar porque é a página que o funil de anúncio
    // conhece, e porque o FAQ_SCHEMA dela responde outras perguntas.
    {
        path: '/er-marketing',
        out: 'er-marketing/index.html',
        meta: {
            title: 'ER Marketing · Agência de marketing de performance em Manaus',
            description:
                'Tráfego pago, copy, captação audiovisual e BI ponta a ponta — agência baseada em Manaus, 7 anos de operação, mais de R$ 5 milhões em mídia gerida.',
            canonical: `${SITE_ORIGIN}/er-marketing`,
            ogType: 'website',
            jsonLd: [
                FAQ_SCHEMA,
                breadcrumb([
                    { name: 'Início', href: '/' },
                    { name: 'ER Marketing', href: '/er-marketing' },
                ]),
            ],
        },
    },

    // Quiz / diagnostic landing
    {
        path: '/auditoria-de-lucro-invisivel',
        out: 'auditoria-de-lucro-invisivel/index.html',
        meta: {
            title:
                'Agendar diagnóstico de 15 minutos · ER Marketing',
            description:
                'Em 9 perguntas (3 minutos) entendemos seu negócio e marcamos uma call de 15 min pra mostrar onde o lucro está parado. Sem custo, sem compromisso.',
            canonical: `${SITE_ORIGIN}/auditoria-de-lucro-invisivel`,
            ogType: 'website',
            jsonLd: [
                breadcrumb([
                    { name: 'Início', href: '/' },
                    {
                        name: 'Agendar diagnóstico',
                        href: '/auditoria-de-lucro-invisivel',
                    },
                ]),
            ],
        },
    },

    // About + Author
    {
        path: '/sobre',
        out: 'sobre/index.html',
        meta: {
            title: 'Sobre a ER Marketing · 7 anos, +R$ 5M em mídia',
            description:
                'A ER Marketing é uma agência de marketing de performance baseada em Manaus. História, time, metodologia e números reais de operação.',
            canonical: `${SITE_ORIGIN}/sobre`,
            ogType: 'website',
            jsonLd: [
                ORG_SCHEMA,
                breadcrumb([
                    { name: 'Início', href: '/' },
                    { name: 'Sobre', href: '/sobre' },
                ]),
                {
                    '@context': 'https://schema.org',
                    '@type': 'AboutPage',
                    name: 'Sobre a ER Marketing',
                    url: `${SITE_ORIGIN}/sobre`,
                    mainEntity: { '@id': `${SITE_ORIGIN}/#organization` },
                },
            ],
        },
    },
    {
        path: '/sobre/ed-rodrigues',
        out: 'sobre/ed-rodrigues/index.html',
        meta: {
            title:
                'Ed Rodrigues · Gestor de tráfego pago · Norte',
            description:
                'Bio, trajetória e áreas de especialidade de Ed Rodrigues — gestor de tráfego pago desde 2020, sócio fundador da Norte, +R$ 5 milhões em mídia gerida.',
            canonical: `${SITE_ORIGIN}/sobre/ed-rodrigues`,
            ogType: 'profile',
            jsonLd: [
                {
                    '@context': 'https://schema.org',
                    '@type': 'Person',
                    '@id': `${SITE_ORIGIN}/sobre/ed-rodrigues#person`,
                    name: AUTHOR.name,
                    jobTitle: AUTHOR.role,
                    description: AUTHOR.bio,
                    image: `${SITE_ORIGIN}${AUTHOR.avatar}`,
                    url: `${SITE_ORIGIN}/sobre/ed-rodrigues`,
                    sameAs: [
                        'https://instagram.com/edrodrigues.mkt',
                        'https://www.linkedin.com/in/edrodriguesmkt/',
                    ],
                    worksFor: { '@id': `${SITE_ORIGIN}/#organization` },
                    knowsAbout: [
                        'Meta Ads',
                        'Google Ads',
                        'TikTok Ads',
                        'API de Conversões (CAPI)',
                        'Funil de WhatsApp',
                        'Tráfego pago em Manaus',
                        'Marketing de performance',
                    ],
                },
                breadcrumb([
                    { name: 'Início', href: '/' },
                    { name: 'Sobre', href: '/sobre' },
                    { name: 'Ed Rodrigues', href: '/sobre/ed-rodrigues' },
                ]),
            ],
        },
    },

    // Restaurantes Manaus
    {
        path: '/restaurantes-manaus',
        out: 'restaurantes-manaus/index.html',
        meta: {
            title:
                'Marketing para Restaurantes em Manaus · ER Marketing',
            description:
                'Estratégia, tráfego pago e captação audiovisual presencial pra restaurantes em Manaus. +280% em reservas no Taychi Sushi Bar e +190% em pedidos diretos no La Pizza Rio.',
            canonical: `${SITE_ORIGIN}/restaurantes-manaus`,
            ogType: 'website',
            jsonLd: [
                breadcrumb([
                    { name: 'Início', href: '/' },
                    { name: 'Para restaurantes', href: '/restaurantes-manaus' },
                ]),
            ],
        },
    },

    // /links — link-tree page used as bio destination on Instagram and
    // similar profiles. Pre-rendered so the social-app webview paints
    // the buttons before JS hydrates.
    {
        path: '/links',
        out: 'links/index.html',
        meta: {
            title: 'Norte · Todos os nossos links',
            description:
                'WhatsApp, diagnóstico, site, blog e YouTube da Norte — agência de marketing 360 em Manaus.',
            canonical: `${SITE_ORIGIN}/links`,
            ogType: 'website',
        },
    },

    // /lab-de-performance — waitlist LP for the upcoming course/community
    // (tráfego pago + IA). Submits to the same Make.com webhook with a
    // dedicated type discriminator (`waitlist_lab_performance`).
    {
        path: '/lab-de-performance',
        out: 'lab-de-performance/index.html',
        meta: {
            title:
                'Lab de Performance · Aprenda tráfego pago + IA · Lista de espera',
            description:
                'Lista de espera pra aprender tráfego pago combinado com IA. O método que a ER Marketing usa pra gerenciar +R$ 5M em mídia, em formato de turma. Entre antes da abertura.',
            canonical: `${SITE_ORIGIN}/lab-de-performance`,
            ogType: 'website',
        },
    },

    // /norte — mesmo conteúdo da raiz, mantido de pé porque o endereço
    // já circulou. Canonical aponta pra raiz pra o Google consolidar os
    // dois num só e não tratar como conteúdo duplicado.
    {
        path: '/norte',
        out: 'norte/index.html',
        meta: {
            title: 'Norte · Agência de Marketing em Manaus',
            description:
                'A gente aponta a direção, você caminha. Tráfego pago, social media, branding, sites, captação de conteúdo e eventos — agência 360 em Manaus com +R$ 5M em mídia gerida.',
            canonical: `${SITE_ORIGIN}/`,
            ogType: 'website',
        },
    },

    // /norte/<slug> — uma LP por serviço da Norte.
    ...NORTE_SERVICES.map<RouteSpec>((s) => ({
        path: `/norte/${s.slug}`,
        out: `norte/${s.slug}/index.html`,
        meta: {
            title: `${s.name} em Manaus · Norte Marketing`,
            description: s.seoDescription,
            canonical: `${SITE_ORIGIN}/norte/${s.slug}`,
            ogType: 'website',
        },
    })),

    // /edrodrigues — captura pra Meta Testers (aulão + grupo WhatsApp).
    // Submit vai pro Make.com com `type: 'meta_testers_waitlist'` e após
    // salvar o lead a página redireciona pro grupo do WhatsApp.
    {
        path: '/edrodrigues',
        out: 'edrodrigues/index.html',
        meta: {
            title:
                'Meta Testers · Aulão de novidades Meta + API do Meta no Claude',
            description:
                'Aulão gratuito de Ed Rodrigues sobre novidades do Meta Ads em 2026 e como instalar a API oficial do Meta no Claude pra rodar campanhas por conversa. Vagas limitadas — entra no grupo do WhatsApp.',
            canonical: `${SITE_ORIGIN}/edrodrigues`,
            ogType: 'website',
        },
    },

    // Meta App Review pages — public, no-login, HTTPS legal pages
    // required to submit the ER Ads Manager app for Standard Access
    // review. Kept deliberately schema-free (just title + description +
    // canonical) so the reviewer reads the actual policy text.
    {
        path: '/meta-app',
        out: 'meta-app/index.html',
        meta: {
            title: 'ER Ads Manager · Ferramenta interna da ER Marketing',
            description:
                'Aplicação interna da ER Marketing para gestão programática de campanhas Meta Ads dos clientes da agência, sob autorização explícita.',
            canonical: `${SITE_ORIGIN}/meta-app`,
            ogType: 'website',
        },
    },
    {
        path: '/meta-app/privacidade',
        out: 'meta-app/privacidade/index.html',
        meta: {
            title: 'Política de Privacidade · ER Ads Manager',
            description:
                'Política de Privacidade do aplicativo ER Ads Manager: dados acessados, armazenamento, retenção, direitos LGPD e contato.',
            canonical: `${SITE_ORIGIN}/meta-app/privacidade`,
            ogType: 'website',
        },
    },
    {
        path: '/meta-app/termos',
        out: 'meta-app/termos/index.html',
        meta: {
            title: 'Termos de Uso · ER Ads Manager',
            description:
                'Termos de Uso do aplicativo ER Ads Manager: natureza interna, uso autorizado, limitação de responsabilidade, foro e lei aplicável.',
            canonical: `${SITE_ORIGIN}/meta-app/termos`,
            ogType: 'website',
        },
    },

    // Blog index
    {
        path: '/blog',
        out: 'blog/index.html',
        meta: {
            title: 'Blog da Norte · Marketing sem rodeio, com número na mesa',
            description:
                'Análises, guias e bastidor de operação sobre tráfego pago, marketing digital em Manaus e ROI real. Por Ed Rodrigues, gestor de mais de R$ 5 milhões em mídia paga.',
            canonical: `${SITE_ORIGIN}/blog`,
            ogType: 'website',
            jsonLd: [
                {
                    '@context': 'https://schema.org',
                    '@type': 'Blog',
                    name: 'Blog da Norte',
                    url: `${SITE_ORIGIN}/blog`,
                    publisher: { '@id': `${SITE_ORIGIN}/#organization` },
                    blogPost: POSTS.map((p) => ({
                        '@type': 'BlogPosting',
                        headline: p.title,
                        url: `${SITE_ORIGIN}/blog/${p.slug}`,
                        datePublished: p.publishedAt,
                    })),
                },
                breadcrumb([
                    { name: 'Início', href: '/' },
                    { name: 'Blog', href: '/blog' },
                ]),
            ],
        },
    },

    // Blog posts
    ...POSTS.map<RouteSpec>((p) => ({
        path: `/blog/${p.slug}`,
        out: `blog/${p.slug}/index.html`,
        meta: {
            title: `${p.title} · Blog da Norte`,
            description: p.description,
            canonical: `${SITE_ORIGIN}/blog/${p.slug}`,
            ogType: 'article',
            publishedAt: p.publishedAt,
            jsonLd: [
                {
                    '@context': 'https://schema.org',
                    '@type': 'BlogPosting',
                    headline: p.title,
                    description: p.description,
                    datePublished: p.publishedAt,
                    author: {
                        '@type': 'Person',
                        name: AUTHOR.name,
                        url: `${SITE_ORIGIN}/sobre/ed-rodrigues`,
                        description: `${AUTHOR.role}. ${AUTHOR.bio}`,
                    },
                    publisher: { '@id': `${SITE_ORIGIN}/#organization` },
                    mainEntityOfPage: {
                        '@type': 'WebPage',
                        '@id': `${SITE_ORIGIN}/blog/${p.slug}`,
                    },
                    articleSection: p.category,
                    keywords: p.tags.join(', '),
                    inLanguage: 'pt-BR',
                },
                breadcrumb([
                    { name: 'Início', href: '/' },
                    { name: 'Blog', href: '/blog' },
                    { name: p.title, href: `/blog/${p.slug}` },
                ]),
            ],
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
        `<meta property="og:site_name" content="Norte">`,
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
        for (const block of meta.jsonLd) {
            tags.push(
                `<script type="application/ld+json">${JSON.stringify(block)}</script>`,
            );
        }
    }
    const headBlock = tags.join('\n    ');

    let out = html.replace(/<title>[^<]*<\/title>/, '');
    out = out.replace('</head>', `    ${headBlock}\n  </head>`);
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
    html = html.replace(/<style data-bundle>[\s\S]*?<\/style>/, cssLink);
    html = injectHead(html, meta);
    html = await beasties.process(html);

    const outPath = path.join(distDir, out);
    mkdirSync(path.dirname(outPath), { recursive: true });
    writeFileSync(outPath, html);
    const sizeKb = (Buffer.byteLength(html) / 1024).toFixed(1);
    console.log(`✓ Pre-rendered ${routePath.padEnd(50)} -> ${out}  (${sizeKb} KiB)`);
}

// ──────────────────────────────────────────────────────────────────────
// sitemap.xml — feeds Google/Bing crawl prioritization. The homepage
// gets priority 1.0 and weekly changefreq; blog posts get monthly.
// ──────────────────────────────────────────────────────────────────────

const today = new Date().toISOString().slice(0, 10);
const sitemapEntries: Array<{
    loc: string;
    lastmod: string;
    priority: number;
    changefreq: 'weekly' | 'monthly' | 'yearly';
}> = [
    { loc: `${SITE_ORIGIN}/`, lastmod: today, priority: 1.0, changefreq: 'weekly' },
    {
        loc: `${SITE_ORIGIN}/auditoria-de-lucro-invisivel`,
        lastmod: today,
        priority: 0.9,
        changefreq: 'monthly',
    },
    { loc: `${SITE_ORIGIN}/sobre`, lastmod: today, priority: 0.8, changefreq: 'monthly' },
    {
        loc: `${SITE_ORIGIN}/sobre/ed-rodrigues`,
        lastmod: today,
        priority: 0.7,
        changefreq: 'monthly',
    },
    {
        loc: `${SITE_ORIGIN}/restaurantes-manaus`,
        lastmod: today,
        priority: 0.8,
        changefreq: 'monthly',
    },
    { loc: `${SITE_ORIGIN}/links`, lastmod: today, priority: 0.5, changefreq: 'monthly' },
    {
        loc: `${SITE_ORIGIN}/lab-de-performance`,
        lastmod: today,
        priority: 0.7,
        changefreq: 'weekly',
    },
    {
        loc: `${SITE_ORIGIN}/edrodrigues`,
        lastmod: today,
        priority: 0.6,
        changefreq: 'weekly',
    },
    // /er-marketing entra no lugar de /norte: a página da Norte agora é a
    // raiz, e listar /norte aqui mandaria sinal contraditório, já que o
    // canonical dela aponta pra /.
    {
        loc: `${SITE_ORIGIN}/er-marketing`,
        lastmod: today,
        priority: 0.7,
        changefreq: 'monthly',
    },
    ...NORTE_SERVICES.map((s) => ({
        loc: `${SITE_ORIGIN}/norte/${s.slug}`,
        lastmod: today,
        priority: 0.8,
        changefreq: 'monthly' as const,
    })),
    { loc: `${SITE_ORIGIN}/blog`, lastmod: today, priority: 0.7, changefreq: 'weekly' },
    ...POSTS.map((p) => ({
        loc: `${SITE_ORIGIN}/blog/${p.slug}`,
        lastmod: p.publishedAt,
        priority: 0.6,
        changefreq: 'monthly' as const,
    })),
    // Meta App Review pages — low priority for Google but included for
    // completeness so the URLs aren't seen as orphan when the reviewer
    // checks the sitemap.
    { loc: `${SITE_ORIGIN}/meta-app`, lastmod: today, priority: 0.3, changefreq: 'yearly' },
    {
        loc: `${SITE_ORIGIN}/meta-app/privacidade`,
        lastmod: today,
        priority: 0.3,
        changefreq: 'yearly',
    },
    {
        loc: `${SITE_ORIGIN}/meta-app/termos`,
        lastmod: today,
        priority: 0.3,
        changefreq: 'yearly',
    },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
    .map(
        (e) => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority.toFixed(1)}</priority>
  </url>`,
    )
    .join('\n')}
</urlset>
`;
writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
console.log(`✓ Wrote sitemap.xml with ${sitemapEntries.length} URLs`);
