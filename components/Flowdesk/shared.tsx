import React from 'react';

// ——————————————————————————————————————————————————————————
// Palette — deep ocean
export const OCEAN = {
    bg: '#050510',
    bgDeep: '#030309',
    panel: '#0A1628',
    accent: '#4DD5FF',     // bioluminescent cyan
    accentSoft: '#7FC4FF',
    glow: '#A6DEFF',
    textPrimary: '#E8F4FF',
    textSoft: '#B8CEE4',
    textMute: '#6B86A3',
};

// ——————————————————————————————————————————————————————————
// Ocean button — cyan gradient equivalent to the gold button
interface OceanButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'primary' | 'outline';
}

export const OceanButton: React.FC<OceanButtonProps> = ({
    children,
    size = 'md',
    variant = 'primary',
    className = '',
    ...props
}) => {
    const sizes = {
        sm: 'px-5 py-2.5 text-sm',
        md: 'px-7 py-3.5 text-sm',
        lg: 'px-8 py-4 text-base',
    };

    if (variant === 'outline') {
        return (
            <button
                className={`inline-flex items-center justify-center gap-2 ${sizes[size]} font-semibold rounded-full border border-[#4DD5FF]/30 bg-white/5 backdrop-blur-sm text-[#A6DEFF] hover:bg-white/10 hover:border-[#4DD5FF]/70 hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 tracking-wide ${className}`}
                {...props}
            >
                {children}
            </button>
        );
    }

    return (
        <button
            className={`relative inline-flex items-center justify-center gap-2 ${sizes[size]} font-semibold rounded-full text-[#031224] tracking-wide overflow-hidden group transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_10px_30px_-5px_rgba(77,213,255,0.55)] active:translate-y-0 ${className}`}
            style={{
                background:
                    'linear-gradient(90deg, #2BA8D4 0%, #4DD5FF 25%, #A6DEFF 50%, #4DD5FF 75%, #2BA8D4 100%)',
                backgroundSize: '200% 100%',
                animation: 'gradient-loop 3.5s linear infinite',
            }}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </button>
    );
};

// ——————————————————————————————————————————————————————————
// Section label — the tiny uppercase pill
export const SectionLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className = '',
}) => (
    <div
        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#4DD5FF]/25 bg-[#4DD5FF]/5 text-[#A6DEFF] text-[10px] md:text-xs font-semibold tracking-[0.3em] uppercase ${className}`}
    >
        {children}
    </div>
);

// ——————————————————————————————————————————————————————————
// Glass card — blue-tinted glassmorphism
interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    hover?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hover = true, ...props }) => (
    <div
        className={`relative rounded-3xl bg-gradient-to-b from-[#4DD5FF]/[0.06] to-white/[0.02] backdrop-blur-xl border border-[#4DD5FF]/15 ${
            hover ? 'hover:border-[#4DD5FF]/35 hover:from-[#4DD5FF]/[0.10] transition-all duration-500' : ''
        } ${className}`}
        {...props}
    >
        {children}
    </div>
);

// ——————————————————————————————————————————————————————————
// Underwater backdrop — pure CSS, no stock photos.
// Light rays from top, deep gradient, floating bioluminescent particles.
export const UnderwaterBackdrop: React.FC<{ variant?: 'hero' | 'mid' | 'reef' }> = ({ variant = 'mid' }) => {
    const rays =
        variant === 'hero'
            ? 'radial-gradient(ellipse 60% 90% at 50% -10%, rgba(166,222,255,0.35) 0%, rgba(77,213,255,0.12) 35%, transparent 70%), radial-gradient(ellipse 100% 70% at 50% -20%, rgba(43,168,212,0.35) 0%, transparent 60%)'
            : variant === 'reef'
            ? 'radial-gradient(ellipse 90% 50% at 50% 110%, rgba(166,222,255,0.22) 0%, rgba(77,213,255,0.10) 40%, transparent 70%), radial-gradient(circle at 20% 90%, rgba(255,138,174,0.18), transparent 40%), radial-gradient(circle at 80% 95%, rgba(136,255,214,0.15), transparent 40%)'
            : 'radial-gradient(ellipse 80% 60% at 50% 10%, rgba(77,213,255,0.18) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 50% 100%, rgba(43,168,212,0.15) 0%, transparent 60%)';

    return (
        <>
            {/* Deep gradient base */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    background:
                        'linear-gradient(180deg, #030309 0%, #061024 35%, #08182E 65%, #050510 100%)',
                }}
            />
            {/* Light rays / bioluminescent wash */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{ background: rays }}
            />
            {/* Caustic grid */}
            <div
                className="absolute inset-0 pointer-events-none z-0 opacity-[0.18] mix-blend-screen"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, rgba(77,213,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(77,213,255,0.08) 1px, transparent 1px)',
                    backgroundSize: '64px 64px',
                    maskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, black, transparent 75%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, black, transparent 75%)',
                }}
            />
            {/* Noise grain */}
            <div
                className="absolute inset-0 pointer-events-none z-0 opacity-[0.06] mix-blend-overlay"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
            />
        </>
    );
};

// ——————————————————————————————————————————————————————————
// Floating bioluminescent orbs — reference's jellyfish/particle vibe
export const BioluminescentOrbs: React.FC<{ count?: number }> = ({ count = 6 }) => {
    const orbs = Array.from({ length: count }, (_, i) => i);
    return (
        <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
            {orbs.map((i) => {
                const size = 60 + ((i * 37) % 120);
                const left = (i * 53 + 7) % 95;
                const top = (i * 29 + 13) % 85;
                const delay = (i * 0.7) % 4;
                const dur = 6 + (i % 4) * 1.5;
                return (
                    <div
                        key={i}
                        className="absolute rounded-full animate-float-slow"
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            left: `${left}%`,
                            top: `${top}%`,
                            background:
                                'radial-gradient(circle, rgba(166,222,255,0.22) 0%, rgba(77,213,255,0.08) 40%, transparent 70%)',
                            filter: 'blur(10px)',
                            animationDelay: `${delay}s`,
                            animationDuration: `${dur}s`,
                        }}
                    />
                );
            })}
        </div>
    );
};
