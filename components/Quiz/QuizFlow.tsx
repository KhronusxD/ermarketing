import React, { useState, useMemo, useEffect } from 'react';
import Landing from './Landing';
import Quiz from './Quiz';
import LoadingScreen from './LoadingScreen';
import LeadForm from './LeadForm';
import Results from './Results';
import ProgressBar from './ProgressBar';
import { QUESTIONS } from './constants';
import { AppStep, UserAnswers, QuestionOption, LeadData, DiagnosisResult } from './types';

const QuizFlow: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.LANDING);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<UserAnswers>({});
    const [leadData, setLeadData] = useState<LeadData | null>(null);

    // -- Tracking --
    useEffect(() => {
        if (currentStep === AppStep.QUIZ) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'quiz_step_view',
                'step_number': currentQuestionIndex + 1,
                'step_name': QUESTIONS[currentQuestionIndex]?.title || 'Unknown Step',
                'quiz_name': 'general'
            });
        }
    }, [currentStep, currentQuestionIndex]);

    // -- Handlers --

    const startQuiz = () => {
        setCurrentStep(AppStep.QUIZ);
    };

    const handleQuizAnswer = (option: QuestionOption) => {
        // Record answer
        const currentQ = QUESTIONS[currentQuestionIndex];
        setAnswers(prev => ({ ...prev, [currentQ.id]: option }));

        // Delay for animation then move next
        setTimeout(() => {
            if (currentQuestionIndex < QUESTIONS.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
            } else {
                setCurrentStep(AppStep.LOADING);
            }
        }, 400);
    };

    const handleLoadingComplete = () => {
        setCurrentStep(AppStep.GATE);
    };

    const handleLeadSubmit = (data: LeadData) => {
        setLeadData(data);
        // Here you would typically send data to backend/webhook
        console.log("Lead captured:", data, "Answers:", answers);
        setCurrentStep(AppStep.RESULTS);
    };

    // -- Logic for Results Generation --
    const result: DiagnosisResult = useMemo(() => {
        // 1. Calculate base score from answers
        let rawScore = 50; // Base score
        Object.values(answers).forEach((ans) => {
            const option = ans as QuestionOption;
            if (option.scoreImpact) rawScore += option.scoreImpact;
        });
        // Cap score
        const finalScore = Math.min(Math.max(rawScore, 15), 95);

        // 2. Determine Verdict based on "Pain" question (Question ID 2)
        const painAnswer = answers[2]?.value;
        let verdictTitle = "Gargalo Desconhecido";
        let verdictDesc = "Sua operação possui falhas, mas precisamos de uma análise manual mais profunda.";
        let category = "Geral";

        switch (painAnswer) {
            case 'trafego':
                verdictTitle = "A Vitrine Invisível";
                verdictDesc = "Seu produto é bom, mas ninguém o vê. Você está operando no escuro. Sem tráfego qualificado e constante, seu negócio depende de sorte ou indicação, o que impede a escala previsível.";
                category = "Tráfego Pago";
                break;
            case 'conversao':
                verdictTitle = "O Balde Furado";
                verdictDesc = "O seu gargalo é clássico. Você está pagando por tráfego, as pessoas chegam, mas sua página não convence. Estima-se que você perca 40% da verba aqui por falta de copywriting persuasivo e design focado em conversão.";
                category = "Conversão (CRO)";
                break;
            case 'publico':
                verdictTitle = "A Miragem de Vendas";
                verdictDesc = "Você atrai volume, mas de curiosos. Isso infla métricas de vaidade e destrói a moral do time comercial. O erro está na segmentação da campanha e na comunicação que não filtra os desqualificados antes do clique.";
                category = "Qualificação de Leads";
                break;
            case 'estrategia':
                verdictTitle = "O Navio à Deriva";
                verdictDesc = "A sensação de estagnação vem da falta de um funil claro. Você provavelmente faz 'ações aleatórias de marketing' em vez de seguir um processo validado de aquisição.";
                category = "Estratégia Digital";
                break;
        }

        return {
            score: finalScore,
            verdictTitle,
            verdictDescription: verdictDesc,
            category
        };
    }, [answers]);

    // -- Render --

    return (
        <main className="font-sans text-gray-100 bg-[#050505] min-h-screen">

            {currentStep === AppStep.QUIZ && (
                <ProgressBar
                    currentStep={currentQuestionIndex + 1}
                    totalSteps={QUESTIONS.length}
                />
            )}

            {currentStep === AppStep.LANDING && (
                <Landing onStart={startQuiz} />
            )}

            {currentStep === AppStep.QUIZ && (
                <Quiz
                    question={QUESTIONS[currentQuestionIndex]}
                    onAnswer={handleQuizAnswer}
                    currentStepIndex={currentQuestionIndex + 1}
                />
            )}

            {currentStep === AppStep.LOADING && (
                <LoadingScreen onComplete={handleLoadingComplete} />
            )}

            {currentStep === AppStep.GATE && (
                <LeadForm onSubmit={handleLeadSubmit} />
            )}

            {currentStep === AppStep.RESULTS && leadData && (
                <Results result={result} leadData={leadData} />
            )}

        </main>
    );
};

export default QuizFlow;
