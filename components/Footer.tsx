import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="relative bg-black text-white/70 overflow-hidden">
            {/* Huge logotype-ish word as the brand statement */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-6 md:-bottom-10 left-0 right-0 select-none font-display uppercase leading-[0.78] whitespace-nowrap text-white/[0.04] text-center"
                style={{ fontSize: 'clamp(140px, 22vw, 360px)' }}
            >
                ER Marketing
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-16 md:py-20">
                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 md:col-span-5">
                        <div className="flex items-center gap-3 mb-6">
                            <img
                                src="/assets/white-logo.png"
                                alt="ER Marketing"
                                className="h-8 w-auto opacity-90"
                            />
                            <span className="font-display text-white text-lg tracking-tight uppercase">
                                ER Marketing
                            </span>
                        </div>
                        <p className="text-sm md:text-base leading-relaxed text-white/65 max-w-md">
                            Marketing de performance pra pequenos e médios negócios que
                            decidiram parar de depender de indicação.
                        </p>
                        <p className="mt-6 text-xs text-white/40 leading-relaxed">
                            ER Marketing · CNPJ 41.079.306/0001-62
                            <br />
                            contato@trafegomanaus.com.br · Manaus · AM
                        </p>
                    </div>

                    <div className="col-span-6 md:col-span-3 md:col-start-7">
                        <span className="block text-[10px] tracking-[0.3em] uppercase text-er-red font-bold mb-5">
                            Mapa do site
                        </span>
                        <ul className="space-y-3 text-sm">
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

                    <div className="col-span-6 md:col-span-2">
                        <span className="block text-[10px] tracking-[0.3em] uppercase text-er-red font-bold mb-5">
                            Redes
                        </span>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a
                                    href="https://instagram.com/edrodrigues.mkt"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                >
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.linkedin.com/in/edrodriguesmkt/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                >
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://wa.me/5592985146299"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                >
                                    WhatsApp
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 md:mt-20 pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[11px] tracking-[0.2em] uppercase text-white/40">
                    <span>© {year} ER Marketing. Todos os direitos reservados.</span>
                    <span className="text-white/30">
                        Feito em Manaus para o Brasil inteiro.
                    </span>
                </div>
            </div>
        </footer>
    );
};
