import React, { useState, useEffect } from 'react';
import { SectionProps } from '../../types';
import { GoldButton, GOLD_FILTER } from './shared';

export const Header: React.FC<SectionProps> = ({ onAuditClick }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                    ? 'py-3 bg-[#111112]/80 backdrop-blur-xl border-b border-[#D4A574]/10'
                    : 'py-5 bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <img
                        src="/assets/white-logo.png"
                        alt="ER Performance Marketing"
                        className="h-8 w-auto object-contain"
                        style={{ filter: GOLD_FILTER }}
                    />
                </div>

                <div className="flex items-center gap-3">
                    <button
                        className="hidden md:inline-flex items-center px-5 py-2.5 text-sm font-medium text-[#C7BFB1] hover:text-[#E8C088] transition-colors"
                        onClick={() =>
                            window.open(
                                'https://wa.me/5592985146299?text=Ol%C3%A1%2C%20gostaria%20de%20tirar%20d%C3%BAvidas%20sobre%20a%20ER%20Marketing',
                                '_blank'
                            )
                        }
                    >
                        Tirar dúvidas
                    </button>
                    <GoldButton size="sm" onClick={onAuditClick}>
                        Falar no WhatsApp
                    </GoldButton>
                </div>
            </div>
        </header>
    );
};
