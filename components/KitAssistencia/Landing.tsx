import React from 'react';
import { CountUp, stagger, useRevealOnView, useScrollReveal } from '../motion';

// /kit-assistencia-tecnica-plus — LP da oferta do Kit.
//
// Identidade própria, separada da Norte e da marca pessoal do Ed: preto
// profundo, vermelho de marca, Big Shoulders no display e Outfit no texto.
// Paleta e tipografia vêm do playbook do produto.
//
// COMPLIANCE (Seção 8 do playbook, regra 1): a autorização por escrito da
// iTV Manaus e da SOS TV ainda não saiu. Enquanto não sair, esta página
// não nomeia cliente e não cita número de cliente — só "duas assistências
// que eu atendo" e "seis dígitos", que é o texto que o próprio playbook
// autoriza nesse estado. Quando a autorização chegar, é trocar PROVA.
//
// Regra 2: resultado de cliente não é promessa. O aviso ao pé da prova
// não é enfeite jurídico — Meta e Google derrubam anúncio por promessa de
// ganho, e o CDC trata como publicidade enganosa.

const BG = '#131316';
const PANEL = '#1C1D22';
const PANEL_HI = '#222329';
const RED = '#E3242B';
const RED_DARK = '#B0141B';
const INK = '#F5F5F7';
const MUTED = '#A6A9B0';
const LINE = '#33343B';

const WHATSAPP =
    'https://wa.me/5592985146299?text=' +
    encodeURIComponent(
        'Oi Ed! Vi a página do Kit Assistência Técnica Plus e quero entender como funciona pra minha assistência.',
    );

const DISPLAY = 'font-kit font-bold uppercase leading-[0.92] tracking-[-0.01em]';
const LABEL = 'font-mono text-[10px] tracking-[0.18em] uppercase';

// Anel da hero: as cinco peças mais cinco fatos da oferta, dez cartas a
// 36° de passo. Mesma mecânica da home, só com outra pele.
const RING = [
    { tag: 'Módulo 01', valor: 'LP', nota: 'página de orçamento' },
    { tag: 'Entrega', valor: '5', nota: 'dias úteis', solid: true },
    { tag: 'Módulo 02', valor: 'Google', nota: 'campanha na sua conta' },
    { tag: 'No Pix', valor: 'R$ 997', nota: 'à vista', solid: true },
    { tag: 'Módulo 03', valor: 'Script', nota: 'roteiros de WhatsApp' },
    { tag: 'Garantia', valor: '100%', nota: 'de volta se atrasar', solid: true },
    { tag: 'Módulo 04', valor: 'Maps', nota: 'Google Meu Negócio' },
    { tag: 'No cartão', valor: '12x', nota: 'de R$ 125', solid: true },
    { tag: 'Módulo 05', valor: 'IA 24h', nota: 'atendente no WhatsApp' },
    { tag: 'Verba', valor: 'Sua', nota: 'fica na sua conta', solid: true },
];

const RING_STEP = 360 / RING.length;
const RING_DUR = 72;
const RING_LIFT = [0, 11, -7, 5, -12, 4, 13, -5, 8, -9];
const ringDelay = (i: number) => -(RING_DUR * (1 - i / RING.length));

const HERO_WORDS = ['A', 'máquina', 'de', 'cliente', 'novo', 'da', 'sua', 'assistência'];

const MODULOS = [
    {
        n: '01',
        nome: 'LP Profissional',
        texto:
            'Uma página de orçamento com um objetivo só: transformar quem chega em pedido de orçamento no seu WhatsApp. Sem menu, sem distração, sem "quem somos".',
    },
    {
        n: '02',
        nome: 'Campanha no Google',
        texto:
            'De 2 a 3 campanhas montadas dentro da sua própria conta do Google Ads, com segmentação da sua região. Você define a verba e ativa. Conserto é demanda de pesquisa: o cliente já está procurando.',
    },
    {
        n: '03',
        nome: 'Script de Vendas',
        texto:
            'Os roteiros de WhatsApp que faltam: primeira resposta, follow-up de orçamento parado, recuperação de cliente que sumiu e oferta de serviço adicional.',
    },
    {
        n: '04',
        nome: 'Google Meu Negócio',
        texto:
            'Perfil otimizado de ponta a ponta — fotos, descrição, lista de serviços e resposta às avaliações. É o que decide quem aparece no mapa quando alguém busca conserto por perto.',
    },
    {
        n: '05',
        nome: 'Atendente de WhatsApp com IA',
        texto:
            'CRM com atendente de IA 24h pela Gyrehub. O primeiro mês vem incluso no kit. Depois é opcional, a partir de R$ 250/mês — e sem renovação automática: se você não quiser seguir, simplesmente acaba.',
        plus: true,
    },
];

// Maquete de cada peça. Tudo HTML e CSS: nenhuma imagem entra no bundle
// e nada serrilha em tela densa.
const Mock: React.FC<{ n: string }> = ({ n }) => {
    const bar = 'rounded-full';
    const cinza = { backgroundColor: '#3A3B43' };

    if (n === '01')
        return (
            <div className="rounded-md overflow-hidden border" style={{ borderColor: LINE, backgroundColor: '#0D0E11' }}>
                <div className="flex items-center gap-1 px-2.5 py-2 border-b" style={{ borderColor: LINE }}>
                    {[0, 1, 2].map((i) => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full" style={cinza} />
                    ))}
                    <span className={`ml-2 h-1.5 flex-1 ${bar}`} style={cinza} />
                </div>
                <div className="p-3">
                    <div className="h-8 rounded mb-2" style={{ background: `linear-gradient(90deg, ${RED}40, transparent)` }} />
                    <div className={`h-1.5 w-3/4 ${bar} mb-1.5`} style={cinza} />
                    <div className={`h-1.5 w-1/2 ${bar} mb-3`} style={cinza} />
                    <span className="block h-5 w-24 rounded" style={{ backgroundColor: RED }} />
                </div>
            </div>
        );

    if (n === '02')
        return (
            <div className="rounded-md border p-3 space-y-2.5" style={{ borderColor: LINE, backgroundColor: '#0D0E11' }}>
                {[0, 1, 2].map((i) => (
                    <div key={i} className="flex items-start gap-2">
                        <span
                            className="font-mono text-[7px] px-1 py-0.5 rounded flex-shrink-0"
                            style={{ backgroundColor: i === 0 ? RED : '#2A2B32', color: INK }}
                        >
                            {i === 0 ? 'AD' : '—'}
                        </span>
                        <span className="flex-1">
                            <span className={`block h-1.5 ${bar} mb-1`} style={{ ...cinza, width: `${88 - i * 16}%` }} />
                            <span className={`block h-1.5 w-2/5 ${bar}`} style={{ backgroundColor: '#2A2B32' }} />
                        </span>
                    </div>
                ))}
            </div>
        );

    if (n === '03')
        return (
            <div className="rounded-md border p-3 space-y-2" style={{ borderColor: LINE, backgroundColor: '#0D0E11' }}>
                <span className="block w-[70%] rounded-lg rounded-tl-sm px-2.5 py-2" style={{ backgroundColor: '#22232A' }}>
                    <span className={`block h-1.5 w-full ${bar} mb-1`} style={cinza} />
                    <span className={`block h-1.5 w-2/3 ${bar}`} style={cinza} />
                </span>
                <span className="block w-[78%] ml-auto rounded-lg rounded-br-sm px-2.5 py-2" style={{ backgroundColor: RED }}>
                    <span className={`block h-1.5 w-full ${bar} mb-1`} style={{ backgroundColor: '#ffffff70' }} />
                    <span className={`block h-1.5 w-3/5 ${bar}`} style={{ backgroundColor: '#ffffff70' }} />
                </span>
            </div>
        );

    if (n === '04')
        return (
            <div className="rounded-md border p-3" style={{ borderColor: LINE, backgroundColor: '#0D0E11' }}>
                <div className="flex items-center gap-2.5 mb-3">
                    <span className="w-8 h-8 rounded flex-shrink-0" style={{ backgroundColor: '#22232A' }} />
                    <span className="flex-1">
                        <span className={`block h-1.5 w-2/3 ${bar} mb-1.5`} style={cinza} />
                        <span className="flex gap-0.5" aria-hidden="true">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <span key={i} className="text-[8px]" style={{ color: RED }}>★</span>
                            ))}
                        </span>
                    </span>
                </div>
                <div className="h-10 rounded relative overflow-hidden" style={{ backgroundColor: '#191A20' }}>
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: RED }} />
                </div>
            </div>
        );

    return (
        <div className="rounded-md border p-3" style={{ borderColor: LINE, backgroundColor: '#0D0E11' }}>
            <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center font-mono text-[8px] flex-shrink-0" style={{ backgroundColor: RED, color: INK }}>
                    IA
                </span>
                <span className={`h-1.5 w-1/3 ${bar}`} style={cinza} />
                <span className="ml-auto font-mono text-[7px]" style={{ color: MUTED }}>24h</span>
            </div>
            <span className="block w-[72%] rounded-lg rounded-tl-sm px-2.5 py-2 mb-2" style={{ backgroundColor: '#22232A' }}>
                <span className={`block h-1.5 w-full ${bar} mb-1`} style={cinza} />
                <span className={`block h-1.5 w-1/2 ${bar}`} style={cinza} />
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg px-2.5 py-2" style={{ backgroundColor: '#22232A' }}>
                {[0, 1, 2].map((i) => (
                    <span key={i} className="w-1 h-1 rounded-full animate-bounce" style={{ backgroundColor: MUTED, animationDelay: `${i * 0.15}s` }} />
                ))}
            </span>
        </div>
    );
};

const FAQ = [
    {
        q: 'Isso não é caro?',
        a: 'Faz a conta pelo seu ticket: quantas telas você troca pra cobrir R$ 997? Agora compara com agência, que cobra perto disso todo mês, sem parar. Aqui é uma vez só e a estrutura fica sua.',
    },
    {
        q: 'Eu já tenho quem faz minhas artes.',
        a: 'O kit não é arte. Arte fala com quem já te segue. O que a gente monta é estrutura pra aparecer pra quem ainda não te conhece e está procurando conserto agora.',
    },
    {
        q: 'Já tentei anúncio e não deu certo.',
        a: 'Na maioria das vezes o problema não foi o anúncio: foi mandar o clique pro Instagram ou pro WhatsApp sem página, sem roteiro e sem perfil no mapa. Anúncio sem estrutura embaixo queima verba mesmo.',
    },
    {
        q: 'Quanto preciso investir em anúncio?',
        a: 'A verba é sua e fica na sua conta do Google — a gente nunca toca no seu dinheiro. A recomendação pra começar é a partir de R$ 30 por dia, e dá pra subir ou parar quando você quiser.',
    },
    {
        q: 'E se não ficar pronto no prazo?',
        a: 'Devolvo 100%. O prazo de 5 dias úteis começa a contar quando o pagamento é confirmado e o formulário de onboarding está respondido — se a resposta demorar, o relógio para junto.',
    },
    {
        q: 'Depois da entrega eu fico sozinho?',
        a: 'Não. Tem uma rodada de ajustes até 7 dias depois da entrega e suporte a dúvidas por 15 dias. Se você quiser que eu siga cuidando das campanhas todo mês, isso existe à parte — mas não é obrigatório.',
    },
];

// Card do anel — pele do Kit sobre a mecânica da home.
const RingCard: React.FC<{ c: (typeof RING)[number]; i: number }> = ({ c, i }) => (
    <div
        className="fan-item flex flex-col justify-between rounded-lg border p-4 md:p-5 w-[146px] h-[184px] md:w-[208px] md:h-[236px]"
        style={{
            borderColor: c.solid ? RED : LINE,
            backgroundColor: c.solid ? RED : PANEL,
            ['--ry' as string]: `${i * RING_STEP}deg`,
            ['--ty' as string]: `${RING_LIFT[i]}px`,
            animationDelay: `${ringDelay(i)}s`,
        }}
    >
        <span className={LABEL} style={{ color: c.solid ? '#FFFFFFB3' : RED }}>
            {c.tag}
        </span>
        <span>
            <span className={`${DISPLAY} block text-[30px] md:text-[38px] mb-1`}>{c.valor}</span>
            <span className="block text-[11px] md:text-[12px]" style={{ color: c.solid ? '#FFFFFFCC' : MUTED }}>
                {c.nota}
            </span>
        </span>
    </div>
);

// Célula de módulo: sobe de baixo quando entra na tela, com a maquete em cima.
const ModuloCard: React.FC<{ m: (typeof MODULOS)[number]; col: number }> = ({ m, col }) => {
    const [ref, state] = useRevealOnView<HTMLDivElement>();
    return (
        <div
            ref={ref}
            className={`svc ${state === 'off' ? 'svc-off' : ''} rounded-lg border p-6 md:p-7 flex flex-col`}
            style={{
                borderColor: m.plus ? RED_DARK : LINE,
                backgroundColor: m.plus ? PANEL_HI : PANEL,
                transitionDelay: `${col * 90}ms`,
            }}
        >
            <div className="flex items-center justify-between gap-3 mb-5">
                <span className={LABEL} style={{ color: RED }}>
                    Módulo {m.n}
                </span>
                {m.plus && (
                    <span className={`${LABEL} px-2 py-1 rounded`} style={{ backgroundColor: RED, color: INK }}>
                        Plus
                    </span>
                )}
            </div>

            <div className="mb-5">
                <Mock n={m.n} />
            </div>

            <h3 className={`${DISPLAY} text-[26px] mb-3`}>{m.nome}</h3>
            <p className="text-[15px] leading-relaxed" style={{ color: MUTED }}>
                {m.texto}
            </p>
        </div>
    );
};

const KitLanding: React.FC = () => {
    // Mesma cascata do título da home: piso alto porque o H1 é o elemento
    // de LCP e o que o robô de busca lê — suaviza sem esconder.
    const heroProgress = useScrollReveal(420);

    return (
    <div
        className="min-h-screen font-kitBody antialiased"
        style={{ backgroundColor: BG, color: INK }}
    >
        {/* ─── Barra ─── */}
        <header
            className="sticky top-0 z-40 border-b backdrop-blur-md"
            style={{ borderColor: LINE, backgroundColor: `${BG}E6` }}
        >
            <div className="max-w-[1120px] mx-auto px-5 md:px-8 py-3.5 flex items-center justify-between gap-4">
                <span className="flex items-baseline gap-2 min-w-0">
                    <span className={`${DISPLAY} text-[19px]`}>Kit Assistência</span>
                    <span
                        className={`${DISPLAY} text-[19px] px-1.5`}
                        style={{ backgroundColor: RED, color: INK }}
                    >
                        Plus
                    </span>
                </span>
                <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 rounded-md px-4 py-2.5 text-[13px] font-semibold transition-colors"
                    style={{ backgroundColor: RED, color: INK }}
                >
                    Falar no WhatsApp
                </a>
            </div>
        </header>

        <main>
            {/* ─── Hero ─── */}
            <section className="relative overflow-hidden pt-12 md:pt-16 pb-10 md:pb-14">
                {/* Foto da loja cheia. Entra como <picture> e não como
                    background-image de propósito: assim o navegador acha a
                    imagem já no HTML pré-renderizado, escolhe a largura pelo
                    srcset e trata como LCP. */}
                <picture aria-hidden="true">
                    <source
                        type="image/webp"
                        sizes="100vw"
                        srcSet={
                            '/kit/bg/hero-kit-640.webp 640w, ' +
                            '/kit/bg/hero-kit-1024.webp 1024w, ' +
                            '/kit/bg/hero-kit-1440.webp 1440w, ' +
                            '/kit/bg/hero-kit-1920.webp 1920w, ' +
                            '/kit/bg/hero-kit-2400.webp 2400w'
                        }
                    />
                    <img
                        src="/kit/bg/hero-kit-1440.jpg"
                        alt=""
                        fetchPriority="high"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                </picture>

                {/* Véu pesado. A foto é vermelha e cheia de texto de placa —
                    sem fechar bastante, ela briga com o título e as placas
                    da loja fictícia da imagem ganham leitura que não devem
                    ter. Fecha de vez no rodapé pra emendar na faixa seguinte. */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                        background:
                            'linear-gradient(to bottom, rgba(19,19,22,0.90) 0%, rgba(19,19,22,0.86) 40%, rgba(19,19,22,0.94) 78%, #131316 100%)',
                    }}
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                        background:
                            'linear-gradient(100deg, rgba(19,19,22,0.82) 0%, rgba(19,19,22,0.35) 55%, rgba(19,19,22,0.55) 100%)',
                    }}
                />

                <div className="relative max-w-[1120px] mx-auto px-5 md:px-8">
                {/* Texto à esquerda, selo à direita. No celular não existe
                    coluna lateral, então ele volta pra cima do título. */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                    <div className="lg:col-span-7">
                        <span className={`${LABEL} inline-block mb-6`} style={{ color: RED }}>
                            Para donos de assistência técnica
                        </span>

                        {/* Cascata palavra a palavra, igual à home */}
                        <h1 className={`${DISPLAY} text-[clamp(40px,6.6vw,74px)] mb-6`}>
                            {HERO_WORDS.map((w, i) => {
                                const t = stagger(i, HERO_WORDS.length, heroProgress, 0.45);
                                return (
                                    <React.Fragment key={`${w}-${i}`}>
                                        <span
                                            className="inline-block"
                                            style={{
                                                opacity: 0.38 + t * 0.62,
                                                filter: `blur(${(1 - t) * 4.5}px)`,
                                                willChange: 'filter, opacity',
                                            }}
                                        >
                                            {w}
                                        </span>{' '}
                                    </React.Fragment>
                                );
                            })}
                        </h1>

                        <p
                            className="text-[17px] md:text-[19px] leading-relaxed max-w-xl mb-8"
                            style={{ color: MUTED }}
                        >
                            Não é pacote de arte nem site bonito. É a estrutura que faz
                            gente que nunca ouviu falar de você pedir orçamento no seu
                            WhatsApp — montada e ligada em{' '}
                            <strong style={{ color: INK }}>5 dias úteis</strong>.
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <a
                                href={WHATSAPP}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-md px-8 py-4 text-[15px] font-bold transition-colors"
                                style={{ backgroundColor: RED, color: INK }}
                            >
                                Quero montar a minha
                                <span aria-hidden="true">→</span>
                            </a>
                            <span className="text-[14px]" style={{ color: MUTED }}>
                                Pronto em 5 dias úteis ou{' '}
                                <strong style={{ color: INK }}>
                                    100% do dinheiro de volta
                                </strong>
                                .
                            </span>
                        </div>
                    </div>

                    <div className="lg:col-span-5 order-first lg:order-last flex justify-center lg:justify-end">
                        <img
                            src="/kit/logo-kit.png"
                            alt="Kit Assistência Técnica Plus"
                            width={900}
                            height={777}
                            fetchPriority="high"
                            className="w-[230px] sm:w-[280px] lg:w-full lg:max-w-[400px] h-auto"
                        />
                    </div>
                </div>

                {/* Anel 3D — mesma mecânica da home, outra pele */}
                <div
                    className="fan-mask -mx-5 md:mx-0 mt-12 md:mt-14 overflow-hidden md:overflow-visible"
                >
                    <div
                        className="fan-stage"
                        style={{ perspective: 'clamp(760px, 140vw, 1900px)', perspectiveOrigin: '50% 45%' }}
                    >
                        <div
                            className="fan-group kit-ring"
                            style={{ ['--dur' as string]: `${RING_DUR}s` }}
                        >
                            {RING.map((c, i) => (
                                <RingCard key={c.tag + c.valor} c={c} i={i} />
                            ))}
                        </div>
                    </div>
                </div>
                </div>
            </section>

            {/* ─── Números ─── */}
            <section className="border-y" style={{ borderColor: LINE }}>
                <div className="max-w-[1120px] mx-auto px-5 md:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x" style={{ borderColor: LINE }}>
                        {[
                            { v: 5, suf: '', label: 'dias úteis de entrega' },
                            { v: 5, suf: '', label: 'peças na estrutura' },
                            { v: 100, suf: '%', label: 'de volta se atrasar' },
                            { v: 24, suf: 'h', label: 'de atendente com IA' },
                        ].map((n, i) => (
                            <div
                                key={n.label}
                                className={`py-6 ${i > 0 ? 'md:pl-6' : ''} ${i > 1 ? 'border-t md:border-t-0' : ''}`}
                                style={{ borderColor: LINE }}
                            >
                                <CountUp
                                    value={n.v}
                                    suffix={n.suf}
                                    className={`${DISPLAY} text-[34px] md:text-[42px] block`}
                                />
                                <p className="text-[12px] md:text-[13px] mt-1" style={{ color: MUTED }}>
                                    {n.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── O problema ─── */}
            <section className="border-y" style={{ borderColor: LINE, backgroundColor: PANEL }}>
                <div className="max-w-[1120px] mx-auto px-5 md:px-8 py-14 md:py-20">
                    <span className={`${LABEL} inline-block mb-5`} style={{ color: RED }}>
                        O teto invisível
                    </span>
                    <h2 className={`${DISPLAY} text-[clamp(30px,5vw,50px)] max-w-[20ch] mb-6`}>
                        Sua loja não tem problema de serviço. Tem problema de fila.
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 max-w-4xl">
                        <p className="text-[15px] leading-relaxed" style={{ color: MUTED }}>
                            O movimento vem de indicação. Quando a indicação esfria, o mês
                            esfria junto — e não tem botão pra ligar de novo.
                        </p>
                        <p className="text-[15px] leading-relaxed" style={{ color: MUTED }}>
                            O concorrente da avenida não conserta melhor que você. Ele só
                            aparece primeiro pra quem está procurando agora.
                        </p>
                        <p className="text-[15px] leading-relaxed" style={{ color: MUTED }}>
                            Post bonito fala com quem já te conhece. Cliente novo não está
                            no seu Instagram: está pesquisando conserto no Google.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── Os módulos ─── */}
            <section className="max-w-[1120px] mx-auto px-5 md:px-8 py-14 md:py-20">
                <span className={`${LABEL} inline-block mb-5`} style={{ color: RED }}>
                    O que você recebe
                </span>
                <h2 className={`${DISPLAY} text-[clamp(30px,5vw,50px)] max-w-[18ch] mb-10`}>
                    Cinco peças. Uma estrutura só.
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {MODULOS.map((m, i) => (
                        <ModuloCard key={m.n} m={m} col={i % 2} />
                    ))}
                </div>
            </section>

            {/* ─── Prova ─── */}
            <section className="border-y" style={{ borderColor: LINE, backgroundColor: PANEL }}>
                <div className="max-w-[1120px] mx-auto px-5 md:px-8 py-14 md:py-20">
                    <span className={`${LABEL} inline-block mb-5`} style={{ color: RED }}>
                        Por que eu
                    </span>
                    <h2 className={`${DISPLAY} text-[clamp(30px,5vw,50px)] max-w-[22ch] mb-6`}>
                        Duas assistências que eu atendo passaram dos seis dígitos por mês
                    </h2>
                    <p
                        className="text-[16px] md:text-[18px] leading-relaxed max-w-2xl mb-6"
                        style={{ color: MUTED }}
                    >
                        Sou gestor de tráfego desde 2020 e escolhi um nicho só: assistência
                        técnica. O kit é a mesma estrutura que eu montei pra elas,
                        empacotada — sem a mensalidade de agência no meio.
                    </p>
                    <p
                        className="text-[13px] leading-relaxed max-w-2xl border-l-2 pl-4"
                        style={{ color: MUTED, borderColor: LINE }}
                    >
                        Resultado delas, com a operação delas. O que você contrata aqui é a
                        montagem da estrutura, não um número garantido — quem entrega
                        resultado é o conjunto: estrutura, verba e o seu atendimento.
                    </p>
                </div>
            </section>

            {/* ─── Preço ─── */}
            <section id="preco" className="max-w-[1120px] mx-auto px-5 md:px-8 py-14 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div
                        className="rounded-lg p-8 md:p-10 flex flex-col justify-center"
                        style={{ backgroundColor: RED }}
                    >
                        <span className={`${LABEL} mb-4`} style={{ color: '#FFFFFFB3' }}>
                            No Pix, à vista
                        </span>
                        <p className="flex items-start gap-1">
                            <span className={`${DISPLAY} text-[28px] mt-3`}>R$</span>
                            <span className={`${DISPLAY} text-[clamp(72px,14vw,120px)]`}>997</span>
                        </p>
                        <p className="text-[15px] mt-3" style={{ color: '#FFFFFFD9' }}>
                            De <s>R$ 2.000</s> — o desconto é pra quem fecha no Pix.
                        </p>
                    </div>

                    <div
                        className="rounded-lg border p-8 md:p-10 flex flex-col justify-center"
                        style={{ borderColor: LINE, backgroundColor: PANEL }}
                    >
                        <span className={`${LABEL} mb-4`} style={{ color: MUTED }}>
                            Ou no cartão
                        </span>
                        <p className={`${DISPLAY} text-[clamp(40px,7vw,62px)] mb-3`}>
                            12x de R$ 125
                        </p>
                        <p className="text-[15px] leading-relaxed mb-6" style={{ color: MUTED }}>
                            Total de R$ 1.500, parcelado em até 12 vezes. Sem repasse de
                            juros pra você — a taxa fica comigo.
                        </p>
                        <ul className="space-y-2.5 text-[14px]" style={{ color: MUTED }}>
                            {[
                                'Pagamento pela InfinitePay',
                                'Entrega em 5 dias úteis ou 100% de volta',
                                '1 rodada de ajustes em até 7 dias',
                                'Suporte a dúvidas por 15 dias',
                            ].map((l) => (
                                <li key={l} className="flex items-start gap-2.5">
                                    <span style={{ color: RED }} aria-hidden="true">
                                        ✓
                                    </span>
                                    {l}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                    <a
                        href={WHATSAPP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-md px-8 py-4 text-[15px] font-bold transition-colors"
                        style={{ backgroundColor: RED, color: INK }}
                    >
                        Quero o meu kit
                        <span aria-hidden="true">→</span>
                    </a>
                    <p className="text-[14px]" style={{ color: MUTED }}>
                        Monto os kits pessoalmente, então abro poucas vagas por semana.
                        A verba de anúncio é sua e fica na sua conta do Google.
                    </p>
                </div>
            </section>

            {/* ─── Dúvidas ─── */}
            <section className="border-t" style={{ borderColor: LINE, backgroundColor: PANEL }}>
                <div className="max-w-[900px] mx-auto px-5 md:px-8 py-14 md:py-20">
                    <span className={`${LABEL} inline-block mb-5`} style={{ color: RED }}>
                        O que sempre perguntam
                    </span>
                    <h2 className={`${DISPLAY} text-[clamp(30px,5vw,50px)] mb-10`}>
                        Perguntas honestas
                    </h2>

                    <div className="divide-y" style={{ borderColor: LINE }}>
                        {FAQ.map((f) => (
                            <div key={f.q} className="py-6 first:pt-0" style={{ borderColor: LINE }}>
                                <h3 className={`${DISPLAY} text-[22px] mb-3`}>{f.q}</h3>
                                <p className="text-[15px] leading-relaxed" style={{ color: MUTED }}>
                                    {f.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Fechamento ─── */}
            <section className="max-w-[1120px] mx-auto px-5 md:px-8 py-16 md:py-24 text-center">
                <h2 className={`${DISPLAY} text-[clamp(34px,6.5vw,68px)] max-w-[16ch] mx-auto mb-6`}>
                    Me conta de qual assistência você fala
                </h2>
                <p
                    className="text-[16px] md:text-[18px] leading-relaxed max-w-xl mx-auto mb-8"
                    style={{ color: MUTED }}
                >
                    Olho o seu perfil, seu Google e sua concorrência na sua região, e te
                    respondo em áudio dizendo o que eu montaria primeiro. Sem custo e sem
                    compromisso.
                </p>
                <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-md px-9 py-4 text-[16px] font-bold transition-colors"
                    style={{ backgroundColor: RED, color: INK }}
                >
                    Chamar no WhatsApp
                    <span aria-hidden="true">→</span>
                </a>
            </section>
        </main>

        <footer className="border-t" style={{ borderColor: LINE }}>
            <div
                className="max-w-[1120px] mx-auto px-5 md:px-8 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12px]"
                style={{ color: MUTED }}
            >
                <span>Kit Assistência Técnica Plus · Ed Rodrigues · Manaus/AM</span>
                <span>(92) 98514-6299</span>
            </div>
        </footer>
    </div>
    );
};

export default KitLanding;
