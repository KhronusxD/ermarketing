import React, { useEffect, useState } from 'react';

// /norte — LP institucional da Norte Marketing (rebrand da ER).
// Estrutura inspirada na referência agroflorestasurucua.com.br:
// nav pill flutuante, hero editorial com muito respiro, seções de
// serviço, storytelling do nome e contato rico — mas aplicada na
// identidade dark da Norte (preto + verde floresta + verde-limão).
//
// Paleta (do estudo de marca):
//   preto   #0B0E0C   fundo base
//   verde   #14261A   painéis verde-floresta
//   limão   #8DC63F   acento
//   branco  #F5F5F0   texto
//
// Tipografia: Inter (bundle existente). Display em weight 800/900 com
// tracking apertado — deliberadamente diferente do Anton brutalist da
// ER pra separar as marcas.

const WHATSAPP =
    'https://wa.me/5592985146299?text=' +
    encodeURIComponent('Olá! Vim pelo site da Norte e quero conversar sobre marketing.');

const LIME = '#8DC63F';

// Seta "n" da marca — aproximação em outline do símbolo do logo,
// usada como elemento gráfico decorativo de fundo.
const ArrowN: React.FC<{ className?: string; stroke?: string; opacity?: number }> = ({
    className = '',
    stroke = LIME,
    opacity = 0.14,
}) => (
    <svg
        viewBox="0 0 240 260"
        fill="none"
        aria-hidden="true"
        className={className}
        style={{ opacity }}
    >
        <path
            d="M40 250 V120 a80 80 0 0 1 160 0 V250"
            stroke={stroke}
            strokeWidth="6"
            strokeLinecap="round"
        />
        <path
            d="M150 78 L212 16 M212 16 h-52 M212 16 v52"
            stroke={stroke}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

// Linhas topográficas sutis (motivo do material da marca).
const Contours: React.FC<{ className?: string }> = ({ className = '' }) => (
    <svg
        viewBox="0 0 600 600"
        fill="none"
        aria-hidden="true"
        className={className}
        preserveAspectRatio="xMidYMid slice"
    >
        {[0, 1, 2, 3, 4, 5].map((i) => (
            <path
                key={i}
                d={`M-50 ${420 - i * 52} C 120 ${360 - i * 48}, 260 ${470 - i * 55}, 420 ${390 - i * 50} S 640 ${430 - i * 46}, 700 ${360 - i * 50}`}
                stroke={LIME}
                strokeOpacity={0.07}
                strokeWidth="1.5"
            />
        ))}
    </svg>
);

const SERVICES = [
    {
        title: 'Tráfego Pago',
        body: 'Meta, Google e TikTok Ads com régua de CAC e ROAS. Verba tratada como investimento, não como aposta.',
    },
    {
        title: 'Social Media',
        body: 'Feed e stories com planejamento editorial que posiciona a marca e sustenta o funil o mês inteiro.',
    },
    {
        title: 'Branding',
        body: 'Identidade que faz a marca ser lembrada — e escolhida. Do naming ao manual de aplicação.',
    },
    {
        title: 'Sites e Landing Pages',
        body: 'Páginas rápidas, rastreáveis e desenhadas pra converter. Pixel e CAPI configurados desde o dia um.',
    },
    {
        title: 'Captação de Conteúdo',
        body: 'Equipe audiovisual presencial dentro do teu negócio. Bastidor, produto e time viram criativo que vende.',
    },
    {
        title: 'Eventos',
        body: 'Ativações que viram conteúdo e conteúdo que vira venda. Planejamento, cobertura e pós-evento.',
    },
];

const CASES = [
    {
        client: 'Taychi Sushi Bar',
        metric: '+280%',
        label: 'em reservas mensais',
        detail: 'De R$ 70k pra R$ 200k/mês em 7 meses. Fila de espera no fim de semana.',
    },
    {
        client: 'La Pizza Rio',
        metric: '+190%',
        label: 'em pedidos diretos',
        detail: 'Delivery próprio via WhatsApp com 4.1x de retorno em mídia e CPL de R$ 9,40.',
    },
    {
        client: 'Amazon One',
        metric: 'R$ 1M',
        label: 'em 6 meses',
        detail: 'Varejo local que escalou com campanhas de conversão e criativo de produto.',
    },
];

const NAV_LINKS = [
    { label: 'Início', href: '#inicio' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Cases', href: '#cases' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Contato', href: '#contato' },
];

const NorteLanding: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="min-h-screen bg-[#0B0E0C] text-[#F5F5F0] font-sans selection:bg-[#8DC63F] selection:text-[#0B0E0C]">
            {/* ─── Nav pill flutuante ─── */}
            <header className="fixed top-4 left-0 right-0 z-50 px-4">
                <div
                    className={`max-w-[1200px] mx-auto flex items-center justify-between gap-4 rounded-full border px-5 py-3 transition-all duration-300 ${
                        scrolled
                            ? 'bg-[#0B0E0C]/90 backdrop-blur-md border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.5)]'
                            : 'bg-white/[0.04] backdrop-blur-sm border-white/10'
                    }`}
                >
                    <a href="#inicio" className="flex items-center flex-shrink-0">
                        <img
                            src="/norte/logo-branca.png"
                            alt="Norte · Agência de Marketing"
                            className="h-16 w-auto -my-4 object-contain"
                        />
                    </a>

                    <nav className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                className="px-4 py-2 rounded-full text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                {l.label}
                            </a>
                        ))}
                    </nav>

                    <a
                        href={WHATSAPP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 inline-flex items-center gap-2 rounded-full bg-[#8DC63F] hover:bg-[#9fd85a] text-[#0B0E0C] font-bold text-sm px-5 py-2.5 transition-colors"
                    >
                        <span className="hidden sm:inline">Falar com a Norte</span>
                        <span className="sm:hidden">WhatsApp</span>
                        <span aria-hidden="true">→</span>
                    </a>
                </div>
            </header>

            {/* ─── Hero ─── */}
            <section
                id="inicio"
                className="relative min-h-screen flex items-center overflow-hidden pt-28"
            >
                <Contours className="absolute inset-0 w-full h-full" />
                <ArrowN className="absolute -right-16 top-1/2 -translate-y-1/2 w-[420px] md:w-[560px] rotate-6" />

                <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-16 md:py-24">
                    <p className="inline-flex items-center gap-2 rounded-full border border-[#8DC63F]/30 bg-[#8DC63F]/5 px-4 py-1.5 text-[11px] tracking-[0.25em] uppercase text-[#8DC63F] font-bold mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] animate-pulse" />
                        Agência de marketing · Manaus
                    </p>

                    <h1
                        className="font-extrabold tracking-tight leading-[1.02] mb-8 max-w-4xl"
                        style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}
                    >
                        A gente aponta
                        <br />a <span className="text-[#8DC63F]">direção.</span>
                        <br />
                        Você caminha.
                    </h1>

                    <p className="text-lg md:text-xl text-white/65 leading-relaxed max-w-2xl mb-10">
                        Marketing com estratégia, criatividade e performance.
                        A Norte transforma atenção em oportunidade e estratégia
                        em resultado — do tráfego ao criativo, tudo em casa.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href={WHATSAPP}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#8DC63F] hover:bg-[#9fd85a] text-[#0B0E0C] font-bold text-base px-8 py-4 transition-all shadow-[0_0_50px_rgba(141,198,63,0.25)]"
                        >
                            Conversar com um estrategista
                            <span className="transition-transform group-hover:translate-x-1">
                                →
                            </span>
                        </a>
                        <a
                            href="#servicos"
                            className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 hover:border-white/50 text-white font-bold text-base px-8 py-4 transition-colors"
                        >
                            Ver o que fazemos
                        </a>
                    </div>

                    {/* Métricas resumidas */}
                    <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-8 max-w-3xl">
                        {[
                            { v: '+R$ 5M', l: 'em mídia gerida' },
                            { v: '7.5x', l: 'ROAS médio' },
                            { v: '+150k', l: 'leads captados' },
                            { v: '+100', l: 'parceiros' },
                        ].map((m) => (
                            <div key={m.l}>
                                <span className="block text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                                    {m.v}
                                </span>
                                <span className="block text-xs uppercase tracking-[0.18em] text-white/45 mt-1">
                                    {m.l}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Serviços ─── */}
            <section id="servicos" className="relative bg-[#14261A] overflow-hidden">
                <Contours className="absolute inset-0 w-full h-full" />
                <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24 md:py-32">
                    <div className="max-w-2xl mb-14 md:mb-20">
                        <p className="text-[11px] tracking-[0.25em] uppercase text-[#8DC63F] font-bold mb-4">
                            O que fazemos
                        </p>
                        <h2
                            className="font-extrabold tracking-tight leading-[1.05]"
                            style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
                        >
                            Seis frentes.
                            <br />
                            <span className="text-[#8DC63F]">Uma operação só.</span>
                        </h2>
                        <p className="mt-5 text-base md:text-lg text-white/60 leading-relaxed">
                            Agência 360: cada frente alimenta a outra pra que o
                            resultado não dependa de sorte — dependa de sistema.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {SERVICES.map((s, i) => (
                            <div
                                key={s.title}
                                className="rounded-3xl bg-[#0B0E0C]/60 border border-white/10 hover:border-[#8DC63F]/50 p-7 md:p-8 transition-colors group"
                            >
                                <span className="block text-[#8DC63F] font-extrabold text-sm tracking-[0.2em] mb-4">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <h3 className="text-xl md:text-2xl font-extrabold tracking-tight mb-3 group-hover:text-[#8DC63F] transition-colors">
                                    {s.title}
                                </h3>
                                <p className="text-sm md:text-base text-white/60 leading-relaxed">
                                    {s.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Cases ─── */}
            <section id="cases" className="relative overflow-hidden">
                <ArrowN className="absolute -left-20 bottom-0 w-[380px] -rotate-12" opacity={0.08} />
                <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24 md:py-32">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
                        <div className="max-w-xl">
                            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8DC63F] font-bold mb-4">
                                Resultado real
                            </p>
                            <h2
                                className="font-extrabold tracking-tight leading-[1.05]"
                                style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
                            >
                                Quem seguiu o Norte,
                                <br />
                                <span className="text-[#8DC63F]">chegou lá.</span>
                            </h2>
                        </div>
                        <p className="text-base text-white/55 leading-relaxed max-w-sm">
                            A mesma operação, o mesmo método — documentado em
                            número, não em promessa.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {CASES.map((c) => (
                            <div
                                key={c.client}
                                className="rounded-3xl bg-[#14261A] border border-white/10 p-7 md:p-9 flex flex-col justify-between min-h-[280px]"
                            >
                                <span className="text-xs tracking-[0.2em] uppercase text-white/50">
                                    {c.client}
                                </span>
                                <div className="mt-8">
                                    <span className="block text-5xl md:text-6xl font-extrabold tracking-tight text-[#8DC63F] mb-1">
                                        {c.metric}
                                    </span>
                                    <span className="block text-sm uppercase tracking-[0.15em] text-white/60 mb-4">
                                        {c.label}
                                    </span>
                                    <p className="text-sm text-white/60 leading-relaxed">
                                        {c.detail}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Por que Norte ─── */}
            <section id="sobre" className="relative bg-[#14261A] overflow-hidden">
                <ArrowN className="absolute right-8 top-1/2 -translate-y-1/2 w-[300px] md:w-[420px] hidden lg:block" opacity={0.1} />
                <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24 md:py-32">
                    <div className="max-w-2xl">
                        <p className="text-[11px] tracking-[0.25em] uppercase text-[#8DC63F] font-bold mb-4">
                            Por que Norte?
                        </p>
                        <h2
                            className="font-extrabold tracking-tight leading-[1.05] mb-8"
                            style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
                        >
                            Um nome que é
                            <br />
                            <span className="text-[#8DC63F]">bússola e origem.</span>
                        </h2>
                        <div className="space-y-5 text-base md:text-lg text-white/70 leading-relaxed">
                            <p>
                                Norte é direção. É o ponteiro da bússola que tira
                                o negócio do improviso e coloca num caminho
                                medido — com meta, métrica e próximo passo claro.
                            </p>
                            <p>
                                E Norte também é origem: nascemos em Manaus, no
                                Norte do Brasil, provando todos os dias que daqui
                                se constrói marketing de padrão nacional. Mais de
                                sete anos de operação, +R$ 5 milhões em mídia
                                gerida e mais de 100 parceiros atendidos.
                            </p>
                            <p className="text-white font-semibold">
                                A gente aponta a direção. Você caminha.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Contato ─── */}
            <section id="contato" className="relative overflow-hidden">
                <Contours className="absolute inset-0 w-full h-full" />
                <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24 md:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8DC63F] font-bold mb-4">
                                Contato
                            </p>
                            <h2
                                className="font-extrabold tracking-tight leading-[1.05] mb-6"
                                style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}
                            >
                                Vamos crescer
                                <br />
                                <span className="text-[#8DC63F]">juntos?</span>
                            </h2>
                            <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-md mb-8">
                                Seja tráfego, conteúdo, branding ou o pacote
                                completo — estamos prontos pra conversar sobre o
                                seu negócio.
                            </p>
                            <a
                                href={WHATSAPP}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-3 rounded-full bg-[#8DC63F] hover:bg-[#9fd85a] text-[#0B0E0C] font-bold text-base px-8 py-4 transition-all shadow-[0_0_50px_rgba(141,198,63,0.25)]"
                            >
                                Chamar no WhatsApp
                                <span className="transition-transform group-hover:translate-x-1">
                                    →
                                </span>
                            </a>
                        </div>

                        <div className="rounded-3xl bg-[#14261A] border border-white/10 p-8 md:p-10 space-y-5">
                            {[
                                { k: 'WhatsApp', v: '(92) 98514-6299' },
                                { k: 'Site', v: 'trafegomanaus.com.br' },
                                { k: 'Onde', v: 'Manaus · Amazonas · Brasil' },
                                { k: 'Modelo', v: 'Agência 360 · estratégia, criatividade e performance' },
                            ].map((r) => (
                                <div
                                    key={r.k}
                                    className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 border-b border-white/10 pb-4 last:border-0 last:pb-0"
                                >
                                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#8DC63F] font-bold w-24 flex-shrink-0">
                                        {r.k}
                                    </span>
                                    <span className="text-base text-white/85">{r.v}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Footer ─── */}
            <footer className="border-t border-white/10">
                <div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <img
                        src="/norte/logo-branca.png"
                        alt="Norte · Agência de Marketing"
                        className="h-20 w-auto object-contain"
                    />
                    <p className="text-xs text-white/40 text-center md:text-right leading-relaxed">
                        © {new Date().getFullYear()} Norte · Agência de Marketing
                        · CNPJ 41.079.306/0001-62
                        <br />
                        Manaus, AM · contato@trafegomanaus.com.br
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default NorteLanding;
