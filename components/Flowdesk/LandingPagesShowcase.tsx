import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { SectionLabel, UnderwaterBackdrop } from './shared';
import { LPS } from './assets';

export const LandingPagesShowcase: React.FC = () => (
    <section className="relative py-24 md:py-32 overflow-hidden">
        <UnderwaterBackdrop variant="mid" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
                <SectionLabel className="mb-6 mx-auto">
                    <Globe size={10} />
                    Landing pages
                </SectionLabel>
                <h2 className="font-serif text-3xl md:text-5xl font-semibold text-[#E8F4FF] tracking-tight leading-[1.05] mb-4">
                    Páginas que <span className="italic text-[#A6DEFF]">convertem visita em venda.</span>
                </h2>
                <p className="text-[#B8CEE4] text-base md:text-lg max-w-2xl mx-auto">
                    Estruturamos landing pages específicas pro seu funil — com tráfego e criativo integrados pra
                    que cada real anunciado tenha destino certo.
                </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {LPS.map((lp, i) => (
                    <motion.div
                        key={lp.src}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
                        className="group relative"
                    >
                        <div className="relative aspect-[3/2] rounded-2xl overflow-hidden border border-[#4DD5FF]/20 bg-[#0A1628] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)]">
                            <img
                                src={lp.src}
                                alt={lp.label}
                                loading="lazy"
                                className="w-full h-full object-cover object-top group-hover:scale-[1.04] group-hover:brightness-110 transition-all duration-700"
                            />
                            {/* Blue tint overlay to match palette */}
                            <div className="absolute inset-0 bg-[#0A1628]/20 mix-blend-multiply pointer-events-none"></div>
                            {/* Bottom gradient + label */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#050510] via-[#050510]/60 to-transparent pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                <div className="text-[10px] tracking-[0.3em] uppercase text-[#A6DEFF] font-semibold mb-1">
                                    {lp.tag}
                                </div>
                                <div className="font-serif text-xl text-[#E8F4FF] leading-tight">{lp.label}</div>
                            </div>
                            {/* Top light beam */}
                            <div
                                className="absolute top-0 left-0 right-0 h-24 opacity-40 pointer-events-none"
                                style={{
                                    background:
                                        'radial-gradient(ellipse at top, rgba(77,213,255,0.25) 0%, transparent 70%)',
                                }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);
