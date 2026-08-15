import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { findPostBySlug, relatedPosts } from './posts';
import { AUTHOR, Node } from './types';
import { renderInline } from './InlineLinks';
import { BlogHeader, BlogFooter } from './BlogShell';
import { Arrow, Eyebrow, H2, H3, TAG, CONTAINER, PAPER } from '../Norte/shared';

// Individual blog post page. Renders the node tree, byline, JSON-LD
// (handled at prerender time by replacing a placeholder in the template),
// and a related-posts rail at the bottom.
const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = slug ? findPostBySlug(slug) : undefined;

    if (!post) return <Navigate to="/blog" replace />;

    const related = relatedPosts(post);

    return (
        <div className="min-h-screen bg-white text-[#131313] font-sans antialiased selection:bg-[#8DC63F] selection:text-[#0B0E0C]">
            <BlogHeader />

            <main>
                {/* Cabeçalho do artigo */}
                <header className="pt-32 md:pt-40 pb-10 md:pb-14">
                    <div className="max-w-[880px] mx-auto px-5 md:px-8">
                        <Link
                            to="/blog"
                            className="flex w-fit items-center gap-1.5 text-[12px] text-black/45 hover:text-black transition-colors mb-8"
                        >
                            <Arrow className="w-3.5 h-3.5 rotate-180" />
                            Voltar pro blog
                        </Link>

                        <Eyebrow>{post.category}</Eyebrow>

                        <h1 className={`mt-5 ${H2} text-[clamp(32px,4.8vw,58px)] mb-6`}>
                            {post.title}
                        </h1>

                        <p className="text-[16px] md:text-[19px] tracking-[-0.01em] text-black/45 leading-relaxed mb-10">
                            {post.description}
                        </p>

                        <div className="flex items-center gap-4 border-t border-black/[0.08] pt-6">
                            <Link to="/sobre/ed-rodrigues" className="flex-shrink-0">
                                <img
                                    src="/socios/ed-avatar.png"
                                    alt={AUTHOR.name}
                                    className="w-12 h-12 rounded-full object-cover bg-[#14261A]"
                                    width={48}
                                    height={48}
                                />
                            </Link>
                            <div className="min-w-0">
                                <Link
                                    to="/sobre/ed-rodrigues"
                                    className={`${H3} text-[15px] hover:text-[#3d6b12] transition-colors`}
                                >
                                    {AUTHOR.name}
                                </Link>
                                <p className="text-[13px] text-black/45 leading-snug">
                                    {AUTHOR.role}
                                </p>
                                <p className={`${TAG} text-black/35 mt-1.5`}>
                                    {formatDate(post.publishedAt)} · {post.readTime} min de leitura
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Corpo */}
                <article className="max-w-[720px] mx-auto px-5 md:px-8 pb-14 md:pb-20">
                    {post.body.map((node, i) => (
                        <NodeRenderer key={i} node={node} />
                    ))}
                </article>

                {/* Assinatura */}
                <aside className="max-w-[720px] mx-auto px-5 md:px-8 pb-16 md:pb-24">
                    <div
                        className="rounded-[22px] border border-black/[0.07] p-7 md:p-8"
                        style={{ backgroundColor: PAPER }}
                    >
                        <Eyebrow>Sobre o autor</Eyebrow>
                        <div className="mt-5 flex flex-col sm:flex-row gap-5">
                            <Link to="/sobre/ed-rodrigues" className="flex-shrink-0">
                                <img
                                    src="/socios/ed-avatar.png"
                                    alt={AUTHOR.name}
                                    className="w-20 h-20 rounded-full object-cover bg-[#14261A]"
                                    width={80}
                                    height={80}
                                />
                            </Link>
                            <div>
                                <h3 className={`${H3} text-[19px] mb-1`}>
                                    <Link
                                        to="/sobre/ed-rodrigues"
                                        className="hover:text-[#3d6b12] transition-colors"
                                    >
                                        {AUTHOR.name}
                                    </Link>
                                </h3>
                                <p className={`${TAG} text-[#3d6b12] mb-3`}>{AUTHOR.role}</p>
                                <p className="text-[14px] text-black/50 leading-relaxed">
                                    {AUTHOR.bio} Sócio fundador da{' '}
                                    <Link
                                        to="/"
                                        className="text-[#3d6b12] underline underline-offset-4 decoration-[#8DC63F]"
                                    >
                                        Norte
                                    </Link>
                                    , agência de marketing em Manaus com mais de 100
                                    parceiros atendidos.{' '}
                                    <Link
                                        to="/sobre/ed-rodrigues"
                                        className="text-[#3d6b12] underline underline-offset-4 decoration-[#8DC63F]"
                                    >
                                        Ver perfil completo
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Leia também */}
                {related.length > 0 && (
                    <section className="py-14 md:py-20" style={{ backgroundColor: PAPER }}>
                        <div className={CONTAINER}>
                            <Eyebrow>Leia também</Eyebrow>
                            <h2 className={`mt-4 ${H2} text-[clamp(26px,3.4vw,44px)] mb-9`}>
                                Mais da nossa redação.
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {related.map((r) => (
                                    <Link
                                        key={r.slug}
                                        to={`/blog/${r.slug}`}
                                        className="group rounded-[22px] bg-white border border-black/[0.07] hover:border-[#8DC63F] hover:shadow-[0_18px_54px_rgba(11,14,12,0.08)] p-7 flex flex-col min-h-[230px] transition-all"
                                    >
                                        <p className={`${TAG} text-black/40 mb-4`}>
                                            {r.category}
                                        </p>
                                        <h3 className={`${H3} text-[18px] leading-[1.2]`}>
                                            {r.title}
                                        </h3>
                                        <div className="mt-auto pt-6 flex items-center justify-between gap-3">
                                            <span className={`${TAG} text-black/35`}>
                                                {r.readTime} min
                                            </span>
                                            <span className="w-8 h-8 rounded-full bg-[#F5F5F3] text-[#3d6b12] flex items-center justify-center transition-colors group-hover:bg-[#8DC63F] group-hover:text-[#0B0E0C]">
                                                <Arrow className="w-4 h-4" />
                                            </span>
                                        </div>
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

// Tipografia do corpo. Medida de leitura curta (720px de coluna), corpo
// em Inter e títulos internos em Jakarta peso médio — o mesmo par do
// resto do site, só que numa escala menor porque aqui o texto é longo.
const NodeRenderer: React.FC<{ node: Node }> = ({ node }) => {
    switch (node.type) {
        case 'p':
            return (
                <p className="text-[16px] md:text-[17px] leading-[1.75] text-black/70 mb-6">
                    {renderInline(node.text)}
                </p>
            );
        case 'h2':
            return (
                <h2 className={`${H2} text-[clamp(24px,3vw,32px)] text-[#131313] mt-14 mb-5`}>
                    {node.text}
                </h2>
            );
        case 'h3':
            return (
                <h3 className={`${H3} text-[19px] text-[#131313] mt-10 mb-3`}>
                    {node.text}
                </h3>
            );
        case 'ul':
            return (
                <ul className="my-6 space-y-3 list-disc pl-6 marker:text-[#8DC63F]">
                    {node.items.map((item, i) => (
                        <li
                            key={i}
                            className="text-[16px] md:text-[17px] leading-[1.7] text-black/70 pl-1"
                        >
                            {renderInline(item)}
                        </li>
                    ))}
                </ul>
            );
        case 'ol':
            return (
                <ol className="my-6 space-y-3 list-decimal pl-6 marker:text-[#3d6b12] marker:font-semibold">
                    {node.items.map((item, i) => (
                        <li
                            key={i}
                            className="text-[16px] md:text-[17px] leading-[1.7] text-black/70 pl-1"
                        >
                            {renderInline(item)}
                        </li>
                    ))}
                </ol>
            );
        case 'callout':
            return (
                <aside className="my-10 rounded-2xl border border-[#8DC63F]/40 bg-[#8DC63F]/10 px-6 py-5">
                    <p className="text-[16px] md:text-[17px] text-black/75 leading-[1.65]">
                        {renderInline(node.text)}
                    </p>
                </aside>
            );
        case 'quote':
            return (
                <blockquote className="my-10 border-l-2 border-[#8DC63F] pl-6">
                    <p className={`${H2} text-[22px] md:text-[26px] mb-3`}>
                        “{renderInline(node.text)}”
                    </p>
                    {node.author && (
                        <cite className={`${TAG} text-black/40 not-italic`}>
                            {node.author}
                        </cite>
                    )}
                </blockquote>
            );
        case 'cta':
            return (
                <div className="my-12">
                    <Link
                        to={node.href}
                        className="group inline-flex items-center gap-2.5 rounded-full bg-[#8DC63F] hover:bg-[#9ed650] text-[#0B0E0C] font-semibold text-sm pl-6 pr-2 py-2 transition-colors"
                    >
                        {node.label}
                        <span className="w-8 h-8 rounded-full bg-[#0B0E0C] text-[#8DC63F] flex items-center justify-center transition-transform group-hover:rotate-45">
                            <Arrow className="w-4 h-4 -rotate-45" />
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
