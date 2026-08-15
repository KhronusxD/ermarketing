import React from 'react';
import { Arrow, WHATSAPP } from './Norte/shared';

// /links — árvore de links usada como destino do link da bio no Instagram
// e afins. Segue o sistema da Norte: foto da trilha ao fundo com véu
// fechado, Jakarta peso 500 nos títulos, mono em caixa alta nos rótulos.
//
// Coluna única e estreita porque quase todo acesso vem de webview de app
// social, no celular, com uma mão só. A foto entra na largura de 1024 no
// máximo: aqui ela é textura de fundo, não é o assunto da página, e não
// vale gastar banda de plano de celular com o arquivo grande.

interface LinkItem {
    label: string;
    hint: string;
    href: string;
    external?: boolean;
    accent?: boolean;
}

const ITEMS: ReadonlyArray<LinkItem> = [
    {
        label: 'Falar no WhatsApp',
        hint: '(92) 98514-6299 · resposta no mesmo dia',
        href: WHATSAPP,
        external: true,
        accent: true,
    },
    {
        label: 'Marcar diagnóstico de 15 min',
        hint: 'Reunião com a equipe · sem custo',
        href: '/auditoria-de-lucro-invisivel',
    },
    {
        label: 'Site da Norte',
        hint: 'Serviços, cases e time',
        href: '/',
    },
    {
        label: 'Blog',
        hint: 'O que funciona em Manaus, com número na mesa',
        href: '/blog',
    },
    {
        label: 'YouTube · Lab de Performance',
        hint: 'Inscreva-se no canal',
        href: 'https://www.youtube.com/@labdeperformance?sub_confirmation=1',
        external: true,
    },
];

const H2 = 'font-norte font-medium tracking-[-0.055em] leading-[1.06]';
const H3 = 'font-norte font-semibold tracking-[-0.02em]';

const LinksPage: React.FC = () => (
    <div className="relative min-h-screen bg-[#14261A] text-white font-sans antialiased selection:bg-[#8DC63F] selection:text-[#0B0E0C] overflow-hidden">
        <picture aria-hidden="true">
            <source
                type="image/webp"
                sizes="100vw"
                srcSet={
                    '/norte/hero/fundo-hero-640.webp 640w, ' +
                    '/norte/hero/fundo-hero-1024.webp 1024w'
                }
            />
            <img
                src="/norte/hero/fundo-hero-1024.webp"
                alt=""
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center"
            />
        </picture>

        <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
                background:
                    'linear-gradient(to bottom, rgba(11,18,13,0.90) 0%, rgba(14,28,19,0.80) 38%, rgba(16,32,22,0.92) 78%, #14261A 100%)',
            }}
        />

        <main className="relative flex flex-col items-center px-5 pt-14 pb-16 min-h-screen">
            <div className="w-full max-w-[440px] flex flex-col items-center text-center">
                <img
                    src="/norte/logo-branca.png"
                    alt="Norte · Agência de Marketing"
                    className="h-16 w-auto object-contain mb-7"
                />

                <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-white/60 mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
                    Agência de marketing · Manaus
                </span>

                <h1 className={`${H2} text-[30px] mb-3`}>
                    A gente aponta a direção.{' '}
                    <span className="text-[#8DC63F]">Você caminha.</span>
                </h1>

                <p className="text-[14px] text-white/55 leading-relaxed mb-9 max-w-[36ch]">
                    Tráfego, conteúdo, branding e sites — tudo em casa. Escolhe por
                    onde você quer começar.
                </p>

                <nav className="w-full flex flex-col gap-2.5">
                    {ITEMS.map(({ label, hint, href, external, accent }) => (
                        <a
                            key={href}
                            href={href}
                            {...(external
                                ? { target: '_blank', rel: 'noopener noreferrer' }
                                : {})}
                            className={`group flex items-center gap-4 rounded-2xl px-5 py-4 text-left transition-colors border ${
                                accent
                                    ? 'bg-[#8DC63F] hover:bg-[#9ed650] border-[#8DC63F] text-[#0B0E0C]'
                                    : 'bg-white/[0.09] hover:bg-white/[0.15] border-white/15 text-white'
                            }`}
                        >
                            <span className="flex-1 min-w-0">
                                <span className={`block ${H3} text-[15px] leading-tight`}>
                                    {label}
                                </span>
                                <span
                                    className={`block text-[12px] mt-1 leading-snug ${
                                        accent ? 'text-[#0B0E0C]/65' : 'text-white/45'
                                    }`}
                                >
                                    {hint}
                                </span>
                            </span>

                            <span
                                className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-transform group-hover:rotate-45 ${
                                    accent
                                        ? 'bg-[#0B0E0C] text-[#8DC63F]'
                                        : 'bg-white/12 text-[#8DC63F]'
                                }`}
                            >
                                <Arrow className="w-4 h-4 -rotate-45" />
                            </span>
                        </a>
                    ))}
                </nav>

                <div className="mt-auto pt-12 font-mono text-[10px] tracking-[0.12em] uppercase text-white/30 leading-relaxed">
                    <p>Norte · Agência de Marketing</p>
                    <p className="mt-1">Manaus · Amazonas · Brasil</p>
                </div>
            </div>
        </main>
    </div>
);

export default LinksPage;
