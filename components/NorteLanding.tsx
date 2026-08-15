import React, { useEffect, useRef, useState } from 'react';
import {
    WHATSAPP,
    Arrow,
    Check,
    Eyebrow,
    EDGE_FADE,
    NorteNav,
    NorteFooter,
    CountUp,
    useScrollReveal,
    useElementReveal,
    stagger,
    IconSearch,
    IconRoute,
    IconRocket,
    IconChart,
    IconTarget,
    IconUsers,
    IconCompass,
    type IconType,
} from './Norte/shared';
import { SERVICES } from './Norte/services';

// /norte — site institucional da Norte Marketing.
//
// Base branca com o verde-floresta reservado para dois momentos: a hero e
// o CTA final. O verde ganha força justamente por aparecer pouco. Entre
// eles, faixas de branco e cinza-papel se alternam.
//
// Tipografia: Plus Jakarta Sans peso 500 com tracking bem fechado nos
// títulos (extrabold grita; peso médio apertado lê como editorial), Inter
// no corpo e mono em caixa alta nos eyebrows.

const SECTION = 'py-16 md:py-24';
const CONTAINER = 'max-w-[1240px] mx-auto px-5 md:px-8';

const INK = '#131313';
const PAPER = '#F5F5F3';

const H1 = 'font-norte font-medium tracking-[-0.06em] leading-[1.04]';
const H2 = 'font-norte font-medium tracking-[-0.055em] leading-[1.06]';
const H3 = 'font-norte font-semibold tracking-[-0.02em]';

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

const HERO_WORDS = [
    { w: 'A' }, { w: 'gente' }, { w: 'aponta' }, { w: 'a' }, { w: 'direção.', br: true },
    { w: 'Você', lime: true }, { w: 'caminha.', lime: true },
];

// Anel de cards da hero. Não são dez repetições do mesmo bloco: cada
// carta tem um desenho próprio — gráfico, painel, nuvem de tags, destaque
// sólido, manifesto — pra que o anel pareça um punhado de telas de
// trabalho e não uma tabela girando. O dado é sempre real.
type FanSkin = 'glass' | 'white' | 'lime' | 'dark';

type FanCard = {
    kind: 'metric' | 'chart' | 'dash' | 'pills' | 'accent' | 'statement';
    skin: FanSkin;
    tag: string;
    client?: string;
    metric?: string;
    label?: string;
    bars?: number[];
    pills?: string[];
    line?: string;
};

const FAN: FanCard[] = [
    { kind: 'chart', skin: 'white', tag: 'Restaurante', client: 'Taychi Sushi', metric: '200k', label: 'faturamento/mês', bars: [26, 33, 41, 49, 63, 78, 100] },
    { kind: 'metric', skin: 'glass', tag: 'E-commerce', client: 'Oli e Sofi', metric: '+300%', label: 'no faturamento' },
    { kind: 'dash', skin: 'white', tag: 'Saúde', client: 'Odonto Solutions', metric: 'R$ 1,57', label: 'custo por lead' },
    { kind: 'accent', skin: 'lime', tag: 'Infoproduto', client: 'A Escola de Sites', metric: '+20 mil', label: 'leads gerados' },
    { kind: 'metric', skin: 'glass', tag: 'Construção', client: 'Tecno Obras', metric: '+500 mil', label: 'views/mês' },
    { kind: 'pills', skin: 'white', tag: 'Varejo', client: 'Amazon One', metric: 'R$ 1M', label: 'em 6 meses', pills: ['Meta Ads', 'Google', 'Remarketing', 'CRM'] },
    { kind: 'metric', skin: 'glass', tag: 'E-commerce', client: 'Dermo Ervas', metric: '+200%', label: 'de faturamento' },
    { kind: 'statement', skin: 'dark', tag: 'Nosso método', line: 'Cada real medido em CAC e ROAS.' },
    { kind: 'metric', skin: 'glass', tag: 'Infoproduto', client: 'Propriedades Compart.', metric: '+10 mil', label: 'leads captados' },
    { kind: 'chart', skin: 'white', tag: 'Franquia', client: 'Abacazo', metric: '+3 lojas', label: 'abertas no período', bars: [30, 38, 35, 52, 61, 74, 100] },
];

// Geometria do anel. Passo = 360° / nº de cartas, então elas se distribuem
// pela volta inteira e vão se alternando na frente conforme gira.
//
// O raio sai da corda entre vizinhas: 2·R·sen(18°) ≈ 0,62·R. Com 395 a
// corda fica em 244px pra uma carta de 230 — as vizinhas quase se tocam,
// que é o agrupamento que a referência tem. Raio maior espalha demais e
// o conjunto perde a leitura de baralho.
const RING_R = 395;
const CARD_W = 230;
const RING_STEP = 360 / FAN.length;
const RING_DUR = 64;

// Atraso negativo por carta: sincroniza o fade de cada uma com o momento
// exato em que ela cruza os 90° do anel.
const cardDelay = (i: number) => -(RING_DUR * (1 - i / FAN.length));

// Desníveis pequenos e irregulares: alinhamento perfeito lê como planilha,
// e zigue-zague regular vira serrote quando o anel roda.
const RING_LIFT = [0, 13, -7, 6, -12, 4, 15, -5, 9, -9];

const CARD_SKIN: Record<
    FanSkin,
    { box: string; tag: string; metric: string; label: string; muted: string; edge: string }
> = {
    glass: {
        box: 'bg-white/[0.11] border-white/25 text-white',
        tag: 'text-white/45',
        metric: 'text-[#8DC63F]',
        label: 'text-white/50',
        muted: 'bg-white/15',
        edge: 'rgba(255,255,255,0.10)',
    },
    white: {
        box: 'bg-white border-white text-[#0B0E0C] shadow-[0_24px_60px_rgba(0,0,0,0.4)]',
        tag: 'text-black/40',
        metric: 'text-[#3d6b12]',
        label: 'text-black/45',
        muted: 'bg-black/[0.07]',
        edge: 'rgba(206,206,199,1)',
    },
    lime: {
        box: 'bg-[#8DC63F] border-[#8DC63F] text-[#0B0E0C] shadow-[0_24px_60px_rgba(0,0,0,0.3)]',
        tag: 'text-[#0B0E0C]/50',
        metric: 'text-[#14261A]',
        label: 'text-[#0B0E0C]/55',
        muted: 'bg-[#0B0E0C]/12',
        edge: 'rgba(112,158,48,1)',
    },
    dark: {
        box: 'bg-[#131313] border-[#131313] text-white shadow-[0_24px_60px_rgba(0,0,0,0.45)]',
        tag: 'text-white/40',
        metric: 'text-[#8DC63F]',
        label: 'text-white/45',
        muted: 'bg-white/12',
        edge: 'rgba(38,38,38,1)',
    },
};

const TAG = 'font-mono text-[9px] tracking-[0.14em] uppercase';

// Corpo da carta — um desenho por `kind`, todos na mesma caixa.
const FanCardBody: React.FC<{ card: FanCard }> = ({ card }) => {
    const s = CARD_SKIN[card.skin];

    if (card.kind === 'statement') {
        return (
            <>
                <p className={`${TAG} ${s.tag} mb-5`}>{card.tag}</p>
                <p className={`${H2} text-[21px] leading-[1.15]`}>{card.line}</p>
                <span className="mt-auto inline-flex items-center gap-2 text-[11px] text-white/45">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
                    Norte
                </span>
            </>
        );
    }

    if (card.kind === 'accent') {
        return (
            <>
                <span className="w-11 h-11 rounded-full bg-[#0B0E0C] text-[#8DC63F] flex items-center justify-center mb-5">
                    <IconRocket className="w-5 h-5" />
                </span>
                <p className={`${H2} text-[32px] leading-none mb-1.5 ${s.metric}`}>{card.metric}</p>
                <p className={`text-[11px] ${s.label}`}>{card.label}</p>
                <p className={`${H3} text-[13px] leading-tight mt-auto`}>{card.client}</p>
            </>
        );
    }

    if (card.kind === 'chart') {
        return (
            <>
                <p className={`${TAG} ${s.tag} mb-4`}>{card.tag}</p>
                <div className="flex items-end gap-[3px] h-[56px] mb-5">
                    {card.bars!.map((b, i) => (
                        <div
                            key={i}
                            className={`flex-1 rounded-[2px] ${
                                i === card.bars!.length - 1 ? 'bg-[#8DC63F]' : s.muted
                            }`}
                            style={{ height: `${b}%` }}
                        />
                    ))}
                </div>
                <p className={`${H2} text-[27px] leading-none mb-1 ${s.metric}`}>{card.metric}</p>
                <p className={`text-[11px] ${s.label}`}>{card.label}</p>
                <p className={`${H3} text-[13px] leading-tight mt-auto`}>{card.client}</p>
            </>
        );
    }

    if (card.kind === 'dash') {
        return (
            <>
                <div className="rounded-xl bg-[#131313] text-white px-3 py-2.5 flex items-center justify-between mb-5">
                    <div>
                        <p className={`${H3} text-[12px] leading-none`}>Performance</p>
                        <p className="text-[9px] text-white/40 mt-1">últimos 30 dias</p>
                    </div>
                    <svg viewBox="0 0 24 16" className="w-6 h-4" fill="none" aria-hidden="true">
                        <path
                            d="M1 14 7 7l4 4 5-8 6 3"
                            stroke="#8DC63F"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <p className={`${H2} text-[30px] leading-none mb-2 ${s.metric}`}>{card.metric}</p>
                <p className={`text-[11px] ${s.label}`}>{card.label}</p>
                <p className={`${H3} text-[13px] leading-tight mt-auto`}>{card.client}</p>
            </>
        );
    }

    if (card.kind === 'pills') {
        return (
            <>
                <div className="flex flex-wrap gap-1.5 mb-5">
                    {card.pills!.map((p) => (
                        <span
                            key={p}
                            className={`rounded-full ${s.muted} text-[9px] px-2.5 py-1 leading-none`}
                        >
                            {p}
                        </span>
                    ))}
                </div>
                <p className={`${TAG} ${s.tag} mb-2`}>{card.tag}</p>
                <p className={`${H2} text-[28px] leading-none mb-1 ${s.metric}`}>{card.metric}</p>
                <p className={`text-[11px] ${s.label}`}>{card.label}</p>
                <p className={`${H3} text-[13px] leading-tight mt-auto`}>{card.client}</p>
            </>
        );
    }

    return (
        <>
            <p className={`${TAG} ${s.tag} mb-5`}>{card.tag}</p>
            <p className={`${H2} text-[30px] leading-none mb-1.5 ${s.metric}`}>{card.metric}</p>
            <p className={`text-[11px] ${s.label}`}>{card.label}</p>
            <p className={`${H3} text-[13px] leading-tight mt-auto`}>{card.client}</p>
        </>
    );
};

const STATS = [
    { icon: IconChart, prefix: '+R$ ', value: 5, suffix: 'M', label: 'em mídia gerida' },
    { icon: IconTarget, value: 7.5, decimals: 1, suffix: 'x', label: 'ROAS médio' },
    { icon: IconUsers, prefix: '+', value: 150, suffix: 'k', label: 'leads captados' },
    { icon: IconCompass, prefix: '+', value: 100, label: 'parceiros' },
];

// Manifesto: as palavras acendem conforme a frase sobe na tela, e dois
// chips de ícone vivem dentro do texto.
type Token = string | { chip: IconType };

const MANIFESTO: Token[] = [
    'Norte', 'é', { chip: IconCompass }, 'direção:', 'o', 'ponteiro', 'que', 'tira',
    'o', 'negócio', 'do', 'improviso', 'e', 'coloca', 'num', 'caminho', 'medido.',
    'E', 'Norte', 'é', { chip: IconTarget }, 'origem:', 'nascemos', 'em', 'Manaus,',
    'provando', 'que', 'daqui', 'se', 'constrói', 'marketing', 'de', 'padrão',
    'nacional.',
];

const MANIFESTO_STRONG = new Set(['direção:', 'origem:', 'Manaus,']);

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
    { name: 'iTV Manaus', tag: 'Assistência técnica', metric: 'R$ 15k', label: 'de faturamento', photo: '/clientes/fotos/itv-fachada.jpg' },
    { name: 'Taychi Sushi Bar', tag: 'Restaurante', metric: '+280%', label: 'reservas/mês', photo: '/clientes/fotos/taychi-salao.jpg' },
    { name: 'La Pizza Rio', tag: 'Delivery', metric: '+190%', label: 'pedidos diretos', photo: '/clientes/fotos/lapizzario-fachada.jpg' },
    { name: 'Tecno Obras', tag: 'Construção', metric: '+500 mil', label: 'views/mês', photo: '/clientes/fotos/tecnoobras-obra.jpg' },
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
                <p className="font-mono text-[9px] tracking-[0.14em] uppercase text-white/60">
                    {reel.client}
                </p>
                <p className={`text-white ${H3} text-[13px] leading-tight`}>{reel.title}</p>
            </div>
        </div>
    );
};

// ─── Manifesto ──────────────────────────────────────────────────────

const Manifesto: React.FC = () => {
    const [ref, progress] = useElementReveal<HTMLParagraphElement>();
    const total = MANIFESTO.length;

    return (
        <p
            ref={ref}
            className={`${H2} text-[clamp(26px,3.6vw,46px)] max-w-[20ch] sm:max-w-[26ch] md:max-w-[30ch]`}
        >
            {MANIFESTO.map((token, i) => {
                const t = stagger(i, total, progress, 0);

                if (typeof token !== 'string') {
                    const Chip = token.chip;
                    return (
                        <span
                            key={`chip-${i}`}
                            className="inline-flex align-middle w-[0.85em] h-[0.85em] rounded-full bg-[#8DC63F] text-[#0B0E0C] items-center justify-center mx-[0.12em] -translate-y-[0.05em]"
                            style={{ opacity: 0.25 + t * 0.75 }}
                            aria-hidden="true"
                        >
                            <Chip className="w-[62%] h-[62%]" />
                        </span>
                    );
                }

                const strong = MANIFESTO_STRONG.has(token);
                return (
                    <span
                        key={`${token}-${i}`}
                        style={{
                            color: strong
                                ? `rgba(61,107,18,${0.22 + t * 0.78})`
                                : `rgba(19,19,19,${0.18 + t * 0.82})`,
                            transition: 'color 120ms linear',
                        }}
                    >
                        {token}{' '}
                    </span>
                );
            })}
        </p>
    );
};

// ─── Página ─────────────────────────────────────────────────────────

const NorteLanding: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const resultsRef = useRef<HTMLDivElement | null>(null);
    const heroProgress = useScrollReveal(420);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollResults = (dir: 1 | -1) => {
        resultsRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
    };

    return (
        <div
            className="min-h-screen bg-white font-sans antialiased selection:bg-[#8DC63F] selection:text-[#0B0E0C]"
            style={{ color: INK }}
        >
            <NorteNav scrolled={scrolled} />

            {/* ═══ HERO — a primeira das duas faixas verdes ═══ */}
            <section
                id="inicio"
                className="relative bg-[#14261A] text-white overflow-hidden pt-32 md:pt-40"
            >
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-[-45%] w-[120%] h-[150%]"
                    style={{
                        background:
                            'radial-gradient(ellipse at center, rgba(141,198,63,0.20) 0%, rgba(141,198,63,0.05) 42%, transparent 70%)',
                    }}
                />

                <div className={`relative ${CONTAINER} pb-14 md:pb-16`}>
                    <div className="text-center max-w-4xl mx-auto">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.14em] uppercase text-white/80 mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
                            Agência de marketing · Manaus
                        </span>

                        {/* Revelação em cascata: a primeira palavra já nasce
                            nítida e as últimas ganham foco conforme rola. */}
                        <h1 className={`${H1} text-[clamp(36px,5.4vw,66px)] mb-6`}>
                            {HERO_WORDS.map((word, i) => {
                                // Piso alto de propósito: o H1 é o elemento de LCP e
                                // o que o crawler lê. A cascata suaviza, não esconde.
                                const t = stagger(i, HERO_WORDS.length, heroProgress, 0.45);
                                return (
                                    <React.Fragment key={`${word.w}-${i}`}>
                                        <span
                                            className={`inline-block ${word.lime ? 'text-[#8DC63F]' : ''}`}
                                            style={{
                                                opacity: 0.38 + t * 0.62,
                                                filter: `blur(${(1 - t) * 4.5}px)`,
                                                willChange: 'filter, opacity',
                                            }}
                                        >
                                            {word.w}
                                        </span>{' '}
                                        {word.br && <br />}
                                    </React.Fragment>
                                );
                            })}
                        </h1>

                        <p className="text-[15px] md:text-[19px] tracking-[-0.01em] text-white/60 leading-relaxed max-w-xl mx-auto mb-9">
                            Marketing com estratégia, criatividade e performance. A Norte
                            transforma atenção em oportunidade e estratégia em resultado —
                            do tráfego ao criativo, tudo em casa.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                            <a
                                href={WHATSAPP}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#8DC63F] hover:bg-[#9ed650] text-[#0B0E0C] font-semibold text-sm pl-6 pr-2 py-2 transition-colors"
                            >
                                Conversar com um estrategista
                                <span className="w-8 h-8 rounded-full bg-[#0B0E0C] text-[#8DC63F] flex items-center justify-center transition-transform group-hover:rotate-45">
                                    <Arrow className="w-4 h-4 -rotate-45" />
                                </span>
                            </a>
                            <a
                                href="#servicos"
                                className="inline-flex items-center justify-center rounded-full border border-white/25 hover:bg-white/10 text-white font-semibold text-sm px-7 py-3.5 transition-colors"
                            >
                                Ver o que fazemos
                            </a>
                        </div>
                    </div>

                    {/* Anel de resultados — dez clientes dando a volta sozinhos.
                        O palco abre a perspectiva; o anel gira num keyframe
                        e pausa no hover pra dar tempo de ler. */}
                    <div
                        className="fan-stage mt-14 md:mt-16 no-scrollbar overflow-x-auto md:overflow-visible"
                        style={{ perspective: '1250px', perspectiveOrigin: '50% 45%' }}
                    >
                        <div
                            className="fan-group relative flex gap-3 md:gap-0 w-max md:w-auto px-1"
                            style={{
                                ['--r' as string]: `${RING_R}px`,
                                ['--rx' as string]: '6deg',
                                ['--cw' as string]: `${CARD_W}px`,
                                ['--dur' as string]: `${RING_DUR}s`,
                            }}
                        >
                            {FAN.map((card, i) => {
                                const skin = CARD_SKIN[card.skin];
                                return (
                                    <div
                                        key={card.client ?? card.line}
                                        className={`fan-item relative flex flex-col flex-shrink-0 w-[214px] md:w-[230px] md:h-[248px] rounded-2xl p-5 border ${skin.box}`}
                                        style={{
                                            ['--ry' as string]: `${i * RING_STEP}deg`,
                                            ['--ty' as string]: `${RING_LIFT[i]}px`,
                                            animationDelay: `${cardDelay(i)}s`,
                                        }}
                                    >
                                        {/* Espessura: duas faces laterais de 10px.
                                            Só a que estiver de frente aparece —
                                            backface-visibility cuida da outra. */}
                                        <span
                                            aria-hidden="true"
                                            className="fan-edge absolute top-0 right-0 h-full w-[10px] rounded-r-2xl"
                                            style={{
                                                background: skin.edge,
                                                ['--edge-origin' as string]: 'left',
                                                ['--edge-rot' as string]: '90deg',
                                            }}
                                        />
                                        <span
                                            aria-hidden="true"
                                            className="fan-edge absolute top-0 left-0 h-full w-[10px] rounded-l-2xl"
                                            style={{
                                                background: skin.edge,
                                                ['--edge-origin' as string]: 'right',
                                                ['--edge-rot' as string]: '-90deg',
                                            }}
                                        />
                                        <FanCardBody card={card} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Números que sobem quando a barra entra na tela */}
                <div className="relative border-t border-white/10">
                    <div className={CONTAINER}>
                        <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x divide-white/10">
                            {STATS.map(({ icon: Icon, label, ...n }, i) => (
                                <div
                                    key={label}
                                    className={`flex items-center gap-3 py-5 ${i > 0 ? 'md:pl-6' : ''} ${i > 1 ? 'border-t md:border-t-0 border-white/10' : ''}`}
                                >
                                    <Icon className="w-5 h-5 text-[#8DC63F] flex-shrink-0" />
                                    <div className="min-w-0">
                                        <CountUp
                                            {...n}
                                            className={`${H2} text-[20px] leading-none block`}
                                        />
                                        <p className="text-[11px] text-white/45 mt-1 truncate">
                                            {label}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Logos ═══ */}
            <section className="bg-white py-10 md:py-14 overflow-hidden">
                <p className="text-center font-mono text-[11px] tracking-[0.16em] uppercase text-black/35 mb-8">
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
                                    className="max-h-full max-w-full object-contain rounded-full grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Manifesto ═══ */}
            <section className={`bg-white ${SECTION} border-t border-black/5`}>
                <div className={CONTAINER}>
                    <Eyebrow>Por que Norte</Eyebrow>
                    <div className="mt-6">
                        <Manifesto />
                    </div>
                    <p className="mt-9 font-mono text-[12px] tracking-[0.12em] uppercase text-[#3d6b12]">
                        A gente aponta a direção · Você caminha
                    </p>
                </div>
            </section>

            {/* ═══ Serviços ═══ */}
            <section id="servicos" className={`${SECTION}`} style={{ backgroundColor: PAPER }}>
                <div className={CONTAINER}>
                    <div className="max-w-2xl mb-10 md:mb-14">
                        <Eyebrow>O que fazemos</Eyebrow>
                        <h2 className={`mt-4 ${H2} text-[clamp(28px,3.9vw,50px)]`}>
                            Seis frentes. Uma operação só.
                        </h2>
                        <p className="mt-5 text-[15px] md:text-[17px] tracking-[-0.01em] text-black/45 leading-relaxed">
                            Agência 360: cada frente alimenta a outra pra que o resultado
                            não dependa de sorte — dependa de sistema.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {SERVICES.map(({ slug, icon: Icon, name, teaser }) => (
                            <a
                                key={slug}
                                href={`/norte/${slug}`}
                                className="rounded-2xl bg-white hover:shadow-[0_16px_50px_rgba(11,14,12,0.08)] border border-black/5 hover:border-[#8DC63F] p-6 transition-all group flex flex-col"
                            >
                                <span className="inline-flex w-11 h-11 rounded-xl bg-[#F5F5F3] text-[#3d6b12] items-center justify-center mb-5 group-hover:bg-[#8DC63F] group-hover:text-[#0B0E0C] transition-colors">
                                    <Icon className="w-5 h-5" />
                                </span>
                                <h3 className={`${H3} text-[17px] mb-2`}>{name}</h3>
                                <p className="text-[13px] text-black/45 leading-snug mb-5">
                                    {teaser}
                                </p>
                                <span className="mt-auto font-mono text-[11px] tracking-[0.1em] uppercase text-[#3d6b12] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                                    Ver detalhes <Arrow className="w-3.5 h-3.5" />
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Método ═══ */}
            <section className={`bg-white ${SECTION}`}>
                <div className={CONTAINER}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                        <div className="lg:col-span-5">
                            <Eyebrow>Nosso método</Eyebrow>
                            <h2 className={`mt-4 ${H2} text-[clamp(28px,3.6vw,46px)] mb-5`}>
                                Direção antes de esforço.
                            </h2>
                            <p className="text-[15px] md:text-[17px] tracking-[-0.01em] text-black/45 leading-relaxed mb-8">
                                Cada decisão passa por uma régua: dá pra medir? Se não dá,
                                não entra no plano.
                            </p>

                            <ul className="space-y-3">
                                {MISSION.map((m) => (
                                    <li key={m} className="flex items-start gap-3">
                                        <span className="mt-0.5 w-5 h-5 rounded-md bg-[#8DC63F] text-[#0B0E0C] flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3.5 h-3.5" />
                                        </span>
                                        <span className="text-[14px] text-black/65 leading-snug">
                                            {m}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 content-start">
                            {STEPS.map(({ icon: Icon, title, body }, i) => (
                                <div
                                    key={title}
                                    className="rounded-2xl border border-black/8 p-6"
                                    style={{ backgroundColor: PAPER }}
                                >
                                    <div className="flex items-center justify-between mb-5">
                                        <Icon className="w-6 h-6 text-[#3d6b12]" />
                                        <span className="font-mono text-[11px] text-black/25">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                    </div>
                                    <p className={`${H3} text-[16px] leading-tight mb-1`}>{title}</p>
                                    <p className="text-[13px] text-black/45">{body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Resultado real ═══ */}
            <section id="cases" className={`${SECTION}`} style={{ backgroundColor: PAPER }}>
                <div className={CONTAINER}>
                    <div className="max-w-2xl mb-10 md:mb-14">
                        <Eyebrow>Resultado real</Eyebrow>
                        <h2 className={`mt-4 ${H2} text-[clamp(28px,3.9vw,50px)]`}>
                            Quem seguiu o Norte, chegou lá.
                        </h2>
                        <p className="mt-5 text-[15px] md:text-[17px] tracking-[-0.01em] text-black/45 leading-relaxed">
                            Negócios reais, operações reais — e o número que mudou depois
                            que a estratégia entrou.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {CASE_CARDS.map((c) => (
                            <div
                                key={c.name}
                                className="relative rounded-2xl overflow-hidden aspect-[4/5] group"
                            >
                                <img
                                    src={c.photo}
                                    alt={c.name}
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E0C] via-[#0B0E0C]/35 to-transparent" />
                                <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 font-mono text-[9px] tracking-[0.1em] uppercase">
                                    {c.tag}
                                </span>
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <p className={`${H3} text-[14px] leading-tight mb-2`}>
                                        {c.name}
                                    </p>
                                    <div className="flex items-baseline gap-1.5">
                                        <span className={`${H2} text-[26px] text-[#8DC63F] leading-none`}>
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

            {/* ═══ Carrossel de resultados ═══ */}
            <section className={`bg-white ${SECTION}`}>
                <div className={CONTAINER}>
                    <div className="flex items-end justify-between gap-6 mb-9">
                        <div className="max-w-xl">
                            <Eyebrow>+100 parceiros impactados</Eyebrow>
                            <h2 className={`mt-4 ${H2} text-[clamp(26px,3.4vw,44px)]`}>
                                Dados. Não promessas.
                            </h2>
                        </div>
                        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
                            <button
                                type="button"
                                aria-label="Voltar"
                                onClick={() => scrollResults(-1)}
                                className="w-10 h-10 rounded-full border border-black/12 hover:bg-[#131313] hover:text-white hover:border-[#131313] transition-colors flex items-center justify-center"
                            >
                                <Arrow className="w-4 h-4 rotate-180" />
                            </button>
                            <button
                                type="button"
                                aria-label="Avançar"
                                onClick={() => scrollResults(1)}
                                className="w-10 h-10 rounded-full bg-[#131313] text-white hover:bg-[#14261A] transition-colors flex items-center justify-center"
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
                                className="snap-start flex-shrink-0 w-[262px] rounded-2xl border border-black/8 hover:border-[#8DC63F] p-6 flex flex-col justify-between min-h-[196px] transition-colors"
                                style={{ backgroundColor: PAPER }}
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <span className={`${H3} text-[13px] leading-tight`}>
                                        {r.client}
                                    </span>
                                    <span className="font-mono text-[9px] tracking-[0.08em] uppercase text-black/40 bg-white rounded-full px-2 py-0.5 whitespace-nowrap flex-shrink-0">
                                        {r.category}
                                    </span>
                                </div>
                                <div className="mt-6">
                                    <p className={`${H2} text-[21px] text-[#3d6b12] leading-tight mb-2`}>
                                        {r.headline}
                                    </p>
                                    <p className="text-[12px] text-black/45 leading-snug">{r.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Reels ═══ */}
            <section className={`${SECTION}`} style={{ backgroundColor: PAPER }}>
                <div className={CONTAINER}>
                    <div className="max-w-2xl mb-9">
                        <Eyebrow>Reels feitos em casa</Eyebrow>
                        <h2 className={`mt-4 ${H2} text-[clamp(26px,3.4vw,44px)]`}>
                            Captação, roteiro e edição.
                        </h2>
                        <p className="mt-4 text-[14px] text-black/40">
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

            {/* ═══ Sócios ═══ */}
            <section id="sobre" className={`bg-white ${SECTION}`}>
                <div className={CONTAINER}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                        <div className="lg:col-span-5">
                            <Eyebrow>Quem assina</Eyebrow>
                            <h2 className={`mt-4 ${H2} text-[clamp(28px,3.6vw,46px)] mb-5`}>
                                Time fixo, nome e sobrenome.
                            </h2>
                            <p className="text-[15px] md:text-[17px] tracking-[-0.01em] text-black/45 leading-relaxed">
                                Não é central de atendimento nem estagiário rodando conta.
                                Cada projeto tem gente responsável por ele — e você sabe
                                exatamente quem é.
                            </p>
                        </div>

                        <div className="lg:col-span-7">
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
                                        <p className={`${H3} text-[14px] leading-tight`}>{p.name}</p>
                                        <p className="font-mono text-[10px] tracking-[0.08em] uppercase text-black/40 mt-1">
                                            {p.role}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ FAQ ═══ */}
            <section className={`${SECTION}`} style={{ backgroundColor: PAPER }}>
                <div className="max-w-[880px] mx-auto px-5 md:px-8">
                    <div className="mb-9">
                        <Eyebrow>Perguntas frequentes</Eyebrow>
                        <h2 className={`mt-4 ${H2} text-[clamp(26px,3.4vw,44px)]`}>
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
                                        <span className={`${H3} text-[16px] md:text-[18px] leading-snug`}>
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
                                            <p className="text-[14px] md:text-[15px] text-black/50 leading-relaxed pr-10">
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

            {/* ═══ CTA final — a segunda e última faixa verde ═══ */}
            <section
                id="contato"
                className={`relative bg-[#14261A] text-white overflow-hidden ${SECTION}`}
            >
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[-60%] w-[110%] h-[150%]"
                    style={{
                        background:
                            'radial-gradient(ellipse at center, rgba(141,198,63,0.18) 0%, transparent 68%)',
                    }}
                />
                <div className={`relative ${CONTAINER}`}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                        <div className="lg:col-span-7">
                            <Eyebrow light>Contato</Eyebrow>
                            <h2 className={`mt-4 ${H1} text-[clamp(34px,5.2vw,66px)] mb-6`}>
                                Vamos crescer juntos?
                            </h2>
                            <p className="text-[15px] md:text-[19px] tracking-[-0.01em] text-white/60 leading-relaxed max-w-lg mb-9">
                                Seja tráfego, conteúdo, branding ou o pacote completo —
                                estamos prontos pra conversar sobre o seu negócio.
                            </p>
                            <a
                                href={WHATSAPP}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-3 rounded-full bg-[#8DC63F] hover:bg-[#9ed650] text-[#0B0E0C] font-semibold text-sm md:text-base pl-7 pr-2.5 py-2.5 transition-colors"
                            >
                                Chamar no WhatsApp
                                <span className="w-9 h-9 rounded-full bg-[#0B0E0C] text-[#8DC63F] flex items-center justify-center transition-transform group-hover:rotate-45">
                                    <Arrow className="w-4 h-4 -rotate-45" />
                                </span>
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
                                    className="flex gap-5 border-b border-white/12 pb-3 last:border-0"
                                >
                                    <span className="w-24 flex-shrink-0 font-mono text-[10px] tracking-[0.12em] uppercase text-white/40 pt-1">
                                        {k}
                                    </span>
                                    <span className={`${H3} text-[15px]`}>{v}</span>
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
