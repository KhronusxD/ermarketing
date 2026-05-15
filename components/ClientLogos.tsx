import React from 'react';

// Each logo is a single PNG with a transparent background. Inverting +
// desaturating makes the colored circles read as light gray marks on the
// dark canvas, which is what the brutalist editorial layout calls for.
const logos = [
    { src: '/clientes/logos/itv-manaus.png', alt: 'iTV Manaus' },
    { src: '/clientes/logos/taychi.png', alt: 'Taychi Sushi' },
    { src: '/clientes/logos/abacazo.png', alt: 'Abacazo' },
    { src: '/clientes/logos/amazon-one.png', alt: 'Amazon One' },
    { src: '/clientes/logos/a-escola-de-sites.png', alt: 'A Escola de Sites' },
    { src: '/clientes/logos/tecno-obras.png', alt: 'Tecno Obras' },
    { src: '/clientes/logos/odonto-solutions.png', alt: 'Odonto Solutions' },
    { src: '/clientes/logos/pandora-eletronicos.png', alt: 'Pandora Eletrônicos' },
    { src: '/clientes/logos/dermo-evas.png', alt: 'Dermo Ervas' },
    { src: '/clientes/logos/conceito-obras.png', alt: 'Conceito Obras' },
    { src: '/clientes/logos/bem-fisio.png', alt: 'Bem Fisio' },
    { src: '/clientes/logos/bembe-atelier.png', alt: 'Bembê Atelier' },
    { src: '/clientes/logos/propriedades-compartilhadas.png', alt: 'Propriedades Compartilhadas' },
    { src: '/clientes/logos/full-sales-system.png', alt: 'Full Sales System' },
    { src: '/clientes/logos/oli-sofi.png', alt: 'Oli e Sofi' },
    { src: '/clientes/logos/omnifit.png', alt: 'Omnifit' },
    { src: '/clientes/logos/english-vip.png', alt: 'English Vip' },
    { src: '/clientes/logos/reifel.png', alt: 'Reifel Confecções' },
    { src: '/clientes/logos/formulle-age.png', alt: 'Formulle Age' },
    { src: '/clientes/logos/studio-5.png', alt: 'Studio 5' },
    { src: '/clientes/logos/livre-leve.png', alt: 'Livre & Leve' },
    { src: '/clientes/logos/bye-singles.png', alt: 'Bye Singles' },
    { src: '/clientes/logos/infinity-cobrancas.png', alt: 'Infinity Cobranças' },
    { src: '/clientes/logos/full-sales-system2.png', alt: 'Full Sales System' },
];

export const ClientLogos: React.FC = () => {
    // Duplicate the array so the marquee loops seamlessly. The keyframe is
    // defined in tailwind.config (`animate-marquee`) — we just compose it
    // with `motion-reduce:animate-none` for the a11y win.
    const row = [...logos, ...logos];

    return (
        <section className="relative bg-er-black text-white overflow-hidden border-y border-white/5">
            <div className="relative z-10 max-w-[1400px] mx-auto px-6 pt-20 md:pt-28 pb-12 md:pb-16">
                <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16">
                    <div className="col-span-12 md:col-span-7">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                            ◆ Confiança
                        </p>
                        <h2
                            className="font-display uppercase leading-[0.88] tracking-tight"
                            style={{ fontSize: 'clamp(36px, 6vw, 88px)' }}
                        >
                            Marcas que
                            <br />
                            <span className="text-er-red">a ER ajudou</span> a crescer.
                        </h2>
                    </div>
                    <div className="col-span-12 md:col-span-4 md:col-start-9 md:pt-8">
                        <p className="text-sm md:text-base text-white/60 leading-relaxed">
                            Mais de 50 negócios passaram pela nossa operação nos últimos
                            sete anos — entre marcas locais de Manaus, e-commerce
                            nacional e infoprodutos.
                        </p>
                    </div>
                </div>
            </div>

            {/* Marquee row — masked at the edges so the loop doesn't show a hard cut. */}
            <div
                className="relative pb-20 md:pb-28"
                style={{
                    maskImage:
                        'linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)',
                    WebkitMaskImage:
                        'linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)',
                }}
            >
                <div className="flex gap-12 md:gap-20 animate-marquee motion-reduce:animate-none">
                    {row.map((logo, i) => (
                        <div
                            key={`${logo.src}-${i}`}
                            className="flex-shrink-0 w-28 md:w-36 h-20 md:h-24 flex items-center justify-center"
                        >
                            <img
                                src={logo.src}
                                alt={logo.alt}
                                loading="lazy"
                                className="max-h-full max-w-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    // brightness(0) flattens every pixel to black, invert(1)
                                    // flips it to white — net effect is a pure light-gray
                                    // silhouette regardless of the original logo color.
                                    filter: 'brightness(0) invert(1)',
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
