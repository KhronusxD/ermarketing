// Trava da aula em vídeo — contada no servidor.
//
// A trava anterior vivia só no navegador: bastava abrir o console,
// escrever o tempo assistido no localStorage e a oferta aparecia. Também
// dava pra acelerar o vídeo ou empurrar a posição de meio em meio segundo.
//
// Aqui quem conta o tempo é o relógio deste servidor. Cada pulso credita
// no máximo o tempo real decorrido desde o pulso anterior — então acelerar
// a reprodução, arrastar a posição ou mexer no armazenamento não adiantam:
// o teto é sempre o relógio de parede. Não existe caminho que chegue nos
// 4 minutos em menos de 4 minutos.
//
// Sem banco de dados: o estado viaja num token assinado que o navegador
// guarda e devolve. Ele pode ler o token, mas não consegue alterá-lo sem
// a chave — e a chave é uma variável de ambiente do projeto, que nunca sai
// daqui. Este arquivo não é servido ao visitante.
//
// A oferta em si também vem daqui. Enquanto o servidor não disser que
// liberou, ela não existe no navegador — nem no HTML, nem no JS.

interface Env {
    AULA_SEGREDO?: string;
}

const DURACAO = 247;          // 4:07 de vídeo
const LIBERA_EM = 240;        // 4 minutos assistidos
const TOLERANCIA = 1.02;      // folga pra oscilação de relógio
const TETO_POR_PULSO = 8;     // segundos que um único pulso pode creditar
const VALIDADE_MS = 6 * 60 * 60 * 1000;

// O que o servidor entrega quando — e só quando — a conta fecha.
const OFERTA = {
    selo: 'Liberado · condição desta semana',
    de: 'R$ 2.000',
    por: '997',
    termos:
        'No Pix, à vista. No cartão, 12x de R$ 125. Entrega em 5 dias úteis ou 100% do dinheiro de volta.',
    cta: 'Quero garantir a minha vaga',
    whatsapp:
        'https://wa.me/5592985146299?text=' +
        encodeURIComponent(
            'Oi Ed! Assisti a aula inteira do Kit Assistência Técnica Plus e quero montar a minha.',
        ),
};

type Estado = {
    i: number;  // início da sessão
    u: number;  // instante do último pulso
    c: number;  // segundos creditados
    p: number;  // última posição informada
};

const enc = new TextEncoder();

const paraB64url = (b: Uint8Array) =>
    btoa(String.fromCharCode(...b)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

const deB64url = (s: string) => {
    const t = s.replace(/-/g, '+').replace(/_/g, '/');
    const bin = atob(t + '='.repeat((4 - (t.length % 4)) % 4));
    return Uint8Array.from(bin, (c) => c.charCodeAt(0));
};

const abrirChave = (segredo: string) =>
    crypto.subtle.importKey('raw', enc.encode(segredo), { name: 'HMAC', hash: 'SHA-256' }, false, [
        'sign',
        'verify',
    ]);

async function selar(estado: Estado, chave: CryptoKey): Promise<string> {
    const corpo = paraB64url(enc.encode(JSON.stringify(estado)));
    const firma = await crypto.subtle.sign('HMAC', chave, enc.encode(corpo));
    return `${corpo}.${paraB64url(new Uint8Array(firma))}`;
}

async function abrir(token: unknown, chave: CryptoKey): Promise<Estado | null> {
    if (typeof token !== 'string' || !token.includes('.')) return null;
    const [corpo, firma] = token.split('.');
    if (!corpo || !firma) return null;

    let ok = false;
    try {
        ok = await crypto.subtle.verify('HMAC', chave, deB64url(firma), enc.encode(corpo));
    } catch {
        return null;
    }
    if (!ok) return null;

    try {
        const e = JSON.parse(new TextDecoder().decode(deB64url(corpo))) as Estado;
        if (![e.i, e.u, e.c, e.p].every((n) => typeof n === 'number' && Number.isFinite(n))) return null;
        if (Date.now() - e.i > VALIDADE_MS) return null;
        return e;
    } catch {
        return null;
    }
}

const responder = (dados: unknown, status = 200) =>
    new Response(JSON.stringify(dados), {
        status,
        headers: {
            'content-type': 'application/json; charset=utf-8',
            // A resposta é específica de cada sessão e nunca pode ficar
            // em cache — nem no navegador, nem na borda da Cloudflare.
            'cache-control': 'no-store',
        },
    });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
    const segredo = env.AULA_SEGREDO;
    if (!segredo) {
        // Sem a chave não dá pra assinar nada. Melhor dizer isso na cara
        // do que liberar por engano ou travar a pessoa pra sempre.
        return responder({ erro: 'sem_segredo' }, 503);
    }

    let corpo: { acao?: string; token?: string; posicao?: number };
    try {
        corpo = await request.json();
    } catch {
        return responder({ erro: 'corpo_invalido' }, 400);
    }

    const chave = await abrirChave(segredo);
    const agora = Date.now();

    if (corpo.acao === 'inicio') {
        const estado: Estado = { i: agora, u: agora, c: 0, p: 0 };
        return responder({
            token: await selar(estado, chave),
            creditado: 0,
            liberado: false,
            liberaEm: LIBERA_EM,
        });
    }

    if (corpo.acao === 'pulso') {
        const estado = await abrir(corpo.token, chave);
        if (!estado) return responder({ erro: 'token_invalido' }, 401);

        const posicao = Number(corpo.posicao);
        if (!Number.isFinite(posicao) || posicao < 0 || posicao > DURACAO + 5) {
            return responder({ erro: 'posicao_invalida' }, 400);
        }

        // O crédito é o menor entre: o quanto o vídeo avançou, o quanto o
        // relógio andou e o teto por pulso. O relógio é o que fecha a
        // porta pra reprodução acelerada; o teto por pulso fecha a porta
        // pra quem espera parado e manda um pulso gigante no fim.
        const avancoNoVideo = posicao - estado.p;
        const avancoNoRelogio = (agora - estado.u) / 1000;
        const credito = Math.max(
            0,
            Math.min(avancoNoVideo, avancoNoRelogio * TOLERANCIA, TETO_POR_PULSO),
        );

        const novo: Estado = {
            i: estado.i,
            u: agora,
            c: Math.min(LIBERA_EM, estado.c + credito),
            // Guarda o ponto mais longe: voltar o vídeo não devolve
            // crédito, e avançar de novo não credita duas vezes.
            p: Math.max(estado.p, posicao),
        };

        const liberado = novo.c >= LIBERA_EM;

        return responder({
            token: await selar(novo, chave),
            creditado: Math.round(novo.c),
            liberado,
            liberaEm: LIBERA_EM,
            ...(liberado ? { oferta: OFERTA } : {}),
        });
    }

    return responder({ erro: 'acao_desconhecida' }, 400);
};
