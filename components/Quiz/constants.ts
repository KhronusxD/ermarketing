import {
    Niche,
    QuestionSpec,
    StepId,
    QuizAnswers,
} from './types';

// Legacy export — still referenced by the old Quiz/Landing.tsx that
// the /restaurante route reuses. Don't remove without porting Restaurant
// to its own landing first.
export const TOOL_LOGOS = [
    'Google Ads',
    'Meta Ads',
    'HubSpot',
    'Analytics',
    'Salesforce',
];

// Calendly placeholders. Swap with real URLs before publishing.
// Two separate event types: 15-min discovery (qualified) and a longer
// 30-min strategic session (premium).
export const CALENDLY_STANDARD =
    'https://calendly.com/SEU_USUARIO/diagnostico-15min';
export const CALENDLY_PREMIUM =
    'https://calendly.com/SEU_USUARIO/diagnostico-premium-30min';

// ----------- Question deck -----------
// One spec per StepId. Order matters for the linear path; branching is
// resolved separately in branching.ts.

const Q_NICHE: QuestionSpec<'niche'> = {
    id: 'q_niche',
    field: 'niche',
    chapter: 1,
    eyebrow: 'Cap. 1 · Contexto',
    headline: 'Que tipo de negócio você toca?',
    sub: 'Primeiro nos ajude a calibrar o diagnóstico pro seu nicho.',
    options: [
        { id: 'ecom', label: 'E-commerce / loja online', value: 'ecommerce' },
        {
            id: 'local',
            label: 'Serviço local / clínica',
            value: 'local_service',
        },
        {
            id: 'info',
            label: 'Infoproduto ou educação online',
            value: 'infoproduct',
        },
        {
            id: 'b2b',
            label: 'B2B / serviços high-ticket',
            value: 'b2b',
        },
        { id: 'other', label: 'Outro modelo', value: 'other' },
    ],
};

const Q_TENURE: QuestionSpec<'tenure'> = {
    id: 'q_tenure',
    field: 'tenure',
    chapter: 1,
    eyebrow: 'Cap. 1 · Contexto',
    headline: 'Há quanto tempo o seu negócio está no ar?',
    options: [
        { id: 'lt1', label: 'Menos de 1 ano', value: 'lt1' },
        { id: '1to3', label: 'Entre 1 e 3 anos', value: '1to3' },
        { id: 'gt3', label: 'Mais de 3 anos', value: 'gt3' },
    ],
};

const Q_REVENUE: QuestionSpec<'revenue'> = {
    id: 'q_revenue',
    field: 'revenue',
    chapter: 1,
    eyebrow: 'Cap. 1 · Contexto',
    headline: 'Quanto o seu negócio fatura por mês hoje?',
    sub: 'Resposta usada só pra calibrar o tipo de plano que faz sentido. Confidencial.',
    options: [
        {
            id: 'pre',
            label: 'Ainda não fatura · fase de validação',
            value: 'pre_revenue',
        },
        { id: 'lt10', label: 'Até R$ 10 mil / mês', value: 'lt10k' },
        { id: '10to30', label: 'R$ 10 mil a R$ 30 mil', value: '10to30k' },
        { id: '30to100', label: 'R$ 30 mil a R$ 100 mil', value: '30to100k' },
        {
            id: '100to500',
            label: 'R$ 100 mil a R$ 500 mil',
            value: '100to500k',
        },
        {
            id: 'gt500',
            label: 'Acima de R$ 500 mil / mês',
            value: 'gt500k',
            premiumSignal: true,
        },
    ],
};

// ----------- Niche-specific Q4 — one per branch -----------

const Q_ECOM_CONVERSION: QuestionSpec<'ecommerce_conversion'> = {
    id: 'q_niche_specific',
    field: 'ecommerce_conversion',
    chapter: 1,
    eyebrow: 'Cap. 1 · Específico do nicho',
    headline: 'Qual a taxa de conversão atual da sua loja?',
    sub: 'Visitantes que viram pedido. Não sabe? Tudo bem — a maioria não sabe e a gente descobre na call.',
    options: [
        { id: 'no_idea', label: 'Não faço ideia', value: 'no_idea' },
        { id: 'lt1', label: 'Menos de 1%', value: 'lt1' },
        { id: '1to2', label: 'Entre 1% e 2%', value: '1to2' },
        { id: 'gt2', label: 'Acima de 2%', value: 'gt2' },
    ],
};

const Q_LOCAL_LEADS: QuestionSpec<'leads_per_week'> = {
    id: 'q_niche_specific',
    field: 'leads_per_week',
    chapter: 1,
    eyebrow: 'Cap. 1 · Específico do nicho',
    headline: 'Quantos leads novos chegam por semana hoje?',
    sub: 'Mensagens no WhatsApp, formulários, ligações — qualquer canal.',
    options: [
        { id: '0to5', label: 'De 0 a 5 leads', value: '0to5' },
        { id: '6to15', label: 'De 6 a 15 leads', value: '6to15' },
        { id: '15to30', label: 'De 15 a 30 leads', value: '15to30' },
        { id: 'gt30', label: 'Mais de 30 leads', value: 'gt30' },
    ],
};

const Q_INFO_LAUNCH: QuestionSpec<'big_launch'> = {
    id: 'q_niche_specific',
    field: 'big_launch',
    chapter: 1,
    eyebrow: 'Cap. 1 · Específico do nicho',
    headline: 'Você já fez um lançamento que faturou mais de R$ 100 mil?',
    options: [
        { id: 'yes', label: 'Sim, mais de uma vez', value: 'yes' },
        { id: 'no', label: 'Lancei mas não chegou nesse número', value: 'no' },
        { id: 'never', label: 'Nunca lancei', value: 'never' },
    ],
};

const Q_B2B_TICKET: QuestionSpec<'ticket_size'> = {
    id: 'q_niche_specific',
    field: 'ticket_size',
    chapter: 1,
    eyebrow: 'Cap. 1 · Específico do nicho',
    headline: 'Qual o ticket médio do seu cliente?',
    options: [
        { id: 'lt1k', label: 'Até R$ 1.000', value: 'lt1k' },
        { id: '1to5k', label: 'R$ 1.000 a R$ 5.000', value: '1to5k' },
        { id: '5to30k', label: 'R$ 5.000 a R$ 30.000', value: '5to30k' },
        {
            id: 'gt30k',
            label: 'Acima de R$ 30.000',
            value: 'gt30k',
            premiumSignal: true,
        },
    ],
};

// ----------- Chapter 2 — investment -----------

const Q_INVESTS: QuestionSpec<'invests'> = {
    id: 'q_invests',
    field: 'invests',
    chapter: 2,
    eyebrow: 'Cap. 2 · Investimento',
    headline: 'Você já investe em tráfego pago hoje?',
    options: [
        { id: 'monthly', label: 'Sim, todo mês', value: 'monthly' },
        {
            id: 'sporadic',
            label: 'Sim, mas de forma esporádica',
            value: 'sporadic',
        },
        { id: 'stopped', label: 'Já investi e parei', value: 'stopped' },
        { id: 'never', label: 'Nunca investi', value: 'never' },
    ],
};

const Q_AD_BUDGET: QuestionSpec<'ad_budget'> = {
    id: 'q_ad_budget',
    field: 'ad_budget',
    chapter: 2,
    eyebrow: 'Cap. 2 · Investimento',
    headline: 'Quanto você investe por mês em mídia paga?',
    sub: 'Só a verba de anúncios — sem contar agência ou produção.',
    options: [
        { id: 'lt1k', label: 'Até R$ 1.000', value: 'lt1k' },
        { id: '1to5k', label: 'R$ 1.000 a R$ 5.000', value: '1to5k' },
        { id: '5to20k', label: 'R$ 5.000 a R$ 20.000', value: '5to20k' },
        {
            id: 'gt20k',
            label: 'Mais de R$ 20.000',
            value: 'gt20k',
            premiumSignal: true,
        },
    ],
};

const Q_KNOWS_CAC: QuestionSpec<'knows_cac'> = {
    id: 'q_knows_cac',
    field: 'knows_cac',
    chapter: 2,
    eyebrow: 'Cap. 2 · Investimento',
    headline: 'Você sabe seu CAC (Custo por Aquisição de Cliente)?',
    options: [
        {
            id: 'weekly',
            label: 'Sim, acompanho semanalmente',
            value: 'weekly',
        },
        { id: 'estimate', label: 'Tenho uma estimativa', value: 'estimate' },
        { id: 'no_idea', label: 'Não faço ideia', value: 'no_idea' },
    ],
};

// ----------- Chapter 3 — readiness -----------

const Q_SALES_CAP: QuestionSpec<'sales_capacity'> = {
    id: 'q_sales_capacity',
    field: 'sales_capacity',
    chapter: 3,
    eyebrow: 'Cap. 3 · Prontidão',
    headline:
        'Se dobrarmos seu volume de leads qualificados em 60 dias, seu time comercial dá conta?',
    options: [
        { id: 'hungry', label: 'Sim, estamos famintos por leads', value: 'hungry' },
        {
            id: 'will_hire',
            label: 'Precisaríamos contratar, mas queremos crescer',
            value: 'will_hire',
        },
        {
            id: 'at_limit',
            label: 'Já estamos no limite, queremos automatizar antes',
            value: 'at_limit',
        },
        { id: 'unsure', label: 'Não sei dizer', value: 'unsure' },
    ],
};

const Q_URGENCY: QuestionSpec<'urgency'> = {
    id: 'q_urgency',
    field: 'urgency',
    chapter: 3,
    eyebrow: 'Cap. 3 · Prontidão',
    headline: 'Quando você pretende começar a resolver isso?',
    options: [
        { id: 'now', label: 'Pra ontem', value: 'now' },
        { id: '30d', label: 'Nos próximos 30 dias', value: '30d' },
        {
            id: 'learning',
            label: 'Quero entender melhor antes de decidir',
            value: 'learning',
        },
        {
            id: '3plus',
            label: 'Daqui a 3 ou mais meses',
            value: '3plus_months',
        },
    ],
};

// Resolves the niche-specific Q4 by reading the previously answered niche.
// Falls back to ecommerce for "other" since the funnel still needs *some*
// branch — the lead will be tagged accordingly downstream.
export const nicheSpecificQuestion = (
    niche: Niche | undefined,
): QuestionSpec<keyof QuizAnswers> | null => {
    switch (niche) {
        case 'ecommerce':
            return Q_ECOM_CONVERSION as QuestionSpec<keyof QuizAnswers>;
        case 'local_service':
            return Q_LOCAL_LEADS as QuestionSpec<keyof QuizAnswers>;
        case 'infoproduct':
            return Q_INFO_LAUNCH as QuestionSpec<keyof QuizAnswers>;
        case 'b2b':
            return Q_B2B_TICKET as QuestionSpec<keyof QuizAnswers>;
        case 'other':
            return Q_ECOM_CONVERSION as QuestionSpec<keyof QuizAnswers>;
        default:
            return null;
    }
};

// Lookup used by QuizFlow to pull the right spec for a given StepId.
// `q_niche_specific` is resolved separately because it needs the answer
// from `q_niche`.
export const QUESTION_BY_STEP: Partial<
    Record<StepId, QuestionSpec<keyof QuizAnswers>>
> = {
    q_niche: Q_NICHE as QuestionSpec<keyof QuizAnswers>,
    q_tenure: Q_TENURE as QuestionSpec<keyof QuizAnswers>,
    q_revenue: Q_REVENUE as QuestionSpec<keyof QuizAnswers>,
    q_invests: Q_INVESTS as QuestionSpec<keyof QuizAnswers>,
    q_ad_budget: Q_AD_BUDGET as QuestionSpec<keyof QuizAnswers>,
    q_knows_cac: Q_KNOWS_CAC as QuestionSpec<keyof QuizAnswers>,
    q_sales_capacity: Q_SALES_CAP as QuestionSpec<keyof QuizAnswers>,
    q_urgency: Q_URGENCY as QuestionSpec<keyof QuizAnswers>,
};

// Case studies indexed by niche. The Insight #2 screen pulls one entry
// to match the lead's vertical for instant social-proof relevance.
export interface CaseMatch {
    client: string;
    headline: string;
    body: string;
}

export const CASE_BY_NICHE: Record<Niche, CaseMatch> = {
    ecommerce: {
        client: 'Oli e Sofi',
        headline: '+300% no faturamento',
        body:
            'E-commerce de roupas de bebê que triplicou a receita total em estratégia integrada de tráfego, copy e funil.',
    },
    local_service: {
        client: 'Bem Fisio',
        headline: '+450 leads / mês',
        body:
            'Clínica de fisioterapia que passou a captar 450 leads qualificados todo mês, com previsibilidade de agenda.',
    },
    infoproduct: {
        client: 'A Escola de Sites',
        headline: '+20 mil leads · 7 dígitos',
        body:
            'Escola online que gerou +20 mil leads e faturamento de múltiplos 7 dígitos em lançamentos consecutivos.',
    },
    b2b: {
        client: 'Full Sales System',
        headline: '+560 leads / mês',
        body:
            'Empresa de mentoria high-ticket com funis de R$ 6k a R$ 30k de ticket, rodando consistentemente.',
    },
    other: {
        client: 'Tecno Obras',
        headline: '+500 mil views / mês',
        body:
            'Operação multi-loja que atingiu o Top of Mind do público de construções em Curitiba, em 6 meses.',
    },
};
