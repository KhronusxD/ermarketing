import React from 'react';

// Animated gradient button — gold/amber shifting gradient
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
                background: 'linear-gradient(110deg, #E8C088 0%, #D4A574 25%, #F5D89F 50%, #D4A574 75%, #E8C088 100%)',
                backgroundSize: '300% 100%',
                animation: 'gradient-shift 4s ease infinite',
            }}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">{children}</span>
            <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 3s linear infinite',
                }}
            />
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

// Section label (small gold uppercase tag)
export const SectionLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4A574]/25 bg-[#D4A574]/5 text-[#E8C088] text-xs font-semibold tracking-[0.2em] uppercase ${className}`}>
        {children}
    </div>
);

// Decorative divider with gold ornament
export const GoldDivider: React.FC = () => (
    <div className="flex items-center justify-center gap-3 my-8">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4A574]/40"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-[#D4A574]"></div>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4A574]/40"></div>
    </div>
);

// Stock images - Unsplash placeholders
export const IMAGES = {
    hero_video: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80',
    steak: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80',
    sushi_hero: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1200&q=80',
    sushi_rolls: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=1200&q=80',
    pizza: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80',
    pizza_oven: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&q=80',
    chef_cooking: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80',
    ambience: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
    plating: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=1200&q=80',
    camera_bts: 'https://images.unsplash.com/photo-1496559249665-c7e2874707ea?w=1200&q=80',
    team_meeting: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=80',
    edit_screen: 'https://images.unsplash.com/photo-1574717024453-354056aafa98?w=1200&q=80',
    food_closeup: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80',
    dark_bar: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80',
};
