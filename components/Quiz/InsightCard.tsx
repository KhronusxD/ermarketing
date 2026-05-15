import React from 'react';
import { QuizAnswers } from './types';
import { financialInsight } from './branching';
import { CASE_BY_NICHE } from './constants';

interface InsightCardProps {
    variant: 'financial' | 'case';
    answers: QuizAnswers;
    onContinue: () => void;
    progress: { current: number; total: number };
}

// Mid-funnel breathing room screens. Two variants:
//   - financial: dynamic loss estimate based on revenue + niche-Q4.
//                Falls back to a softer qualitative pitch when the lead
//                hasn't given enough signal yet (eg. pre-revenue).
//   - case:     pulls one real client case that matches the niche.
const InsightCard: React.FC<InsightCardProps> = ({
    variant,
    answers,
    onContinue,
    progress,
}) => {
    return (
        <div className="min-h-screen bg-er-paper text-er-ink flex flex-col">
            <div className="border-b border-er-ink/10">
                <div className="max-w-[1100px] mx-auto px-6 py-5 flex items-center justify-between">
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
                    <span className="text-[10px] tracking-[0.3em] uppercase text-er-ink/60">
                        Passo {progress.current} de {progress.total}
                    </span>
                </div>
                <div className="h-[3px] bg-er-ink/5 relative">
                    <div
                        className="absolute inset-y-0 left-0 bg-er-red transition-all duration-500"
                        style={{
                            width: `${(progress.current / progress.total) * 100}%`,
                        }}
                    />
                </div>
            </div>

            <main className="flex-1 flex items-center">
                <div className="max-w-[1100px] mx-auto w-full px-6 py-12 md:py-20">
                    {variant === 'financial' ? (
                        <FinancialInsight answers={answers} />
                    ) : (
                        <CaseInsight answers={answers} />
                    )}

                    <button
                        type="button"
                        onClick={onContinue}
                        className="group mt-12 md:mt-16 inline-flex items-center gap-3 bg-er-ink text-er-paper hover:bg-er-red transition-colors font-bold tracking-[0.18em] uppercase text-sm md:text-base px-7 py-4 md:px-9 md:py-5"
                    >
                        {variant === 'financial'
                            ? 'Continuar diagnóstico'
                            : 'Quero esse tipo de resultado'}
                        <span className="transition-transform group-hover:translate-x-1">
                            →
                        </span>
                    </button>
                </div>
            </main>
        </div>
    );
};

const FinancialInsight: React.FC<{ answers: QuizAnswers }> = ({ answers }) => {
    const insight = financialInsight(answers);

    // Fallback when we don't have enough signal — soft qualitative pitch
    // that still primes the lead for the next chapter.
    if (!insight) {
        return (
            <>
                <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                    ◆ Análise parcial
                </p>
                <h2
                    className="font-display uppercase leading-[0.95] tracking-tight mb-8 max-w-4xl"
                    style={{ fontSize: 'clamp(36px, 6vw, 88px)' }}
                >
                    Você está na fase
                    <br />
                    em que <span className="text-er-red">tudo é decisão</span>.
                </h2>
                <p className="text-base md:text-lg text-er-ink/70 leading-relaxed max-w-2xl">
                    Negócios em fase de validação têm um perigo invisível: cada
                    real gasto fora do funil certo trava o caixa do mês
                    seguinte. Vamos olhar isso na call.
                </p>
            </>
        );
    }

    return (
        <>
            <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                ◆ Análise parcial · você está perdendo dinheiro
            </p>
            <h2
                className="font-display uppercase leading-[0.9] tracking-tight mb-8 max-w-4xl"
                style={{ fontSize: 'clamp(48px, 8vw, 128px)' }}
            >
                <span className="text-er-red">
                    {fmtBRL(insight.annualLeakLow)}
                </span>
                <br />a {fmtBRL(insight.annualLeakHigh)}
                <br />
                <span className="text-er-ink/60">por ano.</span>
            </h2>
            <p className="text-base md:text-lg text-er-ink/75 leading-relaxed max-w-2xl">
                {insight.headline}
            </p>
            <p className="mt-6 text-sm text-er-ink/50 italic max-w-2xl">
                Estimativa baseada em benchmarks de operações que já passaram
                pela nossa metodologia. Refinamos esse número com você na call.
            </p>
        </>
    );
};

const CaseInsight: React.FC<{ answers: QuizAnswers }> = ({ answers }) => {
    const match = CASE_BY_NICHE[answers.niche ?? 'other'];
    return (
        <>
            <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                ◆ Resultado real · {match.client}
            </p>
            <h2
                className="font-display uppercase leading-[0.9] tracking-tight mb-8 max-w-4xl"
                style={{ fontSize: 'clamp(40px, 7vw, 112px)' }}
            >
                {match.headline}
            </h2>
            <p className="text-base md:text-lg text-er-ink/75 leading-relaxed max-w-2xl">
                {match.body}
            </p>
            <p className="mt-6 text-sm text-er-ink/50 max-w-2xl">
                É o tipo de resultado que entregamos pra empresas no mesmo perfil
                do seu. Vamos detalhar como aplicar isso ao seu caso na reunião.
            </p>
        </>
    );
};

const fmtBRL = (n: number) =>
    n.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 0,
    });

export default InsightCard;
