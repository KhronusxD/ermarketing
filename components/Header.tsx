import React, { useState, useEffect } from 'react';
import { SectionProps } from '../types';

export const Header: React.FC<SectionProps> = ({ onAuditClick }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                scrolled
                    ? 'bg-er-black/95 backdrop-blur-md border-b border-white/10 py-3'
                    : 'bg-transparent py-5'
            }`}
        >
            <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
                <a href="/" className="flex items-center gap-3">
                    <img
                        src="/assets/white-logo.png"
                        alt="ER Marketing"
                        className="h-8 w-auto object-contain"
                    />
                    <span className="hidden sm:inline-flex flex-col leading-none">
                        <span className="font-display text-white text-lg tracking-tight uppercase">
                            ER Marketing
                        </span>
                        <span className="text-[10px] text-white/50 tracking-[0.2em] uppercase">
                            Performance · Manaus
                        </span>
                    </span>
                </a>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() =>
                            window.open(
                                'https://wa.me/5592985146299?text=Ol%C3%A1%2C%20gostaria%20de%20tirar%20d%C3%BAvidas%20sobre%20a%20ER%20Marketing',
                                '_blank',
                            )
                        }
                        className="hidden md:inline-flex text-xs tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors"
                    >
                        Falar com a equipe
                    </button>
                    <button
                        type="button"
                        onClick={onAuditClick}
                        className="inline-flex items-center gap-2 bg-er-red hover:bg-er-redHover text-white font-bold text-xs md:text-sm tracking-[0.15em] uppercase px-4 py-2.5 md:px-5 md:py-3 transition-colors"
                    >
                        Agendar diagnóstico
                        <span className="text-white/70">→</span>
                    </button>
                </div>
            </div>
        </header>
    );
};
