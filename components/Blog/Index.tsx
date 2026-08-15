import React from 'react';
import { Link } from 'react-router-dom';
import { POSTS } from './posts';
import { AUTHOR } from './types';
import { BlogHeader, BlogFooter } from './BlogShell';
import {
    Arrow,
    Eyebrow,
    H2,
    H3,
    TAG,
    CONTAINER,
    PAPER,
} from '../Norte/shared';

// /blog — índice. O post mais recente vira card grande com foto; o resto
// entra numa lista editorial enxuta. Mesmo sistema da home: Jakarta peso
// médio nos títulos, mono em caixa alta nos rótulos, base branca.

// O blog não guarda imagem de capa própria, então a capa vem de foto
// nossa de cliente, na ordem. Banco de imagem genérico contradiz o resto
// do site, que é registro real.
const HERO_COVER = '/clientes/fotos/itv-interior.jpg';

const formatDate = (iso: string): string => {
    const [y, m, d] = iso.split('-');
    return `${d}.${m}.${y.slice(2)}`;
};

const BlogIndex: React.FC = () => {
    const [hero, ...rest] = POSTS;

    return (
        <div className="min-h-screen bg-white text-[#131313] font-sans antialiased selection:bg-[#8DC63F] selection:text-[#0B0E0C]">
            <BlogHeader />

            <main>
                {/* ═══ Cabeçalho ═══ */}
                <section className="pt-32 md:pt-40 pb-12 md:pb-16">
                    <div className={CONTAINER}>
                        <div className="max-w-3xl">
                            <Eyebrow>Blog e artigos</Eyebrow>
                            <h1
                                className={`mt-5 ${H2} text-[clamp(34px,5.4vw,66px)]`}
                            >
                                O que a gente aprende, a gente escreve.
                            </h1>
                            <p className="mt-6 text-[16px] md:text-[19px] tracking-[-0.01em] text-black/45 leading-relaxed">
                                Sem fórmula mágica e sem jargão: análise, guia e bastidor
                                de operação de quem já gerenciou mais de R$ 5 milhões em
                                mídia paga. Textos de {AUTHOR.name}.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ═══ Destaque ═══ */}
                {hero && (
                    <section className="pb-14 md:pb-20">
                        <div className={CONTAINER}>
                            <Link
                                to={`/blog/${hero.slug}`}
                                className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center"
                            >
                                <div className="lg:col-span-6 relative rounded-[24px] overflow-hidden aspect-[16/11]">
                                    <img
                                        src={HERO_COVER}
                                        alt=""
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E0C]/55 to-transparent" />
                                    <span
                                        className={`absolute top-5 left-5 ${TAG} rounded-full bg-white/90 text-[#0B0E0C] px-3 py-1.5`}
                                    >
                                        Mais recente
                                    </span>
                                </div>

                                <div className="lg:col-span-6">
                                    <p className={`${TAG} text-black/40 mb-4`}>
                                        {hero.category} · {hero.readTime} min ·{' '}
                                        {formatDate(hero.publishedAt)}
                                    </p>
                                    <h2
                                        className={`${H2} text-[clamp(26px,3.4vw,42px)] mb-5 group-hover:text-[#3d6b12] transition-colors`}
                                    >
                                        {hero.title}
                                    </h2>
                                    <p className="text-[15px] md:text-[17px] text-black/45 leading-relaxed mb-7">
                                        {hero.description}
                                    </p>
                                    <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#3d6b12] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                                        Ler artigo <Arrow className="w-3.5 h-3.5" />
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </section>
                )}

                {/* ═══ Demais artigos ═══ */}
                <section
                    className="py-14 md:py-20"
                    style={{ backgroundColor: PAPER }}
                >
                    <div className={CONTAINER}>
                        <Eyebrow>Todos os artigos</Eyebrow>

                        <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {rest.map((p) => (
                                <Link
                                    key={p.slug}
                                    to={`/blog/${p.slug}`}
                                    className="group rounded-[22px] bg-white border border-black/[0.07] hover:border-[#8DC63F] hover:shadow-[0_18px_54px_rgba(11,14,12,0.08)] p-7 flex flex-col transition-all"
                                >
                                    <p className={`${TAG} text-black/40 mb-4`}>
                                        {p.category}
                                    </p>
                                    <h3
                                        className={`${H3} text-[19px] leading-[1.2] mb-3`}
                                    >
                                        {p.title}
                                    </h3>
                                    <p className="text-[14px] text-black/45 leading-relaxed mb-6">
                                        {p.description}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between gap-3 pt-5 border-t border-black/[0.07]">
                                        <span className={`${TAG} text-black/35`}>
                                            {formatDate(p.publishedAt)} · {p.readTime} min
                                        </span>
                                        <span className="w-8 h-8 rounded-full bg-[#F5F5F3] text-[#3d6b12] flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-[#8DC63F] group-hover:text-[#0B0E0C]">
                                            <Arrow className="w-4 h-4" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <BlogFooter />
        </div>
    );
};

export default BlogIndex;
