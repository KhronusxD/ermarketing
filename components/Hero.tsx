import React from 'react';
import { SectionProps } from '../types';

export const Hero: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="relative min-h-screen bg-er-black text-white overflow-hidden pt-28 md:pt-32">
            {/* Big brutalist outline letters bleeding off the canvas. Positioned
                behind the headline column — picked up from the "str" cut-off in
                the No es magia reference. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-8 -left-6 md:-left-12 select-none whitespace-nowrap font-display uppercase leading-[0.78]"
                style={{
                    fontSize: 'clamp(160px, 28vw, 440px)',
                    color: 'transparent',
                    WebkitTextStroke: '1.5px rgba(255,255,255,0.06)',
                }}
            >
                lucro
            </div>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 right-[-10%] md:right-[-6%] select-none whitespace-nowrap font-display uppercase leading-[0.78] text-er-red/80"
                style={{ fontSize: 'clamp(220px, 32vw, 520px)' }}
            >
                ER.
            </div>

            {/* Subtle vertical grid like an editorial spread */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#fff_1px,transparent_1px)] bg-[size:80px_100%]" />

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 grid grid-cols-12 gap-6 pb-24 md:pb-36">
                {/* Top eyebrow row */}
                <div className="col-span-12 flex items-center justify-between text-[11px] tracking-[0.3em] uppercase text-white/50 mb-10 md:mb-16">
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-er-red animate-pulse" />
                        Manaus · Brasil
                    </span>
                    <span className="hidden md:inline">
                        Diagnóstico nº <span className="text-white">003</span> / 2026
                    </span>
                </div>

                {/* Main headline — mixed weights/colors like the reference */}
                <h1 className="col-span-12 lg:col-span-10 font-display uppercase leading-[0.88] tracking-tight">
                    <span className="block text-white" style={{ fontSize: 'clamp(56px, 11vw, 180px)' }}>
                        Não é sorte.
                    </span>
                    <span
                        className="block text-er-red"
                        style={{ fontSize: 'clamp(56px, 11vw, 180px)' }}
                    >
                        É estratégia.
                    </span>
                </h1>

                {/* Body copy + CTA — offset right column, editorial */}
                <div className="col-span-12 lg:col-span-7 lg:col-start-6 mt-10 lg:mt-14">
                    <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-xl font-light">
                        A maioria das empresas perde 30 a 60% do orçamento de marketing em
                        canais errados, criativos fracos e funis sem rastreio. Em uma{' '}
                        <span className="text-white font-semibold">
                            reunião de 15 minutos
                        </span>{' '}
                        mostramos exatamente onde o seu dinheiro está vazando — e o plano
                        de resgate pros próximos 90 dias.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                        <button
                            type="button"
                            onClick={onAuditClick}
                            className="group inline-flex items-center gap-3 bg-er-red hover:bg-er-redHover text-white font-bold tracking-[0.18em] uppercase text-sm md:text-base px-7 py-4 md:px-9 md:py-5 transition-all shadow-[0_0_40px_rgba(230,0,0,0.35)] hover:shadow-[0_0_60px_rgba(230,0,0,0.55)]"
                        >
                            Agendar meus 15 min
                            <span className="transition-transform group-hover:translate-x-1">
                                →
                            </span>
                        </button>
                        <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-white/40">
                            <span className="w-8 h-px bg-white/30" />
                            5 vagas / mês
                        </div>
                    </div>
                </div>

                {/* Bottom metrics strip — small label + giant number, brutalist */}
                <div className="col-span-12 mt-20 md:mt-28 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                    {[
                        { label: 'Em mídia gerida', value: '45M' },
                        { label: 'ROAS médio global', value: '7.5x' },
                        { label: 'Leads qualificados', value: '120k+' },
                    ].map((m) => (
                        <div key={m.label} className="flex flex-col">
                            <span className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-white/40 mb-2">
                                {m.label}
                            </span>
                            <span
                                className="font-display text-white leading-none"
                                style={{ fontSize: 'clamp(36px, 6vw, 88px)' }}
                            >
                                {m.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
