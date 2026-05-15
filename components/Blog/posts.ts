import { Post } from './types';

// All posts ship as one module — the bundle cost is small (text-only)
// and pre-rendering reads from this same source. Order matters: index
// page lists them in the order they appear here.

export const POSTS: ReadonlyArray<Post> = [
    {
        slug: 'melhor-agencia-de-marketing-em-manaus',
        title: 'Qual a melhor agência de marketing em Manaus em 2026?',
        description:
            'Um critério honesto pra escolher agência de marketing digital em Manaus: o que olhar, o que ignorar e por que a maioria das comparações é viciada. Por Ed Rodrigues.',
        publishedAt: '2026-04-22',
        readTime: 6,
        category: 'Mercado · Manaus',
        tags: ['agencia', 'manaus', 'comparativo'],
        body: [
            {
                type: 'p',
                text: 'Toda semana alguém me pergunta qual é a melhor agência de marketing em Manaus. A resposta honesta é: depende do que você precisa. Mas tem critérios objetivos que separam quem entrega de quem só promete — e é sobre eles que vou falar aqui.',
            },
            {
                type: 'h2',
                text: 'O critério errado: portfólio bonito',
            },
            {
                type: 'p',
                text: 'A primeira coisa que a maioria das agências mostra é o portfólio: clientes grandes, marcas conhecidas, frames bonitos. Isso prova que a agência sabe vender. Não prova que ela sabe entregar resultado pra você.',
            },
            {
                type: 'p',
                text: 'Tem agência em Manaus que entrega muito bem pra marca grande e quebra a operação de PME na mão. A escala é outra, o ferramental é outro, o time é outro. Portfólio sem contexto é vaidade.',
            },
            {
                type: 'h2',
                text: 'O critério certo: caso de uso parecido com o seu',
            },
            {
                type: 'p',
                text: 'Pergunte na primeira conversa: "vocês já trabalharam com um negócio do meu porte, no meu nicho, com a minha verba?". Se a resposta for vaga, é resposta. Bons gestores de tráfego têm mapa mental claro de qual ângulo funciona pra cada nicho — porque já testaram.',
            },
            {
                type: 'p',
                text: 'Na [ER Marketing](/) a gente conta os cases por nicho de forma transparente: [Taychi Sushi Bar](/), La Pizza Rio, ITV Manaus e mais 16 operações documentadas. Você vê o número antes de assinar.',
            },
            {
                type: 'h2',
                text: 'O que perguntar antes de fechar',
            },
            {
                type: 'ul',
                items: [
                    'Qual o CAC médio que vocês entregaram no meu nicho?',
                    'Quem é o gestor que vai cuidar da minha conta — e há quanto tempo está na agência?',
                    'Posso ver o último relatório que vocês mandaram pra um cliente parecido com o meu?',
                    'O contrato tem multa pra rescisão antes de 3 meses?',
                    'Vocês trabalham com BI próprio ou só com o painel do Meta/Google?',
                ],
            },
            {
                type: 'callout',
                text: 'Bom sinal: a agência responde com número. Mau sinal: responde com case study.',
            },
            {
                type: 'h2',
                text: 'O ponto cego: capacidade comercial do cliente',
            },
            {
                type: 'p',
                text: 'A melhor agência de marketing em Manaus não consegue entregar resultado se o cliente não tem operação pra atender o que ela gera. Já vi negócio com 50 leads/dia chegando e ninguém pra responder. Esses leads viram churn, viram má reputação, viram cancelamento.',
            },
            {
                type: 'p',
                text: 'Por isso a primeira conversa séria a gente tem é sobre atendimento e funil — não sobre criativo. É o oposto do que a maioria das agências faz.',
            },
            {
                type: 'h2',
                text: 'Conclusão direta',
            },
            {
                type: 'p',
                text: 'A melhor agência de marketing em Manaus pra você é a que tem case do seu porte, transparência no relatório, time fixo e responde sua dúvida com número. Se você quer ver como a gente toca isso na prática, [agende um diagnóstico de 15 minutos](/auditoria-de-lucro-invisivel) — sem compromisso, com plano de 90 dias no final.',
            },
            {
                type: 'cta',
                label: 'Agendar diagnóstico de 15 min',
                href: '/auditoria-de-lucro-invisivel',
            },
        ],
    },

    {
        slug: 'como-performar-campanhas-em-manaus-2026',
        title: 'Como performar suas campanhas em Manaus em 2026',
        description:
            'Tendências de mídia paga, criativo e mensuração que estão definindo as campanhas que escalam em Manaus em 2026 — e os erros mais comuns que travam ROAS no mercado local.',
        publishedAt: '2026-04-08',
        readTime: 7,
        category: 'Tráfego pago',
        tags: ['meta-ads', 'google-ads', 'manaus', '2026'],
        body: [
            {
                type: 'p',
                text: 'A regra de 2022 não funciona mais em 2026. O CPM em Manaus subiu, o iOS mudou o jogo do rastreamento, e os criativos genéricos pararam de performar mesmo dentro do estado. Se você quer escalar agora, precisa ajustar quatro frentes em paralelo.',
            },
            {
                type: 'h2',
                text: '1. Criativo: variedade vence volume',
            },
            {
                type: 'p',
                text: 'O algoritmo do Meta hoje aprende com a velocidade de teste, não com a quantidade de orçamento. Quem roda 30 criativos por mês em 5 ângulos diferentes está deixando quem só sobe 3 versões da mesma arte comendo poeira.',
            },
            {
                type: 'p',
                text: 'Em Manaus tem outro detalhe: criativo com produção local performa 30-40% melhor que criativo "genérico Brasil". O público reconhece. Vale captar dentro do negócio do cliente — comida, atendimento, fachada, time. É exatamente o que a [equipe da ER produz in loco](/) pros parceiros.',
            },
            {
                type: 'h2',
                text: '2. Tracking: pixel sozinho já era',
            },
            {
                type: 'p',
                text: 'Se sua campanha em 2026 só usa o pixel do Meta no navegador, você está perdendo de 30 a 50% dos eventos. iOS 17/18 corta tudo que não vem por API de Conversões (CAPI). Sem CAPI, o algoritmo aprende menos, otimiza pior, e o ROAS cai.',
            },
            {
                type: 'p',
                text: 'A boa notícia: [implementar CAPI](/blog/pixel-eventos-capi-manaus-2026) é projeto de uma semana, e o ganho é imediato. Funciona pra qualquer ferramenta de venda — Shopify, Vtex, WordPress, formulário no WhatsApp.',
            },
            {
                type: 'h2',
                text: '3. Funil: WhatsApp como destino padrão',
            },
            {
                type: 'p',
                text: 'Pra negócio local em Manaus, jogar o lead direto no WhatsApp tem convertido 2 a 3x melhor que mandar pro site. Mas só funciona se você tiver uma máquina de atendimento por trás — script, automação fora do expediente, qualificação antes do humano entrar.',
            },
            {
                type: 'callout',
                text: 'Tráfego sem operação comercial vira frustração. Antes de subir verba, garanta que seu time consegue responder em até 30 minutos no horário e em até 2 horas fora dele.',
            },
            {
                type: 'h2',
                text: '4. Métrica: pare de olhar CPL, comece a olhar CAC',
            },
            {
                type: 'p',
                text: 'Custo por lead é métrica de meio-de-funil. Importa, mas não é a régua. A régua é Custo de Aquisição de Cliente — quanto você gastou em mídia pra cada venda fechada. Sem fechar essa conta, é impossível decidir qual campanha escalar.',
            },
            {
                type: 'p',
                text: 'A gente fala muito disso na nossa [reunião de diagnóstico](/auditoria-de-lucro-invisivel): em 15 minutos a gente olha o seu funil e mostra qual etapa está vazando.',
            },
            {
                type: 'h2',
                text: 'Resumo pra 2026',
            },
            {
                type: 'ul',
                items: [
                    'Criativo diversificado, produzido localmente, testado em alta cadência.',
                    'Pixel + CAPI obrigatórios. Não tem como discutir.',
                    'WhatsApp como destino padrão pra negócio local, com atendimento estruturado.',
                    'CAC como métrica-fim. CPL e CTR como diagnóstico, não como meta.',
                ],
            },
            {
                type: 'cta',
                label: 'Quero auditar minha campanha agora',
                href: '/auditoria-de-lucro-invisivel',
            },
        ],
    },

    {
        slug: 'vale-a-pena-trafego-pago-em-2026',
        title: 'Vale a pena fazer tráfego pago em 2026?',
        description:
            'O CPM subiu, o iOS travou rastreamento e a competição multiplicou. Ainda vale investir em tráfego pago em 2026? A resposta sincera, com números, de quem gerencia + R$ 5 milhões em mídia.',
        publishedAt: '2026-03-25',
        readTime: 6,
        category: 'Estratégia',
        tags: ['trafego-pago', 'meta-ads', 'google-ads', '2026'],
        body: [
            {
                type: 'p',
                text: 'Pergunta sincera merece resposta sincera: sim, vale a pena fazer tráfego pago em 2026 — pra quem tem operação. Pra quem não tem, virou um buraco. O motivo é simples: o mercado amadureceu, então amadorismo agora dói no caixa.',
            },
            {
                type: 'h2',
                text: 'O que mudou desde 2022',
            },
            {
                type: 'ul',
                items: [
                    'CPM em Manaus dobrou em alguns nichos (food, beleza, infoproduto).',
                    'iOS cortou 30-50% dos eventos de pixel via navegador.',
                    'Criativo genérico parou de performar — público pede direção, captação local, narrativa.',
                    'Algoritmo do Meta aprende muito mais rápido com CAPI + eventos servidor.',
                ],
            },
            {
                type: 'h2',
                text: 'Quem vai ganhar dinheiro com tráfego em 2026',
            },
            {
                type: 'p',
                text: 'Três perfis de empresa que ainda escalam com tráfego pago:',
            },
            {
                type: 'ol',
                items: [
                    'Quem tem produto validado e operação comercial que responde em até 30 minutos.',
                    'Quem trata tráfego como sistema (criativo + funil + tracking + atendimento + retenção), não como tática isolada.',
                    'Quem mede CAC e LTV — e tem clareza de quanto pode pagar pra adquirir um cliente.',
                ],
            },
            {
                type: 'h2',
                text: 'Quem vai queimar dinheiro',
            },
            {
                type: 'ul',
                items: [
                    'Quem sobe campanha sem pixel + CAPI configurados.',
                    'Quem só usa um criativo por campanha.',
                    'Quem não responde lead em até 2 horas.',
                    'Quem mede sucesso por curtida, alcance e CTR.',
                    'Quem espera resultado em 7 dias.',
                ],
            },
            {
                type: 'callout',
                text: 'Tráfego pago em 2026 é amplificador. Amplifica negócio que funciona — e amplifica os buracos do que não funciona.',
            },
            {
                type: 'h2',
                text: 'A pergunta que importa antes de subir verba',
            },
            {
                type: 'p',
                text: 'Pergunte pra si: "se eu chegar amanhã com 100 leads novos no WhatsApp, meu time fecha quantos?". Se a resposta for menos de 5%, o problema não é tráfego — é comercial. Subir verba só vai acelerar a perda.',
            },
            {
                type: 'p',
                text: 'É exatamente esse tipo de gargalo invisível que a gente olha na [reunião de diagnóstico de 15 minutos](/auditoria-de-lucro-invisivel). Em troca de uma manhã sua, você sai com clareza de onde está vazando e o plano dos próximos 90 dias.',
            },
            {
                type: 'h2',
                text: 'Conclusão',
            },
            {
                type: 'p',
                text: 'Sim, vale a pena fazer tráfego pago em 2026 — desde que você trate como sistema integrado, não como conta no Meta Ads. A [ER Marketing](/) trabalha com esse modelo há 7 anos, e os cases mostram que funciona quando o cliente entra inteiro no jogo.',
            },
            {
                type: 'cta',
                label: 'Agendar diagnóstico de 15 min',
                href: '/auditoria-de-lucro-invisivel',
            },
        ],
    },

    {
        slug: 'agencia-de-marketing-em-manaus',
        title: 'Agência de marketing em Manaus: o que diferencia quem entrega de quem promete',
        description:
            'Guia completo sobre como escolher uma agência de marketing em Manaus em 2026: critérios, perguntas, sinais de alerta e o que realmente faz diferença no resultado.',
        publishedAt: '2026-03-12',
        readTime: 8,
        category: 'Mercado · Manaus',
        tags: ['agencia-manaus', 'marketing-digital', 'manaus'],
        body: [
            {
                type: 'p',
                text: 'Procurar uma agência de marketing em Manaus em 2026 é mais difícil que parece. O mercado cresceu, surgiram dezenas de operações novas, e cada uma promete os mesmos números. Quem está começando se confunde — e quem está com a casa pegando fogo escolhe rápido, na pressa, e paga caro.',
            },
            {
                type: 'p',
                text: 'Esse guia é o que eu falaria pra um amigo dono de negócio antes dele assinar um contrato. Direto, sem rodeio.',
            },
            {
                type: 'h2',
                text: 'Por que Manaus tem um mercado de agência diferente',
            },
            {
                type: 'p',
                text: 'Três fatores fazem Manaus ser uma praça única no marketing digital brasileiro:',
            },
            {
                type: 'ul',
                items: [
                    'Logística complexa: o que funciona em SP pra delivery não funciona aqui — fluxo é outro.',
                    'Concorrência local concentrada: tem zonas de Manaus que só 4-5 marcas dominam um nicho inteiro.',
                    'Comportamento de consumo único: o cliente manauara responde melhor a captação visual local e narrativa regional.',
                ],
            },
            {
                type: 'p',
                text: 'Uma agência de marketing em Manaus que ignora esses três fatores vai entregar resultado abaixo do mercado, mesmo gastando bem.',
            },
            {
                type: 'h2',
                text: 'O que diferencia uma boa agência em Manaus',
            },
            {
                type: 'h3',
                text: 'Time fixo e nominal',
            },
            {
                type: 'p',
                text: 'Pergunte na primeira reunião quem vai cuidar da sua conta. Nome, função, anos de empresa. Se a resposta for "o time", desconfie. Conta sem dono é conta sem prioridade.',
            },
            {
                type: 'h3',
                text: 'Captação audiovisual presencial',
            },
            {
                type: 'p',
                text: 'Em 2026, criativo genérico não para o scroll. Quem produz dentro do seu negócio — cozinha, vitrine, atendimento, bastidor — gera material que converte porque carrega autenticidade local. A [ER Marketing](/) tem time de captação que vai presencial no cliente todo mês.',
            },
            {
                type: 'h3',
                text: 'BI próprio, não só painel do Meta',
            },
            {
                type: 'p',
                text: 'Painel nativo do Meta e do Google é incompleto. Pra fechar a conta de CAC, LTV e payback você precisa de dashboard próprio que cruza dados de mídia, CRM e financeiro. Agência que ainda manda print do gerenciador de anúncios está atrasada.',
            },
            {
                type: 'h3',
                text: 'Contrato sem amarra de longo prazo',
            },
            {
                type: 'p',
                text: 'Bom serviço se mantém pelo resultado, não pela multa contratual. Quem te prende em 12 meses está pedindo pra você não medir o trabalho dele.',
            },
            {
                type: 'callout',
                text: 'Regra prática: se a agência cobra multa pra rescisão antes de 90 dias, ela já te disse que não confia no próprio resultado.',
            },
            {
                type: 'h2',
                text: 'Sinais de alerta na primeira reunião',
            },
            {
                type: 'ul',
                items: [
                    'Promete ROAS específico antes de olhar sua operação.',
                    'Vende pacote fechado sem entender o seu funil.',
                    'Não pede acesso modo leitura ao seu pixel/Analytics atual.',
                    'Não pergunta nada sobre atendimento comercial e LTV.',
                    'Cobra alto setup mas não detalha entregáveis dos primeiros 30 dias.',
                ],
            },
            {
                type: 'h2',
                text: 'O modelo que a gente trabalha na ER',
            },
            {
                type: 'p',
                text: 'A [nossa metodologia](/) é simples: antes de qualquer contrato, fazemos uma reunião de diagnóstico de 15 minutos. Olhamos seu funil, seu CAC atual, sua capacidade comercial, e devolvemos um plano dos próximos 90 dias. Sem assinatura, sem compromisso. Se a gente fechar, ótimo. Se você ver que faz mais sentido em outro lugar, melhor ainda — pelo menos saiu com clareza.',
            },
            {
                type: 'p',
                text: 'Em 7 anos a gente já passou por [+100 parceiros](/blog/melhor-agencia-de-marketing-em-manaus), entre marcas locais de Manaus, e-commerce nacional e infoproduto. O que a gente entrega tá documentado em número.',
            },
            {
                type: 'h2',
                text: 'Próximo passo',
            },
            {
                type: 'p',
                text: 'Se você quer ver como a ER toca um projeto antes de decidir contratar, a [reunião de diagnóstico](/auditoria-de-lucro-invisivel) é o teste-drive. 15 minutos, sem compromisso, com plano de 90 dias no final.',
            },
            {
                type: 'cta',
                label: 'Agendar com a ER agora',
                href: '/auditoria-de-lucro-invisivel',
            },
        ],
    },

    {
        slug: 'quanto-custa-marketing-digital-em-manaus',
        title: 'Quanto custa fazer marketing digital em Manaus? Guia de investimento por nicho',
        description:
            'Quanto custa contratar marketing digital em Manaus em 2026: faixas reais de investimento por tipo de negócio (e-commerce, restaurante, clínica, serviço local) — sem rodeio.',
        publishedAt: '2026-02-28',
        readTime: 5,
        category: 'Investimento',
        tags: ['precos', 'manaus', 'investimento'],
        body: [
            {
                type: 'p',
                text: 'Pergunta clássica: quanto custa marketing digital em Manaus? Resposta sincera: depende do que você quer (e do que você precisa, que geralmente são duas coisas diferentes). Mas dá pra dar uma régua honesta.',
            },
            {
                type: 'h2',
                text: 'O que você está pagando',
            },
            {
                type: 'p',
                text: 'Marketing digital em Manaus tem três componentes de custo distintos:',
            },
            {
                type: 'ol',
                items: [
                    'Fee da agência (gestão, criativo, estratégia): é o que a agência cobra pelo serviço.',
                    'Verba de mídia (Meta, Google, TikTok): vai direto pras plataformas, não passa pela agência.',
                    'Ferramentas (CRM, automação, BI): assinaturas mensais de SaaS — pode estar incluso ou separado.',
                ],
            },
            {
                type: 'callout',
                text: 'A regra prática: a verba de mídia mensal deveria ser pelo menos 1,5x o fee da agência. Se for menos, ou a agência é cara demais ou você ainda não está pronto pra escalar.',
            },
            {
                type: 'h2',
                text: 'Faixas reais por nicho em Manaus',
            },
            {
                type: 'h3',
                text: 'Restaurante / food service',
            },
            {
                type: 'p',
                text: 'Fee de agência: R$ 1.500 a R$ 4.000/mês. Verba de mídia: R$ 1.000 a R$ 8.000/mês. Total inicial saudável: R$ 2.500 a R$ 5.000/mês. Resultado esperado em 60-90 dias: aumento de 30-100% em pedidos diretos.',
            },
            {
                type: 'h3',
                text: 'E-commerce',
            },
            {
                type: 'p',
                text: 'Fee: R$ 2.000 a R$ 6.000/mês. Verba: R$ 3.000 a R$ 30.000/mês (depende do ticket médio). Total saudável: R$ 5.000+/mês. Setup mínimo recomendado: 90 dias pra calibrar pixel, criativo e funil.',
            },
            {
                type: 'h3',
                text: 'Clínica / consultório',
            },
            {
                type: 'p',
                text: 'Fee: R$ 1.500 a R$ 3.500/mês. Verba: R$ 800 a R$ 4.000/mês. Total: R$ 2.500 a R$ 7.500/mês. Margem de lucro alta justifica investir em qualificação de lead — WhatsApp + IA de triagem entrega muito.',
            },
            {
                type: 'h3',
                text: 'Serviços B2B / high-ticket',
            },
            {
                type: 'p',
                text: 'Fee: R$ 3.000 a R$ 10.000/mês. Verba: R$ 5.000 a R$ 50.000/mês. Total: R$ 8.000+/mês. Ticket médio alto permite CAC mais alto — o jogo é qualificação, não volume.',
            },
            {
                type: 'h2',
                text: 'O que não está nessa lista',
            },
            {
                type: 'p',
                text: 'Se você fatura menos de R$ 10 mil/mês, marketing digital pago provavelmente não é a primeira prioridade. Antes vem produto validado, atendimento estruturado e tracking básico. A gente trata disso na [reunião de diagnóstico](/auditoria-de-lucro-invisivel) — em alguns casos a recomendação honesta é "não invista ainda".',
            },
            {
                type: 'h2',
                text: 'Como a ER cobra',
            },
            {
                type: 'p',
                text: 'A [ER Marketing](/) começa em R$ 1.500/mês de fee, mais R$ 1.000/mês de verba mínima recomendada. Total: R$ 2.500/mês. É o ponto de partida — escala junto com o resultado. Sem multa pra rescisão antes de 90 dias.',
            },
            {
                type: 'cta',
                label: 'Ver se faz sentido pra mim',
                href: '/auditoria-de-lucro-invisivel',
            },
        ],
    },

    {
        slug: 'trafego-pago-restaurantes-manaus-2026',
        title: 'Tráfego pago para restaurantes em Manaus: o que funciona em 2026',
        description:
            'Estratégia de Meta Ads e Google Ads para restaurantes em Manaus em 2026: criativos, funis, plataformas e os erros que destroem o ROAS do dono de restaurante.',
        publishedAt: '2026-02-14',
        readTime: 6,
        category: 'Restaurantes',
        tags: ['restaurantes', 'meta-ads', 'manaus'],
        body: [
            {
                type: 'p',
                text: 'Restaurante em Manaus em 2026 vive um paradoxo: o app delivery (iFood, Rappi) cobra comissão cada vez mais agressiva, mas atrair cliente sem o app virou difícil também. A saída tem nome: tráfego pago direcionado pro WhatsApp do restaurante. E tem método.',
            },
            {
                type: 'h2',
                text: 'O erro número 1: rodar campanha de "alcance"',
            },
            {
                type: 'p',
                text: 'Quando o gerente do Meta sugere campanha de alcance pra restaurante, ele está priorizando o que é fácil de mostrar como resultado (mais views) — não o que vai pagar o aluguel (mais venda). Restaurante precisa de campanha de conversão, otimizando por evento de mensagem no WhatsApp ou de iniciar conversa.',
            },
            {
                type: 'h2',
                text: 'O criativo que para o scroll do manauara',
            },
            {
                type: 'p',
                text: 'Em 2024 a gente testou centenas de criativos pra Taychi Sushi Bar e La Pizza Rio. O que funcionou:',
            },
            {
                type: 'ul',
                items: [
                    'Vídeo curto, captado no salão, com câmera tremida e som ambiente — sensação de "está acontecendo agora".',
                    'Trend de áudio do TikTok adaptado pro produto (pega quem está vendo Reels sem som).',
                    'Pessoas reais (clientes, funcionários, dono) em vez de modelo contratado.',
                    'CTA direto: "vem pra cá hoje" ou "manda um oi no WhatsApp pra reservar".',
                ],
            },
            {
                type: 'callout',
                text: 'Criativo em estúdio com modelo bonita performa pior que vídeo no salão com cliente real. Em food service isso é regra.',
            },
            {
                type: 'h2',
                text: 'O funil que converte',
            },
            {
                type: 'p',
                text: 'Anúncio → clique → WhatsApp Business com automação de boas-vindas → qualificação rápida (data/horário, número de pessoas, pedido) → atendente humano fecha. Em alguns casos, IA de primeiro contato cobre o horário fora do expediente — só não pode ser robótica demais, ou queima a marca.',
            },
            {
                type: 'p',
                text: 'O [Taychi Sushi Bar](/) saiu de R$ 70k/mês pra R$ 200k/mês em 7 meses com esse desenho. Não foi mágica — foi processo.',
            },
            {
                type: 'h2',
                text: 'Quanto investir',
            },
            {
                type: 'p',
                text: 'Restaurante em Manaus que está começando deve subir entre R$ 1.000 e R$ 3.000/mês em verba de Meta Ads, com pelo menos 3 criativos rodando em paralelo. Abaixo disso o algoritmo não aprende rápido. Acima, sem operação comercial preparada, vira leads jogados fora.',
            },
            {
                type: 'h2',
                text: 'O que medir',
            },
            {
                type: 'ol',
                items: [
                    'Custo por conversa iniciada no WhatsApp (CPL).',
                    'Taxa de conversão de conversa pra pedido fechado (CRC).',
                    'Ticket médio dos pedidos vindos de tráfego.',
                    'Retorno em 90 dias (LTV) — cliente do tráfego volta? Quantas vezes?',
                ],
            },
            {
                type: 'p',
                text: 'Sem essas 4 métricas, você está rodando no escuro. A gente cobre exatamente esse setup na [reunião de diagnóstico de 15 minutos](/auditoria-de-lucro-invisivel) — você sai com clareza do que medir e do que ajustar.',
            },
            {
                type: 'cta',
                label: 'Diagnosticar meu restaurante',
                href: '/auditoria-de-lucro-invisivel',
            },
        ],
    },

    {
        slug: 'pequenos-negocios-manaus-competir-trafego-pago',
        title: 'Como pequenos negócios em Manaus competem com grandes marcas via tráfego pago',
        description:
            'Não precisa de orçamento de grande marca pra competir no digital. O guia tático pra pequeno negócio em Manaus vencer a concorrência grande usando tráfego pago em 2026.',
        publishedAt: '2026-02-02',
        readTime: 5,
        category: 'Pequenos negócios',
        tags: ['pequenos-negocios', 'manaus', 'concorrencia'],
        body: [
            {
                type: 'p',
                text: 'Existe um mito de que tráfego pago é jogo de quem tem mais dinheiro. Não é. Em Manaus, especificamente, pequeno negócio tem três vantagens estruturais que grande marca não tem — e que mudam a balança.',
            },
            {
                type: 'h2',
                text: 'Vantagem #1: agilidade pra testar',
            },
            {
                type: 'p',
                text: 'Marca grande aprova criativo em 5 reuniões. Pequeno negócio aprova no WhatsApp. Em 2026, com algoritmo do Meta priorizando velocidade de teste, isso vira ouro: o pequeno consegue subir 10 ângulos diferentes em uma semana enquanto o grande ainda está discutindo a primeira arte com a agência.',
            },
            {
                type: 'h2',
                text: 'Vantagem #2: autenticidade local',
            },
            {
                type: 'p',
                text: 'Cliente em Manaus reconhece quem é manauara de verdade. Loja de bairro com vídeo do próprio dono atendendo vende mais que rede nacional com criativo "Brasil genérico". É comportamento comprovado em [campanhas que a gente roda](/) há anos.',
            },
            {
                type: 'h2',
                text: 'Vantagem #3: nichar geograficamente',
            },
            {
                type: 'p',
                text: 'Marca grande precisa rodar pra Manaus inteira pra justificar o investimento. Pequeno negócio pode focar em 3 bairros estratégicos e dominar. CPM cai, conversão sobe — porque você está falando com quem tem real chance de virar cliente.',
            },
            {
                type: 'callout',
                text: 'A regra que ninguém te conta: pequeno negócio que nicha por bairro e fala com sotaque local supera grande marca rodando "campanha estadual" 9 em 10 vezes.',
            },
            {
                type: 'h2',
                text: 'O que o pequeno precisa pra colocar isso em prática',
            },
            {
                type: 'ul',
                items: [
                    'Verba mínima funcional: R$ 1.000 a R$ 1.500/mês de mídia.',
                    'Disposição pra aparecer no criativo (dono, time, cliente real).',
                    'Atendimento ágil no WhatsApp — resposta em até 30 minutos no horário.',
                    'Acompanhamento semanal do CAC, não mensal.',
                ],
            },
            {
                type: 'h2',
                text: 'A armadilha pra fugir',
            },
            {
                type: 'p',
                text: 'A maior cilada pra pequeno negócio é contratar agência cara que entrega o mesmo template que dá pra cliente grande. Se a agência não adapta a estratégia pro porte e pro bairro do seu negócio, ela está te tratando como linha de produção.',
            },
            {
                type: 'p',
                text: 'A [ER Marketing](/) trabalha com modelo de planos por estágio: ponto de partida em R$ 1.500/mês de fee + R$ 1.000 de verba mínima — desenhado pra negócio em crescimento, com escalada acompanhando o resultado.',
            },
            {
                type: 'cta',
                label: 'Quero competir com gente grande',
                href: '/auditoria-de-lucro-invisivel',
            },
        ],
    },

    {
        slug: 'roi-instagram-2026-como-medir',
        title: 'ROI no Instagram em 2026: como medir o retorno real das suas campanhas',
        description:
            'Curtida não paga aluguel. O guia direto pra medir ROI real no Instagram em 2026: métricas que importam, tracking moderno e como amarrar venda ao post.',
        publishedAt: '2026-01-22',
        readTime: 5,
        category: 'Métrica',
        tags: ['instagram', 'roi', 'metrica'],
        body: [
            {
                type: 'p',
                text: 'A primeira coisa que peço pro cliente novo é: me mostra como você mede ROI no Instagram. 90% me mostra alcance, curtida e seguidor. Nada disso é retorno sobre investimento — é métrica de vaidade vestida de KPI.',
            },
            {
                type: 'h2',
                text: 'O que ROI real significa',
            },
            {
                type: 'p',
                text: 'ROI = (receita gerada por uma ação − custo da ação) ÷ custo da ação. No Instagram, isso significa amarrar cada post, story ou campanha paga a uma venda concreta. Sem tracking adequado, você está estimando — não medindo.',
            },
            {
                type: 'h2',
                text: 'O setup mínimo pra medir',
            },
            {
                type: 'ol',
                items: [
                    'Link específico pra cada campanha (UTM params) — Google Analytics 4 ou GTM.',
                    'Pixel do Meta + API de Conversões configurados no destino (site ou WhatsApp Business).',
                    'CRM ligado nos leads — pra saber quanto cada lead virou de receita.',
                    'Dashboard que cruza mídia × leads × receita por canal.',
                ],
            },
            {
                type: 'p',
                text: 'Faltou qualquer um desses quatro? Seu ROI é estimativa, não medição. Em 2026 com a fragmentação que o iOS trouxe, [implementar CAPI](/blog/pixel-eventos-capi-manaus-2026) já não é opcional.',
            },
            {
                type: 'h2',
                text: 'Métricas que substituem curtida',
            },
            {
                type: 'ul',
                items: [
                    'Custo por conversa iniciada (CPL no WhatsApp).',
                    'Custo por lead qualificado (CPLQ — passou o filtro de atendimento).',
                    'Custo por venda fechada (CAC).',
                    'Receita por mil impressões (RPM) — quanto você ganha pra cada 1000 pessoas alcançadas.',
                    'Frequência saudável (1.5 a 2.5 — acima disso queima o público).',
                ],
            },
            {
                type: 'callout',
                text: 'Curtida não paga aluguel. Receita gerada paga.',
            },
            {
                type: 'h2',
                text: 'O erro mais comum em pequena agência',
            },
            {
                type: 'p',
                text: 'É mandar relatório com print do gerenciador do Meta + alcance do Instagram. Isso não é relatório — é dump de dados. Bom relatório mostra: quanto entrou em receita, quanto saiu em mídia, qual foi o ROAS por campanha, e qual o próximo movimento. Se o seu não tem isso, mude.',
            },
            {
                type: 'h2',
                text: 'Como a gente entrega',
            },
            {
                type: 'p',
                text: 'Na [ER Marketing](/) cada cliente tem dashboard próprio cruzando mídia, CRM e financeiro. Quem assina vê ROI real toda semana — não no fim do mês, não em print. Quer entender como esse setup funciona pro seu caso? [Agenda 15 minutos com a gente](/auditoria-de-lucro-invisivel).',
            },
            {
                type: 'cta',
                label: 'Ver meu ROI real',
                href: '/auditoria-de-lucro-invisivel',
            },
        ],
    },

    {
        slug: 'pixel-eventos-capi-manaus-2026',
        title: 'Pixel, eventos e CAPI: por que sua campanha em Manaus não escala sem isso em 2026',
        description:
            'Por que pixel sozinho não basta em 2026, como configurar CAPI (API de Conversões) e por que seus criativos não escalam sem eventos servidor — guia direto.',
        publishedAt: '2026-01-08',
        readTime: 6,
        category: 'Técnico',
        tags: ['capi', 'pixel', 'meta-ads', 'tracking'],
        body: [
            {
                type: 'p',
                text: 'O pixel do Meta foi o padrão ouro de tracking entre 2018 e 2021. Em 2026 ele virou metade do padrão — sem CAPI (API de Conversões servidor a servidor) ele perde de 30 a 50% dos eventos. E sem evento, o algoritmo não otimiza. E sem otimização, sua campanha não escala.',
            },
            {
                type: 'h2',
                text: 'O que matou o pixel sozinho',
            },
            {
                type: 'ul',
                items: [
                    'iOS 14.5 (2021): App Tracking Transparency — usuário opta por não ser rastreado.',
                    'iOS 17/18 (2024/2025): bloqueio de cookies de 3rd party + Private Relay padrão no iCloud+.',
                    'Bloqueadores de anúncio em desktop alcançando 30%+ do tráfego em Brasil.',
                ],
            },
            {
                type: 'p',
                text: 'Resultado: cada venda que acontece via iPhone em modo privado, ou via desktop com AdBlock, ou via Safari com ITP ativo, não chega no Meta. O algoritmo treina menos. E começa a entender errado quem é seu público.',
            },
            {
                type: 'h2',
                text: 'O que a CAPI resolve',
            },
            {
                type: 'p',
                text: 'CAPI manda eventos do seu servidor diretamente pra Meta, sem depender do navegador do usuário. Compra, lead, formulário, view — tudo passa por um caminho que o iOS não bloqueia. O ganho típico em campanhas é:',
            },
            {
                type: 'ul',
                items: [
                    'Recuperação de 30-50% dos eventos perdidos.',
                    'Aprendizado do algoritmo 2-3x mais rápido.',
                    'ROAS médio 15-30% maior após 30 dias de calibração.',
                    'Possibilidade de subir verba sem perder eficiência.',
                ],
            },
            {
                type: 'h2',
                text: 'Como configurar (sem virar engenheiro)',
            },
            {
                type: 'p',
                text: 'Três caminhos, do mais simples ao mais robusto:',
            },
            {
                type: 'ol',
                items: [
                    'Plugin no Shopify/WordPress: PixelYourSite, Conversions API Gateway, Stape. 30 minutos de setup.',
                    'GTM Server-Side (Google Tag Manager servidor): requer um pouco mais de configuração mas é o padrão profissional.',
                    'Integração via API custom: feito por desenvolvedor — máxima flexibilidade pra negócios com stack proprietário.',
                ],
            },
            {
                type: 'callout',
                text: 'Se sua agência cobra extra pra configurar CAPI em 2026, ela não está atualizada com o padrão atual. Deveria estar incluso no setup do projeto.',
            },
            {
                type: 'h2',
                text: 'O que medir depois que CAPI sobe',
            },
            {
                type: 'ul',
                items: [
                    'EMQ (Event Match Quality) — qualidade do match dos eventos com usuário. Mira acima de 7.0.',
                    'Cobertura de eventos vs pixel sozinho — quantos % a mais a CAPI capturou.',
                    'Tempo até o algoritmo sair de "learning phase" — geralmente cai 30-50%.',
                ],
            },
            {
                type: 'p',
                text: 'A gente faz esse setup completo em qualquer projeto que entra na [ER Marketing](/). Não é cobrado separado, faz parte do mínimo viável de operação de tráfego em 2026.',
            },
            {
                type: 'h2',
                text: 'Próximo passo',
            },
            {
                type: 'p',
                text: 'Se você está rodando Meta Ads sem CAPI agora, é praticamente certo que está perdendo escala. A [reunião de diagnóstico de 15 minutos](/auditoria-de-lucro-invisivel) começa exatamente olhando seu tracking — e em 5 minutos a gente já consegue dizer qual é o gargalo.',
            },
            {
                type: 'cta',
                label: 'Auditar meu tracking agora',
                href: '/auditoria-de-lucro-invisivel',
            },
        ],
    },
];

// Lookup helper used by the dynamic route on the post page.
export const findPostBySlug = (slug: string): Post | undefined =>
    POSTS.find((p) => p.slug === slug);

// Returns up to 3 "related" posts — same tags first, then chronological.
// Used by the bottom-of-post recirculation rail.
export const relatedPosts = (current: Post, limit = 3): ReadonlyArray<Post> => {
    const others = POSTS.filter((p) => p.slug !== current.slug);
    const scored = others.map((p) => ({
        post: p,
        score: p.tags.filter((t) => current.tags.includes(t)).length,
    }));
    return scored
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map((s) => s.post);
};
