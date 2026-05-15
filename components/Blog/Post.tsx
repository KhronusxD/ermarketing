import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { findPostBySlug, relatedPosts } from './posts';
import { AUTHOR, Node } from './types';
import { renderInline } from './InlineLinks';
import { BlogHeader, BlogFooter } from './BlogShell';

// Individual blog post page. Renders the node tree, byline, JSON-LD
// (handled at prerender time by replacing a placeholder in the template),
// and a related-posts rail at the bottom.
const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = slug ? findPostBySlug(slug) : undefined;

    if (!post) return <Navigate to="/blog" replace />;

    const related = relatedPosts(post);

    return (
        <div className="bg-er-paper text-er-ink min-h-screen">
            <BlogHeader />

            <main>
                {/* Article header */}
                <header className="border-b border-er-ink/10">
                    <div className="max-w-[920px] mx-auto px-6 py-16 md:py-24">
                        <Link
                            to="/blog"
                            className="text-[10px] tracking-[0.3em] uppercase text-er-ink/55 hover:text-er-ink mb-8 inline-block"
                        >
                            ← Voltar pro blog
                        </Link>
                        <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                            ◆ {post.category}
                        </p>
                        <h1
                            className="font-display uppercase leading-[0.95] tracking-tight mb-8"
                            style={{ fontSize: 'clamp(36px, 6vw, 88px)' }}
                        >
                            {post.title}
                        </h1>
                        <p className="text-base md:text-lg text-er-ink/70 max-w-3xl leading-relaxed mb-10">
                            {post.description}
                        </p>

                        <div className="flex items-center gap-4 border-t border-er-ink/15 pt-6">
                            <Link to="/sobre/ed-rodrigues" className="flex-shrink-0">
                                <img
                                    src={AUTHOR.avatar}
                                    alt={AUTHOR.name}
                                    className="w-14 h-14 rounded-full object-cover grayscale hover:grayscale-0 transition-all"
                                    width={56}
                                    height={56}
                                />
                            </Link>
                            <div>
                                <Link
                                    to="/sobre/ed-rodrigues"
                                    className="font-bold text-sm hover:text-er-red transition-colors"
                                >
                                    {AUTHOR.name}
                                </Link>
                                <p className="text-xs text-er-ink/60 leading-snug">
                                    {AUTHOR.role} ·{' '}
                                    <span className="text-er-ink/75">{AUTHOR.bio}</span>
                                </p>
                                <p className="text-[10px] tracking-[0.25em] uppercase text-er-ink/45 mt-1">
                                    {formatDate(post.publishedAt)} · {post.readTime}min de leitura
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Article body */}
                <article className="max-w-[760px] mx-auto px-6 py-16 md:py-24">
                    {post.body.map((node, i) => (
                        <NodeRenderer key={i} node={node} />
                    ))}
                </article>

                {/* Author callout */}
                <aside className="max-w-[760px] mx-auto px-6 mb-20 md:mb-28">
                    <div className="bg-white border border-er-ink/15 p-7 md:p-9">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-er-red font-bold mb-4">
                            ◆ Sobre o autor
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5">
                            <Link to="/sobre/ed-rodrigues" className="flex-shrink-0">
                                <img
                                    src={AUTHOR.avatar}
                                    alt={AUTHOR.name}
                                    className="w-20 h-20 rounded-full object-cover hover:scale-105 transition-transform"
                                    width={80}
                                    height={80}
                                />
                            </Link>
                            <div>
                                <h3 className="font-display uppercase text-2xl tracking-tight mb-1">
                                    <Link
                                        to="/sobre/ed-rodrigues"
                                        className="hover:text-er-red transition-colors"
                                    >
                                        {AUTHOR.name}
                                    </Link>
                                </h3>
                                <p className="text-er-red font-bold text-sm mb-3">
                                    {AUTHOR.role}
                                </p>
                                <p className="text-sm text-er-ink/70 leading-relaxed">
                                    {AUTHOR.bio} Sócio fundador da{' '}
                                    <Link
                                        to="/"
                                        className="text-er-red underline underline-offset-4 decoration-er-red/40 hover:decoration-er-red"
                                    >
                                        ER Marketing
                                    </Link>
                                    , agência baseada em Manaus com mais de 100 parceiros atendidos.{' '}
                                    <Link
                                        to="/sobre/ed-rodrigues"
                                        className="text-er-red underline underline-offset-4 decoration-er-red/40 hover:decoration-er-red"
                                    >
                                        Ver perfil completo →
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Related posts */}
                {related.length > 0 && (
                    <section className="border-t border-er-ink/15 bg-er-paperDark">
                        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
                            <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                                ◆ Leia também
                            </p>
                            <h2
                                className="font-display uppercase leading-[0.95] tracking-tight mb-12"
                                style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}
                            >
                                Mais da nossa
                                <br />
                                <span className="text-er-red">redação.</span>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-er-ink/15">
                                {related.map((r) => (
                                    <Link
                                        key={r.slug}
                                        to={`/blog/${r.slug}`}
                                        className="group bg-er-paperDark p-7 hover:bg-er-paper transition-colors min-h-[260px] flex flex-col justify-between"
                                    >
                                        <div>
                                            <p className="text-[10px] tracking-[0.25em] uppercase text-er-red font-bold mb-4">
                                                {r.category}
                                            </p>
                                            <h3 className="font-display uppercase text-xl md:text-2xl leading-[1] tracking-tight group-hover:text-er-red transition-colors">
                                                {r.title}
                                            </h3>
                                        </div>
                                        <span className="text-[10px] tracking-[0.25em] uppercase text-er-ink/55 mt-6 inline-flex items-center gap-2">
                                            {r.readTime}min ·
                                            <span className="group-hover:translate-x-1 transition-transform">
                                                Ler →
                                            </span>
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <BlogFooter />
        </div>
    );
};

const NodeRenderer: React.FC<{ node: Node }> = ({ node }) => {
    switch (node.type) {
        case 'p':
            return (
                <p className="text-base md:text-lg leading-[1.75] text-er-ink/85 mb-6">
                    {renderInline(node.text)}
                </p>
            );
        case 'h2':
            return (
                <h2
                    className="font-display uppercase tracking-tight leading-[1] text-er-ink mt-14 mb-6"
                    style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
                >
                    {node.text}
                </h2>
            );
        case 'h3':
            return (
                <h3 className="font-bold text-lg md:text-xl text-er-ink mt-10 mb-4">
                    {node.text}
                </h3>
            );
        case 'ul':
            return (
                <ul className="my-6 space-y-3 list-disc pl-6 marker:text-er-red">
                    {node.items.map((item, i) => (
                        <li
                            key={i}
                            className="text-base md:text-lg leading-[1.65] text-er-ink/85 pl-2"
                        >
                            {renderInline(item)}
                        </li>
                    ))}
                </ul>
            );
        case 'ol':
            return (
                <ol className="my-6 space-y-3 list-decimal pl-6 marker:text-er-red marker:font-bold">
                    {node.items.map((item, i) => (
                        <li
                            key={i}
                            className="text-base md:text-lg leading-[1.65] text-er-ink/85 pl-2"
                        >
                            {renderInline(item)}
                        </li>
                    ))}
                </ol>
            );
        case 'callout':
            return (
                <aside className="my-10 border-l-2 border-er-red bg-white px-6 py-5">
                    <p className="text-base md:text-lg italic text-er-ink leading-[1.6]">
                        {renderInline(node.text)}
                    </p>
                </aside>
            );
        case 'quote':
            return (
                <blockquote className="my-10 border-l-2 border-er-ink/30 pl-6">
                    <p className="font-display uppercase text-2xl md:text-3xl leading-[1.1] tracking-tight mb-3">
                        “{renderInline(node.text)}”
                    </p>
                    {node.author && (
                        <cite className="text-[10px] tracking-[0.25em] uppercase text-er-ink/55 not-italic">
                            — {node.author}
                        </cite>
                    )}
                </blockquote>
            );
        case 'cta':
            return (
                <div className="my-12">
                    <Link
                        to={node.href}
                        className="group inline-flex items-center gap-3 bg-er-ink text-er-paper hover:bg-er-red transition-colors font-bold tracking-[0.18em] uppercase text-sm px-7 py-4"
                    >
                        {node.label}
                        <span className="transition-transform group-hover:translate-x-1">
                            →
                        </span>
                    </Link>
                </div>
            );
    }
};

const formatDate = (iso: string): string => {
    const months = [
        'jan',
        'fev',
        'mar',
        'abr',
        'mai',
        'jun',
        'jul',
        'ago',
        'set',
        'out',
        'nov',
        'dez',
    ];
    const [y, m, d] = iso.split('-');
    return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`;
};

export default BlogPost;
