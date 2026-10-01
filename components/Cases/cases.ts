// Fonte única dos cases da Norte.
//
// Os números aqui não são novos: foram levantados de ClientResults.tsx (os
// cards de resultado impressos, métrica exata por marca) e de
// FeaturedCases.tsx (os dois cases que já tinham desafio, depoimento e
// fotos). Este arquivo só reúne os dois num lugar só, pra que a página
// /cases e as páginas individuais leiam da mesma origem em vez de cada
// componente carregar a sua cópia.
//
// Regra: só entra aqui número que já estava publicado no site. Case novo
// precisa do dado medido antes de virar entrada — página de case sem número
// é página fina, e página fina dilui em vez de ranquear.

export interface CaseStat {
    value: string;
    label: string;
}

/** Detalhe extra. Só os cases que têm isso ganham página própria — o resto
 *  vive na /cases, porque com uma linha de conteúdo a página seria fina. */
export interface CaseDetail {
    location: string;
    nicheTag: string;
    /** O cenário de quando o cliente chegou. */
    challenge: string;
    stats: CaseStat[];
    quote: string;
    author: string;
    hero: string;
    gallery: string[];
    /** O que a Norte executou. Cada item sai da operação registrada do case. */
    approach: { title: string; body: string }[];
    seoTitle: string;
    seoDescription: string;
}

export interface CaseEntry {
    client: string;
    handle: string;
    /** A métrica principal, do jeito que está no card impresso. */
    headline: string;
    body: string;
    category: string;
    premium: boolean;
    /** Presente só quando o case tem página própria. */
    slug?: string;
    detail?: CaseDetail;
}

export const CASES: ReadonlyArray<CaseEntry> = [
    {
        client: 'Taychi Sushi Bar',
        handle: '@taychisushi',
        headline: '70k → 200k/mês',
        body: 'em 7 meses, com funis de conversão direcionados pra loja física.',
        category: 'Restaurante',
        premium: true,
        slug: 'taychi-sushi-bar',
        detail: {
            location: 'Manaus · AM',
            nicheTag: 'Restaurante · sushi',
            challenge:
                'Salão cheio no fim de semana, mesas vazias na semana. Sem captação ativa, dependia 100% de indicação — e o caixa refletia isso.',
            stats: [
                { value: '+280%', label: 'em reservas mensais' },
                { value: '7 meses', label: 'de 70k pra 200k/mês' },
                { value: 'fila', label: 'de espera no fim de semana' },
            ],
            quote:
                'Em dois meses o sushi bar tinha fila de espera no fim de semana. Algo que nunca tinha acontecido antes.',
            author: 'Proprietário, Taychi Sushi Bar',
            hero: '/photos-food/t-1.jpg',
            gallery: ['/photos-food/t-2.jpg', '/photos-food/t-3.jpg', '/photos-food/t-4.jpg'],
            approach: [
                {
                    title: 'Captação ativa no lugar da indicação',
                    body: 'O restaurante não tinha nenhuma fonte de demanda própria: quem aparecia vinha por indicação ou por acaso. A primeira frente foi montar campanha que traz gente nova com intenção de reservar, e não só alcance.',
                },
                {
                    title: 'Funil apontado pra loja física',
                    body: 'Rodízio não se resolve no clique. O funil foi desenhado pra levar a pessoa até a reserva na unidade, com a mensagem e o público ajustados pra quem está na praça e decide onde jantar.',
                },
                {
                    title: 'O dia de semana como alvo separado',
                    body: 'O gargalo não era o fim de semana, era a semana. Tratar os dois como o mesmo problema é o que faz verba virar mais movimento no sábado — quando o que faltava era terça.',
                },
            ],
            seoTitle: 'Case Taychi Sushi Bar: de R$ 70 mil a R$ 200 mil/mês em 7 meses',
            seoDescription:
                'Como o Taychi Sushi Bar saiu de R$ 70 mil pra R$ 200 mil por mês em 7 meses, com +280% em reservas e fila de espera no fim de semana. Case da Norte Marketing, com o número e o que foi feito.',
        },
    },
    {
        client: 'La Pizza Rio',
        handle: '@lapizzario',
        headline: '+190% em pedidos diretos',
        body: 'no WhatsApp, com ROAS de 4,1x e custo por lead de R$ 9,40.',
        category: 'Restaurante',
        premium: true,
        slug: 'la-pizza-rio',
        detail: {
            location: 'Manaus · AM',
            nicheTag: 'Pizzaria · delivery',
            challenge:
                'Crescer o delivery sem depender de marketplace. Construir uma base própria com margem maior e cliente que volta no WhatsApp, não no iFood.',
            stats: [
                { value: '+190%', label: 'em pedidos diretos no WhatsApp' },
                { value: '4,1x', label: 'de retorno em mídia' },
                { value: 'R$ 9,40', label: 'custo por lead' },
            ],
            quote:
                'A taxa de conversão triplicou. E a margem foi junto porque paramos de pagar comissão de marketplace.',
            author: 'Proprietário, La Pizza Rio',
            hero: '/photos-food/p-1.jpg',
            gallery: ['/photos-food/p-2.jpg', '/photos-food/p-3.jpg', '/photos-food/p-4.jpg'],
            approach: [
                {
                    title: 'Pedido direto no lugar da comissão',
                    body: 'Volume por marketplace parece crescimento e come margem: cada pedido sai com comissão e o cliente fica sendo do app, não da pizzaria. A frente principal foi mover a demanda pro WhatsApp, onde o pedido é direto e a base é própria.',
                },
                {
                    title: 'Custo por lead como régua diária',
                    body: 'Delivery tem ticket baixo, então o custo por lead define se a conta fecha. Com R$ 9,40 de CPL e 4,1x de retorno, dava pra escalar sabendo que cada real a mais em mídia voltava — e não apostando que voltava.',
                },
                {
                    title: 'Base própria pra segunda compra',
                    body: 'Pedido direto deixa contato e histórico na mão da pizzaria. Isso muda o jogo do mês seguinte: a segunda compra deixa de depender de anúncio novo, porque dá pra chamar quem já comprou.',
                },
            ],
            seoTitle: 'Case La Pizza Rio: +190% em pedidos diretos e ROAS de 4,1x',
            seoDescription:
                'Como a La Pizza Rio cresceu 190% em pedidos diretos no WhatsApp, com ROAS de 4,1x e CPL de R$ 9,40, saindo da dependência de marketplace. Case da Norte Marketing.',
        },
    },

    // ── Os demais vivem na /cases. Métrica exata, sem página própria
    //    enquanto não houver desafio e operação registrados.
    { client: 'Oli e Sofi', handle: '@olisofi', headline: '+300% no faturamento', body: 'do e-commerce de roupas de bebê, em receita total.', category: 'E-commerce', premium: false },
    { client: 'Dermo Ervas', handle: '@dermoervas', headline: '+200% de faturamento', body: 'do e-commerce de encapsulados, em estratégia integrada.', category: 'E-commerce', premium: false },
    { client: 'A Escola de Sites', handle: '@aescoladesites', headline: '+20 mil leads gerados', body: 'e faturamento de múltiplos 7 dígitos em lançamentos.', category: 'Infoproduto', premium: true },
    { client: 'Propriedades Compartilhadas', handle: '@propriedadescompartilhadas', headline: '+10 mil leads · 8 dígitos', body: 'faturamento de múltiplos 8 dígitos com funis perpétuos.', category: 'Infoproduto', premium: true },
    { client: 'Full Sales System', handle: '@fullsalessystem', headline: '+560 leads/mês', body: 'para funis de ticket variando entre R$ 6k e R$ 30k/mês.', category: 'Mentoria', premium: true },
    { client: 'Amazon One', handle: '@amazonone_ofertas', headline: 'R$ 1M de faturamento', body: 'em 6 meses de aplicação da estratégia de aumento de leads.', category: 'Varejo local', premium: false },
    { client: 'Odonto Solutions', handle: '@odonto_solutions', headline: '5.193 leads a R$ 1,57', body: 'leads ultra qualificados pra negócios odontológicos.', category: 'Saúde', premium: true },
    { client: 'Pandora Eletrônicos', handle: '@pandora_eletronicos', headline: '+500 leads/mês', body: 'interessados em produtos Apple, todo mês.', category: 'Varejo', premium: false },
    { client: 'Conceito Obras', handle: '@conceito.obras', headline: '+150 leads/mês', body: 'qualificados pra projetos de Steel Frame, mês a mês.', category: 'Construção', premium: false },
    { client: 'Bem Fisio', handle: '@bem_fisio_fisioterapia', headline: '+450 leads/mês', body: 'qualificados pro segmento de fisioterapia.', category: 'Saúde', premium: false },
    { client: 'Bembê Atelier', handle: '@bembeatelier', headline: '+167% em vendas', body: 'mensais para o atelier de brinquedos de tecido.', category: 'E-commerce', premium: false },
    { client: 'Tecno Obras', handle: '@tecnoobras_', headline: '+500 mil views/mês', body: 'atingindo o Top of Mind do público de construções em Curitiba.', category: 'Construção', premium: false },
    { client: 'Reifel Confecções', handle: '@reiwiuconfeccoes', headline: 'R$ 10k → R$ 30k/mês', body: 'em 3 meses no e-commerce, com aumento contínuo nas vendas.', category: 'E-commerce', premium: false },
    { client: 'Abacazo', handle: '@abacazo', headline: '+3 lojas abertas', body: 'cadastro de mais de 2 mil clientes/mês na rede.', category: 'Franquia', premium: true },
    { client: 'App Omnifit', handle: '@app.omnifit', headline: '+1M de alcance', body: 'em ampliação de marca via funil KLT.', category: 'App', premium: true },
    { client: 'English Vip', handle: '@englishvipensinodeidioma', headline: '+257% de alcance', body: 'em potenciais clientes para vendas via WhatsApp.', category: 'Educação', premium: false },
    { client: 'iTV Manaus', handle: '@itvmanaus', headline: 'R$ 15k de faturamento', body: 'com leads a R$ 0,50/dia pra serviço de assistência de TV.', category: 'Serviços', premium: false },
    { client: 'A Jogada', handle: '@ajogada', headline: '+132% em vendas', body: 'em funil de venda direta para produto de R$ 97,90.', category: 'E-commerce', premium: false },
];

/** Só os que têm página própria — alimenta as rotas e o sitemap. */
export const CASES_WITH_PAGE = CASES.filter(
    (c): c is CaseEntry & { slug: string; detail: CaseDetail } =>
        Boolean(c.slug && c.detail),
);

export const findCase = (slug: string) =>
    CASES_WITH_PAGE.find((c) => c.slug === slug);

/** Categorias na ordem em que aparecem, pro agrupamento da /cases. */
export const CASE_CATEGORIES = CASES.reduce<string[]>((acc, c) => {
    if (!acc.includes(c.category)) acc.push(c.category);
    return acc;
}, []);
