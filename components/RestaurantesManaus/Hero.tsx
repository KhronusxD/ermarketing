import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { SectionProps } from '../../types';
import { GoldButton, SectionLabel, IMAGES } from './shared';

export const Hero: React.FC<SectionProps> = ({ onAuditClick }) => {
    const scrollToCases = () => {
        document.getElementById('cases-manaus')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
            {/* Ambient backdrop */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        background:
                            'radial-gradient(ellipse at 20% 20%, rgba(212,165,116,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(212,165,116,0.08) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(139,111,71,0.05) 0%, #0A0A0F 70%)',
                    }}
                ></div>
                {/* Grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#D4A57408_1px,transparent_1px),linear-gradient(to_bottom,#D4A57408_1px,transparent_1px)] bg-[size:64px_64px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    {/* Left — copy */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="lg:col-span-7"
                    >
                        <SectionLabel className="mb-8">
                            <Sparkles size={12} />
                            Agência especializada em restaurantes &middot; Manaus
                        </SectionLabel>

                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight mb-6 text-[#F5F1E8]">
                            Você já investiu em marketing para o seu restaurante.<br />
                            <span className="italic text-[#E8C088]">E o salão continuou vazio.</span>
                        </h1>

                        <p className="text-lg text-[#A8A196] leading-relaxed mb-3 max-w-2xl">
                            Não foi falta de dinheiro. Foi falta da estratégia certa — e da agência certa.
                        </p>
                        <p className="text-lg text-[#C7BFB1] leading-relaxed mb-10 max-w-2xl">
                            A ER Marketing é especializada em restaurantes. Tráfego pago, conteúdo audiovisual profissional
                            e um sistema que transforma lead em reserva —{' '}
                            <span className="text-[#F5F1E8] font-medium">tudo integrado, tudo com resultado mensurável.</span>
                        </p>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <GoldButton size="lg" onClick={onAuditClick}>
                                Quero ver se meu restaurante se qualifica
                                <ArrowRight size={18} />
                            </GoldButton>
                            <GoldButton size="lg" variant="outline" onClick={scrollToCases}>
                                <Play size={14} className="fill-current" />
                                Ver o que fizemos pelo Taychi e La Pizza Rio
                            </GoldButton>
                        </div>
                    </motion.div>

                    {/* Right — visual collage */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                        className="lg:col-span-5 relative h-[500px] md:h-[600px]"
                    >
                        {/* Main video-style card */}
                        <div className="absolute top-0 right-0 w-[85%] h-[70%] rounded-3xl overflow-hidden border border-[#D4A574]/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]">
                            <img
                                src={IMAGES.steak}
                                alt="Prato premium"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            {/* Play button overlay */}
                            <button className="absolute inset-0 flex items-center justify-center group">
                                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-[#D4A574]/90 group-hover:border-[#D4A574] transition-all duration-300">
                                    <Play size={22} className="text-white fill-current ml-1 group-hover:text-[#1A1208]" />
                                </div>
                            </button>
                            <div className="absolute bottom-4 left-4 text-xs text-white/80 font-medium tracking-wider uppercase backdrop-blur-sm bg-black/30 px-3 py-1.5 rounded-full border border-white/10">
                                Bastidores &middot; ER Marketing
                            </div>
                        </div>

                        {/* Overlapping thumbnail — sushi */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute bottom-0 left-0 w-[55%] h-[45%] rounded-2xl overflow-hidden border border-[#D4A574]/30 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)]"
                        >
                            <img src={IMAGES.sushi_rolls} alt="Sushi" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                            <div className="absolute bottom-3 left-3">
                                <div className="text-[10px] text-[#E8C088] font-semibold tracking-widest uppercase">Cliente</div>
                                <div className="text-sm text-white font-serif italic">Taychi Sushi Bar</div>
                            </div>
                        </motion.div>

                        {/* Floating stats pill */}
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                            className="absolute top-[55%] right-[-5%] bg-gradient-to-br from-[#1a1510] to-[#0f0c08] border border-[#D4A574]/40 rounded-2xl px-5 py-3 backdrop-blur-xl shadow-[0_15px_40px_-10px_rgba(212,165,116,0.3)]"
                        >
                            <div className="text-[10px] text-[#A8A196] uppercase tracking-widest mb-1">Reservas</div>
                            <div className="font-serif text-2xl font-bold text-[#E8C088]">+340%</div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Bottom proof strip */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
                >
                    {[
                        { v: '+340%', l: 'Aumento médio em reservas' },
                        { v: 'R$ 13,52', l: 'Custo por lead qualificado' },
                        { v: '12+', l: 'Restaurantes atendidos' },
                        { v: '3x', l: 'Retorno médio sobre ads' },
                    ].map((s, i) => (
                        <div key={i} className="bg-[#0A0A0F] p-6 text-center">
                            <div className="font-serif text-2xl md:text-3xl font-bold text-[#E8C088] mb-1">{s.v}</div>
                            <div className="text-[11px] text-[#A8A196] uppercase tracking-widest">{s.l}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
