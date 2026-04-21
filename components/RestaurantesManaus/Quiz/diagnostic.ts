import { QUIZ_STEPS } from './quizData';

export interface Diagnostic {
    headline: string;
    intro: string;
    painTitle: string;
    painInsight: string;
    marketingInsight: string;
    modelTitle: string;
    modelInsight: string;
    investmentTitle: string;
    investmentInsight: string;
    capacityTitle: string;
    capacityInsight: string;
    capacityWarning: boolean;
    actionPlan: string[];
}

const idx = (stepIndex: number, answer?: string): number =>
    answer ? QUIZ_STEPS[stepIndex].options.indexOf(answer) : -1;

const safe = (i: number, max: number) => (i < 0 || i >= max ? 0 : i);

// === DOR (step index 1) — the primary diagnostic axis ===
const DOR = [
    {
        headline: 'Seu restaurante tem salão cheio só no fim de semana.',
        title: 'Salão parado em dias críticos',
        insight:
            'Seu gargalo principal não é volume — é previsibilidade. O fluxo aparece no fim de semana, mas de segunda a quinta o custo fixo come margem e o salão vazio passa a mensagem errada pra quem passa na rua.',
    },
    {
        headline: 'Seu restaurante está alugando clientes do iFood.',
        title: 'Refém da plataforma',
        insight:
            'Você não é dono da sua demanda — você aluga. Cada pedido no iFood custa até 30% de comissão, e o cliente nunca vira seu: vira da plataforma. É como pagar aluguel pra vender.',
    },
    {
        headline: 'Seu lead esquenta no anúncio e esfria no WhatsApp.',
        title: 'Conversa que não vira reserva',
        insight:
            'Seu problema não é gerar lead — é converter. O cliente chega pronto pra comprar, cai na fila do WhatsApp e esfria. O custo por aquisição sobe porque o funil tem um furo no fim.',
    },
    {
        headline: 'Você paga por cliente novo todo mês — e o antigo some.',
        title: 'Recorrência baixa',
        insight:
            'Sua conta de aquisição nunca fecha. Enquanto você investe pra trazer um cliente novo, o antigo esquece de voltar. É ralo de faturamento disfarçado de crescimento.',
    },
];

// === MODELO (step index 0) ===
const MODELO = [
    {
        title: 'Foco em salão',
        insight:
            'Para um modelo presencial, a prioridade é ocupação de dias críticos e reserva direta — sem atravessador entre você e quem decide sair pra comer.',
    },
    {
        title: 'Foco em delivery',
        insight:
            'Para delivery, a missão é migrar pedido pro canal próprio (WhatsApp + site). A margem de um pedido direto é até 3x maior que a do iFood.',
    },
    {
        title: 'Modelo híbrido',
        insight:
            'No híbrido, tráfego, social e reservas precisam trabalhar coordenados — senão uma ponta canibaliza a outra e o ROI fica invisível.',
    },
    {
        title: 'Multiunidades',
        insight:
            'Com múltiplas lojas, cada unidade vira um funil próprio — CEP, criativo e relatório individuais. Campanha genérica em rede é dinheiro queimado.',
    },
];

// === MARKETING (step index 2) ===
const MARKETING = [
    'Você tem base orgânica, mas nunca ativou o pago. Orgânico sustenta — pago é o que escala. Esse é o próximo salto natural da sua operação.',
    'Impulso de post não é tráfego estruturado. Com campanha bem desenhada, o mesmo orçamento rende de 3 a 5 vezes mais em lead qualificado.',
    'Agência generalista não entende operação de restaurante. Especialização muda o resultado por completo — e é por isso que grande parte dos nossos clientes vieram de agências que não funcionaram.',
    'Se você não consegue dizer de onde veio cada cliente, você não consegue otimizar. Primeiro passo nosso é auditar o que já roda e instalar rastreamento completo.',
];

// === INVESTIMENTO (step index 3) ===
const INVESTIMENTO = [
    {
        title: 'Pacote inicial',
        insight:
            'Começamos a partir de R$ 3.500/mês: tráfego pago, rastreamento de conversão e gestão editorial essencial — tudo que um restaurante precisa pra sair do zero.',
    },
    {
        title: 'Pacote completo',
        insight:
            'No seu nível, operamos o pacote completo — tráfego, rastreamento, social e captação audiovisual recorrente, com relatório mensal consolidado.',
    },
    {
        title: 'Pacote premium',
        insight:
            'No seu nível, incluímos 1 dia de captação audiovisual por mês: vídeos e fotos profissionais direto do seu restaurante, todo mês.',
    },
    {
        title: 'Pacote escala',
        insight:
            'No seu nível, entra captação quinzenal, time dedicado e campanhas multicanal com relatório semanal e gerente de conta exclusivo.',
    },
];

// === CAPACIDADE (step index 4) ===
const CAPACIDADE = [
    {
        title: 'Pronto para escalar',
        insight:
            'Sua operação está preparada pra absorver volume novo. Podemos acelerar sem cerimônia — o gargalo está 100% no marketing, não na cozinha.',
        warn: false,
    },
    {
        title: 'Crescimento controlado',
        insight:
            'Sua operação vai sentir o crescimento. Vamos escalar em passos calibrados pra não queimar a experiência do cliente e não criar fila sem ter como absorver.',
        warn: false,
    },
    {
        title: 'Atenção operacional',
        insight:
            'Antes de escalar marketing, vamos mapear ganhos em margem e retenção. Escalar operação saturada é desperdício de verba e arrisca sua reputação.',
        warn: true,
    },
    {
        title: 'Consolidação primeiro',
        insight:
            'Sua prioridade de curto prazo é consolidar antes de acelerar. Vamos focar em retenção e eficiência operacional antes de injetar verba nova em aquisição.',
        warn: true,
    },
];

export function getDiagnostic(answers: (string | undefined)[]): Diagnostic {
    const modelo = safe(idx(0, answers[0]), MODELO.length);
    const dor = safe(idx(1, answers[1]), DOR.length);
    const marketing = safe(idx(2, answers[2]), MARKETING.length);
    const investimento = safe(idx(3, answers[3]), INVESTIMENTO.length);
    const capacidade = safe(idx(4, answers[4]), CAPACIDADE.length);

    const d = DOR[dor];
    const m = MODELO[modelo];
    const inv = INVESTIMENTO[investimento];
    const c = CAPACIDADE[capacidade];

    // === Build tailored action plan (3–5 bullets) ===
    const plan: string[] = [];

    // 1) Primary action from DOR
    const dorAction = [
        'Campanhas de tráfego segmentadas para gerar ocupação em dias de baixa (terça a quinta), com oferta específica para esses dias.',
        'Migração gradual de pedidos do iFood para o WhatsApp — preservando a margem e construindo uma base de clientes sua, não da plataforma.',
        'Script de atendimento consultivo no WhatsApp + rastreamento de cada conversa até a reserva — sem lead quente ficando frio na fila.',
        'Fluxo automatizado de retenção para reativar cliente dormente em até 30 dias, com oferta sazonal e lembrete personalizado.',
    ][dor];
    plan.push(dorAction);

    // 2) Model-specific action
    const modelAction = [
        'Sistema de reservas diretas integrado ao Google e ao Instagram — zero atravessador entre o cliente e a sua recepção.',
        'Funil otimizado para pedido direto via WhatsApp com upsell no atendimento — ticket médio sobe sem aumentar aquisição.',
        'Separação clara entre campanhas de salão e de delivery — sem canibalização e com orçamento dedicado por objetivo.',
        'Painel consolidado com relatório por unidade — CAC, receita e ROI vistos loja por loja, não em média geral.',
    ][modelo];
    plan.push(modelAction);

    // 3) Audiovisual — core pillar always included
    plan.push(
        'Captação audiovisual profissional recorrente: vídeos e fotos que fazem o cliente sentir o cheiro do prato antes de chegar ao salão.'
    );

    // 4) Tracking — include when marketing maturity is low or campaigns aren't measured
    if (marketing === 0 || marketing === 1 || marketing === 3) {
        plan.push(
            'Instalação completa de rastreamento (Meta + GA4 + pixel de conversão) — cada real anunciado auditado até a venda.'
        );
    }

    // 5) Capacity-aware addendum
    if (capacidade === 2 || capacidade === 3) {
        plan.push(
            'Auditoria de margem e retenção ANTES de injetar novo volume — para que cada cliente novo gere lucro, não pressão.'
        );
    }

    const firstRestaurant = 'do seu restaurante';
    return {
        headline: d.headline,
        intro: `Analisamos suas 5 respostas e cruzamos com o padrão de mais de uma dúzia de restaurantes em Manaus. Abaixo, o diagnóstico sintético e o plano de crescimento personalizado ${firstRestaurant}.`,
        painTitle: d.title,
        painInsight: d.insight,
        marketingInsight: MARKETING[marketing],
        modelTitle: m.title,
        modelInsight: m.insight,
        investmentTitle: inv.title,
        investmentInsight: inv.insight,
        capacityTitle: c.title,
        capacityInsight: c.insight,
        capacityWarning: c.warn,
        actionPlan: plan,
    };
}
