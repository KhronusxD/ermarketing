import React from 'react';
import { Target, Search, FileBarChart } from 'lucide-react';
import { SectionProps } from '../types';

export const Diagnosis: React.FC<SectionProps> = ({ onAuditClick }) => {
  return (
    <section className="py-24 bg-[#050505] border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">O QUE REVELAMOS NA AUDITORIA?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Não é apenas um relatório. É um plano de resgate para o seu lucro líquido.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Card 1 */}
          <div className="group relative p-8 border border-white/5 bg-[#050505] hover:border-er-red/50 transition-colors duration-500 cursor-pointer" onClick={onAuditClick}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-er-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-14 h-14 bg-white/5 rounded-lg flex items-center justify-center mb-6 text-er-red group-hover:text-white group-hover:bg-er-red transition-all duration-300">
              <Target size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">O "Balde Furado"</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Identificamos exatamente onde você está queimando verba de anúncios sem retorno. Otimização de custo por aquisição (CAC) imediata.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group relative p-8 border border-white/5 bg-[#050505] hover:border-er-red/50 transition-colors duration-500 cursor-pointer" onClick={onAuditClick}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-er-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-14 h-14 bg-white/5 rounded-lg flex items-center justify-center mb-6 text-er-red group-hover:text-white group-hover:bg-er-red transition-all duration-300">
              <Search size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">A Oportunidade Oculta</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Mapeamos públicos, criativos e canais de venda que seus concorrentes estão ignorando. Encontramos o "oceano azul" no seu nicho.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group relative p-8 border border-white/5 bg-[#050505] hover:border-er-red/50 transition-colors duration-500 cursor-pointer" onClick={onAuditClick}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-er-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-14 h-14 bg-white/5 rounded-lg flex items-center justify-center mb-6 text-er-red group-hover:text-white group-hover:bg-er-red transition-all duration-300">
              <FileBarChart size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">O Plano de Ação</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              O passo a passo exato para implementar nossa metodologia de Tração, Autoridade e Conversão no próximo trimestre.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};