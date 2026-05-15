import {
    QualificationLevel,
    QuizAnswers,
    Revenue,
    StepId,
} from './types';

// ----------- Step orchestration -----------
// All possible steps in linear order. The actual path is computed by
// `nextStep` which can skip steps that don't apply to the lead.

const ORDER: StepId[] = [
    'landing',
    'q_niche',
    'q_tenure',
    'q_revenue',
    'q_niche_specific',
    'insight_financial',
    'q_invests',
    'q_ad_budget',
    'q_knows_cac',
    'insight_case',
    'q_sales_capacity',
    'q_urgency',
    'lead_form',
    'schedule_standard',
    'schedule_premium',
    'nurture_waitlist',
    'waitlist_thanks',
];

// Returns true when the step is mid-funnel question/insight and should
// count toward the progress bar.
export const isProgressStep = (step: StepId): boolean =>
    step.startsWith('q_') || step.startsWith('insight_');

// Total steps shown to the user, ignoring landing / form / terminal screens.
export const totalProgressSteps = (answers: QuizAnswers): number => {
    // Base count: 8 questions + 2 insights = 10.
    // Q6 (ad_budget) and Q7 (knows_cac) are skipped for leads that never
    // invested in ads — they don't have data to share.
    if (answers.invests === 'never') return 8; // skip ad_budget + knows_cac
    return 10;
};

// Returns the index (1-based) of `step` among the progress steps for the
// current path. Used by ProgressBar.
export const progressIndex = (step: StepId, answers: QuizAnswers): number => {
    const path = pathFor(answers);
    const progressOnly = path.filter(isProgressStep);
    const idx = progressOnly.indexOf(step);
    return idx === -1 ? 0 : idx + 1;
};

// Returns the full path the lead will walk through with their current
// answers, ignoring decision routing at the end (form/schedule/nurture).
const pathFor = (answers: QuizAnswers): StepId[] => {
    const path: StepId[] = [
        'q_niche',
        'q_tenure',
        'q_revenue',
        'q_niche_specific',
        'insight_financial',
        'q_invests',
    ];

    // Q6 + Q7 only matter when the lead has data to share.
    if (answers.invests && answers.invests !== 'never') {
        path.push('q_ad_budget', 'q_knows_cac');
    }
    path.push('insight_case', 'q_sales_capacity', 'q_urgency');
    return path;
};

// Returns the next step in the funnel, skipping conditional steps the
// lead doesn't need. Called every time the user submits an answer.
export const nextStep = (
    current: StepId,
    answers: QuizAnswers,
): StepId => {
    // After q_urgency we hit the routing decision — qualification level
    // determines which terminal track the lead enters.
    if (current === 'q_urgency') {
        return 'lead_form';
    }
    // After the lead form, route by qualification level.
    if (current === 'lead_form') {
        const level = qualify(answers);
        if (level === 'premium') return 'schedule_premium';
        if (level === 'qualified') return 'schedule_standard';
        return 'nurture_waitlist';
    }
    if (current === 'nurture_waitlist') {
        return 'waitlist_thanks';
    }

    const idx = ORDER.indexOf(current);
    if (idx === -1) return current; // safety net

    // Walk forward skipping branches that don't apply.
    for (let i = idx + 1; i < ORDER.length; i++) {
        const candidate = ORDER[i];
        if (shouldSkip(candidate, answers)) continue;
        return candidate;
    }
    return current;
};

const shouldSkip = (step: StepId, answers: QuizAnswers): boolean => {
    // Leads that never invested have no budget/CAC data to give.
    if (answers.invests === 'never') {
        if (step === 'q_ad_budget' || step === 'q_knows_cac') return true;
    }
    return false;
};

// ----------- Qualification -----------
// Routes the lead to one of three tracks. Premium first (highest signal
// wins), then qualified vs nurture based on a soft scoring of the four
// remaining levers (revenue, invests, sales_capacity, urgency).

export const qualify = (answers: QuizAnswers): QualificationLevel => {
    // Hard premium gates — any of these flips premium immediately.
    if (answers.revenue === 'gt500k') return 'premium';
    if (answers.ad_budget === 'gt20k') return 'premium';
    if (answers.ticket_size === 'gt30k') return 'premium';

    // Hard disqualifications — these are simply not the right fit yet.
    if (answers.revenue === 'pre_revenue' && answers.invests === 'never') {
        return 'nurture';
    }
    if (answers.urgency === '3plus_months' && answers.revenue === 'lt10k') {
        return 'nurture';
    }

    // Soft scoring. Each lever contributes; threshold decides.
    let score = 0;
    // Revenue: more = more qualified. (`gt500k` is unreachable here
    // because of the early-return premium gate above.)
    if (answers.revenue === '100to500k') score += 3;
    else if (answers.revenue === '30to100k') score += 2;
    else if (answers.revenue === '10to30k') score += 1;
    else if (answers.revenue === 'lt10k') score -= 1;
    else if (answers.revenue === 'pre_revenue') score -= 3;

    // Has skin in the game already (invests or has budget intent).
    if (answers.invests === 'monthly') score += 2;
    else if (answers.invests === 'sporadic') score += 1;
    else if (answers.invests === 'stopped') score += 0;
    else if (answers.invests === 'never') score -= 1;

    // Urgency.
    if (answers.urgency === 'now') score += 2;
    else if (answers.urgency === '30d') score += 1;
    else if (answers.urgency === 'learning') score -= 1;
    else if (answers.urgency === '3plus_months') score -= 2;

    // Sales capacity — at_limit is actually a buy signal because the
    // lead is already feeling the pain of demand they can't serve.
    if (answers.sales_capacity === 'hungry') score += 2;
    else if (answers.sales_capacity === 'will_hire') score += 1;
    else if (answers.sales_capacity === 'at_limit') score += 1;

    // Premium boost via revenue tier even without the hard gate. The
    // earlier `gt500k` short-circuit means we only see `100to500k` here,
    // but we still gate on ad behavior to avoid promoting a curious
    // mid-tier with no skin in the game.
    if (
        answers.revenue === '100to500k' &&
        (answers.ad_budget === '5to20k' || answers.invests === 'monthly')
    ) {
        return 'premium';
    }

    return score >= 3 ? 'qualified' : 'nurture';
};

// ----------- Insight #1 — financial loss estimate -----------
// Picks a defensible mid-point for the lead's revenue bucket and
// estimates what a typical conversion or efficiency gap costs annually.
// Returns null when there isn't enough signal to make a sensible claim.

export interface FinancialInsight {
    monthlyRevenueMid: number; // R$ mid-point of their bucket
    annualLeakLow: number;     // conservative lower bound
    annualLeakHigh: number;    // upper bound
    headline: string;          // ready-to-render headline
}

const REVENUE_MID: Record<Revenue, number> = {
    pre_revenue: 0,
    lt10k: 5_000,
    '10to30k': 20_000,
    '30to100k': 65_000,
    '100to500k': 300_000,
    gt500k: 750_000,
};

const fmtBRL = (n: number) =>
    n.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 0,
    });

export const financialInsight = (
    answers: QuizAnswers,
): FinancialInsight | null => {
    const rev = answers.revenue;
    if (!rev || rev === 'pre_revenue') return null;

    const mid = REVENUE_MID[rev];
    // Industry-standard observation: most operations leak 30–60% of
    // marketing-related revenue through conversion gaps, mis-targeted
    // traffic, or untracked funnels. We use a 25–45% band here to stay
    // defensible against scrutiny.
    const annualLow = Math.round(mid * 12 * 0.25);
    const annualHigh = Math.round(mid * 12 * 0.45);

    let headline = `Estimamos entre ${fmtBRL(annualLow)} e ${fmtBRL(annualHigh)} por ano deixados na mesa.`;

    // Sharpen the headline when the niche-specific Q4 gave us a stronger signal.
    if (answers.ecommerce_conversion === 'lt1') {
        headline = `Conversão abaixo de 1% — empresas como a sua que sobem pra 2% chegam a dobrar a receita sem aumentar 1 real em mídia. Estamos falando de até ${fmtBRL(annualHigh)} por ano.`;
    } else if (
        answers.leads_per_week === '0to5' &&
        (rev === '10to30k' || rev === '30to100k')
    ) {
        headline = `Faturando ${fmtBRL(mid)}/mês com menos de 5 leads novos por semana — você está rodando 100% do peso na indicação. Estimamos ${fmtBRL(annualHigh)}/ano em receita não capturada.`;
    } else if (
        answers.big_launch === 'never' &&
        (rev === '30to100k' || rev === '100to500k')
    ) {
        headline = `Faturando ${fmtBRL(mid)}/mês sem nunca ter lançado — empresas no seu perfil que estruturam um lançamento bem feito adicionam de ${fmtBRL(annualLow)} a ${fmtBRL(annualHigh)} ao ano de receita extra.`;
    }

    return {
        monthlyRevenueMid: mid,
        annualLeakLow: annualLow,
        annualLeakHigh: annualHigh,
        headline,
    };
};
