import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    ArrowRight,
    ArrowDown,
    Check,
    Sparkles,
    Zap,
    Crown,
    Shield,
    Target,
    BarChart3,
    Users,
    Clock,
    Flame,
    Star,
} from 'lucide-react';
import {
    OceanButton,
    SectionLabel,
    GlassCard,
    UnderwaterBackdrop,
    BioluminescentOrbs,
    OCEAN,
} from './shared';
import { CreativeShowcase } from './CreativeShowcase';
import { LandingPagesShowcase } from './LandingPagesShowcase';
import { trackStandard } from './Quiz/metaPixel';

const WHATSAPP =
    'https://wa.me/5592985146299?text=Ol%C3%A1%21%20Vim%20da%20p%C3%A1gina%20do%20Plano%20Essencial%20da%20ER%20Marketing.%20Quero%20conversar%20sobre%20como%20come%C3%A7ar%20o%20marketing%20completo%20no%20meu%20neg%C3%B3cio.';

// ————————————————————————————————————————————————————————————————
// HERO
// ————————————————————————————————————————————————————————————————
const Hero: React.FC<{ onCta: () => void; onScroll: () => void }> = ({ onCta, onScroll }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 120]);

    return (
        <section
            ref={ref}
            className="relative min-h-[100vh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden"
        >
            <UnderwaterBackdrop variant="hero" />
            <BioluminescentOrbs count={8} />

            {/* Top meta strip */}
            <div className="absolute top-6 md:top-8 left-0 right-0 z-10 px-8 md:px-14 flex justify-between items-center text-[11px] tracking-[0.3em] uppercase text-[#7FC4FF]/70 font-medium">
                <span>First edition</span>
                <span>2025</span>
            </div>

            <motion.div
                style={{ y: parallaxY }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="relative z-10 text-center max-w-5xl px-6 mx-auto"
            >
                <div className="text-[11px] md:text-xs tracking-[0.4em] uppercase text-[#A6DEFF] font-semibold mb-6">
                    Plano
                </div>

                <h1
                    className="font-serif font-bold leading-[0.9] tracking-tight text-[#E8F4FF] mb-3"
                    style={{ fontSize: 'clamp(3.5rem, 12vw, 10rem)' }}
                >
                    Marketing
                </h1>
                <h2
                    className="font-serif font-light italic leading-[0.9] tracking-tight mb-10"
                    style={{
                        fontSize: 'clamp(2rem, 7vw, 5.5rem)',
                        color: '#A6DEFF',
                        textShadow: '0 0 40px rgba(77,213,255,0.35)',
                    }}
                >
                    completo<span className="text-[#4DD5FF]">.</span>
                </h2>

                <p className="text-base md:text-xl text-[#B8CEE4] leading-relaxed max-w-2xl mx-auto mb-4">
                    Tráfego pago, criativo profissional, CRM, atendimento via IA no WhatsApp e consultoria —
                </p>
                <p className="text-sm md:text-lg text-[#7FC4FF] leading-relaxed max-w-xl mx-auto mb-10">
                    tudo em um único plano, sem contrato longo e sem surpresa no bolso.
                </p>

                <div className="inline-flex flex-col sm:flex-row gap-4 mb-14">
                    <OceanButton size="lg" onClick={onCta}>
                        Quero começar agora
                        <ArrowRight size={18} />
                    </OceanButton>
                    <OceanButton size="lg" variant="outline" onClick={onScroll}>
                        Ver o que está incluído
                    </OceanButton>
                </div>

                {/* Watermark badge */}
                <div className="flex flex-col items-center gap-1">
                    <div className="text-[10px] tracking-[0.4em] text-[#A6DEFF]/80 font-bold">ER MARKETING</div>
                    <div className="text-[9px] tracking-[0.3em] uppercase text-[#6B86A3]">
                        Sem contrato longo &middot; Sem surpresa no bolso
                    </div>
                </div>
            </motion.div>

            {/* Scroll-down circular button */}
            <button
                onClick={onScroll}
                aria-label="Rolar para baixo"
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-full border border-[#4DD5FF]/35 bg-[#4DD5FF]/5 backdrop-blur-md flex items-center justify-center text-[#A6DEFF] hover:bg-[#4DD5FF]/15 hover:border-[#4DD5FF]/70 transition-all duration-300 animate-float-slow"
            >
                <ArrowDown size={16} />
            </button>
        </section>
    );
};

// ————————————————————————————————————————————————————————————————
// PAIN — "Você já passou por..."
// ————————————————————————————————————————————————————————————————
const PAIN_ITEMS = [
    {
        t: 'Anúncio sozinho',
        d: 'Tentou fazer anúncio sozinho e perdeu dinheiro sem saber o que deu errado.',
    },
    {
        t: 'Agência cara',
        d: 'Contratou agência, pagou caro e recebeu relatório bonito — mas o cliente não apareceu.',
    },
    {
        t: 'Só indicação',
        d: 'Depende só de indicação. Quando o boca a boca seca, o caixa seca junto.',
    },
    {
        t: 'WhatsApp travado',
        d: 'Mensagem demora para ser respondida — e o lead some sem você perceber.',
    },
    {
        t: 'Pacotes fora do seu momento',
        d: 'Sabe que precisa de marketing, mas os pacotes que encontrou no mercado estão fora da sua realidade agora.',
    },
];

const Pain: React.FC = () => (
    <section className="relative py-24 md:py-32 overflow-hidden">
        <UnderwaterBackdrop variant="mid" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
                <SectionLabel className="mb-6 mx-auto">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4DD5FF]"></span>
                    A dor real
                </SectionLabel>
                <h2 className="font-serif text-3xl md:text-5xl font-semibold text-[#E8F4FF] tracking-tight leading-[1.05] mb-4">
                    Você já passou por pelo menos <span className="italic text-[#A6DEFF]">um desses.</span>
                </h2>
                <p className="text-[#B8CEE4] text-base md:text-lg max-w-2xl mx-auto">
                    Se qualquer um desses cenários te soar familiar, o Plano Essencial foi desenhado pra você.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PAIN_ITEMS.map((p, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}
                    >
                        <GlassCard className="p-6 md:p-7 h-full">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="font-serif text-[#4DD5FF] text-xl italic font-bold">
                                    0{i + 1}
                                </span>
                                <span className="text-[10px] uppercase tracking-[0.25em] text-[#A6DEFF] font-semibold">
                                    {p.t}
                                </span>
                            </div>
                            <p className="text-[#B8CEE4] text-[15px] leading-relaxed">{p.d}</p>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

// ————————————————————————————————————————————————————————————————
// SOLUTION
// ————————————————————————————————————————————————————————————————
const Solution: React.FC = () => (
    <section className="relative py-24 md:py-28 overflow-hidden">
        <UnderwaterBackdrop variant="mid" />
        <BioluminescentOrbs count={5} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <SectionLabel className="mb-6 mx-auto">
                <Sparkles size={10} />
                A solução
            </SectionLabel>
            <h2
                className="font-serif font-semibold text-[#E8F4FF] tracking-tight leading-[0.95] mb-6"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
            >
                Tudo que o seu negócio precisa.
                <br />
                <span className="italic text-[#A6DEFF]">Em um único plano.</span>
            </h2>
            <p className="text-[#B8CEE4] text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-4">
                Sem contratar gestor de tráfego separado. Sem pagar designer à parte. Sem depender de sorte no
                orgânico. Sem perder lead por demora no atendimento.
            </p>
            <p className="text-[#A6DEFF] text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
                Durante 3 meses, a ER cuida de tudo isso pra você — sem contrato longo e sem taxa de setup.
            </p>
        </div>
    </section>
);

// ————————————————————————————————————————————————————————————————
// PLANS — three tiers
// ————————————————————————————————————————————————————————————————
interface Plan {
    tag: string;
    name: string;
    tagline: string;
    sub: string;
    badge?: string;
    icon: React.ElementType;
    features: string[];
    highlight?: boolean;
}

const PLANS: Plan[] = [
    {
        tag: '01',
        name: 'Start',
        tagline: 'Primeiro passo, risco mínimo',
        sub: 'Pra quem quer começar estruturado sem dar um salto grande demais.',
        icon: Zap,
        features: [
            'Tráfego pago (Meta OU Google Ads — 1 plataforma)',
            '1 criativo profissional por mês',
            'CRM FlowDesk (configuração básica)',
            'Relatório mensal com número, sem achismo',
            'Grupo VIP com o time da ER',
        ],
    },
    {
        tag: '02',
        name: 'Essencial',
        tagline: 'Sistema completo rodando',
        sub: 'Pra quem quer o pacote completo com previsibilidade de resultado.',
        badge: 'Mais escolhido',
        icon: Crown,
        features: [
            'Tudo do Plano Start, mais:',
            'Tráfego pago em Meta E Google Ads (2 plataformas)',
            '2 criativos profissionais por mês',
            'WhatsApp com IA — atendimento 24h automatizado',
            'Relatórios semanais e mensais',
            '1 consultoria mensal de vendas e marketing',
        ],
        highlight: true,
    },
    {
        tag: '03',
        name: 'Profissional',
        tagline: 'Time dedicado, escala real',
        sub: 'Pra quem quer crescer com time dedicado e produção completa.',
        icon: Star,
        features: [
            'Tudo do Plano Essencial, mais:',
            'Social media completo (feed + stories)',
            '1 dia de captação audiovisual no seu negócio/mês',
            '5 vídeos editados por mês',
            '12 a 15 artes mensais',
            'Rastreamento avançado de conversões',
            'Reunião estratégica mensal de 1 hora',
        ],
    },
];

const Plans: React.FC<{ onCta: () => void }> = ({ onCta }) => (
    <section id="planos" className="relative py-24 md:py-32 overflow-hidden">
        <UnderwaterBackdrop variant="mid" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <SectionLabel className="mb-6 mx-auto">
                    <Target size={10} />
                    Planos
                </SectionLabel>
                <h2 className="font-serif text-3xl md:text-5xl font-semibold text-[#E8F4FF] tracking-tight leading-[1.05] mb-4">
                    Escolha o plano que faz sentido <span className="italic text-[#A6DEFF]">pro seu momento.</span>
                </h2>
                <p className="text-[#B8CEE4] text-base md:text-lg max-w-2xl mx-auto">
                    Três degraus. Um compromisso mínimo de 3 meses. Começa quando você quiser.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-5 md:gap-6">
                {PLANS.map((p, i) => {
                    const Icon = p.icon;
                    return (
                        <motion.div
                            key={p.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className={`relative ${p.highlight ? 'lg:-my-4' : ''}`}
                        >
                            {p.badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-[#4DD5FF] text-[#031224] text-[10px] font-bold tracking-[0.25em] uppercase shadow-[0_10px_30px_-5px_rgba(77,213,255,0.6)]">
                                    ★ {p.badge}
                                </div>
                            )}
                            <GlassCard
                                className={`p-7 md:p-8 h-full flex flex-col ${
                                    p.highlight
                                        ? 'border-[#4DD5FF]/50 bg-gradient-to-b from-[#4DD5FF]/[0.14] to-[#4DD5FF]/[0.04] shadow-[0_25px_60px_-15px_rgba(77,213,255,0.35)]'
                                        : ''
                                }`}
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-5">
                                    <div>
                                        <div className="font-serif italic text-3xl text-[#4DD5FF] font-bold mb-1">
                                            {p.tag}
                                        </div>
                                        <div className="text-[10px] uppercase tracking-[0.3em] text-[#A6DEFF] font-semibold">
                                            Plano
                                        </div>
                                    </div>
                                    <div className="w-11 h-11 rounded-2xl border border-[#4DD5FF]/30 bg-[#4DD5FF]/10 flex items-center justify-center text-[#A6DEFF]">
                                        <Icon size={18} />
                                    </div>
                                </div>

                                <h3 className="font-serif text-3xl md:text-4xl font-semibold text-[#E8F4FF] leading-tight mb-1">
                                    {p.name}
                                </h3>
                                <div className="font-serif italic text-xl md:text-2xl text-[#4DD5FF] leading-tight mb-4">
                                    {p.tagline}
                                </div>
                                <p className="text-[#B8CEE4] text-sm leading-relaxed mb-6 min-h-[3rem]">{p.sub}</p>

                                <p className="text-[11px] text-[#6B86A3] mb-6 tracking-wide">
                                    Contrato mínimo: 3 meses &middot; sem taxa de setup
                                </p>

                                {/* Features */}
                                <ul className="space-y-3 mb-7 flex-1">
                                    {p.features.map((f, fi) => (
                                        <li
                                            key={fi}
                                            className="flex items-start gap-3 text-[14px] text-[#B8CEE4] leading-relaxed"
                                        >
                                            <span className="shrink-0 mt-1 w-4 h-4 rounded-full bg-[#4DD5FF]/15 border border-[#4DD5FF]/40 flex items-center justify-center">
                                                <Check size={9} className="text-[#A6DEFF]" strokeWidth={3} />
                                            </span>
                                            <span className={fi === 0 && f.startsWith('Tudo') ? 'font-semibold text-[#E8F4FF]' : ''}>
                                                {f}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <OceanButton
                                    size="md"
                                    variant={p.highlight ? 'primary' : 'outline'}
                                    onClick={onCta}
                                    className="w-full justify-center"
                                >
                                    Falar sobre o {p.name}
                                    <ArrowRight size={16} />
                                </OceanButton>
                            </GlassCard>
                        </motion.div>
                    );
                })}
            </div>

            <p className="text-center text-[12px] text-[#6B86A3] mt-10 tracking-wide">
                Verba de anúncios paga diretamente por você à plataforma (Meta/Google) &middot; Sem surpresa no bolso
            </p>
        </div>
    </section>
);

// ————————————————————————————————————————————————————————————————
// AUDIENCE — three card layout (Sharks / Fish / Whales equivalent)
// ————————————————————————————————————————————————————————————————
const AUDIENCE = [
    {
        tag: '01',
        t: 'Pequenos negócios',
        d: 'Que querem parar de depender só de indicação e começar a gerar cliente de forma previsível.',
    },
    {
        tag: '02',
        t: 'Profissionais autônomos',
        d: 'Advogados, nutricionistas, personals, fotógrafos — presença paga sem precisar de pacote gigante.',
    },
    {
        tag: '03',
        t: 'Pequenas clínicas',
        d: 'Odontológicas, estéticas, veterinárias. Paciente qualificado sem pagar uma agência grande.',
    },
];

const Audience: React.FC = () => (
    <section className="relative py-24 md:py-32 overflow-hidden">
        <UnderwaterBackdrop variant="mid" />
        <BioluminescentOrbs count={5} />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
            {/* A SPACE equivalent: huge centered heading */}
            <div className="text-center mb-14">
                <SectionLabel className="mb-6 mx-auto">
                    <Users size={10} />
                    Pra quem é
                </SectionLabel>
                <h2
                    className="font-serif font-semibold text-[#E8F4FF] tracking-tight leading-[0.9] mb-3"
                    style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
                >
                    Um plano<span className="text-[#4DD5FF]">.</span>
                </h2>
                <div className="text-xl md:text-2xl text-[#A6DEFF] italic font-serif mb-5">
                    Feito pra cada momento.
                </div>
                <p className="text-[#B8CEE4] text-base md:text-lg max-w-xl mx-auto">
                    Donos de restaurante, loja, prestadora de serviço ou empreendedor que quer começar certo desde
                    o primeiro dia.
                </p>
            </div>

            {/* 3 tilted cards like Sharks/Fish/Whales */}
            <div className="grid sm:grid-cols-3 gap-5 md:gap-6">
                {AUDIENCE.map((a, i) => {
                    const tilt = i === 0 ? '-rotate-2' : i === 2 ? 'rotate-2' : '';
                    return (
                        <motion.div
                            key={a.tag}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.55, delay: i * 0.1 }}
                            className={`relative ${tilt} hover:rotate-0 transition-transform duration-500`}
                        >
                            <GlassCard className="p-6 md:p-7 h-full relative overflow-hidden">
                                {/* Light beam from top */}
                                <div
                                    className="absolute top-0 left-0 right-0 h-16 opacity-60"
                                    style={{
                                        background:
                                            'radial-gradient(ellipse at top, rgba(166,222,255,0.35) 0%, transparent 70%)',
                                    }}
                                />
                                <div className="relative">
                                    <h3 className="font-serif text-2xl md:text-3xl text-[#A6DEFF] italic font-semibold mb-3">
                                        {a.t}
                                    </h3>
                                    <p className="text-[#B8CEE4] text-[14px] leading-relaxed mb-6">{a.d}</p>
                                    <div className="font-serif italic text-[#4DD5FF] text-lg font-bold opacity-70">
                                        {a.tag}
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    </section>
);

// ————————————————————————————————————————————————————————————————
// CASES
// ————————————————————————————————————————————————————————————————
interface Case {
    name: string;
    segment: string;
    city?: string;
    channel: string;
    badge: string;
    story: string;
    result: string;
    quote?: string;
}

const CASES: Case[] = [
    {
        name: 'ITV Manaus',
        segment: 'Assistência Técnica de TV',
        city: 'Manaus',
        channel: 'Google Ads',
        badge: 'Assistência',
        story:
            'Bom serviço, cliente recorrente, mas sem sistema comercial. Dependia de indicação pura, sem previsibilidade.',
        result: '+200% de crescimento no faturamento',
        quote: 'Antes dependíamos só de indicação. Hoje o Google traz cliente novo todo dia.',
    },
    {
        name: 'Taychi Sushi Bar',
        segment: 'Restaurante Japonês',
        city: 'Manaus',
        channel: 'Meta Ads + Google Ads',
        badge: 'Restaurante',
        story:
            'Salão cheio no fim de semana, mesas vazias na semana. Sem sistema de captação ativo.',
        result: '+280% em reservas · custo por lead muito abaixo do mercado · fila de espera em 60 dias',
        quote: 'Em dois meses o sushi bar tinha fila de espera. Algo que nunca tinha acontecido antes.',
    },
    {
        name: 'La Pizza Rio',
        segment: 'Pizzaria / Delivery',
        city: 'Manaus',
        channel: 'Meta Ads',
        badge: 'Delivery',
        story:
            'Queria crescer no delivery sem depender do iFood. Construir base própria com margem maior e cliente fiel.',
        result: '+190% em pedidos diretos · custo por lead abaixo de dois dígitos · 4,1x de ROAS',
        quote: 'A taxa de conversão triplicou. E a margem foi junto porque paramos de pagar comissão de marketplace.',
    },
    {
        name: 'Amazon One',
        segment: 'Loja Local com Delivery',
        city: 'Manaus',
        channel: 'Meta Ads',
        badge: 'Varejo',
        story: 'Loja local que apostou no delivery como canal de crescimento. Operação que precisava escalar.',
        result: '+500% de crescimento nas vendas em 5 meses',
        quote: 'Nunca imaginei que uma loja do nosso tamanho pudesse crescer assim tão rápido.',
    },
    {
        name: 'Escola de Sites',
        segment: 'Infoproduto de Programação',
        city: 'Online',
        channel: 'Meta Ads',
        badge: 'Infoproduto',
        story:
            'Chegou com produto validado e a ambição de escalar via lançamento na metodologia 6 em 7.',
        result: 'Lançamento 6 em 7 concluído dentro da janela',
        quote: 'O funil funcionou do jeito que precisava. Captura, nutrição e conversão — tudo no tempo certo.',
    },
    {
        name: 'Tecno Obras',
        segment: 'Construção e Serviços',
        city: 'Manaus',
        channel: 'Meta + Google Ads',
        badge: 'Serviços',
        story:
            'Operação robusta — 8+ lojas ativas — precisava de parceiro que soubesse gerenciar tráfego em escala.',
        result: 'Gestão de tráfego em 8+ lojas simultâneas, performance uniforme',
    },
    {
        name: 'Abacazo',
        segment: 'Franquia de Alimentação',
        channel: 'Instagram Ads',
        badge: 'Franquia',
        story:
            'Usou o Instagram como principal canal de expansão — atrair clientes e crescer a rede de unidades.',
        result: '5+ unidades abertas · centenas de milhares em faturamento',
        quote: 'O Instagram virou nossa principal fonte de cliente novo em todas as unidades.',
    },
];

const Cases: React.FC = () => (
    <section className="relative py-24 md:py-32 overflow-hidden">
        <UnderwaterBackdrop variant="mid" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
                <SectionLabel className="mb-6 mx-auto">
                    <BarChart3 size={10} />
                    Cases reais
                </SectionLabel>
                <h2 className="font-serif text-3xl md:text-5xl font-semibold text-[#E8F4FF] tracking-tight leading-[1.05] mb-4">
                    Não acredite na gente. <span className="italic text-[#A6DEFF]">Acredite nos resultados.</span>
                </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
                {CASES.map((c, i) => (
                    <motion.div
                        key={c.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.55, delay: (i % 2) * 0.1 }}
                    >
                        <GlassCard className="p-6 md:p-7 h-full">
                            <div className="flex items-center justify-between gap-3 mb-4">
                                <div className="text-[10px] tracking-[0.3em] uppercase text-[#A6DEFF] font-semibold">
                                    {c.badge} &middot; {c.channel}
                                </div>
                                {c.city && (
                                    <div className="text-[10px] text-[#6B86A3] tracking-wider uppercase">{c.city}</div>
                                )}
                            </div>
                            <h3 className="font-serif text-2xl md:text-3xl text-[#E8F4FF] leading-tight mb-1">
                                {c.name}
                            </h3>
                            <div className="text-[13px] text-[#7FC4FF] mb-4">{c.segment}</div>
                            <p className="text-[#B8CEE4] text-[14px] leading-relaxed mb-5">{c.story}</p>

                            <div className="p-4 rounded-2xl border border-[#4DD5FF]/25 bg-[#4DD5FF]/10 mb-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <Flame size={12} className="text-[#4DD5FF]" />
                                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#A6DEFF] font-semibold">
                                        Resultado
                                    </span>
                                </div>
                                <p className="text-[#E8F4FF] font-medium text-[15px] leading-snug">{c.result}</p>
                            </div>

                            {c.quote && (
                                <p className="text-[#B8CEE4] italic text-[13px] leading-relaxed border-l-2 border-[#4DD5FF]/40 pl-4">
                                    "{c.quote}"
                                </p>
                            )}
                        </GlassCard>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

// ————————————————————————————————————————————————————————————————
// HOW IT WORKS — timeline
// ————————————————————————————————————————————————————————————————
const TIMELINE = [
    {
        day: 'DIA 1',
        t: 'Reunião de briefing',
        d: 'A equipe da ER entende seu negócio, público e objetivo. Você não precisa saber nada de marketing.',
    },
    {
        day: 'DIAS 2–5',
        t: 'Setup completo',
        d: 'Campanhas, CRM, WhatsApp com IA e criativo. Tudo pronto antes de você precisar fazer qualquer coisa.',
    },
    {
        day: 'DIA 7',
        t: 'Primeiro anúncio no ar',
        d: 'Sua campanha começa a rodar. Leads chegando. A IA já de plantão para responder.',
    },
    {
        day: 'TODO MÊS',
        t: 'Relatório e reunião',
        d: 'Acompanhamento, relatório e reunião estratégica para o mês seguinte.',
    },
];

const HowItWorks: React.FC = () => (
    <section className="relative py-24 md:py-32 overflow-hidden">
        <UnderwaterBackdrop variant="mid" />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
                <SectionLabel className="mb-6 mx-auto">
                    <Clock size={10} />
                    Como funciona
                </SectionLabel>
                <h2 className="font-serif text-3xl md:text-5xl font-semibold text-[#E8F4FF] tracking-tight leading-[1.05] mb-4">
                    Do contrato ao primeiro anúncio <span className="italic text-[#A6DEFF]">em menos de 7 dias.</span>
                </h2>
            </div>

            <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[22px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#4DD5FF]/40 to-transparent"></div>

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
                            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-2 w-4 h-4 rounded-full bg-[#4DD5FF] shadow-[0_0_20px_rgba(77,213,255,0.8)]"></div>
                            <div className={`pl-14 md:pl-0 w-full ${i % 2 === 0 ? 'md:text-right md:pr-10' : 'md:pl-10'}`}>
                                <div className="text-[11px] tracking-[0.3em] uppercase text-[#4DD5FF] font-bold mb-2">
                                    {step.day}
                                </div>
                                <h3 className="font-serif text-xl md:text-2xl text-[#E8F4FF] mb-2 leading-tight">
                                    {step.t}
                                </h3>
                                <p className="text-[#B8CEE4] text-[14px] leading-relaxed">{step.d}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

// ————————————————————————————————————————————————————————————————
// OBJECTIONS
// ————————————————————————————————————————————————————————————————
const OBJECTIONS = [
    {
        q: '"Não sei se cabe no meu momento."',
        a: 'Por isso temos três planos diferentes. Um único cliente novo trazido pelo anúncio já costuma cobrir várias mensalidades — a gente mostra no briefing quanto faz sentido pra sua realidade.',
    },
    {
        q: '"Já tentei tráfego pago e não funcionou."',
        a: 'Tráfego sem estratégia e sem criativo certo não funciona mesmo. O que a ER entrega é o pacote completo — campanha, arte, copy e acompanhamento.',
    },
    {
        q: '"3 meses é muito tempo de compromisso."',
        a: 'Resultado em marketing leva tempo pra otimizar. Os primeiros 30 dias são aprendizado, os 60 seguintes são aceleração. Quem sai antes de 90 dias nunca vê o real resultado.',
    },
    {
        q: '"Meu negócio é pequeno demais."',
        a: 'O Plano Start foi desenhado exatamente pra isso. Não existe negócio pequeno demais para ter cliente — existe negócio sem sistema pra atrair.',
    },
    {
        q: '"Não tenho tempo pra acompanhar."',
        a: 'Você não precisa. O grupo VIP existe pra isso — quando houver decisão a tomar, a gente te chama. O resto roda sozinho.',
    },
    {
        q: '"Qual plano escolho?"',
        a: 'Se está começando, Start. Se quer o sistema completo, Essencial. Se quer crescer com time dedicado e conteúdo, Profissional.',
    },
];

const Objections: React.FC = () => (
    <section className="relative py-24 md:py-32 overflow-hidden">
        <UnderwaterBackdrop variant="mid" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
            <div className="text-center mb-14">
                <SectionLabel className="mb-6 mx-auto">
                    <Shield size={10} />
                    Perguntas comuns
                </SectionLabel>
                <h2 className="font-serif text-3xl md:text-5xl font-semibold text-[#E8F4FF] tracking-tight leading-[1.05] mb-4">
                    O que normalmente <span className="italic text-[#A6DEFF]">passa pela cabeça.</span>
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
                    >
                        <GlassCard className="p-6 md:p-7">
                            <h3 className="font-serif italic text-lg md:text-xl text-[#A6DEFF] mb-2 leading-tight">
                                {o.q}
                            </h3>
                            <p className="text-[#B8CEE4] text-[14px] md:text-[15px] leading-relaxed">{o.a}</p>
                        </GlassCard>
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
    <section className="relative py-20 md:py-28 overflow-hidden">
        <UnderwaterBackdrop variant="mid" />
        <BioluminescentOrbs count={4} />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <SectionLabel className="mb-6 mx-auto">
                <Flame size={10} />
                Atenção
            </SectionLabel>

            <div className="flex items-baseline justify-center gap-4 mb-6">
                <span
                    className="font-serif font-bold text-[#4DD5FF] leading-none"
                    style={{
                        fontSize: 'clamp(6rem, 18vw, 12rem)',
                        textShadow: '0 0 60px rgba(77,213,255,0.55)',
                    }}
                >
                    4
                </span>
                <span className="font-serif italic text-2xl md:text-3xl text-[#A6DEFF]">vagas/mês</span>
            </div>

            <p className="text-[#B8CEE4] text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-2">
                Cada cliente recebe atenção direta da nossa equipe. Por isso, abrimos exatamente 4 vagas por mês —
                independente do plano.
            </p>
            <p className="text-[#A6DEFF] text-sm md:text-base italic mb-8">
                Se você está lendo isso agora, ainda pode ter uma vaga disponível.
            </p>

            <OceanButton size="lg" onClick={onCta} className="mx-auto">
                Garantir minha vaga agora
                <ArrowRight size={18} />
            </OceanButton>
        </div>
    </section>
);

// ————————————————————————————————————————————————————————————————
// FINAL CTA — "Don't miss it / Join us" equivalent, coral reef vibe
// ————————————————————————————————————————————————————————————————
const FinalCTA: React.FC<{ onCta: () => void }> = ({ onCta }) => (
    <section className="relative py-24 md:py-32 overflow-hidden">
        <UnderwaterBackdrop variant="reef" />
        <BioluminescentOrbs count={10} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <SectionLabel className="mb-8 mx-auto">
                <Sparkles size={10} />
                Não perca
            </SectionLabel>

            <h2
                className="font-serif font-semibold text-[#E8F4FF] tracking-tight leading-[0.9] mb-5"
                style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
            >
                Chega de depender
            </h2>
            <h3
                className="font-serif italic font-light text-[#A6DEFF] leading-[0.9] mb-10"
                style={{
                    fontSize: 'clamp(2rem, 7vw, 5rem)',
                    textShadow: '0 0 40px rgba(166,222,255,0.4)',
                }}
            >
                de indicação pra crescer.
            </h3>

            <p className="text-[#B8CEE4] text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                Chame a gente no WhatsApp — em uma conversa curta a gente descobre qual plano faz sentido pro seu
                momento. Sem compromisso.
            </p>

            <OceanButton size="lg" onClick={onCta} className="mx-auto mb-8">
                <Sparkles size={18} />
                Falar com a equipe no WhatsApp
                <ArrowRight size={18} />
            </OceanButton>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-[#6B86A3] tracking-wide max-w-2xl mx-auto">
                <span>Contrato de 3 meses</span>
                <span className="opacity-50">·</span>
                <span>Sem taxa de setup</span>
                <span className="opacity-50">·</span>
                <span>Verba de ads por conta do cliente</span>
                <span className="opacity-50">·</span>
                <span>Atendimento em até 2h</span>
            </div>
        </div>
    </section>
);

// ————————————————————————————————————————————————————————————————
// FOOTER
// ————————————————————————————————————————————————————————————————
const Footer: React.FC = () => (
    <footer className="relative py-10 border-t border-[#4DD5FF]/10 bg-[#030309]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-[#6B86A3] tracking-wider">
            <span>&copy; {new Date().getFullYear()} ER Marketing &middot; Todos os direitos reservados</span>
            <span className="uppercase">First edition &middot; 2025</span>
        </div>
    </footer>
);

// ————————————————————————————————————————————————————————————————
// MAIN
// ————————————————————————————————————————————————————————————————
export const Flowdesk: React.FC = () => {
    useEffect(() => {
        document.title = 'ER Marketing · Plano Essencial · FlowDesk';
    }, []);

    const goToWhatsApp = () => {
        trackStandard('Lead', {
            content_name: 'Flowdesk · Plano Essencial · WhatsApp CTA',
            content_category: 'flowdesk',
            value: 1,
            currency: 'BRL',
        });
        window.open(WHATSAPP, '_blank', 'noopener,noreferrer');
    };

    const scrollToPlans = () => {
        const el = document.getElementById('planos');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div
            className="min-h-screen text-[#E8F4FF] font-sans selection:bg-[#4DD5FF] selection:text-[#031224] relative overflow-x-hidden"
            style={{ backgroundColor: OCEAN.bg }}
        >
            <Hero onCta={goToWhatsApp} onScroll={scrollToPlans} />
            <Pain />
            <Solution />
            <CreativeShowcase />
            <Audience />
            <Cases />
            <LandingPagesShowcase />
            <HowItWorks />
            <Objections />
            <Urgency onCta={goToWhatsApp} />
            <Plans onCta={goToWhatsApp} />
            <FinalCTA onCta={goToWhatsApp} />
            <Footer />
        </div>
    );
};

export default Flowdesk;
