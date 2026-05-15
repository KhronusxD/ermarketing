import React from 'react';
import { Link } from 'react-router-dom';

// Shared light-editorial chrome for the blog. Both /blog and /blog/:slug
// share the same header and footer so the whole subsection feels like a
// single magazine.

export const BlogHeader: React.FC = () => (
    <header className="border-b border-er-ink/10 bg-er-paper">
        <div className="max-w-[1200px] mx-auto px-6 py-5 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
                <img
                    src="/assets/red-logo.png"
                    alt="ER Marketing"
                    className="h-7 w-auto"
                />
                <span className="font-display uppercase text-er-ink text-lg tracking-tight">
                    ER Marketing
                </span>
            </Link>
            <nav className="flex items-center gap-6 text-xs tracking-[0.2em] uppercase text-er-ink/65">
                <Link
                    to="/blog"
                    className="hover:text-er-ink transition-colors hidden sm:inline"
                >
                    Blog
                </Link>
                <Link
                    to="/"
                    className="hover:text-er-ink transition-colors hidden sm:inline"
                >
                    Sobre a ER
                </Link>
                <Link
                    to="/auditoria-de-lucro-invisivel"
                    className="inline-flex items-center gap-2 bg-er-ink text-er-paper hover:bg-er-red transition-colors font-bold px-4 py-2.5"
                >
                    Agendar diagnóstico
                    <span aria-hidden="true">→</span>
                </Link>
            </nav>
        </div>
    </header>
);

export const BlogFooter: React.FC = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-er-ink text-er-paper/80 mt-20 md:mt-32">
            <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-20">
                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 md:col-span-6">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                            ◆ Pronto pro diagnóstico
                        </p>
                        <h2
                            className="font-display uppercase leading-[0.92] tracking-tight mb-6"
                            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
                        >
                            Saia do post.
                            <br />
                            <span className="text-er-red">
                                Marque a call.
                            </span>
                        </h2>
                        <p className="text-base text-er-paper/70 leading-relaxed max-w-md mb-8">
                            15 minutos com o time da ER. Sem custo, sem
                            compromisso, com plano dos próximos 90 dias.
                        </p>
                        <Link
                            to="/auditoria-de-lucro-invisivel"
                            className="inline-flex items-center gap-3 bg-er-red text-white hover:bg-er-redHover transition-colors font-bold tracking-[0.18em] uppercase text-sm px-6 py-4"
                        >
                            Agendar diagnóstico
                            <span aria-hidden="true">→</span>
                        </Link>
                    </div>

                    <div className="col-span-6 md:col-span-3">
                        <span className="block text-[10px] tracking-[0.3em] uppercase text-er-red font-bold mb-5">
                            Mapa do site
                        </span>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link
                                    to="/"
                                    className="hover:text-white transition-colors"
                                >
                                    Página inicial
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/blog"
                                    className="hover:text-white transition-colors"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/auditoria-de-lucro-invisivel"
                                    className="hover:text-white transition-colors"
                                >
                                    Agendar diagnóstico
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/restaurantes-manaus"
                                    className="hover:text-white transition-colors"
                                >
                                    Para restaurantes
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-span-6 md:col-span-3">
                        <span className="block text-[10px] tracking-[0.3em] uppercase text-er-red font-bold mb-5">
                            Institucional
                        </span>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link
                                    to="/politica-de-privacidade"
                                    className="hover:text-white transition-colors"
                                >
                                    Política de privacidade
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/termos-de-uso"
                                    className="hover:text-white transition-colors"
                                >
                                    Termos de uso
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-14 pt-6 border-t border-er-paper/10 text-[11px] tracking-[0.2em] uppercase text-er-paper/50">
                    © {year} ER Marketing · CNPJ 41.079.306/0001-62 · Manaus · AM
                </div>
            </div>
        </footer>
    );
};
