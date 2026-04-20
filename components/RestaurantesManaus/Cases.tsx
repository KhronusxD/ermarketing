import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Quote, TrendingUp, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { SectionProps } from '../../types';
import { GoldButton, SectionLabel, PHOTOS, VIDEOS } from './shared';

interface VideoItem {
    src: string;
    title: string;
    poster?: string;
}

const VideoCard: React.FC<{ video: VideoItem; aspect?: string }> = ({ video, aspect = 'aspect-[9/16]' }) => {
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const ref = useRef<HTMLVideoElement | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(true);

    // Lazy-load: only attach src when card scrolls within ~300px of viewport
    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setLoaded(true);
                        io.disconnect();
                    }
                });
            },
            { rootMargin: '300px' }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const toggle = () => {
        const v = ref.current;
        if (!v) return;
        if (v.paused) {
            v.play();
            setPlaying(true);
        } else {
            v.pause();
            setPlaying(false);
        }
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        const v = ref.current;
        if (!v) return;
        v.muted = !v.muted;
        setMuted(v.muted);
    };

    return (
        <div
            ref={wrapRef}
            onClick={toggle}
            className={`relative ${aspect} rounded-2xl overflow-hidden border border-[#D4A574]/20 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.7)] cursor-pointer group bg-black`}
            style={video.poster ? { backgroundImage: `url(${video.poster})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
        >
            {loaded && (
                <video
                    ref={ref}
                    src={video.src}
                    poster={video.poster}
                    loop
                    muted={muted}
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>
            {/* Play/pause overlay */}
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-[#D4A574]/90 group-hover:border-[#D4A574] transition-all duration-300">
                    {playing ? (
                        <Pause size={20} className="text-white fill-current group-hover:text-[#1A1208]" />
                    ) : (
                        <Play size={20} className="text-white fill-current ml-0.5 group-hover:text-[#1A1208]" />
                    )}
                </div>
            </div>
            {/* Mute toggle */}
            <button
                onClick={toggleMute}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#D4A574]/80 hover:text-[#1A1208] text-white transition-all"
                aria-label={muted ? 'Ativar som' : 'Silenciar'}
            >
                {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            {/* Title */}
            <div className="absolute bottom-3 left-3 right-3">
                <div className="text-[10px] text-[#E8C088] font-semibold tracking-widest uppercase mb-0.5">Reel</div>
                <div className="text-sm text-white font-serif italic leading-tight">{video.title}</div>
            </div>
        </div>
    );
};

const cases = [
    {
        name: 'Taychi Sushi Bar',
        location: 'Manaus',
        hero: PHOTOS.taychi[0],
        gallery: [PHOTOS.taychi[1], PHOTOS.taychi[2], PHOTOS.taychi[3]],
        videos: VIDEOS.taychi,
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
        hero: PHOTOS.pizza[0],
        gallery: [PHOTOS.pizza[1], PHOTOS.pizza[2], PHOTOS.pizza[3]],
        videos: [...VIDEOS.pizza, ...VIDEOS.other],
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
                    <p className="mt-5 text-[#A8A196] max-w-2xl mx-auto">
                        Fotos, vídeos e edições — tudo produzido pela nossa equipe dentro dos restaurantes parceiros.
                    </p>
                </motion.div>

                {/* Cases */}
                <div className="space-y-20 md:space-y-28">
                    {cases.map((c, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9 }}
                            className="space-y-10"
                        >
                            <div className="grid lg:grid-cols-12 gap-8 items-center">
                                {/* Gallery */}
                                <div className={`lg:col-span-6 relative h-[480px] md:h-[560px] ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
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
                            </div>

                            {/* Video reel for this case */}
                            <div>
                                <div className="flex items-end justify-between mb-5 px-1">
                                    <div>
                                        <div className="text-[11px] text-[#D4A574] font-semibold tracking-[0.3em] uppercase mb-1">
                                            Reels produzidos por nós
                                        </div>
                                        <div className="font-serif text-xl md:text-2xl text-[#F5F1E8]">
                                            Captação + edição para <span className="italic text-[#E8C088]">{c.name}</span>
                                        </div>
                                    </div>
                                    <div className="hidden md:block text-xs text-[#A8A196] tracking-wider">
                                        Clique para reproduzir &middot; ative o som
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {c.videos.map((v, j) => (
                                        <VideoCard key={j} video={v} />
                                    ))}
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
