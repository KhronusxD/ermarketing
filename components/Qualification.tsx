import React from 'react';
import { Check } from 'lucide-react';
import { SectionProps } from '../types';
import { Button } from './ui/Button';

export const Qualification: React.FC<SectionProps> = ({ onAuditClick }) => {
  const criteria = [
    "Empresas que já investem ou têm verba disponível para tráfego pago.",
    "Negócios que buscam escala previsível e não 'mágica' de curto prazo.",
    "Empresários que entendem que branding (marca) e performance (vendas) andam juntos."
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-er-red/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">PARA QUEM É ESTA AUDITORIA?</h2>

        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 md:p-12 mb-10 text-left shadow-2xl">
          <ul className="space-y-6">
            {criteria.map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-er-red flex-shrink-0 flex items-center justify-center mt-1">
                  <Check size={14} className="text-white" strokeWidth={3} />
                </div>
                <span className="text-lg md:text-xl text-gray-200">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center">
          <Button onClick={onAuditClick} className="w-full md:w-auto text-lg px-12 py-5 shadow-[0_0_50px_rgba(230,0,0,0.4)] animate-pulse-slow">
            QUERO PARAR DE PERDER DINHEIRO
          </Button>
          <p className="mt-4 text-gray-500 text-sm">
            Sem compromisso financeiro inicial. Apenas estratégia.
          </p>
        </div>
      </div>
    </section>
  );
};