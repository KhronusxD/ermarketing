import React from 'react';
import { motion } from 'framer-motion';
import { PHOTOS, SectionLabel } from './shared';

interface GalleryProps {
    withHeader?: boolean;
    speed?: 'slow' | 'normal' | 'fast';
    reverse?: boolean;
}

export const Gallery: React.FC<GalleryProps> = ({ withHeader = false, speed = 'normal', reverse = false }) => {
    const photos = PHOTOS.all;
    // Duplicate the list so the marquee loop is seamless
    const loop = [...photos, ...photos];

    const animClass = reverse
        ? speed === 'slow' ? 'animate-[marquee-reverse_70s_linear_infinite]' : speed === 'fast' ? 'animate-[marquee-reverse_35s_linear_infinite]' : 'animate-marquee-reverse'
        : speed === 'slow' ? 'animate-[marquee_70s_linear_infinite]' : speed === 'fast' ? 'animate-[marquee_35s_linear_infinite]' : 'animate-marquee';

    return (
        <section className="relative py-16 md:py-20 overflow-hidden">
            {withHeader && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-7xl mx-auto px-6 text-center mb-10"
                >
                    <SectionLabel className="mb-5">Bastidores da produção</SectionLabel>
                    <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#F5F1E8] tracking-tight">
                        Conteúdo que <span className="italic text-[#E8C088]">vende</span> — captado por nós.
                    </h2>
                    <p className="mt-3 text-[#A8A196] max-w-xl mx-auto">
                        Fotos e vídeos que produzimos dentro dos nossos restaurantes parceiros.
                    </p>
                </motion.div>
            )}

            {/* Gradient fade edges */}
            <div className="relative">
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-r from-[#0A0A0F] to-transparent"></div>
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-l from-[#0A0A0F] to-transparent"></div>

                <div className="flex overflow-hidden">
                    <div className={`flex gap-5 shrink-0 ${animClass}`} style={{ willChange: 'transform' }}>
                        {loop.map((src, i) => (
                            <div
                                key={i}
                                className="relative w-[240px] md:w-[300px] h-[300px] md:h-[380px] rounded-2xl overflow-hidden border border-[#D4A574]/15 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] shrink-0 group"
                            >
                                <img
                                    src={src}
                                    alt=""
                                    loading="lazy"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
