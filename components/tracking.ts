// Disparo de evento para o Pixel da Meta e para o GTM.
//
// O index.html enfileira `fbq` e `dataLayer` de forma síncrona e só busca
// os scripts de verdade depois do load da página. Chamar daqui é seguro
// mesmo antes de os pixels existirem: a fila é reproduzida quando chegam.
//
// Cada evento leva um eventID. É o que permite mandar o mesmo evento pelo
// navegador e pelo servidor sem contar duas vezes — a Meta casa os dois
// pelo id e mantém um só. Sem isso, ligar a CAPI dobraria os números.

type Params = Record<string, string | number | boolean>;

declare global {
    interface Window {
        fbq?: (...args: unknown[]) => void;
    }
}

// A Meta só entende como padrão os nomes da lista dela. Um nome inventado
// mandado por 'track' é descartado em silêncio — por isso a separação.
const PADRAO = new Set([
    'Lead',
    'Contact',
    'ViewContent',
    'CompleteRegistration',
    'InitiateCheckout',
    'Purchase',
    'Schedule',
    'SubmitApplication',
    'StartTrial',
]);

// Evento de marco só vale uma vez por visita. Sem isso, o onTimeUpdate do
// vídeo dispara quatro vezes por segundo e a conta vira lixo.
const jaFoi = new Set<string>();

export const novoId = (): string => {
    try {
        if (crypto?.randomUUID) return crypto.randomUUID();
    } catch {
        /* navegador antigo ou contexto sem crypto */
    }
    return `e${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
};

export function rastrear(
    evento: string,
    params: Params = {},
    opts: { umaVezSo?: boolean; id?: string } = {},
): void {
    if (typeof window === 'undefined') return;

    const chave = opts.umaVezSo ? `${evento}:${JSON.stringify(params)}` : '';
    if (chave) {
        if (jaFoi.has(chave)) return;
        jaFoi.add(chave);
    }

    const id = opts.id || novoId();

    try {
        window.fbq?.(PADRAO.has(evento) ? 'track' : 'trackCustom', evento, params, { eventID: id });
    } catch {
        // Bloqueador de anúncio derrubou o fbq. O evento se perde no
        // navegador — que é exatamente o buraco que a CAPI tapa.
    }

    try {
        window.dataLayer?.push({ event: `er_${evento}`, ...params, event_id: id });
    } catch {
        /* dataLayer indisponível: seguir sem quebrar a página */
    }
}
