import React, { useCallback, useEffect, useRef, useState } from 'react';

// /kit-aula — VSL do Kit com player próprio e trava de conteúdo.
//
// Simula o comportamento de player de VSL (tipo VTurb): abre com o pôster
// na hora, toca sozinho no mudo, não tem barra pra arrastar, e só libera o
// resto da página depois de um tempo real de vídeo assistido.
//
// Player próprio e não YouTube por três motivos: dá pra ler o currentTime
// exato, não entra JS de terceiro no caminho do primeiro quadro, e o R2
// não cobra egresso — que é o custo que escala junto com o tráfego pago.

const BG = '#131316';
const PANEL = '#1C1D22';
const RED = '#E3242B';
const INK = '#F5F5F7';
const MUTED = '#A6A9B0';
const LINE = '#33343B';

const DISPLAY = 'font-kit font-bold uppercase leading-[0.92] tracking-[-0.01em]';
const LABEL = 'font-mono text-[10px] tracking-[0.18em] uppercase';

// ⚠️ TROCAR pelas URLs do R2 depois do upload. Só estas três linhas.
const VIDEO = {
    mp4_1080: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/mini-vsl-1080.mp4',
    mp4_720: 'https://pub-a56d220bf5884e95b4762d77d7556734.r2.dev/mini-vsl-720.mp4',
    poster: '/kit/mini-vsl-poster.webp',
};

const DURACAO = 247; // 4:07

// Momento em que a página abre.
//
// Li as legendas queimadas do vídeo pra escolher: aos 3:10 ele fecha a
// oferta ("uma vez, sem mensalidade, a estrutura fica com você"), aos 3:25
// entra o bônus e aos 3:55 a vaga da semana. Aos 3:15 a pessoa já sabe o
// que está comprando e por quanto — segurar além disso só atrasa quem já
// decidiu. Pra liberar só no fim, trocar por 240.
const LIBERA_EM = 195;

const CHAVE = 'kit:vsl:assistido';

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

const Aula: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [pronto, setPronto] = useState(false);
    const [tocando, setTocando] = useState(false);
    const [mudo, setMudo] = useState(true);
    const [tempo, setTempo] = useState(0);

    // Guarda o ponto mais longe já assistido, não o currentTime: é isso que
    // impede destravar a página voltando e avançando o vídeo.
    const maiorRef = useRef(0);
    const [maior, setMaior] = useState(0);

    const liberado = maior >= LIBERA_EM;

    // Quem já assistiu numa visita anterior não é obrigado a assistir de
    // novo — recarregar a página não pode custar o acesso à oferta.
    useEffect(() => {
        try {
            const salvo = Number(localStorage.getItem(CHAVE) || 0);
            if (salvo > 0) {
                maiorRef.current = salvo;
                setMaior(salvo);
            }
        } catch {
            // storage bloqueado: a trava simplesmente recomeça do zero
        }
    }, []);

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
        if (v.currentTime > maiorRef.current) {
            maiorRef.current = v.currentTime;
            setMaior(v.currentTime);
            // grava de 5 em 5s pra não bater no storage 4x por segundo
            if (Math.floor(v.currentTime) % 5 === 0) {
                try {
                    localStorage.setItem(CHAVE, String(Math.floor(v.currentTime)));
                } catch {
                    /* sem storage, sem persistência */
                }
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

    const pct = Math.min(100, (tempo / DURACAO) * 100);
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
                <span className={`${LABEL} block mb-4`} style={{ color: RED }}>
                    Para donos de assistência técnica
                </span>

                <h1 className={`${DISPLAY} text-[clamp(30px,5.6vw,54px)] max-w-[20ch] mb-4`}>
                    Como encher a fila da sua assistência em 5 dias
                </h1>

                <p className="text-[15px] md:text-[17px] leading-relaxed max-w-2xl mb-7" style={{ color: MUTED }}>
                    Assista até o fim: no meio do vídeo eu mostro a estrutura funcionando
                    na tela, e no final libero a condição desta semana.
                </p>

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
                {!liberado ? (
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
                    <div className="mt-6 space-y-3">
                        <div className="rounded-lg p-7 md:p-9" style={{ backgroundColor: RED }}>
                            <span className={`${LABEL} block mb-4`} style={{ color: '#FFFFFFB3' }}>
                                Liberado · condição desta semana
                            </span>
                            <p className="flex items-start gap-1 mb-2">
                                <span className={`${DISPLAY} text-[24px] mt-2`}>R$</span>
                                <span className={`${DISPLAY} text-[clamp(58px,11vw,96px)]`}>997</span>
                            </p>
                            <p className="text-[15px] mb-6" style={{ color: '#FFFFFFD9' }}>
                                No Pix, à vista. No cartão, 12x de R$ 125. Entrega em 5 dias
                                úteis ou 100% do dinheiro de volta.
                            </p>
                            <a
                                href={WHATSAPP}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-md px-8 py-4 text-[15px] font-bold"
                                style={{ backgroundColor: BG, color: INK }}
                            >
                                Quero garantir a minha vaga
                                <span aria-hidden="true">→</span>
                            </a>
                        </div>

                        <a
                            href="/kit-assistencia-tecnica-plus"
                            className="block rounded-lg border p-5 text-center text-[14px] transition-colors"
                            style={{ borderColor: LINE, backgroundColor: PANEL, color: MUTED }}
                        >
                            Ver os cinco módulos em detalhe →
                        </a>
                    </div>
                )}
            </main>

            <footer className="border-t" style={{ borderColor: LINE }}>
                <div className="max-w-[1000px] mx-auto px-5 md:px-8 py-7 text-center text-[12px]" style={{ color: MUTED }}>
                    Kit Assistência Técnica Plus · Ed Rodrigues · Manaus/AM
                </div>
            </footer>
        </div>
    );
};

export default Aula;
