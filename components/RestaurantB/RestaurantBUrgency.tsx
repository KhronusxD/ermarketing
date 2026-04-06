import React from 'react';
import { SectionProps } from '../../types';
import { ArrowRight, Clock } from 'lucide-react';

export const RestaurantBUrgency: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="py-24 bg-[#FFFDF8]">
            <div className="max-w-3xl mx-auto px-6 text-center">
                <div className="bg-[#3D2B1F] rounded-[2.25rem] p-10 md:p-14 relative overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#D4660A]/10 rounded-full"></div>
                    <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-[#D4660A]/10 rounded-full"></div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-[#F5A623] text-xs font-bold tracking-widest uppercase mb-6">
                            <Clock size={14} className="animate-pulse" />
                            Capacidade limitada
                        </div>

                        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-6">
                            Atendemos no máximo{' '}
                            <span className="text-[#F5A623]">4 novos restaurantes por mês.</span>
                        </h2>

                        <p className="text-white/60 text-lg leading-relaxed mb-4">
                            Não é estratégia de marketing. É capacidade operacional real. Cada cliente novo recebe atenção direta do time — e isso tem limite.
                        </p>

                        <p className="text-white/80 text-lg mb-10">
                            Se você está lendo isso em <span className="text-white font-semibold">abril de 2026</span>, temos vagas abertas.{' '}
                            <span className="text-[#F5A623] font-medium">Mas não por muito tempo.</span>
                        </p>

                        <button
                            onClick={onAuditClick}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4660A] text-white font-extrabold text-base rounded-full border-2 border-[#A34F08] shadow-[0_3px_0_0_#A34F08] hover:shadow-[0_5px_0_0_#A34F08] hover:-translate-y-[2px] active:shadow-none active:translate-y-0 transition-all duration-200 uppercase tracking-wide"
                        >
                            Fazer o diagnóstico gratuito agora
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
