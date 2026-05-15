import {
    LeadData,
    QualificationLevel,
    QuizAnswers,
    WaitlistData,
} from './types';

const WEBHOOK_URL = 'https://hook.us2.make.com/he57ikonv7b37f55zipo91wv3bh58my9';

interface LeadPayload {
    date: string;
    source: 'site_er';
    type: 'diagnostico';
    qualification_level: QualificationLevel;
    contact: LeadData;
    answers: QuizAnswers;
}

interface WaitlistPayload {
    date: string;
    source: 'site_er';
    type: 'waitlist_essencial';
    contact: WaitlistData;
    // Keep the quiz answers in the payload — even for non-qualified leads
    // they are the richest segmentation signal we have for the future
    // lower-ticket product launch.
    answers: QuizAnswers;
}

const post = async (payload: LeadPayload | WaitlistPayload): Promise<boolean> => {
    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            console.error('Webhook failed:', response.statusText);
            return false;
        }
        return true;
    } catch (error) {
        console.error('Webhook error:', error);
        return false;
    }
};

export const submitLead = async (
    lead: LeadData,
    answers: QuizAnswers,
    level: QualificationLevel,
): Promise<boolean> =>
    post({
        date: new Date().toISOString(),
        source: 'site_er',
        type: 'diagnostico',
        qualification_level: level,
        contact: lead,
        answers,
    });

export const submitWaitlist = async (
    contact: WaitlistData,
    answers: QuizAnswers,
): Promise<boolean> =>
    post({
        date: new Date().toISOString(),
        source: 'site_er',
        type: 'waitlist_essencial',
        contact,
        answers,
    });

// Backwards-compatible export — Restaurant quiz flow still calls
// submitLeadToExcel under the older signature. Kept as a thin adapter
// so we don't have to touch that route today.
export const submitLeadToExcel = async (
    leadData: object,
    answers: object,
    quizType: 'geral' | 'restaurante',
): Promise<boolean> => {
    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                date: new Date().toISOString(),
                source: 'site_er',
                type: quizType,
                contact: leadData,
                answers,
            }),
        });
        return response.ok;
    } catch (error) {
        console.error('Webhook error:', error);
        return false;
    }
};
