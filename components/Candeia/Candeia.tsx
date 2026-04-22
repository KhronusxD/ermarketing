import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Check,
    Sparkles,
    Instagram,
    Globe,
    MessageCircle,
    Clock,
    Users,
    Shield,
    Flame,
    Pen,
    Smartphone,
    LifeBuoy,
    Wrench,
    Brain,
    Heart,
    Sprout,
} from 'lucide-react';
import { CandeiaButton, PillBadge, DecorativeQuote, GrainOverlay, CANDEIA } from './shared';
import { SITE_PREVIEWS } from './assets';
import { trackStandard } from './metaPixel';

// Candeia-specific redirect (Flowdesk tracking link dedicated to this page)
const CTA_REDIRECT = 'https://flowdesk-flowdesk-app.rikvu5.easypanel.host/r/10jh5a';
const FLOWDESK_PIXEL_ID = '63f4f20b-41a3-46fb-94d8-942c3344a730';
const FLOWDESK_LINK = '10jh5a';

// ————————————————————————————————————————————————————————————————
// HERO — layered composition (inspired by the Mente Viva reference)
// ————————————————————————————————————————————————————————————————
const NavBar: React.FC<{ onCta: () => void }> = ({ onCta }) => (
    <nav className="absolute top-0 left-0 right-0 z-30 px-6 md:px-10 pt-5 md:pt-7">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#1F1F1F] flex items-center justify-center">
                    <Sprout size={18} className="text-[#C89968]" strokeWidth={2} />
                </div>
                <div>
                    <div className="font-serif text-[#1F1F1F] font-semibold text-lg leading-none">ER Marketing</div>
                    <div className="text-[8px] text-[#3B4236] tracking-[0.35em] uppercase mt-0.5 font-semibold">
                        Psicologia
                    </div>
                </div>
            </div>
            <div className="hidden md:flex items-center gap-2">
                {[
                    { label: 'Portfólio', id: 'portfolio' },
                    { label: 'Planos', id: 'planos' },
                    { label: 'Processo', id: 'processo' },
                    { label: 'Inclui', id: 'inclui' },
                ].map((link) => (
                    <button
                        key={link.id}
                        onClick={() =>
                            document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })
                        }
                        className="px-5 py-2 rounded-full text-[13px] text-[#1F1F1F] border border-transparent hover:border-[#1F1F1F]/20 hover:bg-white/30 transition-all"
                    >
                        {link.label}
                    </button>
                ))}
            </div>
            <CandeiaButton size="sm" tone="tan" onClick={onCta}>
                Contato
                <ArrowRight size={14} />
            </CandeiaButton>
        </div>
    </nav>
);

// Animated floating psychology bubble (circular, frosted glass, symbol at center)
interface PsychBubbleProps {
    icon: React.ElementType;
    size?: number;
    className?: string;
    floatOffset?: number;
    floatDuration?: number;
    delay?: number;
    iconColor?: string;
    tint?: 'tan' | 'sage' | 'cream';
}

const PsychBubble: React.FC<PsychBubbleProps> = ({
    icon: Icon,
    size = 120,
    className = '',
    floatOffset = 16,
    floatDuration = 6,
    delay = 0,
    iconColor = '#A77A4B',
    tint = 'tan',
}) => {
    const tintGradient = {
        tan: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.85) 0%, rgba(240,236,227,0.55) 35%, rgba(200,153,104,0.25) 75%, rgba(167,122,75,0.22) 100%)',
        sage: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.85) 0%, rgba(240,236,227,0.55) 35%, rgba(168,178,154,0.25) 75%, rgba(111,122,102,0.22) 100%)',
        cream: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.9) 0%, rgba(240,236,227,0.7) 40%, rgba(200,153,104,0.15) 80%, rgba(167,122,75,0.12) 100%)',
    }[tint];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
                opacity: 1,
                scale: 1,
                y: [0, -floatOffset, 0],
            }}
            transition={{
                opacity: { duration: 0.8, delay },
                scale: { duration: 0.8, delay, ease: 'easeOut' },
                y: {
                    duration: floatDuration,
                    delay: delay + 0.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                },
            }}
            className={`relative rounded-full ${className}`}
            style={{ width: size, height: size }}
        >
            {/* outer soft glow */}
            <div
                className="absolute -inset-4 rounded-full blur-2xl"
                style={{
                    background:
                        'radial-gradient(circle, rgba(200,153,104,0.3) 0%, transparent 70%)',
                }}
            />
            {/* glass sphere */}
            <div
                className="relative w-full h-full rounded-full flex items-center justify-center overflow-hidden backdrop-blur-xl border border-white/60 shadow-[0_25px_60px_-15px_rgba(31,31,31,0.25)]"
                style={{ background: tintGradient }}
            >
                {/* inner highlight (top) */}
                <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                        background:
                            'radial-gradient(ellipse 50% 30% at 35% 20%, rgba(255,255,255,0.7), transparent 60%)',
                    }}
                />
                {/* inner shadow (bottom-right) */}
                <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                        background:
                            'radial-gradient(ellipse 60% 40% at 70% 85%, rgba(167,122,75,0.28), transparent 55%)',
                    }}
                />
                {/* icon */}
                <Icon
                    size={size * 0.42}
                    className="relative z-10"
                    color={iconColor}
                    strokeWidth={1.6}
                />
            </div>
        </motion.div>
    );
};

const Hero: React.FC<{ onCta: () => void; onScroll: () => void }> = ({ onCta, onScroll }) => (
    <section
        className="relative min-h-[100vh] overflow-hidden"
        style={{ backgroundColor: CANDEIA.sage }}
    >
        <GrainOverlay opacity={0.08} />

        {/* Atmospheric soft orbs like the reference's pastel glow */}
        <div
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{
                background:
                    'radial-gradient(ellipse 40% 30% at 10% 20%, rgba(200,153,104,0.22), transparent 60%), radial-gradient(ellipse 40% 35% at 95% 80%, rgba(240,236,227,0.45), transparent 60%)',
            }}
        />

        <NavBar onCta={onCta} />

        {/* Huge background display typography (split across hero) */}
        <div className="absolute inset-0 flex flex-col justify-center pointer-events-none select-none">
            <div className="relative w-full flex flex-col gap-0 items-stretch">
                <h1
                    className="font-serif font-bold text-[#1F1F1F] leading-[0.78] tracking-tighter text-center"
                    style={{
                        fontSize: 'clamp(7rem, 28vw, 24rem)',
                        opacity: 0.88,
                    }}
                >
                    CAN
                </h1>
                <h1
                    className="font-serif font-bold italic text-[#1F1F1F] leading-[0.78] tracking-tighter text-center"
                    style={{
                        fontSize: 'clamp(7rem, 28vw, 24rem)',
                        opacity: 0.88,
                    }}
                >
                    DEIA
                </h1>
            </div>
        </div>

        {/* CENTER — Woman image (desktop + mobile share this block) */}
        <div className="relative z-10 w-full h-full flex items-end justify-center pointer-events-none">
            <motion.img
                src="/woman-in-the-middle.png"
                alt="Profissional de saúde"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                className="relative z-10 select-none object-contain object-bottom"
                style={{
                    width: 'clamp(320px, 45vw, 640px)',
                    maxHeight: '92vh',
                    filter: 'drop-shadow(0 40px 40px rgba(31,31,31,0.25))',
                }}
                draggable={false}
            />
        </div>

        {/* 3 PSYCHOLOGY BUBBLES — floating around the woman, harmonized */}
        {/* Top-left — Brain (mind/reflection) */}
        <div className="absolute left-[6%] md:left-[12%] top-[24%] md:top-[28%] z-20 pointer-events-none">
            <PsychBubble
                icon={Brain}
                size={140}
                floatOffset={18}
                floatDuration={6.5}
                delay={0.5}
                tint="tan"
            />
        </div>
        {/* Top-right — Heart (emotion/care) */}
        <div className="absolute right-[7%] md:right-[13%] top-[20%] md:top-[22%] z-20 pointer-events-none">
            <PsychBubble
                icon={Heart}
                size={120}
                floatOffset={14}
                floatDuration={7.5}
                delay={0.8}
                tint="cream"
                iconColor="#C89968"
            />
        </div>
        {/* Bottom-right — Sprout (growth) — sits lower, smaller, rotated slightly */}
        <div className="absolute right-[10%] md:right-[18%] bottom-[22%] md:bottom-[26%] z-20 pointer-events-none">
            <PsychBubble
                icon={Sprout}
                size={100}
                floatOffset={12}
                floatDuration={8}
                delay={1.1}
                tint="sage"
                iconColor="#6F7A66"
            />
        </div>

        {/* TOP HEADLINE + CTAs (overlay) */}
        <div className="absolute top-[18%] md:top-[20%] left-0 right-0 z-20 px-6 pointer-events-none">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4 }}
                className="max-w-5xl mx-auto text-center pointer-events-auto"
            >
                <PillBadge tone="ink" className="mb-5 bg-white/40 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C89968]"></span>
                    Sites para profissionais de saúde
                </PillBadge>
            </motion.div>
        </div>

        {/* BOTTOM HEADLINE + CTAs + price */}
        <div className="absolute bottom-6 md:bottom-8 left-0 right-0 z-30 px-6 pointer-events-none">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="max-w-6xl mx-auto flex flex-col md:flex-row items-end md:items-end justify-between gap-4 pointer-events-auto"
            >
                {/* Left-bottom tagline block (replaces the old testimonial) */}
                <div className="max-w-[260px] text-center md:text-left">
                    <h3 className="font-serif text-[#1F1F1F] text-[15px] md:text-base leading-snug mb-3 italic">
                        Cuidar da mente é <span className="font-semibold not-italic">transformar a vida.</span>
                    </h3>
                    <button
                        onClick={onScroll}
                        className="inline-flex items-center gap-2 text-[#3B4236] font-semibold text-[12px] hover:text-[#A77A4B] transition-colors group"
                    >
                        <span className="border-b border-[#3B4236]/60 group-hover:border-[#A77A4B] pb-0.5">
                            Saiba mais
                        </span>
                        <span className="w-6 h-6 rounded-full border border-[#3B4236]/40 flex items-center justify-center group-hover:border-[#A77A4B]">
                            <ArrowRight size={11} />
                        </span>
                    </button>
                </div>

                {/* Right-bottom CTAs + price */}
                <div className="flex flex-col items-center md:items-end gap-2 text-right">
                    <p className="text-[11px] text-[#3B4236]/80 tracking-[0.2em] uppercase font-semibold">
                        A partir de R$ 990 &middot; 4x sem juros
                    </p>
                    <div className="flex flex-wrap items-center justify-end gap-2">
                        <CandeiaButton size="md" tone="ink" onClick={onCta}>
                            Quero meu site
                            <ArrowRight size={14} />
                        </CandeiaButton>
                        <CandeiaButton size="md" tone="outline-ink" onClick={onScroll}>
                            Ver planos
                        </CandeiaButton>
                    </div>
                </div>
            </motion.div>
        </div>
    </section>
);

// ————————————————————————————————————————————————————————————————
// PAIN
// ————————————————————————————————————————————————————————————————
const PAINS = [
    'Pesquisou seu próprio nome no Google e não apareceu nada — ou só um perfil desatualizado de 2019.',
    'Tem um site, mas sente vergonha de enviar o link pra um paciente em potencial.',
    'Depende exclusivamente de indicação pra fechar agenda — nos meses fracos, a agenda fica vazia.',
    'Sabe que precisa de presença digital, mas não sabe por onde começar e tem medo de parecer "vendedor demais".',
    'Tem Instagram, mas sente que falta algo sólido — um lugar onde o paciente leia sobre você e já queira agendar.',
];

const Pain: React.FC = () => (
    <section
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ backgroundColor: CANDEIA.cream }}
    >
        <GrainOverlay opacity={0.04} />
        <DecorativeQuote
            className="absolute top-6 right-6 opacity-40"
            style={{ fontSize: 'clamp(6rem, 14vw, 10rem)' }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
            <div className="mb-14 text-center">
                <PillBadge tone="ink" className="mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C89968]"></span>
                    Você já passou por um desses?
                </PillBadge>
                <h2
                    className="font-serif font-semibold text-[#1F1F1F] tracking-tight leading-[0.98] max-w-3xl mx-auto"
                    style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
                >
                    Sinais de que <span className="italic text-[#A77A4B]">seu site está te atrapalhando</span> em vez
                    de ajudar.
                </h2>
            </div>

            <div className="space-y-3 md:space-y-4">
                {PAINS.map((p, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.5, delay: i * 0.07 }}
                        className="relative flex items-start gap-5 p-5 md:p-6 rounded-2xl border border-[#1F1F1F]/10 bg-white/40 hover:bg-white/70 transition-colors"
                    >
                        <span className="shrink-0 font-serif italic text-[#C89968] text-3xl md:text-4xl leading-none w-10 md:w-12 text-right">
                            {String(i + 1).padStart(2, '0')}
                        </span>
                        <p className="text-[#1F1F1F] text-[15px] md:text-lg leading-relaxed pt-1">{p}</p>
                    </motion.div>
                ))}
            </div>

            <p className="text-center mt-12 text-[#3B4236] text-base md:text-lg italic max-w-2xl mx-auto">
                Se você se identificou com qualquer um desses, a Candeia foi feita pro seu momento.
            </p>
        </div>
    </section>
);

// ————————————————————————————————————————————————————————————————
// INSTAGRAM vs SITE
// ————————————————————————————————————————————————————————————————
const InstagramVsSite: React.FC = () => (
    <section
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ backgroundColor: CANDEIA.sageDark, color: CANDEIA.cream }}
    >
        <GrainOverlay opacity={0.08} />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
                <PillBadge tone="cream" className="mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C89968]"></span>
                    Instagram &middot; Site
                </PillBadge>
                <h2
                    className="font-serif font-semibold text-[#F0ECE3] tracking-tight leading-[0.98] mb-4"
                    style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
                >
                    O Instagram <span className="italic text-[#C89968]">apresenta</span>.
                </h2>
                <h3
                    className="font-serif italic font-light text-[#F0ECE3] tracking-tight leading-[0.98] mb-6"
                    style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
                >
                    O site <span className="font-semibold not-italic">convence</span>.
                </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                    className="relative p-7 md:p-8 rounded-3xl border border-[#F0ECE3]/15 bg-[#F0ECE3]/5 backdrop-blur-sm"
                >
                    <Instagram size={28} className="text-[#C89968] mb-5" strokeWidth={1.6} />
                    <h3 className="font-serif text-2xl text-[#F0ECE3] mb-3 leading-tight">Instagram</h3>
                    <p className="text-[#E8E2D3] leading-relaxed text-[15px]">
                        Ótimo pra alcance e relacionamento. Serve pra apresentar você e construir audiência ao longo
                        do tempo.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.12 }}
                    className="relative p-7 md:p-8 rounded-3xl border border-[#C89968]/50 bg-[#C89968]/10 backdrop-blur-sm"
                >
                    <Globe size={28} className="text-[#C89968] mb-5" strokeWidth={1.6} />
                    <h3 className="font-serif text-2xl text-[#F0ECE3] mb-3 leading-tight italic">
                        Site profissional
                    </h3>
                    <p className="text-[#E8E2D3] leading-relaxed text-[15px]">
                        É onde o paciente decide. Lê sua formação com calma, entende sua abordagem e sente confiança
                        antes de te ligar ou mandar mensagem.
                    </p>
                </motion.div>
            </div>

            <p className="text-center mt-10 text-[#E8E2D3] text-base md:text-lg leading-relaxed max-w-2xl mx-auto italic">
                Um site bem construído trabalha por você 24h por dia, 7 dias por semana — inclusive enquanto você
                está em atendimento.
            </p>
        </div>
    </section>
);

// ————————————————————————————————————————————————————————————————
// PORTFOLIO — infinite horizontal carousel of real psychology site screenshots
// ————————————————————————————————————————————————————————————————
const PortfolioCarousel: React.FC = () => {
    // Duplicate for seamless loop
    const slides = [...SITE_PREVIEWS, ...SITE_PREVIEWS];
    return (
        <section
            id="portfolio"
            className="relative py-20 md:py-28 overflow-hidden"
            style={{ backgroundColor: CANDEIA.cream }}
        >
            <GrainOverlay opacity={0.04} />

            <div className="relative z-10 max-w-6xl mx-auto px-6 mb-10 md:mb-14 text-center">
                <PillBadge tone="ink" className="mb-5">
                    <Sparkles size={10} />
                    Portfólio
                </PillBadge>
                <h2
                    className="font-serif font-semibold text-[#1F1F1F] tracking-tight leading-[0.98] mb-3"
                    style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
                >
                    Cada site tem <span className="italic text-[#A77A4B]">a cara do profissional.</span>
                </h2>
                <p className="text-[#3B4236] text-[15px] md:text-base max-w-2xl mx-auto">
                    Sem template. Sem molde repetido. Conheça alguns dos sites que construímos pra psicólogos,
                    nutricionistas e terapeutas.
                </p>
            </div>

            {/* Infinite marquee */}
            <div className="relative w-full overflow-hidden">
                <div
                    className="flex gap-5 md:gap-7 w-max animate-marquee"
                    style={{ willChange: 'transform' }}
                >
                    {slides.map((site, i) => (
                        <div
                            key={`${site.src}-${i}`}
                            className="shrink-0 w-[280px] md:w-[420px] group"
                        >
                            <div className="relative rounded-2xl overflow-hidden border border-[#1F1F1F]/10 bg-white shadow-[0_15px_40px_-15px_rgba(31,31,31,0.3)]">
                                {/* Browser chrome */}
                                <div className="flex items-center gap-1.5 bg-[#F0ECE3] px-3 py-2 border-b border-[#1F1F1F]/8">
                                    <span className="w-2 h-2 rounded-full bg-[#FF5F57]"></span>
                                    <span className="w-2 h-2 rounded-full bg-[#FEBC2E]"></span>
                                    <span className="w-2 h-2 rounded-full bg-[#28C840]"></span>
                                    <div className="ml-2 text-[9px] text-[#3B4236]/60 font-mono tracking-wide truncate">
                                        {site.label.toLowerCase().replace(/\s+/g, '') + '.com.br'}
                                    </div>
                                </div>
                                {/* Screenshot */}
                                <div className="relative aspect-[16/9] overflow-hidden">
                                    <img
                                        src={site.src}
                                        alt={site.label}
                                        loading="lazy"
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>
                                {/* Caption */}
                                <div className="p-3.5 flex items-center justify-between gap-3 bg-white">
                                    <div>
                                        <div className="font-serif text-[#1F1F1F] text-[14px] leading-tight">
                                            {site.label}
                                        </div>
                                        <div className="text-[11px] text-[#3B4236]/75 tracking-wide">
                                            {site.style}
                                        </div>
                                    </div>
                                    <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] font-bold text-[#A77A4B] border border-[#A77A4B]/35 rounded-full px-2.5 py-1">
                                        {site.mood}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Fade edges */}
                <div
                    className="absolute inset-y-0 left-0 w-16 md:w-32 pointer-events-none z-10"
                    style={{ background: `linear-gradient(to right, ${CANDEIA.cream}, transparent)` }}
                />
                <div
                    className="absolute inset-y-0 right-0 w-16 md:w-32 pointer-events-none z-10"
                    style={{ background: `linear-gradient(to left, ${CANDEIA.cream}, transparent)` }}
                />
            </div>

            <p className="relative z-10 text-center mt-10 text-[#3B4236] text-sm md:text-base italic max-w-xl mx-auto px-6">
                Seu site não vai ser igual a nenhum desses. Vai ser{' '}
                <span className="font-semibold not-italic">seu</span>.
            </p>
        </section>
    );
};

// ————————————————————————————————————————————————————————————————
// PLANS
// ————————————————————————————————————————————————————————————————
interface Plan {
    name: string;
    price: string;
    installments: string;
    pitch: string;
    features: string[];
    idealFor: string;
    highlight?: boolean;
    badge?: string;
}

const PLANS: Plan[] = [
    {
        name: 'Essencial',
        price: 'R$ 990',
        installments: '4x de R$ 247,50 sem juros',
        pitch: 'Pra quem quer presença digital profissional sem complicação.',
        features: [
            'Até 5 seções estratégicas',
            'Design responsivo personalizado',
            'Copy focado em conversão',
            'Integração WhatsApp + formulário',
            'Entrega em até 7 dias úteis',
        ],
        idealFor:
            'Psicólogos e terapeutas iniciando a presença digital — quem quer um site limpo pra apresentar aos pacientes.',
    },
    {
        name: 'Profissional',
        price: 'R$ 2.900',
        installments: '3x de R$ 966,67 sem juros',
        pitch: 'Pra quem quer um site completo que trabalha como canal de aquisição.',
        badge: 'Mais escolhido',
        highlight: true,
        features: [
            'Até 10 seções personalizadas',
            'Pixel Meta + Google Analytics 4',
            'SEO otimizado pra buscas locais',
            'Velocidade otimizada',
            'Animações e interações profissionais',
            'Página de especialidades detalhada',
            'Integração com agenda online',
            'Entrega em até 12 dias úteis',
        ],
        idealFor:
            'Nutricionistas e psicólogos com agenda razoável que querem escalar via Google ou investem em tráfego pago.',
    },
    {
        name: 'Premium',
        price: 'R$ 4.900',
        installments: '3x de R$ 1.633,33 sem juros',
        pitch: 'Pra quem quer o site mais completo — com automação, CRM e painel de métricas exclusivo.',
        features: [
            'Seções ilimitadas',
            'Chatbot pra triagem de pacientes',
            'Integração com CRM pra gestão de leads',
            'Painel de métricas exclusivo',
            'Blog integrado pra conteúdo',
            'Sistema de coleta de depoimentos',
            'Integração com agendamento online',
            'Suporte prioritário por 3 meses',
            'Entrega em até 18 dias úteis',
        ],
        idealFor:
            'Clínicas com múltiplos profissionais, profissionais consolidados que querem o melhor disponível.',
    },
];

const Plans: React.FC<{ onCta: () => void }> = ({ onCta }) => (
    <section
        id="planos"
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ backgroundColor: CANDEIA.cream }}
    >
        <GrainOverlay opacity={0.04} />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <PillBadge tone="ink" className="mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C89968]"></span>
                    Planos
                </PillBadge>
                <h2
                    className="font-serif font-semibold text-[#1F1F1F] tracking-tight leading-[0.98] mb-4"
                    style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
                >
                    Escolha o plano que faz sentido{' '}
                    <span className="italic text-[#A77A4B]">pro seu momento.</span>
                </h2>
                <p className="text-[#3B4236] text-base md:text-lg max-w-2xl mx-auto">
                    Três degraus. Design 100% exclusivo, copy incluso e entrega no prazo combinado.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-5 md:gap-6">
                {PLANS.map((p, i) => (
                    <motion.div
                        key={p.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.55, delay: i * 0.1 }}
                        className={`relative ${p.highlight ? 'lg:-my-4' : ''}`}
                    >
                        {p.badge && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-[#1F1F1F] text-[#F0ECE3] text-[10px] font-bold tracking-[0.25em] uppercase shadow-lg">
                                ★ {p.badge}
                            </div>
                        )}

                        <div
                            className={`relative h-full p-7 md:p-8 rounded-3xl flex flex-col ${
                                p.highlight
                                    ? 'bg-[#1F1F1F] text-[#F0ECE3] border border-[#1F1F1F]'
                                    : 'bg-white border border-[#1F1F1F]/10'
                            }`}
                        >
                            <div
                                className={`text-[10px] font-bold tracking-[0.3em] uppercase mb-3 ${
                                    p.highlight ? 'text-[#C89968]' : 'text-[#A77A4B]'
                                }`}
                            >
                                Plano
                            </div>
                            <h3
                                className={`font-serif text-3xl md:text-4xl font-semibold leading-tight mb-2 ${
                                    p.highlight ? 'text-[#F0ECE3]' : 'text-[#1F1F1F]'
                                }`}
                            >
                                {p.name}
                            </h3>
                            <p
                                className={`text-sm leading-relaxed mb-6 min-h-[3rem] ${
                                    p.highlight ? 'text-[#E8E2D3]' : 'text-[#3B4236]'
                                }`}
                            >
                                {p.pitch}
                            </p>

                            <div className="flex items-baseline gap-2 mb-1">
                                <span
                                    className={`font-serif text-4xl md:text-5xl font-bold ${
                                        p.highlight ? 'text-[#F0ECE3]' : 'text-[#1F1F1F]'
                                    }`}
                                >
                                    {p.price}
                                </span>
                                <span
                                    className={`text-xs tracking-wide ${
                                        p.highlight ? 'text-[#C89968]' : 'text-[#A77A4B]'
                                    }`}
                                >
                                    à vista
                                </span>
                            </div>
                            <p
                                className={`text-[11px] mb-7 tracking-wide ${
                                    p.highlight ? 'text-[#E8E2D3]/70' : 'text-[#3B4236]/70'
                                }`}
                            >
                                {p.installments}
                            </p>

                            <ul className="space-y-3 mb-7 flex-1">
                                {p.features.map((f, fi) => (
                                    <li
                                        key={fi}
                                        className={`flex items-start gap-3 text-[14px] leading-relaxed ${
                                            p.highlight ? 'text-[#E8E2D3]' : 'text-[#1F1F1F]'
                                        }`}
                                    >
                                        <span
                                            className={`shrink-0 mt-1 w-4 h-4 rounded-full border flex items-center justify-center ${
                                                p.highlight
                                                    ? 'border-[#C89968]/60 bg-[#C89968]/20'
                                                    : 'border-[#C89968]/50 bg-[#C89968]/10'
                                            }`}
                                        >
                                            <Check size={9} className="text-[#C89968]" strokeWidth={3} />
                                        </span>
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <div
                                className={`pt-5 border-t mb-6 ${
                                    p.highlight ? 'border-[#F0ECE3]/15' : 'border-[#1F1F1F]/10'
                                }`}
                            >
                                <div
                                    className={`text-[10px] font-bold tracking-[0.25em] uppercase mb-1.5 ${
                                        p.highlight ? 'text-[#C89968]' : 'text-[#A77A4B]'
                                    }`}
                                >
                                    Ideal pra
                                </div>
                                <p
                                    className={`text-[12px] italic leading-relaxed ${
                                        p.highlight ? 'text-[#E8E2D3]/85' : 'text-[#3B4236]/85'
                                    }`}
                                >
                                    {p.idealFor}
                                </p>
                            </div>

                            <CandeiaButton
                                size="md"
                                tone={p.highlight ? 'tan' : 'ink'}
                                onClick={onCta}
                                className="w-full justify-center"
                            >
                                Quero o Plano {p.name}
                                <ArrowRight size={16} />
                            </CandeiaButton>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

// ————————————————————————————————————————————————————————————————
// WHAT EVERY PLAN HAS
// ————————————————————————————————————————————————————————————————
const INCLUDED = [
    {
        icon: Pen,
        t: 'Design 100% exclusivo',
        d: 'Nenhum template. Nenhuma página igual à de outro profissional. Sua identidade, sua paleta, sua essência.',
    },
    {
        icon: MessageCircle,
        t: 'Copy estratégico incluso',
        d: 'Não entregamos só o visual — escrevemos os textos com linguagem que conecta com o seu paciente ideal.',
    },
    {
        icon: Smartphone,
        t: 'Responsivo em qualquer dispositivo',
        d: 'Perfeito no celular, tablet e computador. A maioria dos seus futuros pacientes vai te encontrar pelo smartphone.',
    },
    {
        icon: LifeBuoy,
        t: 'Suporte após a entrega',
        d: 'Não sumimos depois de publicar. Estamos disponíveis pra dúvidas e ajustes no período pós-entrega.',
    },
    {
        icon: Wrench,
        t: 'Treinamento de uso',
        d: 'Você aprende a atualizar seu próprio site sem depender de ninguém pra mudanças simples.',
    },
];

const Included: React.FC = () => (
    <section
        id="inclui"
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ backgroundColor: CANDEIA.sage }}
    >
        <GrainOverlay opacity={0.07} />
        <DecorativeQuote
            className="absolute bottom-4 left-4 opacity-30"
            style={{ fontSize: 'clamp(6rem, 14vw, 11rem)' }}
            flip
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
                <PillBadge tone="ink" className="mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1F1F1F]"></span>
                    Independente do plano
                </PillBadge>
                <h2
                    className="font-serif font-semibold text-[#1F1F1F] tracking-tight leading-[0.98] max-w-3xl mx-auto"
                    style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
                >
                    O que todo plano <span className="italic text-[#A77A4B]">sempre inclui.</span>
                </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {INCLUDED.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={item.t}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="p-6 md:p-7 rounded-2xl bg-[#F0ECE3] border border-[#1F1F1F]/5 hover:border-[#C89968]/40 transition-colors"
                        >
                            <div className="w-11 h-11 rounded-full bg-[#C89968]/15 border border-[#C89968]/35 flex items-center justify-center mb-4">
                                <Icon size={18} className="text-[#A77A4B]" strokeWidth={1.8} />
                            </div>
                            <h3 className="font-serif text-xl md:text-2xl text-[#1F1F1F] leading-tight mb-2">
                                {item.t}
                            </h3>
                            <p className="text-[#3B4236] text-[14px] leading-relaxed">{item.d}</p>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    </section>
);

// ————————————————————————————————————————————————————————————————
// HOW IT WORKS
// ————————————————————————————————————————————————————————————————
const TIMELINE = [
    {
        day: 'DIA 1',
        t: 'Briefing',
        d: 'Reunião pra entender sua abordagem, público, identidade visual e objetivos. Você não precisa saber nada de tecnologia.',
    },
    {
        day: 'DIAS 2–5',
        t: 'Design no Figma',
        d: 'Criamos o layout completo e enviamos pra sua aprovação antes de qualquer linha de código.',
    },
    {
        day: 'DIAS 6–11',
        t: 'Desenvolvimento',
        d: 'Construção do site com rodadas de revisão. Você acompanha e solicita ajustes.',
    },
    {
        day: 'DIA 12+',
        t: 'Publicação',
        d: 'Site no ar, domínio configurado, treinamento do painel e entrega oficial.',
    },
];

const HowItWorks: React.FC = () => (
    <section
        id="processo"
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ backgroundColor: CANDEIA.cream }}
    >
        <GrainOverlay opacity={0.04} />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
                <PillBadge tone="ink" className="mb-6">
                    <Clock size={10} />
                    Como funciona
                </PillBadge>
                <h2
                    className="font-serif font-semibold text-[#1F1F1F] tracking-tight leading-[0.98]"
                    style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
                >
                    Do briefing ao site no ar{' '}
                    <span className="italic text-[#A77A4B]">em até 18 dias.</span>
                </h2>
            </div>

            <div className="relative">
                <div className="absolute left-[22px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#A77A4B]/40 to-transparent"></div>

                <div className="space-y-10">
                    {TIMELINE.map((step, i) => (
                        <motion.div
                            key={step.day}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className={`relative flex md:grid md:grid-cols-2 md:gap-10 items-start ${
                                i % 2 === 1 ? 'md:[&>*:first-child]:col-start-2' : ''
                            }`}
                        >
                            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-2 w-4 h-4 rounded-full bg-[#C89968] shadow-[0_0_0_4px_#F0ECE3]"></div>
                            <div
                                className={`pl-14 md:pl-0 w-full ${
                                    i % 2 === 0 ? 'md:text-right md:pr-10' : 'md:pl-10'
                                }`}
                            >
                                <div className="text-[10px] tracking-[0.3em] uppercase text-[#A77A4B] font-bold mb-2">
                                    {step.day}
                                </div>
                                <h3 className="font-serif text-2xl text-[#1F1F1F] mb-2 leading-tight">{step.t}</h3>
                                <p className="text-[#3B4236] text-[14px] leading-relaxed">{step.d}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

// ————————————————————————————————————————————————————————————————
// FOR WHOM
// ————————————————————————————————————————————————————————————————
const AUDIENCE = [
    'Psicólogos que dependem de indicação e querem diversificar a captação.',
    'Nutricionistas que têm Instagram ativo mas sentem falta de um espaço mais completo.',
    'Terapeutas holísticos, coaches de saúde e profissionais que precisam de credibilidade digital.',
    'Profissionais recém-formados que querem começar a carreira com presença digital desde o primeiro dia.',
    'Clínicas com múltiplos especialistas que precisam apresentar toda a equipe com clareza.',
];

const Audience: React.FC = () => (
    <section
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ backgroundColor: CANDEIA.sage }}
    >
        <GrainOverlay opacity={0.07} />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
                <PillBadge tone="ink" className="mb-6">
                    <Users size={10} />
                    Pra quem é
                </PillBadge>
                <h2
                    className="font-serif font-semibold text-[#1F1F1F] tracking-tight leading-[0.98] max-w-3xl mx-auto"
                    style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
                >
                    A Candeia atende quem quer{' '}
                    <span className="italic text-[#A77A4B]">ser encontrado e escolhido online.</span>
                </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {AUDIENCE.map((a, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}
                        className="flex items-start gap-4 p-5 rounded-2xl bg-[#F0ECE3]/60 border border-[#1F1F1F]/10"
                    >
                        <span className="shrink-0 w-8 h-8 rounded-full bg-[#1F1F1F] text-[#C89968] font-serif italic text-base font-bold flex items-center justify-center">
                            {i + 1}
                        </span>
                        <p className="text-[#1F1F1F] text-[15px] leading-relaxed pt-1">{a}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

// ————————————————————————————————————————————————————————————————
// OBJECTIONS
// ————————————————————————————————————————————————————————————————
const OBJECTIONS = [
    {
        q: '"Não sei se meus pacientes buscam pelo Google."',
        a: 'Buscam. Mais de 70% das pessoas pesquisam online antes de agendar qualquer serviço de saúde — ainda mais psicólogo ou nutricionista, onde a escolha é pessoal.',
    },
    {
        q: '"Tenho Instagram. Isso não é suficiente?"',
        a: 'O Instagram apresenta. O site convence. São papéis diferentes. O Instagram traz alcance — o site fecha a decisão de agendar.',
    },
    {
        q: '"Tenho medo de parecer comercial demais."',
        a: 'Um site bem construído pra profissional de saúde não parece anúncio — parece credencial. É a diferença entre um consultório bem cuidado e um espaço improvisado.',
    },
    {
        q: '"R$ 990 é muito pra começar."',
        a: 'É menos do que um mês de aluguel de sala. E trabalha por você 24h por dia, todos os dias, sem custo adicional.',
    },
    {
        q: '"Tenho tempo de fazer sozinho no Wix."',
        a: 'Pode. Mas um site sem estratégia de copy e design afasta mais pacientes do que atrai. A primeira impressão online vale tanto quanto a presencial.',
    },
];

const Objections: React.FC = () => (
    <section
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ backgroundColor: CANDEIA.cream }}
    >
        <GrainOverlay opacity={0.04} />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
            <div className="text-center mb-14">
                <PillBadge tone="ink" className="mb-6">
                    <Shield size={10} />
                    Perguntas comuns
                </PillBadge>
                <h2
                    className="font-serif font-semibold text-[#1F1F1F] tracking-tight leading-[0.98]"
                    style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
                >
                    O que normalmente <span className="italic text-[#A77A4B]">passa pela cabeça.</span>
                </h2>
            </div>

            <div className="space-y-4">
                {OBJECTIONS.map((o, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.45, delay: i * 0.05 }}
                        className="p-6 md:p-7 rounded-2xl bg-white border border-[#1F1F1F]/10"
                    >
                        <h3 className="font-serif italic text-lg md:text-xl text-[#A77A4B] mb-2 leading-tight">
                            {o.q}
                        </h3>
                        <p className="text-[#1F1F1F] text-[14px] md:text-[15px] leading-relaxed">{o.a}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

// ————————————————————————————————————————————————————————————————
// URGENCY
// ————————————————————————————————————————————————————————————————
const Urgency: React.FC<{ onCta: () => void }> = ({ onCta }) => (
    <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ backgroundColor: CANDEIA.sage }}
    >
        <GrainOverlay opacity={0.07} />
        <DecorativeQuote
            className="absolute top-4 right-6 opacity-35"
            style={{ fontSize: 'clamp(7rem, 16vw, 13rem)' }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <PillBadge tone="ink" className="mb-6">
                <Flame size={10} />
                Vagas limitadas
            </PillBadge>

            <h2
                className="font-serif font-semibold text-[#1F1F1F] tracking-tight leading-[0.95] mb-6"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
            >
                Atendemos um número{' '}
                <span className="italic text-[#A77A4B]">limitado de projetos</span> por mês.
            </h2>

            <p className="text-[#3B4236] text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-3">
                Cada site recebe atenção total da nossa equipe — por isso não abrimos vagas ilimitadas. Quando o
                mês fecha, fecha.
            </p>
            <p className="text-[#3B4236] italic text-sm md:text-base mb-8 max-w-xl mx-auto">
                Se você está lendo isso agora, ainda há vagas disponíveis pra este mês.
            </p>

            <CandeiaButton size="lg" tone="ink" onClick={onCta}>
                Garantir minha vaga
                <ArrowRight size={18} />
            </CandeiaButton>
        </div>
    </section>
);

// ————————————————————————————————————————————————————————————————
// FINAL CTA
// ————————————————————————————————————————————————————————————————
const FinalCTA: React.FC<{ onCta: () => void }> = ({ onCta }) => (
    <section
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ backgroundColor: CANDEIA.sageDark, color: CANDEIA.cream }}
    >
        <GrainOverlay opacity={0.08} />
        <DecorativeQuote
            className="absolute -top-4 -left-4 md:top-8 md:left-8 opacity-90"
            color="#C89968"
        />
        <DecorativeQuote
            className="absolute bottom-4 right-4 opacity-70"
            color="#C89968"
            style={{ fontSize: 'clamp(6rem, 14vw, 12rem)' }}
            flip
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <PillBadge tone="cream" className="mb-8">
                <Sparkles size={10} />
                Último passo
            </PillBadge>

            <h2
                className="font-serif font-semibold text-[#F0ECE3] tracking-tight leading-[0.95] mb-5"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
            >
                Seu próximo paciente está
            </h2>
            <h3
                className="font-serif italic font-light text-[#C89968] leading-[0.95] mb-8"
                style={{ fontSize: 'clamp(2.25rem, 6.5vw, 4.5rem)' }}
            >
                procurando você no Google agora.
            </h3>

            <p className="text-[#E8E2D3] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10 italic">
                A pergunta é: ele vai te encontrar?
            </p>

            <CandeiaButton size="lg" tone="tan" onClick={onCta} className="mx-auto mb-8">
                <MessageCircle size={18} />
                Quero meu site profissional
                <ArrowRight size={18} />
            </CandeiaButton>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-[#E8E2D3]/80 tracking-wide max-w-2xl mx-auto">
                <span>A partir de R$ 990</span>
                <span className="opacity-50">·</span>
                <span>4x sem juros</span>
                <span className="opacity-50">·</span>
                <span>Entrega em até 7 dias</span>
                <span className="opacity-50">·</span>
                <span>Design exclusivo · copy incluso · sem template</span>
            </div>
        </div>
    </section>
);

// ————————————————————————————————————————————————————————————————
// FOOTER
// ————————————————————————————————————————————————————————————————
const Footer: React.FC = () => (
    <footer
        className="relative py-10 border-t border-[#1F1F1F]/10"
        style={{ backgroundColor: CANDEIA.cream }}
    >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-[#3B4236]/80 tracking-wider">
            <span className="font-serif italic text-sm text-[#1F1F1F]">
                Candeia <span className="text-[#C89968]">·</span> Sites pra profissionais de saúde
            </span>
            <span>&copy; {new Date().getFullYear()} ER Marketing &middot; Todos os direitos reservados</span>
        </div>
    </footer>
);

// ————————————————————————————————————————————————————————————————
// MAIN
// ————————————————————————————————————————————————————————————————
export const Candeia: React.FC = () => {
    useEffect(() => {
        document.title = 'ER Marketing Psicologia · Sites para profissionais de saúde';

        // Inject a Flowdesk pixel scoped to this page's redirect link (10jh5a).
        // The site-wide Flowdesk pixel in index.html is tied to a different link,
        // so this one makes sure the Candeia CTA clicks are attributed correctly.
        const scriptId = 'flowdesk-pixel-candeia';
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.async = true;
            script.src = `https://flowdesk-flowdesk-app.rikvu5.easypanel.host/pixel.js?id=${FLOWDESK_PIXEL_ID}&link=${FLOWDESK_LINK}`;
            document.head.appendChild(script);
        }
    }, []);

    const goToCta = () => {
        // Fire the Meta Ads Lead conversion event on this page's primary CTA.
        trackStandard('Lead', {
            content_name: 'Candeia · Psicologia',
            content_category: 'sites-saude',
            value: 1,
            currency: 'BRL',
        });
        window.open(CTA_REDIRECT, '_blank', 'noopener,noreferrer');
    };

    const scrollToPlans = () => {
        const el = document.getElementById('planos');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div
            className="min-h-screen font-sans selection:bg-[#C89968] selection:text-[#1F1F1F] relative overflow-x-hidden"
            style={{ backgroundColor: CANDEIA.cream, color: CANDEIA.ink }}
        >
            <Hero onCta={goToCta} onScroll={scrollToPlans} />
            <PortfolioCarousel />
            <Pain />
            <InstagramVsSite />
            <Plans onCta={goToCta} />
            <Included />
            <HowItWorks />
            <Audience />
            <Objections />
            <Urgency onCta={goToCta} />
            <FinalCTA onCta={goToCta} />
            <Footer />
        </div>
    );
};

export default Candeia;
