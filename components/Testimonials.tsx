import React from 'react';
import { Quote } from 'lucide-react';
import { SectionProps } from '../types';
import { Button } from './ui/Button';

export const Testimonials: React.FC<SectionProps> = ({ onAuditClick }) => {
  return (
    <section className="py-24 bg-[#050505] relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16">
          O QUE DIZEM OS SÓCIOS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Ricardo Silva",
              role: "CEO, TechSolutions",
              text: "A auditoria da ER foi um divisor de águas. Descobrimos que 40% da nossa verba estava indo para o público errado. Corrigimos em uma semana e o lucro dobrou."
            },
            {
              name: "Amanda Costa",
              role: "Fundadora, Moda & Co.",
              text: "Eu achava que precisava de mais seguidores. A ER me mostrou que eu precisava de um funil melhor. A equipe de social e criação elevou nossa marca para outro patamar."
            },
            {
              name: "Felipe Mendes",
              role: "Diretor Comercial, Grupo 3X",
              text: "Profissionalismo raro. Eles não prometem milagres, mostram dados. A previsibilidade de caixa que temos hoje veio da estrutura que eles montaram."
            }
          ].map((item, index) => (
            <div key={index} className="bg-[#0A0A0A] p-8 rounded-xl border border-white/5 relative hover:border-er-red/30 transition-colors cursor-pointer" onClick={onAuditClick}>
              <Quote className="absolute top-6 left-6 text-er-red/20 rotate-180" size={40} />
              <p className="text-gray-300 italic mb-6 relative z-10 mt-6 leading-relaxed">"{item.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-bold text-white">
                  {item.name[0]}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{item.name}</h4>
                  <p className="text-gray-500 text-xs">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};