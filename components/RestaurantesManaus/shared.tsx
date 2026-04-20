import React from 'react';

// Animated gradient button — gold shimmer looping right-to-left
interface GoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'primary' | 'outline';
}

export const GoldButton: React.FC<GoldButtonProps> = ({
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
                className={`inline-flex items-center justify-center gap-2 ${sizes[size]} font-semibold rounded-full border border-[#D4A574]/30 bg-white/5 backdrop-blur-sm text-[#E8C088] hover:bg-white/10 hover:border-[#D4A574]/60 hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 tracking-wide ${className}`}
                {...props}
            >
                {children}
            </button>
        );
    }

    return (
        <button
            className={`relative inline-flex items-center justify-center gap-2 ${sizes[size]} font-semibold rounded-full text-[#1A1208] tracking-wide overflow-hidden group transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_10px_30px_-5px_rgba(212,165,116,0.5)] active:translate-y-0 ${className}`}
            style={{
                background:
                    'linear-gradient(90deg, #B8875B 0%, #D4A574 15%, #F5D89F 30%, #E8C088 45%, #D4A574 60%, #B8875B 80%, #D4A574 100%)',
                backgroundSize: '200% 100%',
                animation: 'gradient-loop 3.5s linear infinite',
            }}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </button>
    );
};

// Glass card wrapper
interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    hover?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
    children,
    className = '',
    hover = true,
    ...props
}) => {
    return (
        <div
            className={`relative rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-xl border border-white/10 ${
                hover ? 'hover:border-[#D4A574]/30 hover:from-white/[0.06] transition-all duration-500' : ''
            } ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

// Section label
export const SectionLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4A574]/25 bg-[#D4A574]/5 text-[#E8C088] text-xs font-semibold tracking-[0.2em] uppercase ${className}`}>
        {children}
    </div>
);

// Gold divider
export const GoldDivider: React.FC = () => (
    <div className="flex items-center justify-center gap-3 my-8">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4A574]/40"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-[#D4A574]"></div>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4A574]/40"></div>
    </div>
);

// Local assets
export const PHOTOS = {
    taychi: [
        '/photos-food/t-1.jpg',
        '/photos-food/t-2.jpg',
        '/photos-food/t-3.jpg',
        '/photos-food/t-4.jpg',
    ],
    pizza: [
        '/photos-food/p-1.jpg',
        '/photos-food/p-2.jpg',
        '/photos-food/p-3.jpg',
        '/photos-food/p-4.jpg',
        '/photos-food/p-5.jpg',
        '/photos-food/p-6.jpg',
    ],
    get all() {
        // Interleave for visual variety
        const result: string[] = [];
        const max = Math.max(this.taychi.length, this.pizza.length);
        for (let i = 0; i < max; i++) {
            if (this.taychi[i]) result.push(this.taychi[i]);
            if (this.pizza[i]) result.push(this.pizza[i]);
        }
        return result;
    },
};

export const VIDEOS = {
    pizza: [
        { src: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/PIZZA%20RIO%20-%205%20TIPOS%20DE%20FOME.mov', title: '5 tipos de fome', poster: '/video-posters/pizza-1-fome.jpg' },
        { src: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/PIZZA%20RIO%20-%20SE%20QUISER%20VIM%20VER.mov', title: 'Se quiser vim ver', poster: '/video-posters/pizza-2-vim-ver.jpg' },
        { src: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/PIZZA%20RIO%20-%20SERA%CC%81%20TREND.mov', title: 'Será? — Trend', poster: '/video-posters/pizza-3-sera.jpg' },
    ],
    taychi: [
        { src: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/TAYCHI%20-%20YAKISOBA.mov', title: 'Yakisoba', poster: '/video-posters/taychi-yakisoba.jpg' },
        { src: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/TAYCHI%20-%20MONTAGEM%20COMBO.mov', title: 'Montagem de combo', poster: '/video-posters/taychi-combo.jpg' },
        { src: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/TAYCHI%20-%20COMO%20USAR%20O%20HASHI.mov', title: 'Como usar o hashi', poster: '/video-posters/taychi-hashi.jpg' },
        { src: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/TAYCHI%20-%20TREND.mov', title: 'Trend', poster: '/video-posters/taychi-trend.jpg' },
    ],
    other: [
        { src: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/YUAI%20-%20SUSHI%20NO%20COPO.mov', title: 'Sushi no copo — YUAI', poster: '/video-posters/yuai-sushi-copo.jpg' },
    ],
    hero: {
        src: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/TAYCHI%20-%20YAKISOBA.mov',
        poster: '/video-posters/taychi-yakisoba.jpg',
    },
    bg: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/BG-ER.mp4',
};

// Gold logo CSS filter (turns white logo into #D4A574)
export const GOLD_FILTER =
    'brightness(0) saturate(100%) invert(68%) sepia(17%) saturate(762%) hue-rotate(349deg) brightness(91%) contrast(89%)';
