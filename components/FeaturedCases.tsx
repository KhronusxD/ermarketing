import React from 'react';
import { SectionProps } from '../types';

// Two hyperlocal Manaus cases featured in deep-dive form — the same
// pair surfaced on /restaurantes-manaus but rebuilt in the brutalist
// editorial language of the main LP (paper bg, Anton display, no gold).
// Acts as the storytelling bridge between Partners (who we are) and
// ClientResults (the full carousel of 19 cases).

interface FeaturedCase {
    name: string;
    location: string;
    nicheTag: string;
    hero: string;
    gallery: [string, string, string];
    problem: string;
    stats: ReadonlyArray<{ value: string; label: string }>;
    quote: string;
    author: string;
}

const cases: ReadonlyArray<FeaturedCase> = [
    {
        name: 'Taychi Sushi Bar',
        location: 'Manaus',
        nicheTag: 'Restaurante · sushi',
        hero: '/photos-food/t-1.jpg',
        gallery: [
            '/photos-food/t-2.jpg',
            '/photos-food/t-3.jpg',
            '/photos-food/t-4.jpg',
        ],
        problem:
            'Salão cheio no fim de semana, mesas vazias na semana. Sem captação ativa, dependia 100% de indicação — e o caixa refletia isso.',
        stats: [
            { value: '+280%', label: 'em reservas mensais' },
            { value: '7 meses', label: 'de 70k pra 200k/mês' },
            { value: 'fila', label: 'de espera no fim de semana' },
        ],
        quote:
            'Em dois meses o sushi bar tinha fila de espera no fim de semana. Algo que nunca tinha acontecido antes.',
        author: 'Proprietário, Taychi Sushi Bar',
    },
    {
        name: 'La Pizza Rio',
        location: 'Manaus',
        nicheTag: 'Pizzaria · delivery',
        hero: '/photos-food/p-1.jpg',
        gallery: [
            '/photos-food/p-2.jpg',
            '/photos-food/p-3.jpg',
            '/photos-food/p-4.jpg',
        ],
        problem:
            'Crescer o delivery sem depender de marketplace. Construir uma base própria com margem maior e cliente que volta no WhatsApp, não no iFood.',
        stats: [
            { value: '+190%', label: 'em pedidos diretos no WhatsApp' },
            { value: '4.1x', label: 'de retorno em mídia' },
            { value: 'R$ 9,40', label: 'custo por lead' },
        ],
        quote:
            'A taxa de conversão triplicou. E a margem foi junto porque paramos de pagar comissão de marketplace.',
        author: 'Proprietário, La Pizza Rio',
    },
];

export const FeaturedCases: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="relative bg-er-paper text-er-ink overflow-hidden">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 -right-12 select-none font-display uppercase leading-[0.78] whitespace-nowrap"
                style={{
                    fontSize: 'clamp(180px, 26vw, 420px)',
                    color: 'transparent',
                    WebkitTextStroke: '1.5px rgba(10,10,10,0.08)',
                }}
            >
                manaus
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-24 md:py-36">
                <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
                    <div className="col-span-12 md:col-span-8">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                            ◆ Resultado real em Manaus
                        </p>
                        <h2
                            className="font-display uppercase leading-[0.88] tracking-tight"
                            style={{ fontSize: 'clamp(44px, 7vw, 112px)' }}
                        >
                            Não acredite
                            <br />
                            na gente.
                            <br />
                            <span className="text-er-red">
                                Acredite nos números.
                            </span>
                        </h2>
                    </div>
                    <div className="col-span-12 md:col-span-4 md:pt-14">
                        <p className="text-base md:text-lg text-er-ink/70 leading-relaxed">
                            Dois recortes de operação ponta a ponta: estratégia,
                            tráfego, criativo e captação in loco — tudo dentro do
                            negócio do cliente.
                        </p>
                    </div>
                </div>

                <div className="space-y-20 md:space-y-32">
                    {cases.map((c, i) => (
                        <article
                            key={c.name}
                            className="grid grid-cols-12 gap-6 md:gap-10 items-center"
                        >
                            {/* Hero photo + gallery dots — alternates side */}
                            <div
                                className={`col-span-12 lg:col-span-6 ${
                                    i % 2 === 1 ? 'lg:order-2' : ''
                                }`}
                            >
                                <div className="relative aspect-[4/5] bg-er-ink/5 overflow-hidden">
                                    <img
                                        src={c.hero}
                                        alt={c.name}
                                        loading="lazy"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-er-red text-white px-3 py-1.5 text-[10px] tracking-[0.25em] uppercase font-bold">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                        {c.location}
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <p className="text-[10px] tracking-[0.3em] uppercase text-white/80 mb-1">
                                            {c.nicheTag}
                                        </p>
                                        <h3 className="font-display uppercase text-white text-2xl md:text-3xl leading-[0.95] tracking-tight">
                                            {c.name}
                                        </h3>
                                    </div>
                                </div>

                                {/* Thumbnails row */}
                                <div className="grid grid-cols-3 gap-2 mt-2">
                                    {c.gallery.map((src, j) => (
                                        <div
                                            key={j}
                                            className="aspect-[4/3] bg-er-ink/5 overflow-hidden"
                                        >
                                            <img
                                                src={src}
                                                alt=""
                                                loading="lazy"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Stats + quote */}
                            <div
                                className={`col-span-12 lg:col-span-6 ${
                                    i % 2 === 1 ? 'lg:order-1' : ''
                                }`}
                            >
                                <p className="text-[10px] tracking-[0.3em] uppercase text-er-ink/50 mb-4">
                                    Case {`0${i + 1}`}
                                </p>
                                <p className="text-base md:text-lg text-er-ink/75 leading-relaxed mb-10 max-w-xl">
                                    {c.problem}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-er-ink/15 mb-10">
                                    {c.stats.map((s) => (
                                        <div
                                            key={s.label}
                                            className="bg-er-paper p-5"
                                        >
                                            <span
                                                className="block font-display text-er-red leading-none mb-2"
                                                style={{
                                                    fontSize:
                                                        'clamp(32px, 3.5vw, 48px)',
                                                }}
                                            >
                                                {s.value}
                                            </span>
                                            <span className="block text-[10px] tracking-[0.2em] uppercase text-er-ink/60 leading-tight">
                                                {s.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <blockquote className="border-l-2 border-er-red pl-5">
                                    <p className="font-display uppercase text-xl md:text-2xl leading-[1.1] tracking-tight mb-3">
                                        “{c.quote}”
                                    </p>
                                    <p className="text-[10px] tracking-[0.25em] uppercase text-er-ink/55">
                                        — {c.author}
                                    </p>
                                </blockquote>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-20 md:mt-28 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-t border-er-ink/15 pt-10">
                    <p
                        className="font-display uppercase leading-[0.95] tracking-tight max-w-2xl"
                        style={{ fontSize: 'clamp(28px, 3.5vw, 56px)' }}
                    >
                        Você quer ser
                        <br />
                        <span className="text-er-red">o próximo case.</span>
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
