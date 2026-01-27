import React, { useState, useMemo, useEffect } from 'react';
import Landing from '../Quiz/Landing';
import Quiz from '../Quiz/Quiz';
import LoadingScreen from '../Quiz/LoadingScreen';
import LeadForm from '../Quiz/LeadForm';
import Results from '../Quiz/Results';
import ProgressBar from '../Quiz/ProgressBar';
import { RESTAURANT_QUESTIONS } from './constants';
import { AppStep, UserAnswers, QuestionOption, LeadData, DiagnosisResult } from '../Quiz/types';

const RestaurantQuizFlow: React.FC = () => {
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
                'step_name': RESTAURANT_QUESTIONS[currentQuestionIndex]?.title || 'Unknown Step',
                'quiz_name': 'restaurant'
            });
        }
    }, [currentStep, currentQuestionIndex]);

    // -- Handlers --

    const startQuiz = () => {
        setCurrentStep(AppStep.QUIZ);
    };

    const handleQuizAnswer = (option: QuestionOption) => {
        // Record answer
        const currentQ = RESTAURANT_QUESTIONS[currentQuestionIndex];
        setAnswers(prev => ({ ...prev, [currentQ.id]: option }));

        // Delay for animation then move next
        setTimeout(() => {
            if (currentQuestionIndex < RESTAURANT_QUESTIONS.length - 1) {
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
        console.log("Restaurant Lead captured:", data, "Answers:", answers);
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
        const finalScore = Math.min(Math.max(rawScore, 10), 98);

        // 2. Determine Verdict based on "Pain" question (Question ID 2 is the pain question in RESTAURANT_QUESTIONS)
        const painAnswer = answers[2]?.value;
        let verdictTitle = "Gargalo Operacional";
        let verdictDesc = "Seu restaurante tem potencial, mas falhas operacionais estão drenando seu lucro.";
        let category = "Gestão";

        switch (painAnswer) {
            case 'dependencia_ifood':
                verdictTitle = "Refém do Aplicativo";
                verdictDesc = "Você trabalha para o iFood, não para você. As taxas comem sua margem e você não tem os dados dos seus clientes. A solução é criar um canal próprio de vendas forte.";
                category = "Canal de Vendas";
                break;
            case 'movimento_fraco':
                verdictTitle = "Restaurante Fantasma";
                verdictDesc = "Sua comida é boa, o ambiente é ótimo, mas as mesas estão vazias. Você sofre da 'Síndrome do Segredo': ninguém sabe que você existe ou por que deveria ir aí hoje.";
                category = "Tráfego Local";
                break;
            case 'margem_baixa':
                verdictTitle = "Faturamento de Vaidade";
                verdictDesc = "Você vende muito, a cozinha corre, mas no final do mês a conta não fecha. Seu CMV provavelmente está descontrolado ou sua precificação ignora custos ocultos.";
                category = "Financeiro / CMV";
                break;
            case 'recorrencia':
                verdictTitle = "Balde Furado";
                verdictDesc = "Você gasta para trazer o cliente uma vez, ele come e nunca mais volta. Sem LTV (Lifetime Value), seu CAC fica insustentável. Falta estratégia de fidelização.";
                category = "Retenção / CRM";
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
                    totalSteps={RESTAURANT_QUESTIONS.length}
                />
            )}

            {currentStep === AppStep.LANDING && (
                <Landing onStart={startQuiz} />
            )}

            {currentStep === AppStep.QUIZ && (
                <Quiz
                    question={RESTAURANT_QUESTIONS[currentQuestionIndex]}
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

export default RestaurantQuizFlow;
