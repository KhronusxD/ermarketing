import React from 'react';
import { Link } from 'react-router-dom';
import { BlogHeader, BlogFooter } from './Blog/BlogShell';
import { POSTS } from './Blog/posts';

// 404 page. Not pre-rendered (the * route catches anything that didn't
// match upstream), but it still does useful work for UX: gives the
// visitor a small map back into the site instead of a dead end.
const NotFound: React.FC = () => {
    // Surface 3 most-recent posts as recovery suggestions — much more
    // useful than a generic "go home" button.
    const suggested = POSTS.slice(0, 3);

    return (
        <div className="bg-er-paper text-er-ink min-h-screen flex flex-col">
            <BlogHeader />

            <main className="flex-1 flex items-center">
                <div className="max-w-[1100px] mx-auto px-6 py-20 md:py-28 w-full">
                    <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                        ◆ 404 · Página não encontrada
                    </p>
                    <h1
                        className="font-display uppercase leading-[0.9] tracking-tight mb-8 max-w-3xl"
                        style={{ fontSize: 'clamp(56px, 9vw, 144px)' }}
                    >
                        Esse caminho
                        <br />
                        <span className="text-er-red">não existe.</span>
                    </h1>
                    <p className="text-base md:text-lg text-er-ink/70 max-w-2xl leading-relaxed mb-10">
                        Ou foi removido, ou nunca existiu, ou você digitou
                        errado. Sem drama. Pega o melhor caminho abaixo:
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 mb-16">
                        <Link
                            to="/"
                            className="group inline-flex items-center gap-3 bg-er-ink text-er-paper hover:bg-er-red transition-colors font-bold tracking-[0.18em] uppercase text-sm md:text-base px-7 py-5"
                        >
                            Voltar pra home
                            <span className="transition-transform group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-3 border border-er-ink/30 text-er-ink hover:bg-er-ink hover:text-er-paper transition-colors font-bold tracking-[0.18em] uppercase text-sm md:text-base px-7 py-5"
                        >
                            Ver o blog
                        </Link>
                        <Link
                            to="/auditoria-de-lucro-invisivel"
                            className="inline-flex items-center gap-3 border border-er-ink/30 text-er-ink hover:bg-er-ink hover:text-er-paper transition-colors font-bold tracking-[0.18em] uppercase text-sm md:text-base px-7 py-5"
                        >
                            Agendar diagnóstico
                        </Link>
                    </div>

                    <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                        ◆ Ou leia algo bom no caminho
                    </p>
                    <ul className="border-t border-er-ink/15">
                        {suggested.map((p) => (
                            <li
                                key={p.slug}
                                className="border-b border-er-ink/15"
                            >
                                <Link
                                    to={`/blog/${p.slug}`}
                                    className="group block py-5 grid grid-cols-12 gap-4 items-baseline hover:text-er-red transition-colors"
                                >
                                    <span className="col-span-12 md:col-span-3 text-[10px] tracking-[0.25em] uppercase text-er-ink/55">
                                        {p.category}
                                    </span>
                                    <h3 className="col-span-12 md:col-span-9 font-display uppercase text-lg md:text-2xl leading-[1.1] tracking-tight">
                                        {p.title}
                                    </h3>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>

            <BlogFooter />
        </div>
    );
};

export default NotFound;
