import React from 'react';
import { Link } from 'react-router-dom';

// /links — link-tree style page intended to be the destination behind
// the bio link on Instagram and similar profiles. Mobile-first centered
// layout, same brutalist editorial language as the rest of the site,
// dark by default because these pages are mostly opened on phones in
// social-app webviews where dark reads cleaner.

interface LinkItem {
    label: string;
    hint?: string;
    href: string;
    external?: boolean;
    accent?: boolean;
}

const ITEMS: ReadonlyArray<LinkItem> = [
    {
        label: 'Marcar diagnóstico (15 min)',
        hint: 'Reunião com a equipe · sem custo',
        href: '/auditoria-de-lucro-invisivel',
        accent: true,
    },
    {
        label: 'Site principal',
        hint: 'Cases, time e metodologia',
        href: '/',
    },
    {
        label: 'Falar no WhatsApp',
        hint: '(92) 98514-6299',
        href:
            'https://wa.me/5592985146299?text=' +
            encodeURIComponent(
                'Olá, vim pelo link da bio e gostaria de falar com a equipe da ER Marketing.',
            ),
        external: true,
    },
    {
        label: 'Blog',
        hint: 'Análises, guias e bastidor de operação',
        href: '/blog',
    },
    {
        label: 'YouTube · Lab de Performance',
        hint: 'Inscreva-se no canal',
        href: 'https://www.youtube.com/@labdeperformance?sub_confirmation=1',
        external: true,
    },
];

const LinksPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-er-black text-white flex flex-col">
            {/* Big outline word bleeding off — consistent with the rest
                of the brutalist editorial language. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-8 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display uppercase leading-[0.78]"
                style={{
                    fontSize: 'clamp(120px, 26vw, 320px)',
                    color: 'transparent',
                    WebkitTextStroke: '1.5px rgba(255,255,255,0.05)',
                }}
            >
                links
            </div>

            <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">
                    {/* Brand header */}
                    <header className="text-center mb-10 md:mb-12">
                        <img
                            src="/assets/white-logo.png"
                            alt="ER Marketing"
                            className="h-12 w-auto mx-auto mb-5"
                        />
                        <h1 className="font-display uppercase text-3xl md:text-4xl leading-[0.95] tracking-tight mb-2">
                            ER Marketing
                        </h1>
                        <p className="text-[11px] tracking-[0.3em] uppercase text-white/55">
                            Performance · Manaus
                        </p>
                        <p className="text-sm text-white/65 mt-4 leading-relaxed">
                            Marketing de performance sem rodeio. Pelo que quer
                            conversar?
                        </p>
                    </header>

                    {/* Link stack */}
                    <ul className="space-y-3">
                        {ITEMS.map((item) => (
                            <li key={item.href}>
                                <LinkButton item={item} />
                            </li>
                        ))}
                    </ul>

                    {/* Social handles row */}
                    <div className="mt-12 pt-6 border-t border-white/10">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-white/45 text-center mb-4">
                            ◆ Também estamos aqui
                        </p>
                        <div className="flex items-center justify-center gap-5 text-xs tracking-[0.2em] uppercase text-white/60">
                            <a
                                href="https://instagram.com/edrodrigues.mkt"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                            >
                                Instagram
                            </a>
                            <span className="text-white/20">·</span>
                            <a
                                href="https://www.linkedin.com/in/edrodriguesmkt/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                            >
                                LinkedIn
                            </a>
                            <span className="text-white/20">·</span>
                            <a
                                href="mailto:contato@trafegomanaus.com.br"
                                className="hover:text-white transition-colors"
                            >
                                E-mail
                            </a>
                        </div>
                    </div>

                    {/* Tiny footer */}
                    <p className="mt-10 text-[10px] tracking-[0.3em] uppercase text-white/30 text-center">
                        © {new Date().getFullYear()} ER Marketing · Manaus, AM
                    </p>
                </div>
            </main>
        </div>
    );
};

const LinkButton: React.FC<{ item: LinkItem }> = ({ item }) => {
    const content = (
        <>
            <div className="flex-1 min-w-0">
                <span className="block font-bold text-base md:text-lg leading-tight">
                    {item.label}
                </span>
                {item.hint && (
                    <span
                        className={`block text-xs mt-1 ${
                            item.accent ? 'text-white/85' : 'text-white/55'
                        }`}
                    >
                        {item.hint}
                    </span>
                )}
            </div>
            <span
                className={`flex-shrink-0 text-lg transition-transform group-hover:translate-x-1 ${
                    item.accent ? 'text-white' : 'text-white/40'
                }`}
                aria-hidden="true"
            >
                →
            </span>
        </>
    );

    const className = `group w-full flex items-center gap-4 px-5 py-4 md:px-6 md:py-5 border transition-colors ${
        item.accent
            ? 'bg-er-red border-er-red text-white hover:bg-er-redHover'
            : 'bg-white/5 border-white/15 hover:border-white/40 hover:bg-white/10'
    }`;

    if (item.external) {
        return (
            <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
            >
                {content}
            </a>
        );
    }
    return (
        <Link to={item.href} className={className}>
            {content}
        </Link>
    );
};

export default LinksPage;
