import {
    IconType,
    IconTarget,
    IconChat,
    IconPen,
    IconMonitor,
    IconCamera,
    IconCalendar,
} from './shared';

// Conteúdo das LPs de serviço da Norte. Um objeto por serviço; a página
// (/norte/<slug>) é renderizada pelo template ServicePage a partir daqui.

export interface Service {
    slug: string;
    icon: IconType;
    /** Rótulo curto — usado no card da home e no eyebrow da LP. */
    name: string;
    /** Frase de uma linha usada no card da home. */
    teaser: string;
    /** H1 da LP de serviço. */
    headline: string;
    /** Parágrafo de abertura. */
    intro: string;
    /** O que está incluído na entrega. */
    includes: string[];
    /** Como a Norte executa, em 3 passos. */
    steps: { title: string; body: string }[];
    /** Perfis pra quem o serviço faz sentido. */
    forWho: string[];
    /** Prova social ligada ao serviço. */
    proof: { client: string; metric: string; label: string; body: string };
    /** Meta description da rota (usada no prerender). */
    seoDescription: string;
}

export const SERVICES: Service[] = [
    {
        slug: 'trafego-pago',
        icon: IconTarget,
        name: 'Tráfego Pago',
        teaser: 'Meta, Google e TikTok com régua de CAC e ROAS.',
        headline: 'Verba de mídia tratada como investimento, não como aposta.',
        intro:
            'Campanha não é botão de impulsionar. É estrutura de conta, público certo, criativo testado em volume e evento de conversão configurado pra valer. A gente monta e opera as três plataformas com a mesma régua: quanto entrou, quanto saiu, quanto sobrou.',
        includes: [
            'Estrutura de conta e campanhas do zero (ou reestruturação da existente)',
            'Meta Ads, Google Ads e TikTok Ads conforme o canal que faz sentido',
            'Pixel e API de Conversões (CAPI) configurados e validados',
            'Rotina de teste de criativo e público, com hipótese registrada',
            'Relatório semanal com CPL, CAC e ROAS — sem print de gerenciador',
            'Ajuste de verba conforme performance, com aval do cliente',
        ],
        steps: [
            {
                title: 'Diagnóstico da conta',
                body: 'Auditoria do que já existe: estrutura, tracking, histórico de gasto e onde o dinheiro está vazando hoje.',
            },
            {
                title: 'Estrutura e calibração',
                body: 'Montagem das campanhas, instalação do rastreamento e os primeiros 30 dias de aprendizado do algoritmo.',
            },
            {
                title: 'Escala com método',
                body: 'O que provou retorno recebe mais verba. O que não provou é cortado. Semana a semana, com número na mesa.',
            },
        ],
        forWho: [
            'Negócios que já investem em mídia e não sabem dizer o CAC',
            'Quem tentou impulsionar sozinho e queimou verba sem retorno',
            'Operações prontas pra escalar mas travadas em volume de lead',
        ],
        proof: {
            client: 'Odonto Solutions',
            metric: '5.193 leads',
            label: 'a R$ 1,57 cada',
            body: 'Leads qualificados pra negócios odontológicos, com custo por lead abaixo do praticado no mercado.',
        },
        seoDescription:
            'Gestão de tráfego pago em Manaus: Meta Ads, Google Ads e TikTok Ads com pixel, CAPI e relatório semanal de CAC e ROAS. Agência Norte.',
    },

    {
        slug: 'social-media',
        icon: IconChat,
        name: 'Social Media',
        teaser: 'Feed e stories com planejamento editorial semanal.',
        headline: 'Perfil que constrói marca e sustenta o funil o mês inteiro.',
        intro:
            'Post solto não gera negócio. O que gera é uma linha editorial com intenção: conteúdo que atrai, conteúdo que educa e conteúdo que vende, distribuídos num calendário que o time cumpre de verdade.',
        includes: [
            'Planejamento editorial mensal com temas e formatos definidos',
            'Artes e carrosséis com identidade consistente',
            'Roteiro e edição de reels a partir da captação',
            'Stories com rotina de bastidor, prova social e oferta',
            'Legendas com copy pensada pra conversa, não pra curtida',
            'Relatório de alcance, salvamento e conversas iniciadas',
        ],
        steps: [
            {
                title: 'Imersão de marca',
                body: 'Tom de voz, público, referências e o que já funcionou antes. Sai daqui o guia editorial.',
            },
            {
                title: 'Produção em lote',
                body: 'Conteúdo do mês produzido de uma vez, aprovado com antecedência, publicado no calendário combinado.',
            },
            {
                title: 'Leitura e ajuste',
                body: 'O que salvou e gerou conversa ganha mais espaço no mês seguinte. O resto sai da grade.',
            },
        ],
        forWho: [
            'Marcas com perfil parado ou postando sem constância',
            'Negócios que já têm tráfego e precisam de perfil que sustente a decisão de compra',
            'Quem quer sair do post genérico e ter identidade reconhecível',
        ],
        proof: {
            client: 'App Omnifit',
            metric: '+1M',
            label: 'de alcance',
            body: 'Ampliação de marca via funil KLT, com conteúdo que levou o público do primeiro contato à consideração.',
        },
        seoDescription:
            'Gestão de social media em Manaus: planejamento editorial, artes, reels e stories com relatório de resultado. Agência Norte.',
    },

    {
        slug: 'branding',
        icon: IconPen,
        name: 'Branding',
        teaser: 'Do naming ao manual de aplicação da marca.',
        headline: 'Identidade que faz a marca ser lembrada e escolhida.',
        intro:
            'Marca não é logo. É o conjunto de sinais que faz alguém confiar antes mesmo de conversar com você. A gente constrói esse conjunto do começo: nome, símbolo, paleta, tipografia e as regras que mantêm tudo coerente em qualquer aplicação.',
        includes: [
            'Naming e verificação de disponibilidade quando necessário',
            'Símbolo e logotipo em todas as versões e proporções',
            'Paleta cromática com códigos para digital e impressão',
            'Tipografia e hierarquia de títulos e textos',
            'Aplicações: papelaria, fachada, uniforme, perfil social',
            'Manual de marca em PDF com regras de uso e proibições',
        ],
        steps: [
            {
                title: 'Descoberta',
                body: 'Quem é o negócio, com quem fala, contra quem compete e qual território de marca está livre.',
            },
            {
                title: 'Construção',
                body: 'Rotas visuais apresentadas com fundamento. A escolhida é refinada até virar sistema.',
            },
            {
                title: 'Entrega e manual',
                body: 'Arquivos abertos, versões para cada uso e o manual que mantém a marca íntegra com qualquer fornecedor.',
            },
        ],
        forWho: [
            'Negócios novos que precisam nascer com cara de gente grande',
            'Marcas antigas cuja identidade não representa mais a operação',
            'Quem tem logo mas não tem sistema — cada peça sai diferente',
        ],
        proof: {
            client: 'Norte Marketing',
            metric: '100%',
            label: 'feito em casa',
            body: 'A própria identidade da Norte nasceu desse processo: símbolo, paleta, tipografia e manual de aplicação.',
        },
        seoDescription:
            'Branding e identidade visual em Manaus: naming, logotipo, paleta, tipografia e manual de marca. Agência Norte.',
    },

    {
        slug: 'sites-e-landing-pages',
        icon: IconMonitor,
        name: 'Sites e Landing Pages',
        teaser: 'Páginas rápidas, rastreáveis e feitas pra converter.',
        headline: 'Página que carrega rápido, mede tudo e leva à ação.',
        intro:
            'Site bonito que demora cinco segundos pra abrir perde metade da visita antes do primeiro scroll. A gente entrega página leve, com rastreamento configurado desde o primeiro dia e estrutura de copy desenhada pra levar o visitante a um próximo passo claro.',
        includes: [
            'Landing page ou site institucional sob medida',
            'Copy estruturada por etapa de consciência do público',
            'Performance real: imagens otimizadas e carregamento progressivo',
            'Pixel, tag do Google e eventos de conversão configurados',
            'Formulário ou WhatsApp integrado ao seu fluxo de atendimento',
            'Domínio, hospedagem e certificado configurados',
        ],
        steps: [
            {
                title: 'Arquitetura',
                body: 'Qual objetivo a página tem, quais seções sustentam esse objetivo e qual a ação final esperada.',
            },
            {
                title: 'Construção',
                body: 'Design e código na mesma etapa, testando em celular desde o começo. Nada de layout que quebra no mobile.',
            },
            {
                title: 'Publicação e leitura',
                body: 'No ar com rastreamento validado. Depois, ajustes de copy e seção conforme o comportamento real.',
            },
        ],
        forWho: [
            'Quem vai investir em tráfego e precisa de destino que converta',
            'Negócios sem site ou com site que não atualiza há anos',
            'Lançamentos e campanhas que pedem página própria',
        ],
        proof: {
            client: 'A Escola de Sites',
            metric: '+20 mil',
            label: 'leads gerados',
            body: 'Funil completo de captura e nutrição, com faturamento de múltiplos 7 dígitos em lançamentos.',
        },
        seoDescription:
            'Criação de sites e landing pages em Manaus: página rápida, com pixel e CAPI configurados e copy feita pra converter. Agência Norte.',
    },

    {
        slug: 'captacao-de-conteudo',
        icon: IconCamera,
        name: 'Captação de Conteúdo',
        teaser: 'Equipe audiovisual presencial dentro do seu negócio.',
        headline: 'Bastidor, produto e time viram criativo que vende.',
        intro:
            'Criativo de banco de imagem não para o scroll de ninguém. O que para é o seu produto sendo feito, o seu time trabalhando, o seu cliente reagindo. A gente vai até o seu negócio, capta e devolve material pronto pra anúncio e pra perfil.',
        includes: [
            'Dia de captação presencial no seu negócio',
            'Direção de cena: o que gravar e como gravar pra vender',
            'Vídeos editados em formato vertical para reels e anúncios',
            'Banco de fotos tratadas para site, perfil e campanhas',
            'Legendas, trilha e cortes pensados para retenção',
            'Entrega organizada por pasta e pronta pra subir',
        ],
        steps: [
            {
                title: 'Pré-produção',
                body: 'Roteiro do dia: cenas, ângulos e quem participa. Você sabe exatamente o que vai acontecer.',
            },
            {
                title: 'Captação',
                body: 'Equipe no local com equipamento próprio. Rotina leve, sem travar a operação do negócio.',
            },
            {
                title: 'Edição e entrega',
                body: 'Corte, cor, legenda e trilha. Material entregue pronto pra anúncio e pra publicação orgânica.',
            },
        ],
        forWho: [
            'Restaurantes, lojas e clínicas com operação visualmente rica',
            'Negócios cujo anúncio ainda usa foto genérica de banco',
            'Quem precisa alimentar perfil e campanha com volume de material',
        ],
        proof: {
            client: 'Taychi Sushi Bar',
            metric: '+280%',
            label: 'em reservas mensais',
            body: 'Reels captados dentro do salão levaram o restaurante de R$ 70 mil pra R$ 200 mil por mês.',
        },
        seoDescription:
            'Captação de conteúdo audiovisual em Manaus: equipe presencial, reels editados e banco de fotos para anúncio e perfil. Agência Norte.',
    },

    {
        slug: 'eventos',
        icon: IconCalendar,
        name: 'Eventos',
        teaser: 'Ativações que viram conteúdo e conteúdo que vira venda.',
        headline: 'Evento que não acaba quando as luzes apagam.',
        intro:
            'Evento sem plano de conteúdo é dinheiro que evapora no dia seguinte. A gente planeja a ativação já pensando no que ela vira depois: material de campanha, prova social e base de contatos pra continuar a conversa.',
        includes: [
            'Planejamento da ativação com objetivo de negócio definido',
            'Divulgação com tráfego pago segmentado por região',
            'Cobertura audiovisual completa durante o evento',
            'Captura de contatos com destino ao CRM ou WhatsApp',
            'Material de pós-evento para campanha e perfil',
            'Relatório de presença, alcance e leads gerados',
        ],
        steps: [
            {
                title: 'Planejamento',
                body: 'Qual resultado o evento precisa entregar e como a comunicação sustenta esse resultado.',
            },
            {
                title: 'Divulgação e execução',
                body: 'Campanha de convite, cobertura no dia e captura organizada de contatos.',
            },
            {
                title: 'Desdobramento',
                body: 'O material do evento vira criativo, prova social e sequência de follow-up nas semanas seguintes.',
            },
        ],
        forWho: [
            'Negócios locais com inauguração, feira ou data comemorativa',
            'Marcas que já fazem evento mas não aproveitam o conteúdo depois',
            'Quem quer transformar presença física em base de contato',
        ],
        proof: {
            client: 'Abacazo',
            metric: '+3 lojas',
            label: 'abertas',
            body: 'Expansão de franquia sustentada por ativação local e cadastro de mais de 2 mil clientes por mês.',
        },
        seoDescription:
            'Ativação e cobertura de eventos em Manaus: divulgação com tráfego, captação audiovisual e captura de leads. Agência Norte.',
    },
];

export const findService = (slug: string): Service | undefined =>
    SERVICES.find((s) => s.slug === slug);
