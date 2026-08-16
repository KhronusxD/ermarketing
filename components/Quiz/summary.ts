import { QUESTION_BY_STEP, nicheSpecificQuestion } from './constants';
import { LeadData, Niche, QuestionSpec, QuizAnswers } from './types';

// Resumo das respostas em texto corrido, pra abrir o WhatsApp já com o
// contexto na mão. Sem isso o atendimento começa perguntando de novo o
// que a pessoa acabou de responder — que é justamente o que o
// diagnóstico existe pra evitar.
//
// Vive fora da tela de conversa porque o diagnóstico de
// /auditoria-de-lucro-invisivel pode querer o mesmo resumo depois.

// Rótulo curto por campo. O headline da pergunta é escrito pra tela
// ("Se dobrarmos seu volume de leads em 60 dias, seu time dá conta?") e
// ficaria comprido demais numa lista de WhatsApp.
const FIELD_LABEL: Partial<Record<keyof QuizAnswers, string>> = {
    niche: 'Negócio',
    tenure: 'Tempo de operação',
    revenue: 'Faturamento/mês',
    ecommerce_conversion: 'Conversão da loja',
    leads_per_week: 'Leads por semana',
    big_launch: 'Já lançou',
    ticket_size: 'Ticket médio',
    invests: 'Investe em tráfego',
    ad_budget: 'Verba de mídia/mês',
    knows_cac: 'Acompanha CAC',
    sales_capacity: 'Capacidade comercial',
    urgency: 'Urgência',
};

const ORDER: Array<keyof QuizAnswers> = [
    'niche',
    'tenure',
    'revenue',
    'ecommerce_conversion',
    'leads_per_week',
    'big_launch',
    'ticket_size',
    'invests',
    'ad_budget',
    'knows_cac',
    'sales_capacity',
    'urgency',
];

// Todas as perguntas do baralho, incluindo os quatro ramos por nicho —
// só assim dá pra traduzir o valor guardado de volta pro rótulo que a
// pessoa realmente leu na tela.
const allQuestions = (): QuestionSpec<keyof QuizAnswers>[] => {
    const niches: Niche[] = ['ecommerce', 'local_service', 'infoproduct', 'b2b'];
    const branched = niches
        .map((n) => nicheSpecificQuestion(n))
        .filter((q): q is QuestionSpec<keyof QuizAnswers> => q !== null);
    return [...Object.values(QUESTION_BY_STEP), ...branched];
};

const labelFor = (field: keyof QuizAnswers, value: string): string => {
    for (const q of allQuestions()) {
        if (q.field !== field) continue;
        const opt = q.options.find((o) => o.value === value);
        if (opt) return opt.label;
    }
    return value;
};

/** Linhas "Rótulo: resposta" na ordem em que foram perguntadas. */
export const answerLines = (answers: QuizAnswers): string[] =>
    ORDER.flatMap((field) => {
        const value = answers[field];
        if (!value) return [];
        const label = FIELD_LABEL[field];
        if (!label) return [];
        return [`${label}: ${labelFor(field, value as string)}`];
    });

/** Mensagem que abre no WhatsApp, escrita na voz de quem responde. */
export const whatsappSummary = (
    lead: Partial<LeadData>,
    answers: QuizAnswers,
): string => {
    const parts = [
        `Oi! Sou ${lead.name ?? ''}${lead.company ? `, do ${lead.company}` : ''}.`,
        'Acabei de responder o diagnóstico no site da Norte. Segue o resumo:',
        '',
        ...answerLines(answers).map((l) => `• ${l}`),
    ];

    if (answers.price_confirmed === 'yes') {
        parts.push('', 'Ciente do investimento a partir de R$ 2.500/mês.');
    }

    parts.push('', 'Podemos conversar?');
    return parts.join('\n');
};

export const whatsappUrlWithSummary = (
    phone: string,
    lead: Partial<LeadData>,
    answers: QuizAnswers,
): string =>
    `https://wa.me/${phone}?text=${encodeURIComponent(whatsappSummary(lead, answers))}`;
