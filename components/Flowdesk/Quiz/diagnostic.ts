import { QUIZ_STEPS } from './quizData';

export interface Diagnostic {
    headline: string;
    painTitle: string;
    painInsight: string;
    marketingInsight: string;
    modelTitle: string;
    modelInsight: string;
    planTitle: string;
    planPrice: string;
    planInsight: string;
    momentTitle: string;
    momentInsight: string;
    momentWarning: boolean;
    actionPlan: string[];
}

const idx = (stepIndex: number, answer?: string): number =>
    answer ? QUIZ_STEPS[stepIndex].options.indexOf(answer) : -1;

const safe = (i: number, max: number) => (i < 0 || i >= max ? 0 : i);

// === DOR (step 2) — primary diagnostic axis ===
const DOR = [
    {
        headline: 'Seu negócio depende só de quem já te conhece.',
        title: 'Sem previsibilidade de cliente novo',
        insight:
            'Indicação é ótimo até a hora em que seca. Sem canal próprio pra gerar demanda, o caixa fica refém do humor do mês — e você não consegue planejar crescimento.',
    },
    {
        headline: 'Você pagou pra aprender — sem saber o que aprendeu.',
        title: 'Anúncio sem estratégia queima dinheiro',
        insight:
            'Sobe campanha, gasta, olha o painel, não entende o que deu ou não deu certo. O problema não é o tráfego pago — é a falta de estrutura por trás do tráfego.',
    },
    {
        headline: 'Agência cara não é sinônimo de resultado.',
        title: 'Agência com relatório bonito, caixa vazio',
        insight:
            'Muita agência vende processo genérico: relatório bonito, calls longas, zero responsabilidade por gerar venda. Você pagou pelo showroom, não pelo motor.',
    },
    {
        headline: 'Seu lead está chegando. E esfriando no WhatsApp.',
        title: 'Atendimento trava — o lead esfria',
        insight:
            'Lead quente vira lead frio em menos de 10 minutos. Se você não responde na hora, o concorrente responde. A IA no WhatsApp existe pra resolver exatamente isso.',
    },
];

// === MODELO / TIPO DE NEGÓCIO (step 1) ===
const MODELO = [
    {
        title: 'Profissional autônomo',
        insight:
            'Pra serviço e consultoria, a missão é autoridade + agenda cheia. Tráfego gera demanda, mas a venda acontece na conversa — o WhatsApp com IA é decisivo pro seu modelo.',
    },
    {
        title: 'Clínica / consultório',
        insight:
            'Clínica vive de recorrência e primeira consulta. A gente estrutura aquisição local focada em CEP + conversão no WhatsApp, com retargeting pros pacientes que já passaram.',
    },
    {
        title: 'Comércio / loja física',
        insight:
            'Loja precisa de fluxo — presencial e online. Campanhas geolocalizadas + criativo de produto + atendimento rápido no WhatsApp transformam visualização em visita.',
    },
    {
        title: 'Delivery / e-commerce',
        insight:
            'No digital, tudo é rastreável. A meta é montar um funil com CAC abaixo do ticket médio e, em 60 dias, dobrar o volume sem aumentar a verba proporcionalmente.',
    },
    {
        title: 'Infoproduto / serviço digital',
        insight:
            'Pra infoproduto, o jogo é escala + conversão. Funil de captura, nutrição e checkout otimizado. Com criativo certo, é o canal onde 1 real investido rende mais rápido.',
    },
];

// === MARKETING ATUAL (step 3) ===
const MARKETING = [
    'Sem estrutura, tudo depende do algoritmo te enxergar. O primeiro salto é instalar campanha + rastreamento — o orgânico continua, mas deixa de ser o único motor.',
    'Impulso de post não é tráfego pago estruturado — é o Instagram te vendendo alcance. Com campanha bem desenhada, o mesmo orçamento rende de 3 a 5x mais em lead qualificado.',
    'Agência genérica entrega relatório. Agência especializada entrega venda. A ER trabalha como time de performance — não como prestador que manda print no fim do mês.',
    'Se você roda campanha sem saber o retorno, você roda no escuro. Primeiro passo é instalar rastreamento completo — depois otimizar o que já existe antes de gastar mais.',
];

// === INVESTIMENTO → PLANO RECOMENDADO (step 4) ===
const PLANO = [
    {
        title: 'Plano Start',
        price: 'R$ 990/mês',
        insight:
            'Campanhas em uma plataforma (Meta OU Google), 1 criativo/mês, CRM FlowDesk configurado e grupo VIP com nossa equipe. É o primeiro passo estruturado — com o mínimo de risco.',
    },
    {
        title: 'Plano Essencial',
        price: 'R$ 1.490/mês',
        insight:
            'Meta + Google, 2 criativos/mês, WhatsApp com IA 24h, relatórios semanais e consultoria mensal. É o pacote completo rodando — o mais escolhido por quem quer previsibilidade.',
    },
    {
        title: 'Plano Profissional',
        price: 'R$ 3.500/mês',
        insight:
            'Tudo do Essencial + social media completo, 1 dia de captação audiovisual/mês, 5 vídeos editados, 12–15 artes e rastreamento avançado. Pra quem quer crescer com time dedicado.',
    },
    {
        title: 'Recomendado: Plano Essencial',
        price: 'R$ 1.490/mês',
        insight:
            'Pelo seu perfil, o Essencial é o degrau certo: Meta + Google rodando juntos, criativo mensal, IA no WhatsApp e consultoria. O Start fica apertado, o Profissional é degrau de depois.',
    },
];

// === MOMENTO / URGÊNCIA (step 5) ===
const MOMENTO = [
    {
        title: 'Pronto pra começar',
        insight:
            'Dos 4 clientes do mês, ainda tem vaga. Nossa equipe entra em contato em minutos pra iniciar o setup — do briefing ao primeiro anúncio no ar em até 7 dias.',
        warn: false,
    },
    {
        title: 'Janela de 30 dias',
        insight:
            'Mês que vem é um bom horizonte. Vamos agendar a reunião de briefing essa semana e já deixar setup e criativos prontos pra campanha subir no dia certo.',
        warn: false,
    },
    {
        title: 'Pesquisando as opções',
        insight:
            'Pesquisar faz sentido — tá colocando dinheiro em cima de um método. Na conversa com a equipe, te mostramos dados reais de cases parecidos com o seu antes de qualquer decisão.',
        warn: true,
    },
    {
        title: 'Entendendo o funcionamento',
        insight:
            'Sem pressão. Nossa equipe te explica o método, os entregáveis e os casos parecidos — você decide só depois. O diagnóstico segue no seu histórico, mesmo que demore pra responder.',
        warn: true,
    },
];

export function getDiagnostic(answers: (string | undefined)[]): Diagnostic {
    const modelo = safe(idx(0, answers[0]), MODELO.length);
    const dor = safe(idx(1, answers[1]), DOR.length);
    const marketing = safe(idx(2, answers[2]), MARKETING.length);
    const investimento = safe(idx(3, answers[3]), PLANO.length);
    const momento = safe(idx(4, answers[4]), MOMENTO.length);

    const d = DOR[dor];
    const m = MODELO[modelo];
    const p = PLANO[investimento];
    const mm = MOMENTO[momento];

    const plan: string[] = [];

    // 1) DOR-specific primary action
    const dorAction = [
        'Instalar tráfego pago estruturado pra gerar fluxo previsível de leads — parando de depender só de indicação.',
        'Auditoria do que já foi gasto antes em anúncios + estrutura de campanha nova com criativo profissional e rastreamento completo.',
        'Reescrita da estratégia de tráfego com foco em venda (não em métrica de vaidade) + relatório semanal de conversão real.',
        'Instalação do WhatsApp com IA — atendimento automatizado 24h que qualifica lead quente antes de ele esfriar.',
    ][dor];
    plan.push(dorAction);

    // 2) Model-specific action
    const modelAction = [
        'Posicionamento de autoridade via conteúdo pago + funil de captura direto pro seu WhatsApp — cada lead chega já aquecido.',
        'Campanhas geolocalizadas por CEP + retargeting de pacientes antigos pra aumentar frequência de retorno.',
        'Criativos de produto com oferta local + campanhas de vitrine virtual pra quem está no raio de X km da loja.',
        'Funil otimizado pra pedido direto via WhatsApp/site próprio com upsell no atendimento — margem maior, menos comissão.',
        'Funil de captação com criativo, nutrição por e-mail e campanha de conversão pro checkout — cada etapa mensurada.',
    ][modelo];
    plan.push(modelAction);

    // 3) Criativo mensal — always included
    plan.push(
        'Produção mensal de criativos profissionais (arte ou vídeo) com copy estratégico alinhado à identidade da sua marca.'
    );

    // 4) Tracking — when marketing maturity is low or measurement is missing
    if (marketing === 0 || marketing === 1 || marketing === 3) {
        plan.push(
            'Instalação completa de rastreamento (Pixel Meta + GA4 + tag de conversão) — cada real anunciado auditado até a venda.'
        );
    }

    // 5) Consultoria / acompanhamento — default final bullet
    if (investimento >= 1) {
        plan.push(
            'Consultoria mensal de estratégia com nosso time — análise de dados, decisões do próximo mês e ajuste de verba.'
        );
    } else {
        plan.push(
            'Grupo VIP com a equipe da ER no WhatsApp — dúvidas respondidas, ajustes rápidos, sem burocracia.'
        );
    }

    return {
        headline: d.headline,
        painTitle: d.title,
        painInsight: d.insight,
        marketingInsight: MARKETING[marketing],
        modelTitle: m.title,
        modelInsight: m.insight,
        planTitle: p.title,
        planPrice: p.price,
        planInsight: p.insight,
        momentTitle: mm.title,
        momentInsight: mm.insight,
        momentWarning: mm.warn,
        actionPlan: plan,
    };
}
