export interface QuizStepData {
    step: number;
    label: string;
    question: string;
    options: string[];
}

export const QUIZ_STEPS: QuizStepData[] = [
    {
        step: 1,
        label: 'SEU RESTAURANTE',
        question: 'Qual é o modelo de operação do seu restaurante hoje?',
        options: [
            'Restaurante com Salão (Atendimento Presencial)',
            'Focado em Delivery / Dark Kitchen',
            'Híbrido (Salão + Delivery forte)',
            'Rede ou múltiplas unidades',
        ],
    },
    {
        step: 2,
        label: 'A DOR PRINCIPAL',
        question: 'Onde o problema aparece mais no seu restaurante hoje?',
        options: [
            'Salão vazio ou movimento fraco durante a semana',
            'Dependência total do iFood (taxas altas, margem baixa)',
            'Leads no WhatsApp que somem sem virar cliente',
            'Clientela não volta, dependo sempre de cliente novo',
        ],
    },
    {
        step: 3,
        label: 'SEU MARKETING ATUAL',
        question: 'O que você já fez de marketing para o seu restaurante?',
        options: [
            'Só posto no Instagram, nunca paguei anúncio',
            'Já impulsionei posts, mas não vi resultado real',
            'Já contratei agência e não funcionou como esperado',
            'Tenho campanhas rodando mas não sei se estão dando retorno',
        ],
    },
    {
        step: 4,
        label: 'INVESTIMENTO',
        question: 'Qual é a verba mensal que você consegue destinar para marketing (agência + anúncios)?',
        options: [
            'Ainda não invisto / Só orgânico',
            'De R$ 1.500 a R$ 4.000',
            'De R$ 4.000 a R$ 8.000',
            'Acima de R$ 8.000 (já tenho verba separada)',
        ],
    },
    {
        step: 5,
        label: 'CAPACIDADE',
        question: 'Se dobrarmos o número de reservas e pedidos hoje, sua operação aguenta?',
        options: [
            'Sim, temos capacidade ociosa e equipe pronta',
            'Ficaria apertado, mas daríamos um jeito',
            'Não, estamos no limite operacional',
            'Precisaria contratar e expandir antes',
        ],
    },
];

export const WHATSAPP_REDIRECT = 'https://flowdesk-flowdesk-app.rikvu5.easypanel.host/r/sknyr4';
