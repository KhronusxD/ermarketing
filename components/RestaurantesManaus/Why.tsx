import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle2 } from 'lucide-react';
import { SectionProps } from '../../types';
import { SectionLabel } from './shared';

export const Why: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="py-24 md:py-32 relative">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <SectionLabel className="mb-6">Por que acontece</SectionLabel>
                    <h2 className="font-serif text-3xl md:text-5xl font-semibold text-[#F5F1E8] tracking-tight leading-tight">
                        O que a maioria das agências faz —<br />
                        <span className="italic text-[#E8C088]">e por que não funciona para restaurante.</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 mb-14">
                    {/* Wrong way */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-3xl p-8 border border-red-500/10 bg-gradient-to-b from-red-950/10 to-transparent"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                                <XCircle size={20} className="text-red-400/80" />
                            </div>
                            <h3 className="font-serif text-xl text-[#F5F1E8]">A agência genérica</h3>
                        </div>
                        <ul className="space-y-4 text-[#A8A196]">
                            <li className="flex gap-3">
                                <span className="text-red-400/60 mt-0.5">✕</span>
                                Trata restaurante como qualquer outro negócio
                            </li>
                            <li className="flex gap-3">
                                <span className="text-red-400/60 mt-0.5">✕</span>
                                Cria conteúdo genérico
                            </li>
                            <li className="flex gap-3">
                                <span className="text-red-400/60 mt-0.5">✕</span>
                                Sobe anúncio sem estratégia de conversão
                            </li>
                            <li className="flex gap-3">
                                <span className="text-red-400/60 mt-0.5">✕</span>
                                Entrega relatório de "alcance" e "engajamento"
                            </li>
                        </ul>
                    </motion.div>

                    {/* Right way */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-3xl p-8 border border-[#D4A574]/25 bg-gradient-to-b from-[#D4A574]/10 to-transparent"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-[#D4A574]/15 flex items-center justify-center">
                                <CheckCircle2 size={20} className="text-[#E8C088]" />
                            </div>
                            <h3 className="font-serif text-xl text-[#F5F1E8]">A ER Marketing</h3>
                        </div>
                        <ul className="space-y-4 text-[#C7BFB1]">
                            <li className="flex gap-3">
                                <span className="text-[#E8C088] mt-0.5">✓</span>
                                Entende que o cliente de restaurante decide rápido
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#E8C088] mt-0.5">✓</span>
                                Trabalha concorrência local, momento e geolocalização
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#E8C088] mt-0.5">✓</span>
                                Usa WhatsApp como canal principal de conversão
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#E8C088] mt-0.5">✓</span>
                                Mede em reservas e faturamento — não em curtidas
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Quote block */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <p className="font-serif text-2xl md:text-3xl italic text-[#E8C088] leading-tight mb-4">
                        "Alcance não paga a conta do fornecedor. Reserva paga."
                    </p>
                    <p className="text-[#A8A196] leading-relaxed">
                        Restaurante tem uma lógica própria. Se a agência não entende isso,
                        ela está trabalhando com a ferramenta errada.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
