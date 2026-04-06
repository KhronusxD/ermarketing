import React from 'react';
import { SectionProps } from '../../types';
import { ArrowRight, Clock, DollarSign, MessageCircle, Check } from 'lucide-react';

export const RestaurantBQuizTransition: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="py-24 bg-[#F7F3EE]">
            <div className="max-w-3xl mx-auto px-6 text-center">
                {/* Header */}
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#3D2B1F] tracking-tight leading-tight mb-4">
                    Antes de qualquer conversa,{' '}
                    <span className="text-[#D4660A]">a gente precisa entender o seu momento.</span>
                </h2>

                <p className="text-[#5C5047] text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                    Criamos um diagnóstico rápido de 2 minutos para descobrir se faz sentido a gente trabalhar junto.
                    Sem compromisso, sem enrolação, sem pitch de venda.
                </p>

                {/* How it works */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                    <div className="bg-white border border-[#EAE2D9] rounded-[2.25rem] p-7 shadow-[0_1px_0_0_#EAE2D9]">
                        <div className="w-12 h-12 rounded-full bg-[#FFF3E0] flex items-center justify-center mx-auto mb-4">
                            <DollarSign size={22} className="text-[#D4660A]" />
                        </div>
                        <p className="text-[#8B7E74] text-xs uppercase tracking-widest mb-1 font-medium">Quanto custa?</p>
                        <p className="text-[#3D2B1F] font-extrabold text-lg">Zero. É gratuito.</p>
                    </div>

                    <div className="bg-white border border-[#EAE2D9] rounded-[2.25rem] p-7 shadow-[0_1px_0_0_#EAE2D9]">
                        <div className="w-12 h-12 rounded-full bg-[#FFF3E0] flex items-center justify-center mx-auto mb-4">
                            <Clock size={22} className="text-[#D4660A]" />
                        </div>
                        <p className="text-[#8B7E74] text-xs uppercase tracking-widest mb-1 font-medium">Quanto tempo leva?</p>
                        <p className="text-[#3D2B1F] font-extrabold text-lg">Menos de 2 minutos.</p>
                    </div>

                    <div className="bg-white border border-[#EAE2D9] rounded-[2.25rem] p-7 shadow-[0_1px_0_0_#EAE2D9]">
                        <div className="w-12 h-12 rounded-full bg-[#FFF3E0] flex items-center justify-center mx-auto mb-4">
                            <MessageCircle size={22} className="text-[#D4660A]" />
                        </div>
                        <p className="text-[#8B7E74] text-xs uppercase tracking-widest mb-1 font-medium">O que acontece depois?</p>
                        <p className="text-[#3D2B1F] font-extrabold text-lg">Contato em até 2h.</p>
                    </div>
                </div>

                {/* Steps */}
                <div className="bg-white border border-[#EAE2D9] rounded-[2.25rem] p-7 mb-10 text-left max-w-lg mx-auto shadow-[0_1px_0_0_#EAE2D9]">
                    <div className="space-y-4">
                        {[
                            'Você responde algumas perguntas sobre o seu restaurante.',
                            'A gente analisa.',
                            'Se houver fit, nossa equipe entra em contato em até 2 horas.',
                            'Se não houver, a gente fala com honestidade.',
                        ].map((step, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#D4660A] flex-shrink-0 flex items-center justify-center mt-0.5">
                                    <Check size={12} className="text-white" strokeWidth={3} />
                                </div>
                                <p className="text-[#5C5047] text-sm">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <button
                    onClick={onAuditClick}
                    className="inline-flex items-center gap-2 px-10 py-5 bg-[#D4660A] text-white font-extrabold text-lg rounded-full border-2 border-[#A34F08] shadow-[0_3px_0_0_#A34F08] hover:shadow-[0_5px_0_0_#A34F08] hover:-translate-y-[2px] active:shadow-none active:translate-y-0 transition-all duration-200 uppercase tracking-wide"
                >
                    Fazer o diagnóstico gratuito
                    <ArrowRight size={20} />
                </button>

                <p className="mt-4 text-[#8B7E74] text-sm">
                    Apenas restaurantes em Manaus. Máximo de 4 novos clientes por mês.
                </p>
            </div>
        </section>
    );
};
