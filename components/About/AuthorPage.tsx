import React from 'react';
import { Link } from 'react-router-dom';
import { BlogHeader, BlogFooter } from '../Blog/BlogShell';
import { POSTS } from '../Blog/posts';
import { AUTHOR } from '../Blog/types';

// /sobre/ed-rodrigues — author page. Functions as the canonical E-E-A-T
// (Experience, Expertise, Authoritativeness, Trustworthiness) signal
// for Google. Every blog post byline links here. Includes Person
// schema injected via the prerender script.

const AuthorPage: React.FC = () => {
    return (
        <div className="bg-er-paper text-er-ink min-h-screen">
            <BlogHeader />

            <main>
                {/* Hero */}
                <section className="border-b border-er-ink/10">
                    <div className="max-w-[1100px] mx-auto px-6 py-16 md:py-24 grid grid-cols-12 gap-8 items-center">
                        <div className="col-span-12 md:col-span-7">
                            <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                                ◆ Autor · Sócio fundador
                            </p>
                            <h1
                                className="font-display uppercase leading-[0.9] tracking-tight mb-6"
                                style={{ fontSize: 'clamp(44px, 7vw, 112px)' }}
                            >
                                Ed
                                <br />
                                <span className="text-er-red">Rodrigues</span>
                            </h1>
                            <p className="text-base md:text-xl text-er-ink/75 leading-relaxed max-w-xl">
                                Gestor de tráfego pago desde 2020. Sócio
                                fundador da Norte. Já gerenciou mais
                                de R$ 5 milhões em Meta Ads e Google Ads pra
                                negócios locais em Manaus, e-commerce nacional,
                                infoproduto e B2B high-ticket.
                            </p>
                        </div>
                        <div className="col-span-12 md:col-span-5">
                            <img
                                src={AUTHOR.avatar}
                                alt="Ed Rodrigues, gestor de tráfego pago e sócio fundador da Norte"
                                className="w-full aspect-[3/4] object-cover"
                                width={500}
                                height={667}
                            />
                        </div>
                    </div>
                </section>

                {/* Quick stats */}
                <section className="border-b border-er-ink/10">
                    <div className="max-w-[1100px] mx-auto px-6 py-12 md:py-16">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-er-ink/15">
                            {[
                                { n: '2020', l: 'Início na gestão de tráfego' },
                                { n: '+R$ 5M', l: 'em mídia gerida' },
                                { n: '+100', l: 'parceiros atendidos' },
                                { n: '7+', l: 'nichos dominados' },
                            ].map((s) => (
                                <div
                                    key={s.l}
                                    className="bg-er-paper p-6 md:p-7"
                                >
                                    <span
                                        className="block font-display text-er-ink leading-none mb-2 tracking-tight"
                                        style={{
                                            fontSize: 'clamp(32px, 4vw, 56px)',
                                        }}
                                    >
                                        {s.n}
                                    </span>
                                    <span className="block text-[10px] uppercase tracking-[0.2em] text-er-ink/60 leading-snug">
                                        {s.l}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Bio */}
                <section className="border-b border-er-ink/10">
                    <div className="max-w-[760px] mx-auto px-6 py-16 md:py-24">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                            ◆ Trajetória
                        </p>
                        <h2
                            className="font-display uppercase leading-[0.95] tracking-tight mb-10"
                            style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}
                        >
                            De gestor solo
                            <br />
                            <span className="text-er-red">
                                a sócio fundador.
                            </span>
                        </h2>

                        <div className="space-y-6 text-base md:text-lg text-er-ink/85 leading-relaxed">
                            <p>
                                Começou a operar Meta Ads em 2020, durante a
                                pandemia, atendendo restaurantes e pequenos
                                comércios em Manaus que precisavam migrar pro
                                digital de uma hora pra outra. Foi nessa janela
                                que aprendeu o que funciona pra negócio local —
                                e o que é jogo de figurinha.
                            </p>
                            <p>
                                Em 2022 fundou a agência junto com Brenno
                                Soares e Francyelle Barbosa — nascida como ER
                                Marketing e hoje Norte. A operação cresceu
                                de "gestor solo" pra agência completa de
                                performance: estratégia, copy, captação
                                audiovisual presencial, CRM e BI próprio.
                            </p>
                            <p>
                                Hoje a Norte atende mais de 100 parceiros em
                                Manaus, no Brasil e fora — e Ed continua na
                                frente das contas estratégicas, escrevendo no
                                blog, e desenhando a metodologia que separa
                                tráfego como gasto de tráfego como sistema.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Expertise */}
                <section className="border-b border-er-ink/10">
                    <div className="max-w-[1100px] mx-auto px-6 py-16 md:py-20">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                            ◆ Áreas de especialidade
                        </p>
                        <h2
                            className="font-display uppercase leading-[0.95] tracking-tight mb-10 max-w-3xl"
                            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
                        >
                            Onde Ed opera
                            <br />
                            <span className="text-er-red">de ponta a ponta.</span>
                        </h2>

                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-er-ink/15">
                            {[
                                'Meta Ads (Instagram + Facebook + WhatsApp Ads)',
                                'Google Ads (Search, Performance Max, YouTube)',
                                'TikTok Ads pra negócio local em Manaus',
                                'Pixel server-side + API de Conversões (CAPI)',
                                'Funil de WhatsApp com automação e IA',
                                'Estratégia de lançamento de infoproduto',
                                'BI e dashboards com cross-channel attribution',
                                'Captação audiovisual presencial pra reels',
                            ].map((skill) => (
                                <li
                                    key={skill}
                                    className="bg-er-paper p-5 text-sm md:text-base text-er-ink/80 font-bold"
                                >
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Posts written */}
                <section className="border-b border-er-ink/10">
                    <div className="max-w-[1100px] mx-auto px-6 py-16 md:py-24">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                            ◆ Conteúdo publicado
                        </p>
                        <h2
                            className="font-display uppercase leading-[0.95] tracking-tight mb-10"
                            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
                        >
                            Todos os artigos
                            <br />
                            <span className="text-er-red">
                                escritos por Ed.
                            </span>
                        </h2>
                        <ul className="border-t border-er-ink/15">
                            {POSTS.map((p) => (
                                <li
                                    key={p.slug}
                                    className="border-b border-er-ink/15"
                                >
                                    <Link
                                        to={`/blog/${p.slug}`}
                                        className="group block py-6 grid grid-cols-12 gap-4 items-baseline hover:bg-white transition-colors px-4 -mx-4"
                                    >
                                        <span className="col-span-12 md:col-span-3 text-[10px] tracking-[0.25em] uppercase text-er-ink/55">
                                            {p.category}
                                        </span>
                                        <h3 className="col-span-12 md:col-span-7 font-display uppercase text-lg md:text-2xl leading-[1.1] tracking-tight group-hover:text-er-red transition-colors">
                                            {p.title}
                                        </h3>
                                        <span className="col-span-12 md:col-span-2 text-[10px] tracking-[0.25em] uppercase text-er-ink/45 md:text-right">
                                            {p.readTime}min
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Contact */}
                <section>
                    <div className="max-w-[1100px] mx-auto px-6 py-20 md:py-28">
                        <h2
                            className="font-display uppercase leading-[0.95] tracking-tight mb-6"
                            style={{ fontSize: 'clamp(36px, 5.5vw, 72px)' }}
                        >
                            Marca uma call
                            <br />
                            <span className="text-er-red">com o Ed.</span>
                        </h2>
                        <p className="text-base md:text-lg text-er-ink/70 max-w-2xl leading-relaxed mb-8">
                            Ed conduz pessoalmente as reuniões de diagnóstico
                            de 15 minutos com leads qualificados. Sem custo,
                            sem compromisso, com plano dos próximos 90 dias.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/auditoria-de-lucro-invisivel"
                                className="group inline-flex items-center gap-3 bg-er-ink text-er-paper hover:bg-er-red transition-colors font-bold tracking-[0.18em] uppercase text-sm md:text-base px-7 py-5"
                            >
                                Agendar diagnóstico
                                <span className="transition-transform group-hover:translate-x-1">
                                    →
                                </span>
                            </Link>
                            <a
                                href="https://www.linkedin.com/in/edrodriguesmkt/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 border border-er-ink/30 text-er-ink hover:bg-er-ink hover:text-er-paper transition-colors font-bold tracking-[0.18em] uppercase text-sm md:text-base px-7 py-5"
                            >
                                LinkedIn
                            </a>
                            <a
                                href="https://instagram.com/edrodrigues.mkt"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 border border-er-ink/30 text-er-ink hover:bg-er-ink hover:text-er-paper transition-colors font-bold tracking-[0.18em] uppercase text-sm md:text-base px-7 py-5"
                            >
                                Instagram
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <BlogFooter />
        </div>
    );
};

export default AuthorPage;
