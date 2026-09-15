import React, { useEffect, useRef, useState } from 'react';
import {
    Arrow,
    Check,
    CountUp,
    useElementReveal,
    useRevealOnView,
    EDGE_FADE,
    stagger,
    IconRocket,
    H2,
    H3,
    TAG,
    PAPER,
    type IconType,
} from './shared';

// Peças visuais da institucional, em arquivo próprio.
//
// Nasceram dentro de NorteLanding.tsx e saíram de lá quando a primeira LP
// de nicho precisou do mesmo anel, das mesmas maquetes e das mesmas
// visualizações de resultado. Duplicar 900 linhas de efeito garante que as
// duas páginas divirjam na primeira correção — e a correção sempre vem.
//
// A regra aqui: o COMPONENTE mora neste arquivo, o DADO mora na página.
// Por isso o acordeão recebe `passos`, o manifesto recebe `tokens` e o anel
// recebe `cards`. Cada página conta a sua história com o mesmo maquinário.

export type Passo = {
    icon: IconType;
    title: string;
    lead: string;
    body: string;
};

export type Reel = {
    client: string;
    label: string;
    src: string;
    poster: string;
};

// Trilhos horizontais sangram até a borda da tela, mas o primeiro card
// nasce alinhado com o container central. O scroll-padding é obrigatório:
// sem ele o snap-mandatory encosta o primeiro card na borda do scrollport
// já no load e engole o recuo.
export const RAIL_GUTTER = 'max(1.25rem, calc((100vw - 1240px) / 2))';
export const RAIL_PAD: React.CSSProperties = {
    paddingLeft: RAIL_GUTTER,
    paddingRight: RAIL_GUTTER,
};
// Só o scroll-padding: a máscara agora vem do useRailMask, que liga cada
// lado conforme existe conteúdo escondido nele.
export const RAIL_SCROLL_PAD: React.CSSProperties = {
    scrollPaddingLeft: RAIL_GUTTER,
    scrollPaddingRight: RAIL_GUTTER,
};
// Anel de cards da hero. Não são dez repetições do mesmo bloco: cada
// carta tem um desenho próprio — gráfico, painel, nuvem de tags, destaque
// sólido, manifesto — pra que o anel pareça um punhado de telas de
// trabalho e não uma tabela girando. O dado é sempre real.
export type FanSkin = 'glass' | 'white' | 'lime' | 'dark';
export type FanCard = {
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
// Geometria do anel. Passo = 360° / nº de cartas, então elas se distribuem
// pela volta inteira e vão se alternando na frente conforme gira.
//
// Quantas cartas aparecem de uma vez é o passo angular que decide, não o
// raio: só a metade da frente do anel é visível, então cabem 180°/passo.
// Com 10 cartas o passo era 36° e davam cinco. Com 16 ele cai pra 22,5° e
// entram oito na cena, que é a densidade da referência.
//
// O raio manda no aperto entre vizinhas pela corda 2·R·sen(11,25°) ≈
// 0,39·R. Com 505 a corda dá 197px pra uma carta de 196: elas encostam na
// frente e se sobrepõem nas laterais, que é o baralho que a referência
// tem. Raio 680 abria 69px de folga e voltava a parecer espalhado.
//
// Num anel fechado, aperto e quantidade em cena são a mesma conta:
// R·passo ≈ largura da carta e visíveis = 180°/passo. Não dá pra ter as
// duas coisas mexendo só no raio — quem afrouxa a compressão das pontas
// sem afastar o miolo é a perspectiva, por isso ela ficou distante.
// RING_R e CARD_W vivem no CSS (--r e --cw), porque mudam no breakpoint:
// 505/196 no desktop, 350/118 no celular. Aqui fica só o que não muda.
// o passo sai do tamanho do anel que a página passar, não de um FAN fixo
const passoDoAnel = (n: number) => 360 / n;
// Mais cartas na volta pedem volta mais longa: a 84s cada uma passa pela
// frente a cada 5,3s, tempo de ler antes de ela girar.
const RING_DUR = 84;
// A perspectiva acompanha o raio: mantida em 2000 numa tela de 390px o
// anel viraria quase uma fileira reta, sem profundidade nenhuma.
const PERSPECTIVE: React.CSSProperties = {
    perspective: 'clamp(760px, 140vw, 2000px)',
    perspectiveOrigin: '50% 45%',
};
// Atraso negativo por carta: sincroniza o fade de cada uma com o momento
// exato em que ela cruza os 90° do anel.
const cardDelay = (i: number, n: number) => -(RING_DUR * (1 - i / n));
// Desníveis pequenos e irregulares: alinhamento perfeito lê como planilha,
// e zigue-zague regular vira serrote quando o anel roda.
const RING_LIFT = [0, 12, -8, 5, -13, 7, 14, -6, 9, -10, 3, 15, -4, 11, -7, 6];
export const CARD_SKIN: Record<
    FanSkin,
    { box: string; tag: string; metric: string; label: string; muted: string; edge: string }
> = {
    glass: {
        box: 'bg-[#14261A]/55 border-white/25 text-white',
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
const MOCK = 'absolute rounded-xl bg-white border border-black/[0.07] shadow-[0_12px_34px_rgba(11,14,12,0.13)]';
const LINE = 'rounded-full bg-black/[0.09]';
export const ServiceMock: React.FC<{ slug: string }> = ({ slug }) => {
    if (slug === 'trafego-pago') {
        return (
            <>
                <div className={`${MOCK} left-0 top-3 w-[150px] p-3.5 !bg-[#131313] !border-[#131313] -rotate-6`}>
                    <p className={`${H3} text-[11px] text-white leading-none`}>Custo por lead</p>
                    <p className="text-[8px] text-white/40 mt-1">últimos 30 dias</p>
                    <CountUp
                        prefix="R$ "
                        value={1.57}
                        decimals={2}
                        className={`${H2} text-[30px] text-white leading-none mt-4 block`}
                    />
                </div>
                <div className={`${MOCK} right-0 bottom-2 w-[176px] p-3.5 rotate-3`}>
                    <div className="flex items-baseline justify-between mb-2">
                        <span className="text-[9px] text-black/45">Verba do mês</span>
                        <CountUp value={68} suffix="%" className={`${H3} text-[11px]`} />
                    </div>
                    <div className="h-1.5 rounded-full bg-black/[0.08] mb-3">
                        <div className="svc-fill h-full w-[68%] rounded-full bg-[#8DC63F]" />
                    </div>
                    {['Meta Ads', 'Google Ads', 'TikTok'].map((c, i) => (
                        <div key={c} className="flex items-center justify-between py-1.5 border-t border-black/5">
                            <span className="text-[9px] text-black/55">{c}</span>
                            <span className={`h-1.5 ${LINE}`} style={{ width: [34, 24, 15][i] }} />
                        </div>
                    ))}
                </div>
            </>
        );
    }

    if (slug === 'social-media') {
        return (
            <>
                <div className={`${MOCK} left-1 top-0 w-[142px] p-2.5 -rotate-3`}>
                    <div className="h-[86px] rounded-lg bg-gradient-to-br from-[#8DC63F]/35 to-[#14261A]/20 mb-2.5" />
                    <div className={`h-1.5 w-full ${LINE} mb-1.5`} />
                    <div className={`h-1.5 w-2/3 ${LINE}`} />
                </div>
                <div className={`${MOCK} right-0 top-8 w-[128px] p-3 rotate-6`}>
                    <p className={`${TAG} text-black/35 mb-2.5`}>Semana</p>
                    <div className="flex items-end gap-1 h-[42px]">
                        {[38, 52, 44, 68, 82, 61, 100].map((h, i) => (
                            <div
                                key={i}
                                className={`svc-bar flex-1 rounded-[2px] ${i === 6 ? 'bg-[#8DC63F]' : 'bg-black/[0.09]'}`}
                                style={{ height: `${h}%`, transitionDelay: `${180 + i * 55}ms` }}
                            />
                        ))}
                    </div>
                </div>
                <div className={`${MOCK} left-8 bottom-1 w-[112px] px-3 py-2 rotate-2 flex items-center gap-2`}>
                    <span className="w-6 h-6 rounded-full bg-[#8DC63F]" />
                    <div className="flex-1">
                        <div className={`h-1.5 w-full ${LINE} mb-1`} />
                        <div className={`h-1.5 w-1/2 ${LINE}`} />
                    </div>
                </div>
            </>
        );
    }

    if (slug === 'branding') {
        return (
            <>
                <div className={`${MOCK} left-0 top-2 w-[126px] p-3.5 -rotate-6`}>
                    <p className={`${TAG} text-black/35 mb-3`}>Paleta</p>
                    <div className="grid grid-cols-4 gap-1.5">
                        {['#14261A', '#8DC63F', '#F5F5F3', '#131313'].map((c) => (
                            <span
                                key={c}
                                className="aspect-square rounded-md border border-black/5"
                                style={{ backgroundColor: c }}
                            />
                        ))}
                    </div>
                    <div className={`h-1.5 w-3/4 ${LINE} mt-3`} />
                </div>
                <div className={`${MOCK} right-1 bottom-1 w-[136px] p-3.5 rotate-3`}>
                    <p className={`${H2} text-[42px] leading-none`}>Aa</p>
                    <div className="mt-3 space-y-1.5">
                        <div className={`h-1.5 w-full ${LINE}`} />
                        <div className={`h-1.5 w-4/5 ${LINE}`} />
                        <div className={`h-1.5 w-2/3 ${LINE}`} />
                    </div>
                </div>
            </>
        );
    }

    if (slug === 'sites-e-landing-pages') {
        return (
            <>
                <div className={`${MOCK} left-0 top-1 w-[184px] overflow-hidden -rotate-3`}>
                    <div className="flex items-center gap-1 px-2.5 py-2 border-b border-black/[0.07]">
                        <span className="w-1.5 h-1.5 rounded-full bg-black/15" />
                        <span className="w-1.5 h-1.5 rounded-full bg-black/15" />
                        <span className="w-1.5 h-1.5 rounded-full bg-black/15" />
                        <span className={`ml-2 h-1.5 flex-1 ${LINE}`} />
                    </div>
                    <div className="p-3">
                        <div className="h-[42px] rounded-md bg-gradient-to-br from-[#8DC63F]/30 to-transparent mb-2.5" />
                        <div className={`h-1.5 w-3/4 ${LINE} mb-1.5`} />
                        <div className={`h-1.5 w-1/2 ${LINE} mb-3`} />
                        <span className="inline-block rounded-full bg-[#8DC63F] h-4 w-16" />
                    </div>
                </div>
                <div className={`${MOCK} right-2 bottom-0 w-[76px] p-2 rotate-6`}>
                    <div className="h-[30px] rounded-md bg-[#14261A] mb-2" />
                    <div className={`h-1.5 w-full ${LINE} mb-1`} />
                    <div className={`h-1.5 w-2/3 ${LINE} mb-2`} />
                    <span className="block rounded-full bg-[#8DC63F] h-3 w-full" />
                </div>
            </>
        );
    }

    if (slug === 'captacao-de-conteudo') {
        return (
            <>
                <div className={`${MOCK} left-3 top-0 w-[104px] aspect-[9/16] !p-0 overflow-hidden -rotate-6`}>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#14261A] via-[#1d3423] to-[#0B0E0C]" />
                    <span className="absolute inset-0 flex items-center justify-center">
                        <span className="w-8 h-8 rounded-full bg-white/95 flex items-center justify-center text-[9px] text-[#0B0E0C]">
                            ▶
                        </span>
                    </span>
                    <span className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-black/50 px-1.5 py-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E8503A]" />
                        <span className="text-[7px] text-white tracking-wider">REC</span>
                    </span>
                </div>
                <div className={`${MOCK} right-0 top-6 w-[132px] p-3 rotate-3`}>
                    <p className={`${TAG} text-black/35 mb-2.5`}>Roteiro</p>
                    {[100, 78, 88, 60].map((w, i) => (
                        <div key={i} className="flex items-center gap-2 mb-1.5 last:mb-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] flex-shrink-0" />
                            <span className={`h-1.5 ${LINE}`} style={{ width: `${w}%` }} />
                        </div>
                    ))}
                </div>
                <div className={`${MOCK} right-6 bottom-0 w-[104px] px-3 py-2 rotate-[-2deg]`}>
                    <CountUp
                        prefix="+"
                        value={500}
                        suffix=" mil"
                        className={`${H3} text-[11px] leading-none block`}
                    />
                    <p className="text-[8px] text-black/45 mt-1">views/mês</p>
                </div>
            </>
        );
    }

    // eventos
    return (
        <>
            <div className={`${MOCK} left-0 top-1 w-[136px] p-3.5 -rotate-3`}>
                <p className={`${TAG} text-black/35 mb-3`}>Novembro</p>
                <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 21 }).map((_, i) => (
                        <span
                            key={i}
                            className={`aspect-square rounded-[3px] ${
                                i === 12 ? 'bg-[#8DC63F]' : 'bg-black/[0.07]'
                            }`}
                        />
                    ))}
                </div>
            </div>
            <div className={`${MOCK} right-0 bottom-2 w-[150px] p-3.5 rotate-3`}>
                <div className="flex -space-x-2 mb-3">
                    {['#14261A', '#8DC63F', '#131313', '#3d6b12'].map((c) => (
                        <span
                            key={c}
                            className="w-6 h-6 rounded-full border-2 border-white"
                            style={{ backgroundColor: c }}
                        />
                    ))}
                </div>
                <CountUp
                    value={240}
                    suffix=" confirmados"
                    className={`${H3} text-[13px] leading-none block`}
                />
                <div className="h-1.5 rounded-full bg-black/[0.08] mt-3">
                    <div className="svc-fill h-full w-[82%] rounded-full bg-[#8DC63F]" />
                </div>
            </div>
        </>
    );
};
// Corpo da carta — um desenho por `kind`, todos na mesma caixa.
export const FanCardBody: React.FC<{ card: FanCard }> = ({ card }) => {
    const s = CARD_SKIN[card.skin];

    if (card.kind === 'statement') {
        return (
            <>
                <p className={`${TAG} ${s.tag} mb-5`}>{card.tag}</p>
                <p className={`${H2} text-[15px] md:text-[19px] leading-[1.15]`}>{card.line}</p>
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
                <span className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-[#0B0E0C] text-[#8DC63F] flex items-center justify-center mb-3 md:mb-5">
                    <IconRocket className="w-5 h-5" />
                </span>
                <p className={`${H2} text-[22px] md:text-[28px] leading-none mb-1.5 ${s.metric}`}>{card.metric}</p>
                <p className={`text-[11px] ${s.label}`}>{card.label}</p>
                <p className={`${H3} text-[13px] leading-tight mt-auto`}>{card.client}</p>
            </>
        );
    }

    if (card.kind === 'chart') {
        return (
            <>
                <p className={`${TAG} ${s.tag} mb-4`}>{card.tag}</p>
                <div className="flex items-end gap-[3px] h-[38px] md:h-[56px] mb-4 md:mb-5">
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
                <p className={`${H2} text-[19px] md:text-[24px] leading-none mb-1 ${s.metric}`}>{card.metric}</p>
                <p className={`text-[11px] ${s.label}`}>{card.label}</p>
                <p className={`${H3} text-[13px] leading-tight mt-auto`}>{card.client}</p>
            </>
        );
    }

    if (card.kind === 'dash') {
        return (
            <>
                <div className="rounded-xl bg-[#131313] text-white px-2.5 md:px-3 py-2 md:py-2.5 flex items-center justify-between mb-4 md:mb-5">
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
                <p className={`${H2} text-[21px] md:text-[27px] leading-none mb-2 ${s.metric}`}>{card.metric}</p>
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
                <p className={`${H2} text-[20px] md:text-[25px] leading-none mb-1 ${s.metric}`}>{card.metric}</p>
                <p className={`text-[11px] ${s.label}`}>{card.label}</p>
                <p className={`${H3} text-[13px] leading-tight mt-auto`}>{card.client}</p>
            </>
        );
    }

    return (
        <>
            <p className={`${TAG} ${s.tag} mb-5`}>{card.tag}</p>
            <p className={`${H2} text-[21px] md:text-[27px] leading-none mb-1.5 ${s.metric}`}>{card.metric}</p>
            <p className={`text-[11px] ${s.label}`}>{card.label}</p>
            <p className={`${H3} text-[13px] leading-tight mt-auto`}>{card.client}</p>
        </>
    );
};
// Manifesto: as palavras acendem conforme a frase sobe na tela, e dois
// chips de ícone vivem dentro do texto.
export type Token = string | { chip: IconType };
// Depoimentos da vitrine "Resultado real".
//
// ATENÇÃO: os textos abaixo são RASCUNHO escrito pela Norte, não fala
// literal de cliente. Inventar citação e atribuir a empresa real é
// declaração de fato falsa em nome de terceiro. Por isso a atribuição vai
// só no nome da empresa e no segmento, sem nome de pessoa, e a página
// não deve ser divulgada antes de cada cliente validar a sua frase.
// Os números, esses sim, são os resultados reais de cada conta.
export type Depo = {
    client: string;
    tag: string;
    quote: string;
    metric: string;
    label: string;
    photo?: string;
    skin?: 'dark' | 'lime';
};
// Célula de serviço. Sobe de baixo quando entra na tela; as barras e as
// réguas da maquete crescem junto, pelas classes que o CSS observa.
export const ServiceCell: React.FC<{
    slug: string;
    name: string;
    teaser: string;
    column: number;
}> = ({ slug, name, teaser, column }) => {
    const [ref, state] = useRevealOnView<HTMLAnchorElement>();

    return (
        <a
            ref={ref}
            href={`/norte/${slug}`}
            className={`svc ${state === 'off' ? 'svc-off' : ''} group rounded-[24px] bg-white border border-black/[0.07] hover:border-[#8DC63F] hover:shadow-[0_18px_54px_rgba(11,14,12,0.09)] px-7 pt-8 pb-9 transition-all flex flex-col`}
            style={{ transitionDelay: `${column * 90}ms` }}
        >
            <div className="relative h-[214px] mb-7">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[290px] h-[200px] transition-transform duration-500 group-hover:-translate-y-[calc(50%+6px)]">
                    <ServiceMock slug={slug} />
                </div>
            </div>

            <h3 className={`${H2} text-[24px] text-center mb-3`}>{name}</h3>
            <p className="text-[14px] text-black/45 leading-relaxed text-center max-w-[30ch] mx-auto">
                {teaser}
            </p>

            <span className="mt-6 mx-auto font-mono text-[11px] tracking-[0.1em] uppercase text-[#3d6b12] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                Ver detalhes <Arrow className="w-3.5 h-3.5" />
            </span>
        </a>
    );
};
// Sanfona do método. Fechado, o painel é um filete com a palavra em pé;
// aberto, mostra o conteúdo. O estado vive em React em vez de :hover puro
// porque um painel precisa continuar aberto quando o mouse sai de todos —
// e porque assim o teclado abre pelo foco, do mesmo jeito.
export const MethodAccordion: React.FC<{ passos: Passo[] }> = ({ passos }) => {
    const [open, setOpen] = useState(0);

    return (
        <div className="acc">
            {passos.map(({ icon: Icon, title, lead, body }, i) => {
                const isOpen = open === i;
                return (
                    <button
                        key={title}
                        type="button"
                        onMouseEnter={() => setOpen(i)}
                        onFocus={() => setOpen(i)}
                        onClick={() => setOpen(i)}
                        aria-expanded={isOpen}
                        className={`acc-item text-left rounded-[20px] overflow-hidden border transition-colors ${
                            isOpen
                                ? 'is-open bg-white border-black/[0.07] shadow-[0_18px_54px_rgba(11,14,12,0.09)]'
                                : 'bg-[#F5F5F3] border-transparent hover:bg-[#EFEFEB]'
                        }`}
                    >
                        {/* Filete: número em cima, palavra em pé embaixo */}
                        <span className="acc-spine flex-col items-center justify-between py-6">
                            <span className="font-mono text-[11px] text-black/30">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <span
                                className={`acc-word ${H3} text-[15px] uppercase tracking-[0.16em] text-black/60`}
                            >
                                {title}
                            </span>
                            <Icon className="w-5 h-5 text-[#3d6b12]" />
                        </span>

                        <span className="acc-body flex flex-col p-7 md:p-8">
                            <span className="flex items-center justify-between mb-auto">
                                <span className="inline-flex w-11 h-11 rounded-xl bg-[#8DC63F] text-[#0B0E0C] items-center justify-center">
                                    <Icon className="w-5 h-5" />
                                </span>
                                <span className="font-mono text-[11px] text-black/25">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                            </span>

                            <span className="block mt-8">
                                <span className={`block ${TAG} text-black/40 mb-3`}>{lead}</span>
                                <span className={`block ${H2} text-[26px] md:text-[30px] mb-3`}>
                                    {title}
                                </span>
                                <span className="block text-[14px] text-black/50 leading-relaxed max-w-[34ch]">
                                    {body}
                                </span>
                            </span>
                        </span>
                    </button>
                );
            })}
        </div>
    );
};
// Carta da vitrine de depoimentos. Com foto do estabelecimento quando
// existe registro; sem foto, cai num fundo sólido escuro ou limão pra a
// fileira não ficar monótona.
export const DepoCard: React.FC<{ depo: Depo }> = ({ depo }) => {
    const solid = !depo.photo;
    const lime = depo.skin === 'lime';

    return (
        <article
            className={`relative flex-shrink-0 w-[300px] md:w-[352px] h-[420px] md:h-[470px] rounded-[22px] overflow-hidden flex flex-col justify-end p-6 md:p-7 ${
                lime ? 'bg-[#8DC63F] text-[#0B0E0C]' : 'bg-[#131313] text-white'
            }`}
        >
            {depo.photo && (
                <>
                    <img
                        src={depo.photo}
                        alt={`${depo.client} — cliente da Norte`}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E0C] via-[#0B0E0C]/55 to-[#0B0E0C]/15" />
                </>
            )}

            {solid && !lime && (
                <div
                    aria-hidden="true"
                    className="absolute -top-16 -right-10 w-[260px] h-[260px] rounded-full"
                    style={{
                        background:
                            'radial-gradient(circle, rgba(141,198,63,0.22) 0%, transparent 68%)',
                    }}
                />
            )}

            {/* Assinatura do cliente no alto, como marca d'água */}
            <p
                className={`absolute top-6 left-6 md:top-7 md:left-7 inline-flex items-center gap-2 ${H3} text-[15px] ${
                    lime ? 'text-[#0B0E0C]/80' : 'text-white/90'
                }`}
            >
                <span
                    className={`w-1.5 h-1.5 rounded-full ${lime ? 'bg-[#0B0E0C]' : 'bg-[#8DC63F]'}`}
                />
                {depo.client}
            </p>

            <div className="relative">
                <span
                    className={`block ${H2} text-[40px] leading-none mb-3 ${
                        lime ? 'text-[#0B0E0C]/35' : 'text-[#8DC63F]'
                    }`}
                    aria-hidden="true"
                >
                    “
                </span>

                <p
                    className={`text-[15px] md:text-[16px] leading-snug mb-6 ${
                        lime ? 'text-[#0B0E0C]/85' : 'text-white/90'
                    }`}
                >
                    {depo.quote}
                </p>

                <div
                    className={`flex items-end justify-between gap-3 pt-4 border-t ${
                        lime ? 'border-[#0B0E0C]/20' : 'border-white/15'
                    }`}
                >
                    <span
                        className={`${TAG} ${lime ? 'text-[#0B0E0C]/55' : 'text-white/50'}`}
                    >
                        {depo.tag}
                    </span>
                    <span className="text-right">
                        <span
                            className={`block ${H2} text-[26px] leading-none ${
                                lime ? 'text-[#14261A]' : 'text-[#8DC63F]'
                            }`}
                        >
                            {depo.metric}
                        </span>
                        <span
                            className={`block text-[10px] mt-1 ${
                                lime ? 'text-[#0B0E0C]/55' : 'text-white/50'
                            }`}
                        >
                            {depo.label}
                        </span>
                    </span>
                </div>
            </div>
        </article>
    );
};
// Visual das cartas do carrossel de resultados. Quatro motivos que se
// alternam pela lista — barras, linha, arco e ranking. São ilustração, e
// não gráfico de dado: o que afirma alguma coisa é o número embaixo, que
// é sempre real. Por isso a forma sai de uma semente presa ao índice, o
// mesmo desenho toda vez, sem sorteio a cada render.
const vizBars = (seed: number) =>
    Array.from({ length: 7 }, (_, i) => {
        const base = 26 + ((seed * 17 + i * 29) % 34);
        return Math.min(100, Math.round(base + i * (7 + (seed % 4))));
    });
// Cores espalhadas pelo carrossel. A ordem é fixa em vez de sorteada em
// tempo de render: com Math.random o servidor pré-renderiza uma cor e o
// navegador monta outra, e a página pisca ao hidratar. Aqui o embaralhado
// é escrito uma vez e vale sempre.
export type ResSkin = 'white' | 'dark' | 'lime';
export const RESULT_SKINS: ResSkin[] = [
    'white', 'dark', 'white', 'lime', 'white', 'white', 'dark', 'white', 'lime',
    'white', 'dark', 'white', 'white', 'lime', 'white', 'dark', 'white', 'white', 'lime',
];
export const RES_SKIN: Record<ResSkin, {
    box: string; name: string; pill: string; head: string; body: string;
    muted: string; accent: string; ring: string;
}> = {
    white: {
        box: 'bg-white border-black/[0.07] hover:border-[#8DC63F]',
        name: 'text-[#131313]', pill: 'text-black/40 bg-[#F5F5F3]',
        head: 'text-[#3d6b12]', body: 'text-black/45',
        muted: 'bg-black/[0.09]', accent: 'bg-[#8DC63F]', ring: 'rgba(0,0,0,0.09)',
    },
    dark: {
        box: 'bg-[#131313] border-[#131313] hover:border-[#8DC63F]',
        name: 'text-white', pill: 'text-white/45 bg-white/10',
        head: 'text-[#8DC63F]', body: 'text-white/50',
        muted: 'bg-white/[0.14]', accent: 'bg-[#8DC63F]', ring: 'rgba(255,255,255,0.16)',
    },
    lime: {
        box: 'bg-[#8DC63F] border-[#8DC63F] hover:border-[#14261A]',
        name: 'text-[#0B0E0C]', pill: 'text-[#0B0E0C]/55 bg-[#0B0E0C]/10',
        head: 'text-[#14261A]', body: 'text-[#0B0E0C]/60',
        muted: 'bg-[#0B0E0C]/15', accent: 'bg-[#14261A]', ring: 'rgba(11,14,12,0.16)',
    },
};
export const ResultViz: React.FC<{ index: number; skin: ResSkin }> = ({ index, skin }) => {
    const kind = index % 4;
    const bars = vizBars(index + 1);
    const c = RES_SKIN[skin];

    if (kind === 0) {
        return (
            <div className="flex items-end gap-[3px] h-[42px]">
                {bars.map((h, i) => (
                    <div
                        key={i}
                        className={`flex-1 rounded-[2px] ${
                            i === bars.length - 1 ? c.accent : c.muted
                        }`}
                        style={{ height: `${h}%` }}
                    />
                ))}
            </div>
        );
    }

    if (kind === 1) {
        const pts = bars
            .map((h, i) => `${(i / (bars.length - 1)) * 100},${42 - (h / 100) * 38}`)
            .join(' ');
        return (
            <svg viewBox="0 0 100 42" className="w-full h-[42px]" fill="none" aria-hidden="true">
                <polyline
                    points={pts}
                    stroke={skin === 'lime' ? '#14261A' : '#8DC63F'}
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                />
                <circle
                    cx="100"
                    cy={42 - (bars[bars.length - 1] / 100) * 38}
                    r="3"
                    fill={skin === 'lime' ? '#14261A' : skin === 'dark' ? '#8DC63F' : '#3d6b12'}
                />
            </svg>
        );
    }

    if (kind === 2) {
        const pct = 58 + (index * 7) % 34;
        const circ = 2 * Math.PI * 17;
        return (
            <div className="flex items-center gap-3 h-[42px]">
                <svg viewBox="0 0 40 40" className="w-[42px] h-[42px] -rotate-90" aria-hidden="true">
                    <circle cx="20" cy="20" r="17" stroke={c.ring} strokeWidth="5" fill="none" />
                    <circle
                        cx="20"
                        cy="20"
                        r="17"
                        stroke={skin === 'lime' ? '#14261A' : '#8DC63F'}
                        strokeWidth="5"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${(pct / 100) * circ} ${circ}`}
                    />
                </svg>
                <div className="flex-1 space-y-1.5">
                    <div className={`h-1.5 rounded-full ${c.muted} w-full`} />
                    <div className={`h-1.5 rounded-full ${c.muted} w-3/5`} />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-[7px] h-[42px] flex flex-col justify-center">
            {[100, 72, 48].map((w, i) => (
                <div key={i} className="flex items-center gap-2">
                    <span
                        className={`h-[7px] rounded-full ${i === 0 ? c.accent : c.muted}`}
                        style={{ width: `${w}%` }}
                    />
                </div>
            ))}
        </div>
    );
};
export const ReelCard: React.FC<{ reel: Reel }> = ({ reel }) => {
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
export const Manifesto: React.FC<{ tokens: Token[]; fortes: Set<string> }> = ({
    tokens,
    fortes,
}) => {
    const [ref, progress] = useElementReveal<HTMLParagraphElement>();
    const total = tokens.length;

    return (
        <p
            ref={ref}
            className={`${H2} text-[clamp(30px,4.6vw,60px)] max-w-[16ch] md:max-w-[20ch] mx-auto`}
        >
            {tokens.map((token, i) => {
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

                const strong = fortes.has(token);
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

// ─── Anel de cartas ─────────────────────────────────────────────────
//
// Estava solto no corpo da home. Virou componente porque é o efeito mais
// caro de reproduzir e o que mais identifica a marca: uma volta de cartas
// girando em perspectiva, cada uma com duas faces laterais pra dar
// espessura.
//
// `cards` define quantas voltas o anel tem, e o passo sai daí. Anel de dez
// cartas e anel de seis giram com o mesmo código, com espaçamento diferente.
export const AnelDeCards: React.FC<{ cards: FanCard[] }> = ({ cards }) => {
    const passo = passoDoAnel(cards.length);
    return (
        <div className="fan-mask -mx-5 md:mx-0 mt-12 md:mt-16 overflow-hidden md:overflow-visible">
            <div className="fan-stage no-scrollbar" style={PERSPECTIVE}>
                <div className="fan-group" style={{ ['--dur' as string]: `${RING_DUR}s` }}>
                    {cards.map((card, i) => {
                        const skin = CARD_SKIN[card.skin];
                        return (
                            <div
                                key={card.client ?? card.line}
                                className={`fan-item flex flex-col w-[118px] h-[158px] md:w-[196px] md:h-[226px] rounded-xl md:rounded-2xl p-3 md:p-[18px] border ${skin.box}`}
                                style={{
                                    ['--ry' as string]: `${i * passo}deg`,
                                    ['--ty' as string]: `${RING_LIFT[i % RING_LIFT.length]}px`,
                                    animationDelay: `${cardDelay(i, cards.length)}s`,
                                }}
                            >
                                {/* Espessura: duas faces laterais, 7px no celular e 10 no
                                    desktop. Só a de frente aparece — backface-visibility
                                    cuida da outra. */}
                                <span
                                    aria-hidden="true"
                                    className="fan-edge absolute top-0 right-0 h-full w-[7px] md:w-[10px] rounded-r-2xl"
                                    style={{
                                        background: skin.edge,
                                        ['--edge-origin' as string]: 'left',
                                        ['--edge-rot' as string]: '90deg',
                                    }}
                                />
                                <span
                                    aria-hidden="true"
                                    className="fan-edge absolute top-0 left-0 h-full w-[7px] md:w-[10px] rounded-l-2xl"
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
    );
};


// ─── Trilho de logos ────────────────────────────────────────────────
//
// A lista de clientes não é conteúdo de uma página, é patrimônio da marca:
// vale igual na institucional e em qualquer LP de nicho. Por isso o dado
// mora aqui junto com o componente, ao contrário do resto do arquivo.
//
// A lista entra duplicada na pista porque a marquise precisa emendar em si
// mesma: chegar a -50% cai exatamente onde começou e o laço não tem costura.
export const LOGOS_CLIENTES =  [
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

export const TrilhoDeLogos: React.FC<{ titulo?: string }> = ({
    titulo = 'Marcas que seguiram o Norte',
}) => (
    <section className="bg-white py-10 md:py-14 overflow-hidden">
        <p className="text-center font-mono text-[11px] tracking-[0.16em] uppercase text-black/35 mb-8">
            {titulo}
        </p>
        <div style={EDGE_FADE}>
            <div className="flex gap-12 md:gap-16 animate-marquee motion-reduce:animate-none w-max">
                {[...LOGOS_CLIENTES, ...LOGOS_CLIENTES].map((logo, i) => (
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
);
