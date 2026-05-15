import React from 'react';
import { Link } from 'react-router-dom';
import { BlogHeader, BlogFooter } from '../Blog/BlogShell';

// /sobre — institutional about page. Functions as a topical authority
// anchor for Google ("about ER Marketing" / "agência de marketing em
// Manaus") and as the canonical destination for any backlink that says
// "ER Marketing".

const Sobre: React.FC = () => {
    return (
        <div className="bg-er-paper text-er-ink min-h-screen">
            <BlogHeader />

            <main>
                {/* Hero */}
                <section className="border-b border-er-ink/10">
                    <div className="max-w-[1100px] mx-auto px-6 py-20 md:py-28">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                            ◆ Sobre a ER Marketing
                        </p>
                        <h1
                            className="font-display uppercase leading-[0.9] tracking-tight mb-8 max-w-4xl"
                            style={{ fontSize: 'clamp(48px, 8vw, 128px)' }}
                        >
                            Sete anos
                            <br />
                            de operação.
                            <br />
                            <span className="text-er-red">Zero achismo.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-er-ink/75 max-w-3xl leading-relaxed">
                            A ER Marketing é uma agência de marketing de
                            performance baseada em Manaus. Trabalhamos com
                            tráfego pago, copy, captação audiovisual presencial,
                            CRM e atendimento — ponta a ponta, com
                            relatório semanal que cruza mídia, leads e receita.
                        </p>
                    </div>
                </section>

                {/* Numbers */}
                <section className="border-b border-er-ink/10">
                    <div className="max-w-[1100px] mx-auto px-6 py-16 md:py-24">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-10">
                            ◆ Em números
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-er-ink/15">
                            {[
                                { n: '+R$ 5M', l: 'em mídia paga gerida' },
                                { n: '+100', l: 'parceiros atendidos' },
                                { n: '7 anos', l: 'de operação contínua' },
                            ].map((s) => (
                                <div
                                    key={s.l}
                                    className="bg-er-paper p-8 md:p-10"
                                >
                                    <span
                                        className="block font-display text-er-ink leading-none mb-3 tracking-tight"
                                        style={{
                                            fontSize: 'clamp(56px, 7vw, 112px)',
                                        }}
                                    >
                                        {s.n}
                                    </span>
                                    <span className="block text-sm uppercase tracking-wide text-er-ink/65">
                                        {s.l}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Story */}
                <section className="border-b border-er-ink/10">
                    <div className="max-w-[760px] mx-auto px-6 py-16 md:py-24">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                            ◆ A história
                        </p>
                        <h2
                            className="font-display uppercase leading-[0.95] tracking-tight mb-8"
                            style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}
                        >
                            De gestão de tráfego solo
                            <br />
                            <span className="text-er-red">
                                pra operação completa.
                            </span>
                        </h2>
                        <div className="space-y-6 text-base md:text-lg text-er-ink/85 leading-relaxed">
                            <p>
                                A ER nasceu em 2018 como operação solo de
                                gestão de tráfego pago, feita pelo Ed Rodrigues.
                                Em três anos, a demanda de cliente exigiu time:
                                veio o Brenno cuidando da administração e da
                                operação, depois a Francyelle dirigindo conteúdo
                                e captação.
                            </p>
                            <p>
                                Em 2026, somos uma agência completa de marketing
                                de performance baseada em Manaus, atendendo
                                negócios locais (restaurantes, clínicas,
                                varejo) e operações nacionais (e-commerce e
                                infoproduto) com a mesma régua: cada decisão é
                                medida em CAC, LTV e ROAS.
                            </p>
                            <p>
                                Não vendemos pacote fechado. Não promovemos
                                "tráfego sem CRM" ou "social sem tráfego". A
                                metodologia é integrada — começa pelo[
                                {' '}
                                <Link
                                    to="/auditoria-de-lucro-invisivel"
                                    className="text-er-red underline underline-offset-4 decoration-er-red/40 hover:decoration-er-red"
                                >
                                    diagnóstico de 15 minutos
                                </Link>{' '}
                                ], desenha o plano dos próximos 90 dias, e
                                escala junto com o cliente.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Team */}
                <section className="border-b border-er-ink/10">
                    <div className="max-w-[1100px] mx-auto px-6 py-16 md:py-24">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                            ◆ Os sócios
                        </p>
                        <h2
                            className="font-display uppercase leading-[0.95] tracking-tight mb-12"
                            style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}
                        >
                            Quem assina pelo
                            <br />
                            <span className="text-er-red">seu projeto.</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {[
                                {
                                    name: 'Ed Rodrigues',
                                    role: 'Gestor estratégico',
                                    bio: 'Sete anos de performance. Lidera estratégia, métrica e a régua que separa lucro de "movimento".',
                                    photo: '/socios/ed.jpg',
                                    href: '/sobre/ed-rodrigues',
                                },
                                {
                                    name: 'Brenno Soares',
                                    role: 'Administrador',
                                    bio: 'Cuida da operação, contratos e da máquina de entrega rodar todo mês sem ruído pro cliente.',
                                    photo: '/socios/brenno.jpg',
                                },
                                {
                                    name: 'Francyelle Barbosa',
                                    role: 'Diretora de conteúdo',
                                    bio: 'Conduz copy, social e captação. Traduz estratégia em narrativa que vende.',
                                    photo: '/socios/francyelle.jpg',
                                },
                            ].map((m) => (
                                <article
                                    key={m.name}
                                    className="flex flex-col"
                                >
                                    <div className="aspect-[3/4] bg-er-ink/5 overflow-hidden mb-5">
                                        <img
                                            src={m.photo}
                                            alt={m.name}
                                            loading="lazy"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="font-display uppercase text-2xl tracking-tight mb-1">
                                        {m.href ? (
                                            <Link
                                                to={m.href}
                                                className="hover:text-er-red transition-colors"
                                            >
                                                {m.name}
                                            </Link>
                                        ) : (
                                            m.name
                                        )}
                                    </h3>
                                    <p className="text-er-red text-xs tracking-[0.25em] uppercase font-bold mb-3">
                                        {m.role}
                                    </p>
                                    <p className="text-sm text-er-ink/70 leading-relaxed">
                                        {m.bio}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Methodology */}
                <section className="border-b border-er-ink/10">
                    <div className="max-w-[1100px] mx-auto px-6 py-16 md:py-24">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                            ◆ Metodologia
                        </p>
                        <h2
                            className="font-display uppercase leading-[0.95] tracking-tight mb-12 max-w-3xl"
                            style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}
                        >
                            Cinco pilares.
                            <br />
                            <span className="text-er-red">
                                Uma operação só.
                            </span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-er-ink/15">
                            {[
                                {
                                    n: '01',
                                    t: 'Tráfego pago',
                                    d: 'Meta, Google, TikTok e LinkedIn. Pixel + CAPI obrigatórios em todo projeto.',
                                },
                                {
                                    n: '02',
                                    t: 'Business Intelligence',
                                    d: 'Dashboard próprio cruzando mídia × CRM × financeiro. Sem print do gerenciador.',
                                },
                                {
                                    n: '03',
                                    t: 'Copy e criativos',
                                    d: 'Roteiro, headline e arte feitos in-house, com produção presencial no cliente.',
                                },
                                {
                                    n: '04',
                                    t: 'Inbound e CRM',
                                    d: 'Automação de e-mail, WhatsApp e funil de nutrição. Nada de lead esquecido.',
                                },
                                {
                                    n: '05',
                                    t: 'Captação in loco',
                                    d: 'Equipe audiovisual presencial dentro do negócio do cliente todo mês.',
                                },
                            ].map((p) => (
                                <div
                                    key={p.n}
                                    className="bg-er-paper p-7 md:p-9"
                                >
                                    <span className="block font-display text-er-ink/15 text-5xl mb-3">
                                        {p.n}
                                    </span>
                                    <h3 className="font-display uppercase text-2xl tracking-tight mb-3">
                                        {p.t}
                                    </h3>
                                    <p className="text-sm md:text-base text-er-ink/70 leading-relaxed">
                                        {p.d}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section>
                    <div className="max-w-[1100px] mx-auto px-6 py-20 md:py-28">
                        <h2
                            className="font-display uppercase leading-[0.95] tracking-tight mb-6 max-w-3xl"
                            style={{ fontSize: 'clamp(36px, 5.5vw, 72px)' }}
                        >
                            Pronto pra entender
                            <br />
                            <span className="text-er-red">
                                onde está o gargalo?
                            </span>
                        </h2>
                        <p className="text-base md:text-lg text-er-ink/70 max-w-2xl leading-relaxed mb-8">
                            15 minutos com o time da ER. Sem custo, sem
                            compromisso, com plano dos próximos 90 dias.
                        </p>
                        <Link
                            to="/auditoria-de-lucro-invisivel"
                            className="group inline-flex items-center gap-3 bg-er-ink text-er-paper hover:bg-er-red transition-colors font-bold tracking-[0.18em] uppercase text-sm md:text-base px-7 py-5"
                        >
                            Agendar diagnóstico
                            <span className="transition-transform group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                    </div>
                </section>
            </main>

            <BlogFooter />
        </div>
    );
};

export default Sobre;
