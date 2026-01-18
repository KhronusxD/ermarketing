import React from 'react';
import { SectionProps } from '../types';
import { Button } from './ui/Button';
import { ArrowRight, TrendingDown } from 'lucide-react';

export const Hero: React.FC<SectionProps> = ({ onAuditClick }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background FX */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a0505] via-[#050505] to-[#050505] opacity-60"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>

        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center md:text-left flex flex-col items-center">

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-900/30 bg-red-950/10 text-er-red text-xs font-bold tracking-widest uppercase mb-8 animate-in slide-in-from-bottom-4 duration-700">
          <span className="w-2 h-2 rounded-full bg-er-red animate-pulse"></span>
          Auditoria de Lucro Invisível
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-6 max-w-4xl mx-auto text-center">
          Transforme seu marketing em<br />
          <span className="text-er-red drop-shadow-[0_0_15px_rgba(230,0,0,0.8)] uppercase">
            LUCRO LÍQUIDO
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl text-center mb-10 font-light leading-relaxed">
          Uma Auditoria baseada em dados de <span className="text-white font-semibold">+150 projetos</span> que identifica exatamente onde está o gargalo do seu crescimento. Sem "achismos", apenas matemática e estratégia.
        </p>

        <div className="flex flex-col items-center gap-4 w-full">
          <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4 shadow-[0_0_30px_rgba(230,0,0,0.5)] animate-pulse-slow" onClick={onAuditClick}>
            SOLICITAR AUDITORIA AGORA
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <TrendingDown size={14} className="text-er-red" />
            <span>Apenas <span className="text-white font-bold">5 vagas gratuitas</span> para este mês.</span>
          </div>
        </div>

        {/* Abstract Data Visual */}
        <div className="mt-16 w-full max-w-4xl h-32 md:h-48 border-x border-t border-white/5 bg-gradient-to-b from-white/5 to-transparent relative overflow-hidden rounded-t-xl mask-image-gradient">
          <div className="absolute top-0 left-0 w-full h-1 bg-er-red shadow-[0_0_20px_#E60000]"></div>
          <div className="grid grid-cols-6 h-full w-full opacity-20">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border-r border-white/10 h-full flex flex-col justify-end p-2 gap-2">
                <div className="w-full bg-er-red" style={{ height: `${Math.random() * 80 + 20}%`, opacity: Math.random() * 0.5 + 0.2 }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};