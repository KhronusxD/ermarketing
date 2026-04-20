import React from 'react';
import { GoldDivider } from './shared';

export const Footer: React.FC = () => {
    return (
        <footer className="py-12 border-t border-[#D4A574]/10 relative">
            <div className="max-w-7xl mx-auto px-6">
                <GoldDivider />
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
                    <div className="flex items-center gap-3">
                        <img
                            src="/assets/white-logo.png"
                            alt="ER Performance Marketing"
                            className="h-6 w-auto opacity-60"
                        />
                        <span className="text-xs text-[#A8A196] tracking-wider">
                            &copy; {new Date().getFullYear()} ER Marketing &middot; Especialistas em restaurantes
                        </span>
                    </div>
                    <div className="flex gap-6 text-xs text-[#A8A196] tracking-wider">
                        <a href="#" className="hover:text-[#E8C088] transition-colors">Instagram</a>
                        <a href="#" className="hover:text-[#E8C088] transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-[#E8C088] transition-colors">Política de privacidade</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
