import React from 'react';
import { SectionProps } from '../types';

const cards = [
    {
        index: '01',
        title: 'O balde furado',
        body: 'Mapeamos exatamente onde a verba está vazando — campanha por campanha, criativo por criativo. CAC cai antes mesmo de aumentar investimento.',
        tag: 'Onde sangra',
    },
    {
        index: '02',
        title: 'A oportunidade oculta',
        body: 'Achamos públicos, canais e ângulos criativos que seus concorrentes ainda não exploraram. O “oceano azul” do seu nicho local.',
        tag: 'Onde cresce',
    },
    {
        index: '03',
        title: 'O plano de resgate',
        body: 'O passo a passo concreto pros próximos 90 dias: prioridade, esforço, impacto esperado e métrica de validação de cada movimento.',
        tag: 'Como agir',
    },
];

export const Diagnosis: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="relative bg-er-black text-white overflow-hidden">
            {/* Big red outline word in the background — brutalist accent */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 right-[-8%] select-none font-display uppercase leading-[0.78] whitespace-nowrap text-er-red/15"
                style={{ fontSize: 'clamp(180px, 24vw, 380px)' }}
            >
                raio-x
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-24 md:py-36">
                <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
                    <div className="col-span-12 md:col-span-8">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                            ◆ A auditoria
                        </p>
                        <h2
                            className="font-display uppercase leading-[0.88] tracking-tight"
                            style={{ fontSize: 'clamp(44px, 7vw, 112px)' }}
                        >
                            Três <span className="text-er-red">verdades</span>
                            <br />
                            sobre o seu funil.
                        </h2>
                    </div>
                    <div className="col-span-12 md:col-span-4 md:pt-12">
                        <p className="text-base md:text-lg text-white/60 leading-relaxed">
                            Não é relatório bonito. É diagnóstico cirúrgico. Em duas
                            semanas você sabe onde o lucro está parado — e o que fazer
                            pra destravar.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
                    {cards.map((card) => (
                        <button
                            key={card.index}
                            type="button"
                            onClick={onAuditClick}
                            className="group bg-er-black p-8 md:p-10 text-left flex flex-col justify-between min-h-[360px] md:min-h-[480px] transition-colors hover:bg-[#0c0c0c] focus:outline-none focus:bg-[#0c0c0c]"
                        >
                            <div className="flex items-start justify-between mb-12">
                                <span
                                    className="font-display text-white/15 leading-none"
                                    style={{ fontSize: 'clamp(64px, 7vw, 104px)' }}
                                >
                                    {card.index}
                                </span>
                                <span className="text-[10px] tracking-[0.25em] uppercase text-er-red border border-er-red/40 px-2 py-1">
                                    {card.tag}
                                </span>
                            </div>
                            <div>
                                <h3 className="font-display uppercase text-3xl md:text-4xl leading-[0.95] tracking-tight mb-5">
                                    {card.title}
                                </h3>
                                <p className="text-sm md:text-base text-white/60 leading-relaxed mb-8">
                                    {card.body}
                                </p>
                                <span className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/40 group-hover:text-er-red transition-colors">
                                    Ver detalhe
                                    <span className="transition-transform group-hover:translate-x-1">
                                        →
                                    </span>
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};
