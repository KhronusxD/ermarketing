import React from 'react';
import { motion } from 'framer-motion';
import { SectionProps } from '../../types';
import { SectionLabel, GlassCard } from './shared';

const painPoints = [
    'Você pagou uma agência. Recebeu posts bonitos. O movimento não mudou.',
    'Você impulsionou no Instagram. Teve curtidas. Não teve cliente.',
    'Um lead mandou mensagem no WhatsApp às 20h perguntando sobre reserva. Quando alguém respondeu no dia seguinte, ele já tinha ido para o concorrente.',
    'Você tem avaliações 5 estrelas no Google. Mas na terça-feira o salão está meio vazio.',
    'Você sabe que seu produto é bom. O problema é que a cidade ainda não sabe disso do jeito certo.',
];

export const Pain: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="py-24 md:py-32 relative">
            {/* Ambient glow */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#D4A574]/5 blur-[120px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <SectionLabel className="mb-6">Você reconhece?</SectionLabel>
                    <h2 className="font-serif text-3xl md:text-5xl font-semibold text-[#F5F1E8] tracking-tight leading-tight">
                        Se você é dono de restaurante em Manaus,<br />
                        <span className="italic text-[#E8C088]">reconhece pelo menos um desses cenários.</span>
                    </h2>
                </motion.div>

                <div className="space-y-3 mb-14">
                    {painPoints.map((pain, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                        >
                            <GlassCard className="p-6 flex items-start gap-5">
                                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-[#D4A574]/20 to-transparent border border-[#D4A574]/30 flex items-center justify-center font-serif text-[#E8C088] text-sm font-semibold">
                                    {String(i + 1).padStart(2, '0')}
                                </div>
                                <p className="text-[#C7BFB1] leading-relaxed pt-1">{pain}</p>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                {/* Truth bomb */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative rounded-3xl overflow-hidden"
                >
                    <div
                        className="p-10 md:p-14 text-center relative"
                        style={{
                            background:
                                'linear-gradient(135deg, #1a1510 0%, #0f0c08 50%, #1a1510 100%)',
                        }}
                    >
                        {/* Gold border */}
                        <div className="absolute inset-0 rounded-3xl p-px bg-gradient-to-br from-[#D4A574]/40 via-transparent to-[#D4A574]/20 pointer-events-none">
                            <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-[#1a1510] via-[#0f0c08] to-[#1a1510]"></div>
                        </div>
                        <div className="relative z-10">
                            <p className="text-sm text-[#D4A574] uppercase tracking-[0.3em] mb-4 font-semibold">
                                A verdade que ninguém fala
                            </p>
                            <p className="font-serif text-2xl md:text-4xl text-[#F5F1E8] leading-tight">
                                Post bonito não enche salão.<br />
                                <span className="italic text-[#E8C088]">Sistema enche salão.</span>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
