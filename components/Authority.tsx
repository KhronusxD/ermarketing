import React from 'react';
import { SectionProps } from '../types';

export const Authority: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="relative bg-er-paper text-er-ink overflow-hidden">
            {/* Gigantic outline word bleeding off the bottom — editorial */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-12 md:-bottom-24 left-1/2 -translate-x-1/2 select-none font-display uppercase leading-[0.78] whitespace-nowrap"
                style={{
                    fontSize: 'clamp(180px, 26vw, 420px)',
                    color: 'transparent',
                    WebkitTextStroke: '1.5px rgba(10,10,10,0.08)',
                }}
            >
                números
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-24 md:py-36">
                <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
                    <div className="col-span-12 md:col-span-7">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                            ◆ Track record · 2018 — 2026
                        </p>
                        <h2
                            className="font-display uppercase leading-[0.88] tracking-tight"
                            style={{ fontSize: 'clamp(44px, 7vw, 112px)' }}
                        >
                            Métodos
                            <br />
                            que <span className="text-er-red">deixam rastro</span>.
                        </h2>
                    </div>
                    <div className="col-span-12 md:col-span-5 md:pt-16 lg:pt-24">
                        <p className="text-base md:text-lg text-er-ink/70 leading-relaxed max-w-md">
                            Trabalhamos com performance há sete anos. Cada decisão é
                            calibrada por dado, não por opinião. O que você vai ler aqui é
                            o resultado consolidado da operação — sem inflar, sem omitir.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 border-t border-er-ink/15">
                    {[
                        {
                            number: '+45M',
                            label: 'Reais geridos em mídia',
                            sub: 'Meta · Google · TikTok · LinkedIn',
                        },
                        {
                            number: '7.5x',
                            label: 'ROAS médio global',
                            sub: 'Em 150+ projetos auditados',
                        },
                        {
                            number: '+120k',
                            label: 'Leads qualificados',
                            sub: 'Captados nos últimos 24 meses',
                        },
                    ].map((item, i) => (
                        <div
                            key={item.label}
                            className={`py-10 md:py-14 ${
                                i > 0 ? 'md:border-l border-er-ink/15' : ''
                            } ${i > 0 ? 'md:pl-10' : ''} ${
                                i < 2 ? 'border-b md:border-b-0 border-er-ink/15' : ''
                            }`}
                        >
                            <span
                                className="block font-display leading-none mb-4 tracking-tight"
                                style={{ fontSize: 'clamp(72px, 9vw, 144px)' }}
                            >
                                {item.number}
                            </span>
                            <span className="block text-base font-bold uppercase tracking-wide mb-1">
                                {item.label}
                            </span>
                            <span className="block text-xs text-er-ink/50 tracking-wide">
                                {item.sub}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-16 md:mt-20 grid grid-cols-12 gap-6">
                    <blockquote className="col-span-12 md:col-span-7 text-2xl md:text-3xl font-display uppercase leading-tight tracking-tight">
                        “Enquanto o mercado conta likes,{' '}
                        <span className="text-er-red">
                            a gente conta lucro líquido.
                        </span>
                        ”
                    </blockquote>
                    <div className="col-span-12 md:col-span-4 md:col-start-9 flex flex-col justify-end gap-4">
                        <p className="text-sm text-er-ink/60 leading-relaxed">
                            É essa a métrica que importa pra você — e é a única que a
                            gente leva pra reunião.
                        </p>
                        <button
                            type="button"
                            onClick={onAuditClick}
                            className="group inline-flex items-center justify-between w-full md:w-auto bg-er-ink text-er-paper hover:bg-er-red transition-colors font-bold text-sm tracking-[0.18em] uppercase px-6 py-4"
                        >
                            Conhecer metodologia
                            <span className="ml-6 transition-transform group-hover:translate-x-1">
                                →
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
