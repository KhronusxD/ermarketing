import React, { useEffect } from 'react';
import { LeadData, QualificationLevel, QuizAnswers } from './types';
import { CALENDLY_STANDARD, CALENDLY_PREMIUM, CASE_BY_NICHE } from './constants';

interface ScheduleProps {
    level: 'qualified' | 'premium';
    lead: LeadData;
    answers: QuizAnswers;
}

// Final screen — Calendly inline embed plus a contextual recap so the
// lead arrives at the schedule confident the team already understands
// their case. Loads Calendly's widget script on mount (idempotent).
const Schedule: React.FC<ScheduleProps> = ({ level, lead, answers }) => {
    const calendlyUrl =
        level === 'premium' ? CALENDLY_PREMIUM : CALENDLY_STANDARD;

    useEffect(() => {
        // Calendly's widget script self-attaches; we only need to ensure
        // it's loaded once. The element with class `calendly-inline-widget`
        // will be hydrated as soon as the script runs.
        if (document.querySelector('script[data-calendly]')) return;
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        script.dataset.calendly = 'true';
        document.body.appendChild(script);
    }, []);

    // Prefill name/email so the Calendly form is one tap away from booking.
    const prefilledUrl =
        `${calendlyUrl}?` +
        new URLSearchParams({
            name: lead.name,
            email: lead.email,
            a1: lead.whatsapp,
            a2: lead.company,
        }).toString();

    return (
        <div className="min-h-screen bg-er-paper text-er-ink">
            <div className="border-b border-er-ink/10">
                <div className="max-w-[1400px] mx-auto px-6 py-5 flex items-center justify-between">
                    <a
                        href="/"
                        className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-er-ink/60 hover:text-er-ink"
                    >
                        <img
                            src="/assets/red-logo.png"
                            alt="ER Marketing"
                            className="h-6 w-auto"
                        />
                        ER Marketing
                    </a>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-er-red font-bold">
                        {level === 'premium' ? 'Premium · 30 min' : 'Diagnóstico · 15 min'}
                    </span>
                </div>
            </div>

            <main className="max-w-[1400px] mx-auto px-6 py-10 md:py-14 grid grid-cols-12 gap-8">
                {/* Recap column */}
                <aside className="col-span-12 lg:col-span-4">
                    <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                        ◆ Resumo do diagnóstico
                    </p>
                    <h1
                        className="font-display uppercase leading-[0.95] tracking-tight mb-8"
                        style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
                    >
                        {level === 'premium' ? (
                            <>
                                Reservamos
                                <br />
                                <span className="text-er-red">
                                    30 min
                                </span>
                                <br />
                                com um sócio.
                            </>
                        ) : (
                            <>
                                Reservamos
                                <br />
                                <span className="text-er-red">
                                    15 min
                                </span>
                                <br />
                                com o time.
                            </>
                        )}
                    </h1>

                    <dl className="space-y-4 border-t border-er-ink/15 pt-6 text-sm">
                        <RecapRow label="Lead" value={lead.name} />
                        <RecapRow label="Empresa" value={lead.company} />
                        <RecapRow
                            label="Nicho"
                            value={NICHE_LABEL[answers.niche ?? 'other']}
                        />
                        {answers.revenue && (
                            <RecapRow
                                label="Faturamento"
                                value={REVENUE_LABEL[answers.revenue]}
                            />
                        )}
                        {answers.invests && (
                            <RecapRow
                                label="Investe em ads"
                                value={INVESTS_LABEL[answers.invests]}
                            />
                        )}
                        {answers.urgency && (
                            <RecapRow
                                label="Urgência"
                                value={URGENCY_LABEL[answers.urgency]}
                            />
                        )}
                    </dl>

                    {answers.niche && (
                        <div className="mt-8 p-5 bg-white border border-er-ink/15">
                            <span className="text-[10px] tracking-[0.3em] uppercase text-er-red font-bold mb-2 block">
                                ◆ Case do seu nicho
                            </span>
                            <span className="font-display uppercase text-2xl leading-[1] tracking-tight mb-1 block">
                                {CASE_BY_NICHE[answers.niche].client}
                            </span>
                            <span className="font-display text-er-red text-lg leading-none mb-3 block">
                                {CASE_BY_NICHE[answers.niche].headline}
                            </span>
                            <p className="text-xs text-er-ink/65 leading-relaxed">
                                {CASE_BY_NICHE[answers.niche].body}
                            </p>
                        </div>
                    )}
                </aside>

                {/* Calendly embed */}
                <div className="col-span-12 lg:col-span-8">
                    <p className="text-[11px] tracking-[0.3em] uppercase text-er-ink/60 mb-3">
                        ◆ Escolha o melhor horário
                    </p>
                    <div
                        className="calendly-inline-widget bg-white border border-er-ink/15"
                        data-url={prefilledUrl}
                        style={{ minWidth: 320, height: 720 }}
                    />
                </div>
            </main>
        </div>
    );
};

const RecapRow: React.FC<{ label: string; value: string }> = ({
    label,
    value,
}) => (
    <div className="flex justify-between gap-4">
        <dt className="text-er-ink/55 text-xs tracking-wide uppercase">{label}</dt>
        <dd className="text-er-ink font-semibold text-right">{value}</dd>
    </div>
);

// Display labels — used only in the recap column.
const NICHE_LABEL: Record<string, string> = {
    ecommerce: 'E-commerce',
    local_service: 'Serviço local',
    infoproduct: 'Infoproduto',
    b2b: 'B2B / high-ticket',
    other: 'Outro',
};

const REVENUE_LABEL: Record<string, string> = {
    pre_revenue: 'Pré-receita',
    lt10k: 'Até R$ 10k/mês',
    '10to30k': 'R$ 10k a R$ 30k',
    '30to100k': 'R$ 30k a R$ 100k',
    '100to500k': 'R$ 100k a R$ 500k',
    gt500k: 'R$ 500k+/mês',
};

const INVESTS_LABEL: Record<string, string> = {
    monthly: 'Todo mês',
    sporadic: 'Esporadicamente',
    stopped: 'Parou de investir',
    never: 'Nunca investiu',
};

const URGENCY_LABEL: Record<string, string> = {
    now: 'Pra ontem',
    '30d': 'Próximos 30 dias',
    learning: 'Quer entender melhor',
    '3plus_months': '3+ meses',
};

export default Schedule;
