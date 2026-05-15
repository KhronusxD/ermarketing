// Blog domain types. A post is a tree of strongly-typed nodes — no
// HTML strings, no dangerouslySetInnerHTML. Inline links inside text
// use the `[label](url)` markdown-lite syntax parsed in InlineLinks.tsx.

export type Node =
    | { type: 'p'; text: string }
    | { type: 'h2'; text: string }
    | { type: 'h3'; text: string }
    | { type: 'ul'; items: string[] }
    | { type: 'ol'; items: string[] }
    | { type: 'callout'; text: string }
    | { type: 'quote'; text: string; author?: string }
    | { type: 'cta'; label: string; href: string };

export interface Post {
    slug: string;
    title: string;
    /** Used as the <meta name="description"> + OG description + card excerpt. */
    description: string;
    /** ISO date — drives both the byline and sitemap.xml. */
    publishedAt: string;
    /** Estimated minutes-to-read; computed from word count at write time. */
    readTime: number;
    /** Lowercase tags — drive the "related posts" rail. */
    tags: ReadonlyArray<string>;
    /** Eyebrow category shown above the title. */
    category: string;
    body: ReadonlyArray<Node>;
}

export const AUTHOR = {
    name: 'Ed Rodrigues',
    role: 'Gestor de tráfego pago desde 2020',
    bio: 'Já gerenciou + R$ 5 milhões em Meta Ads e Google Ads.',
    avatar: '/socios/ed.jpg',
};
