import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// /lab-de-performance — email-capture LP for the upcoming Lab de
// Performance waitlist (audience: people who want to learn paid media
// and work in the field using AI + modern tooling). Submits to the same
// Make.com webhook used by the diagnostic flow, with a dedicated `type`
// discriminator so the backend can route it to a new Google Sheets tab.

const WEBHOOK_URL = 'https://hook.us2.make.com/he57ikonv7b37f55zipo91wv3bh58my9';

interface WaitlistEntry {
    name: string;
    email: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

const LabPerformance: React.FC = () => {
    const [data, setData] = useState<WaitlistEntry>({ name: '', email: '' });
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
                    type: 'waitlist_lab_performance',
                    contact: data,
                }),
            });
            if (!res.ok) throw new Error('webhook returned non-2xx');

            // Tracking event — feeds the GTM dataLayer so we can build a
            // funnel report later (signups by source / channel).
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'waitlist_lab_join',
                source: 'site_er',
            });
            setStatus('success');
        } catch (err) {
            console.error('Lab waitlist submission failed', err);
            setStatus('error');
        }
    };

    if (status === 'success') return <ThankYou name={data.name} />;

    return (
        <div className="min-h-screen bg-er-black text-white relative overflow-hidden">
            {/* Big outline word bleeding off — matches the brutalist
                editorial language used across the rest of the site. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-6 -left-6 select-none whitespace-nowrap font-display uppercase leading-[0.78]"
                style={{
                    fontSize: 'clamp(160px, 28vw, 440px)',
                    color: 'transparent',
                    WebkitTextStroke: '1.5px rgba(255,255,255,0.06)',
                }}
            >
                lab
            </div>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 -right-8 select-none whitespace-nowrap font-display uppercase leading-[0.78] text-er-red/80"
                style={{ fontSize: 'clamp(180px, 30vw, 480px)' }}
            >
                IA.
            </div>

            {/* Header */}
            <header className="relative z-10 max-w-[1400px] mx-auto w-full px-6 py-5 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3">
                    <img
                        src="/assets/white-logo.png"
                        alt="ER Marketing"
                        className="h-7 w-auto"
                    />
                    <span className="font-display uppercase text-white text-base tracking-tight hidden sm:inline">
                        ER Marketing
                    </span>
                </Link>
                <Link
                    to="/"
                    className="text-[11px] tracking-[0.2em] uppercase text-white/55 hover:text-white"
                >
                    ← Ir pro site
                </Link>
            </header>

            <main className="relative z-10 max-w-[1400px] mx-auto px-6 grid grid-cols-12 gap-8 pb-16 md:pb-24 pt-12 md:pt-20">
                {/* Pitch */}
                <div className="col-span-12 lg:col-span-7">
                    <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                        ◆ Lab de Performance · Lista de espera
                    </p>
                    <h1
                        className="font-display uppercase leading-[0.88] tracking-tight mb-8"
                        style={{ fontSize: 'clamp(44px, 8vw, 128px)' }}
                    >
                        Tráfego pago
                        <br />
                        <span className="text-er-red">+ IA.</span>
                        <br />A próxima geração
                        <br />
                        de gestores.
                    </h1>

                    <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-xl mb-10">
                        O mesmo método que usamos pra gerenciar +R$ 5M em mídia
                        paga — agora destrinchado e combinado com as ferramentas
                        de IA que ainda quase ninguém na praça domina. Em breve,
                        abrindo turmas. Entra na lista pra ser o primeiro a
                        saber quando lançar.
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 pt-8 max-w-xl">
                        {[
                            {
                                n: '01',
                                t: 'Fundamentos',
                                s: 'Meta, Google e TikTok ponta a ponta',
                            },
                            {
                                n: '02',
                                t: 'Stack de IA',
                                s: 'As ferramentas que aceleram 10x a operação',
                            },
                            {
                                n: '03',
                                t: 'Carreira',
                                s: 'Como fechar os primeiros clientes',
                            },
                        ].map((b) => (
                            <li key={b.n}>
                                <span className="block font-display text-er-red text-3xl leading-none mb-2">
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
                </div>

                {/* Form */}
                <aside className="col-span-12 lg:col-span-5 lg:pl-4">
                    <form
                        onSubmit={onSubmit}
                        className="bg-white/[0.04] border border-white/15 p-6 md:p-8 backdrop-blur-sm"
                    >
                        <p className="text-[10px] tracking-[0.3em] uppercase text-er-red font-bold mb-3">
                            ◆ Lista prioritária
                        </p>
                        <h2 className="font-display uppercase text-2xl md:text-3xl leading-[0.95] tracking-tight mb-6">
                            Quero ser
                            <br />o primeiro
                            <br />a saber.
                        </h2>

                        <div className="space-y-5">
                            <Field
                                label="Nome"
                                value={data.name}
                                onChange={(v) =>
                                    setData({ ...data, name: v })
                                }
                                placeholder="Como devemos te chamar"
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
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="w-full inline-flex items-center justify-center gap-3 bg-er-red hover:bg-er-redHover disabled:bg-er-red/40 disabled:cursor-not-allowed text-white font-bold tracking-[0.18em] uppercase text-sm px-7 py-4 mt-7 transition-colors"
                        >
                            {status === 'submitting'
                                ? 'Salvando…'
                                : 'Quero entrar na lista'}
                            {status !== 'submitting' && (
                                <span aria-hidden="true">→</span>
                            )}
                        </button>

                        {status === 'error' && (
                            <p className="mt-4 text-xs text-er-red font-bold">
                                Não conseguimos salvar agora. Tenta de novo
                                em alguns segundos ou nos chama no{' '}
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

                        <p className="mt-5 text-[11px] text-white/45 leading-relaxed">
                            Sem spam. Avisamos só quando a turma abrir + um
                            conteúdo eventual de valor. Pode sair quando
                            quiser.
                        </p>
                    </form>
                </aside>
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
        <span className="block text-[10px] tracking-[0.25em] uppercase text-white/60 mb-2">
            {label}
            {required && <span className="text-er-red"> *</span>}
        </span>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            placeholder={placeholder}
            className="w-full bg-er-black border border-white/15 px-4 py-3 text-base text-white placeholder-white/30 focus:outline-none focus:border-er-red focus:ring-1 focus:ring-er-red transition-colors"
        />
    </label>
);

const ThankYou: React.FC<{ name: string }> = ({ name }) => {
    const firstName = name.split(' ')[0] || 'você';
    return (
        <div className="min-h-screen bg-er-black text-white flex flex-col">
            <header className="max-w-[1400px] mx-auto w-full px-6 py-5 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3">
                    <img
                        src="/assets/white-logo.png"
                        alt="ER Marketing"
                        className="h-7 w-auto"
                    />
                </Link>
            </header>

            <main className="flex-1 flex items-center">
                <div className="max-w-[900px] mx-auto px-6 py-16 md:py-24">
                    <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                        ◆ Você está dentro
                    </p>
                    <h1
                        className="font-display uppercase leading-[0.92] tracking-tight mb-8"
                        style={{ fontSize: 'clamp(48px, 9vw, 144px)' }}
                    >
                        Bem-vindo,
                        <br />
                        <span className="text-er-red">{firstName}.</span>
                    </h1>
                    <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mb-10">
                        Quando abrirmos as turmas do Lab de Performance, você é
                        um dos primeiros a saber — direto no e-mail que cadastrou.
                        Enquanto isso, segue acompanhando o que a gente publica:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="https://www.youtube.com/@labdeperformance?sub_confirmation=1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-er-red hover:bg-er-redHover text-white font-bold tracking-[0.18em] uppercase text-sm px-7 py-4 transition-colors"
                        >
                            Inscrever no YouTube
                            <span aria-hidden="true">→</span>
                        </a>
                        <a
                            href="https://instagram.com/edrodrigues.mkt"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 border border-white/30 hover:border-white text-white font-bold tracking-[0.18em] uppercase text-sm px-7 py-4 transition-colors"
                        >
                            Seguir no Instagram
                        </a>
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-3 border border-white/30 hover:border-white text-white font-bold tracking-[0.18em] uppercase text-sm px-7 py-4 transition-colors"
                        >
                            Ler o blog
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LabPerformance;
