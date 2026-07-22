import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// /edrodrigues — LP de captura pra lista de espera do Meta Testers.
// Aulão sobre novidades do Meta + como conectar a API oficial do Meta
// ao Claude pra rodar campanhas por linha de comando. Público-alvo:
// gestores de tráfego que querem sair do painel manual.

const WEBHOOK_URL =
    'https://hook.us2.make.com/he57ikonv7b37f55zipo91wv3bh58my9';

const WHATSAPP_GROUP =
    'https://chat.whatsapp.com/GZo7BCncDoeCYMOdxUrCSV?mode=gi_t';

interface Entry {
    name: string;
    email: string;
    whatsapp: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

const EdRodriguesCapture: React.FC = () => {
    const [data, setData] = useState<Entry>({ name: '', email: '', whatsapp: '' });
    const [status, setStatus] = useState<Status>('idle');

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (status === 'submitting') return;
        setStatus('submitting');
        try {
            const res = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date: new Date().toISOString(),
                    source: 'site_er',
                    type: 'meta_testers_waitlist',
                    contact: data,
                }),
            });
            if (!res.ok) throw new Error('webhook non-2xx');
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'meta_testers_join',
                source: 'site_er',
            });
            setStatus('success');
        } catch (err) {
            console.error('Meta Testers submission failed', err);
            setStatus('error');
        }
    };

    if (status === 'success') return <SuccessScreen />;

    return (
        <div className="min-h-screen bg-er-black text-white relative overflow-hidden">
            {/* Word bleeding off — mesma linguagem editorial do site */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-6 -right-10 select-none whitespace-nowrap font-display uppercase leading-[0.78]"
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
                className="pointer-events-none absolute bottom-0 -left-8 select-none whitespace-nowrap font-display uppercase leading-[0.78] text-er-red/70"
                style={{ fontSize: 'clamp(160px, 26vw, 420px)' }}
            >
                meta.
            </div>

            <header className="relative z-10 max-w-[1400px] mx-auto w-full px-6 py-5 flex items-center justify-between">
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

            <main className="relative z-10 max-w-[1400px] mx-auto px-6 py-8 md:py-14 grid grid-cols-12 gap-8 items-center">
                {/* Foto + identificação */}
                <div className="col-span-12 lg:col-span-5">
                    <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 overflow-hidden bg-[#0a0a0a] border border-white/10">
                        <img
                            src="/socios/ed.jpg"
                            alt="Ed Rodrigues, gestor de tráfego pago desde 2020"
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="eager"
                        />
                        {/* Badge no canto */}
                        <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-er-red text-white px-3 py-1.5 text-[10px] tracking-[0.25em] uppercase font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            Ao vivo em breve
                        </div>
                        {/* Nome no rodapé da foto */}
                        <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-[10px] tracking-[0.3em] uppercase text-white/70 mb-1">
                                Conduzido por
                            </p>
                            <p className="font-display uppercase text-white text-2xl md:text-3xl leading-[0.95] tracking-tight">
                                Ed Rodrigues
                            </p>
                            <p className="text-[11px] tracking-[0.15em] uppercase text-white/60 mt-1">
                                Gestor de tráfego desde 2020 · +R$ 5M em mídia
                            </p>
                        </div>
                    </div>
                </div>

                {/* Pitch + Form */}
                <div className="col-span-12 lg:col-span-7 lg:pl-2">
                    <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-5">
                        ◆ Meta Testers · Turma 01
                    </p>
                    <h1
                        className="font-display uppercase leading-[0.9] tracking-tight mb-6"
                        style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}
                    >
                        Meta + IA.
                        <br />
                        <span className="text-er-red">A nova camada</span>
                        <br />
                        de velocidade.
                    </h1>

                    <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-xl mb-8">
                        Um aulão gratuito abrindo o mesmo stack que a gente
                        usa aqui: novidades do Meta Ads, o que mudou em 2026, e
                        principalmente como instalar a API oficial do Meta no
                        seu Claude pra criar, ajustar e escalar campanhas por
                        conversa. Sem painel, sem fricção.
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

                    <form
                        onSubmit={onSubmit}
                        className="bg-white/[0.04] border border-white/15 p-5 md:p-6 backdrop-blur-sm max-w-xl"
                    >
                        <p className="text-[10px] tracking-[0.3em] uppercase text-er-red font-bold mb-3">
                            ◆ Lista prioritária · vagas limitadas
                        </p>
                        <h2 className="font-display uppercase text-xl md:text-2xl leading-[0.95] tracking-tight mb-5">
                            Quero minha vaga no
                            <br />
                            grupo dos testers.
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <Field
                                label="Nome"
                                value={data.name}
                                onChange={(v) =>
                                    setData({ ...data, name: v })
                                }
                                placeholder="Seu nome"
                                required
                            />
                            <Field
                                label="E-mail"
                                type="email"
                                value={data.email}
                                onChange={(v) =>
                                    setData({ ...data, email: v })
                                }
                                placeholder="seu@email.com"
                                required
                            />
                            <Field
                                label="WhatsApp"
                                type="tel"
                                value={data.whatsapp}
                                onChange={(v) =>
                                    setData({ ...data, whatsapp: v })
                                }
                                placeholder="(11) 99999-9999"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="w-full inline-flex items-center justify-center gap-3 bg-er-red hover:bg-er-redHover disabled:bg-er-red/40 disabled:cursor-not-allowed text-white font-bold tracking-[0.18em] uppercase text-sm px-7 py-4 mt-5 transition-colors"
                        >
                            {status === 'submitting'
                                ? 'Enviando…'
                                : 'Entrar no grupo dos testers'}
                            {status !== 'submitting' && (
                                <span aria-hidden="true">→</span>
                            )}
                        </button>

                        {status === 'error' && (
                            <p className="mt-3 text-xs text-er-red font-bold">
                                Falha ao cadastrar. Tenta de novo em 10s ou
                                fala com a gente no{' '}
                                <a
                                    href="https://wa.me/5592985146299"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline"
                                >
                                    WhatsApp
                                </a>
                                .
                            </p>
                        )}

                        <p className="mt-4 text-[11px] text-white/45 leading-relaxed">
                            Depois de enviar, você é redirecionado direto pro
                            grupo do WhatsApp. Data e link do aulão avisados por
                            lá.
                        </p>
                    </form>
                </div>
            </main>
        </div>
    );
};

const Field: React.FC<{
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    type?: string;
    required?: boolean;
}> = ({ label, value, onChange, placeholder, type = 'text', required }) => (
    <label className="block">
        <span className="block text-[10px] tracking-[0.25em] uppercase text-white/55 mb-1.5">
            {label}
            {required && <span className="text-er-red"> *</span>}
        </span>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            placeholder={placeholder}
            className="w-full bg-er-black border border-white/15 px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-er-red focus:ring-1 focus:ring-er-red transition-colors"
        />
    </label>
);

// Tela pós-cadastro — foco total no CTA de entrar no grupo. Também
// suporta redirect automático depois de 2s pra quem não clicar.
const SuccessScreen: React.FC = () => {
    React.useEffect(() => {
        const t = window.setTimeout(() => {
            window.location.href = WHATSAPP_GROUP;
        }, 2500);
        return () => window.clearTimeout(t);
    }, []);

    return (
        <div className="min-h-screen bg-er-black text-white flex flex-col">
            <header className="max-w-[1400px] mx-auto w-full px-6 py-5 flex items-center">
                <Link to="/" className="flex items-center gap-3">
                    <img
                        src="/assets/white-logo.png"
                        alt="ER Marketing"
                        className="h-7 w-auto"
                    />
                </Link>
            </header>

            <main className="flex-1 flex items-center">
                <div className="max-w-[900px] mx-auto px-6 py-16 md:py-24 text-center">
                    <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                        ◆ Você está dentro
                    </p>
                    <h1
                        className="font-display uppercase leading-[0.92] tracking-tight mb-6"
                        style={{ fontSize: 'clamp(44px, 8vw, 128px)' }}
                    >
                        Bem-vindo aos
                        <br />
                        <span className="text-er-red">Meta Testers.</span>
                    </h1>
                    <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-10">
                        Vou te levar pro grupo do WhatsApp agora. Data e link
                        do aulão saem por lá. Se não abrir automaticamente em
                        alguns segundos, é só clicar no botão abaixo.
                    </p>
                    <a
                        href={WHATSAPP_GROUP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-er-red hover:bg-er-redHover text-white font-bold tracking-[0.18em] uppercase text-sm md:text-base px-8 py-5 transition-colors"
                    >
                        Entrar no grupo do WhatsApp
                        <span aria-hidden="true">→</span>
                    </a>
                    <p className="mt-6 text-xs text-white/40">
                        Redirecionando automaticamente…
                    </p>
                </div>
            </main>
        </div>
    );
};

export default EdRodriguesCapture;
