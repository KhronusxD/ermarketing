import React from 'react';

// ——————————————————————————————————————————————————————————
// Palette — sage + warm tan editorial
export const CANDEIA = {
    sage: '#A8B29A',        // primary background
    sageDeep: '#6F7A66',    // section break
    sageDark: '#3B4236',    // deep contrast
    cream: '#F0ECE3',       // warm off-white
    creamSoft: '#E8E2D3',   // slightly warmer cream
    tan: '#C89968',         // warm accent (quote marks, highlights)
    tanDeep: '#A77A4B',     // darker tan for depth
    ink: '#1F1F1F',         // primary text on cream
    inkSoft: '#4A4A4A',     // secondary text
    paperOnSage: '#F5F1E8', // text on sage
};

// ——————————————————————————————————————————————————————————
// Grain overlay — subtle paper texture
export const GrainOverlay: React.FC<{ opacity?: number }> = ({ opacity = 0.05 }) => (
    <div
        className="absolute inset-0 pointer-events-none mix-blend-multiply"
        style={{
            opacity,
            backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
    />
);

// ——————————————————————————————————————————————————————————
// Buttons — editorial, rounded, warm
interface CandeiaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'sm' | 'md' | 'lg';
    tone?: 'ink' | 'tan' | 'cream' | 'outline-ink' | 'outline-cream';
}

export const CandeiaButton: React.FC<CandeiaButtonProps> = ({
    children,
    size = 'md',
    tone = 'ink',
    className = '',
    ...props
}) => {
    const sizes = {
        sm: 'px-5 py-2.5 text-[13px]',
        md: 'px-7 py-3.5 text-sm',
        lg: 'px-8 py-4 text-[15px]',
    };

    const tones: Record<string, string> = {
        ink: 'bg-[#1F1F1F] text-[#F0ECE3] border border-[#1F1F1F] hover:bg-[#2E2E2E] hover:border-[#2E2E2E]',
        tan: 'bg-[#C89968] text-[#1F1F1F] border border-[#C89968] hover:bg-[#A77A4B] hover:border-[#A77A4B] hover:text-[#F0ECE3]',
        cream: 'bg-[#F0ECE3] text-[#1F1F1F] border border-[#F0ECE3] hover:bg-white hover:border-white',
        'outline-ink':
            'bg-transparent text-[#1F1F1F] border border-[#1F1F1F]/40 hover:bg-[#1F1F1F] hover:text-[#F0ECE3]',
        'outline-cream':
            'bg-transparent text-[#F0ECE3] border border-[#F0ECE3]/50 hover:bg-[#F0ECE3] hover:text-[#1F1F1F]',
    };

    return (
        <button
            className={`inline-flex items-center justify-center gap-2 ${sizes[size]} font-semibold rounded-full tracking-wide transition-all duration-300 hover:-translate-y-[1px] active:translate-y-0 ${tones[tone]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

// ——————————————————————————————————————————————————————————
// Pill badge — outlined rounded tag ("não é assim que funciona" style)
export const PillBadge: React.FC<{
    children: React.ReactNode;
    tone?: 'ink' | 'cream' | 'tan';
    className?: string;
}> = ({ children, tone = 'ink', className = '' }) => {
    const tones: Record<string, string> = {
        ink: 'border-[#1F1F1F]/40 text-[#1F1F1F]',
        cream: 'border-[#F0ECE3]/60 text-[#F0ECE3]',
        tan: 'border-[#C89968] text-[#C89968]',
    };
    return (
        <span
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] tracking-[0.15em] uppercase font-semibold ${tones[tone]} ${className}`}
        >
            {children}
        </span>
    );
};

// ——————————————————————————————————————————————————————————
// Giant decorative quote mark — reference's warm tan "
export const DecorativeQuote: React.FC<{
    className?: string;
    style?: React.CSSProperties;
    color?: string;
    flip?: boolean;
}> = ({ className = '', style, color = '#C89968', flip = false }) => (
    <span
        className={`font-serif font-bold leading-none select-none pointer-events-none ${className}`}
        style={{
            color,
            fontSize: 'clamp(8rem, 20vw, 18rem)',
            lineHeight: 0.6,
            transform: flip ? 'scaleX(-1)' : undefined,
            ...style,
        }}
    >
        &ldquo;
    </span>
);
