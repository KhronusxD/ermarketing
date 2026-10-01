import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    WHATSAPP,
    Arrow,
    Eyebrow,
    NorteNav,
    NorteFooter,
    H1,
    H2,
    H3,
    LABEL,
    TAG,
} from '../Norte/shared';
import { CASES, CASE_CATEGORIES } from './cases';

// /cases — o índice. Reúne os 20 resultados que já estavam espalhados em
// ClientResults e FeaturedCases numa página só, agrupados por segmento.
//
// Por que uma página forte em vez de 20 fracas: os cases sem desafio e
// operação registrados têm uma linha de conteúdo cada. Vinte páginas de uma
// linha é conteúdo fino, que dilui o site em vez de somar. Aqui eles somam.
// Os dois que têm material completo ganham página própria e são linkados.

const SECTION = 'py-16 md:py-24';
const CONTAINER = 'max-w-[1240px] mx-auto px-5 md:px-8';

const CasesIndex: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const destaques = CASES.filter((c) => c.slug);

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
                    <Eyebrow light>Cases</Eyebrow>
                    <h1
                        className={`${H1} mt-5 text-[clamp(36px,5.4vw,66px)] max-w-[20ch]`}
                    >
                        O número antes
                        <br />
                        <span className="text-[#8DC63F]">da promessa.</span>
                    </h1>
                    <p className="mt-6 max-w-[62ch] text-[16px] md:text-[18px] leading-relaxed text-white/80">
                        São {CASES.length} operações com resultado medido — restaurante,
                        e-commerce, clínica, varejo, construção, infoproduto. Cada
                        linha abaixo é a métrica exata que a gente entregou pra
                        aquela marca, sem arredondar e sem remixar. Onde existe o
                        histórico completo, tem página com o que foi feito.
                    </p>
                    <div className="mt-9 flex flex-wrap gap-3">
                        <a
                            href={WHATSAPP}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-[#8DC63F] px-6 py-3.5 text-[15px] font-semibold text-[#0B0E0C] transition hover:brightness-110"
                        >
                            Falar com a gente <Arrow className="w-4 h-4" />
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

            {/* ═══ Cases com página própria ═══ */}
            <section className={`${SECTION} bg-[#F4F1E9]`}>
                <div className={CONTAINER}>
                    <Eyebrow>Por dentro da operação</Eyebrow>
                    <h2 className={`${H2} mt-4 text-[clamp(28px,3.6vw,46px)] max-w-[26ch]`}>
                        Dois cases com a conta aberta.
                    </h2>
                    <p className="mt-4 max-w-[60ch] text-[15px] md:text-[17px] leading-relaxed text-black/70">
                        O cenário de quando o cliente chegou, o que foi executado e
                        o resultado — na ordem em que aconteceu.
                    </p>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {destaques.map((c) => (
                            <Link
                                key={c.slug}
                                to={`/cases/${c.slug}`}
                                className="group block overflow-hidden rounded-3xl bg-white transition hover:shadow-[0_18px_50px_rgba(0,0,0,0.10)]"
                            >
                                {c.detail && (
                                    <div className="relative aspect-[16/10] overflow-hidden bg-[#14261A]">
                                        <img
                                            src={c.detail.hero}
                                            alt={`${c.client} — ${c.detail.nicheTag}`}
                                            loading="lazy"
                                            decoding="async"
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                                        />
                                    </div>
                                )}
                                <div className="p-6 md:p-8">
                                    <span className={`${TAG} text-black/45`}>
                                        {c.detail?.nicheTag} · {c.detail?.location}
                                    </span>
                                    <h3 className={`${H3} mt-3 text-[22px] md:text-[26px]`}>
                                        {c.client}
                                    </h3>
                                    <p className="mt-3 text-[26px] md:text-[30px] font-norte font-medium tracking-[-0.03em] text-[#14261A]">
                                        {c.headline}
                                    </p>
                                    <p className="mt-2 text-[14px] md:text-[15px] leading-relaxed text-black/65">
                                        {c.body}
                                    </p>
                                    <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-[#14261A]">
                                        Ver o case completo
                                        <Arrow className="w-4 h-4 transition group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Todos, por segmento ═══ */}
            <section className={`${SECTION} bg-white`}>
                <div className={CONTAINER}>
                    <Eyebrow>Resultados por segmento</Eyebrow>
                    <h2 className={`${H2} mt-4 text-[clamp(28px,3.6vw,46px)] max-w-[24ch]`}>
                        O que a gente entregou, marca por marca.
                    </h2>

                    <div className="mt-12 space-y-14">
                        {CASE_CATEGORIES.map((cat) => {
                            const doSegmento = CASES.filter((c) => c.category === cat);
                            return (
                                <div key={cat}>
                                    <div className="flex items-baseline gap-3 border-b border-black/10 pb-3">
                                        <h3 className={`${LABEL} text-[#14261A]`}>{cat}</h3>
                                        <span className={`${TAG} text-black/35`}>
                                            {doSegmento.length}{' '}
                                            {doSegmento.length === 1 ? 'operação' : 'operações'}
                                        </span>
                                    </div>
                                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                        {doSegmento.map((c) => {
                                            const conteudo = (
                                                <>
                                                    <div className="flex items-start justify-between gap-3">
                                                        <span className={`${TAG} text-black/45`}>
                                                            {c.client}
                                                        </span>
                                                        {c.premium && (
                                                            <span className="shrink-0 rounded-full bg-[#8DC63F]/18 px-2 py-0.5 font-mono text-[8px] tracking-[0.14em] uppercase text-[#14261A]">
                                                                Premium
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="mt-3 text-[24px] md:text-[27px] font-norte font-medium tracking-[-0.03em] leading-[1.1] text-[#14261A]">
                                                        {c.headline}
                                                    </p>
                                                    <p className="mt-2 text-[14px] leading-relaxed text-black/65">
                                                        {c.body}
                                                    </p>
                                                    {c.slug && (
                                                        <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#14261A]">
                                                            Case completo
                                                            <Arrow className="w-3.5 h-3.5" />
                                                        </span>
                                                    )}
                                                </>
                                            );
                                            return c.slug ? (
                                                <Link
                                                    key={c.client}
                                                    to={`/cases/${c.slug}`}
                                                    className="block rounded-2xl border border-black/10 p-5 transition hover:border-[#8DC63F] hover:bg-[#F4F1E9]/60"
                                                >
                                                    {conteudo}
                                                </Link>
                                            ) : (
                                                <div
                                                    key={c.client}
                                                    className="rounded-2xl border border-black/10 p-5"
                                                >
                                                    {conteudo}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══ Como a gente lê esses números ═══ */}
            <section className={`${SECTION} bg-[#14261A] text-white`}>
                <div className={CONTAINER}>
                    <Eyebrow light>A régua</Eyebrow>
                    <h2 className={`${H2} mt-4 text-[clamp(26px,3.3vw,42px)] max-w-[28ch]`}>
                        Número sem margem do lado não decide nada.
                    </h2>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                t: 'Métrica exata, não arredondada',
                                b: 'Cada resultado aqui é o que saiu da conta daquele cliente. Quando o número é 5.193 leads a R$ 1,57, é isso que está escrito — não "mais de 5 mil a menos de R$ 2".',
                            },
                            {
                                t: 'Case não é garantia',
                                b: 'Resultado de um cliente não é promessa pro próximo: muda a margem, o ticket, a praça e a capacidade de atender. O que se repete é o método, não o número.',
                            },
                            {
                                t: 'A conta que importa é a sua',
                                b: 'Antes de combinar meta, a gente precisa da sua margem de contribuição. Sem ela, qualquer ROAS prometido é chute — e é sobre isso o nosso post de ROAS.',
                            },
                        ].map((i) => (
                            <div
                                key={i.t}
                                className="rounded-2xl border border-white/12 bg-white/[0.04] p-6"
                            >
                                <h3 className={`${H3} text-[18px] text-[#8DC63F]`}>{i.t}</h3>
                                <p className="mt-3 text-[14px] leading-relaxed text-white/75">
                                    {i.b}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 flex flex-wrap gap-3">
                        <Link
                            to="/blog/o-que-e-roas"
                            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-[15px] font-semibold text-white transition hover:bg-white/10"
                        >
                            Ler: o que é ROAS e por que ele engana
                            <Arrow className="w-4 h-4" />
                        </Link>
                        <a
                            href={WHATSAPP}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-[#8DC63F] px-6 py-3.5 text-[15px] font-semibold text-[#0B0E0C] transition hover:brightness-110"
                        >
                            Quero a minha conta feita <Arrow className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>

            <NorteFooter />
        </div>
    );
};

export default CasesIndex;
