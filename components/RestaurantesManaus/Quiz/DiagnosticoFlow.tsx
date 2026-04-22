import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { GOLD_FILTER } from '../shared';
import { QuizIntro } from './QuizIntro';
import { QuizStep } from './QuizStep';
import { QuizForm } from './QuizForm';
import { QuizLoading } from './QuizLoading';
import { QuizResult, type QuizFormFields } from './QuizResult';
import { QUIZ_STEPS } from './quizData';
import { buildLeadPayload, sendLeadToSheet } from './leadSink';

// Phases: 0 = intro, 1..5 = quiz steps, 6 = form, 7 = loading, 8 = result
type Phase = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export const DiagnosticoFlow: React.FC = () => {
    const navigate = useNavigate();
    const [phase, setPhase] = useState<Phase>(0);
    const [answers, setAnswers] = useState<(string | undefined)[]>(Array(QUIZ_STEPS.length).fill(undefined));
    const [formData, setFormData] = useState<QuizFormFields | null>(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [phase]);

    const advance = () => setPhase((p) => Math.min(8, (p + 1) as Phase) as Phase);
    const retreat = () => setPhase((p) => Math.max(0, (p - 1) as Phase) as Phase);

    const handleSelect = (stepIdx: number) => (option: string) => {
        setAnswers((prev) => {
            const next = [...prev];
            next[stepIdx] = option;
            return next;
        });
        // Slight delay so the user sees the selection animate before advancing
        setTimeout(advance, 260);
    };

    return (
        <div
            className="min-h-screen text-[#F5F1E8] font-sans selection:bg-[#D4A574] selection:text-[#111112] relative overflow-hidden flex flex-col"
            style={{ backgroundColor: '#111112' }}
        >
            {/* Global ambient backdrop (same as the main LP) */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div
                    className="absolute inset-0 opacity-60"
                    style={{
                        backgroundImage:
                            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(212,165,116,0.10), transparent), radial-gradient(ellipse 80% 50% at 50% 120%, rgba(212,165,116,0.08), transparent)',
                    }}
                ></div>
                <div
                    className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    }}
                ></div>
            </div>

            {/* Slim header — gold logo + exit */}
            <header className="relative z-20 py-5 border-b border-[#D4A574]/10 backdrop-blur-md bg-[#111112]/60">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/restaurantes-manaus')}
                        className="inline-flex items-center gap-2 text-xs text-[#A8A196] hover:text-[#E8C088] transition-colors tracking-wider uppercase"
                    >
                        <ArrowLeft size={14} />
                        Voltar ao site
                    </button>
                    <img
                        src="/assets/white-logo.png"
                        alt="ER Performance Marketing"
                        className="h-7 w-auto"
                        style={{ filter: GOLD_FILTER }}
                    />
                    <div className="w-[92px]"></div>
                </div>
            </header>

            {/* Content */}
            <main className="relative z-10 flex-1 flex items-center py-14 md:py-20">
                <div className="w-full">
                    <AnimatePresence mode="wait">
                        {phase === 0 && <QuizIntro key="intro" onStart={advance} />}
                        {phase >= 1 && phase <= 5 && (
                            <QuizStep
                                key={`step-${phase}`}
                                data={QUIZ_STEPS[phase - 1]}
                                total={QUIZ_STEPS.length}
                                selected={answers[phase - 1]}
                                onSelect={handleSelect(phase - 1)}
                                onBack={retreat}
                                canGoBack={phase > 1}
                            />
                        )}
                        {phase === 6 && (
                            <QuizForm
                                key="form"
                                answers={answers}
                                onComplete={(data) => {
                                    setFormData(data);
                                    sendLeadToSheet(buildLeadPayload(data, answers));
                                    setPhase(7);
                                }}
                            />
                        )}
                        {phase === 7 && (
                            <QuizLoading key="loading" onDone={() => setPhase(8)} />
                        )}
                        {phase === 8 && formData && (
                            <QuizResult key="result" answers={answers} formData={formData} />
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* Footer — minimal */}
            <footer className="relative z-10 py-6 border-t border-[#D4A574]/10">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <span className="text-[11px] text-[#A8A196] tracking-wider">
                        &copy; {new Date().getFullYear()} ER Marketing &middot; Especialistas em restaurantes em Manaus
                    </span>
                </div>
            </footer>
        </div>
    );
};
