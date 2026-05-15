import React from 'react';
import { Link } from 'react-router-dom';
import { POSTS } from './posts';
import { AUTHOR } from './types';
import { BlogHeader, BlogFooter } from './BlogShell';

// Blog list page. Lists all posts in reverse chronological order with
// a hero card highlighting the most recent piece. Light editorial style
// to match the rest of the site.
const BlogIndex: React.FC = () => {
    const [hero, ...rest] = POSTS;

    return (
        <div className="bg-er-paper text-er-ink min-h-screen">
            <BlogHeader />

            <main className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
                {/* Section eyebrow + heading */}
                <div className="mb-16 md:mb-24">
                    <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                        ◆ Blog ER Marketing
                    </p>
                    <h1
                        className="font-display uppercase leading-[0.9] tracking-tight max-w-4xl"
                        style={{ fontSize: 'clamp(48px, 8vw, 128px)' }}
                    >
                        Marketing
                        <br />
                        de performance
                        <br />
                        <span className="text-er-red">sem rodeio.</span>
                    </h1>
                    <p className="mt-6 text-base md:text-lg text-er-ink/70 max-w-2xl leading-relaxed">
                        Análises, guias e bastidor de operação direto de quem
                        gerencia mais de R$ 5 milhões em mídia paga. Textos
                        escritos por {AUTHOR.name}.
                    </p>
                </div>

                {/* Hero post */}
                {hero && (
                    <Link
                        to={`/blog/${hero.slug}`}
                        className="block group border-t border-er-ink/15 pt-10 md:pt-14 mb-20 md:mb-28"
                    >
                        <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
                            <div className="col-span-12 md:col-span-2">
                                <span className="text-[10px] tracking-[0.3em] uppercase text-er-red font-bold">
                                    Mais recente
                                </span>
                            </div>
                            <div className="col-span-12 md:col-span-10">
                                <p className="text-xs tracking-[0.25em] uppercase text-er-ink/55 mb-4">
                                    {hero.category} · {hero.readTime} min de leitura ·{' '}
                                    {formatDate(hero.publishedAt)}
                                </p>
                                <h2
                                    className="font-display uppercase leading-[0.95] tracking-tight mb-5 group-hover:text-er-red transition-colors"
                                    style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
                                >
                                    {hero.title}
                                </h2>
                                <p className="text-base md:text-lg text-er-ink/70 max-w-3xl leading-relaxed mb-5">
                                    {hero.description}
                                </p>
                                <span className="inline-flex items-center gap-2 text-sm font-bold text-er-red">
                                    Ler agora
                                    <span className="transition-transform group-hover:translate-x-1">
                                        →
                                    </span>
                                </span>
                            </div>
                        </div>
                    </Link>
                )}

                {/* Remaining posts in a tight editorial list */}
                <div className="border-t border-er-ink/15">
                    {rest.map((p) => (
                        <Link
                            key={p.slug}
                            to={`/blog/${p.slug}`}
                            className="group block border-b border-er-ink/15 py-8 md:py-10"
                        >
                            <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
                                <div className="col-span-12 md:col-span-3">
                                    <p className="text-[10px] tracking-[0.25em] uppercase text-er-ink/55">
                                        {p.category}
                                    </p>
                                    <p className="text-[10px] tracking-[0.25em] uppercase text-er-ink/45 mt-1">
                                        {formatDate(p.publishedAt)} · {p.readTime}min
                                    </p>
                                </div>
                                <div className="col-span-12 md:col-span-9">
                                    <h3 className="font-display uppercase text-xl md:text-3xl leading-[1] tracking-tight group-hover:text-er-red transition-colors mb-3">
                                        {p.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-er-ink/65 leading-relaxed max-w-3xl">
                                        {p.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            <BlogFooter />
        </div>
    );
};

const formatDate = (iso: string): string => {
    const [y, m, d] = iso.split('-');
    return `${d}.${m}.${y.slice(2)}`;
};

export default BlogIndex;
