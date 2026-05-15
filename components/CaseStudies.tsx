import React from 'react';
import { SectionProps } from '../types';

const cases = [
    {
        index: '01',
        client: 'E-commerce de moda',
        segment: 'D2C · 90 dias',
        metric: '+240%',
        metricLabel: 'crescimento de receita',
        rows: [
            ['ROAS médio', '12.5x'],
            ['Custo por venda', '−45%'],
            ['Estoque girado', '3.8x faster'],
        ],
    },
    {
        index: '02',
        client: 'Lançamento de infoproduto',
        segment: 'Educação · 1 lançamento',
        metric: 'R$ 1.2M',
        metricLabel: 'faturamento em 7 dias',
        rows: [
            ['Investimento', 'R$ 180k'],
            ['Leads captados', '15.000+'],
            ['Conversão da LP', '65%'],
        ],
    },
    {
        index: '03',
        client: 'Serviços B2B',
        segment: 'High-ticket · 6 meses',
        metric: '50 / dia',
        metricLabel: 'leads qualificados',
        rows: [
            ['CAC final', 'R$ 45'],
            ['Show-rate em call', '78%'],
            ['Taxa de fechamento', '30%'],
        ],
    },
];

export const CaseStudies: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="relative bg-er-paper text-er-ink overflow-hidden">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 -right-12 select-none font-display uppercase leading-[0.78] whitespace-nowrap text-er-red/15"
                style={{ fontSize: 'clamp(200px, 28vw, 460px)' }}
            >
                cases
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-24 md:py-36">
                <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
                    <div className="col-span-12 md:col-span-8">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                            ◆ Cases
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
                            Três recortes da operação real — cada um em nicho e estágio
                            diferentes. Mesmo método, resultado consistente.
                        </p>
                    </div>
                </div>

                <div className="space-y-4 md:space-y-6">
                    {cases.map((c) => (
                        <article
                            key={c.index}
                            className="grid grid-cols-12 gap-4 md:gap-8 items-stretch border-t border-er-ink/15 pt-8 md:pt-10"
                        >
                            <div className="col-span-12 md:col-span-2 flex md:flex-col items-baseline md:items-start justify-between md:justify-start gap-2">
                                <span
                                    className="font-display text-er-ink/20 leading-none"
                                    style={{ fontSize: 'clamp(56px, 6vw, 96px)' }}
                                >
                                    {c.index}
                                </span>
                                <span className="text-[10px] tracking-[0.25em] uppercase text-er-ink/50">
                                    {c.segment}
                                </span>
                            </div>

                            <div className="col-span-12 md:col-span-4">
                                <h3 className="font-display uppercase text-2xl md:text-4xl leading-[0.95] tracking-tight mb-2 md:mb-3">
                                    {c.client}
                                </h3>
                                <p className="text-sm text-er-ink/60 leading-relaxed max-w-sm">
                                    Auditoria + plano + execução da operação de
                                    performance ponta a ponta.
                                </p>
                            </div>

                            <div className="col-span-12 md:col-span-3 flex flex-col">
                                <span
                                    className="font-display text-er-red leading-[0.9] mb-1"
                                    style={{ fontSize: 'clamp(48px, 5.5vw, 88px)' }}
                                >
                                    {c.metric}
                                </span>
                                <span className="text-xs tracking-[0.2em] uppercase text-er-ink/60">
                                    {c.metricLabel}
                                </span>
                            </div>

                            <div className="col-span-12 md:col-span-3 flex flex-col justify-end">
                                <dl className="divide-y divide-er-ink/15 text-sm">
                                    {c.rows.map(([k, v]) => (
                                        <div
                                            key={k}
                                            className="flex justify-between py-2.5"
                                        >
                                            <dt className="text-er-ink/60">{k}</dt>
                                            <dd className="font-bold">{v}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-16 md:mt-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-t border-er-ink/15 pt-10">
                    <p
                        className="font-display uppercase leading-[0.95] tracking-tight max-w-2xl"
                        style={{ fontSize: 'clamp(28px, 3.5vw, 56px)' }}
                    >
                        Seu próximo case
                        <br />
                        <span className="text-er-red">começa numa auditoria.</span>
                    </p>
                    <button
                        type="button"
                        onClick={onAuditClick}
                        className="group inline-flex items-center gap-3 bg-er-ink text-er-paper hover:bg-er-red transition-colors font-bold text-sm tracking-[0.18em] uppercase px-6 py-4 whitespace-nowrap"
                    >
                        Solicitar agora
                        <span className="transition-transform group-hover:translate-x-1">
                            →
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
};
