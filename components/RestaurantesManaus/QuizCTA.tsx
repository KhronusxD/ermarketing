import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, DollarSign, MessageCircle } from 'lucide-react';
import { SectionProps } from '../../types';
import { GoldButton, SectionLabel } from './shared';

const features = [
    { icon: DollarSign, label: 'Quanto custa?', value: 'Zero.' },
    { icon: Clock, label: 'Quanto tempo leva?', value: 'Menos de 2 minutos.' },
    { icon: MessageCircle, label: 'O que acontece depois?', value: 'Contato em até 2h.' },
];

export const QuizCTA: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="py-24 md:py-32 relative">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <SectionLabel className="mb-6">Transição para o quiz</SectionLabel>
                    <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold text-[#F5F1E8] tracking-tight leading-[1.05] mb-6">
                        Antes de qualquer conversa,<br />
                        <span className="italic text-[#E8C088]">preciso entender o seu momento.</span>
                    </h2>

                    <p className="text-[#C7BFB1] text-lg leading-relaxed mb-14 max-w-2xl mx-auto">
                        Criamos um diagnóstico rápido de 2 minutos para descobrir se faz sentido trabalharmos juntos.
                        Sem compromisso, sem pitch de venda, sem enrolação.
                    </p>
                </motion.div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-xl border border-white/10 p-7"
                        >
                            <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-[#D4A574]/20 to-transparent border border-[#D4A574]/30 flex items-center justify-center mb-4">
                                <f.icon size={22} className="text-[#E8C088]" />
                            </div>
                            <div className="text-[11px] text-[#A8A196] uppercase tracking-widest mb-1">{f.label}</div>
                            <div className="font-serif text-xl text-[#F5F1E8]">{f.value}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Process */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl mx-auto rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 p-7 mb-12 text-left"
                >
                    <div className="space-y-4 text-[#C7BFB1]">
                        <div className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-7 h-7 rounded-full border border-[#D4A574]/40 bg-[#D4A574]/10 flex items-center justify-center text-[#E8C088] text-xs font-semibold font-serif mt-0.5">1</span>
                            <p>Você responde algumas perguntas sobre o seu restaurante.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-7 h-7 rounded-full border border-[#D4A574]/40 bg-[#D4A574]/10 flex items-center justify-center text-[#E8C088] text-xs font-semibold font-serif mt-0.5">2</span>
                            <p>A gente analisa.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-7 h-7 rounded-full border border-[#D4A574]/40 bg-[#D4A574]/10 flex items-center justify-center text-[#E8C088] text-xs font-semibold font-serif mt-0.5">3</span>
                            <p>Se houver fit, nossa equipe entra em contato em até 2 horas.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-7 h-7 rounded-full border border-[#D4A574]/40 bg-[#D4A574]/10 flex items-center justify-center text-[#E8C088] text-xs font-semibold font-serif mt-0.5">4</span>
                            <p>Se não houver, falamos com honestidade.</p>
                        </div>
                    </div>
                </motion.div>

                {/* Final CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex flex-col items-center gap-1.5">
                        <GoldButton size="lg" onClick={onAuditClick} className="text-base md:text-lg">
                            Fazer o diagnóstico gratuito
                            <ArrowRight size={20} />
                        </GoldButton>
                        <span className="text-[10px] text-[#A8A196]/90 tracking-wide font-medium">
                            Fale com a equipe pelo WhatsApp
                        </span>
                    </div>
                    <p className="mt-5 text-xs text-[#A8A196] uppercase tracking-widest">
                        Apenas restaurantes em Manaus &middot; Máximo 4 novos clientes por mês
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
