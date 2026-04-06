import React from 'react';
import { SectionProps } from '../../types';
import { Button } from '../ui/Button';
import { ArrowRight, ChefHat } from 'lucide-react';

export const RestaurantHero: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0a0a0a]">
            {/* Background FX */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#2a1505] via-[#050505] to-[#050505] opacity-70"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 brightness-100 contrast-150"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center">

                {/* TAG */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-950/10 text-orange-500 text-xs font-bold tracking-widest uppercase mb-8">
                    <ChefHat size={14} className="animate-pulse" />
                    Especialistas em restaurantes &middot; Manaus &mdash; Vagas abertas para abril
                </div>

                {/* HEADLINE */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-6 max-w-5xl mx-auto">
                    Todo fim de semana seu restaurante lota.<br />
                    <span className="text-gray-500">E na segunda?</span>{' '}
                    <span className="text-orange-500 drop-shadow-[0_0_15px_rgba(255,165,0,0.6)]">
                        Silêncio.
                    </span>
                </h1>

                {/* SUB-HEADLINE */}
                <p className="text-base md:text-lg text-gray-500 max-w-2xl mb-2 font-medium">
                    Isso não é azar. É ausência de sistema.
                </p>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl text-center mb-10 font-light leading-relaxed">
                    Transformamos restaurantes em Manaus em{' '}
                    <span className="text-white font-semibold">máquinas de reservas previsíveis</span> — com tráfego pago,
                    audiovisual profissional e atendimento inteligente que não dorme.
                </p>

                {/* DUAL CTA */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center mb-10">
                    <Button
                        className="w-full sm:w-auto text-base px-8 py-4 shadow-[0_0_30px_rgba(255,165,0,0.4)] bg-orange-600 hover:bg-orange-700 border-orange-500 animate-pulse-slow text-white"
                        onClick={onAuditClick}
                    >
                        Descobrir se meu restaurante se qualifica
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <button
                        className="text-sm text-orange-400 hover:text-orange-300 underline underline-offset-4 transition-colors"
                        onClick={() => {
                            const el = document.getElementById('casos-reais');
                            el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Ver o que fizemos pelo Taychi Sushi Bar
                    </button>
                </div>

                {/* PROOF STATS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
                    {[
                        { value: '+340%', label: 'Aumento médio em reservas' },
                        { value: 'R$ 13,52', label: 'Custo por lead qualificado' },
                        { value: '12+', label: 'Restaurantes atendidos em Manaus' },
                        { value: '3x', label: 'Retorno médio sobre investimento em ads' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 text-center hover:border-orange-500/30 transition-colors">
                            <div className="text-2xl md:text-3xl font-black text-orange-500 mb-1">{stat.value}</div>
                            <p className="text-gray-500 text-xs uppercase tracking-wide leading-tight">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Abstract Data Visual */}
                <div className="mt-16 w-full max-w-4xl h-24 md:h-32 border-x border-t border-white/5 bg-gradient-to-b from-orange-900/10 to-transparent relative overflow-hidden rounded-t-xl">
                    <div className="absolute top-0 left-0 w-full h-1 bg-orange-500 shadow-[0_0_20px_#FF8C00]"></div>
                    <div className="grid grid-cols-6 h-full w-full opacity-20">
                        {[75, 45, 90, 60, 85, 50].map((h, i) => (
                            <div key={i} className="border-r border-white/10 h-full flex flex-col justify-end p-2">
                                <div className="w-full bg-orange-500 rounded-t" style={{ height: `${h}%`, opacity: 0.4 + i * 0.1 }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
