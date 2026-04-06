import React, { useState, useEffect } from 'react';
import { SectionProps } from '../../types';

export const RestaurantBHeader: React.FC<SectionProps> = ({ onAuditClick }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
                scrolled
                    ? 'bg-[#FFFDF8]/90 backdrop-blur-md border-[#EAE2D9] py-4'
                    : 'bg-transparent border-transparent py-6'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img
                        src="/assets/red-logo.png"
                        alt="ER Performance Marketing"
                        className="h-10 w-auto object-contain"
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button
                        className="hidden md:inline-flex items-center px-5 py-2.5 bg-[#F7F3EE] border border-[#EAE2D9] text-[#8B7E74] text-sm font-bold rounded-full shadow-[0_2px_0_0_#EAE2D9] hover:shadow-[0_3px_0_0_#EAE2D9] hover:-translate-y-[1px] active:shadow-none active:translate-y-0 transition-all duration-200 uppercase tracking-wide"
                        onClick={() =>
                            window.open(
                                'https://wa.me/5592985146299?text=Ol%C3%A1%2C%20gostaria%20de%20tirar%20d%C3%BAvidas%20sobre%20a%20ER%20Marketing',
                                '_blank'
                            )
                        }
                    >
                        Tirar Dúvidas
                    </button>
                    <button
                        onClick={onAuditClick}
                        className="inline-flex items-center px-5 py-2.5 bg-[#D4660A] text-white text-sm font-bold rounded-full border-2 border-[#A34F08] shadow-[0_2px_0_0_#A34F08] hover:shadow-[0_4px_0_0_#A34F08] hover:-translate-y-[2px] active:shadow-none active:translate-y-0 transition-all duration-200 uppercase tracking-wide"
                    >
                        Fazer Diagnóstico
                    </button>
                </div>
            </div>
        </header>
    );
};
