import React from 'react';
import { SectionProps } from '../types';
import { Button } from './ui/Button';

export const Authority: React.FC<SectionProps> = ({ onAuditClick }) => {
  return (
    <section className="py-20 bg-er-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-er-red font-bold tracking-widest uppercase text-sm mb-4">Track Record</p>
        <h2 className="text-3xl font-bold text-white mb-12">METODOLOGIA VALIDADA EM +150 PROJETOS</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="py-4">
            <div className="text-5xl font-black text-white mb-2">+45M</div>
            <p className="text-gray-500 text-sm uppercase tracking-wide">Reais Gerenciados em Ads</p>
          </div>
          <div className="py-4">
            <div className="text-5xl font-black text-white mb-2">7.5x</div>
            <p className="text-gray-500 text-sm uppercase tracking-wide">ROAS Médio Global</p>
          </div>
          <div className="py-4">
            <div className="text-5xl font-black text-white mb-2">+120k</div>
            <p className="text-gray-500 text-sm uppercase tracking-wide">Leads Qualificados Gerados</p>
          </div>
        </div>

        <div className="mt-12 p-6 bg-white/5 rounded-lg inline-block border border-white/5 max-w-3xl">
          <p className="text-gray-300 italic mb-6">
            "Enquanto o mercado foca em métricas de vaidade (likes), nós focamos no lucro líquido da sua empresa e na previsibilidade de caixa."
          </p>
          <Button onClick={onAuditClick} className="shadow-[0_0_20px_rgba(230,0,0,0.5)]">
            CONHECER METODOLOGIA
          </Button>
        </div>
      </div>
    </section>
  );
};