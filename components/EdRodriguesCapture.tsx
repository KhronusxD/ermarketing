import React from 'react';
import { Link } from 'react-router-dom';

// /edrodrigues — LP pro Meta Testers.
// Design: cutout do Ed (PNG com alpha, fundo removido) posicionado
// edge-to-edge na coluna esquerda no desktop, em escala grande sobre o
// fundo dark brutalist da marca. Sem formulário — botão único abre
// direto o grupo do WhatsApp em nova aba.

const WHATSAPP_GROUP =
    'https://chat.whatsapp.com/GZo7BCncDoeCYMOdxUrCSV?mode=gi_t';

const EdRodriguesCapture: React.FC = () => {
    return (
        <div className="min-h-screen bg-er-black text-white relative overflow-hidden flex flex-col">
            {/* Outline word bleeding off atrás do conteúdo */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-4 right-[-6%] select-none whitespace-nowrap font-display uppercase leading-[0.78]"
                style={{
                    fontSize: 'clamp(180px, 30vw, 460px)',
                    color: 'transparent',
                    WebkitTextStroke: '1.5px rgba(255,255,255,0.06)',
                }}
            >
                testers
            </div>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[-8%] left-[-4%] select-none whitespace-nowrap font-display uppercase leading-[0.78] text-er-red/70"
                style={{ fontSize: 'clamp(160px, 28vw, 460px)' }}
            >
                meta.
            </div>

            <header className="relative z-20 max-w-[1600px] mx-auto w-full px-6 py-5 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3">
                    <img
                        src="/assets/white-logo.png"
                        alt="ER Marketing"
                        className="h-7 w-auto"
                    />
                    <span className="hidden sm:inline font-display uppercase text-white text-base tracking-tight">
                        ER Marketing
                    </span>
                </Link>
                <Link
                    to="/"
                    className="text-[11px] tracking-[0.2em] uppercase text-white/55 hover:text-white transition-colors"
                >
                    ← Ir pro site
                </Link>
            </header>

            {/* Cutout do Ed — no desktop absolute na esquerda, full-height,
                encostando na base do viewport. No mobile some daqui e mostra
                num bloco separado no meio da coluna de conteúdo. */}
            <div
                aria-hidden="true"
                className="hidden lg:block pointer-events-none absolute left-0 bottom-0 z-10"
                style={{ width: '52%', height: '100vh' }}
            >
                <img
                    src="/socios/ed-cutout.png"
                    alt=""
                    className="absolute left-[-4%] bottom-0 w-[105%] h-full object-contain object-bottom"
                    style={{
                        filter: 'drop-shadow(0 20px 60px rgba(230,0,0,0.15))',
                    }}
                />
            </div>

            <main className="relative z-20 flex-1 max-w-[1600px] mx-auto w-full px-6 pb-16 md:pb-24 pt-6 md:pt-8 grid grid-cols-12 gap-6 items-center">
                {/* Slot vazio no desktop (foto absoluta ocupa esse espaço) */}
                <div className="hidden lg:block col-span-6" />

                {/* Mobile: foto centralizada acima do texto */}
                <div className="col-span-12 lg:hidden flex justify-center mb-4">
                    <img
                        src="/socios/ed-cutout.png"
                        alt="Ed Rodrigues, gestor de tráfego pago desde 2020"
                        className="w-56 h-56 object-contain object-bottom"
                    />
                </div>

                {/* Coluna de conteúdo */}
                <div className="col-span-12 lg:col-span-6 lg:col-start-7">
                    <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-5">
                        ◆ Meta Testers · Turma 01
                    </p>

                    <h1
                        className="font-display uppercase leading-[0.88] tracking-tight mb-6"
                        style={{ fontSize: 'clamp(44px, 7.5vw, 112px)' }}
                    >
                        Meta + IA.
                        <br />
                        <span className="text-er-red">A nova camada</span>
                        <br />
                        de velocidade.
                    </h1>

                    <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-xl mb-8">
                        Aulão gratuito abrindo o mesmo stack que a gente usa
                        aqui: novidades do Meta Ads em 2026 e como instalar a
                        API oficial do Meta no seu Claude pra criar, ajustar e
                        escalar campanhas por conversa. Sem painel, sem
                        fricção.
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-5 border-y border-white/10 py-6 mb-8 max-w-xl">
                        {[
                            {
                                n: '01',
                                t: 'Novidades Meta 2026',
                                s: 'O que virou obrigatório',
                            },
                            {
                                n: '02',
                                t: 'API oficial + Claude',
                                s: 'Setup passo a passo',
                            },
                            {
                                n: '03',
                                t: 'Campanhas por prompt',
                                s: 'Fluxo real de operação',
                            },
                        ].map((b) => (
                            <li key={b.n}>
                                <span className="block font-display text-er-red text-2xl leading-none mb-2">
                                    {b.n}
                                </span>
                                <span className="block font-bold text-sm uppercase tracking-wide mb-1">
                                    {b.t}
                                </span>
                                <span className="block text-xs text-white/55 leading-snug">
                                    {b.s}
                                </span>
                            </li>
                        ))}
                    </ul>

                    {/* CTA principal — abre grupo WhatsApp direto em nova aba */}
                    <div className="max-w-xl">
                        <a
                            href={WHATSAPP_GROUP}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group w-full inline-flex items-center justify-between gap-3 bg-er-red hover:bg-er-redHover text-white font-bold tracking-[0.18em] uppercase text-sm md:text-base px-7 py-5 md:px-8 md:py-6 shadow-[0_0_40px_rgba(230,0,0,0.35)] hover:shadow-[0_0_60px_rgba(230,0,0,0.55)] transition-all"
                        >
                            Entrar no grupo dos testers
                            <span
                                aria-hidden="true"
                                className="text-lg transition-transform group-hover:translate-x-1"
                            >
                                →
                            </span>
                        </a>

                        <div className="flex items-center gap-3 mt-5 text-[11px] tracking-[0.2em] uppercase text-white/45">
                            <span className="w-8 h-px bg-white/25" />
                            Grupo do WhatsApp · vagas limitadas
                        </div>

                        <p className="mt-4 text-xs text-white/55 leading-relaxed max-w-md">
                            Data e link do aulão saem por lá. Conduzido por{' '}
                            <strong className="text-white">Ed Rodrigues</strong>
                            , gestor de tráfego desde 2020 · +R$ 5M em mídia
                            gerida.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EdRodriguesCapture;
