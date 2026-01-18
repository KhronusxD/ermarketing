import { Question } from './types';

export const QUESTIONS: Question[] = [
    {
        id: 1,
        category: "O Contexto",
        text: "Para começarmos a análise, qual modelo melhor descreve o seu negócio atual?",
        options: [
            { id: 'srv', label: "Venda de Serviços (B2B ou B2C)", value: "servicos" },
            { id: 'ecom', label: "E-commerce / Venda de Produto Físico", value: "ecommerce" },
            { id: 'info', label: "Infoproduto / Educação", value: "infoproduto" },
            { id: 'local', label: "Negócio Local (Loja física/Clínica)", value: "local" },
        ]
    },
    {
        id: 2,
        category: "A Dor",
        text: "Qual é o maior obstáculo impedindo sua escala de receita hoje?",
        options: [
            { id: 'traffic', label: "Poucas pessoas visitam meu site/perfil (Problema de Tráfego).", value: "trafego", scoreImpact: 10 },
            { id: 'conv', label: "Muita visita, mas poucos contatos/vendas (Problema de Conversão).", value: "conversao", scoreImpact: 5 },
            { id: 'qual', label: "Chegam leads, mas são desqualificados/curiosos (Problema de Público).", value: "publico", scoreImpact: 15 },
            { id: 'strat', label: "Não sei dizer, sinto que estamos estagnados (Problema de Estratégia).", value: "estrategia", scoreImpact: 0 },
        ]
    },
    {
        id: 3,
        category: "A Maturidade",
        text: "Atualmente, você tem clareza sobre qual é o seu CAC (Custo por Aquisição de Cliente)?",
        options: [
            { id: 'mature', label: "Sim, acompanho semanalmente.", value: "maduro", scoreImpact: 20 },
            { id: 'growing', label: "Tenho uma ideia, mas não é preciso.", value: "crescimento", scoreImpact: 10 },
            { id: 'new', label: "Não faço ideia do que é isso.", value: "iniciante", scoreImpact: 0 },
        ]
    },
    {
        id: 4,
        category: "O Investimento",
        text: "Para calibrarmos a estratégia sugerida: qual é a sua verba média mensal disponível para tráfego e marketing?",
        options: [
            { id: 'low', label: "Ainda não invisto / Menos de R$ 1.000", value: "baixo", scoreImpact: 5 },
            { id: 'med', label: "De R$ 2.000 a R$ 5.000", value: "medio", scoreImpact: 15 },
            { id: 'ideal', label: "De R$ 5.000 a R$ 20.000", value: "ideal", scoreImpact: 25 },
            { id: 'whale', label: "Acima de R$ 20.000", value: "enterprise", scoreImpact: 30 },
        ]
    },
    {
        id: 5,
        category: "A Ambição",
        text: "Se encontrarmos o gargalo e dobrarmos seu volume de leads qualificados em 30 dias, seu time comercial consegue atender?",
        options: [
            { id: 'hungry', label: "Sim, estamos famintos por leads!", value: "sim", scoreImpact: 10 },
            { id: 'hire', label: "Precisaríamos contratar, mas queremos.", value: "contratar", scoreImpact: 10 },
            { id: 'full', label: "Não, já estamos sobrecarregados.", value: "nao", scoreImpact: -5 },
        ]
    }
];

export const TOOL_LOGOS = [
    "Google Ads",
    "Meta Ads",
    "HubSpot",
    "Analytics",
    "Salesforce"
];
