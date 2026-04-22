export interface QuizStepData {
    step: number;
    label: string;
    question: string;
    options: string[];
}

export const QUIZ_STEPS: QuizStepData[] = [
    {
        step: 1,
        label: 'SEU NEGÓCIO',
        question: 'Qual descreve melhor o seu negócio hoje?',
        options: [
            'Serviço ou consultoria (profissional autônomo)',
            'Clínica, consultório ou estúdio',
            'Comércio, loja física ou atelier',
            'Delivery, e-commerce ou food service',
            'Infoproduto ou serviço digital',
        ],
    },
    {
        step: 2,
        label: 'O QUE TRAVA',
        question: 'Onde aparece o maior obstáculo do seu negócio hoje?',
        options: [
            'Dependo só de indicação, sem previsibilidade de cliente novo',
            'Já tentei anúncio sozinho e perdi dinheiro sem entender o porquê',
            'Já contratei agência antes e o resultado não apareceu',
            'Atendimento no WhatsApp trava — o lead esfria antes de fechar',
        ],
    },
    {
        step: 3,
        label: 'SEU MARKETING HOJE',
        question: 'Qual é a sua situação de marketing agora?',
        options: [
            'Nada estruturado — só conto com o orgânico',
            'Impulsiono posts de vez em quando',
            'Já contratei agência antes, sem o retorno esperado',
            'Tenho campanhas rodando mas não sei se estão dando retorno',
        ],
    },
    {
        step: 4,
        label: 'INVESTIMENTO',
        question: 'Qual verba mensal você consegue destinar para marketing?',
        options: [
            'A partir de R$ 990/mês',
            'A partir de R$ 1.490/mês',
            'A partir de R$ 3.500/mês',
            'Ainda estou calibrando o quanto posso',
        ],
    },
    {
        step: 5,
        label: 'SEU MOMENTO',
        question: 'Quando você pretende começar?',
        options: [
            'Agora — quero começar esse mês',
            'Nos próximos 30 dias',
            'Estou pesquisando e comparando opções',
            'Só quero entender como funciona por enquanto',
        ],
    },
];

export const WHATSAPP_REDIRECT =
    'https://wa.me/5592985146299?text=Ol%C3%A1%2C%20acabei%20de%20fazer%20o%20diagn%C3%B3stico%20no%20site%20e%20quero%20conversar%20sobre%20o%20plano.';
