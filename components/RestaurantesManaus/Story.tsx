import React from 'react';
import { motion } from 'framer-motion';
import { SectionProps } from '../../types';
import { SectionLabel, PHOTOS } from './shared';

export const Story: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="py-24 md:py-32 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    {/* Left — gallery */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="lg:col-span-6 relative h-[520px] md:h-[620px] order-2 lg:order-1"
                    >
                        {/* Main large image */}
                        <div className="absolute top-0 left-0 w-[70%] h-[60%] rounded-3xl overflow-hidden border border-[#D4A574]/20 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)]">
                            <img src={PHOTOS.taychi[0]} alt="Captação Taychi" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 text-xs text-white/90 tracking-widest uppercase backdrop-blur-sm bg-black/40 px-3 py-1 rounded-full border border-white/10">
                                Captação no cliente
                            </div>
                        </div>

                        {/* Top right */}
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute top-[10%] right-0 w-[45%] h-[40%] rounded-2xl overflow-hidden border border-[#D4A574]/25 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)]"
                        >
                            <img src={PHOTOS.pizza[1]} alt="La Pizza Rio" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </motion.div>

                        {/* Bottom right */}
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                            className="absolute bottom-0 right-[5%] w-[50%] h-[42%] rounded-2xl overflow-hidden border border-[#D4A574]/25 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)]"
                        >
                            <img src={PHOTOS.taychi[2]} alt="Edição Taychi" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </motion.div>

                        {/* Bottom left — small detail */}
                        <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                            className="absolute bottom-[5%] left-[10%] w-[35%] h-[28%] rounded-2xl overflow-hidden border border-[#D4A574]/30 shadow-[0_15px_40px_-10px_rgba(212,165,116,0.3)]"
                        >
                            <img src={PHOTOS.pizza[3]} alt="Prato" className="w-full h-full object-cover" />
                        </motion.div>
                    </motion.div>

                    {/* Right — story copy */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-6 order-1 lg:order-2"
                    >
                        <SectionLabel className="mb-6">Nossa história</SectionLabel>
                        <h2 className="font-serif text-3xl md:text-5xl font-semibold text-[#F5F1E8] tracking-tight leading-[1.1] mb-8">
                            Como chegamos<br />
                            <span className="italic text-[#E8C088]">aqui.</span>
                        </h2>

                        <div className="space-y-5 text-[#C7BFB1] leading-relaxed">
                            <p>
                                A ER não virou especialista em restaurante por acidente.
                            </p>
                            <p>
                                Quando começamos a atender esse nicho, percebemos algo que nenhuma outra agência de Manaus
                                estava fazendo: os resultados de restaurante vinham{' '}
                                <span className="text-[#F5F1E8] font-medium">mais rápido</span>,{' '}
                                <span className="text-[#F5F1E8] font-medium">mais claros</span> e{' '}
                                <span className="text-[#F5F1E8] font-medium">mais mensuráveis</span> do que qualquer outro nicho.
                            </p>
                            <p>
                                O prato tem apelo visual imediato. O ambiente conta uma história. A experiência gera emoção.
                                E quando você combina isso com tráfego pago inteligente, audiovisual profissional e um sistema
                                de atendimento que não deixa nenhum lead escapar — o resultado aparece{' '}
                                <span className="text-[#E8C088] italic">no faturamento</span>, não só no dashboard.
                            </p>
                            <p className="text-[#F5F1E8] font-medium">
                                A partir daí, a decisão foi simples: é aqui que vamos ser referência.
                            </p>
                        </div>

                        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-[#D4A574]/10 to-transparent border border-[#D4A574]/20">
                            <p className="font-serif italic text-[#E8C088] leading-relaxed">
                                Hoje a ER é a única agência de Manaus que entrega tráfego, audiovisual mensal e
                                rastreamento de conversão em um único pacote — desenhado especificamente para restaurantes.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
