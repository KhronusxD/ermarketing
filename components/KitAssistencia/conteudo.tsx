import React from 'react';
import { useRevealOnView } from '../motion';

// Conteúdo e identidade do Kit, num lugar só.
//
// Duas páginas vendem o mesmo produto: a LP (/kit-assistencia-tecnica-plus)
// e a aula em vídeo (/kit-aula), que abre o conteúdo depois de um tempo
// assistido. Os cinco módulos, o FAQ e as maquetes são os mesmos nas duas.
//
// Ficavam escritos dentro da LP. Com a aula passando a mostrar tudo isso
// embaixo do vídeo, manter duas cópias significava que a primeira correção
// de preço ou de prazo ia valer só numa das páginas — e ninguém descobre
// isso olhando, só quando um cliente cobra o que leu na outra.

// ─── Paleta e tipografia (playbook do produto) ───
export const BG = '#131316';
export const PANEL = '#1C1D22';
export const PANEL_HI = '#222329';
export const RED = '#E3242B';
export const RED_DARK = '#B0141B';
export const INK = '#F5F5F7';
export const MUTED = '#A6A9B0';
export const LINE = '#33343B';

export const DISPLAY = 'font-kit font-bold uppercase leading-[0.92] tracking-[-0.01em]';
export const LABEL = 'font-mono text-[10px] tracking-[0.18em] uppercase';

// ─── As cinco peças ───
export const MODULOS = [
    {
        n: '01',
        nome: 'LP Profissional',
        texto:
            'Uma página de orçamento com um objetivo só: transformar quem chega em pedido de orçamento no seu WhatsApp. Sem menu, sem distração, sem "quem somos".',
    },
    {
        n: '02',
        nome: 'Campanha no Google',
        texto:
            'De 2 a 3 campanhas montadas dentro da sua própria conta do Google Ads, com segmentação da sua região. Você define a verba e ativa. Conserto é demanda de pesquisa: o cliente já está procurando.',
    },
    {
        n: '03',
        nome: 'Script de Vendas',
        texto:
            'Os roteiros de WhatsApp que faltam: primeira resposta, follow-up de orçamento parado, recuperação de cliente que sumiu e oferta de serviço adicional.',
    },
    {
        n: '04',
        nome: 'Google Meu Negócio',
        texto:
            'Perfil otimizado de ponta a ponta — fotos, descrição, lista de serviços e resposta às avaliações. É o que decide quem aparece no mapa quando alguém busca conserto por perto.',
    },
    {
        n: '05',
        nome: 'Atendente de WhatsApp com IA',
        texto:
            'CRM com atendente de IA 24h pela Gyrehub. O primeiro mês vem incluso no kit. Depois é opcional, a partir de R$ 250/mês — e sem renovação automática: se você não quiser seguir, simplesmente acaba.',
        plus: true,
    },
];

// Maquete de cada peça. Tudo HTML e CSS: nenhuma imagem entra no bundle
// e nada serrilha em tela densa.
export const Mock: React.FC<{ n: string }> = ({ n }) => {
    const bar = 'rounded-full';
    const cinza = { backgroundColor: '#3A3B43' };

    if (n === '01')
        return (
            <div className="rounded-md overflow-hidden border" style={{ borderColor: LINE, backgroundColor: '#0D0E11' }}>
                <div className="flex items-center gap-1 px-2.5 py-2 border-b" style={{ borderColor: LINE }}>
                    {[0, 1, 2].map((i) => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full" style={cinza} />
                    ))}
                    <span className={`ml-2 h-1.5 flex-1 ${bar}`} style={cinza} />
                </div>
                <div className="p-3">
                    <div className="h-8 rounded mb-2" style={{ background: `linear-gradient(90deg, ${RED}40, transparent)` }} />
                    <div className={`h-1.5 w-3/4 ${bar} mb-1.5`} style={cinza} />
                    <div className={`h-1.5 w-1/2 ${bar} mb-3`} style={cinza} />
                    <span className="block h-5 w-24 rounded" style={{ backgroundColor: RED }} />
                </div>
            </div>
        );

    if (n === '02')
        return (
            <div className="rounded-md border p-3 space-y-2.5" style={{ borderColor: LINE, backgroundColor: '#0D0E11' }}>
                {[0, 1, 2].map((i) => (
                    <div key={i} className="flex items-start gap-2">
                        <span
                            className="font-mono text-[7px] px-1 py-0.5 rounded flex-shrink-0"
                            style={{ backgroundColor: i === 0 ? RED : '#2A2B32', color: INK }}
                        >
                            {i === 0 ? 'AD' : '—'}
                        </span>
                        <span className="flex-1">
                            <span className={`block h-1.5 ${bar} mb-1`} style={{ ...cinza, width: `${88 - i * 16}%` }} />
                            <span className={`block h-1.5 w-2/5 ${bar}`} style={{ backgroundColor: '#2A2B32' }} />
                        </span>
                    </div>
                ))}
            </div>
        );

    if (n === '03')
        return (
            <div className="rounded-md border p-3 space-y-2" style={{ borderColor: LINE, backgroundColor: '#0D0E11' }}>
                <span className="block w-[70%] rounded-lg rounded-tl-sm px-2.5 py-2" style={{ backgroundColor: '#22232A' }}>
                    <span className={`block h-1.5 w-full ${bar} mb-1`} style={cinza} />
                    <span className={`block h-1.5 w-2/3 ${bar}`} style={cinza} />
                </span>
                <span className="block w-[78%] ml-auto rounded-lg rounded-br-sm px-2.5 py-2" style={{ backgroundColor: RED }}>
                    <span className={`block h-1.5 w-full ${bar} mb-1`} style={{ backgroundColor: '#ffffff70' }} />
                    <span className={`block h-1.5 w-3/5 ${bar}`} style={{ backgroundColor: '#ffffff70' }} />
                </span>
            </div>
        );

    if (n === '04')
        return (
            <div className="rounded-md border p-3" style={{ borderColor: LINE, backgroundColor: '#0D0E11' }}>
                <div className="flex items-center gap-2.5 mb-3">
                    <span className="w-8 h-8 rounded flex-shrink-0" style={{ backgroundColor: '#22232A' }} />
                    <span className="flex-1">
                        <span className={`block h-1.5 w-2/3 ${bar} mb-1.5`} style={cinza} />
                        <span className="flex gap-0.5" aria-hidden="true">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <span key={i} className="text-[8px]" style={{ color: RED }}>★</span>
                            ))}
                        </span>
                    </span>
                </div>
                <div className="h-10 rounded relative overflow-hidden" style={{ backgroundColor: '#191A20' }}>
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: RED }} />
                </div>
            </div>
        );

    return (
        <div className="rounded-md border p-3" style={{ borderColor: LINE, backgroundColor: '#0D0E11' }}>
            <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center font-mono text-[8px] flex-shrink-0" style={{ backgroundColor: RED, color: INK }}>
                    IA
                </span>
                <span className={`h-1.5 w-1/3 ${bar}`} style={cinza} />
                <span className="ml-auto font-mono text-[7px]" style={{ color: MUTED }}>24h</span>
            </div>
            <span className="block w-[72%] rounded-lg rounded-tl-sm px-2.5 py-2 mb-2" style={{ backgroundColor: '#22232A' }}>
                <span className={`block h-1.5 w-full ${bar} mb-1`} style={cinza} />
                <span className={`block h-1.5 w-1/2 ${bar}`} style={cinza} />
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg px-2.5 py-2" style={{ backgroundColor: '#22232A' }}>
                {[0, 1, 2].map((i) => (
                    <span key={i} className="w-1 h-1 rounded-full animate-bounce" style={{ backgroundColor: MUTED, animationDelay: `${i * 0.15}s` }} />
                ))}
            </span>
        </div>
    );
};

export const FAQ = [
    {
        q: 'Isso não é caro?',
        a: 'Faz a conta pelo seu ticket: quantas telas você troca pra cobrir R$ 997? Agora compara com agência, que cobra perto disso todo mês, sem parar. Aqui é uma vez só e a estrutura fica sua.',
    },
    {
        q: 'Eu já tenho quem faz minhas artes.',
        a: 'O kit não é arte. Arte fala com quem já te segue. O que a gente monta é estrutura pra aparecer pra quem ainda não te conhece e está procurando conserto agora.',
    },
    {
        q: 'Já tentei anúncio e não deu certo.',
        a: 'Na maioria das vezes o problema não foi o anúncio: foi mandar o clique pro Instagram ou pro WhatsApp sem página, sem roteiro e sem perfil no mapa. Anúncio sem estrutura embaixo queima verba mesmo.',
    },
    {
        q: 'Quanto preciso investir em anúncio?',
        a: 'A verba é sua e fica na sua conta do Google — a gente nunca toca no seu dinheiro. A recomendação pra começar é a partir de R$ 30 por dia, e dá pra subir ou parar quando você quiser.',
    },
    {
        q: 'E se não ficar pronto no prazo?',
        a: 'Devolvo 100%. O prazo de 5 dias úteis começa a contar quando o pagamento é confirmado e o formulário de onboarding está respondido — se a resposta demorar, o relógio para junto.',
    },
    {
        q: 'Depois da entrega eu fico sozinho?',
        a: 'Não. Tem uma rodada de ajustes até 7 dias depois da entrega e suporte a dúvidas por 15 dias. Se você quiser que eu siga cuidando das campanhas todo mês, isso existe à parte — mas não é obrigatório.',
    },
];

// Célula de módulo: sobe de baixo quando entra na tela, com a maquete em cima.
export const ModuloCard: React.FC<{ m: (typeof MODULOS)[number]; col: number }> = ({ m, col }) => {
    const [ref, state] = useRevealOnView<HTMLDivElement>();
    return (
        <div
            ref={ref}
            className={`svc ${state === 'off' ? 'svc-off' : ''} rounded-lg border p-6 md:p-7 flex flex-col`}
            style={{
                borderColor: m.plus ? RED_DARK : LINE,
                backgroundColor: m.plus ? PANEL_HI : PANEL,
                transitionDelay: `${col * 90}ms`,
            }}
        >
            <div className="flex items-center justify-between gap-3 mb-5">
                <span className={LABEL} style={{ color: RED }}>
                    Módulo {m.n}
                </span>
                {m.plus && (
                    <span className={`${LABEL} px-2 py-1 rounded`} style={{ backgroundColor: RED, color: INK }}>
                        Plus
                    </span>
                )}
            </div>

            <div className="mb-5">
                <Mock n={m.n} />
            </div>

            <h3 className={`${DISPLAY} text-[26px] mb-3`}>{m.nome}</h3>
            <p className="text-[15px] leading-relaxed" style={{ color: MUTED }}>
                {m.texto}
            </p>
        </div>
    );
};

// ─── Prova social ──────────────────────────────────────────────────────
//
// COMPLIANCE (playbook, Seção 8, regra 1): a autorização por escrito da
// iTV Manaus e da SOS TV ainda não chegou. Enquanto não chegar, nada aqui
// nomeia cliente — os painéis de campanha e as avaliações não mostram o
// nome do negócio, então podem entrar; o perfil do Google Meu Negócio e
// os sites mostram, e ficam de fora.
//
// Quando a autorização sair, é virar esta constante pra true: os dois
// perfis entram e as legendas passam a poder dizer de quem são.
export const AUTORIZADO_CITAR_CLIENTE = false;

// Painéis das contas que o Ed gere. Os números são das campanhas, não
// promessa de repetição — o aviso ao pé da seção não é opcional.
export const PAINEIS = [
    {
        src: '/kit/prova/painel-google-1.webp',
        w: 1400,
        h: 495,
        alt: 'Painel do Google Ads mostrando 79,1 mil cliques e 15 mil conversões a R$ 4,42 cada',
        titulo: 'Google Ads · assistência A',
        nota: '79,1 mil cliques e 15 mil conversões, a R$ 4,42 por conversão.',
    },
    {
        src: '/kit/prova/painel-google-2.webp',
        w: 1400,
        h: 346,
        alt: 'Painel do Google Ads mostrando 96,3 mil cliques e 11,4 mil conversões',
        titulo: 'Google Ads · assistência B',
        nota: '96,3 mil cliques e 11,4 mil conversões em 4,93 milhões de exibições.',
    },
    {
        src: '/kit/prova/painel-meta-1.webp',
        w: 1400,
        h: 210,
        alt: 'Painel do Meta Ads com três campanhas de captação por WhatsApp',
        titulo: 'Meta Ads · captação no WhatsApp',
        nota: 'Conversa iniciada saindo entre R$ 0,76 e R$ 1,14.',
    },
];

// Seis avaliações — o mesmo número que a vitrine em pulso espera por
// volta (a faixa duplica o conteúdo e anda de um sexto por passo).
export const AVALIACOES = [
    { src: '/kit/prova/aval-1.webp', w: 760, h: 368 },
    { src: '/kit/prova/aval-2.webp', w: 760, h: 457 },
    { src: '/kit/prova/aval-3.webp', w: 760, h: 375 },
    { src: '/kit/prova/aval-4.webp', w: 760, h: 372 },
    { src: '/kit/prova/aval-5.webp', w: 760, h: 452 },
    { src: '/kit/prova/aval-6.webp', w: 760, h: 490 },
];

export const PERFIS = [
    { src: '/kit/prova/perfil-maps-1.webp', w: 820, h: 1077, alt: 'Perfil no Google Meu Negócio com nota 4,9' },
    { src: '/kit/prova/perfil-maps-2.webp', w: 820, h: 987, alt: 'Perfil no Google Meu Negócio otimizado' },
];

export const Provas: React.FC<{ compacto?: boolean }> = ({ compacto }) => (
    <section className="border-y" style={{ borderColor: LINE, backgroundColor: PANEL }}>
        <div className={`${compacto ? 'max-w-[1000px]' : 'max-w-[1120px]'} mx-auto px-5 md:px-8 py-14 md:py-20`}>
            <span className={`${LABEL} inline-block mb-5`} style={{ color: RED }}>
                Print das contas
            </span>
            <h2 className={`${DISPLAY} text-[clamp(30px,5vw,50px)] max-w-[20ch] mb-5`}>
                Não é slide bonito. É o painel aberto.
            </h2>
            <p className="text-[16px] md:text-[17px] leading-relaxed max-w-2xl mb-10" style={{ color: MUTED }}>
                São contas de assistência técnica que eu gerencio hoje. Os nomes ficam
                de fora porque a autorização pra citá-los ainda não saiu — os números
                estão do jeito que o painel mostra.
            </p>

            <div className="grid grid-cols-1 gap-3 mb-3">
                {PAINEIS.map((p) => (
                    <figure
                        key={p.src}
                        className="rounded-lg border overflow-hidden"
                        style={{ borderColor: LINE, backgroundColor: BG }}
                    >
                        <img
                            src={p.src}
                            width={p.w}
                            height={p.h}
                            alt={p.alt}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-auto block"
                        />
                        <figcaption className="px-5 py-4 border-t" style={{ borderColor: LINE }}>
                            <span className={`${LABEL} block mb-1.5`} style={{ color: RED }}>
                                {p.titulo}
                            </span>
                            <span className="text-[14px]" style={{ color: MUTED }}>
                                {p.nota}
                            </span>
                        </figcaption>
                    </figure>
                ))}
            </div>

            {/* Nota do perfil + avaliações. O módulo 04 é justamente cuidar
                do perfil no mapa; é ali que essa prova encosta. */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <figure
                    className="rounded-lg border overflow-hidden lg:col-span-1"
                    style={{ borderColor: LINE, backgroundColor: BG }}
                >
                    <img
                        src="/kit/prova/nota-maps.webp"
                        width={780}
                        height={447}
                        alt="Distribuição de notas do perfil: 4,9 de média em 1.337 avaliações"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto block"
                    />
                    <figcaption className="px-5 py-4 border-t" style={{ borderColor: LINE }}>
                        <span className={`${LABEL} block mb-1.5`} style={{ color: RED }}>
                            O perfil no mapa
                        </span>
                        <span className="text-[14px]" style={{ color: MUTED }}>
                            4,9 de média em 1.337 avaliações. Quem cuida do perfil e
                            responde as avaliações é o módulo 04.
                        </span>
                    </figcaption>
                </figure>

                <div
                    className="rounded-lg border overflow-hidden lg:col-span-2 rr"
                    style={{ borderColor: LINE, backgroundColor: BG }}
                >
                    <div className="aval-rail no-scrollbar py-5">
                        <div className="rr-track gap-3 px-3">
                            {[...AVALIACOES, ...AVALIACOES].map((a, i) => (
                                <img
                                    key={i}
                                    src={a.src}
                                    width={a.w}
                                    height={a.h}
                                    alt={i < AVALIACOES.length ? 'Avaliação de 5 estrelas no Google' : ''}
                                    aria-hidden={i >= AVALIACOES.length}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-[236px] md:w-[300px] h-auto flex-shrink-0 rounded-md bg-white"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="px-5 py-4 border-t" style={{ borderColor: LINE }}>
                        <span className={`${LABEL} block mb-1.5`} style={{ color: RED }}>
                            As avaliações
                        </span>
                        <span className="text-[14px]" style={{ color: MUTED }}>
                            Avaliações públicas no Google, do jeito que estão lá.
                        </span>
                    </div>
                </div>
            </div>

            {AUTORIZADO_CITAR_CLIENTE && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                    {PERFIS.map((p) => (
                        <img
                            key={p.src}
                            src={p.src}
                            width={p.w}
                            height={p.h}
                            alt={p.alt}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-auto block rounded-lg border"
                            style={{ borderColor: LINE }}
                        />
                    ))}
                </div>
            )}

            {/* Regra 2 do playbook. Meta e Google derrubam anúncio por
                promessa de ganho, e o CDC trata como propaganda enganosa. */}
            <p
                className="text-[13px] leading-relaxed max-w-2xl border-l-2 pl-4 mt-8"
                style={{ color: MUTED, borderColor: LINE }}
            >
                Resultado deles, com a operação deles. O que você contrata é a montagem
                da estrutura, não um número garantido — quem entrega resultado é o
                conjunto: estrutura, verba e o seu atendimento.
            </p>
        </div>
    </section>
);
