import React from 'react';
import { SectionProps } from '../../types';
import { Button } from '../ui/Button';
import { ArrowRight, Clock, DollarSign, MessageCircle, Check } from 'lucide-react';

export const RestaurantQuizTransition: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="py-24 bg-[#0a0a0a] border-t border-white/5 relative z-10">
            <div className="max-w-3xl mx-auto px-6 text-center">
                {/* Header */}
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                    Antes de qualquer conversa,<br />
                    <span className="text-orange-500">a gente precisa entender o seu momento.</span>
                </h2>

                <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                    Criamos um diagnóstico rápido de 2 minutos para descobrir se faz sentido a gente trabalhar junto.
                    Sem compromisso, sem enrolação, sem pitch de venda.
                </p>

                {/* How it works */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-[#050505] border border-white/5 rounded-xl p-6">
                        <div className="w-10 h-10 rounded-lg bg-orange-950/30 flex items-center justify-center mx-auto mb-4">
                            <DollarSign size={20} className="text-orange-500" />
                        </div>
                        <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">Quanto custa?</p>
                        <p className="text-white font-bold text-lg">Zero. É gratuito.</p>
                    </div>

                    <div className="bg-[#050505] border border-white/5 rounded-xl p-6">
                        <div className="w-10 h-10 rounded-lg bg-orange-950/30 flex items-center justify-center mx-auto mb-4">
                            <Clock size={20} className="text-orange-500" />
                        </div>
                        <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">Quanto tempo leva?</p>
                        <p className="text-white font-bold text-lg">Menos de 2 minutos.</p>
                    </div>

                    <div className="bg-[#050505] border border-white/5 rounded-xl p-6">
                        <div className="w-10 h-10 rounded-lg bg-orange-950/30 flex items-center justify-center mx-auto mb-4">
                            <MessageCircle size={20} className="text-orange-500" />
                        </div>
                        <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">O que acontece depois?</p>
                        <p className="text-white font-bold text-lg">Contato em até 2h.</p>
                    </div>
                </div>

                {/* Process steps */}
                <div className="bg-[#050505] border border-white/5 rounded-xl p-6 mb-10 text-left max-w-lg mx-auto">
                    <div className="space-y-4">
                        {[
                            'Você responde algumas perguntas sobre o seu restaurante.',
                            'A gente analisa.',
                            'Se houver fit, nossa equipe entra em contato em até 2 horas.',
                            'Se não houver, a gente fala com honestidade.',
                        ].map((step, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-orange-600 flex-shrink-0 flex items-center justify-center mt-0.5">
                                    <Check size={12} className="text-white" strokeWidth={3} />
                                </div>
                                <p className="text-gray-300 text-sm">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <Button
                    onClick={onAuditClick}
                    className="text-lg px-10 py-5 shadow-[0_0_50px_rgba(255,165,0,0.5)] bg-orange-600 hover:bg-orange-700 border-orange-500 text-white animate-pulse-slow"
                >
                    Fazer o diagnóstico gratuito
                    <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                <p className="mt-4 text-gray-600 text-sm">
                    Apenas restaurantes em Manaus. Máximo de 4 novos clientes por mês.
                </p>
            </div>
        </section>
    );
};
