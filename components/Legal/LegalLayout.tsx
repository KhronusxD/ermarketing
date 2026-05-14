import React from 'react';
import { Link } from 'react-router-dom';

interface LegalLayoutProps {
    title: string;
    updatedAt: string;
    children: React.ReactNode;
}

export const LegalLayout: React.FC<LegalLayoutProps> = ({ title, updatedAt, children }) => {
    return (
        <div className="min-h-screen bg-[#111112] text-[#F5F1E8]">
            <header className="border-b border-white/10">
                <div className="max-w-3xl mx-auto px-6 py-6 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <img
                            src="/assets/white-logo.png"
                            alt="ER Marketing"
                            className="h-7 w-auto"
                        />
                        <span className="text-sm tracking-wider text-white/70">ER MARKETING</span>
                    </Link>
                    <Link
                        to="/"
                        className="text-xs text-white/50 hover:text-white transition-colors"
                    >
                        ← Voltar
                    </Link>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-16">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{title}</h1>
                <p className="text-xs text-white/40 mb-12 tracking-wider uppercase">
                    Última atualização: {updatedAt}
                </p>
                <article className="prose-legal space-y-8 text-[15px] leading-relaxed text-white/80">
                    {children}
                </article>

                <div className="mt-16 pt-8 border-t border-white/10 text-xs text-white/40 space-y-1">
                    <p>
                        <strong className="text-white/60">ER Marketing</strong> &middot; CNPJ
                        41.079.306/0001-62
                    </p>
                    <p>Contato: contato@ermarketing.com.br</p>
                </div>
            </main>
        </div>
    );
};
