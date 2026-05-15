import React from 'react';
import { SectionProps } from '../types';

const partners = [
    {
        name: 'Ed Rodrigues',
        role: 'Gestor estratégico',
        photo: '/socios/ed.jpg',
        bio: 'Sete anos de performance. Lidera estratégia, métrica e a régua que separa lucro de “movimento”.',
        meta: 'Sócio fundador',
    },
    {
        name: 'Brenno Soares',
        role: 'Administrador',
        photo: '/socios/brenno.jpg',
        bio: 'Cuida da operação, contratos e da máquina de entrega rodar todo mês sem ruído pro cliente.',
        meta: 'Sócio · operação',
    },
    {
        name: 'Francyelle Barbosa',
        role: 'Diretora de conteúdo',
        photo: '/socios/francyelle.jpg',
        bio: 'Conduz copy, social e captação. Traduz estratégia em narrativa que vende — sem perder a alma da marca.',
        meta: 'Sócia · conteúdo',
    },
];

export const Partners: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="relative bg-er-black text-white overflow-hidden">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-10 right-[-8%] select-none font-display uppercase leading-[0.78] whitespace-nowrap"
                style={{
                    fontSize: 'clamp(180px, 24vw, 380px)',
                    color: 'transparent',
                    WebkitTextStroke: '1.5px rgba(255,255,255,0.06)',
                }}
            >
                quem
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-24 md:py-36">
                <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
                    <div className="col-span-12 md:col-span-8">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                            ◆ Os sócios
                        </p>
                        <h2
                            className="font-display uppercase leading-[0.88] tracking-tight"
                            style={{ fontSize: 'clamp(44px, 7vw, 112px)' }}
                        >
                            Conheça parte
                            <br />
                            <span className="text-er-red">do time.</span>
                        </h2>
                    </div>
                    <div className="col-span-12 md:col-span-4 md:pt-12">
                        <p className="text-base md:text-lg text-white/60 leading-relaxed">
                            Você não cai num atendente terceirizado. Quem assina pelo seu
                            projeto são os mesmos três que abriram a empresa — sócios na
                            estratégia, no resultado e no nome.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {partners.map((p, i) => (
                        <article
                            key={p.name}
                            className="group flex flex-col"
                        >
                            <div className="relative overflow-hidden bg-[#0a0a0a] aspect-[3/4] mb-6">
                                <img
                                    src={p.photo}
                                    alt={`${p.name} — ${p.role}`}
                                    loading={i === 0 ? 'eager' : 'lazy'}
                                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-700"
                                />
                                {/* Brutalist label strip */}
                                <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-white bg-er-red px-2 py-1">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                                    {`0${i + 1}`}
                                </div>
                                <div className="absolute bottom-4 right-4 text-[10px] tracking-[0.25em] uppercase text-white/80 bg-black/60 backdrop-blur-sm px-2 py-1">
                                    {p.meta}
                                </div>
                            </div>

                            <h3 className="font-display uppercase text-3xl md:text-4xl leading-[0.95] tracking-tight mb-2">
                                {p.name}
                            </h3>
                            <p className="text-er-red text-xs tracking-[0.25em] uppercase font-bold mb-4">
                                {p.role}
                            </p>
                            <p className="text-sm md:text-base text-white/60 leading-relaxed">
                                {p.bio}
                            </p>
                        </article>
                    ))}
                </div>

                <div className="mt-16 md:mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-white/10 pt-10">
                    <p className="text-sm md:text-base text-white/60 max-w-md">
                        Quer entender como o trio aborda o seu projeto antes mesmo de
                        contratar? A reunião de 15 min é o melhor teste-drive.
                    </p>
                    <button
                        type="button"
                        onClick={onAuditClick}
                        className="group inline-flex items-center gap-3 bg-white text-er-black hover:bg-er-red hover:text-white transition-colors font-bold text-sm tracking-[0.18em] uppercase px-6 py-4"
                    >
                        Agendar com o time
                        <span className="transition-transform group-hover:translate-x-1">
                            →
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
};
