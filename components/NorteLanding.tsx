import React, { useEffect, useRef, useState } from 'react';

// /norte — LP institucional da Norte Marketing (rebrand da ER).
// Direção de arte: minimalismo light. Fundo branco quente, tipografia
// preta com acentos em verde-limão, hairlines finas, muito respiro.
// Traz a estrutura da home da ER (clientes, cases, reels, sócios)
// adaptada — sem Anton brutalist, sem seções dark pesadas.
//
// Performance: componente único, zero libs novas, imagens lazy,
// vídeos só carregam via IntersectionObserver quando se aproximam
// do viewport. Animações são CSS puro.
//
// Paleta (estudo de marca):
//   preto    #0B0E0C   texto
//   floresta #14261A   destaques profundos / footer
//   limão    #8DC63F   acento
//   branco   #FDFDFB   fundo

const WHATSAPP =
    'https://wa.me/5592985146299?text=' +
    encodeURIComponent('Olá! Vim pelo site da Norte e quero conversar sobre marketing.');

const LIME = '#8DC63F';
const INK = '#0B0E0C';

// ─── Motivos gráficos da marca (SVG leve) ───────────────────────────

const ArrowN: React.FC<{ className?: string; stroke?: string; opacity?: number }> = ({
    className = '',
    stroke = LIME,
    opacity = 0.18,
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
            strokeWidth="5"
            strokeLinecap="round"
        />
        <path
            d="M150 78 L212 16 M212 16 h-52 M212 16 v52"
            stroke={stroke}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

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
                strokeOpacity={0.14}
                strokeWidth="1.5"
            />
        ))}
    </svg>
);

// ─── Dados (trazidos da home da ER) ─────────────────────────────────

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
        body: 'Páginas rápidas, rastreáveis e desenhadas pra converter. Pixel e CAPI desde o dia um.',
    },
    {
        title: 'Captação de Conteúdo',
        body: 'Equipe audiovisual presencial dentro do teu negócio. Bastidor e produto viram criativo que vende.',
    },
    {
        title: 'Eventos',
        body: 'Ativações que viram conteúdo e conteúdo que vira venda. Planejamento, cobertura e pós-evento.',
    },
];

// Cases em destaque — os dois hyperlocais com foto (mesmos da home ER).
const FEATURED = [
    {
        name: 'Taychi Sushi Bar',
        tag: 'Restaurante · Manaus',
        photo: '/photos-food/t-1.jpg',
        problem:
            'Salão cheio no fim de semana, mesas vazias na semana. Dependia 100% de indicação.',
        stats: [
            { v: '+280%', l: 'reservas mensais' },
            { v: '7 meses', l: 'de 70k pra 200k/mês' },
            { v: 'fila', l: 'de espera no fim de semana' },
        ],
        quote: 'Em dois meses o sushi bar tinha fila de espera. Algo que nunca tinha acontecido antes.',
    },
    {
        name: 'La Pizza Rio',
        tag: 'Pizzaria · Manaus',
        photo: '/photos-food/p-1.jpg',
        problem:
            'Crescer o delivery sem depender de marketplace — base própria, margem maior, cliente que volta.',
        stats: [
            { v: '+190%', l: 'pedidos diretos no WhatsApp' },
            { v: '4.1x', l: 'retorno em mídia' },
            { v: 'R$ 9,40', l: 'custo por lead' },
        ],
        quote: 'A conversão triplicou. E a margem foi junto porque paramos de pagar comissão de marketplace.',
    },
];

// Carrossel de resultados — mesmos 19 cases reais da home da ER.
const RESULTS = [
    { client: 'Taychi Sushi', category: 'Restaurante', headline: '70k → 200k/mês', body: 'em 7 meses, com funis direcionados pra loja física.' },
    { client: 'Oli e Sofi', category: 'E-commerce', headline: '+300% no faturamento', body: 'do e-commerce de roupas de bebê.' },
    { client: 'Dermo Ervas', category: 'E-commerce', headline: '+200% de faturamento', body: 'do e-commerce de encapsulados.' },
    { client: 'A Escola de Sites', category: 'Infoproduto', headline: '+20 mil leads', body: 'e faturamento de múltiplos 7 dígitos em lançamentos.' },
    { client: 'Propriedades Compartilhadas', category: 'Infoproduto', headline: '+10 mil leads · 8 dígitos', body: 'com funis perpétuos rodando.' },
    { client: 'Full Sales System', category: 'Mentoria', headline: '+560 leads/mês', body: 'pra funis de ticket entre R$ 6k e R$ 30k.' },
    { client: 'Amazon One', category: 'Varejo local', headline: 'R$ 1M de faturamento', body: 'em 6 meses de estratégia de leads.' },
    { client: 'Odonto Solutions', category: 'Saúde', headline: '5.193 leads a R$ 1,57', body: 'ultra qualificados pra odontologia.' },
    { client: 'Pandora Eletrônicos', category: 'Varejo', headline: '+500 leads/mês', body: 'interessados em produtos Apple.' },
    { client: 'Conceito Obras', category: 'Construção', headline: '+150 leads/mês', body: 'qualificados pra Steel Frame.' },
    { client: 'Bem Fisio', category: 'Saúde', headline: '+450 leads/mês', body: 'pro segmento fisioterápico.' },
    { client: 'Bembê Atelier', category: 'E-commerce', headline: '+167% em vendas', body: 'mensais de brinquedos de tecido.' },
    { client: 'Tecno Obras', category: 'Construção', headline: '+500 mil views/mês', body: 'Top of Mind em construções em Curitiba.' },
    { client: 'Reifel Confecções', category: 'E-commerce', headline: 'R$ 10k → R$ 30k/mês', body: 'em 3 meses de e-commerce.' },
    { client: 'Abacazo', category: 'Franquia', headline: '+3 lojas abertas', body: 'e 2 mil clientes cadastrados por mês.' },
    { client: 'App Omnifit', category: 'App', headline: '+1M de alcance', body: 'em ampliação de marca via funil KLT.' },
    { client: 'English Vip', category: 'Educação', headline: '+257% de alcance', body: 'em potenciais clientes via WhatsApp.' },
    { client: 'iTV Manaus', category: 'Serviços', headline: 'R$ 15k de faturamento', body: 'com leads a R$ 0,50/dia.' },
    { client: 'A Jogada', category: 'E-commerce', headline: '+132% em vendas', body: 'em funil direto de produto R$ 97,90.' },
];

// Reels — mesmos vídeos do R2 usados na home (lazy por IntersectionObserver).
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
    { name: 'Ed Rodrigues', role: 'Gestor estratégico', photo: '/socios/ed.jpg' },
    { name: 'Brenno Soares', role: 'Administrador', photo: '/socios/brenno.jpg' },
    { name: 'Francyelle Barbosa', role: 'Diretora de conteúdo', photo: '/socios/francyelle.jpg' },
];

const FAQS = [
    {
        q: 'Como funciona a primeira conversa?',
        a: 'Você chama no WhatsApp, a gente entende o momento do teu negócio e devolve um plano claro de por onde começar. Sem compromisso e sem call de vendas disfarçada.',
    },
    {
        q: 'Qual o investimento pra começar?',
        a: 'Não trabalhamos com pacote fechado. O projeto é desenhado pro teu momento e objetivo — focamos em negócios que já investem em marketing ou têm capacidade pra começar.',
    },
    {
        q: 'Quais nichos vocês atendem?',
        a: 'A metodologia é agnóstica de nicho. Temos cases em e-commerce, infoproduto, food service, saúde, construção, varejo local e educação — em Manaus e fora.',
    },
    {
        q: 'A Norte faz só tráfego pago?',
        a: 'Não. Somos agência 360: tráfego, social media, branding, sites, captação de conteúdo e eventos. Cada frente alimenta a outra.',
    },
    {
        q: 'Em quanto tempo vejo resultado?',
        a: 'Os primeiros 30 dias são de calibração (tracking, público, criativo). Dos 60 aos 90 dias a curva acelera. Quem desliga antes disso nunca vê o canal maduro.',
    },
];

const NAV_LINKS = [
    { label: 'Início', href: '#inicio' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Cases', href: '#cases' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Contato', href: '#contato' },
];

// ─── Reel card com lazy-load de vídeo ───────────────────────────────

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
            { rootMargin: '300px' },
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
            className="snap-start flex-shrink-0 w-[240px] md:w-[280px] aspect-[9/16] relative rounded-3xl overflow-hidden bg-[#0B0E0C] cursor-pointer group shadow-[0_8px_30px_rgba(11,14,12,0.12)]"
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
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                    playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                }`}
            >
                <span className="w-12 h-12 rounded-full bg-white/90 text-[#0B0E0C] flex items-center justify-center text-sm shadow-lg">
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
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs flex items-center justify-center hover:bg-[#8DC63F] hover:text-[#0B0E0C] transition-colors"
                aria-label={muted ? 'Ativar som' : 'Silenciar'}
            >
                {muted ? '🔇' : '🔊'}
            </button>

            <div className="absolute bottom-3 left-4 right-4">
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/70">
                    {reel.client}
                </p>
                <p className="text-white font-bold text-sm">{reel.title}</p>
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
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollResults = (dir: 1 | -1) => {
        const el = resultsRef.current;
        if (!el) return;
        el.scrollBy({ left: dir * 340, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#FDFDFB] text-[#0B0E0C] font-sans antialiased selection:bg-[#8DC63F] selection:text-[#0B0E0C]">
            {/* ─── Nav pill ─── */}
            <header className="fixed top-4 left-0 right-0 z-50 px-4">
                <div
                    className={`max-w-[1200px] mx-auto flex items-center justify-between gap-4 rounded-full border px-5 py-2.5 transition-all duration-300 ${
                        scrolled
                            ? 'bg-white/90 backdrop-blur-md border-black/10 shadow-[0_8px_30px_rgba(11,14,12,0.08)]'
                            : 'bg-white/60 backdrop-blur-sm border-black/5'
                    }`}
                >
                    <a href="#inicio" className="flex items-center flex-shrink-0">
                        <img
                            src="/norte/logo-preta.png"
                            alt="Norte · Agência de Marketing"
                            className="h-14 w-auto -my-3 object-contain"
                        />
                    </a>

                    <nav className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                className="px-4 py-2 rounded-full text-sm text-black/60 hover:text-black hover:bg-black/5 transition-colors"
                            >
                                {l.label}
                            </a>
                        ))}
                    </nav>

                    <a
                        href={WHATSAPP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 inline-flex items-center gap-2 rounded-full bg-[#0B0E0C] hover:bg-[#14261A] text-white font-semibold text-sm px-5 py-2.5 transition-colors"
                    >
                        <span className="hidden sm:inline">Falar com a Norte</span>
                        <span className="sm:hidden">WhatsApp</span>
                        <span aria-hidden="true" className="text-[#8DC63F]">→</span>
                    </a>
                </div>
            </header>

            {/* ─── Hero ─── */}
            <section id="inicio" className="relative overflow-hidden pt-36 md:pt-44">
                <Contours className="absolute inset-0 w-full h-full" />
                <ArrowN
                    className="absolute -right-12 top-24 w-[300px] md:w-[460px] rotate-6"
                    stroke={LIME}
                    opacity={0.22}
                />

                <div className="relative z-10 max-w-[1200px] mx-auto px-6 pb-16 md:pb-20">
                    <p className="inline-flex items-center gap-2 rounded-full border border-[#8DC63F]/50 bg-[#8DC63F]/10 px-4 py-1.5 text-[11px] tracking-[0.22em] uppercase text-[#3d6b12] font-bold mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
                        Agência de marketing · Manaus
                    </p>

                    <h1
                        className="font-extrabold tracking-tight leading-[1.02] mb-8 max-w-4xl"
                        style={{ fontSize: 'clamp(42px, 7.5vw, 104px)' }}
                    >
                        A gente aponta
                        <br />a{' '}
                        <span className="relative inline-block">
                            <span className="relative z-10">direção.</span>
                            <span
                                aria-hidden="true"
                                className="absolute left-0 right-0 bottom-1 md:bottom-2 h-[0.28em] bg-[#8DC63F]/50 rounded-sm"
                            />
                        </span>
                        <br />
                        Você caminha.
                    </h1>

                    <p className="text-lg md:text-xl text-black/55 leading-relaxed max-w-2xl mb-10">
                        Marketing com estratégia, criatividade e performance.
                        A Norte transforma atenção em oportunidade e estratégia
                        em resultado — do tráfego ao criativo, tudo em casa.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <a
                            href={WHATSAPP}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#0B0E0C] hover:bg-[#14261A] text-white font-bold text-base px-8 py-4 transition-colors"
                        >
                            Conversar com um estrategista
                            <span className="text-[#8DC63F] transition-transform group-hover:translate-x-1">
                                →
                            </span>
                        </a>
                        <a
                            href="#servicos"
                            className="inline-flex items-center justify-center gap-3 rounded-full border border-black/15 hover:border-black/40 text-black font-bold text-base px-8 py-4 transition-colors"
                        >
                            Ver o que fazemos
                        </a>
                    </div>

                    <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-black/10 pt-8 max-w-3xl">
                        {[
                            { v: '+R$ 5M', l: 'em mídia gerida' },
                            { v: '7.5x', l: 'ROAS médio' },
                            { v: '+150k', l: 'leads captados' },
                            { v: '+100', l: 'parceiros' },
                        ].map((m) => (
                            <div key={m.l}>
                                <span className="block text-3xl md:text-4xl font-extrabold tracking-tight">
                                    {m.v}
                                </span>
                                <span className="block text-xs uppercase tracking-[0.16em] text-black/40 mt-1">
                                    {m.l}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Logos de clientes (marquee) ─── */}
            <section className="py-14 md:py-20 border-y border-black/5 bg-white">
                <p className="text-center text-[11px] tracking-[0.25em] uppercase text-black/40 font-bold mb-10">
                    Marcas que seguiram o Norte
                </p>
                <div
                    className="overflow-hidden"
                    style={{
                        maskImage:
                            'linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)',
                        WebkitMaskImage:
                            'linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)',
                    }}
                >
                    <div className="flex gap-14 md:gap-20 animate-marquee motion-reduce:animate-none w-max">
                        {[...LOGOS, ...LOGOS].map((logo, i) => (
                            <div
                                key={`${logo.src}-${i}`}
                                className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center"
                            >
                                <img
                                    src={logo.src}
                                    alt={logo.alt}
                                    loading="lazy"
                                    className="max-h-full max-w-full object-contain rounded-full grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Serviços ─── */}
            <section id="servicos" className="relative overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32">
                    <div className="max-w-2xl mb-14 md:mb-20">
                        <p className="text-[11px] tracking-[0.25em] uppercase text-[#3d6b12] font-bold mb-4">
                            O que fazemos
                        </p>
                        <h2
                            className="font-extrabold tracking-tight leading-[1.05]"
                            style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}
                        >
                            Seis frentes.
                            <br />
                            Uma operação só.
                        </h2>
                        <p className="mt-5 text-base md:text-lg text-black/50 leading-relaxed">
                            Agência 360: cada frente alimenta a outra pra que o
                            resultado não dependa de sorte — dependa de sistema.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {SERVICES.map((s, i) => (
                            <div
                                key={s.title}
                                className="rounded-3xl bg-white border border-black/8 hover:border-[#8DC63F] hover:shadow-[0_12px_40px_rgba(141,198,63,0.15)] p-7 md:p-8 transition-all duration-300 group"
                            >
                                <span className="inline-flex w-9 h-9 rounded-full bg-[#8DC63F]/15 text-[#3d6b12] font-extrabold text-sm items-center justify-center mb-5 group-hover:bg-[#8DC63F] group-hover:text-[#0B0E0C] transition-colors">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <h3 className="text-xl font-extrabold tracking-tight mb-2.5">
                                    {s.title}
                                </h3>
                                <p className="text-sm md:text-[15px] text-black/55 leading-relaxed">
                                    {s.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Cases em destaque ─── */}
            <section id="cases" className="relative bg-white border-y border-black/5 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32">
                    <div className="max-w-2xl mb-14 md:mb-20">
                        <p className="text-[11px] tracking-[0.25em] uppercase text-[#3d6b12] font-bold mb-4">
                            Resultado real em Manaus
                        </p>
                        <h2
                            className="font-extrabold tracking-tight leading-[1.05]"
                            style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}
                        >
                            Quem seguiu o Norte,
                            <br />
                            chegou lá.
                        </h2>
                    </div>

                    <div className="space-y-16 md:space-y-24">
                        {FEATURED.map((c, i) => (
                            <div
                                key={c.name}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center"
                            >
                                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                                    <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_20px_60px_rgba(11,14,12,0.15)]">
                                        <img
                                            src={c.photo}
                                            alt={c.name}
                                            loading="lazy"
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        <span className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-sm px-4 py-1.5 text-[11px] tracking-[0.15em] uppercase font-bold text-[#0B0E0C]">
                                            {c.tag}
                                        </span>
                                    </div>
                                </div>

                                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                                    <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
                                        {c.name}
                                    </h3>
                                    <p className="text-base md:text-lg text-black/55 leading-relaxed mb-8">
                                        {c.problem}
                                    </p>

                                    <div className="grid grid-cols-3 gap-4 mb-8">
                                        {c.stats.map((s) => (
                                            <div key={s.l}>
                                                <span className="block text-2xl md:text-3xl font-extrabold tracking-tight text-[#3d6b12]">
                                                    {s.v}
                                                </span>
                                                <span className="block text-[11px] uppercase tracking-[0.12em] text-black/40 mt-1 leading-tight">
                                                    {s.l}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <blockquote className="border-l-2 border-[#8DC63F] pl-5 text-black/70 italic leading-relaxed">
                                        "{c.quote}"
                                    </blockquote>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Carrossel de resultados ─── */}
            <section className="relative overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-6 pt-24 md:pt-32">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                        <div className="max-w-xl">
                            <p className="text-[11px] tracking-[0.25em] uppercase text-[#3d6b12] font-bold mb-4">
                                +100 parceiros impactados
                            </p>
                            <h2
                                className="font-extrabold tracking-tight leading-[1.05]"
                                style={{ fontSize: 'clamp(30px, 4.5vw, 56px)' }}
                            >
                                Dados. Não promessas.
                            </h2>
                        </div>
                        <div className="hidden md:flex items-center gap-2">
                            <button
                                type="button"
                                aria-label="Voltar"
                                onClick={() => scrollResults(-1)}
                                className="w-11 h-11 rounded-full border border-black/15 hover:bg-[#0B0E0C] hover:text-white transition-colors flex items-center justify-center"
                            >
                                ←
                            </button>
                            <button
                                type="button"
                                aria-label="Avançar"
                                onClick={() => scrollResults(1)}
                                className="w-11 h-11 rounded-full bg-[#0B0E0C] text-white hover:bg-[#14261A] transition-colors flex items-center justify-center"
                            >
                                →
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    ref={resultsRef}
                    className="overflow-x-auto overflow-y-hidden snap-x snap-mandatory pb-16 md:pb-24 scroll-smooth"
                    style={{ scrollbarWidth: 'thin' }}
                >
                    <div className="flex gap-4 pl-[max(1.5rem,calc((100vw-1200px)/2+1.5rem))] pr-[max(1.5rem,calc((100vw-1200px)/2+1.5rem))]">
                        {RESULTS.map((r) => (
                            <div
                                key={r.client}
                                className="snap-start flex-shrink-0 w-[280px] md:w-[320px] rounded-3xl bg-white border border-black/8 hover:border-[#8DC63F] p-7 flex flex-col justify-between min-h-[240px] transition-colors"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <span className="font-bold text-sm">{r.client}</span>
                                    <span className="text-[10px] tracking-[0.12em] uppercase text-black/40 border border-black/10 rounded-full px-2.5 py-1 whitespace-nowrap">
                                        {r.category}
                                    </span>
                                </div>
                                <div className="mt-8">
                                    <span className="block text-2xl md:text-[26px] font-extrabold tracking-tight text-[#3d6b12] mb-2">
                                        {r.headline}
                                    </span>
                                    <p className="text-sm text-black/55 leading-relaxed">
                                        {r.body}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Reels ─── */}
            <section className="relative bg-white border-y border-black/5 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-6 pt-24 md:pt-28">
                    <div className="max-w-2xl mb-10">
                        <p className="text-[11px] tracking-[0.25em] uppercase text-[#3d6b12] font-bold mb-4">
                            Reels produzidos por nós
                        </p>
                        <h2
                            className="font-extrabold tracking-tight leading-[1.05]"
                            style={{ fontSize: 'clamp(30px, 4.5vw, 56px)' }}
                        >
                            Captação, roteiro e edição.
                            <br />
                            Tudo feito em casa.
                        </h2>
                        <p className="mt-4 text-sm text-black/45">
                            Toque pra reproduzir · ative o som no canto
                        </p>
                    </div>
                </div>
                <div
                    className="overflow-x-auto overflow-y-hidden snap-x snap-mandatory pb-20 md:pb-28 scroll-smooth"
                    style={{ scrollbarWidth: 'thin' }}
                >
                    <div className="flex gap-4 pl-[max(1.5rem,calc((100vw-1200px)/2+1.5rem))] pr-[max(1.5rem,calc((100vw-1200px)/2+1.5rem))]">
                        {REELS.map((r) => (
                            <ReelCard key={r.src} reel={r} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Sócios + Por que Norte ─── */}
            <section id="sobre" className="relative overflow-hidden">
                <ArrowN className="absolute -left-16 bottom-10 w-[280px] -rotate-12" opacity={0.1} />
                <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
                    <div>
                        <p className="text-[11px] tracking-[0.25em] uppercase text-[#3d6b12] font-bold mb-4">
                            Por que Norte?
                        </p>
                        <h2
                            className="font-extrabold tracking-tight leading-[1.05] mb-6"
                            style={{ fontSize: 'clamp(30px, 4.5vw, 56px)' }}
                        >
                            Um nome que é
                            <br />
                            bússola e origem.
                        </h2>
                        <div className="space-y-4 text-base md:text-lg text-black/60 leading-relaxed">
                            <p>
                                Norte é direção: o ponteiro da bússola que tira o
                                negócio do improviso e coloca num caminho medido —
                                com meta, métrica e próximo passo claro.
                            </p>
                            <p>
                                E Norte é origem: nascemos em Manaus, no Norte do
                                Brasil, provando que daqui se constrói marketing
                                de padrão nacional.
                            </p>
                            <p className="font-bold text-[#0B0E0C]">
                                A gente aponta a direção. Você caminha.
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-[11px] tracking-[0.25em] uppercase text-[#3d6b12] font-bold mb-6">
                            Quem assina pelo projeto
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                            {PARTNERS.map((p) => (
                                <div key={p.name}>
                                    <div className="rounded-3xl overflow-hidden aspect-[3/4] mb-3 bg-black/5">
                                        <img
                                            src={p.photo}
                                            alt={p.name}
                                            loading="lazy"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p className="font-bold text-sm leading-tight">{p.name}</p>
                                    <p className="text-xs text-black/45 mt-0.5">{p.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── FAQ ─── */}
            <section className="bg-white border-y border-black/5">
                <div className="max-w-[840px] mx-auto px-6 py-24 md:py-32">
                    <div className="mb-12">
                        <p className="text-[11px] tracking-[0.25em] uppercase text-[#3d6b12] font-bold mb-4">
                            Perguntas frequentes
                        </p>
                        <h2
                            className="font-extrabold tracking-tight leading-[1.05]"
                            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
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
                                        className="w-full flex items-center justify-between gap-6 text-left py-5 group"
                                    >
                                        <span className="font-bold text-base md:text-lg">
                                            {f.q}
                                        </span>
                                        <span
                                            className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                                                open
                                                    ? 'bg-[#8DC63F] border-[#8DC63F] rotate-45'
                                                    : 'border-black/15 group-hover:border-black/40'
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
                                            <p className="text-[15px] text-black/55 leading-relaxed max-w-2xl">
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

            {/* ─── Contato ─── */}
            <section id="contato" className="relative overflow-hidden">
                <Contours className="absolute inset-0 w-full h-full" />
                <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24 md:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-[11px] tracking-[0.25em] uppercase text-[#3d6b12] font-bold mb-4">
                                Contato
                            </p>
                            <h2
                                className="font-extrabold tracking-tight leading-[1.02] mb-6"
                                style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}
                            >
                                Vamos crescer
                                <br />
                                <span className="relative inline-block">
                                    <span className="relative z-10">juntos?</span>
                                    <span
                                        aria-hidden="true"
                                        className="absolute left-0 right-0 bottom-1 md:bottom-2 h-[0.28em] bg-[#8DC63F]/50 rounded-sm"
                                    />
                                </span>
                            </h2>
                            <p className="text-base md:text-lg text-black/55 leading-relaxed max-w-md mb-8">
                                Seja tráfego, conteúdo, branding ou o pacote
                                completo — estamos prontos pra conversar sobre o
                                seu negócio.
                            </p>
                            <a
                                href={WHATSAPP}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-3 rounded-full bg-[#0B0E0C] hover:bg-[#14261A] text-white font-bold text-base px-8 py-4 transition-colors"
                            >
                                Chamar no WhatsApp
                                <span className="text-[#8DC63F] transition-transform group-hover:translate-x-1">
                                    →
                                </span>
                            </a>
                        </div>

                        <div className="rounded-3xl bg-white border border-black/8 shadow-[0_20px_60px_rgba(11,14,12,0.06)] p-8 md:p-10 space-y-5">
                            {[
                                { k: 'WhatsApp', v: '(92) 98514-6299' },
                                { k: 'E-mail', v: 'contato@trafegomanaus.com.br' },
                                { k: 'Onde', v: 'Manaus · Amazonas · Brasil' },
                                { k: 'Modelo', v: 'Agência 360 · estratégia, criatividade e performance' },
                            ].map((r) => (
                                <div
                                    key={r.k}
                                    className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 border-b border-black/5 pb-4 last:border-0 last:pb-0"
                                >
                                    <span className="text-[10px] tracking-[0.22em] uppercase text-[#3d6b12] font-bold w-24 flex-shrink-0">
                                        {r.k}
                                    </span>
                                    <span className="text-[15px] text-black/80">{r.v}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Footer ─── */}
            <footer className="bg-[#0B0E0C] text-white/70">
                <div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <img
                        src="/norte/logo-branca.png"
                        alt="Norte · Agência de Marketing"
                        className="h-16 w-auto object-contain"
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
