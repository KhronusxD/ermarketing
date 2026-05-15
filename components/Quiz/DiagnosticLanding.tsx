import React from 'react';

interface LandingProps {
    onStart: () => void;
}

// Light editorial landing for the qualification flow. Same brutalist
// language as the main LP (Anton display, paper bg, red accents) so the
// transition from CTA → quiz feels like the same conversation, not a
// detour into a different product.
const Landing: React.FC<LandingProps> = ({ onStart }) => {
    return (
        <div className="min-h-screen bg-er-paper text-er-ink relative overflow-hidden flex flex-col">
            <header className="relative z-10 max-w-[1400px] mx-auto w-full px-6 py-6 flex items-center justify-between">
                <a href="/" className="flex items-center gap-3">
                    <img
                        src="/assets/red-logo.png"
                        alt="ER Marketing"
                        className="h-8 w-auto"
                    />
                    <span className="font-display uppercase text-er-ink text-lg tracking-tight">
                        ER Marketing
                    </span>
                </a>
                <a
                    href="/"
                    className="text-xs tracking-[0.2em] uppercase text-er-ink/60 hover:text-er-ink"
                >
                    ← Voltar ao site
                </a>
            </header>

            {/* Massive outline word bleeding off — same trick used on the LP. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-12 md:-bottom-20 left-1/2 -translate-x-1/2 select-none font-display uppercase leading-[0.78] whitespace-nowrap"
                style={{
                    fontSize: 'clamp(200px, 30vw, 540px)',
                    color: 'transparent',
                    WebkitTextStroke: '1.5px rgba(10,10,10,0.08)',
                }}
            >
                15min
            </div>

            <main className="relative z-10 flex-1 flex items-center">
                <div className="max-w-[1400px] mx-auto w-full px-6 py-12 md:py-20 grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-9">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                            ◆ Reunião de diagnóstico · 15 minutos
                        </p>
                        <h1
                            className="font-display uppercase leading-[0.88] tracking-tight mb-8"
                            style={{ fontSize: 'clamp(48px, 9vw, 144px)' }}
                        >
                            Mostre o seu
                            <br />
                            Business.
                            <br />
                            <span className="text-er-red">A gente mostra</span>
                            <br />
                            onde o lucro
                            <br />
                            está parado.
                        </h1>
                    </div>

                    <div className="col-span-12 lg:col-span-6 lg:col-start-7">
                        <p className="text-base md:text-lg text-er-ink/70 leading-relaxed max-w-xl mb-10">
                            Antes da call, você responde 9 perguntas rápidas (3 minutos).
                            A gente entra na reunião já sabendo qual é o gargalo do seu
                            negócio — sem perder tempo te perguntando o básico. Você sai
                            com o plano dos próximos 90 dias.
                        </p>

                        <button
                            type="button"
                            onClick={onStart}
                            className="group inline-flex items-center gap-3 bg-er-ink text-er-paper hover:bg-er-red transition-colors font-bold tracking-[0.18em] uppercase text-sm md:text-base px-7 py-4 md:px-9 md:py-5"
                        >
                            Começar diagnóstico
                            <span className="transition-transform group-hover:translate-x-1">
                                →
                            </span>
                        </button>

                        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-er-ink/15 pt-8">
                            {[
                                {
                                    n: '01',
                                    label: '3 min de questionário',
                                    sub: 'Sem precisar pesquisar nada',
                                },
                                {
                                    n: '02',
                                    label: '15 min de call',
                                    sub: 'Direto com um dos sócios',
                                },
                                {
                                    n: '03',
                                    label: 'Plano dos 90 dias',
                                    sub: 'Sem custo · sem amarra',
                                },
                            ].map((b) => (
                                <li key={b.n}>
                                    <span className="block font-display text-er-red text-3xl leading-none mb-2">
                                        {b.n}
                                    </span>
                                    <span className="block font-bold text-sm uppercase tracking-wide mb-1">
                                        {b.label}
                                    </span>
                                    <span className="block text-xs text-er-ink/60">
                                        {b.sub}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Landing;
