import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import {
    WHATSAPP,
    Arrow,
    Eyebrow,
    NorteNav,
    NorteFooter,
    H1,
    H2,
    H3,
    TAG,
} from '../Norte/shared';
import { findCase, CASES_WITH_PAGE } from './cases';

// /cases/<slug> — case individual. Só existe pra case que tem desafio,
// operação e resultado registrados; o template lê tudo de cases.ts.
// A ordem das seções é a ordem em que a coisa aconteceu: o cenário que o
// cliente tinha, o que foi feito, o que saiu — e só então a fala dele.

const SECTION = 'py-16 md:py-24';
const CONTAINER = 'max-w-[1240px] mx-auto px-5 md:px-8';

const CasePage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const caso = slug ? findCase(slug) : undefined;
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    if (!caso) return <Navigate to="/cases" replace />;

    const { detail } = caso;
    const outros = CASES_WITH_PAGE.filter((c) => c.slug !== caso.slug);

    return (
        <div className="min-h-screen bg-white text-[#131313] font-sans antialiased selection:bg-[#8DC63F] selection:text-[#0B0E0C]">
            <NorteNav scrolled={scrolled} />

            {/* ═══ Hero ═══ */}
            <section className="relative bg-[#14261A] text-white overflow-hidden pt-28 md:pt-36 pb-14 md:pb-20">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-24 right-[-8%] w-[520px] h-[520px] rounded-full"
                    style={{
                        background:
                            'radial-gradient(circle, rgba(141,198,63,0.16) 0%, rgba(141,198,63,0) 70%)',
                    }}
                />
                <div className={`relative ${CONTAINER}`}>
                    <nav aria-label="Trilha" className={`${TAG} text-white/50`}>
                        <Link to="/" className="hover:text-white">
                            Início
                        </Link>
                        <span className="mx-2">/</span>
                        <Link to="/cases" className="hover:text-white">
                            Cases
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-white/80">{caso.client}</span>
                    </nav>

                    <Eyebrow light>
                        {detail.nicheTag} · {detail.location}
                    </Eyebrow>
                    <h1 className={`${H1} mt-5 text-[clamp(34px,5vw,60px)] max-w-[24ch]`}>
                        {caso.client}
                    </h1>
                    <p className="mt-5 text-[clamp(26px,3.4vw,42px)] font-norte font-medium tracking-[-0.04em] text-[#8DC63F]">
                        {caso.headline}
                    </p>
                    <p className="mt-3 max-w-[58ch] text-[16px] md:text-[18px] leading-relaxed text-white/80">
                        {caso.body}
                    </p>

                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {detail.stats.map((s) => (
                            <div
                                key={s.label}
                                className="rounded-2xl border border-white/12 bg-white/[0.04] p-5"
                            >
                                <p className="text-[clamp(28px,3vw,40px)] font-norte font-medium tracking-[-0.03em] leading-none text-white">
                                    {s.value}
                                </p>
                                <p className="mt-2 text-[13px] leading-snug text-white/65">
                                    {s.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ O cenário ═══ */}
            <section className={`${SECTION} bg-[#F4F1E9]`}>
                <div className={CONTAINER}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        <div className="lg:col-span-5">
                            <Eyebrow>O cenário</Eyebrow>
                            <h2 className={`${H2} mt-4 text-[clamp(26px,3.2vw,40px)] max-w-[20ch]`}>
                                Como estava quando chegou.
                            </h2>
                        </div>
                        <div className="lg:col-span-7">
                            <p className="text-[17px] md:text-[19px] leading-relaxed text-black/80">
                                {detail.challenge}
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 overflow-hidden rounded-3xl">
                        <img
                            src={detail.hero}
                            alt={`${caso.client} — ${detail.nicheTag} em ${detail.location}`}
                            loading="lazy"
                            decoding="async"
                            className="w-full aspect-[16/9] object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* ═══ O que foi feito ═══ */}
            <section className={`${SECTION} bg-white`}>
                <div className={CONTAINER}>
                    <Eyebrow>A operação</Eyebrow>
                    <h2 className={`${H2} mt-4 text-[clamp(26px,3.3vw,42px)] max-w-[24ch]`}>
                        O que a gente fez, na ordem.
                    </h2>

                    <div className="mt-10 space-y-5">
                        {detail.approach.map((a, i) => (
                            <div
                                key={a.title}
                                className="grid grid-cols-1 md:grid-cols-12 gap-5 rounded-2xl border border-black/10 p-6 md:p-8"
                            >
                                <div className="md:col-span-1">
                                    <span className="font-norte text-[28px] font-medium leading-none text-[#8DC63F]">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                </div>
                                <div className="md:col-span-11">
                                    <h3 className={`${H3} text-[19px] md:text-[22px]`}>{a.title}</h3>
                                    <p className="mt-3 text-[15px] md:text-[16px] leading-relaxed text-black/70">
                                        {a.body}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {detail.gallery.length > 0 && (
                        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {detail.gallery.map((src, i) => (
                                <div key={src} className="overflow-hidden rounded-2xl">
                                    <img
                                        src={src}
                                        alt={`${caso.client} — imagem ${i + 2} da operação`}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full aspect-[4/3] object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ═══ A fala do cliente ═══ */}
            <section className={`${SECTION} bg-[#14261A] text-white`}>
                <div className={CONTAINER}>
                    <Eyebrow light>Na voz de quem contratou</Eyebrow>
                    <blockquote className="mt-6 max-w-[34ch]">
                        <p
                            className={`${H2} text-[clamp(24px,3.2vw,40px)] text-white`}
                        >
                            “{detail.quote}”
                        </p>
                        <footer className={`${TAG} mt-6 text-[#8DC63F]`}>
                            {detail.author}
                        </footer>
                    </blockquote>

                    <div className="mt-12 flex flex-wrap gap-3">
                        <a
                            href={WHATSAPP}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-[#8DC63F] px-6 py-3.5 text-[15px] font-semibold text-[#0B0E0C] transition hover:brightness-110"
                        >
                            Quero resultado assim <Arrow className="w-4 h-4" />
                        </a>
                        <Link
                            to="/auditoria-de-lucro-invisivel"
                            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-[15px] font-semibold text-white transition hover:bg-white/10"
                        >
                            Agendar diagnóstico de 15 min
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══ Outros cases ═══ */}
            <section className={`${SECTION} bg-[#F4F1E9]`}>
                <div className={CONTAINER}>
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <h2 className={`${H2} text-[clamp(24px,2.8vw,34px)]`}>
                            Outros cases.
                        </h2>
                        <Link
                            to="/cases"
                            className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#14261A]"
                        >
                            Ver todos os cases <Arrow className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {outros.map((c) => (
                            <Link
                                key={c.slug}
                                to={`/cases/${c.slug}`}
                                className="group rounded-2xl bg-white p-6 md:p-7 transition hover:shadow-[0_14px_40px_rgba(0,0,0,0.08)]"
                            >
                                <span className={`${TAG} text-black/45`}>
                                    {c.detail.nicheTag}
                                </span>
                                <h3 className={`${H3} mt-2 text-[20px]`}>{c.client}</h3>
                                <p className="mt-2 text-[24px] font-norte font-medium tracking-[-0.03em] text-[#14261A]">
                                    {c.headline}
                                </p>
                                <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-[#14261A]">
                                    Ver o case
                                    <Arrow className="w-3.5 h-3.5 transition group-hover:translate-x-1" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <NorteFooter />
        </div>
    );
};

export default CasePage;
