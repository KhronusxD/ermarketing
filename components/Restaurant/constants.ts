import { Question } from '../Quiz/types';

export const RESTAURANT_QUESTIONS: Question[] = [
    {
        id: 1,
        category: "O Modelo",
        text: "Qual é o modelo de operação do seu negócio gastronômico hoje?",
        options: [
            { id: 'salao', label: "Restaurante com Salão (Atendimento Local)", value: "salao" },
            { id: 'delivery', label: "Focado em Delivery / Dark Kitchen", value: "delivery" },
            { id: 'hibrido', label: "Híbrido (Salão + Delivery forte)", value: "hibrido" },
            { id: 'rede', label: "Rede / Franquia com múltiplas unidades", value: "rede" },
        ]
    },
    {
        id: 2,
        category: "A Dor Principal",
        text: "Onde o sapato aperta mais na sua operação hoje?",
        options: [
            { id: 'ifood', label: "Dependência excessiva de iFood/Marketplaces (Taxas altas)", value: "dependencia_ifood", scoreImpact: 10 },
            { id: 'movimento', label: "Salão vazio ou movimento fraco durante a semana", value: "movimento_fraco", scoreImpact: 15 },
            { id: 'lucro', label: "Vendo bem, mas não vejo a cor do dinheiro (Margem baixa/CMV alto)", value: "margem_baixa", scoreImpact: 5 },
            { id: 'recorrencia', label: "Clientela não fideliza, dependo sempre de novos clientes", value: "recorrencia", scoreImpact: 10 },
        ]
    },
    {
        id: 3,
        category: "O CMV",
        text: "Você tem controle exato sobre o CMV (Custo de Mercadoria Vendida) dos seus pratos?",
        options: [
            { id: 'tech', label: "Sim, tenho ficha técnica atualizada de tudo.", value: "controle_total", scoreImpact: 20 },
            { id: 'basic', label: "Tenho uma noção, mas desatualizada.", value: "controle_parcial", scoreImpact: 10 },
            { id: 'none', label: "Não controlo, precifico baseado na concorrência.", value: "sem_controle", scoreImpact: 0 },
        ]
    },
    {
        id: 4,
        category: "Investimento",
        text: "Qual é a sua verba média mensal disponível para marketing (Tráfego + Ações)?",
        options: [
            { id: 'low', label: "Ainda não invisto / Apenas orgânico", value: "iniciante", scoreImpact: 5 },
            { id: 'med', label: "De R$ 1.500 a R$ 4.000", value: "aprendiz", scoreImpact: 15 },
            { id: 'high', label: "Acima de R$ 5.000 (Já tenho verba separada)", value: "investidor", scoreImpact: 25 },
        ]
    },
    {
        id: 5,
        category: "Capacidade",
        text: "Se dobrarmos seus pedidos hoje, sua cozinha/operação aguenta?",
        options: [
            { id: 'yes', label: "Sim, temos capacidade ociosa e equipe pronta.", value: "pronto", scoreImpact: 10 },
            { id: 'maybe', label: "Ficaria apertado, mas daríamos um jeito.", value: "ajustavel", scoreImpact: 5 },
            { id: 'no', label: "Não, já estamos no limite operacional.", value: "gargalo_operacional", scoreImpact: -5 },
        ]
    }
];

export const TOOL_LOGOS_RESTAURANT = [
    "iFood",
    "Goomer",
    "Anota AI",
    "Google Meu Negócio",
    "Meta Ads"
];
