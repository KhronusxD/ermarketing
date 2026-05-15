// Quiz domain types. The state machine in QuizFlow drives steps by ID,
// each ID is one of these screen kinds. Questions branch by previous
// answers via `branching.ts`.

export type StepId =
    | 'landing'
    | 'q_niche'
    | 'q_tenure'
    | 'q_revenue'
    | 'q_niche_specific' // branches by niche (Q4)
    | 'insight_financial'
    | 'q_invests'
    | 'q_ad_budget'
    | 'q_knows_cac'
    | 'insight_case'
    | 'q_sales_capacity'
    | 'q_urgency'
    | 'price_gate'
    | 'lead_form'
    | 'schedule_standard'
    | 'schedule_premium'
    | 'nurture_waitlist'
    | 'waitlist_thanks';

export type Niche =
    | 'ecommerce'
    | 'local_service'
    | 'infoproduct'
    | 'b2b'
    | 'other';

export type Tenure = 'lt1' | '1to3' | 'gt3';

// Revenue buckets — also used for premium tier detection.
export type Revenue =
    | 'pre_revenue'
    | 'lt10k'
    | '10to30k'
    | '30to100k'
    | '100to500k'
    | 'gt500k';

export type InvestsStatus =
    | 'monthly'
    | 'sporadic'
    | 'stopped'
    | 'never';

export type AdBudget = 'lt1k' | '1to5k' | '5to20k' | 'gt20k';

export type KnowsCAC = 'weekly' | 'estimate' | 'no_idea';

export type SalesCapacity = 'hungry' | 'will_hire' | 'at_limit' | 'unsure';

export type Urgency = 'now' | '30d' | 'learning' | '3plus_months';

// Lifted into a generic value bag so QuizFlow can store strongly-typed
// answers without coupling each setter to its field. Each key is the
// `field` of the answered question.
export interface QuizAnswers {
    niche?: Niche;
    tenure?: Tenure;
    revenue?: Revenue;
    // niche-specific (Q4) — only one of these will be filled, depending
    // on which niche branch was taken.
    ecommerce_conversion?: 'no_idea' | 'lt1' | '1to2' | 'gt2';
    leads_per_week?: '0to5' | '6to15' | '15to30' | 'gt30';
    big_launch?: 'yes' | 'no' | 'never';
    ticket_size?: 'lt1k' | '1to5k' | '5to30k' | 'gt30k';
    // chapter 2
    invests?: InvestsStatus;
    ad_budget?: AdBudget;
    knows_cac?: KnowsCAC;
    // chapter 3
    sales_capacity?: SalesCapacity;
    urgency?: Urgency;
    // gate
    price_confirmed?: 'yes' | 'no';
}

export type QualificationLevel = 'qualified' | 'premium' | 'nurture';

// What the LeadForm produces. Email + WhatsApp are required for booking,
// instagram is optional context.
export interface LeadData {
    name: string;
    company: string;
    whatsapp: string;
    email: string;
    instagram?: string;
}

// Captured separately on the NurtureWaitlist — same shape minus company.
export interface WaitlistData {
    name: string;
    email: string;
    whatsapp: string;
}

// Strongly-typed option for the new branched quiz. Branch logic lives
// in `branching.ts`.
export interface QuizOption<V extends string = string> {
    id: string;
    label: string;
    value: V;
    // Optional micro-copy that shows under the option label.
    hint?: string;
    // Premium signal — flags an answer that biases the qualification
    // toward the premium track.
    premiumSignal?: boolean;
}

export interface QuestionSpec<F extends keyof QuizAnswers = keyof QuizAnswers> {
    id: StepId;
    field: F;
    chapter: 1 | 2 | 3;
    eyebrow: string;
    headline: string;
    sub?: string;
    options: ReadonlyArray<QuizOption<NonNullable<QuizAnswers[F]> & string>>;
}

// ----------- Legacy types -----------
// Kept for /restaurante and /restaurante-b quizzes that still use the
// older linear-question flow. Don't extend these — new code should use
// the QuestionSpec / QuizAnswers pair above.

export enum AppStep {
    LANDING = 'LANDING',
    QUIZ = 'QUIZ',
    LOADING = 'LOADING',
    GATE = 'GATE',
    RESULTS = 'RESULTS',
}

export interface QuestionOption {
    id: string;
    label: string;
    value: string;
    scoreImpact?: number;
    tags?: string[];
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

export interface DiagnosisResult {
    score: number;
    verdictTitle: string;
    verdictDescription: string;
    category: string;
}
