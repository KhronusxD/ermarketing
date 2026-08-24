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
