import React from 'react';
import { Link } from 'react-router-dom';

export const RestaurantBFooter: React.FC = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="py-12 bg-[#F7F3EE] border-t border-[#EAE2D9] text-[#8B7E74] text-xs md:text-sm">
            <div className="max-w-7xl mx-auto px-6 flex flex-col gap-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                    <div className="flex flex-col gap-3 max-w-md">
                        <div className="flex items-center gap-2">
                            <img
                                src="/assets/red-logo.png"
                                alt="ER Marketing"
                                className="h-7 w-auto opacity-80"
                            />
                            <span className="font-bold text-[#3D2B1F] text-sm tracking-wider">
                                ER MARKETING
                            </span>
                        </div>
                        <p className="leading-relaxed">
                            Marketing de performance para pequenos e médios negócios.
                        </p>
                        <p className="text-[#B5ADA5] leading-relaxed">
                            ER Marketing &middot; CNPJ 41.079.306/0001-62
                            <br />
                            contato@ermarketing.com.br
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="text-[#3D2B1F] font-semibold uppercase tracking-wider text-[11px]">
                            Institucional
                        </span>
                        <Link
                            to="/politica-de-privacidade"
                            className="hover:text-[#3D2B1F] transition-colors"
                        >
                            Política de Privacidade
                        </Link>
                        <Link
                            to="/termos-de-uso"
                            className="hover:text-[#3D2B1F] transition-colors"
                        >
                            Termos de Uso
                        </Link>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="text-[#3D2B1F] font-semibold uppercase tracking-wider text-[11px]">
                            Redes
                        </span>
                        <a
                            href="https://instagram.com/edrodrigues.mkt"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#3D2B1F] transition-colors"
                        >
                            Instagram
                        </a>
                        <a
                            href="https://www.linkedin.com/in/edrodriguesmkt/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#3D2B1F] transition-colors"
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>

                <div className="border-t border-[#EAE2D9] pt-6 text-[#B5ADA5] text-[11px] tracking-wider">
                    &copy; {year} ER Marketing. Todos os direitos reservados.
                </div>
            </div>
        </footer>
    );
};
