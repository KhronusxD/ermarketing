import React, { useEffect, useRef, useState } from 'react';

// Showcase of reels produced by ER in-house — videos hosted on the same
// R2 bucket used by /restaurantes-manaus. Lazy-loaded: the <video> src
// only attaches once the card is within 300px of the viewport, so the
// page doesn't pay the cost of nine HLS metadata roundtrips on load.

interface Reel {
    src: string;
    title: string;
    client: string;
    poster: string;
}

// Source of truth duplicates the Manaus shared list intentionally — the
// main LP can evolve its showcase order without touching the Manaus LP.
const REELS: ReadonlyArray<Reel> = [
    {
        client: 'Taychi',
        title: 'Yakisoba',
        src: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/TAYCHI%20-%20YAKISOBA.mov',
        poster: '/video-posters/taychi-yakisoba-sm.jpg',
    },
    {
        client: 'La Pizza Rio',
        title: '5 tipos de fome',
        src: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/PIZZA%20RIO%20-%205%20TIPOS%20DE%20FOME.mov',
        poster: '/video-posters/pizza-1-fome-sm.jpg',
    },
    {
        client: 'Taychi',
        title: 'Montagem de combo',
        src: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/TAYCHI%20-%20MONTAGEM%20COMBO.mov',
        poster: '/video-posters/taychi-combo-sm.jpg',
    },
    {
        client: 'La Pizza Rio',
        title: 'Se quiser vim ver',
        src: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/PIZZA%20RIO%20-%20SE%20QUISER%20VIM%20VER.mov',
        poster: '/video-posters/pizza-2-vim-ver-sm.jpg',
    },
    {
        client: 'Taychi',
        title: 'Como usar o hashi',
        src: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/TAYCHI%20-%20COMO%20USAR%20O%20HASHI.mov',
        poster: '/video-posters/taychi-hashi-sm.jpg',
    },
    {
        client: 'La Pizza Rio',
        title: 'Será? — Trend',
        src: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/PIZZA%20RIO%20-%20SERA%CC%81%20TREND.mov',
        poster: '/video-posters/pizza-3-sera-sm.jpg',
    },
    {
        client: 'Taychi',
        title: 'Trend',
        src: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/TAYCHI%20-%20TREND.mov',
        poster: '/video-posters/taychi-trend-sm.jpg',
    },
    {
        client: 'YUAI',
        title: 'Sushi no copo',
        src: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/YUAI%20-%20SUSHI%20NO%20COPO.mov',
        poster: '/video-posters/yuai-sushi-copo-sm.jpg',
    },
];

const ReelCard: React.FC<{ reel: Reel; index: number }> = ({ reel, index }) => {
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(true);

    // Defer attaching the video src until the card is near the viewport.
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
            { rootMargin: '300px' },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

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

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        const v = videoRef.current;
        if (!v) return;
        v.muted = !v.muted;
        setMuted(v.muted);
    };

    return (
        <div
            ref={wrapRef}
            onClick={togglePlay}
            className="snap-start flex-shrink-0 w-[260px] md:w-[300px] aspect-[9/16] relative bg-er-black border border-white/15 hover:border-er-red transition-colors cursor-pointer group overflow-hidden"
            style={{
                backgroundImage: `url(${reel.poster})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {loaded && (
                <video
                    ref={videoRef}
                    src={reel.src}
                    poster={reel.poster}
                    loop
                    muted={muted}
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            )}

            {/* Bottom gradient + meta */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

            <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-er-red/95 text-white px-2 py-1 text-[10px] tracking-[0.25em] uppercase font-bold">
                Reel
            </div>

            {/* Play/pause overlay */}
            <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                    playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                }`}
            >
                <div className="w-14 h-14 rounded-full border-2 border-white/80 bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:bg-er-red group-hover:border-er-red transition-colors">
                    <span className="text-white text-lg ml-0.5">
                        {playing ? '❚❚' : '▶'}
                    </span>
                </div>
            </div>

            {/* Mute toggle */}
            <button
                type="button"
                onClick={toggleMute}
                className="absolute top-3 right-3 w-8 h-8 bg-black/55 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white text-xs hover:bg-er-red transition-colors"
                aria-label={muted ? 'Ativar som' : 'Silenciar'}
            >
                {muted ? '🔇' : '🔊'}
            </button>

            <div className="absolute bottom-3 left-3 right-3">
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/70 mb-0.5">
                    {String(index + 1).padStart(2, '0')} · {reel.client}
                </p>
                <p className="font-display uppercase text-white text-lg md:text-xl leading-[1] tracking-tight">
                    {reel.title}
                </p>
            </div>
        </div>
    );
};

export const ReelsShowcase: React.FC = () => {
    return (
        <section className="relative bg-er-black text-white overflow-hidden border-y border-white/5">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-10 -left-8 select-none font-display uppercase leading-[0.78] whitespace-nowrap"
                style={{
                    fontSize: 'clamp(180px, 26vw, 420px)',
                    color: 'transparent',
                    WebkitTextStroke: '1.5px rgba(255,255,255,0.06)',
                }}
            >
                reels
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 pt-24 md:pt-32">
                <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16">
                    <div className="col-span-12 md:col-span-8">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                            ◆ Reels produzidos por nós
                        </p>
                        <h2
                            className="font-display uppercase leading-[0.88] tracking-tight"
                            style={{ fontSize: 'clamp(40px, 6.5vw, 96px)' }}
                        >
                            Captação,
                            <br />
                            roteiro,
                            <br />
                            <span className="text-er-red">edição</span>.
                            Tudo
                            <br />
                            feito em casa.
                        </h2>
                    </div>
                    <div className="col-span-12 md:col-span-4 md:pt-12">
                        <p className="text-base md:text-lg text-white/65 leading-relaxed">
                            Equipe audiovisual presencial dentro do negócio do
                            cliente — sem terceirizado, sem template. Cada reel
                            é direção, captura e edição feitas pela ER.
                        </p>
                        <p className="hidden md:block text-xs tracking-[0.2em] uppercase text-white/40 mt-6">
                            Toque pra reproduzir · ative o som no canto
                        </p>
                    </div>
                </div>
            </div>

            {/* Edge-to-edge horizontal reel scroller — native overflow + snap. */}
            <div
                className="relative overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory pb-24 md:pb-32"
                style={{ scrollbarWidth: 'thin' }}
            >
                <div className="flex gap-4 md:gap-5 pl-[max(1.5rem,calc((100vw-1400px)/2+1.5rem))] pr-[max(1.5rem,calc((100vw-1400px)/2+1.5rem))]">
                    {REELS.map((r, i) => (
                        <ReelCard key={r.src} reel={r} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};
