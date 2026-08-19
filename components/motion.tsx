import React from 'react';

// Mecânicas de rolagem e contagem — sem opinião visual nenhuma.
//
// Nasceram na home da Norte, mas o Kit Assistência Técnica Plus passou a
// usar as mesmas, e deixar isso dentro de Norte/shared obrigaria uma marca
// a importar do módulo de outra. Aqui é só comportamento: quem chama
// decide a aparência.

// ─── Mecânicas de scroll ────────────────────────────────────────────

/** Progresso 0→1 conforme a página rola `distance` px a partir do topo.
 *  `initial` é o valor usado no pré-render, antes de existir scroll: 1 para
 *  texto (o HTML estático precisa sair legível e indexável) e 0 para efeito
 *  decorativo, que deve nascer no estado de repouso e não dar salto. */
export const useScrollReveal = (distance = 420, initial = 1): number => {
    const [p, setP] = React.useState(initial);

    React.useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        let frame = 0;
        const update = () => {
            frame = 0;
            setP(Math.min(1, window.scrollY / distance));
        };
        update();
        const settle = [200, 700, 1500].map((t) => window.setTimeout(update, t));
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [distance]);

    return p;
};

/** Progresso 0→1 conforme o elemento atravessa a janela, de 80% a 35%
 *  da altura do viewport. Também nasce em 1 por causa do pré-render. */
export const useElementReveal = <T extends HTMLElement>(): [
    React.RefObject<T>,
    number,
] => {
    const ref = React.useRef<T>(null);
    const [p, setP] = React.useState(1);

    React.useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        let frame = 0;
        const update = () => {
            frame = 0;
            const el = ref.current;
            if (!el) return;
            const top = el.getBoundingClientRect().top;
            const start = window.innerHeight * 0.8;
            const end = window.innerHeight * 0.35;
            setP(Math.max(0, Math.min(1, (start - top) / (start - end))));
        };
        update();
        const settle = [200, 700, 1500].map((t) => window.setTimeout(update, t));
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    return [ref, p];
};

/** Reparte `progress` entre N itens em cascata: o item 0 já nasce quase
 *  pronto e o último precisa do progresso inteiro. */
export const stagger = (i: number, total: number, progress: number, floor = 0.12) => {
    const base = total > 1 ? 1 - (i / (total - 1)) * (1 - floor) : 1;
    return Math.max(0, Math.min(1, base + progress));
};

/** Máscara lateral que acompanha a rolagem do trilho.
 *
 *  Fade fixo dos dois lados mente: no começo não há nada à esquerda pra
 *  sumir, então o esfumado só apaga a borda da primeira carta e parece
 *  defeito. Aqui cada lado só ganha fade quando existe conteúdo escondido
 *  daquele lado. */
export const useRailMask = <T extends HTMLElement>(
    centerOnMount = false,
): [React.RefObject<T>, React.CSSProperties] => {
    const ref = React.useRef<T>(null);
    const [edges, setEdges] = React.useState({ left: false, right: true });

    // `touched` marca que a pessoa já mexeu no trilho: a partir daí a
    // centralização automática sai de cena e não rouba a posição dela.
    const touched = React.useRef(false);
    const lastMax = React.useRef(-1);

    React.useEffect(() => {
        const el = ref.current;
        if (!el) return;
        let frame = 0;

        const update = () => {
            frame = 0;
            const max = el.scrollWidth - el.clientWidth;

            // Trilho que nasce no meio: com carta sobrando dos dois lados,
            // o esfumado tem o que apagar em ambas as bordas. Encostado no
            // começo, o lado esquerdo não tem nada pra sumir e a primeira
            // carta parece cortada em vez de continuar.
            //
            // Centraliza o trilho.
            //
            // Sem usar scrollWidth: a pista tem width:max-content com recuo
            // lateral, e nesse arranjo o scrollWidth do scroller só passa a
            // contar o recuo depois de um flush de layout — centralizar por
            // ele deixava o trilho 100px fora do lugar. A borda direita da
            // última carta mais o recuo dá a largura real e é medida estável.
            const track = el.firstElementChild as HTMLElement | null;
            const last = track?.lastElementChild as HTMLElement | null;
            if (centerOnMount && !touched.current && track && last) {
                const padRight = parseFloat(getComputedStyle(track).paddingRight) || 0;
                const total = last.offsetLeft + last.offsetWidth + padRight;
                const target = Math.round((total - el.clientWidth) / 2);
                if (target > 0 && target !== lastMax.current) {
                    lastMax.current = target;
                    el.scrollLeft = target;
                    return;
                }
            }

            setEdges({ left: el.scrollLeft > 8, right: el.scrollLeft < max - 8 });
        };

        update();
        const settle = [200, 700, 1500].map((t) => window.setTimeout(update, t));
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        const onTouch = () => {
            touched.current = true;
        };
        el.addEventListener('scroll', onScroll, { passive: true });
        el.addEventListener('wheel', onTouch, { passive: true });
        el.addEventListener('pointerdown', onTouch, { passive: true });
        el.addEventListener('keydown', onTouch);
        window.addEventListener('resize', onScroll);

        // O trilho muda de largura conforme fontes e cartazes entram;
        // o observador reavalia sem precisar de timer chutado.
        const ro = new ResizeObserver(onScroll);
        ro.observe(el);
        if (el.firstElementChild) ro.observe(el.firstElementChild);

        return () => {
            el.removeEventListener('scroll', onScroll);
            el.removeEventListener('wheel', onTouch);
            el.removeEventListener('pointerdown', onTouch);
            el.removeEventListener('keydown', onTouch);
            window.removeEventListener('resize', onScroll);
            settle.forEach(window.clearTimeout);
            ro.disconnect();
            if (frame) cancelAnimationFrame(frame);
        };
    }, [centerOnMount]);

    const from = edges.left ? 'transparent 0, black 5%' : 'black 0';
    const to = edges.right ? 'black 95%, transparent 100%' : 'black 100%';
    const mask = `linear-gradient(to right, ${from}, ${to})`;

    return [ref, { maskImage: mask, WebkitMaskImage: mask }];
};

/** Entrada de baixo pra cima quando o elemento chega na tela.
 *
 *  Devolve 'idle' | 'off' | 'in'. O estado inicial é 'idle' e nele o
 *  elemento fica no lugar, visível: é assim que o HTML pré-renderizado
 *  sai, sem depender de JS pra ser lido. Só depois da montagem, e só se o
 *  elemento ainda estiver abaixo da dobra, ele vai pra 'off' e espera a
 *  vez. Quem já está na tela no carregamento nunca é escondido — esconder
 *  nessa hora daria um piscar em vez de uma entrada. */
export const useRevealOnView = <T extends HTMLElement>(): [
    React.RefObject<T>,
    'idle' | 'off' | 'in',
] => {
    const ref = React.useRef<T>(null);
    const [state, setState] = React.useState<'idle' | 'off' | 'in'>('idle');

    React.useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return;

        setState('off');
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        setState('in');
                        io.disconnect();
                    }
                });
            },
            { threshold: 0.18 },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return [ref, state];
};

/** Número que sobe de 0 até o valor quando entra na tela. Renderiza o
 *  valor final no HTML estático — crawler e leitor de tela veem o número. */
export const CountUp: React.FC<{
    value: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
}> = ({ value, decimals = 0, prefix = '', suffix = '', className }) => {
    const ref = React.useRef<HTMLSpanElement>(null);
    const [shown, setShown] = React.useState(value);

    React.useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const io = new IntersectionObserver(
            (entries) => {
                if (!entries.some((e) => e.isIntersecting)) return;
                io.disconnect();
                const t0 = performance.now();
                const tick = (now: number) => {
                    const t = Math.min(1, (now - t0) / 1400);
                    // ease-out cubic: rápido no começo, assenta no fim
                    setShown(value * (1 - Math.pow(1 - t, 3)));
                    if (t < 1) requestAnimationFrame(tick);
                };
                setShown(0);
                requestAnimationFrame(tick);
            },
            { threshold: 0.4 },
        );
        io.observe(el);
        return () => io.disconnect();
    }, [value]);

    return (
        <span ref={ref} className={className}>
            {prefix}
            {shown.toLocaleString('pt-BR', {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
            })}
            {suffix}
        </span>
    );
};

// Máscara de fade nas laterais dos carrosséis — a barra de rolagem é
// escondida via .no-scrollbar (index.css) e o gradiente dá a impressão
// de que o trilho continua além da borda do card.
export const EDGE_FADE: React.CSSProperties = {
    maskImage:
        'linear-gradient(to right, transparent 0, black 4%, black 96%, transparent 100%)',
    WebkitMaskImage:
        'linear-gradient(to right, transparent 0, black 4%, black 96%, transparent 100%)',
};
