import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Quote, TrendingUp } from 'lucide-react';
import { SectionProps } from '../../types';
import { GoldButton, SectionLabel, IMAGES } from './shared';

const cases = [
    {
        name: 'Taychi Sushi Bar',
        location: 'Manaus',
        hero: IMAGES.sushi_hero,
        gallery: [IMAGES.sushi_rolls, IMAGES.dark_bar, IMAGES.food_closeup],
        problem:
            'O Taychi chegou com salão cheio no fim de semana e movimento fraco na semana. Sem sistema de captação ativo, dependia completamente de indicação.',
        stats: [
            { label: 'Faturamento mensal', value: '+280%' },
            { label: 'Custo por lead qualificado', value: 'R$ 11,80' },
            { label: 'Receita adicional em 90 dias', value: '+R$ 38.000' },
        ],
        quote: 'Houveram dias em que o sushi bar tinha fila de espera no fim de semana. Algo que nunca tinha acontecido antes.',
        author: 'Proprietário, Taychi Sushi Bar',
    },
    {
        name: 'La Pizza Rio',
        location: 'Manaus',
        hero: IMAGES.pizza,
        gallery: [IMAGES.pizza_oven, IMAGES.chef_cooking, IMAGES.ambience],
        problem:
            'A La Pizza Rio queria crescer no delivery sem depender do iFood — construir uma base de clientes própria com margem maior.',
        stats: [
            { label: 'Pedidos diretos via WhatsApp', value: '+190%' },
            { label: 'Custo por lead', value: 'R$ 9,40' },
            { label: 'Receita adicional mensal', value: '+R$ 24.000' },
        ],
        quote: 'Em dois meses, já vimos o faturamento aumentando de 10 a 15 mil reais a mais todos os meses…',
        author: 'Proprietário, La Pizza Rio',
    },
];

export const Cases: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section id="cases-manaus" className="py-24 md:py-32 relative">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 md:mb-20"
                >
                    <SectionLabel className="mb-6">
                        <TrendingUp size={12} />
                        Resultado real em Manaus
                    </SectionLabel>
                    <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold text-[#F5F1E8] tracking-tight leading-[1.05]">
                        Não acredite na gente.<br />
                        <span className="italic text-[#E8C088]">Acredite nos números.</span>
                    </h2>
                </motion.div>

                {/* Cases */}
                <div className="space-y-16 md:space-y-24">
                    {cases.map((c, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9 }}
                            className="grid lg:grid-cols-12 gap-8 items-center"
                        >
                            {/* Gallery */}
                            <div className={`lg:col-span-6 relative h-[480px] md:h-[560px] ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                                {/* Main hero image */}
                                <div className="absolute inset-0 rounded-3xl overflow-hidden border border-[#D4A574]/20 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)]">
                                    <img src={c.hero} alt={c.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                    <div className="absolute top-5 left-5 flex items-center gap-2">
                                        <span className="text-[10px] text-[#E8C088] font-semibold tracking-[0.3em] uppercase backdrop-blur-md bg-black/40 border border-[#D4A574]/30 px-3 py-1.5 rounded-full">
                                            {c.location}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-6 left-6">
                                        <h3 className="font-serif text-4xl md:text-5xl text-white">{c.name}</h3>
                                    </div>
                                </div>

                                {/* Thumbnail strip */}
                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/60 backdrop-blur-xl border border-[#D4A574]/20 p-2 rounded-full">
                                    {c.gallery.map((src, j) => (
                                        <div
                                            key={j}
                                            className="w-14 h-14 rounded-full overflow-hidden border border-[#D4A574]/30 hover:border-[#D4A574] cursor-pointer transition-all hover:scale-110"
                                        >
                                            <img src={src} alt="" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Content */}
                            <div className={`lg:col-span-6 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                                <p className="text-[#C7BFB1] leading-relaxed mb-8 text-lg">{c.problem}</p>

                                {/* Stats */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                                    {c.stats.map((s, j) => (
                                        <div
                                            key={j}
                                            className="rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-xl border border-white/10 p-5"
                                        >
                                            <div className="font-serif text-2xl md:text-3xl font-bold text-[#E8C088] mb-1">
                                                {s.value}
                                            </div>
                                            <div className="text-[11px] text-[#A8A196] uppercase tracking-widest leading-tight">
                                                {s.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Quote */}
                                <div className="relative p-6 rounded-2xl bg-gradient-to-br from-[#1a1510] to-[#0f0c08] border border-[#D4A574]/20">
                                    <Quote
                                        size={28}
                                        className="absolute -top-3 -left-2 text-[#D4A574] fill-[#D4A574]"
                                    />
                                    <p className="font-serif italic text-[#F5F1E8] leading-relaxed mb-3">"{c.quote}"</p>
                                    <p className="text-xs text-[#A8A196] font-semibold tracking-wide uppercase">
                                        — {c.author}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mt-20"
                >
                    <GoldButton size="lg" onClick={onAuditClick}>
                        Quero resultado assim — ver se meu restaurante se qualifica
                        <ArrowRight size={18} />
                    </GoldButton>
                </motion.div>
            </div>
        </section>
    );
};
