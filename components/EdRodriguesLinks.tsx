import React from 'react';

// /ed-rodrigues — árvore de links da marca pessoal do Ed.
//
// Linguagem visual vem dos conteúdos dele (ER MKT/Ed Rodrigues Mkt), não
// da Norte: fundo creme-acinzentado, tinta azul-escura quase preta, azul
// de destaque, marca-texto lima e título em grotesca pesadíssima. Duas
// marcas diferentes de propósito — a agência e a pessoa.
//
// Cores tiradas por amostragem dos próprios slides, não de olho.

const BG = '#EFEFE9';
const INK = '#0F1A2E';
const BLUE = '#2F5BE0';
const LIME = '#C8F169';
const MUTED = '#525C72';

const IG = 'https://www.instagram.com/edrodrigues.mkt/';
const WHATSAPP =
    'https://wa.me/5592985146299?text=' +
    encodeURIComponent('Oi Ed! Vim pelo link da bio.');

type Item = {
    label: string;
    hint: string;
    href: string;
    external?: boolean;
    tone?: 'ink' | 'blue';
};

// Ordem por intenção: quem chega aqui vem do Instagram, então voltar pro
// Instagram é o link menos útil da lista — ele fica por último, pequeno.
const ITEMS: ReadonlyArray<Item> = [
    {
        label: 'Falar comigo no WhatsApp',
        hint: 'Resposta no mesmo dia',
        href: WHATSAPP,
        external: true,
        tone: 'ink',
    },
    {
        label: 'Agendar uma conversa',
        hint: '30 min · direto comigo',
        href: '/agendar',
        tone: 'blue',
    },
    {
        label: 'YouTube · Lab de Performance',
        hint: 'Tráfego pago, IA e bastidor de operação',
        href: 'https://www.youtube.com/@labdeperformance?sub_confirmation=1',
        external: true,
    },
    {
        label: 'Norte · minha agência',
        hint: 'Cases, serviços e time',
        href: '/',
    },
    {
        label: 'Blog',
        hint: 'O que funciona em Manaus, com número na mesa',
        href: '/blog',
    },
    {
        label: 'Lista de espera do Lab',
        hint: 'Aprender tráfego pago com IA',
        href: '/lab-de-performance',
    },
];

// Marca-texto do jeito que aparece nos slides: retângulo lima atrás da
// palavra. box-decoration-clone mantém o bloco inteiro quando a linha quebra.
const Mark: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span
        className="px-1.5 -mx-0.5"
        style={{ backgroundColor: LIME, boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}
    >
        {children}
    </span>
);

const EdRodriguesLinks: React.FC = () => (
    <div
        className="min-h-screen font-sans antialiased"
        style={{ backgroundColor: BG, color: INK }}
    >
        <main className="mx-auto w-full max-w-[560px] px-5 py-8 md:py-12 flex flex-col min-h-screen">
            {/* Cabeçalho igual ao dos posts: perfil à esquerda, assinatura à direita */}
            <header className="flex items-start justify-between gap-4 mb-10">
                <div className="flex items-center gap-3">
                    <span
                        className="w-11 h-11 rounded-full flex items-center justify-center text-white font-black text-[15px] tracking-tight flex-shrink-0"
                        style={{ backgroundColor: BLUE }}
                        aria-hidden="true"
                    >
                        ed
                    </span>
                    <span className="min-w-0">
                        <span className="flex items-center gap-1.5">
                            <span className="font-bold text-[16px] leading-none">
                                Ed Rodrigues
                            </span>
                            <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
                                <path
                                    fill={BLUE}
                                    d="M12 1.5l2.4 2.1 3.1-.5 1.2 2.9 2.9 1.2-.5 3.1L23.2 12l-2.1 2.4.5 3.1-2.9 1.2-1.2 2.9-3.1-.5L12 23.2l-2.4-2.1-3.1.5-1.2-2.9-2.9-1.2.5-3.1L.8 12l2.1-2.4-.5-3.1 2.9-1.2 1.2-2.9 3.1.5z"
                                />
                                <path
                                    fill="#fff"
                                    d="M10.7 15.5l-3-3 1.3-1.3 1.7 1.7 4.3-4.3 1.3 1.3z"
                                />
                            </svg>
                        </span>
                        <span
                            className="block text-[13px] leading-snug mt-0.5"
                            style={{ color: MUTED }}
                        >
                            @edrodrigues.mkt
                        </span>
                    </span>
                </div>

                <span className="hidden sm:flex items-center gap-1.5 flex-shrink-0 pt-1">
                    <span className="font-black text-[15px] tracking-[-0.03em]">
                        edrodrigues
                    </span>
                    <span
                        className="font-mono text-[11px] px-1.5 py-0.5 rounded-[3px]"
                        style={{ backgroundColor: LIME }}
                    >
                        .mkt
                    </span>
                </span>
            </header>

            {/* Chamada */}
            <span
                className="self-start font-mono text-[10px] tracking-[0.16em] uppercase text-white rounded-[4px] px-2.5 py-1.5 mb-5"
                style={{ backgroundColor: INK }}
            >
                Comece por aqui
            </span>

            <h1 className="font-black tracking-[-0.045em] leading-[1.02] text-[clamp(34px,9vw,46px)] mb-4">
                Marketing técnico, <Mark>sem palanque</Mark> de guru.
            </h1>

            <p className="text-[15px] leading-relaxed mb-9" style={{ color: MUTED }}>
                Gestor de tráfego pago desde 2020. Já gerenciei{' '}
                <strong style={{ color: INK }}>mais de R$ 5 milhões</strong> em Meta Ads e
                Google Ads. Direto de Manaus.
            </p>

            {/* Links */}
            <nav className="flex flex-col gap-2.5">
                {ITEMS.map(({ label, hint, href, external, tone }) => {
                    const solid = tone === 'ink' || tone === 'blue';
                    return (
                        <a
                            key={href}
                            href={href}
                            {...(external
                                ? { target: '_blank', rel: 'noopener noreferrer' }
                                : {})}
                            className="group flex items-center gap-4 rounded-xl px-5 py-4 transition-transform hover:-translate-y-0.5"
                            style={
                                solid
                                    ? {
                                          backgroundColor: tone === 'ink' ? INK : BLUE,
                                          color: '#fff',
                                      }
                                    : {
                                          backgroundColor: '#fff',
                                          color: INK,
                                          border: `1px solid ${INK}1A`,
                                      }
                            }
                        >
                            <span className="flex-1 min-w-0">
                                <span className="block font-bold text-[15px] leading-tight">
                                    {label}
                                </span>
                                <span
                                    className="block text-[12.5px] mt-1 leading-snug"
                                    style={{ color: solid ? '#ffffffA6' : MUTED }}
                                >
                                    {hint}
                                </span>
                            </span>
                            <span
                                className="flex-shrink-0 text-[17px] transition-transform group-hover:translate-x-0.5"
                                style={{ color: solid ? LIME : BLUE }}
                                aria-hidden="true"
                            >
                                →
                            </span>
                        </a>
                    );
                })}
            </nav>

            <footer
                className="mt-auto pt-12 flex items-center justify-between text-[12px]"
                style={{ color: MUTED }}
            >
                <a href={IG} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    @edrodrigues.mkt
                </a>
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase">
                    Manaus · AM
                </span>
            </footer>
        </main>
    </div>
);

export default EdRodriguesLinks;
