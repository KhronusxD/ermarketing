export enum AppStep {
    LANDING = 'LANDING',
    QUIZ = 'QUIZ',
    LOADING = 'LOADING',
    GATE = 'GATE',
    RESULTS = 'RESULTS'
}

export interface QuestionOption {
    id: string;
    label: string;
    value: string;
    scoreImpact?: number; // Internal scoring mechanism
    tags?: string[]; // For CRM tagging
}

export interface Question {
    id: number;
    category: string;
    text: string;
    options: QuestionOption[];
}

export interface UserAnswers {
    [questionId: number]: QuestionOption;
}

export interface LeadData {
    name: string;
    email: string;
    whatsapp: string;
    website: string;
}

export interface DiagnosisResult {
    score: number;
    verdictTitle: string;
    verdictDescription: string;
    category: string;
}
