import type { QuizFormFields } from './QuizResult';

// Same Google Apps Script endpoint as the Restaurantes Manaus funnel —
// each submission becomes a row in the shared spreadsheet. The `page`
// column (auto-populated from window.location.href) is what distinguishes
// leads from /diagnostico-manaus vs /diagnostico-flowdesk in reports.
const SHEETS_ENDPOINT =
    'https://script.google.com/macros/s/AKfycbzQvWOnzZHhHIp-kfryN1vDDvLlMDcqoc2I6GOddthjRYYpaTw2RwfdD02WhwXXL7Wj/exec';

export interface LeadPayload extends QuizFormFields {
    answers: (string | undefined)[];
    submittedAt: string;
    page: string;
    referrer: string;
}

export function buildLeadPayload(fields: QuizFormFields, answers: (string | undefined)[]): LeadPayload {
    return {
        ...fields,
        answers,
        submittedAt: new Date().toISOString(),
        page: typeof window !== 'undefined' ? window.location.href : '',
        referrer: typeof document !== 'undefined' ? document.referrer : '',
    };
}

export function sendLeadToSheet(payload: LeadPayload): Promise<void> {
    if (!SHEETS_ENDPOINT) return Promise.resolve();
    return fetch(SHEETS_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        keepalive: true,
    })
        .then(() => undefined)
        .catch(() => undefined);
}
