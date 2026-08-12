import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import {
    WHATSAPP,
    Arrow,
    Check,
    Eyebrow,
    NorteNav,
    NorteFooter,
} from './shared';
import { SERVICES, findService } from './services';

// /norte/<slug> — LP de serviço. Mais enxuta que a institucional:
// mesma paleta e mesmos cards arredondados, porém com uma coluna só,
// menos blocos e foco em explicar a entrega e levar ao WhatsApp.

const ServicePage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const service = slug ? findService(slug) : undefined;
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    if (!service) return <Navigate to="/norte" replace />;

    const { icon: Icon } = service;
    const others = SERVICES.filter((s) => s.slug !== service.slug);

    return (
        <div className="min-h-screen bg-[#F4F1E9] text-[#0B0E0C] font-sans antialiased selection:bg-[#8DC63F] selection:text-[#0B0E0C]">
            <NorteNav scrolled={scrolled} />

            <main className="max-w-[1240px] mx-auto px-3 md:px-5 pt-20 md:pt-24 space-y-3 md:space-y-4">
                {/* ─── Hero ─── */}
                <section className="rounded-[28px] bg-[#14261A] text-white p-6 md:p-12 relative overflow-hidden">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-24 -right-16 w-96 h-96 rounded-full"
                        style={{
                            background:
                                'radial-gradient(circle, rgba(141,198,63,0.22) 0%, transparent 65%)',
                        }}
                    />

                    <div className="relative max-w-3xl">
                        <a
                            href="/norte#servicos"
                            className="inline-flex items-center gap-1.5 text-[12px] text-white/50 hover:text-white transition-colors mb-7"
                        >
                            <Arrow className="w-3.5 h-3.5 rotate-180" />
                            Serviços da Norte
                        </a>

                        <span className="flex w-14 h-14 rounded-2xl bg-[#8DC63F] text-[#0B0E0C] items-center justify-center mb-6">
                            <Icon className="w-7 h-7" />
                        </span>

                        <Eyebrow light>{service.name}</Eyebrow>

                        <h1
                            className="mt-3 font-extrabold tracking-[-0.02em] leading-[1.08] mb-5"
                            style={{ fontSize: 'clamp(28px, 3.6vw, 48px)' }}
                        >
                            {service.headline}
                        </h1>

                        <p className="text-[15px] md:text-base text-white/65 leading-relaxed mb-8">
                            {service.intro}
                        </p>

                        <a
                            href={WHATSAPP}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 rounded-full bg-[#8DC63F] hover:bg-[#7db32f] text-[#0B0E0C] font-bold text-sm px-6 py-3.5 transition-colors"
                        >
                            Falar sobre {service.name.toLowerCase()}
                            <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </a>
                    </div>
                </section>

                {/* ─── Inclui + Pra quem é ─── */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-4">
                    <div className="lg:col-span-7 rounded-[28px] bg-white p-6 md:p-8">
                        <Eyebrow>O que está incluído</Eyebrow>
                        <h2 className="mt-2.5 text-2xl md:text-[30px] font-extrabold tracking-[-0.02em] leading-tight mb-6">
                            A entrega, item por item.
                        </h2>
                        <ul className="space-y-3">
                            {service.includes.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <span className="mt-0.5 w-5 h-5 rounded-md bg-[#8DC63F] text-[#0B0E0C] flex items-center justify-center flex-shrink-0">
                                        <Check className="w-3.5 h-3.5" />
                                    </span>
                                    <span className="text-[14px] md:text-[15px] text-black/70 leading-snug">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-5 rounded-[28px] bg-white p-6 md:p-8 flex flex-col">
                        <Eyebrow>Pra quem é</Eyebrow>
                        <h2 className="mt-2.5 text-2xl md:text-[30px] font-extrabold tracking-[-0.02em] leading-tight mb-6">
                            Faz sentido se…
                        </h2>
                        <ul className="space-y-2.5">
                            {service.forWho.map((w, i) => (
                                <li
                                    key={w}
                                    className="rounded-2xl bg-[#F4F1E9] p-4 text-[14px] text-black/70 leading-snug"
                                >
                                    <span className="block text-[11px] font-extrabold text-[#3d6b12] mb-1">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    {w}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* ─── Como funciona ─── */}
                <section className="rounded-[28px] bg-white p-6 md:p-8">
                    <Eyebrow>Como funciona</Eyebrow>
                    <h2 className="mt-2.5 text-2xl md:text-[30px] font-extrabold tracking-[-0.02em] leading-tight mb-7">
                        Três etapas, sem mistério.
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                        {service.steps.map((s, i) => (
                            <div key={s.title} className="rounded-2xl bg-[#F4F1E9] p-5">
                                <span className="inline-flex w-8 h-8 rounded-full bg-white text-[#3d6b12] font-extrabold text-[13px] items-center justify-center mb-4">
                                    {i + 1}
                                </span>
                                <h3 className="font-bold text-[15px] mb-1.5">{s.title}</h3>
                                <p className="text-[13px] text-black/55 leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ─── Prova + CTA ─── */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-4">
                    <div className="lg:col-span-6 rounded-[28px] bg-white p-6 md:p-8 flex flex-col justify-between">
                        <div>
                            <Eyebrow>Prova</Eyebrow>
                            <p className="mt-4 text-[13px] font-bold text-black/50 uppercase tracking-[0.12em]">
                                {service.proof.client}
                            </p>
                            <p className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight text-[#3d6b12] leading-none">
                                {service.proof.metric}
                            </p>
                            <p className="mt-1.5 text-[13px] uppercase tracking-[0.14em] text-black/40">
                                {service.proof.label}
                            </p>
                        </div>
                        <p className="mt-6 text-[14px] text-black/55 leading-relaxed">
                            {service.proof.body}
                        </p>
                    </div>

                    <div className="lg:col-span-6 rounded-[28px] bg-[#8DC63F] text-[#0B0E0C] p-6 md:p-8 flex flex-col justify-between">
                        <div>
                            <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-bold text-[#0B0E0C]/60">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0B0E0C]" />
                                Próximo passo
                            </span>
                            <h2 className="mt-3 text-[28px] md:text-[36px] font-extrabold tracking-[-0.03em] leading-[1.05] mb-4">
                                Vamos falar sobre o seu caso?
                            </h2>
                            <p className="text-[14px] text-[#0B0E0C]/70 leading-relaxed mb-7">
                                Chama no WhatsApp e a gente entende o momento do seu
                                negócio antes de propor qualquer coisa.
                            </p>
                        </div>
                        <a
                            href={WHATSAPP}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group w-full inline-flex items-center justify-between gap-3 rounded-full bg-[#0B0E0C] hover:bg-[#14261A] text-white font-bold text-sm px-6 py-4 transition-colors"
                        >
                            Chamar no WhatsApp
                            <Arrow className="w-4 h-4 text-[#8DC63F] transition-transform group-hover:translate-x-0.5" />
                        </a>
                    </div>
                </section>

                {/* ─── Outros serviços ─── */}
                <section className="rounded-[28px] bg-white p-6 md:p-8">
                    <Eyebrow>Outros serviços</Eyebrow>
                    <h2 className="mt-2.5 text-2xl md:text-[30px] font-extrabold tracking-[-0.02em] leading-tight mb-6">
                        A operação completa.
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                        {others.map(({ slug: s, name, teaser, icon: OtherIcon }) => (
                            <a
                                key={s}
                                href={`/norte/${s}`}
                                className="rounded-2xl bg-[#F4F1E9] hover:bg-[#8DC63F]/15 p-4 transition-colors group"
                            >
                                <span className="inline-flex w-9 h-9 rounded-xl bg-white text-[#3d6b12] items-center justify-center mb-3 group-hover:bg-[#8DC63F] group-hover:text-[#0B0E0C] transition-colors">
                                    <OtherIcon className="w-5 h-5" />
                                </span>
                                <h3 className="font-bold text-[14px] mb-1 leading-tight">{name}</h3>
                                <p className="text-[12px] text-black/50 leading-snug">{teaser}</p>
                            </a>
                        ))}
                    </div>
                </section>
            </main>

            <NorteFooter />
        </div>
    );
};

export default ServicePage;
