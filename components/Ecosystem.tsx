import React from 'react';
import { SectionProps } from '../types';

const pillars = [
    {
        n: '01',
        title: 'Tráfego pago',
        body: 'Meta, Google, TikTok e LinkedIn Ads. Gestão amarrada em CPA e ROAS — não em cliques.',
    },
    {
        n: '02',
        title: 'Business Intelligence',
        body: 'Dashboards em tempo real. Você sabe quanto entrou, quanto saiu, e o que está por trás de cada número.',
    },
    {
        n: '03',
        title: 'Copy & criativos',
        body: 'Roteiro, headline e arte que param o scroll. Conversão em vez de “engajamento de vaidade”.',
    },
    {
        n: '04',
        title: 'Inbound & CRM',
        body: 'Automação de e-mail, WhatsApp e funil de nutrição. Nada de lead esquecido na caixa de entrada.',
    },
    {
        n: '05',
        title: 'Captação in loco',
        body: 'Equipe audiovisual presencial. Sua marca filmada de verdade — bastidor, produto, time, cliente.',
    },
];

export const Ecosystem: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="relative bg-er-paper text-er-ink overflow-hidden">
            {/* Massive solid letter mass behind the grid — like Essence "se" cut */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-20 -left-10 select-none font-display uppercase leading-[0.78] whitespace-nowrap text-er-ink"
                style={{ fontSize: 'clamp(220px, 32vw, 540px)' }}
            >
                360º
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-24 md:py-36">
                <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
                    <div className="col-span-12 md:col-span-8">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                            ◆ Ecossistema
                        </p>
                        <h2
                            className="font-display uppercase leading-[0.88] tracking-tight"
                            style={{ fontSize: 'clamp(44px, 7vw, 112px)' }}
                        >
                            Cinco peças.
                            <br />
                            <span className="text-er-red">Uma máquina só.</span>
                        </h2>
                    </div>
                    <div className="col-span-12 md:col-span-4 md:pt-12">
                        <p className="text-base md:text-lg text-er-ink/70 leading-relaxed">
                            Não fazemos “só anúncio”. Construímos uma operação inteira de
                            performance — onde cada peça alimenta a próxima e o caixa
                            previsível vira consequência, não milagre.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-er-ink/15">
                    {pillars.map((p) => (
                        <div
                            key={p.n}
                            className="bg-er-paper p-8 md:p-10 min-h-[280px] flex flex-col justify-between"
                        >
                            <span
                                className="font-display text-er-ink/15 leading-none"
                                style={{ fontSize: 'clamp(56px, 6vw, 88px)' }}
                            >
                                {p.n}
                            </span>
                            <div>
                                <h3 className="font-display uppercase text-2xl md:text-3xl leading-[0.95] tracking-tight mb-4">
                                    {p.title}
                                </h3>
                                <p className="text-sm md:text-base text-er-ink/70 leading-relaxed">
                                    {p.body}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* CTA card matching the grid */}
                    <div className="bg-er-red text-white p-8 md:p-10 min-h-[280px] flex flex-col justify-between">
                        <span className="text-[10px] tracking-[0.3em] uppercase text-white/70">
                            ◆ Próximo passo
                        </span>
                        <div>
                            <h3 className="font-display uppercase text-2xl md:text-3xl leading-[0.95] tracking-tight mb-4">
                                Qual peça falta
                                <br />
                                no seu time?
                            </h3>
                            <button
                                type="button"
                                onClick={onAuditClick}
                                className="group inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase font-bold border-b border-white/70 hover:border-white pb-1 transition-all"
                            >
                                Fazer o diagnóstico
                                <span className="transition-transform group-hover:translate-x-1">
                                    →
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
