import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Sparkles } from 'lucide-react';
import { SectionLabel, UnderwaterBackdrop } from './shared';
import { POSTS, VIDEO_CREATIVES } from './assets';

// ————————————————————————————————————————————————————————————————
// Post marquee — infinite horizontal scroll, single row
// ————————————————————————————————————————————————————————————————
const PostMarquee: React.FC<{ reverse?: boolean }> = ({ reverse = false }) => {
    // Duplicate posts for seamless loop
    const items = [...POSTS, ...POSTS];
    return (
        <div className="relative w-full overflow-hidden">
            <div
                className={`flex gap-4 w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
                style={{ willChange: 'transform' }}
            >
                {items.map((post, i) => (
                    <div
                        key={`${post.src}-${i}`}
                        className="shrink-0 w-[180px] md:w-[220px] aspect-[4/5] rounded-2xl overflow-hidden border border-[#4DD5FF]/15 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] bg-[#0A1628] group"
                    >
                        <img
                            src={post.src}
                            alt={post.label}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                ))}
            </div>
            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#050510] to-transparent pointer-events-none z-10"></div>
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#050510] to-transparent pointer-events-none z-10"></div>
        </div>
    );
};

// ————————————————————————————————————————————————————————————————
// Video creative card — phone-like vertical with lazy loading
// ————————————————————————————————————————————————————————————————
interface VideoCardProps {
    video: typeof VIDEO_CREATIVES[number];
    delay?: number;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, delay = 0 }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [inView, setInView] = useState(false);
    const [playing, setPlaying] = useState(true);

    useEffect(() => {
        const el = containerRef.current;
        if (!el || typeof IntersectionObserver === 'undefined') return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    io.disconnect();
                }
            },
            { rootMargin: '300px' }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const toggle = () => {
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

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay }}
            className="relative group"
        >
            <div
                className="relative aspect-[9/16] rounded-3xl overflow-hidden border border-[#4DD5FF]/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] bg-center bg-cover bg-[#050510]"
                style={{ backgroundImage: `url(${video.poster})` }}
            >
                {inView && (
                    <video
                        ref={videoRef}
                        src={video.src}
                        poster={video.poster}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>
                <button
                    onClick={toggle}
                    aria-label={playing ? 'Pausar' : 'Reproduzir'}
                    className="absolute inset-0 flex items-center justify-center group/btn"
                >
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                        {playing ? (
                            <Pause size={22} className="text-white fill-current" />
                        ) : (
                            <Play size={22} className="text-white fill-current ml-1" />
                        )}
                    </div>
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-[10px] text-[#A6DEFF] font-semibold tracking-[0.25em] uppercase mb-1">
                        {video.kind}
                    </div>
                    <div className="text-white font-serif text-lg leading-tight">{video.title}</div>
                    <div className="text-[11px] text-white/70 tracking-wide mt-0.5">{video.client}</div>
                </div>
            </div>
        </motion.div>
    );
};

// ————————————————————————————————————————————————————————————————
// Main section
// ————————————————————————————————————————————————————————————————
export const CreativeShowcase: React.FC = () => (
    <section className="relative py-24 md:py-32 overflow-hidden">
        <UnderwaterBackdrop variant="mid" />

        <div className="relative z-10 max-w-7xl mx-auto">
            <div className="text-center mb-14 px-6">
                <SectionLabel className="mb-6 mx-auto">
                    <Sparkles size={10} />
                    O que entra todo mês
                </SectionLabel>
                <h2 className="font-serif text-3xl md:text-5xl font-semibold text-[#E8F4FF] tracking-tight leading-[1.05] mb-4">
                    Criativos profissionais,{' '}
                    <span className="italic text-[#A6DEFF]">produzidos pela nossa equipe.</span>
                </h2>
                <p className="text-[#B8CEE4] text-base md:text-lg max-w-2xl mx-auto">
                    Arte, vídeo, copy e direção. Tudo alinhado à identidade da sua marca — e testado pra vender,
                    não pra impressionar o portfólio.
                </p>
            </div>

            {/* Posts marquee */}
            <PostMarquee />

            {/* Videos */}
            <div className="px-6 mt-20">
                <div className="text-center mb-10">
                    <div className="text-[11px] tracking-[0.3em] uppercase text-[#4DD5FF] font-semibold mb-3">
                        Criativos em vídeo
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl text-[#E8F4FF] leading-tight max-w-xl mx-auto">
                        Vídeos que fazem o cliente <span className="italic text-[#A6DEFF]">sentir o produto.</span>
                    </h3>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
                    {VIDEO_CREATIVES.map((v, i) => (
                        <VideoCard key={v.src} video={v} delay={i * 0.12} />
                    ))}
                </div>
            </div>
        </div>
    </section>
);
