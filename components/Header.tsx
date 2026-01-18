import React, { useState, useEffect } from 'react';
import { SectionProps } from '../types';
import { Button } from './ui/Button';

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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${scrolled ? 'bg-er-black/90 backdrop-blur-md border-white/10 py-4' : 'bg-transparent border-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-er-red rounded-sm flex items-center justify-center font-black text-black">E</div>
          <span className="text-xl font-bold tracking-tighter text-white">ER <span className="text-gray-500">MARKETING</span></span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="hidden md:inline-flex font-normal text-sm gap-2"
            onClick={() => window.open('https://wa.me/5592985146299?text=Ol%C3%A1%2C%20gostaria%20de%20tirar%20d%C3%BAvidas%20sobre%20a%20ER%20Marketing', '_blank')}
          >
            TIRAR DÚVIDAS
          </Button>
          <Button variant="primary" size="sm" onClick={onAuditClick} className="shadow-[0_0_20px_rgba(230,0,0,0.4)] py-2 md:text-sm md:px-6 md:py-3">
            AGENDAR AUDITORIA
          </Button>
        </div>
      </div>
    </header>
  );
};