import React, { useRef } from 'react';
import { SectionProps } from '../types';

// Real client outcomes lifted from the printed result cards. Each entry is
// the exact metric we delivered for that brand — no rounding, no remixing.
// The premium flag matches the "PREMIUM" stamp on the original print and
// shows up as a small badge on the card.
const results = [
    {
        client: 'Taychi Sushi',
        handle: '@taychisushi',
        headline: '70k → 200k/mês',
        body: 'em 7 meses, com funis de conversão direcionados pra loja física.',
        category: 'Restaurante',
        premium: true,
    },
    {
        client: 'Oli e Sofi',
        handle: '@olisofi',
        headline: '+300% no faturamento',
        body: 'do e-commerce de roupas de bebê, em receita total.',
        category: 'E-commerce',
        premium: false,
    },
    {
        client: 'Dermo Ervas',
        handle: '@dermoervas',
        headline: '+200% de faturamento',
        body: 'do e-commerce de encapsulados, em estratégia integrada.',
        category: 'E-commerce',
        premium: false,
    },
    {
        client: 'A Escola de Sites',
        handle: '@aescoladesites',
        headline: '+20 mil leads gerados',
        body: 'e faturamento de múltiplos 7 dígitos em lançamentos.',
        category: 'Infoproduto',
        premium: true,
    },
    {
        client: 'Propriedades Compartilhadas',
        handle: '@propriedadescompartilhadas',
        headline: '+10 mil leads · 8 dígitos',
        body: 'faturamento de múltiplos 8 dígitos com funis perpétuos.',
        category: 'Infoproduto',
        premium: true,
    },
    {
        client: 'Full Sales System',
        handle: '@fullsalessystem',
        headline: '+560 leads/mês',
        body: 'para funis de ticket variando entre R$ 6k e R$ 30k/mês.',
        category: 'Mentoria',
        premium: true,
    },
    {
        client: 'Amazon One',
        handle: '@amazonone_ofertas',
        headline: 'R$ 1M de faturamento',
        body: 'em 6 meses de aplicação da estratégia de aumento de leads.',
        category: 'Varejo local',
        premium: false,
    },
    {
        client: 'Odonto Solutions',
        handle: '@odonto_solutions',
        headline: '5.193 leads a R$ 1,57',
        body: 'leads ultra qualificados pra negócios odontológicos.',
        category: 'Saúde',
        premium: true,
    },
    {
        client: 'Pandora Eletrônicos',
        handle: '@pandora_eletronicos',
        headline: '+500 leads/mês',
        body: 'interessados em produtos Apple, todo mês.',
        category: 'Varejo',
        premium: false,
    },
    {
        client: 'Conceito Obras',
        handle: '@conceito.obras',
        headline: '+150 leads/mês',
        body: 'qualificados pra projetos de Steel Frame, mês a mês.',
        category: 'Construção',
        premium: false,
    },
    {
        client: 'Bem Fisio',
        handle: '@bem_fisio_fisioterapia',
        headline: '+450 leads/mês',
        body: 'qualificados pro segmento de fisioterapia.',
        category: 'Saúde',
        premium: false,
    },
    {
        client: 'Bembê Atelier',
        handle: '@bembeatelier',
        headline: '+167% em vendas',
        body: 'mensais para o atelier de brinquedos de tecido.',
        category: 'E-commerce',
        premium: false,
    },
    {
        client: 'Tecno Obras',
        handle: '@tecnoobras_',
        headline: '+500 mil views/mês',
        body: 'atingindo o Top of Mind do público de construções em Curitiba.',
        category: 'Construção',
        premium: false,
    },
    {
        client: 'Reifel Confecções',
        handle: '@reiwiuconfeccoes',
        headline: 'R$ 10k → R$ 30k/mês',
        body: 'em 3 meses no e-commerce, com aumento contínuo nas vendas.',
        category: 'E-commerce',
        premium: false,
    },
    {
        client: 'Abacazo',
        handle: '@abacazo',
        headline: '+3 lojas abertas',
        body: 'cadastro de mais de 2 mil clientes/mês na rede.',
        category: 'Franquia',
        premium: true,
    },
    {
        client: 'App Omnifit',
        handle: '@app.omnifit',
        headline: '+1M de alcance',
        body: 'em ampliação de marca via funil KLT.',
        category: 'App',
        premium: true,
    },
    {
        client: 'English Vip',
        handle: '@englishvipensinodeidioma',
        headline: '+257% de alcance',
        body: 'em potenciais clientes para vendas via WhatsApp.',
        category: 'Educação',
        premium: false,
    },
    {
        client: 'iTV Manaus',
        handle: '@itvmanaus',
        headline: 'R$ 15k de faturamento',
        body: 'com leads a R$ 0,50/dia pra serviço de assistência de TV.',
        category: 'Serviços',
        premium: false,
    },
    {
        client: 'A Jogada',
        handle: '@ajogada',
        headline: '+132% em vendas',
        body: 'em funil de venda direta para produto de R$ 97,90.',
        category: 'E-commerce',
        premium: false,
    },
];

export const ClientResults: React.FC<SectionProps> = ({ onAuditClick }) => {
    const scrollerRef = useRef<HTMLDivElement | null>(null);

    const scrollByAmount = (dir: 1 | -1) => {
        const el = scrollerRef.current;
        if (!el) return;
        // Card width is ~360px on desktop with 24px gap → ~384. Mobile gets
        // one card width to scroll. Snap kicks in after.
        const card = el.querySelector<HTMLElement>('[data-card]');
        const step = card ? card.offsetWidth + 24 : 384;
        el.scrollBy({ left: dir * step, behavior: 'smooth' });
    };

    return (
        <section className="relative bg-er-paper text-er-ink overflow-hidden">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 -right-12 select-none font-display uppercase leading-[0.78] whitespace-nowrap text-er-red/15"
                style={{ fontSize: 'clamp(200px, 28vw, 460px)' }}
            >
                cases
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 pt-24 md:pt-36">
                <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16">
                    <div className="col-span-12 md:col-span-8">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                            ◆ Resultados reais
                        </p>
                        <h2
                            className="font-display uppercase leading-[0.88] tracking-tight"
                            style={{ fontSize: 'clamp(44px, 7vw, 112px)' }}
                        >
                            Dados.
                            <br />
                            <span className="text-er-red">Não promessas.</span>
                        </h2>
                    </div>
                    <div className="col-span-12 md:col-span-4 md:pt-12">
                        <p className="text-base md:text-lg text-er-ink/70 leading-relaxed">
                            Resultados entregues nos últimos sete anos, em nichos
                            diferentes e estágios diferentes. Mesma régua, mesmo
                            método.
                        </p>
                    </div>
                </div>

                {/* Navigation controls — visible on desktop only; mobile uses
                    native touch scroll with snap. */}
                <div className="hidden md:flex items-center justify-end gap-3 mb-6">
                    <button
                        type="button"
                        aria-label="Voltar"
                        onClick={() => scrollByAmount(-1)}
                        className="w-12 h-12 border border-er-ink/30 hover:bg-er-ink hover:text-er-paper transition-colors flex items-center justify-center text-lg"
                    >
                        ←
                    </button>
                    <button
                        type="button"
                        aria-label="Avançar"
                        onClick={() => scrollByAmount(1)}
                        className="w-12 h-12 bg-er-ink text-er-paper hover:bg-er-red transition-colors flex items-center justify-center text-lg"
                    >
                        →
                    </button>
                </div>
            </div>

            {/* Edge-to-edge horizontal scroller. The first card lines up with
                the inner content column via `pl-[max(...)]` and the last gets
                a matching right gutter so the scroll-snap feels balanced. */}
            <div
                ref={scrollerRef}
                className="relative overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory pb-16 md:pb-24"
                style={{ scrollbarWidth: 'thin' }}
            >
                <ul className="flex gap-6 pl-[max(1.5rem,calc((100vw-1400px)/2+1.5rem))] pr-[max(1.5rem,calc((100vw-1400px)/2+1.5rem))]">
                    {/* Opening summary card — visually distinct from the data
                        cards so it reads as a section headline, not a case. */}
                    <li
                        data-card
                        className="snap-start flex-shrink-0 w-[300px] md:w-[360px] bg-er-red text-white p-7 md:p-8 flex flex-col justify-between min-h-[400px] md:min-h-[440px]"
                    >
                        <span className="text-[10px] tracking-[0.3em] uppercase text-white/70">
                            ◆ Resumo
                        </span>
                        <div>
                            <span
                                className="block font-display leading-[0.85] mb-4"
                                style={{ fontSize: 'clamp(72px, 9vw, 140px)' }}
                            >
                                +100
                            </span>
                            <p className="font-display uppercase text-xl md:text-2xl leading-[1] tracking-tight mb-5">
                                Parceiros já
                                <br />
                                impactados pelo
                                <br />
                                nosso trabalho.
                            </p>
                            <p className="text-sm text-white/80 leading-relaxed">
                                Sete anos de operação, mais de cem marcas
                                acompanhadas — e o método que você vai ver a
                                seguir aplicado em todas elas.
                            </p>
                        </div>
                    </li>

                    {results.map((r, i) => (
                        <li
                            key={r.client}
                            data-card
                            className="snap-start flex-shrink-0 w-[300px] md:w-[360px] bg-white border border-er-ink/15 p-7 md:p-8 flex flex-col justify-between min-h-[400px] md:min-h-[440px] hover:border-er-red transition-colors"
                        >
                            <div>
                                <div className="flex items-start justify-between mb-8">
                                    <span
                                        className="font-display text-er-ink/15 leading-none"
                                        style={{ fontSize: 'clamp(48px, 5vw, 72px)' }}
                                    >
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-[10px] tracking-[0.25em] uppercase text-er-ink/60 border border-er-ink/20 px-2 py-1">
                                            {r.category}
                                        </span>
                                        {r.premium && (
                                            <span className="text-[10px] tracking-[0.25em] uppercase text-white bg-er-red px-2 py-1">
                                                Premium
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <h3 className="font-display uppercase text-2xl md:text-3xl leading-[0.95] tracking-tight mb-1">
                                    {r.client}
                                </h3>
                                <p className="text-xs text-er-ink/50 tracking-wide mb-6">
                                    {r.handle}
                                </p>
                            </div>

                            <div className="border-t border-er-ink/15 pt-5">
                                <span
                                    className="block font-display text-er-red leading-[0.95] mb-3"
                                    style={{ fontSize: 'clamp(28px, 2.6vw, 40px)' }}
                                >
                                    {r.headline}
                                </span>
                                <p className="text-sm text-er-ink/70 leading-relaxed">
                                    {r.body}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 pb-24 md:pb-36">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-t border-er-ink/15 pt-10">
                    <p
                        className="font-display uppercase leading-[0.95] tracking-tight max-w-2xl"
                        style={{ fontSize: 'clamp(28px, 3.5vw, 56px)' }}
                    >
                        O próximo case
                        <br />
                        <span className="text-er-red">pode ser o seu.</span>
                    </p>
                    <button
                        type="button"
                        onClick={onAuditClick}
                        className="group inline-flex items-center gap-3 bg-er-ink text-er-paper hover:bg-er-red transition-colors font-bold text-sm tracking-[0.18em] uppercase px-6 py-4 whitespace-nowrap"
                    >
                        Agendar diagnóstico
                        <span className="transition-transform group-hover:translate-x-1">
                            →
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
};
