import React from 'react';
import { QuestionSpec, QuizAnswers, QuizOption } from './types';

interface QuestionProps<F extends keyof QuizAnswers> {
    spec: QuestionSpec<F>;
    onAnswer: (value: NonNullable<QuizAnswers[F]>) => void;
    progress: { current: number; total: number };
    onBack?: () => void;
}

// Single-question screen, light editorial. Same brutalist language as
// the LP — display headlines, hairline option boxes, red active hover.
export function Question<F extends keyof QuizAnswers>({
    spec,
    onAnswer,
    progress,
    onBack,
}: QuestionProps<F>) {
    return (
        <div className="min-h-screen bg-er-paper text-er-ink flex flex-col">
            {/* Top bar with progress + back */}
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
                    <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                        ◆ {spec.eyebrow}
                    </p>
                    <h2
                        className="font-display uppercase leading-[0.95] tracking-tight mb-4 max-w-3xl"
                        style={{ fontSize: 'clamp(32px, 5vw, 72px)' }}
                    >
                        {spec.headline}
                    </h2>
                    {spec.sub && (
                        <p className="text-base md:text-lg text-er-ink/65 leading-relaxed max-w-2xl mb-10">
                            {spec.sub}
                        </p>
                    )}

                    <ul className="space-y-3 max-w-3xl mt-10">
                        {spec.options.map((option, i) => (
                            <li key={option.id}>
                                <OptionButton
                                    option={option}
                                    index={i}
                                    onClick={() =>
                                        onAnswer(
                                            option.value as NonNullable<QuizAnswers[F]>,
                                        )
                                    }
                                />
                            </li>
                        ))}
                    </ul>

                    {onBack && (
                        <button
                            type="button"
                            onClick={onBack}
                            className="mt-10 text-xs tracking-[0.2em] uppercase text-er-ink/50 hover:text-er-ink transition-colors"
                        >
                            ← Voltar
                        </button>
                    )}
                </div>
            </main>
        </div>
    );
}

interface OptionButtonProps<V extends string> {
    option: QuizOption<V>;
    index: number;
    onClick: () => void;
}

function OptionButton<V extends string>({
    option,
    index,
    onClick,
}: OptionButtonProps<V>) {
    const letter = String.fromCharCode(65 + index); // A, B, C, …
    return (
        <button
            type="button"
            onClick={onClick}
            className="group w-full text-left flex items-center gap-5 md:gap-7 border border-er-ink/20 hover:border-er-red hover:bg-white transition-colors p-5 md:p-6"
        >
            <span className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 border border-er-ink/30 flex items-center justify-center font-display text-er-ink group-hover:bg-er-red group-hover:border-er-red group-hover:text-white transition-colors text-base md:text-lg">
                {letter}
            </span>
            <span className="flex-1">
                <span className="block font-bold text-base md:text-lg leading-snug">
                    {option.label}
                </span>
                {option.hint && (
                    <span className="block text-xs md:text-sm text-er-ink/55 mt-1">
                        {option.hint}
                    </span>
                )}
            </span>
            <span className="hidden md:inline text-er-ink/30 group-hover:text-er-red transition-colors text-lg">
                →
            </span>
        </button>
    );
}

export default Question;
