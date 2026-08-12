import React, { useEffect, useRef, useState } from 'react';
import {
    WHATSAPP,
    Arrow,
    Check,
    Eyebrow,
    EDGE_FADE,
    NorteNav,
    NorteFooter,
    IconSearch,
    IconRoute,
    IconRocket,
    IconChart,
    IconTarget,
    IconUsers,
    IconCompass,
} from './Norte/shared';
import { SERVICES } from './Norte/services';

// /norte — site institucional da Norte Marketing.
//
// Estrutura em faixas: cada seção principal ocupa a largura toda da
// tela com a sua própria cor de fundo (verde-floresta ou creme), e o
// conteúdo respira dentro de um container central. Cards arredondados
// continuam existindo, mas só no nível dos itens — não como moldura
// da seção inteira.

const SECTION = 'py-16 md:py-24';
const CONTAINER = 'max-w-[1240px] mx-auto px-5 md:px-8';

// Trilhos horizontais sangram até a borda da tela, mas o primeiro card
// nasce alinhado com o container central. O scroll-padding é obrigatório:
// sem ele o snap-mandatory encosta o primeiro card na borda do scrollport
// já no load e engole o recuo.
const RAIL_GUTTER = 'max(1.25rem, calc((100vw - 1240px) / 2))';

const RAIL_PAD: React.CSSProperties = {
    paddingLeft: RAIL_GUTTER,
    paddingRight: RAIL_GUTTER,
};

const RAIL_SCROLLER: React.CSSProperties = {
    ...EDGE_FADE,
    scrollPaddingLeft: RAIL_GUTTER,
    scrollPaddingRight: RAIL_GUTTER,
};

const STEPS = [
    { icon: IconSearch, title: 'Diagnóstico', body: 'Entender onde vaza' },
    { icon: IconRoute, title: 'Estratégia', body: 'Definir a direção' },
    { icon: IconRocket, title: 'Execução', body: 'Rodar e medir' },
    { icon: IconChart, title: 'Escala', body: 'Crescer com dado' },
];

const MISSION = [
    'Estratégia antes de criativo',
    'Cada real medido em CAC e ROAS',
    'Time fixo e nominal por conta',
    'Relatório semanal, sem achismo',
];

const LOGOS = [
    { src: '/clientes/logos/itv-manaus.png', alt: 'iTV Manaus' },
    { src: '/clientes/logos/taychi.png', alt: 'Taychi Sushi' },
    { src: '/clientes/logos/abacazo.png', alt: 'Abacazo' },
    { src: '/clientes/logos/amazon-one.png', alt: 'Amazon One' },
    { src: '/clientes/logos/a-escola-de-sites.png', alt: 'A Escola de Sites' },
    { src: '/clientes/logos/tecno-obras.png', alt: 'Tecno Obras' },
    { src: '/clientes/logos/odonto-solutions.png', alt: 'Odonto Solutions' },
    { src: '/clientes/logos/pandora-eletronicos.png', alt: 'Pandora Eletrônicos' },
    { src: '/clientes/logos/dermo-evas.png', alt: 'Dermo Ervas' },
    { src: '/clientes/logos/conceito-obras.png', alt: 'Conceito Obras' },
    { src: '/clientes/logos/bem-fisio.png', alt: 'Bem Fisio' },
    { src: '/clientes/logos/bembe-atelier.png', alt: 'Bembê Atelier' },
    { src: '/clientes/logos/propriedades-compartilhadas.png', alt: 'Propriedades Compartilhadas' },
    { src: '/clientes/logos/full-sales-system.png', alt: 'Full Sales System' },
    { src: '/clientes/logos/oli-sofi.png', alt: 'Oli e Sofi' },
    { src: '/clientes/logos/omnifit.png', alt: 'Omnifit' },
    { src: '/clientes/logos/english-vip.png', alt: 'English Vip' },
    { src: '/clientes/logos/reifel.png', alt: 'Reifel Confecções' },
    { src: '/clientes/logos/formulle-age.png', alt: 'Formulle Age' },
    { src: '/clientes/logos/studio-5.png', alt: 'Studio 5' },
    { src: '/clientes/logos/livre-leve.png', alt: 'Livre & Leve' },
    { src: '/clientes/logos/bye-singles.png', alt: 'Bye Singles' },
    { src: '/clientes/logos/infinity-cobrancas.png', alt: 'Infinity Cobranças' },
];

// Fotos do estabelecimento de cada cliente — nada de banco de imagens.
// Taychi e La Pizza vêm de frames das captações que a equipe fez na
// própria loja; iTV e Tecno Obras, de registros cedidos pelo cliente.
const CASE_CARDS = [
    {
        name: 'iTV Manaus',
        tag: 'Assistência técnica',
        metric: 'R$ 15k',
        label: 'de faturamento',
        photo: '/clientes/fotos/itv-fachada.jpg',
    },
    {
        name: 'Taychi Sushi Bar',
        tag: 'Restaurante',
        metric: '+280%',
        label: 'reservas/mês',
        photo: '/clientes/fotos/taychi-salao.jpg',
    },
    {
        name: 'La Pizza Rio',
        tag: 'Delivery',
        metric: '+190%',
        label: 'pedidos diretos',
        photo: '/clientes/fotos/lapizzario-fachada.jpg',
    },
    {
        name: 'Tecno Obras',
        tag: 'Construção',
        metric: '+500 mil',
        label: 'views/mês',
        photo: '/clientes/fotos/tecnoobras-obra.jpg',
    },
];

const RESULTS = [
    { client: 'Taychi Sushi', category: 'Restaurante', headline: '70k → 200k/mês', body: 'em 7 meses, com funis direcionados pra loja física.' },
    { client: 'Oli e Sofi', category: 'E-commerce', headline: '+300% no faturamento', body: 'do e-commerce de roupas de bebê.' },
    { client: 'Dermo Ervas', category: 'E-commerce', headline: '+200% de faturamento', body: 'do e-commerce de encapsulados.' },
    { client: 'A Escola de Sites', category: 'Infoproduto', headline: '+20 mil leads', body: 'e faturamento de múltiplos 7 dígitos.' },
    { client: 'Propriedades Compart.', category: 'Infoproduto', headline: '+10 mil leads', body: 'faturamento de 8 dígitos com funis perpétuos.' },
    { client: 'Full Sales System', category: 'Mentoria', headline: '+560 leads/mês', body: 'pra funis de ticket entre R$ 6k e R$ 30k.' },
    { client: 'Amazon One', category: 'Varejo', headline: 'R$ 1M', body: 'de faturamento em 6 meses.' },
    { client: 'Odonto Solutions', category: 'Saúde', headline: '5.193 leads a R$ 1,57', body: 'ultra qualificados pra odontologia.' },
    { client: 'Pandora Eletrônicos', category: 'Varejo', headline: '+500 leads/mês', body: 'interessados em produtos Apple.' },
    { client: 'Conceito Obras', category: 'Construção', headline: '+150 leads/mês', body: 'qualificados pra Steel Frame.' },
    { client: 'Bem Fisio', category: 'Saúde', headline: '+450 leads/mês', body: 'pro segmento fisioterápico.' },
    { client: 'Bembê Atelier', category: 'E-commerce', headline: '+167% em vendas', body: 'mensais de brinquedos de tecido.' },
    { client: 'Tecno Obras', category: 'Construção', headline: '+500 mil views/mês', body: 'Top of Mind em Curitiba.' },
    { client: 'Reifel Confecções', category: 'E-commerce', headline: 'R$ 10k → R$ 30k', body: 'por mês, em 3 meses.' },
    { client: 'Abacazo', category: 'Franquia', headline: '+3 lojas abertas', body: 'e 2 mil clientes cadastrados/mês.' },
    { client: 'App Omnifit', category: 'App', headline: '+1M de alcance', body: 'em ampliação de marca via funil KLT.' },
    { client: 'English Vip', category: 'Educação', headline: '+257% de alcance', body: 'em potenciais clientes via WhatsApp.' },
    { client: 'iTV Manaus', category: 'Serviços', headline: 'R$ 15k', body: 'de faturamento com leads a R$ 0,50/dia.' },
    { client: 'A Jogada', category: 'E-commerce', headline: '+132% em vendas', body: 'em funil direto de produto R$ 97,90.' },
];

const REELS = [
    { client: 'Taychi', title: 'Yakisoba', src: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/TAYCHI%20-%20YAKISOBA.mov', poster: '/video-posters/taychi-yakisoba-sm.jpg' },
    { client: 'La Pizza Rio', title: '5 tipos de fome', src: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/PIZZA%20RIO%20-%205%20TIPOS%20DE%20FOME.mov', poster: '/video-posters/pizza-1-fome-sm.jpg' },
    { client: 'Taychi', title: 'Montagem de combo', src: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/TAYCHI%20-%20MONTAGEM%20COMBO.mov', poster: '/video-posters/taychi-combo-sm.jpg' },
    { client: 'La Pizza Rio', title: 'Se quiser vim ver', src: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/PIZZA%20RIO%20-%20SE%20QUISER%20VIM%20VER.mov', poster: '/video-posters/pizza-2-vim-ver-sm.jpg' },
    { client: 'Taychi', title: 'Como usar o hashi', src: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/TAYCHI%20-%20COMO%20USAR%20O%20HASHI.mov', poster: '/video-posters/taychi-hashi-sm.jpg' },
    { client: 'La Pizza Rio', title: 'Será? — Trend', src: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/PIZZA%20RIO%20-%20SERA%CC%81%20TREND.mov', poster: '/video-posters/pizza-3-sera-sm.jpg' },
    { client: 'Taychi', title: 'Trend', src: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/TAYCHI%20-%20TREND.mov', poster: '/video-posters/taychi-trend-sm.jpg' },
    { client: 'YUAI', title: 'Sushi no copo', src: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/YUAI%20-%20SUSHI%20NO%20COPO.mov', poster: '/video-posters/yuai-sushi-copo-sm.jpg' },
];

const PARTNERS = [
    { name: 'Ed Rodrigues', role: 'Gestor estratégico', photo: '/socios/ed-cut.png' },
    { name: 'Brenno Soares', role: 'Administrador', photo: '/socios/brenno-cut.png' },
    { name: 'Francyelle Barbosa', role: 'Diretora de conteúdo', photo: '/socios/francyelle-cut.png' },
];

const FAQS = [
    { q: 'Como funciona a primeira conversa?', a: 'Você chama no WhatsApp, a gente entende o momento do teu negócio e devolve um plano claro de por onde começar. Sem compromisso e sem call de vendas disfarçada.' },
    { q: 'Qual o investimento pra começar?', a: 'Não trabalhamos com pacote fechado. O projeto é desenhado pro teu momento e objetivo — focamos em negócios que já investem em marketing ou têm capacidade pra começar.' },
    { q: 'Quais nichos vocês atendem?', a: 'A metodologia é agnóstica de nicho. Temos cases em e-commerce, infoproduto, food service, saúde, construção, varejo local e educação — em Manaus e fora.' },
    { q: 'A Norte faz só tráfego pago?', a: 'Não. Somos agência 360: tráfego, social media, branding, sites, captação de conteúdo e eventos. Cada frente alimenta a outra.' },
    { q: 'Em quanto tempo vejo resultado?', a: 'Os primeiros 30 dias são de calibração (tracking, público, criativo). Dos 60 aos 90 dias a curva acelera. Quem desliga antes disso nunca vê o canal maduro.' },
];

// ─── Reel card (vídeo só baixa quando chega perto do viewport) ───────

const ReelCard: React.FC<{ reel: (typeof REELS)[number] }> = ({ reel }) => {
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(true);

    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        setLoaded(true);
                        io.disconnect();
                    }
                });
            },
            { rootMargin: '320px' },
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
        <div
            ref={wrapRef}
            onClick={toggle}
            className="snap-start flex-shrink-0 w-[200px] md:w-[230px] aspect-[9/16] relative rounded-2xl overflow-hidden bg-[#0B0E0C] cursor-pointer group"
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
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

            <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                    playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                }`}
            >
                <span className="w-10 h-10 rounded-full bg-white/95 text-[#0B0E0C] flex items-center justify-center text-[11px]">
                    {playing ? '❚❚' : '▶'}
                </span>
            </div>

            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    const v = videoRef.current;
                    if (!v) return;
                    v.muted = !v.muted;
                    setMuted(v.muted);
                }}
                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm text-white text-[10px] flex items-center justify-center hover:bg-[#8DC63F] hover:text-[#0B0E0C] transition-colors"
                aria-label={muted ? 'Ativar som' : 'Silenciar'}
            >
                {muted ? '🔇' : '🔊'}
            </button>

            <div className="absolute bottom-3 left-3 right-3">
                <p className="text-[9px] tracking-[0.18em] uppercase text-white/65">{reel.client}</p>
                <p className="text-white font-semibold text-[13px] leading-tight">{reel.title}</p>
            </div>
        </div>
    );
};

// ─── Página ─────────────────────────────────────────────────────────

const NorteLanding: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const resultsRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollResults = (dir: 1 | -1) => {
        resultsRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#F4F1E9] text-[#0B0E0C] font-sans antialiased selection:bg-[#8DC63F] selection:text-[#0B0E0C]">
            <NorteNav scrolled={scrolled} />

            {/* ═══ HERO — faixa verde-floresta ═══ */}
            <section
                id="inicio"
                className="relative bg-[#14261A] text-white overflow-hidden pt-28 md:pt-32"
            >
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-[-6%] top-[-30%] w-[55%] h-[150%] rounded-full"
                    style={{
                        // ellipse, não circle: num box estreito e alto o circle
                        // é cortado pelas laterais e deixa uma emenda vertical.
                        background:
                            'radial-gradient(ellipse at center, rgba(141,198,63,0.20) 0%, rgba(141,198,63,0.05) 44%, transparent 72%)',
                    }}
                />

                <div className={`relative ${CONTAINER} pb-14 md:pb-20`}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
                        <div className="lg:col-span-7">
                            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3.5 py-1.5 text-[11px] tracking-[0.16em] uppercase font-bold text-white/85 mb-7">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
                                Agência de marketing · Manaus
                            </span>

                            <h1
                                className="font-extrabold tracking-[-0.02em] leading-[1.05] mb-6"
                                style={{ fontSize: 'clamp(32px, 4.2vw, 58px)' }}
                            >
                                A gente aponta a direção.
                                <br />
                                <span className="text-[#8DC63F]">Você caminha.</span>
                            </h1>

                            <p className="text-[15px] md:text-[17px] text-white/65 leading-relaxed max-w-xl mb-8">
                                Marketing com estratégia, criatividade e performance.
                                A Norte transforma atenção em oportunidade e
                                estratégia em resultado — do tráfego ao criativo,
                                tudo em casa.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-2.5">
                                <a
                                    href={WHATSAPP}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#8DC63F] hover:bg-[#7db32f] text-[#0B0E0C] font-bold text-sm px-6 py-3.5 transition-colors"
                                >
                                    Conversar com um estrategista
                                    <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                                </a>
                                <a
                                    href="#servicos"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 hover:bg-white/10 text-white font-bold text-sm px-6 py-3.5 transition-colors"
                                >
                                    Ver o que fazemos
                                </a>
                            </div>
                        </div>

                        <div className="lg:col-span-5 flex justify-center lg:justify-end">
                            <div className="relative w-full max-w-[310px]">
                                <div className="relative rounded-2xl bg-white/95 backdrop-blur-sm text-[#0B0E0C] p-4 shadow-[0_16px_50px_rgba(0,0,0,0.35)]">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src="/photos-food/t-1.jpg"
                                            alt=""
                                            className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                                            loading="eager"
                                        />
                                        <div className="min-w-0">
                                            <p className="font-bold text-sm leading-tight truncate">
                                                Taychi Sushi Bar
                                            </p>
                                            <p className="text-[11px] text-black/45">
                                                Restaurante · Manaus
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-end justify-between">
                                        <div>
                                            <p className="text-[26px] font-extrabold tracking-tight text-[#3d6b12] leading-none">
                                                +280%
                                            </p>
                                            <p className="text-[10px] uppercase tracking-[0.12em] text-black/40 mt-1.5">
                                                reservas/mês
                                            </p>
                                        </div>
                                        <span className="text-[11px] text-black/50">7 meses</span>
                                    </div>

                                    <div className="mt-3 h-1.5 rounded-full bg-black/8 overflow-hidden">
                                        <div className="h-full w-[86%] rounded-full bg-[#8DC63F]" />
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-black/8 flex items-center justify-between">
                                        <span className="text-[11px] text-black/45">
                                            De R$ 70k pra R$ 200k/mês
                                        </span>
                                        <a
                                            href="#cases"
                                            className="text-[11px] font-bold text-[#3d6b12] inline-flex items-center gap-1 hover:gap-1.5 transition-all"
                                        >
                                            Ver cases <Arrow className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats rodando a largura toda da faixa */}
                <div className="relative border-t border-white/10">
                    <div className={CONTAINER}>
                        <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x divide-white/10">
                            {[
                                { icon: IconChart, v: '+R$ 5M', l: 'em mídia gerida' },
                                { icon: IconTarget, v: '7.5x', l: 'ROAS médio' },
                                { icon: IconUsers, v: '+150k', l: 'leads captados' },
                                { icon: IconCompass, v: '+100', l: 'parceiros' },
                            ].map(({ icon: Icon, v, l }, i) => (
                                <div
                                    key={l}
                                    className={`flex items-center gap-3 py-5 ${i > 0 ? 'md:pl-6' : ''} ${i > 1 ? 'border-t md:border-t-0 border-white/10' : ''}`}
                                >
                                    <Icon className="w-5 h-5 text-[#8DC63F] flex-shrink-0" />
                                    <div className="min-w-0">
                                        <p className="font-extrabold tracking-tight text-lg leading-none">{v}</p>
                                        <p className="text-[11px] text-white/50 mt-0.5 truncate">{l}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Logos — faixa creme fina ═══ */}
            <section className="bg-[#F4F1E9] py-10 md:py-12 border-b border-black/5 overflow-hidden">
                <p className="text-center text-[11px] tracking-[0.2em] uppercase text-black/35 font-bold mb-8">
                    Marcas que seguiram o Norte
                </p>
                <div style={EDGE_FADE}>
                    <div className="flex gap-12 md:gap-16 animate-marquee motion-reduce:animate-none w-max">
                        {[...LOGOS, ...LOGOS].map((logo, i) => (
                            <div
                                key={`${logo.src}-${i}`}
                                className="flex-shrink-0 w-16 h-16 md:w-[70px] md:h-[70px] flex items-center justify-center"
                            >
                                <img
                                    src={logo.src}
                                    alt={logo.alt}
                                    loading="lazy"
                                    className="max-h-full max-w-full object-contain rounded-full grayscale opacity-55 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Serviços — faixa creme ═══ */}
            <section id="servicos" className={`bg-[#F4F1E9] ${SECTION}`}>
                <div className={CONTAINER}>
                    <div className="max-w-2xl mb-10 md:mb-14">
                        <Eyebrow>O que fazemos</Eyebrow>
                        <h2
                            className="mt-3 font-extrabold tracking-[-0.02em] leading-[1.08]"
                            style={{ fontSize: 'clamp(28px, 3.6vw, 46px)' }}
                        >
                            Seis frentes. Uma operação só.
                        </h2>
                        <p className="mt-4 text-[15px] md:text-base text-black/50 leading-relaxed">
                            Agência 360: cada frente alimenta a outra pra que o
                            resultado não dependa de sorte — dependa de sistema.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {SERVICES.map(({ slug, icon: Icon, name, teaser }) => (
                            <a
                                key={slug}
                                href={`/norte/${slug}`}
                                className="rounded-2xl bg-white hover:shadow-[0_12px_40px_rgba(11,14,12,0.08)] border border-black/5 hover:border-[#8DC63F] p-6 transition-all group flex flex-col"
                            >
                                <span className="inline-flex w-11 h-11 rounded-xl bg-[#F4F1E9] text-[#3d6b12] items-center justify-center mb-4 group-hover:bg-[#8DC63F] group-hover:text-[#0B0E0C] transition-colors">
                                    <Icon className="w-5 h-5" />
                                </span>
                                <h3 className="font-bold text-[16px] mb-1.5">{name}</h3>
                                <p className="text-[13px] text-black/50 leading-snug mb-4">{teaser}</p>
                                <span className="mt-auto text-[12px] font-bold text-[#3d6b12] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Ver detalhes <Arrow className="w-3.5 h-3.5" />
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Método — faixa verde-floresta ═══ */}
            <section className={`relative bg-[#14261A] text-white overflow-hidden ${SECTION}`}>
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full"
                    style={{
                        background:
                            'radial-gradient(circle, rgba(141,198,63,0.18) 0%, transparent 65%)',
                    }}
                />
                <div className={`relative ${CONTAINER}`}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                        <div className="lg:col-span-5">
                            <Eyebrow light>Nosso método</Eyebrow>
                            <h2
                                className="mt-3 font-extrabold tracking-[-0.02em] leading-[1.08] mb-5"
                                style={{ fontSize: 'clamp(28px, 3.4vw, 42px)' }}
                            >
                                Direção antes de esforço.
                            </h2>
                            <p className="text-[15px] text-white/60 leading-relaxed mb-7">
                                Cada decisão passa por uma régua: dá pra medir?
                                Se não dá, não entra no plano.
                            </p>

                            <ul className="space-y-3">
                                {MISSION.map((m) => (
                                    <li key={m} className="flex items-start gap-3">
                                        <span className="mt-0.5 w-5 h-5 rounded-md bg-[#8DC63F] text-[#0B0E0C] flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3.5 h-3.5" />
                                        </span>
                                        <span className="text-[14px] text-white/85 leading-snug">{m}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 content-start">
                            {STEPS.map(({ icon: Icon, title, body }, i) => (
                                <div key={title} className="rounded-2xl bg-white/[0.06] border border-white/10 p-5">
                                    <div className="flex items-center justify-between mb-4">
                                        <Icon className="w-6 h-6 text-[#8DC63F]" />
                                        <span className="text-[11px] font-extrabold text-white/25">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                    </div>
                                    <p className="font-bold text-[15px] leading-tight mb-1">{title}</p>
                                    <p className="text-[13px] text-white/50">{body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Resultado real — faixa branca ═══ */}
            <section id="cases" className={`bg-white ${SECTION}`}>
                <div className={CONTAINER}>
                    <div className="max-w-2xl mb-10 md:mb-14">
                        <Eyebrow>Resultado real</Eyebrow>
                        <h2
                            className="mt-3 font-extrabold tracking-[-0.02em] leading-[1.08]"
                            style={{ fontSize: 'clamp(28px, 3.6vw, 46px)' }}
                        >
                            Quem seguiu o Norte, chegou lá.
                        </h2>
                        <p className="mt-4 text-[15px] md:text-base text-black/50 leading-relaxed">
                            Negócios reais, operações reais — e o número que mudou
                            depois que a estratégia entrou.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {CASE_CARDS.map((c) => (
                            <div key={c.name} className="relative rounded-2xl overflow-hidden aspect-[4/5] group">
                                <img
                                    src={c.photo}
                                    alt={c.name}
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E0C] via-[#0B0E0C]/35 to-transparent" />
                                <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[9px] tracking-[0.12em] uppercase font-bold">
                                    {c.tag}
                                </span>
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <p className="font-bold text-[14px] leading-tight mb-2">{c.name}</p>
                                    <div className="flex items-baseline gap-1.5">
                                        <span className="text-[26px] font-extrabold tracking-tight text-[#8DC63F] leading-none">
                                            {c.metric}
                                        </span>
                                        <span className="text-[10px] text-white/70">{c.label}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Carrossel de resultados — faixa creme ═══ */}
            <section className={`bg-[#F4F1E9] ${SECTION}`}>
                <div className={CONTAINER}>
                    <div className="flex items-end justify-between gap-6 mb-8">
                        <div className="max-w-xl">
                            <Eyebrow>+100 parceiros impactados</Eyebrow>
                            <h2
                                className="mt-3 font-extrabold tracking-[-0.02em] leading-[1.08]"
                                style={{ fontSize: 'clamp(26px, 3.2vw, 40px)' }}
                            >
                                Dados. Não promessas.
                            </h2>
                        </div>
                        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
                            <button
                                type="button"
                                aria-label="Voltar"
                                onClick={() => scrollResults(-1)}
                                className="w-10 h-10 rounded-full border border-black/12 hover:bg-[#0B0E0C] hover:text-white hover:border-[#0B0E0C] transition-colors flex items-center justify-center"
                            >
                                <Arrow className="w-4 h-4 rotate-180" />
                            </button>
                            <button
                                type="button"
                                aria-label="Avançar"
                                onClick={() => scrollResults(1)}
                                className="w-10 h-10 rounded-full bg-[#0B0E0C] text-white hover:bg-[#14261A] transition-colors flex items-center justify-center"
                            >
                                <Arrow className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    ref={resultsRef}
                    className="no-scrollbar overflow-x-auto snap-x snap-mandatory scroll-smooth"
                    style={RAIL_SCROLLER}
                >
                    <div className="flex gap-3 w-max" style={RAIL_PAD}>
                        {RESULTS.map((r) => (
                            <div
                                key={r.client}
                                className="snap-start flex-shrink-0 w-[260px] rounded-2xl bg-white border border-black/5 hover:border-[#8DC63F] p-6 flex flex-col justify-between min-h-[190px] transition-colors"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <span className="font-bold text-[13px] leading-tight">{r.client}</span>
                                    <span className="text-[9px] tracking-[0.1em] uppercase text-black/40 bg-[#F4F1E9] rounded-full px-2 py-0.5 whitespace-nowrap flex-shrink-0">
                                        {r.category}
                                    </span>
                                </div>
                                <div className="mt-6">
                                    <p className="text-[20px] font-extrabold tracking-tight text-[#3d6b12] leading-tight mb-1.5">
                                        {r.headline}
                                    </p>
                                    <p className="text-[12px] text-black/50 leading-snug">{r.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Reels — faixa branca ═══ */}
            <section className={`bg-white ${SECTION}`}>
                <div className={CONTAINER}>
                    <div className="max-w-2xl mb-8">
                        <Eyebrow>Reels feitos em casa</Eyebrow>
                        <h2
                            className="mt-3 font-extrabold tracking-[-0.02em] leading-[1.08]"
                            style={{ fontSize: 'clamp(26px, 3.2vw, 40px)' }}
                        >
                            Captação, roteiro e edição.
                        </h2>
                        <p className="mt-3 text-[14px] text-black/45">
                            Toque pra reproduzir · ative o som no canto
                        </p>
                    </div>
                </div>

                <div
                    className="no-scrollbar overflow-x-auto snap-x snap-mandatory scroll-smooth"
                    style={RAIL_SCROLLER}
                >
                    <div className="flex gap-3 w-max" style={RAIL_PAD}>
                        {REELS.map((r) => (
                            <ReelCard key={r.src} reel={r} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Sobre + Sócios — faixa verde-floresta ═══ */}
            <section id="sobre" className={`relative bg-[#14261A] text-white overflow-hidden ${SECTION}`}>
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full"
                    style={{
                        background:
                            'radial-gradient(circle, rgba(141,198,63,0.16) 0%, transparent 65%)',
                    }}
                />
                <div className={`relative ${CONTAINER}`}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                        <div className="lg:col-span-5">
                            <Eyebrow light>Por que Norte?</Eyebrow>
                            <h2
                                className="mt-3 font-extrabold tracking-[-0.02em] leading-[1.08] mb-5"
                                style={{ fontSize: 'clamp(28px, 3.4vw, 42px)' }}
                            >
                                Um nome que é bússola e origem.
                            </h2>
                            <div className="space-y-4 text-[15px] text-white/65 leading-relaxed">
                                <p>
                                    Norte é direção: o ponteiro da bússola que tira o
                                    negócio do improviso e coloca num caminho medido.
                                </p>
                                <p>
                                    E Norte é origem: nascemos em Manaus, provando que
                                    daqui se constrói marketing de padrão nacional.
                                </p>
                            </div>
                            <p className="mt-7 text-[16px] font-bold text-[#8DC63F]">
                                A gente aponta a direção. Você caminha.
                            </p>
                        </div>

                        <div className="lg:col-span-7">
                            <p className="text-[11px] tracking-[0.18em] uppercase font-bold text-white/45 mb-5">
                                Quem assina pelo projeto
                            </p>
                            <div className="grid grid-cols-3 gap-3">
                                {PARTNERS.map((p) => (
                                    <div key={p.name}>
                                        <div
                                            className="relative rounded-2xl overflow-hidden aspect-[3/4] mb-3"
                                            style={{
                                                background:
                                                    'linear-gradient(165deg, #1d3423 0%, #14261A 55%, #0B0E0C 100%)',
                                            }}
                                        >
                                            <div
                                                aria-hidden="true"
                                                className="absolute inset-0"
                                                style={{
                                                    background:
                                                        'radial-gradient(circle at 72% 26%, rgba(141,198,63,0.28) 0%, transparent 58%)',
                                                }}
                                            />
                                            <img
                                                src={p.photo}
                                                alt={p.name}
                                                loading="lazy"
                                                className="absolute inset-0 w-full h-full object-contain object-bottom"
                                            />
                                        </div>
                                        <p className="font-bold text-[13px] leading-tight">{p.name}</p>
                                        <p className="text-[11px] text-white/45 mt-0.5">{p.role}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ FAQ — faixa creme ═══ */}
            <section className={`bg-[#F4F1E9] ${SECTION}`}>
                <div className="max-w-[880px] mx-auto px-5 md:px-8">
                    <div className="mb-8">
                        <Eyebrow>Perguntas frequentes</Eyebrow>
                        <h2
                            className="mt-3 font-extrabold tracking-[-0.02em] leading-[1.08]"
                            style={{ fontSize: 'clamp(26px, 3.2vw, 40px)' }}
                        >
                            O que você devia perguntar.
                        </h2>
                    </div>

                    <div className="divide-y divide-black/8 border-y border-black/8">
                        {FAQS.map((f, i) => {
                            const open = openFaq === i;
                            return (
                                <div key={f.q}>
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaq(open ? null : i)}
                                        className="w-full flex items-center justify-between gap-5 text-left py-5 group"
                                    >
                                        <span className="font-bold text-[15px] md:text-base leading-snug">
                                            {f.q}
                                        </span>
                                        <span
                                            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${
                                                open
                                                    ? 'bg-[#8DC63F] rotate-45'
                                                    : 'bg-black/[0.06] group-hover:bg-black/10'
                                            }`}
                                        >
                                            +
                                        </span>
                                    </button>
                                    <div
                                        className={`grid transition-all duration-300 ease-out ${
                                            open
                                                ? 'grid-rows-[1fr] opacity-100 pb-6'
                                                : 'grid-rows-[0fr] opacity-0'
                                        }`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="text-[14px] md:text-[15px] text-black/55 leading-relaxed pr-10">
                                                {f.a}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══ Contato — faixa verde-limão ═══ */}
            <section id="contato" className={`bg-[#8DC63F] text-[#0B0E0C] ${SECTION}`}>
                <div className={CONTAINER}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                        <div className="lg:col-span-7">
                            <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-bold text-[#0B0E0C]/60">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0B0E0C]" />
                                Contato
                            </span>
                            <h2
                                className="mt-3 font-extrabold tracking-[-0.03em] leading-[1.02] mb-5"
                                style={{ fontSize: 'clamp(34px, 5vw, 68px)' }}
                            >
                                Vamos crescer juntos?
                            </h2>
                            <p className="text-[15px] md:text-[17px] text-[#0B0E0C]/70 leading-relaxed max-w-lg mb-8">
                                Seja tráfego, conteúdo, branding ou o pacote completo —
                                estamos prontos pra conversar sobre o seu negócio.
                            </p>
                            <a
                                href={WHATSAPP}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-3 rounded-full bg-[#0B0E0C] hover:bg-[#14261A] text-white font-bold text-sm md:text-base px-8 py-4 transition-colors"
                            >
                                Chamar no WhatsApp
                                <Arrow className="w-4 h-4 text-[#8DC63F] transition-transform group-hover:translate-x-0.5" />
                            </a>
                        </div>

                        <div className="lg:col-span-5 space-y-3">
                            {[
                                ['WhatsApp', '(92) 98514-6299'],
                                ['E-mail', 'contato@trafegomanaus.com.br'],
                                ['Onde', 'Manaus · Amazonas · Brasil'],
                                ['Modelo', 'Agência 360'],
                            ].map(([k, v]) => (
                                <div
                                    key={k}
                                    className="flex gap-5 border-b border-[#0B0E0C]/15 pb-3 last:border-0"
                                >
                                    <span className="w-24 flex-shrink-0 text-[10px] tracking-[0.16em] uppercase font-bold text-[#0B0E0C]/50 pt-1">
                                        {k}
                                    </span>
                                    <span className="font-semibold text-[15px]">{v}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <NorteFooter />
        </div>
    );
};

export default NorteLanding;
