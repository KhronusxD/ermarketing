import React from 'react';
import { SectionProps } from '../../types';
import { ArrowRight, ChefHat, Utensils, Flame, Star } from 'lucide-react';

export const RestaurantBHero: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-[#FFFDF8]">
            {/* Subtle warm gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#FFF3E0_0%,_#FFFDF8_60%)] opacity-60"></div>

            {/* Floating decorative elements */}
            <div className="absolute top-32 left-[8%] text-4xl opacity-[0.08] animate-bounce" style={{ animationDuration: '4s' }}>
                <Utensils size={48} className="text-[#D4660A]" />
            </div>
            <div className="absolute top-48 right-[10%] text-4xl opacity-[0.08] animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
                <Flame size={40} className="text-[#D4660A]" />
            </div>
            <div className="absolute bottom-32 left-[15%] text-4xl opacity-[0.06] animate-bounce" style={{ animationDuration: '6s', animationDelay: '2s' }}>
                <Star size={36} className="text-[#D4660A]" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto px-6 text-center flex flex-col items-center">
                {/* TAG */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF3E0] text-[#D4660A] text-xs font-bold tracking-widest uppercase mb-8 border border-[#F5DCC3]">
                    <ChefHat size={14} />
                    Especialistas em restaurantes &middot; Manaus &mdash; Vagas abertas para abril
                </div>

                {/* HEADLINE */}
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-[#3D2B1F] leading-[1.1] tracking-tight mb-6">
                    Todo fim de semana seu restaurante lota.{' '}
                    <span className="text-[#8B7E74]">E na segunda?</span>{' '}
                    <span className="text-[#D4660A]">Silêncio.</span>
                </h1>

                {/* SUB-HOOK */}
                <p className="text-[#8B7E74] text-lg font-medium mb-2">
                    Isso não é azar. É ausência de sistema.
                </p>
                <p className="text-[#5C5047] text-lg max-w-2xl leading-relaxed mb-10">
                    Transformamos restaurantes em Manaus em{' '}
                    <span className="text-[#3D2B1F] font-semibold">máquinas de reservas previsíveis</span> — com tráfego pago,
                    audiovisual profissional e atendimento inteligente que não dorme.
                </p>

                {/* DUAL CTA */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
                    <button
                        onClick={onAuditClick}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4660A] text-white font-extrabold text-base rounded-full border-2 border-[#A34F08] shadow-[0_3px_0_0_#A34F08] hover:shadow-[0_5px_0_0_#A34F08] hover:-translate-y-[2px] active:shadow-none active:translate-y-0 transition-all duration-200 uppercase tracking-wide"
                    >
                        Descobrir se meu restaurante se qualifica
                        <ArrowRight size={18} />
                    </button>
                    <button
                        className="text-sm text-[#D4660A] font-bold hover:text-[#A34F08] underline underline-offset-4 transition-colors"
                        onClick={() => {
                            const el = document.getElementById('casos-reais-b');
                            el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Ver o que fizemos pelo Taychi Sushi Bar
                    </button>
                </div>

                {/* PROOF STATS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
                    {[
                        { value: '+340%', label: 'Aumento médio em reservas' },
                        { value: 'R$ 13,52', label: 'Custo por lead qualificado' },
                        { value: '12+', label: 'Restaurantes atendidos em Manaus' },
                        { value: '3x', label: 'Retorno médio sobre investimento' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white border border-[#EAE2D9] rounded-2xl p-5 text-center shadow-[0_1px_0_0_#EAE2D9]">
                            <div className="text-2xl md:text-3xl font-extrabold text-[#D4660A] mb-1 tracking-tight">{stat.value}</div>
                            <p className="text-[#8B7E74] text-xs uppercase tracking-wide leading-tight font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
