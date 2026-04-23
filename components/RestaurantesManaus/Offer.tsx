import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Video, Instagram, BarChart3, FileText } from 'lucide-react';
import { SectionProps } from '../../types';
import { GoldButton, SectionLabel, PHOTOS } from './shared';

const services = [
    {
        icon: Target,
        title: 'Tráfego pago com foco em reservas e delivery',
        desc: 'Meta Ads e Google Ads criados para restaurante — não para clique vazio. Cada real rastreado e reportado.',
    },
    {
        icon: Video,
        title: 'Captação audiovisual profissional mensal',
        desc: '1 dia de gravação no seu restaurante todo mês. Vídeos e fotos que fazem o cliente sentir o cheiro do prato pela tela.',
    },
    {
        icon: Instagram,
        title: 'Social media completo',
        desc: 'Feed, stories e gestão de comentários com estratégia editorial definida e identidade visual consistente.',
    },
    {
        icon: BarChart3,
        title: 'Rastreamento de conversão',
        desc: 'Cada reserva, cada pedido, cada clique rastreado. Você sabe exatamente de onde veio cada cliente.',
    },
    {
        icon: FileText,
        title: 'Relatório mensal de resultado',
        desc: 'Leads gerados, custo por lead, reservas convertidas, ROI. Sem métrica de vaidade — só o que importa.',
    },
];

export const Offer: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="py-24 md:py-32 relative">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 md:mb-20"
                >
                    <SectionLabel className="mb-6">O pacote</SectionLabel>
                    <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold text-[#F5F1E8] tracking-tight leading-[1.05] mb-6">
                        Tudo que seu restaurante precisa para crescer.<br />
                        <span className="italic text-[#E8C088]">Em um único parceiro.</span>
                    </h2>
                    <p className="text-[#A8A196] text-lg max-w-3xl mx-auto leading-relaxed">
                        Enquanto a maioria das agências vende peça separada — social media por um lado, tráfego por outro,
                        audiovisual por um terceiro — na ER você tem tudo integrado com um time que trabalha com um
                        único objetivo: <span className="text-[#F5F1E8]">encher o seu salão</span>.
                    </p>
                </motion.div>

                {/* Services grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
                    {services.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.08 }}
                            className={`relative rounded-3xl p-8 bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-xl border border-white/10 hover:border-[#D4A574]/30 transition-all duration-500 group overflow-hidden ${
                                i === 0 || i === 3 ? 'lg:row-span-1' : ''
                            }`}
                        >
                            {/* Gold accent on hover */}
                            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4A574] to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>

                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4A574]/20 to-transparent border border-[#D4A574]/30 flex items-center justify-center mb-5 group-hover:border-[#D4A574]/60 transition-colors">
                                <s.icon size={22} className="text-[#E8C088]" />
                            </div>

                            <h3 className="font-serif text-xl text-[#F5F1E8] mb-3 leading-tight">{s.title}</h3>
                            <p className="text-[#A8A196] text-sm leading-relaxed">{s.desc}</p>
                        </motion.div>
                    ))}

                    {/* BTS visual card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="relative rounded-3xl overflow-hidden border border-[#D4A574]/30 min-h-[300px] group"
                    >
                        <img src={PHOTOS.taychi[3]} alt="Bastidores Taychi" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"></div>
                        <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                            <div className="text-[10px] text-[#E8C088] font-semibold tracking-[0.3em] uppercase mb-2">
                                Captação no seu restaurante
                            </div>
                            <p className="font-serif text-xl text-white italic">
                                "Um time que trabalha<br />com um único objetivo."
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* CTA card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative rounded-3xl overflow-hidden max-w-3xl mx-auto"
                >
                    <div
                        className="relative p-10 md:p-14 text-center"
                        style={{
                            background:
                                'radial-gradient(ellipse at center, rgba(212,165,116,0.12) 0%, rgba(15,12,8,1) 70%)',
                        }}
                    >
                        {/* Animated gold border */}
                        <div
                            className="absolute inset-0 rounded-3xl p-px opacity-80"
                            style={{
                                background:
                                    'linear-gradient(110deg, #D4A574 0%, transparent 30%, transparent 70%, #D4A574 100%)',
                                backgroundSize: '300% 100%',
                                animation: 'gradient-shift 6s ease infinite',
                            }}
                        >
                            <div className="absolute inset-[1px] rounded-3xl bg-[#111112]"></div>
                        </div>

                        <div className="relative z-10">
                            <div className="text-xs text-[#E8C088] uppercase tracking-[0.3em] mb-3 font-semibold">
                                Pronto pra começar
                            </div>
                            <h3 className="font-serif text-3xl md:text-4xl text-[#F5F1E8] mb-4 tracking-tight leading-tight">
                                Um time. Um objetivo.<br />
                                <span className="italic text-[#E8C088]">Encher o seu salão.</span>
                            </h3>
                            <p className="text-[#A8A196] text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-8">
                                Chame a gente no WhatsApp. Em uma conversa curta a gente entende o seu restaurante e
                                monta o pacote que faz sentido pro seu momento — sem surpresa no bolso.
                            </p>

                            <GoldButton size="lg" onClick={onAuditClick}>
                                Quero esse resultado — chamar no WhatsApp
                                <ArrowRight size={18} />
                            </GoldButton>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
