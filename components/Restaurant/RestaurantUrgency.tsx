import React from 'react';
import { SectionProps } from '../../types';
import { Button } from '../ui/Button';
import { ArrowRight, Clock } from 'lucide-react';

export const RestaurantUrgency: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="py-24 bg-[#050505] relative z-10 overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/8 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/20 text-red-400 text-xs font-bold tracking-widest uppercase mb-6">
                    <Clock size={14} className="animate-pulse" />
                    Capacidade limitada
                </div>

                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
                    Atendemos no máximo<br />
                    <span className="text-orange-500">4 novos restaurantes por mês.</span>
                </h2>

                <p className="text-gray-400 text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
                    Não é estratégia de marketing. É capacidade operacional real. Cada cliente novo recebe atenção direta do time — e isso tem limite.
                </p>

                <p className="text-gray-300 text-lg mb-10">
                    Se você está lendo isso em <span className="text-white font-semibold">abril de 2026</span>, temos vagas abertas.{' '}
                    <span className="text-orange-400 font-medium">Mas não por muito tempo.</span>
                </p>

                <Button
                    onClick={onAuditClick}
                    className="text-base px-8 py-4 shadow-[0_0_40px_rgba(255,165,0,0.5)] bg-orange-600 hover:bg-orange-700 border-orange-500 text-white animate-pulse-slow"
                >
                    Fazer o diagnóstico gratuito agora — antes que as vagas fechem
                    <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
            </div>
        </section>
    );
};
