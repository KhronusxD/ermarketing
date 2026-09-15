import React, { useEffect, useRef, useState } from 'react';
import {
    WHATSAPP,
    FORMULARIO,
    Arrow,
    Check,
    Eyebrow,
    EDGE_FADE,
    NorteNav,
    NorteFooter,
    CountUp,
    useScrollReveal,
    useElementReveal,
    useRevealOnView,
    useRailMask,
    stagger,
    IconSearch,
    IconRoute,
    IconRocket,
    IconChart,
    IconCompass,
    H1,
    H2,
    H3,
    TAG,
    SECTION,
    CONTAINER,
    PAPER,
    NORTE_INK as INK,
    type IconType,
} from './Norte/shared';
import {
    RAIL_PAD,
    RAIL_SCROLL_PAD,
    CARD_SKIN,
    AnelDeCards,
    ServiceMock,
    ServiceCell,
    MethodAccordion,
    DepoCard,
    ResultViz,
    RESULT_SKINS,
    RES_SKIN,
    ReelCard,
    Manifesto,
    type FanCard,
    type Token,
    type Depo,
} from './Norte/home-pecas';
import { SERVICES } from './Norte/services';
import { POSTS } from './Blog/posts';

// /norte — site institucional da Norte Marketing.
//
// Base branca com o verde-floresta reservado para dois momentos: a hero e
// o CTA final. O verde ganha força justamente por aparecer pouco. Entre
// eles, faixas de branco e cinza-papel se alternam.
//
// Tipografia: Plus Jakarta Sans peso 500 com tracking bem fechado nos
// títulos (extrabold grita; peso médio apertado lê como editorial), Inter
// no corpo e mono em caixa alta nos eyebrows.





const HERO_WORDS = [
    { w: 'A' }, { w: 'gente' }, { w: 'aponta' }, { w: 'a' }, { w: 'direção.', br: true },
    { w: 'Você', lime: true }, { w: 'caminha.', lime: true },
];



const FAN: FanCard[] = [
    { kind: 'chart', skin: 'white', tag: 'Restaurante', client: 'Taychi Sushi', metric: '200k', label: 'faturamento/mês', bars: [26, 33, 41, 49, 63, 78, 100] },
    { kind: 'metric', skin: 'glass', tag: 'E-commerce', client: 'Oli e Sofi', metric: '+300%', label: 'no faturamento' },
    { kind: 'dash', skin: 'white', tag: 'Saúde', client: 'Odonto Solutions', metric: 'R$ 1,57', label: 'custo por lead' },
    { kind: 'metric', skin: 'glass', tag: 'E-commerce', client: 'Dermo Ervas', metric: '+200%', label: 'de faturamento' },
    { kind: 'accent', skin: 'lime', tag: 'Infoproduto', client: 'A Escola de Sites', metric: '+20 mil', label: 'leads gerados' },
    { kind: 'metric', skin: 'glass', tag: 'Construção', client: 'Tecno Obras', metric: '+500 mil', label: 'views/mês' },
    { kind: 'pills', skin: 'white', tag: 'Varejo', client: 'Amazon One', metric: 'R$ 1M', label: 'em 6 meses', pills: ['Meta Ads', 'Google', 'Remarketing', 'CRM'] },
    { kind: 'metric', skin: 'glass', tag: 'Saúde', client: 'Bem Fisio', metric: '+450', label: 'leads/mês' },
    { kind: 'statement', skin: 'dark', tag: 'Nosso método', line: 'Cada real medido em CAC e ROAS.' },
    { kind: 'metric', skin: 'glass', tag: 'Infoproduto', client: 'Propriedades Compart.', metric: '+10 mil', label: 'leads captados' },
    { kind: 'chart', skin: 'white', tag: 'Franquia', client: 'Abacazo', metric: '+3 lojas', label: 'abertas no período', bars: [30, 38, 35, 52, 61, 74, 100] },
    { kind: 'metric', skin: 'glass', tag: 'Mentoria', client: 'Full Sales System', metric: '+560', label: 'leads/mês' },
    { kind: 'dash', skin: 'white', tag: 'Construção', client: 'Conceito Obras', metric: '+150', label: 'leads/mês' },
    { kind: 'metric', skin: 'glass', tag: 'Varejo', client: 'Pandora Eletrônicos', metric: '+500', label: 'leads/mês' },
    { kind: 'accent', skin: 'lime', tag: 'Serviços', client: 'iTV Manaus', metric: 'R$ 15k', label: 'de faturamento' },
    { kind: 'metric', skin: 'glass', tag: 'E-commerce', client: 'Reifel Confecções', metric: 'R$ 30k', label: 'por mês, em 3 meses' },
];







// ─── Maquetes dos serviços ──────────────────────────────────────────
// Cada frente é ilustrada por duas peças de interface empilhadas e
// levemente tortas. Tudo HTML e CSS: nenhuma imagem nova entra no
// bundle, e escala em qualquer densidade de tela sem serrilhar.






const MANIFESTO: Token[] = [
    'Estratégias', 'de', { chip: IconCompass }, 'Marketing', 'que',
    { chip: IconRocket }, 'impulsionam', 'seu', 'faturamento.',
];

const MANIFESTO_STRONG = new Set(['impulsionam', 'faturamento.']);

const STEPS = [
    {
        icon: IconSearch,
        title: 'Diagnóstico',
        lead: 'Entender onde vaza',
        body: 'Antes de propor qualquer coisa, olhamos conta, criativo, oferta e funil pra achar por onde o dinheiro está escapando.',
    },
    {
        icon: IconRoute,
        title: 'Estratégia',
        lead: 'Definir a direção',
        body: 'Canal, público, oferta e régua de medição definidos. Nada entra no plano sem responder à pergunta: dá pra medir?',
    },
    {
        icon: IconRocket,
        title: 'Execução',
        lead: 'Rodar e medir',
        body: 'Campanha no ar, criativo em teste e otimização semanal. Time fixo, com nome e sobrenome na sua conta.',
    },
    {
        icon: IconChart,
        title: 'Escala',
        lead: 'Crescer com dado',
        body: 'Com CAC e ROAS estáveis, a verba sobe onde o dado manda subir — não onde o achismo manda.',
    },
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


const DEPOIMENTOS: Depo[] = [
    {
        client: 'Taychi Sushi Bar',
        tag: 'Restaurante · Manaus',
        quote: 'A casa já era boa. O que faltava era gente sabendo. Em sete meses o salão passou a encher também em dia de semana.',
        metric: '+280%',
        label: 'reservas/mês',
        photo: '/clientes/fotos/taychi-salao.jpg',
    },
    {
        client: 'La Pizza Rio',
        tag: 'Delivery · Manaus',
        quote: 'A gente vivia de indicação. Hoje entra pedido direto todo dia, sem depender de aplicativo pra vender.',
        metric: '+190%',
        label: 'pedidos diretos',
        photo: '/clientes/fotos/lapizzario-fachada.jpg',
    },
    {
        client: 'Oli e Sofi',
        tag: 'E-commerce',
        quote: 'Triplicamos o faturamento sem precisar triplicar a verba. A conta finalmente fecha.',
        metric: '+300%',
        label: 'no faturamento',
        skin: 'dark',
    },
    {
        client: 'iTV Manaus',
        tag: 'Assistência técnica',
        quote: 'Investimento baixo e retorno que dá pra contar. Foi a primeira vez que soubemos de onde veio cada cliente.',
        metric: 'R$ 15k',
        label: 'de faturamento',
        photo: '/clientes/fotos/itv-fachada.jpg',
    },
    {
        client: 'Odonto Solutions',
        tag: 'Saúde',
        quote: 'Lead a R$ 1,57 e agenda cheia. O time comercial parou de reclamar da qualidade do que chegava.',
        metric: '5.193',
        label: 'leads qualificados',
        skin: 'lime',
    },
    {
        client: 'Tecno Obras',
        tag: 'Construção · Curitiba',
        quote: 'Saímos do zero pra referência na região. Hoje o cliente chega falando que já viu a gente.',
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

// `photo` é o recorte de corpo inteiro usado na seção de sócios;
// `avatar` é o mesmo recorte já cortado na cabeça e sobre um disco
// verde, pro empilhamento de bolinhas do bento.
// Fotos de set/2026: os três no mesmo estúdio, mesma luz, camisa da
// marca. Como o fundo é bom e igual nas três, a foto preenche o cartão
// em vez de virar recorte flutuando sobre cor.
const PARTNERS = [
    { name: 'Ed Rodrigues', role: 'Gestor estratégico', photo: '/socios/ed-4x5.jpg', avatar: '/socios/ed-avatar.jpg' },
    { name: 'Brenno Soares', role: 'Administrador', photo: '/socios/brenno-4x5.jpg', avatar: '/socios/brenno-avatar.jpg' },
    { name: 'Francyelle Barbosa', role: 'Diretora de conteúdo', photo: '/socios/francyelle-4x5.jpg', avatar: '/socios/francyelle-avatar.jpg' },
];

// Três posts em destaque na home. A capa vem de foto nossa de cliente —
// o blog não tem imagem de capa própria, e banco de imagem genérico
// contradiz o resto da página, que é registro real.
const BLOG_PICKS = [
    { slug: 'agencia-de-marketing-em-manaus', photo: '/clientes/fotos/itv-interior.jpg' },
    { slug: 'trafego-pago-restaurantes-manaus-2026', photo: '/clientes/fotos/taychi-salao.jpg' },
    { slug: 'quanto-custa-marketing-digital-em-manaus', photo: '/clientes/fotos/tecnoobras-obra.jpg' },
];

const FAQS = [
    { q: 'Como funciona a primeira conversa?', a: 'Você chama no WhatsApp, a gente entende o momento do teu negócio e devolve um plano claro de por onde começar. Sem compromisso e sem call de vendas disfarçada.' },
    { q: 'Qual o investimento pra começar?', a: 'Não trabalhamos com pacote fechado. O projeto é desenhado pro teu momento e objetivo — focamos em negócios que já investem em marketing ou têm capacidade pra começar.' },
    { q: 'Quais nichos vocês atendem?', a: 'A metodologia é agnóstica de nicho. Temos cases em e-commerce, infoproduto, food service, saúde, construção, varejo local e educação — em Manaus e fora.' },
    { q: 'A Norte faz só tráfego pago?', a: 'Não. Somos agência 360: tráfego, social media, branding, sites, captação de conteúdo e eventos. Cada frente alimenta a outra.' },
    { q: 'Em quanto tempo vejo resultado?', a: 'Os primeiros 30 dias são de calibração (tracking, público, criativo). Dos 60 aos 90 dias a curva acelera. Quem desliga antes disso nunca vê o canal maduro.' },
];









// ─── Reel card (vídeo só baixa quando chega perto do viewport) ───────


// ─── Manifesto ──────────────────────────────────────────────────────


// ─── Página ─────────────────────────────────────────────────────────

const NorteLanding: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [resultsRef, resultsMask] = useRailMask<HTMLDivElement>();
    const [reelsRef, reelsMask] = useRailMask<HTMLDivElement>(true);
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
                {/* Foto da trilha na mata. Entra como <img> e não como
                    background-image de propósito: assim o navegador acha a
                    imagem já no HTML pré-renderizado, escolhe a largura certa
                    pelo srcset e trata como LCP. WebP em cinco tamanhos, do
                    celular ao retina, com JPEG de reserva. */}
                <picture aria-hidden="true">
                    <source
                        type="image/webp"
                        sizes="100vw"
                        srcSet={
                            '/norte/hero/fundo-hero-640.webp 640w, ' +
                            '/norte/hero/fundo-hero-1024.webp 1024w, ' +
                            '/norte/hero/fundo-hero-1440.webp 1440w, ' +
                            '/norte/hero/fundo-hero-1920.webp 1920w, ' +
                            '/norte/hero/fundo-hero-2400.webp 2400w'
                        }
                    />
                    <img
                        src="/norte/hero/fundo-hero-1440.jpg"
                        alt=""
                        fetchPriority="high"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                </picture>

                {/* Véu: derruba o contraste da foto pro texto respirar, mas
                    deixa a trilha aparecer no meio — ela é o próprio conceito
                    da marca. Mais fechado embaixo, onde ficam os cards. */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                        background:
                            'linear-gradient(to bottom, rgba(11,18,13,0.88) 0%, rgba(15,29,20,0.60) 30%, rgba(14,28,19,0.88) 62%, rgba(18,35,24,0.96) 84%, #14261A 100%)',
                    }}
                />

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-[-45%] w-[120%] h-[150%]"
                    style={{
                        background:
                            'radial-gradient(ellipse at center, rgba(141,198,63,0.16) 0%, rgba(141,198,63,0.04) 42%, transparent 70%)',
                    }}
                />

                <div className={`relative ${CONTAINER} pb-14 md:pb-16`}>
                    <div className="text-center max-w-4xl mx-auto">
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
                                href={FORMULARIO}
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
                        O maquinário vive em Norte/home-pecas.tsx; aqui fica
                        só a lista. */}
                    <AnelDeCards cards={FAN} />
                </div>

            </section>

            {/* ═══ Números — bento logo abaixo da hero ═══
                Quatro caixas de pesos diferentes em vez da barra fina de
                antes: foto, papel, limão e preto. Cada número sobe do zero
                quando entra na tela. */}
            <section className="bg-white pt-12 md:pt-16 pb-4 md:pb-6">
                <div className={CONTAINER}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:h-[430px]">
                        {/* Mídia gerida — foto de cliente com a cifra por cima */}
                        <div className="relative rounded-[20px] overflow-hidden bg-[#14261A] min-h-[300px]">
                            <img
                                src="/clientes/fotos/taychi-salao.jpg"
                                alt="Salão do Taychi Sushi Bar, cliente da Norte em Manaus"
                                loading="lazy"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E0C]/70 via-transparent to-[#0B0E0C]/30" />

                            <img
                                src="/norte/logo-branca.png"
                                alt=""
                                className="absolute top-5 left-5 h-9 w-auto object-contain"
                            />
                            <span className="absolute top-5 right-5 w-10 h-10 rounded-xl bg-white text-[#131313] flex items-center justify-center">
                                <IconChart className="w-5 h-5" />
                            </span>

                            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white p-5">
                                <CountUp
                                    prefix="+R$ "
                                    value={5}
                                    suffix="M"
                                    className={`${H2} text-[42px] leading-none block`}
                                />
                                <p className="mt-3 text-[13px] text-black/50 leading-snug">
                                    em mídia gerida no Meta Ads e no Google Ads desde 2020.
                                </p>
                            </div>
                        </div>

                        {/* Parceiros — número, os três sócios e a régua do time */}
                        <div
                            className="rounded-[20px] p-7 flex flex-col"
                            style={{ backgroundColor: PAPER }}
                        >
                            <p className="text-[14px] text-black/55">Parceiros impactados</p>
                            <CountUp
                                prefix="+"
                                value={100}
                                className={`${H2} text-[54px] leading-none block mt-2`}
                            />

                            <div className="mt-auto">
                                <div className="flex -space-x-2.5 mb-5">
                                    {PARTNERS.map((p) => (
                                        <span
                                            key={p.name}
                                            title={p.name}
                                            className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#F5F5F3] bg-[#14261A]"
                                        >
                                            <img
                                                src={p.avatar}
                                                alt={p.name}
                                                loading="lazy"
                                                className="w-full h-full object-cover"
                                            />
                                        </span>
                                    ))}
                                </div>
                                <p className="text-[15px] text-black/65 leading-snug">
                                    Time fixo e nominal por conta — você sabe exatamente quem
                                    responde pelo seu projeto.
                                </p>
                            </div>
                        </div>

                        {/* Leads e ROAS empilhados */}
                        <div className="flex flex-col gap-3">
                            <div className="rounded-[20px] bg-[#8DC63F] text-[#0B0E0C] p-7 flex-1 flex flex-col">
                                <p className="text-[14px] text-[#0B0E0C]/60">Leads captados</p>
                                <CountUp
                                    prefix="+"
                                    value={150}
                                    suffix="k"
                                    className={`${H2} text-[54px] leading-none block mt-2`}
                                />
                                <p className="mt-auto pt-5 text-[15px] text-[#0B0E0C]/70 leading-snug">
                                    gerados para clientes em Manaus e fora dela.
                                </p>
                            </div>

                            <div className="rounded-[20px] bg-[#131313] text-white px-7 py-6 flex items-center justify-between gap-4">
                                <p className="text-[14px] text-white/55">ROAS médio</p>
                                <CountUp
                                    value={7.5}
                                    decimals={1}
                                    suffix="x"
                                    className={`${H2} text-[40px] leading-none`}
                                />
                            </div>
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
                    <div className="flex flex-col items-center text-center">
                        <Eyebrow>Por que Norte</Eyebrow>
                        <div className="mt-6">
                            <Manifesto tokens={MANIFESTO} fortes={MANIFESTO_STRONG} />
                        </div>
                        <p className="mt-9 font-mono text-[12px] tracking-[0.12em] uppercase text-[#3d6b12]">
                            A gente aponta a direção · Você caminha
                        </p>
                    </div>
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

                    {/* Três por linha, cada célula com a maquete da frente em
                        cima e o texto centralizado embaixo. */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {SERVICES.map(({ slug, name, teaser }, i) => (
                            <ServiceCell
                                key={slug}
                                slug={slug}
                                name={name}
                                teaser={teaser}
                                column={i % 3}
                            />
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

                        <div className="lg:col-span-7">
                            <MethodAccordion passos={STEPS} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Resultado real — vitrine em pulso ═══ */}
            <section id="cases" className={`${SECTION} overflow-hidden`} style={{ backgroundColor: PAPER }}>
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
                </div>

                <div className="rr no-scrollbar overflow-x-auto md:overflow-hidden" style={EDGE_FADE}>
                    <div className="rr-track gap-3" style={RAIL_PAD}>
                        {[...DEPOIMENTOS, ...DEPOIMENTOS].map((d, i) => (
                            <DepoCard key={`${d.client}-${i}`} depo={d} />
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
                    style={{ ...resultsMask, ...RAIL_SCROLL_PAD }}
                >
                    <div className="flex gap-3 w-max" style={RAIL_PAD}>
                        {RESULTS.map((r, i) => {
                            const skin = RESULT_SKINS[i % RESULT_SKINS.length];
                            const c = RES_SKIN[skin];
                            return (
                                <div
                                    key={r.client}
                                    className={`snap-start flex-shrink-0 w-[262px] rounded-2xl border p-6 flex flex-col min-h-[236px] transition-colors ${c.box}`}
                                >
                                    <div className="flex items-start justify-between gap-2 mb-5">
                                        <span className={`${H3} text-[13px] leading-tight ${c.name}`}>
                                            {r.client}
                                        </span>
                                        <span
                                            className={`${TAG} rounded-full px-2 py-0.5 whitespace-nowrap flex-shrink-0 ${c.pill}`}
                                        >
                                            {r.category}
                                        </span>
                                    </div>

                                    <ResultViz index={i} skin={skin} />

                                    <div className="mt-auto pt-5">
                                        <p className={`${H2} text-[21px] leading-tight mb-2 ${c.head}`}>
                                            {r.headline}
                                        </p>
                                        <p className={`text-[12px] leading-snug ${c.body}`}>{r.body}</p>
                                    </div>
                                </div>
                            );
                        })}
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
                    ref={reelsRef}
                    className="no-scrollbar overflow-x-auto snap-x snap-mandatory scroll-smooth"
                    style={{ ...reelsMask, ...RAIL_SCROLL_PAD }}
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
                    <div className="max-w-2xl mb-10 md:mb-14">
                        <Eyebrow>Quem assina</Eyebrow>
                        <h2 className={`mt-4 ${H2} text-[clamp(28px,3.9vw,50px)]`}>
                            Time fixo, nome e sobrenome.
                        </h2>
                        <p className="mt-5 text-[15px] md:text-[17px] tracking-[-0.01em] text-black/45 leading-relaxed">
                            Não é central de atendimento nem estagiário rodando conta. Cada
                            projeto tem gente responsável por ele — e você sabe exatamente
                            quem é.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {PARTNERS.map((p) => (
                            <div key={p.name}>
                                <div
                                    className="relative rounded-[22px] overflow-hidden aspect-[4/5] mb-4"
                                    style={{
                                        background:
                                            'linear-gradient(165deg, #1d3423 0%, #14261A 55%, #0B0E0C 100%)',
                                    }}
                                >

                                    <img
                                        src={p.photo}
                                        alt={p.name}
                                        loading="lazy"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>
                                <p className={`${H3} text-[17px] leading-tight`}>{p.name}</p>
                                <p className={`${TAG} text-black/40 mt-1.5`}>{p.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Blog ═══ */}
            <section className={`${SECTION}`} style={{ backgroundColor: PAPER }}>
                <div className={CONTAINER}>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
                        <div className="max-w-xl">
                            <Eyebrow>Blog e artigos</Eyebrow>
                            <h2 className={`mt-4 ${H2} text-[clamp(28px,3.9vw,50px)]`}>
                                O que a gente aprende, a gente escreve.
                            </h2>
                            <p className="mt-5 text-[15px] md:text-[17px] tracking-[-0.01em] text-black/45 leading-relaxed">
                                Sem fórmula mágica e sem jargão: o que funciona em Manaus,
                                com número na mesa.
                            </p>
                        </div>

                        <a
                            href="/blog"
                            className="group inline-flex flex-shrink-0 items-center gap-2.5 rounded-full bg-[#131313] hover:bg-[#14261A] text-white font-semibold text-sm pl-6 pr-2 py-2 transition-colors"
                        >
                            Ver tudo
                            <span className="w-8 h-8 rounded-full bg-[#8DC63F] text-[#0B0E0C] flex items-center justify-center transition-transform group-hover:rotate-45">
                                <Arrow className="w-4 h-4 -rotate-45" />
                            </span>
                        </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {BLOG_PICKS.map(({ slug, photo }) => {
                            const post = POSTS.find((x) => x.slug === slug);
                            if (!post) return null;
                            return (
                                <a
                                    key={slug}
                                    href={`/blog/${slug}`}
                                    className="group relative rounded-[22px] overflow-hidden aspect-[4/5] flex flex-col justify-end p-6"
                                >
                                    <img
                                        src={photo}
                                        alt=""
                                        loading="lazy"
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E0C] via-[#0B0E0C]/50 to-[#0B0E0C]/10" />

                                    <span
                                        className={`relative ${TAG} text-white/60 mb-3`}
                                    >
                                        {post.category}
                                    </span>
                                    <h3 className={`relative ${H2} text-[21px] text-white leading-[1.15]`}>
                                        {post.title}
                                    </h3>
                                    <span className="relative mt-4 font-mono text-[11px] tracking-[0.1em] uppercase text-[#8DC63F] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                                        Ler artigo <Arrow className="w-3.5 h-3.5" />
                                    </span>
                                </a>
                            );
                        })}
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
                {/* Cachoeira e trilha. Abaixo da dobra, então carrega
                    preguiçoso: não disputa banda com a hero. O véu é mais
                    fechado que o da hero porque a foto é clara — sem ele o
                    texto branco e o botão limão sumiriam. */}
                <picture aria-hidden="true">
                    <source
                        type="image/webp"
                        sizes="100vw"
                        srcSet={
                            '/norte/hero/fundo-contato-640.webp 640w, ' +
                            '/norte/hero/fundo-contato-1024.webp 1024w, ' +
                            '/norte/hero/fundo-contato-1440.webp 1440w, ' +
                            '/norte/hero/fundo-contato-1920.webp 1920w, ' +
                            '/norte/hero/fundo-contato-2400.webp 2400w'
                        }
                    />
                    <img
                        src="/norte/hero/fundo-contato-1440.jpg"
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                </picture>

                <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                        background:
                            'linear-gradient(105deg, rgba(11,20,14,0.95) 0%, rgba(13,26,18,0.91) 44%, rgba(14,30,20,0.85) 74%, rgba(15,32,21,0.80) 100%)',
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
                                href={FORMULARIO}
                                className="group inline-flex items-center gap-3 rounded-full bg-[#8DC63F] hover:bg-[#9ed650] text-[#0B0E0C] font-semibold text-sm md:text-base pl-7 pr-2.5 py-2.5 transition-colors"
                            >
                                Começar a conversa
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
