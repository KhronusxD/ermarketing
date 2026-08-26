import React, { useCallback, useEffect, useRef, useState } from 'react';
import { rastrear } from '../tracking';
import {
    BG,
    PANEL,
    RED,
    INK,
    MUTED,
    LINE,
    DISPLAY,
    LABEL,
    MODULOS,
    FAQ,
    ModuloCard,
    Provas,
} from './conteudo';

// /kit-aula — VSL do Kit com player próprio e trava de conteúdo.
//
// Simula o comportamento de player de VSL (tipo VTurb): abre com o pôster
// na hora, toca sozinho no mudo, não tem barra pra arrastar, e só libera o
// resto da página depois de um tempo real de vídeo assistido.
//
// Player próprio e não YouTube por três motivos: dá pra ler o currentTime
// exato, não entra JS de terceiro no caminho do primeiro quadro, e o R2
// não cobra egresso — que é o custo que escala junto com o tráfego pago.

// Bucket ermarketing-assets no R2. As duas versões são o mesmo corte:
// o navegador escolhe a de 720p no celular e a de 1080p no desktop,
// pela media query do <source>. Cache de um ano com immutable — se o
// vídeo mudar, o nome do arquivo muda junto.
const VIDEO = {
    mp4_1080: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/mini-vsl-1080.mp4',
    mp4_720: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/mini-vsl-720.mp4',
    poster: '/kit/mini-vsl-poster.webp',
};

const DURACAO = 247; // 4:07

// Momento em que a página abre: 4 minutos, como o Ed definiu.
//
// Num vídeo de 4:07 isso é praticamente o fim — a oferta aparece com sete
// segundos de sobra. É a decisão dele, tomada sabendo disso: a premissa da
// página é que só a hero existe até a pessoa assistir os 4 minutos.
// Pra soltar logo depois do fechamento da oferta (3:10), trocar por 195.
const LIBERA_EM = 240;

// Agora guarda o token assinado, não o tempo. sessionStorage e não
// localStorage: o crédito vale pela visita, e o token tem validade
// própria no servidor de qualquer jeito.
const CHAVE = 'kit:vsl:token';

type Oferta = {
    selo: string;
    de: string;
    por: string;
    termos: string;
    cta: string;
    whatsapp: string;
};

type Resposta = {
    token?: string;
    creditado?: number;
    liberado?: boolean;
    liberaEm?: number;
    oferta?: Oferta;
    eventoId?: string;
    erro?: string;
};

// Marcos de audiência. O de 4 minutos é o que interessa pra otimizar,
// mas ele vai ser raro — os intermediários dão volume pra Meta ter o que
// aprender enquanto os destraves não acumulam.
const MARCOS: { em: number; nome: string }[] = [
    { em: 0.25, nome: 'AulaQuarto' },
    { em: 0.5, nome: 'AulaMetade' },
    { em: 0.75, nome: 'AulaTresQuartos' },
];

const fmt = (s: number) => {
    const m = Math.floor(Math.max(0, s) / 60);
    const r = Math.floor(Math.max(0, s) % 60);
    return `${m}:${String(r).padStart(2, '0')}`;
};

const WHATSAPP =
    'https://wa.me/5592985146299?text=' +
    encodeURIComponent(
        'Oi Ed! Assisti o vídeo do Kit Assistência Técnica Plus e quero montar a minha.',
    );

// Fala com /api/aula. O token guarda o estado assinado pelo servidor; o
// navegador só o transporta.
const chamar = async (corpo: Record<string, unknown>): Promise<Resposta> => {
    const r = await fetch('/api/aula', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(corpo),
    });
    const dados = (await r.json()) as Resposta;
    if (!r.ok) throw new Error(dados.erro || String(r.status));
    return dados;
};

const Aula: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [pronto, setPronto] = useState(false);
    const [tocando, setTocando] = useState(false);
    const [mudo, setMudo] = useState(true);
    const [tempo, setTempo] = useState(0);

    // Ponto mais longe alcançado. Continua servindo pra impedir o pulo no
    // player, mas não decide mais nada: quem libera é o servidor.
    const maiorRef = useRef(0);

    // Estado da trava, vindo de /api/aula. `creditado` é quanto tempo real
    // o servidor reconheceu; `oferta` só chega quando ele reconhece tudo.
    const [creditado, setCreditado] = useState(0);
    const [oferta, setOferta] = useState<Oferta | null>(null);
    const [semServidor, setSemServidor] = useState(false);
    const tokenRef = useRef<string | null>(null);

    const liberado = oferta !== null;
    const maior = creditado;

    // Abre a sessão. O token vai pro sessionStorage pra que recarregar a
    // página não jogue fora o tempo já reconhecido — e ele é assinado, então
    // guardar no navegador não abre brecha: mexer nele invalida a assinatura.
    useEffect(() => {
        let vivo = true;

        (async () => {
            const guardado = (() => {
                try {
                    return sessionStorage.getItem(CHAVE);
                } catch {
                    return null;
                }
            })();

            if (guardado) {
                try {
                    const r = await chamar({ acao: 'pulso', token: guardado, posicao: 0 });
                    if (!vivo) return;
                    tokenRef.current = r.token ?? null;
                    setCreditado(r.creditado ?? 0);
                    if (r.oferta) setOferta(r.oferta);
                    return;
                } catch {
                    // token vencido ou inválido: começa uma sessão nova
                }
            }

            try {
                const r = await chamar({ acao: 'inicio' });
                if (!vivo) return;
                tokenRef.current = r.token ?? null;
                setCreditado(0);
            } catch {
                if (vivo) setSemServidor(true);
            }
        })();

        return () => {
            vivo = false;
        };
    }, []);

    // Pulso a cada 5s enquanto o vídeo corre. Parado, nada é enviado — e o
    // servidor não credita tempo que ninguém reivindicou.
    useEffect(() => {
        if (!tocando || liberado || semServidor) return;

        const id = window.setInterval(async () => {
            const v = videoRef.current;
            if (!v || !tokenRef.current) return;
            try {
                const r = await chamar({
                    acao: 'pulso',
                    token: tokenRef.current,
                    posicao: v.currentTime,
                });
                tokenRef.current = r.token ?? tokenRef.current;
                setCreditado(r.creditado ?? 0);
                if (r.oferta) setOferta(r.oferta);

                // eventoId só vem na virada. Usar o id do servidor é o que
                // casa este disparo com o da CAPI — os dois viram um só.
                if (r.eventoId) {
                    rastrear(
                        'AulaAssistida',
                        { content_name: 'Kit Assistência Técnica Plus', segundos: LIBERA_EM },
                        { id: r.eventoId },
                    );
                }

                try {
                    if (r.token) sessionStorage.setItem(CHAVE, r.token);
                } catch {
                    /* sem storage: recarregar recomeça a contagem */
                }
            } catch {
                setSemServidor(true);
            }
        }, 5000);

        return () => window.clearInterval(id);
    }, [tocando, liberado, semServidor]);

    // Carregamento "rápido": o esqueleto tem piso de tempo pra não piscar
    // quando o vídeo já está em cache, e teto pra não travar a página se a
    // rede estiver ruim — o pôster segura a cena enquanto isso.
    useEffect(() => {
        const piso = window.setTimeout(() => setPronto(true), 450);
        const teto = window.setTimeout(() => setPronto(true), 2500);
        return () => {
            window.clearTimeout(piso);
            window.clearTimeout(teto);
        };
    }, []);

    const onTime = useCallback(() => {
        const v = videoRef.current;
        if (!v) return;
        setTempo(v.currentTime);
        if (v.currentTime > maiorRef.current) maiorRef.current = v.currentTime;

        // umaVezSo: onTimeUpdate roda ~4x por segundo, e sem trava cada
        // marco viraria centenas de eventos.
        for (const m of MARCOS) {
            if (maiorRef.current >= DURACAO * m.em) {
                rastrear(m.nome, { content_name: 'Kit Assistência Técnica Plus' }, { umaVezSo: true });
            }
        }
    }, []);

    // Sem barra pra arrastar, mas teclado e gesto de mídia do sistema ainda
    // conseguem pular. Qualquer salto pra frente volta pro ponto assistido.
    const onSeeking = useCallback(() => {
        const v = videoRef.current;
        if (!v) return;
        if (v.currentTime > maiorRef.current + 0.6) {
            v.currentTime = maiorRef.current;
        }
    }, []);

    const alternar = () => {
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) void v.play();
        else v.pause();
    };

    const ativarSom = () => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = false;
        setMudo(false);
        if (v.paused) void v.play();
    };

    // Barra com aceleração: corre no começo e arrasta no fim, pra
    // parecer que o vídeo está quase acabando. Expoente menor que 1 deixa
    // a curva côncava — a 1/4 do vídeo ela já marca metade.
    //
    // A barra passa a não dizer a verdade sobre o quanto falta. Isso é
    // escolha do Ed e está anotado aqui de propósito: o único número que
    // a página afirma continua sendo o da trava ("falta X de vídeo"), que
    // é medido no relógio real e não foi tocado.
    const CURVA = 0.5;
    const pct = Math.min(100, Math.pow(Math.min(1, tempo / DURACAO), CURVA) * 100);
    const falta = Math.max(0, LIBERA_EM - maior);

    return (
        <div className="min-h-screen font-kitBody antialiased" style={{ backgroundColor: BG, color: INK }}>
            {/* ─── Faixa de topo ─── */}
            <div style={{ backgroundColor: RED }}>
                <div className="max-w-[1000px] mx-auto px-5 py-2.5 flex items-center justify-center gap-2.5 text-center">
                    <span className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse" style={{ backgroundColor: INK }} />
                    <p className={`${LABEL} leading-tight`}>
                        Aula gratuita · Monto os kits pessoalmente, então abro poucas vagas por semana
                    </p>
                </div>
            </div>

            <main className="max-w-[1000px] mx-auto px-5 md:px-8 py-8 md:py-12">
                {/* Centralizado: a página inteira é uma coluna só, com o
                    player no meio. Texto alinhado à esquerda criava uma
                    borda que nada embaixo acompanhava. */}
                <div className="text-center">
                    {/* Logo acima do título: a hero é a única coisa que
                        existe até a trava abrir, então ela é a página
                        inteira — precisa dizer de que produto se trata
                        antes do vídeo começar a falar. */}
                    <img
                        src="/kit/logo-kit.png"
                        alt="Kit Assistência Técnica Plus"
                        width={900}
                        height={777}
                        fetchPriority="high"
                        className="w-[132px] md:w-[168px] h-auto mx-auto mb-5"
                    />

                    <span className={`${LABEL} block mb-4`} style={{ color: RED }}>
                        Para donos de assistência técnica
                    </span>

                    <h1 className={`${DISPLAY} text-[clamp(30px,5.6vw,54px)] max-w-[20ch] mx-auto mb-4`}>
                        Como encher a fila da sua assistência em 5 dias
                    </h1>

                    <p className="text-[15px] md:text-[17px] leading-relaxed max-w-2xl mx-auto mb-7" style={{ color: MUTED }}>
                        Assista até o fim: no meio do vídeo eu mostro a estrutura funcionando
                        na tela, e no final libero a condição desta semana.
                    </p>
                </div>

                {/* ─── Player ─── */}
                <div
                    className="relative rounded-lg overflow-hidden border"
                    style={{ borderColor: LINE, backgroundColor: '#000', aspectRatio: '16 / 9' }}
                >
                    {!pronto && (
                        <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: PANEL }}>
                            <span className="flex items-center gap-2.5">
                                <span className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: `${RED} transparent ${RED} ${RED}` }} />
                                <span className={LABEL} style={{ color: MUTED }}>Carregando</span>
                            </span>
                        </div>
                    )}

                    <video
                        ref={videoRef}
                        poster={VIDEO.poster}
                        playsInline
                        muted
                        autoPlay
                        preload="auto"
                        tabIndex={-1}
                        onTimeUpdate={onTime}
                        onSeeking={onSeeking}
                        onPlay={() => setTocando(true)}
                        onPause={() => setTocando(false)}
                        onLoadedData={() => setPronto(true)}
                        onClick={alternar}
                        className="absolute inset-0 w-full h-full object-contain cursor-pointer"
                        style={{ opacity: pronto ? 1 : 0, transition: 'opacity .3s' }}
                    >
                        <source src={VIDEO.mp4_720} type="video/mp4" media="(max-width: 767px)" />
                        <source src={VIDEO.mp4_1080} type="video/mp4" />
                    </video>

                    {/* Chamada pra tirar do mudo. Navegador só deixa tocar
                        sozinho sem som, então o clique é obrigatório — vale
                        transformar a limitação em convite. */}
                    {mudo && pronto && (
                        <button
                            type="button"
                            onClick={ativarSom}
                            className="absolute inset-0 flex flex-col items-center justify-center gap-4 transition-colors"
                            style={{ backgroundColor: 'rgba(19,19,22,0.62)' }}
                        >
                            <span
                                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-[24px]"
                                style={{ backgroundColor: RED, color: INK }}
                                aria-hidden="true"
                            >
                                ▶
                            </span>
                            <span className={`${DISPLAY} text-[22px] md:text-[28px]`}>
                                Toque para ouvir
                            </span>
                            <span className="text-[13px]" style={{ color: MUTED }}>
                                O vídeo já começou — está sem som
                            </span>
                        </button>
                    )}

                    {/* Barra de progresso decorativa: mostra onde está, não
                        deixa arrastar. É o que segura a pessoa no conteúdo. */}
                    <div className="absolute left-0 right-0 bottom-0 pointer-events-none">
                        <div className="h-1" style={{ backgroundColor: 'rgba(255,255,255,0.16)' }}>
                            <div className="h-full transition-[width] duration-300" style={{ width: `${pct}%`, backgroundColor: RED }} />
                        </div>
                    </div>

                    {!mudo && pronto && !tocando && (
                        <button
                            type="button"
                            onClick={alternar}
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ backgroundColor: 'rgba(19,19,22,0.45)' }}
                            aria-label="Continuar"
                        >
                            <span className="w-16 h-16 rounded-full flex items-center justify-center text-[22px]" style={{ backgroundColor: RED, color: INK }} aria-hidden="true">
                                ▶
                            </span>
                        </button>
                    )}
                </div>

                {/* ─── Trava ─── */}
                {semServidor ? (
                    /* Se a trava não responde, a saída não pode ser liberar
                       por engano nem prender a pessoa numa página morta. O
                       WhatsApp resolve os dois: ela fala com o Ed e ele sabe
                       de onde ela veio. */
                    <div
                        className="mt-6 rounded-lg border p-6 md:p-8 text-center"
                        style={{ borderColor: LINE, backgroundColor: PANEL }}
                    >
                        <span className={`${LABEL} block mb-3`} style={{ color: RED }}>
                            Não consegui liberar por aqui
                        </span>
                        <p className="text-[14px] max-w-md mx-auto mb-6" style={{ color: MUTED }}>
                            Deu problema na conexão com o servidor. Continua assistindo —
                            e pra pegar a condição, é só me chamar no WhatsApp.
                        </p>
                        <a
                            href={WHATSAPP}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => rastrear('Lead', { content_name: 'Kit Assistência Técnica Plus', content_category: 'modo-falha' })}
                            className="inline-flex items-center justify-center gap-2 rounded-md px-8 py-4 text-[15px] font-bold"
                            style={{ backgroundColor: RED, color: INK }}
                        >
                            <span>
                                Falar no WhatsApp <span aria-hidden="true">→</span>
                            </span>
                        </a>
                    </div>
                ) : !liberado ? (
                    <div
                        className="mt-6 rounded-lg border p-6 md:p-8 text-center"
                        style={{ borderColor: LINE, backgroundColor: PANEL }}
                    >
                        <span className={`${LABEL} block mb-3`} style={{ color: RED }}>
                            Condição bloqueada
                        </span>
                        <p className={`${DISPLAY} text-[26px] md:text-[32px] mb-3`}>
                            Falta {fmt(falta)} de vídeo
                        </p>
                        <p className="text-[14px] max-w-md mx-auto" style={{ color: MUTED }}>
                            A condição desta semana aparece aqui assim que você chegar na
                            parte em que eu explico o que está incluso. Continua comigo.
                        </p>
                        <div className="h-1.5 rounded-full mt-6 max-w-sm mx-auto overflow-hidden" style={{ backgroundColor: '#2A2B32' }}>
                            <div
                                className="h-full rounded-full transition-[width] duration-500"
                                style={{ width: `${Math.min(100, (maior / LIBERA_EM) * 100)}%`, backgroundColor: RED }}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="mt-6 rounded-lg p-7 md:p-9 text-center" style={{ backgroundColor: RED }}>
                        {/* Nada aqui é escrito no código: o texto, o preço
                            e o link chegam de /api/aula quando o servidor
                            reconhece os 4 minutos. Antes disso a oferta não
                            existe no navegador — nem no HTML, nem no JS. */}
                        <span className={`${LABEL} block mb-5`} style={{ color: '#FFFFFFB3' }}>
                            {oferta!.selo}
                        </span>

                        <p className="flex items-baseline justify-center flex-wrap gap-x-3 mb-1">
                            <span className={LABEL} style={{ color: '#FFFFFFB3' }}>De</span>
                            <s className={`${DISPLAY} text-[26px] md:text-[30px]`} style={{ color: '#FFFFFF8C' }}>
                                {oferta!.de}
                            </s>
                            <span className={LABEL} style={{ color: '#FFFFFFB3' }}>por</span>
                        </p>

                        <p className="flex items-start justify-center gap-1 mb-3">
                            <span className={`${DISPLAY} text-[24px] mt-2`}>R$</span>
                            <span className={`${DISPLAY} text-[clamp(58px,11vw,96px)]`}>{oferta!.por}</span>
                        </p>

                        <p className="text-[15px] max-w-md mx-auto mb-6" style={{ color: '#FFFFFFD9' }}>
                            {oferta!.termos}
                        </p>
                        <a
                            href={oferta!.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => rastrear('Lead', { content_name: 'Kit Assistência Técnica Plus', content_category: 'oferta-liberada' })}
                            className="inline-flex items-center justify-center gap-2 rounded-md px-8 py-4 text-[15px] font-bold"
                            style={{ backgroundColor: BG, color: INK }}
                        >
                            <span>
                                {oferta!.cta} <span aria-hidden="true">→</span>
                            </span>
                        </a>
                    </div>
                )}
            </main>

            {/* ─── A LP inteira, embaixo do vídeo ───
                Antes era um link pra outra página, e mandar embora quem
                acabou de assistir 3 minutos é perder a pessoa no momento
                em que ela está mais perto de decidir.
                Só entra depois de liberado: enquanto a trava vale, isso
                não existe nem no HTML — conteúdo escondido com CSS
                aparece em "ver código-fonte" e a trava vira encenação.
                Adaptado ao vídeo: sem hero, sem anel girando e sem repetir
                o preço em destaque, que já está logo acima. O que sobra é
                o que a pessoa quer conferir depois de ouvir: as peças, quem
                está falando, como paga e as dúvidas. */}
            {liberado && (
                <>
                    <section className="border-t" style={{ borderColor: LINE }}>
                        <div className="max-w-[1000px] mx-auto px-5 md:px-8 py-14 md:py-20">
                            <span className={`${LABEL} inline-block mb-5`} style={{ color: RED }}>
                                O que você recebe
                            </span>
                            <h2 className={`${DISPLAY} text-[clamp(30px,5vw,50px)] max-w-[18ch] mb-5`}>
                                Cinco peças. Uma estrutura só.
                            </h2>
                            <p className="text-[16px] md:text-[17px] leading-relaxed max-w-2xl mb-10" style={{ color: MUTED }}>
                                São as mesmas peças que eu abri na tela no meio do vídeo,
                                agora escritas pra você conferir com calma.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {MODULOS.map((m, i) => (
                                    <ModuloCard key={m.n} m={m} col={i % 2} />
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* COMPLIANCE (playbook, regra 1): sem a autorização por
                        escrito da iTV Manaus e da SOS TV, nome de cliente e
                        número de cliente não entram — só "duas assistências
                        que eu atendo" e "seis dígitos".
                        Regra 2: o aviso ao pé não é enfeite. Resultado de
                        cliente não é promessa, e Meta, Google e CDC tratam
                        promessa de ganho como publicidade enganosa. */}
                    <section className="border-y" style={{ borderColor: LINE, backgroundColor: PANEL }}>
                        <div className="max-w-[1000px] mx-auto px-5 md:px-8 py-14 md:py-20">
                            <span className={`${LABEL} inline-block mb-5`} style={{ color: RED }}>
                                Por que eu
                            </span>
                            <h2 className={`${DISPLAY} text-[clamp(30px,5vw,50px)] max-w-[22ch] mb-6`}>
                                Duas assistências que eu atendo passaram dos seis dígitos por mês
                            </h2>
                            <p className="text-[16px] md:text-[18px] leading-relaxed max-w-2xl mb-6" style={{ color: MUTED }}>
                                Sou gestor de tráfego desde 2020 e escolhi um nicho só:
                                assistência técnica. O kit é a mesma estrutura que eu montei
                                pra elas, empacotada — sem a mensalidade de agência no meio.
                            </p>
                        </div>
                    </section>

                    <Provas compacto />

                    <section className="max-w-[1000px] mx-auto px-5 md:px-8 py-14 md:py-20">
                        <span className={`${LABEL} inline-block mb-5`} style={{ color: RED }}>
                            Como você paga
                        </span>
                        <h2 className={`${DISPLAY} text-[clamp(30px,5vw,50px)] mb-10`}>
                            Duas formas, mesma entrega
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            <div className="rounded-lg border p-8" style={{ borderColor: LINE, backgroundColor: PANEL }}>
                                <span className={`${LABEL} block mb-4`} style={{ color: RED }}>
                                    No Pix, à vista
                                </span>
                                <p className={`${DISPLAY} text-[clamp(40px,7vw,62px)] mb-3`}>
                                    R$ 997
                                </p>
                                <p className="text-[15px] leading-relaxed" style={{ color: MUTED }}>
                                    De <s>R$ 2.000</s> — o desconto é pra quem fecha no Pix.
                                </p>
                            </div>

                            <div className="rounded-lg border p-8" style={{ borderColor: LINE, backgroundColor: PANEL }}>
                                <span className={`${LABEL} block mb-4`} style={{ color: MUTED }}>
                                    Ou no cartão
                                </span>
                                <p className={`${DISPLAY} text-[clamp(40px,7vw,62px)] mb-3`}>
                                    12x de R$ 125
                                </p>
                                <p className="text-[15px] leading-relaxed" style={{ color: MUTED }}>
                                    Total de R$ 1.500, parcelado em até 12 vezes. Sem repasse
                                    de juros pra você — a taxa fica comigo.
                                </p>
                            </div>
                        </div>

                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3 rounded-lg border p-6 text-[14px]" style={{ borderColor: LINE, color: MUTED }}>
                            {[
                                'Pagamento pela InfinitePay',
                                'Entrega em 5 dias úteis ou 100% de volta',
                                '1 rodada de ajustes em até 7 dias',
                                'Suporte a dúvidas por 15 dias',
                                'A verba de anúncio é sua e fica na sua conta do Google',
                                'Primeiro mês da IA incluso, sem renovação automática',
                            ].map((l) => (
                                <li key={l} className="flex items-start gap-2.5">
                                    <span style={{ color: RED }} aria-hidden="true">
                                        ✓
                                    </span>
                                    {l}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="border-y" style={{ borderColor: LINE, backgroundColor: PANEL }}>
                        <div className="max-w-[900px] mx-auto px-5 md:px-8 py-14 md:py-20">
                            <span className={`${LABEL} inline-block mb-5`} style={{ color: RED }}>
                                O que sempre perguntam
                            </span>
                            <h2 className={`${DISPLAY} text-[clamp(30px,5vw,50px)] mb-10`}>
                                Perguntas honestas
                            </h2>

                            <div className="divide-y" style={{ borderColor: LINE }}>
                                {FAQ.map((f) => (
                                    <div key={f.q} className="py-6 first:pt-0" style={{ borderColor: LINE }}>
                                        <h3 className={`${DISPLAY} text-[22px] mb-3`}>{f.q}</h3>
                                        <p className="text-[15px] leading-relaxed" style={{ color: MUTED }}>
                                            {f.a}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="max-w-[1000px] mx-auto px-5 md:px-8 py-16 md:py-24 text-center">
                        <h2 className={`${DISPLAY} text-[clamp(34px,6.5vw,68px)] max-w-[16ch] mx-auto mb-6`}>
                            Me conta de qual assistência você fala
                        </h2>
                        <p className="text-[16px] md:text-[18px] leading-relaxed max-w-xl mx-auto mb-8" style={{ color: MUTED }}>
                            Olho o seu perfil, seu Google e sua concorrência na sua região,
                            e te respondo em áudio dizendo o que eu montaria primeiro. Sem
                            custo e sem compromisso.
                        </p>
                        <a
                            href={WHATSAPP}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => rastrear('Lead', { content_name: 'Kit Assistência Técnica Plus', content_category: 'fechamento' })}
                            className="inline-flex items-center justify-center gap-2 rounded-md px-9 py-4 text-[16px] font-bold"
                            style={{ backgroundColor: RED, color: INK }}
                        >
                            <span>
                                Quero garantir a minha vaga{' '}
                                <span aria-hidden="true">→</span>
                            </span>
                        </a>
                        <p className="text-[13px] mt-5" style={{ color: MUTED }}>
                            Monto os kits pessoalmente, então abro poucas vagas por semana.
                        </p>
                    </section>
                </>
            )}

            <footer className="border-t" style={{ borderColor: LINE }}>
                <div className="max-w-[1000px] mx-auto px-5 md:px-8 py-7 text-center text-[12px]" style={{ color: MUTED }}>
                    Kit Assistência Técnica Plus · Ed Rodrigues · Manaus/AM
                </div>
            </footer>
        </div>
    );
};

export default Aula;
