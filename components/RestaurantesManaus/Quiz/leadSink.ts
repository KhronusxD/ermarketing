import type { QuizFormFields } from './QuizResult';

// Google Apps Script Web App endpoint — writes each submission as a row
// into the spreadsheet: 1vpQx96rca-A0j7kBxpI4t4HgaMDR_6JT5hBtBEmZTq0
// Deploy the Apps Script as "Web App" with access "Anyone" and paste the
// /exec URL below. The request uses text/plain to avoid a CORS preflight.
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

// Fire-and-forget — we don't block the UI on the network call.
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
