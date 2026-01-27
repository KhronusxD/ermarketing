import { LeadData, UserAnswers } from './types';

const WEBHOOK_URL = "https://hook.us2.make.com/he57ikonv7b37f55zipo91wv3bh58my9";

interface WebhookPayload {
    date: string;
    source: string;
    type: 'geral' | 'restaurante';
    contact: LeadData;
    answers: UserAnswers;
}

export const submitLeadToExcel = async (
    leadData: LeadData,
    answers: UserAnswers,
    quizType: 'geral' | 'restaurante'
): Promise<boolean> => {
    try {
        const payload: WebhookPayload = {
            date: new Date().toISOString(),
            source: 'site_er',
            type: quizType,
            contact: leadData,
            answers: answers
        };

        constresponse = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
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
