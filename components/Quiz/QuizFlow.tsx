import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Landing from './DiagnosticLanding';
import Question from './Question';
import InsightCard from './InsightCard';
import LeadForm from './DiagnosticLeadForm';
import Schedule from './Schedule';
import NurtureWaitlist, { WaitlistThanks } from './NurtureWaitlist';
import {
    LeadData,
    QuizAnswers,
    StepId,
    WaitlistData,
    QuestionSpec,
} from './types';
import {
    QUESTION_BY_STEP,
    nicheSpecificQuestion,
} from './constants';
import {
    nextStep,
    progressIndex,
    qualify,
    totalProgressSteps,
} from './branching';
import { submitLead, submitWaitlist } from './services';

// State machine for the new diagnostic-call funnel. Each `step` is one
// screen; transitions are driven by `branching.ts` so the routing logic
// stays in one pure-function place that's easy to test.
const QuizFlow: React.FC = () => {
    const [step, setStep] = useState<StepId>('landing');
    const [answers, setAnswers] = useState<QuizAnswers>({});
    const [lead, setLead] = useState<LeadData | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Scroll-to-top on every step change — without this the question
    // body can stay scrolled past the headline after a long option list.
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, [step]);

    // GTM event per step view — keeps the funnel chart in GA usable.
    useEffect(() => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'quiz_step_view',
            step_id: step,
            quiz_name: 'diagnostico_v2',
        });
    }, [step]);

    // ---- Step transitions ----

    // Kept for the insight + form steps that don't go through handleAnswer.
    const goNext = useCallback(
        (current: StepId, withAnswers: QuizAnswers) => {
            setStep(nextStep(current, withAnswers));
        },
        [],
    );

    const handleAnswer = useCallback(
        <F extends keyof QuizAnswers>(
            field: F,
            value: NonNullable<QuizAnswers[F]>,
        ) => {
            // Compute the next state outside the updater so React StrictMode's
            // dev-only double-invoke doesn't fire the step transition twice.
            const updated = { ...answers, [field]: value };
            setAnswers(updated);
            setStep(nextStep(step, updated));
        },
        [step, answers],
    );

    const handleLeadSubmit = useCallback(
        async (data: LeadData) => {
            setIsSubmitting(true);
            setLead(data);
            const level = qualify(answers);
            try {
                await submitLead(data, answers, level);
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    event: 'lead_qualified',
                    qualification_level: level,
                    quiz_name: 'diagnostico_v2',
                });
            } catch (err) {
                console.error('Lead submission failed', err);
            } finally {
                setIsSubmitting(false);
                goNext('lead_form', answers);
            }
        },
        [answers, goNext],
    );

    const handleWaitlistSubmit = useCallback(
        async (data: WaitlistData) => {
            setIsSubmitting(true);
            try {
                await submitWaitlist(data, answers);
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    event: 'waitlist_join',
                    quiz_name: 'diagnostico_v2',
                });
            } catch (err) {
                console.error('Waitlist submission failed', err);
            } finally {
                setIsSubmitting(false);
                setStep('waitlist_thanks');
            }
        },
        [answers],
    );

    // ---- Progress bar math ----

    const progress = useMemo(() => {
        const total = totalProgressSteps(answers);
        const current = progressIndex(step, answers);
        return { current, total };
    }, [step, answers]);

    // ---- Render the active step ----

    if (step === 'landing') {
        return <Landing onStart={() => setStep('q_niche')} />;
    }

    if (step === 'lead_form') {
        return (
            <LeadForm
                onSubmit={handleLeadSubmit}
                isSubmitting={isSubmitting}
            />
        );
    }

    if (step === 'schedule_standard' || step === 'schedule_premium') {
        if (!lead) {
            // Defensive: shouldn't happen because lead_form always runs
            // first. If it does, fall back to the form.
            return (
                <LeadForm
                    onSubmit={handleLeadSubmit}
                    isSubmitting={isSubmitting}
                />
            );
        }
        return (
            <Schedule
                level={step === 'schedule_premium' ? 'premium' : 'qualified'}
                lead={lead}
                answers={answers}
            />
        );
    }

    if (step === 'nurture_waitlist') {
        return (
            <NurtureWaitlist
                onSubmit={handleWaitlistSubmit}
                isSubmitting={isSubmitting}
            />
        );
    }

    if (step === 'waitlist_thanks') {
        return <WaitlistThanks />;
    }

    if (step === 'insight_financial') {
        return (
            <InsightCard
                variant="financial"
                answers={answers}
                onContinue={() => goNext('insight_financial', answers)}
                progress={progress}
            />
        );
    }

    if (step === 'insight_case') {
        return (
            <InsightCard
                variant="case"
                answers={answers}
                onContinue={() => goNext('insight_case', answers)}
                progress={progress}
            />
        );
    }

    // Question step — resolve the spec, including the niche-specific Q4.
    const spec: QuestionSpec | null =
        step === 'q_niche_specific'
            ? nicheSpecificQuestion(answers.niche)
            : QUESTION_BY_STEP[step] ?? null;

    if (!spec) {
        // Unknown step — fail-safe: send the user back to landing.
        console.warn('Unknown step', step);
        return <Landing onStart={() => setStep('q_niche')} />;
    }

    return (
        <Question
            spec={spec}
            progress={progress}
            onAnswer={(value) =>
                handleAnswer(spec.field, value as never)
            }
        />
    );
};

export default QuizFlow;
