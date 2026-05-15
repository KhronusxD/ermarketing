import React from 'react';
import { SectionProps } from '../types';

const criteria = [
    'Empresas que já investem ou têm verba pra investir em tráfego pago.',
    'Negócios que buscam escala previsível — não “virada de chave” mágica em 30 dias.',
    'Operações que entendem que marca e performance crescem juntas.',
];

export const Qualification: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="relative bg-er-black text-white overflow-hidden">
            {/* Red glow behind the headline */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-er-red/15 rounded-full blur-[160px]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 select-none font-display uppercase leading-[0.78] whitespace-nowrap text-er-red"
                style={{ fontSize: 'clamp(220px, 32vw, 540px)' }}
            >
                agora.
            </div>

            <div className="relative z-10 max-w-[1100px] mx-auto px-6 py-24 md:py-36">
                <div className="text-center">
                    <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                        ◆ Pra quem é
                    </p>
                    <h2
                        className="font-display uppercase leading-[0.88] tracking-tight mx-auto max-w-4xl"
                        style={{ fontSize: 'clamp(48px, 8vw, 128px)' }}
                    >
                        Pare de queimar
                        <br />
                        <span className="text-er-red">verba à toa.</span>
                    </h2>
                </div>

                <ul className="mt-14 md:mt-20 max-w-3xl mx-auto space-y-5">
                    {criteria.map((item, i) => (
                        <li
                            key={item}
                            className="flex items-start gap-5 border-t border-white/15 pt-5"
                        >
                            <span className="font-display text-er-red leading-none text-2xl md:text-3xl flex-shrink-0">
                                {`0${i + 1}`}
                            </span>
                            <span className="text-base md:text-xl text-white/85 leading-relaxed">
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>

                <div className="mt-16 md:mt-20 flex flex-col items-center gap-5">
                    <button
                        type="button"
                        onClick={onAuditClick}
                        className="group inline-flex items-center gap-3 bg-er-red hover:bg-er-redHover text-white font-bold tracking-[0.18em] uppercase text-sm md:text-base px-8 py-5 md:px-12 md:py-6 shadow-[0_0_60px_rgba(230,0,0,0.5)] hover:shadow-[0_0_90px_rgba(230,0,0,0.7)] transition-all"
                    >
                        Quero minha auditoria gratuita
                        <span className="transition-transform group-hover:translate-x-1">
                            →
                        </span>
                    </button>
                    <p className="text-xs tracking-[0.2em] uppercase text-white/40">
                        Sem compromisso · Resposta em até 2h úteis · 5 vagas no mês
                    </p>
                </div>
            </div>
        </section>
    );
};
