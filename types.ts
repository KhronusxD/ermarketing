export enum AppStep {
  LANDING = 'LANDING',
  QUIZ = 'QUIZ',
  LOADING = 'LOADING',
  GATE = 'GATE',
  RESULTS = 'RESULTS'
}

export type QuestionOption = {
  value: string;
  label: string;
  scoreImpact?: number;
  icon?: any;
};

export type Question = {
  id: number;
  title: string;
  options: QuestionOption[];
};

export type UserAnswers = Record<number, QuestionOption>;

export interface LeadData {
  name: string;
  phone: string;
  company: string;
  role: string;
  revenue: string;
  instagram?: string;
}

export interface DiagnosisResult {
  score: number;
  verdictTitle: string;
  verdictDescription: string;
  category: string;
}

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export interface SectionProps {
  onAuditClick: () => void;
}