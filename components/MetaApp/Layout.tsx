import React from 'react';
import { Link } from 'react-router-dom';

// Minimal layout for the Meta App Review legal pages. The Meta reviewer
// will open these URLs in an anonymous tab and read them top-to-bottom —
// so the design is deliberately spartan: white background, system-readable
// type, clear hierarchy. No flashy CTAs, no funnel widgets, no popups.
// Everything works without JS once the page is server-rendered.

export const MetaAppShell: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => (
    <div className="min-h-screen bg-white text-er-ink">
        <header className="border-b border-er-ink/10">
            <div className="max-w-[860px] mx-auto px-6 py-5 flex items-center justify-between">
                <Link to="/meta-app" className="flex items-center gap-3">
                    <img
                        src="/assets/red-logo.png"
                        alt="ER Marketing"
                        className="h-7 w-auto"
                    />
                    <span className="font-bold text-base">
                        ER Ads Manager
                    </span>
                </Link>
                <nav className="flex items-center gap-6 text-sm text-er-ink/70">
                    <Link
                        to="/meta-app"
                        className="hover:text-er-ink transition-colors"
                    >
                        Visão geral
                    </Link>
                    <Link
                        to="/meta-app/privacidade"
                        className="hover:text-er-ink transition-colors"
                    >
                        Privacidade
                    </Link>
                    <Link
                        to="/meta-app/termos"
                        className="hover:text-er-ink transition-colors"
                    >
                        Termos
                    </Link>
                </nav>
            </div>
        </header>

        <main className="max-w-[760px] mx-auto px-6 py-12 md:py-16">
            {children}
        </main>

        <footer className="border-t border-er-ink/10 mt-16">
            <div className="max-w-[860px] mx-auto px-6 py-8 text-xs text-er-ink/55 leading-relaxed">
                <p>
                    ER Marketing · CNPJ 41.079.306/0001-62 · Manaus, AM,
                    Brasil ·{' '}
                    <a
                        href="mailto:contato@trafegomanaus.com.br"
                        className="text-er-red underline decoration-er-red/40 hover:decoration-er-red"
                    >
                        contato@trafegomanaus.com.br
                    </a>
                </p>
                <p className="mt-2">
                    Esta página descreve a aplicação <strong>ER Ads Manager</strong>,
                    ferramenta interna de uso restrito à equipe autorizada.{' '}
                    <Link
                        to="/"
                        className="text-er-red underline decoration-er-red/40 hover:decoration-er-red"
                    >
                        Voltar ao site institucional
                    </Link>
                    .
                </p>
            </div>
        </footer>
    </div>
);

// Shared typography helpers — purposely plain. Tailwind utilities give us
// good readable defaults without the brutalist display flourishes we use
// elsewhere on the marketing pages.

export const LegalH1: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => (
    <h1 className="text-3xl md:text-4xl font-bold text-er-ink mb-2 leading-tight">
        {children}
    </h1>
);

export const LegalH2: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => (
    <h2 className="text-xl md:text-2xl font-bold text-er-ink mt-10 mb-4 leading-tight">
        {children}
    </h2>
);

export const LegalP: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => (
    <p className="text-base text-er-ink/85 leading-relaxed mb-4">{children}</p>
);

export const LegalUL: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => (
    <ul className="list-disc pl-6 space-y-2 text-base text-er-ink/85 leading-relaxed mb-4 marker:text-er-red/60">
        {children}
    </ul>
);

export const LegalUpdated: React.FC<{ date: string }> = ({ date }) => (
    <p className="text-sm text-er-ink/55 mb-10">
        Última atualização: <strong className="text-er-ink/75">{date}</strong>
    </p>
);
