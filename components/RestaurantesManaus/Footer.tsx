import React from 'react';
import { Link } from 'react-router-dom';
import { GoldDivider, GOLD_FILTER } from './shared';

export const Footer: React.FC = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="py-12 border-t border-[#D4A574]/10 relative">
            <div className="max-w-7xl mx-auto px-6">
                <GoldDivider />
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                        <div className="flex flex-col gap-3 max-w-md">
                            <div className="flex items-center gap-3">
                                <img
                                    src="/assets/white-logo.png"
                                    alt="ER Marketing"
                                    width={32}
                                    height={24}
                                    loading="lazy"
                                    decoding="async"
                                    className="h-6 w-auto opacity-80"
                                    style={{ filter: GOLD_FILTER }}
                                />
                                <span className="text-xs text-[#E8C088] tracking-[0.18em] font-semibold uppercase">
                                    ER Marketing
                                </span>
                            </div>
                            <p className="text-[12px] text-[#A8A196] tracking-wider leading-relaxed">
                                Especialistas em performance para restaurantes.
                            </p>
                            <p className="text-[11px] text-[#857D72] tracking-wider leading-relaxed">
                                ER Marketing &middot; CNPJ 41.079.306/0001-62
                                <br />
                                contato@ermarketing.com.br
                            </p>
                        </div>

                        <div className="flex gap-10 text-xs tracking-wider">
                            <div className="flex flex-col gap-2">
                                <span className="text-[#E8C088] uppercase text-[10px] tracking-[0.2em]">
                                    Institucional
                                </span>
                                <Link
                                    to="/politica-de-privacidade"
                                    className="text-[#A8A196] hover:text-[#E8C088] transition-colors"
                                >
                                    Política de Privacidade
                                </Link>
                                <Link
                                    to="/termos-de-uso"
                                    className="text-[#A8A196] hover:text-[#E8C088] transition-colors"
                                >
                                    Termos de Uso
                                </Link>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-[#E8C088] uppercase text-[10px] tracking-[0.2em]">
                                    Redes
                                </span>
                                <a
                                    href="https://instagram.com/edrodrigues.mkt"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#A8A196] hover:text-[#E8C088] transition-colors"
                                >
                                    Instagram
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/edrodriguesmkt/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#A8A196] hover:text-[#E8C088] transition-colors"
                                >
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-[#D4A574]/10 pt-4 text-[10px] text-[#857D72] tracking-[0.2em] uppercase">
                        &copy; {year} ER Marketing. Todos os direitos reservados.
                    </div>
                </div>
            </div>
        </footer>
    );
};
