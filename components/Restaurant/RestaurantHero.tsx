import React from 'react';
import { SectionProps } from '../../types';
import { Button } from '../ui/Button';
import { ArrowRight, TrendingDown, ChefHat } from 'lucide-react';

export const RestaurantHero: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0a0a0a]">
            {/* Background FX - Culinary Theme */}
            <div className="absolute inset-0 z-0">
                {/* Warm/Orange undertones for appetite/restaurant vibe */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#2a1505] via-[#050505] to-[#050505] opacity-70"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 brightness-100 contrast-150"></div>

                {/* Grid lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center md:text-left flex flex-col items-center">

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-950/10 text-orange-500 text-xs font-bold tracking-widest uppercase mb-8 animate-in slide-in-from-bottom-4 duration-700">
                    <ChefHat size={14} className="animate-pulse" />
                    Especial para Donos de Restaurantes & Delivery
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-6 max-w-5xl mx-auto text-center">
                    Pare de Trabalhar para o iFood e<br />
                    <span className="text-orange-500 drop-shadow-[0_0_15px_rgba(255,165,0,0.6)] uppercase">
                        Domine Seu Lucro
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-400 max-w-3xl text-center mb-10 font-light leading-relaxed">
                    Uma auditoria exclusiva para identificar por que seu restaurante fatura mas não lucra o que deveria. <br />
                    <span className="text-white font-semibold">CMV alto? Taxas abusivas? Mesas vazias?</span> Descubra o gargalo exato.
                </p>

                <div className="flex flex-col items-center gap-4 w-full">
                    <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4 shadow-[0_0_30px_rgba(255,165,0,0.4)] bg-orange-600 hover:bg-orange-700 border-orange-500 animate-pulse-slow text-white" onClick={onAuditClick}>
                        QUERO MINHA AUDITORIA
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <TrendingDown size={14} className="text-orange-500" />
                        <span>Diagnóstico completo para <span className="text-white font-bold">Delivery e Salão</span>.</span>
                    </div>
                </div>

                {/* Abstract Data Visual - Fire/Heat Theme */}
                <div className="mt-16 w-full max-w-4xl h-32 md:h-48 border-x border-t border-white/5 bg-gradient-to-b from-orange-900/10 to-transparent relative overflow-hidden rounded-t-xl mask-image-gradient">
                    <div className="absolute top-0 left-0 w-full h-1 bg-orange-500 shadow-[0_0_20px_#FF8C00]"></div>
                    <div className="grid grid-cols-6 h-full w-full opacity-20">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="border-r border-white/10 h-full flex flex-col justify-end p-2 gap-2">
                                <div className="w-full bg-orange-500" style={{ height: `${Math.random() * 80 + 20}%`, opacity: Math.random() * 0.5 + 0.2 }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
