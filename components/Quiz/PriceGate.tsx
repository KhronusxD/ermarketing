import React from 'react';

interface PriceGateProps {
    onConfirm: (confirmed: 'yes' | 'no') => void;
}

// Final filter before the call: confirm the lead is aligned with our
// starting price band. Shown right after q_urgency for everyone who
// isn't premium (premium already passes by default) and isn't hard
// nurture (they go straight to waitlist).
//
// The screen frames the number as transparency — we don't want to
// surprise anyone on the call. Two paths:
//   - "Faz sentido pra mim" → proceeds to lead_form → schedule
//   - "Está fora do meu momento" → routes to nurture_waitlist tagged
//     as bounced_on_price (handled by the qualify() function)
const PriceGate: React.FC<PriceGateProps> = ({ onConfirm }) => {
    return (
        <div className="min-h-screen bg-white text-[#131313] flex flex-col">
            <div className="border-b border-black/10">
                <div className="max-w-[1100px] mx-auto px-6 py-5 flex items-center justify-between">
                    <a
                        href="/"
                        className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#131313]/60 hover:text-[#131313]"
                    >
                        <img
                            src="/norte/logo-preta.png"
                            alt="Norte · Agência de Marketing"
                            className="h-7 w-auto object-contain"
                        />
                    </a>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#3d6b12] font-bold">
                        Última verificação
                    </span>
                </div>
                <div className="h-[3px] bg-[#8DC63F]" />
            </div>

            <main className="flex-1 flex items-center">
                <div className="max-w-[1100px] mx-auto w-full px-6 py-12 md:py-20 grid grid-cols-12 gap-8">
                    <div className="col-span-12 lg:col-span-7">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-[#3d6b12] font-bold mb-6">
                            ◆ Transparência antes da call
                        </p>
                        <h2
                            className="font-norte font-medium leading-[0.92] tracking-[-0.055em] mb-8 max-w-3xl"
                            style={{ fontSize: 'clamp(40px, 6.5vw, 96px)' }}
                        >
                            Antes de
                            <br />
                            agendar:
                            <br />
                            <span className="text-[#3d6b12]">
                                o investimento
                            </span>
                            <br />
                            faz sentido?
                        </h2>

                        <p className="text-base md:text-lg text-[#131313]/70 leading-relaxed max-w-2xl mb-8">
                            Pra não te surpreender na call, deixamos o número aqui
                            antes. Você fica à vontade pra decidir se quer seguir.
                        </p>
                    </div>

                    <aside className="col-span-12 lg:col-span-5">
                        {/* Breakdown card — same brutalist card style used in
                            the LP cases. */}
                        <div className="bg-white border border-black/15">
                            <div className="px-6 py-5 border-b border-black/15">
                                <span className="text-[10px] tracking-[0.3em] uppercase text-[#131313]/55">
                                    ◆ A partir de
                                </span>
                                <span
                                    className="block font-norte font-medium text-[#131313] leading-none mt-1"
                                    style={{ fontSize: 'clamp(48px, 6vw, 80px)' }}
                                >
                                    R$ 2.500
                                    <span className="text-[#131313]/40 text-2xl">
                                        /mês
                                    </span>
                                </span>
                            </div>

                            <div className="px-6 py-5 space-y-5">
                                <PriceLine
                                    label="Norte"
                                    sub="Estratégia + gestão de tráfego + criativos + relatórios"
                                    value="R$ 1.500"
                                />
                                <div className="border-t border-black/10" />
                                <PriceLine
                                    label="Verba de mídia"
                                    sub="Vai direto pra Meta/Google. Não passa pela ER."
                                    value="R$ 1.000"
                                />
                            </div>

                            <div className="px-6 py-4 border-t border-black/15 bg-white">
                                <p className="text-xs text-[#131313]/60 leading-relaxed">
                                    Esse é o ponto de partida. Conforme o
                                    resultado entra, escala junto.
                                </p>
                            </div>
                        </div>
                    </aside>

                    {/* CTAs — full width on mobile, side-by-side on desktop. */}
                    <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <button
                            type="button"
                            onClick={() => onConfirm('yes')}
                            className="group inline-flex items-center justify-between gap-3 bg-[#131313] text-white hover:bg-[#9ed650] transition-colors font-bold tracking-[0.18em] uppercase text-sm md:text-base px-7 py-5 md:px-9 md:py-6"
                        >
                            Sim, faz sentido
                            <span className="transition-transform group-hover:translate-x-1">
                                →
                            </span>
                        </button>
                        <button
                            type="button"
                            onClick={() => onConfirm('no')}
                            className="group inline-flex items-center justify-between gap-3 bg-transparent text-[#131313] border border-black/30 hover:border-black hover:bg-[#131313]/5 transition-colors font-bold tracking-[0.18em] uppercase text-sm md:text-base px-7 py-5 md:px-9 md:py-6"
                        >
                            Está fora do meu momento
                            <span className="text-[#131313]/50">→</span>
                        </button>
                    </div>

                    <p className="col-span-12 text-xs text-[#131313]/45 max-w-xl">
                        Honestidade direta: a gente prefere você dizer não agora
                        do que assinar e cancelar em 30 dias.
                    </p>
                </div>
            </main>
        </div>
    );
};

const PriceLine: React.FC<{
    label: string;
    sub: string;
    value: string;
}> = ({ label, sub, value }) => (
    <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
            <span className="block font-bold text-sm md:text-base mb-1">
                {label}
            </span>
            <span className="block text-xs text-[#131313]/55 leading-relaxed">
                {sub}
            </span>
        </div>
        <span className="font-norte font-medium text-2xl md:text-3xl text-[#131313] whitespace-nowrap">
            {value}
        </span>
    </div>
);

export default PriceGate;
