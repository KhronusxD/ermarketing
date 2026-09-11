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

// ── Conversões do Google Ads ────────────────────────────────────────
//
// Os rótulos vêm da conta Norte Marketing (2046445358). Cada ação de
// conversão tem o seu; o número antes da barra é o mesmo para a conta.
//
// Dispara direto pelo gtag em vez de depender de gatilho configurado no
// GTM: o que está aqui no código é o que roda, e não fica um pedaço da
// medição vivendo num painel que ninguém lembra de conferir.

const ADS = 'AW-18054403022';

export const CONVERSOES = {
    agendamento: `${ADS}/tnvGCMf2wfIcEM6ngaFD`,
    conversa: `${ADS}/2Zi1CMr2wfIcEM6ngaFD`,
    whatsapp: `${ADS}/Vb1CCM32wfIcEM6ngaFD`,
    formulario: `${ADS}/Rqa0CJW4w_IcEM6ngaFD`,
} as const;

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

export function converter(qual: keyof typeof CONVERSOES, extras: Params = {}): void {
    if (typeof window === 'undefined') return;
    try {
        window.gtag?.('event', 'conversion', { send_to: CONVERSOES[qual], ...extras });
    } catch {
        // Bloqueador derrubou o gtag. Segue sem quebrar a página.
    }
}

// ── Cliques de contato, em qualquer lugar do site ──────────────────
//
// Um ouvinte só, na raiz, em vez de onClick em cada botão. Os links de
// contato estão espalhados por cinco arquivos e nascem novos a cada
// página que a gente cria; assim nenhum fica de fora por esquecimento.
//
// São dois caminhos, e eles não valem a mesma coisa:
//
//   WhatsApp (wa.me, api.whatsapp.com, gyrehub.com.br/r/) → conversa
//   começa na hora, com uma pessoa.
//
//   Formulário (gyrehub.com.br/f/) → a pessoa vai responder 11 perguntas
//   em outro domínio. O clique diz que ela COMEÇOU, não que terminou.
//   Por isso dispara a ação "formulário", que é secundária, e não a de
//   conversa qualificada. Contar início como conclusão inflaria a régua
//   e estragaria o lance no dia em que a conta migrar pra estratégia por
//   conversão.
//
// Na fase de captura, porque o React para a propagação em alguns casos.
let instalado = false;

export function ouvirCliquesDeContato(): void {
    if (instalado || typeof document === 'undefined') return;
    instalado = true;

    document.addEventListener(
        'click',
        (e) => {
            const alvo = e.target as HTMLElement | null;
            const link = alvo?.closest?.(
                'a[href*="wa.me"], a[href*="api.whatsapp.com"],' +
                    ' a[href*="gyrehub.com.br/r/"], a[href*="gyrehub.com.br/f/"]',
            ) as HTMLAnchorElement | null;
            if (!link) return;

            // De onde saiu o clique, pra saber qual seção converte.
            const secao =
                link.closest('[data-secao]')?.getAttribute('data-secao') ||
                link.closest('section')?.querySelector('h2')?.textContent?.trim().slice(0, 40) ||
                document.title.slice(0, 40);

            const ehFormulario = (link.getAttribute('href') || '').includes('gyrehub.com.br/f/');

            converter(ehFormulario ? 'formulario' : 'whatsapp');
            rastrear(ehFormulario ? 'InitiateCheckout' : 'Lead', {
                content_name: 'Norte Marketing',
                content_category: secao || 'sem seção',
                pagina: window.location.pathname,
            });
        },
        true,
    );
}
