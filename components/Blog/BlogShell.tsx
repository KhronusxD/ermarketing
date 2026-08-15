import React, { useEffect, useState } from 'react';
import {
    Arrow,
    Eyebrow,
    NorteNav,
    NorteFooter,
    WHATSAPP,
    H2,
    CONTAINER,
} from '../Norte/shared';

// Chrome compartilhado do blog. Reaproveita a nav e o rodapé da Norte pra
// que sair de um artigo e cair na home não pareça trocar de site.
//
// A nav da Norte nasce transparente sobre a hero escura e só vira pílula
// branca depois do scroll. No blog não existe hero escura, então ela
// entra já rolada — senão a logo branca ficaria invisível sobre o papel.

export const BlogHeader: React.FC = () => {
    const [scrolled, setScrolled] = useState(true);

    useEffect(() => {
        const onScroll = () => setScrolled(true);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return <NorteNav scrolled={scrolled} />;
};

// Chamada de fim de artigo: quem leu até aqui já sabe do que se trata, e
// o próximo passo é conversa, não mais leitura.
export const BlogCta: React.FC = () => (
    <section className="relative bg-[#14261A] text-white overflow-hidden py-16 md:py-24">
        <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[-60%] w-[110%] h-[150%]"
            style={{
                background:
                    'radial-gradient(ellipse at center, rgba(141,198,63,0.16) 0%, transparent 68%)',
            }}
        />
        <div className={`relative ${CONTAINER}`}>
            <div className="max-w-2xl">
                <Eyebrow light>Próximo passo</Eyebrow>
                <h2 className={`mt-4 ${H2} text-[clamp(28px,3.9vw,50px)] mb-5`}>
                    Ler é bom. Medir é melhor.
                </h2>
                <p className="text-[15px] md:text-[17px] tracking-[-0.01em] text-white/60 leading-relaxed max-w-lg mb-9">
                    Se algo aqui bateu com o que acontece no seu negócio, chama a
                    gente. A primeira conversa é sobre o seu caso, não sobre a
                    nossa proposta.
                </p>
                <div className="flex flex-col sm:flex-row gap-2.5">
                    <a
                        href={WHATSAPP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#8DC63F] hover:bg-[#9ed650] text-[#0B0E0C] font-semibold text-sm pl-6 pr-2 py-2 transition-colors"
                    >
                        Falar no WhatsApp
                        <span className="w-8 h-8 rounded-full bg-[#0B0E0C] text-[#8DC63F] flex items-center justify-center transition-transform group-hover:rotate-45">
                            <Arrow className="w-4 h-4 -rotate-45" />
                        </span>
                    </a>
                    <a
                        href="/auditoria-de-lucro-invisivel"
                        className="inline-flex items-center justify-center rounded-full border border-white/25 hover:bg-white/10 text-white font-semibold text-sm px-7 py-3.5 transition-colors"
                    >
                        Agendar diagnóstico de 15 min
                    </a>
                </div>
            </div>
        </div>
    </section>
);

export const BlogFooter: React.FC = () => (
    <>
        <BlogCta />
        <NorteFooter />
    </>
);
