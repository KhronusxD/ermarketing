import React, { useRef, useState } from 'react';
import { ArrowRight, Play, Pause, Sparkles } from 'lucide-react';
import { SectionProps } from '../../types';
import { GoldButton, SectionLabel, PHOTOS, VIDEOS, Photo } from './shared';

export const Hero: React.FC<SectionProps> = ({ onAuditClick }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [playing, setPlaying] = useState(true);

    const togglePlay = () => {
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) {
            v.play();
            setPlaying(true);
        } else {
            v.pause();
            setPlaying(false);
        }
    };

    const scrollToCases = () => {
        document.getElementById('cases-manaus')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-[#111112]">
            {/* Ambient gold wash + dark gradient backdrop (replaces the previous BG
                video — video was costing ~MB of bandwidth and blocking FCP/LCP). */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background:
                        'radial-gradient(ellipse at 20% 20%, rgba(212,165,116,0.22) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(212,165,116,0.14) 0%, transparent 55%), linear-gradient(180deg, #1a1510 0%, #111112 60%, #0a0a0c 100%)',
                }}
            />

            {/* Ambient gold wash + grid overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-50"
                    style={{
                        background:
                            'radial-gradient(ellipse at 20% 20%, rgba(212,165,116,0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(212,165,116,0.10) 0%, transparent 55%)',
                    }}
                ></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#D4A57408_1px,transparent_1px),linear-gradient(to_bottom,#D4A57408_1px,transparent_1px)] bg-[size:64px_64px] opacity-60"></div>
            </div>

            {/* Bottom fade — blends video into page bg for seamless transition */}
            <div
                className="absolute bottom-0 left-0 right-0 h-40 md:h-56 z-[5] pointer-events-none"
                style={{
                    background:
                        'linear-gradient(to top, #111112 0%, rgba(17,17,18,0.85) 35%, rgba(17,17,18,0.45) 70%, transparent 100%)',
                }}
            ></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    {/* Left — copy. The `animate-hero-rise` entry animation was
                        removed from this column because it starts at opacity:0 and
                        runs 800 ms — the H1 (LCP element on mobile) only counts as
                        "visible" to Lighthouse after the animation finishes, so it
                        was capping LCP at ~2.5 s no matter how fast the bytes
                        arrived. Animation kept on the desktop collage and other
                        decorative elements where it doesn't gate the LCP. */}
                    <div className="lg:col-span-7">
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

                        <div className="flex flex-col sm:flex-row items-start sm:items-start gap-4">
                            <div className="inline-flex flex-col items-start gap-1.5">
                                <GoldButton size="lg" onClick={onAuditClick}>
                                    Quero ver se meu restaurante se qualifica
                                    <ArrowRight size={18} />
                                </GoldButton>
                                <span className="text-[10px] text-[#A8A196]/90 tracking-wide font-medium">
                                    Fale com a equipe pelo WhatsApp
                                </span>
                            </div>
                            <GoldButton size="lg" variant="outline" onClick={scrollToCases}>
                                <Play size={14} className="fill-current" />
                                Ver o que fizemos pelo Taychi e La Pizza Rio
                            </GoldButton>
                        </div>
                    </div>

                    {/* Right — visual collage (desktop only). On mobile this column
                        was costing real LCP — the AVIF poster of the <video> was
                        Lighthouse's LCP element, the pizza <picture> was a second
                        contended fetch, and stacking the right column below the H1
                        pushed total content past 1300 px. We render a single small
                        static AVIF below the text on mobile (see <picture> further
                        down with `lg:hidden`) and keep the full collage from `lg`
                        upward where the layout is side-by-side and the visuals are
                        actually in the initial viewport. */}
                    <div className="hidden lg:block lg:col-span-5 relative h-[500px] md:h-[600px] motion-safe:animate-hero-pop">
                        {/* Main video card — real Taychi Yakisoba reel.
                            Poster shows instantly; the video itself is only fetched
                            when the browser decides it's time (autoplay kick), not eagerly. */}
                        <div className="absolute top-0 right-0 w-[85%] h-[70%] rounded-3xl overflow-hidden border border-[#D4A574]/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]">
                            <video
                                ref={videoRef}
                                src={VIDEOS.hero.src}
                                poster={VIDEOS.hero.poster}
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="metadata"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                            <button
                                onClick={togglePlay}
                                className="absolute inset-0 flex items-center justify-center group"
                                aria-label={playing ? 'Pausar' : 'Reproduzir'}
                            >
                                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-[#D4A574]/90 group-hover:border-[#D4A574] transition-all duration-300 opacity-0 group-hover:opacity-100">
                                    {playing ? (
                                        <Pause size={22} className="text-white fill-current group-hover:text-[#1A1208]" />
                                    ) : (
                                        <Play size={22} className="text-white fill-current ml-1 group-hover:text-[#1A1208]" />
                                    )}
                                </div>
                            </button>
                            <div className="absolute bottom-4 left-4 text-xs text-white/80 font-medium tracking-wider uppercase backdrop-blur-sm bg-black/30 px-3 py-1.5 rounded-full border border-white/10">
                                Bastidores &middot; Taychi Sushi Bar
                            </div>
                        </div>

                        {/* Overlapping thumbnail — real Pizza photo */}
                        <div className="absolute bottom-0 left-0 w-[55%] h-[45%] rounded-2xl overflow-hidden border border-[#D4A574]/30 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] motion-safe:animate-hero-float-a">
                            <Photo
                                src={PHOTOS.pizza[0]}
                                alt="La Pizza Rio"
                                width={480}
                                height={600}
                                fetchPriority="high"
                                decoding="async"
                                desktopOnly
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                            <div className="absolute bottom-3 left-3">
                                <div className="text-[10px] text-[#E8C088] font-semibold tracking-widest uppercase">Cliente</div>
                                <div className="text-sm text-white font-serif italic">La Pizza Rio</div>
                            </div>
                        </div>

                        {/* Floating stats pill */}
                        <div className="absolute top-[55%] right-[-5%] bg-gradient-to-br from-[#1a1510] to-[#0f0c08] border border-[#D4A574]/40 rounded-2xl px-5 py-3 backdrop-blur-xl shadow-[0_15px_40px_-10px_rgba(212,165,116,0.3)] motion-safe:animate-hero-float-b">
                            <div className="text-[10px] text-[#A8A196] uppercase tracking-widest mb-1">Reservas</div>
                            <div className="font-serif text-2xl font-bold text-[#E8C088]">+340%</div>
                        </div>
                    </div>

                    {/* No mobile visual in the hero anymore — the previous lg:hidden
                        AVIF kept turning up as the LCP element on Lighthouse mobile
                        even with loading="lazy" (the lazy fetch and decode delay
                        landed AFTER the H1 paint and pushed LCP from ~2 s to >4 s).
                        Mobile hero is now copy-only: section label, H1, paragraphs,
                        CTAs, and the proof strip below. The Taychi/Pizza visuals
                        return as the full collage from `lg` upward. */}
                </div>

                {/* Bottom proof strip — animation also removed (same reason as the
                    left column above; on desktop the strip is well within the
                    initial viewport and was a secondary LCP candidate while it
                    sat at opacity:0 during its 800 ms entry animation). */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                    {[
                        { v: '+340%', l: 'Aumento médio em reservas' },
                        { v: '12+', l: 'Restaurantes atendidos' },
                        { v: '3x', l: 'Retorno médio sobre ads' },
                        { v: '60d', l: 'Pra ver fila no fim de semana' },
                    ].map((s, i) => (
                        <div key={i} className="bg-[#111112] p-6 text-center">
                            <div className="font-serif text-2xl md:text-3xl font-bold text-[#E8C088] mb-1">{s.v}</div>
                            <div className="text-[11px] text-[#A8A196] uppercase tracking-widest">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
