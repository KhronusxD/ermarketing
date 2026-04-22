import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { UnderwaterBackdrop, BioluminescentOrbs, OCEAN } from '../shared';
import { QuizIntro } from './QuizIntro';
import { QuizStep } from './QuizStep';
import { QuizForm } from './QuizForm';
import { QuizLoading } from './QuizLoading';
import { QuizResult, type QuizFormFields } from './QuizResult';
import { QUIZ_STEPS } from './quizData';
import { buildLeadPayload, sendLeadToSheet } from './leadSink';
import { trackCustom, trackStandard } from './metaPixel';

// Phases: 0 = intro, 1..5 = quiz steps, 6 = form, 7 = loading, 8 = result
type Phase = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export const DiagnosticoFlow: React.FC = () => {
    const navigate = useNavigate();
    const [phase, setPhase] = useState<Phase>(0);
    const [answers, setAnswers] = useState<(string | undefined)[]>(Array(QUIZ_STEPS.length).fill(undefined));
    const [formData, setFormData] = useState<QuizFormFields | null>(null);

    useEffect(() => {
        document.title = 'Diagnóstico · ER Marketing · Plano Essencial';
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (phase === 0) {
            trackStandard('ViewContent', {
                content_name: 'Diagnostico Flowdesk - Intro',
                content_category: 'flowdesk',
            });
        } else if (phase === 6) {
            trackStandard('InitiateCheckout', {
                content_name: 'Diagnostico Flowdesk - Form',
                content_category: 'flowdesk',
            });
        }
    }, [phase]);

    const advance = () => setPhase((p) => Math.min(8, (p + 1) as Phase) as Phase);
    const retreat = () => setPhase((p) => Math.max(0, (p - 1) as Phase) as Phase);

    const handleSelect = (stepIdx: number) => (option: string) => {
        setAnswers((prev) => {
            const next = [...prev];
            next[stepIdx] = option;
            return next;
        });
        trackCustom('FlowdeskStepAnswered', {
            step: stepIdx + 1,
            step_label: QUIZ_STEPS[stepIdx]?.label || '',
            answer: option,
        });
        setTimeout(advance, 260);
    };

    return (
        <div
            className="min-h-screen text-[#E8F4FF] font-sans selection:bg-[#4DD5FF] selection:text-[#031224] relative overflow-hidden flex flex-col"
            style={{ backgroundColor: OCEAN.bg }}
        >
            <UnderwaterBackdrop variant="mid" />
            <BioluminescentOrbs count={5} />

            {/* Slim header — back arrow + centered badge */}
            <header className="relative z-20 py-5 border-b border-[#4DD5FF]/10 backdrop-blur-md bg-[#050510]/60">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/flowdesk')}
                        className="inline-flex items-center gap-2 text-xs text-[#6B86A3] hover:text-[#A6DEFF] transition-colors tracking-wider uppercase"
                    >
                        <ArrowLeft size={14} />
                        Voltar ao site
                    </button>
                    <div className="text-[10px] tracking-[0.4em] uppercase text-[#A6DEFF] font-semibold">
                        ER Marketing
                    </div>
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
                        {phase === 7 && <QuizLoading key="loading" onDone={() => setPhase(8)} />}
                        {phase === 8 && formData && (
                            <QuizResult key="result" answers={answers} formData={formData} />
                        )}
                    </AnimatePresence>
                </div>
            </main>

            <footer className="relative z-10 py-6 border-t border-[#4DD5FF]/10">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <span className="text-[11px] text-[#6B86A3] tracking-wider">
                        &copy; {new Date().getFullYear()} ER Marketing &middot; 4 novos clientes por mês
                    </span>
                </div>
            </footer>
        </div>
    );
};
