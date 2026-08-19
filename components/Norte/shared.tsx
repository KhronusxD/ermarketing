import React from 'react';

// Peças compartilhadas entre a LP institucional da Norte (/norte) e as
// LPs de serviço (/norte/<slug>): constantes de marca, ícones SVG
// inline e componentes de chrome (nav e footer).

export const WHATSAPP =
    'https://wa.me/5592985146299?text=' +
    encodeURIComponent('Olá! Vim pelo site da Norte e quero conversar sobre marketing.');

export const LIME = '#8DC63F';
export const FOREST = '#14261A';
export const INK = '#0B0E0C';
export const CREAM = '#F4F1E9';
export const PAPER = '#F5F5F3';
export const NORTE_INK = '#131313';

// ─── Sistema tipográfico ────────────────────────────────────────────
// Jakarta peso médio com tracking bem fechado nos títulos (extrabold
// grita; peso médio apertado lê como editorial), Inter no corpo e mono em
// caixa alta nos rótulos. Vive aqui e não em cada página pra que blog,
// diagnóstico e institucional não saiam com três sistemas diferentes.
export const H1 = 'font-norte font-medium tracking-[-0.06em] leading-[1.04]';
export const H2 = 'font-norte font-medium tracking-[-0.055em] leading-[1.06]';
export const H3 = 'font-norte font-semibold tracking-[-0.02em]';
export const TAG = 'font-mono text-[9px] tracking-[0.14em] uppercase';
export const LABEL = 'font-mono text-[12px] tracking-[0.12em] uppercase';

export const SECTION = 'py-16 md:py-24';
export const CONTAINER = 'max-w-[1240px] mx-auto px-5 md:px-8';

// ─── Ícones (stroke 1.6, grid 24) ───────────────────────────────────

export type IconProps = { className?: string };
export type IconType = React.FC<IconProps>;

export const IconTarget: IconType = ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" />
    </svg>
);

export const IconChat: IconType = ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
            d="M20 15a2 2 0 0 1-2 2H8l-4 3V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
        />
        <path d="M8.5 10.5h7M8.5 13.5h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
);

export const IconPen: IconType = ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M12 3 19 9.5 12 21 5 9.5 12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M5 9.5h14M12 3v18" stroke="currentColor" strokeWidth="1.6" />
    </svg>
);

export const IconMonitor: IconType = ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect x="3" y="4" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 21h6M12 17v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
);

export const IconCamera: IconType = ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
            d="M3 8.5A2 2 0 0 1 5 6.5h2l1.2-2h7.6L17 6.5h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
        />
        <circle cx="12" cy="13" r="3.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
);

export const IconCalendar: IconType = ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3.5 10h17M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
);

export const IconSearch: IconType = ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
);

export const IconRoute: IconType = ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <circle cx="6" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="18" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8.5 18h6a3 3 0 0 0 0-6h-5a3 3 0 0 1 0-6h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
);

export const IconRocket: IconType = ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M13 4c3.5 1 6 4 7 7.5-2.6 3.4-6 5.5-9.5 6.5L7 15C8 11.5 9.8 8 13 4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="14.5" cy="9.5" r="1.6" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 15c-1.6.6-2.4 2-2.6 4 2-.2 3.4-1 4-2.6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
);

export const IconChart: IconType = ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M4 19h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M7 19v-5M12 19V8M17 19v-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
);

export const IconUsers: IconType = ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3.5 19a5.5 5.5 0 0 1 11 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M16 5.4a3.2 3.2 0 0 1 0 5.2M17.5 14.4a5.5 5.5 0 0 1 3 4.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
);

export const IconCompass: IconType = ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
);

export const Check: IconType = ({ className = 'w-4 h-4' }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const Arrow: IconType = ({ className = 'w-4 h-4' }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M5 12h14m0 0-5.5-5.5M19 12l-5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// ─── Chrome ─────────────────────────────────────────────────────────

// Eyebrow em mono: o contraste entre a mono estreita em caixa alta e o
// título em Jakarta peso 500 é o que dá o ar editorial da marca.
export const Eyebrow: React.FC<{ children: React.ReactNode; light?: boolean }> = ({
    children,
    light = false,
}) => (
    <span
        className={`inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.12em] uppercase font-medium ${
            light ? 'text-white/60' : 'text-black/45'
        }`}
    >
        <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
        {children}
    </span>
);

// As mecânicas de rolagem moram em components/motion.tsx desde que o Kit
// passou a usá-las. Reexportadas aqui pra não quebrar quem já importava.
export {
    useScrollReveal,
    useElementReveal,
    useRailMask,
    useRevealOnView,
    stagger,
    CountUp,
    EDGE_FADE,
} from '../motion';

export const NAV_LINKS = [
    { label: 'Início', href: '/norte#inicio' },
    { label: 'Serviços', href: '/norte#servicos' },
    { label: 'Cases', href: '/norte#cases' },
    { label: 'Sobre', href: '/norte#sobre' },
    { label: 'Contato', href: '/norte#contato' },
];

// A nav nasce sobre a faixa verde-escura da hero, então antes do scroll
// ela é transparente com a logo branca; depois vira a pílula branca.
export const NorteNav: React.FC<{ scrolled: boolean }> = ({ scrolled }) => (
    <header className="fixed top-3 left-0 right-0 z-50 px-3 md:px-5">
        <div
            className={`max-w-[1240px] mx-auto flex items-center justify-between gap-4 rounded-full px-4 md:px-5 py-2.5 transition-all duration-300 ${
                scrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-[0_6px_24px_rgba(11,14,12,0.08)]'
                    : 'bg-transparent'
            }`}
        >
            <a href="/norte" className="flex items-center flex-shrink-0">
                <img
                    src={scrolled ? '/norte/logo-preta.png' : '/norte/logo-branca.png'}
                    alt="Norte · Agência de Marketing"
                    className="h-12 w-auto -my-2 object-contain"
                />
            </a>

            <nav className="hidden md:flex items-center gap-0.5">
                {NAV_LINKS.map((l) => (
                    <a
                        key={l.href}
                        href={l.href}
                        className={`px-3.5 py-2 rounded-full text-[13px] font-medium transition-colors ${
                            scrolled
                                ? 'text-black/55 hover:text-black hover:bg-black/[0.04]'
                                : 'text-white/70 hover:text-white hover:bg-white/10'
                        }`}
                    >
                        {l.label}
                    </a>
                ))}
            </nav>

            <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-2 rounded-full bg-[#8DC63F] hover:bg-[#9ed650] text-[#0B0E0C] font-semibold text-[13px] px-4 md:px-5 py-2.5 transition-colors"
            >
                <span className="hidden sm:inline">Falar com a Norte</span>
                <span className="sm:hidden">WhatsApp</span>
                <Arrow className="w-4 h-4" />
            </a>
        </div>
    </header>
);

export const NorteFooter: React.FC = () => (
    <footer className="bg-[#0B0E0C] text-white/70">
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 py-12 md:py-16">
            <div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
                    <div className="md:col-span-5">
                        <img
                            src="/norte/logo-branca.png"
                            alt="Norte · Agência de Marketing"
                            className="h-14 w-auto object-contain mb-4"
                        />
                        <p className="text-[13px] text-white/50 leading-relaxed max-w-xs">
                            Marketing com estratégia, criatividade e performance.
                            A gente aponta a direção, você caminha.
                        </p>
                    </div>

                    <div className="md:col-span-3">
                        <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#8DC63F] mb-4">
                            Navegue
                        </p>
                        <ul className="space-y-2.5 text-[13px]">
                            {NAV_LINKS.map((l) => (
                                <li key={l.href}>
                                    <a href={l.href} className="hover:text-white transition-colors">
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-4">
                        <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#8DC63F] mb-4">
                            Contato
                        </p>
                        <ul className="space-y-2.5 text-[13px]">
                            <li>
                                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                    (92) 98514-6299
                                </a>
                            </li>
                            <li>
                                <a href="mailto:contato@trafegomanaus.com.br" className="hover:text-white transition-colors">
                                    contato@trafegomanaus.com.br
                                </a>
                            </li>
                            <li className="text-white/50">Manaus · Amazonas · Brasil</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/35">
                    <span>© {new Date().getFullYear()} Norte · Agência de Marketing</span>
                    <span>CNPJ 41.079.306/0001-62</span>
                </div>
            </div>
        </div>
    </footer>
);
