import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { SectionProps } from '../../types';
import { SectionLabel } from './shared';

export const Urgency: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="py-24 md:py-28 relative">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9 }}
                    className="relative rounded-3xl overflow-hidden"
                >
                    <div
                        className="relative p-12 md:p-16 text-center"
                        style={{
                            background:
                                'radial-gradient(ellipse at 50% 0%, rgba(212,165,116,0.15) 0%, transparent 50%), linear-gradient(180deg, #1a1510 0%, #111112 100%)',
                        }}
                    >
                        {/* Animated gold border */}
                        <div
                            className="absolute inset-0 rounded-3xl p-px"
                            style={{
                                background:
                                    'linear-gradient(110deg, transparent 0%, #D4A574 50%, transparent 100%)',
                                backgroundSize: '200% 100%',
                                animation: 'gradient-shift 5s ease infinite',
                            }}
                        >
                            <div className="absolute inset-[1px] rounded-3xl" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,165,116,0.15) 0%, transparent 50%), linear-gradient(180deg, #1a1510 0%, #111112 100%)' }}></div>
                        </div>

                        <div className="relative z-10">
                            <SectionLabel className="mb-6">
                                <Clock size={12} className="animate-pulse" />
                                Urgência real
                            </SectionLabel>

                            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold text-[#F5F1E8] tracking-tight leading-[1.05] mb-8">
                                Atendemos no máximo<br />
                                <span className="italic text-[#E8C088]">4 novos restaurantes por mês.</span>
                            </h2>

                            <p className="text-[#C7BFB1] text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
                                Não é estratégia de marketing. É limite operacional real. Cada cliente novo recebe atenção
                                direta do nosso time — e isso tem limite.
                            </p>
                            <p className="text-[#E8C088] text-lg font-medium">
                                Se você está lendo isso agora, pode haver vagas abertas. Mas não por muito tempo.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
