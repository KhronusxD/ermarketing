import React, { useEffect, useRef, useState } from 'react';

// Agenda do GyreHub embutida.
//
// O jeito oficial é soltar a tag <script src=".../embed/agenda.js"> na
// página, e ela mesma monta o iframe. Não dá pra usar assim hoje: o
// arquivo publicado em gyrehub.com.br tem `https://localhost:80` fixo no
// código — tanto no src do iframe quanto na checagem de origem do
// postMessage. Em produção isso manda o navegador de quem visita buscar a
// agenda na própria máquina dele, e não carrega nada.
//
// Então o iframe é montado aqui com o mesmo contrato do script: mesma
// rota, mesmo parâmetro `origem` e mesmo sandbox. Quando o agenda.js for
// corrigido, trocar este componente pela tag oficial é remover código.
//
// A altura é fixa e o iframe rola por dentro. O script oficial espera uma
// mensagem `gyrehub:altura` pra ajustar sozinho, mas testei escutando as
// mensagens do embed por 20 segundos e ela nunca chega — a página é um app
// de altura cheia (html/body em h-full), que preenche o que recebe em vez
// de reportar o que precisa. Com `scrolling="no"` e 420px, como faz o
// script, os horários ficavam cortados sem jeito de alcançar.
// O ouvinte continua aqui: se a mensagem passar a existir, ele assume.
//
// A agenda também confere o parâmetro `origem` contra uma lista do
// workspace: trafegomanaus.com.br (com e sem www) está liberado, localhost
// não. Em desenvolvimento o iframe responde "site não autorizado" — é o
// comportamento esperado, não defeito da integração.

const GYREHUB_ORIGIN = 'https://gyrehub.com.br';

type Props = {
    workspace: string;
    agenda: string;
    className?: string;
};

const GyreHubAgenda: React.FC<Props> = ({ workspace, agenda, className }) => {
    const frameRef = useRef<HTMLIFrameElement>(null);
    // Altura que mostra o seletor de dias e três a quatro fileiras de
    // horário sem obrigar a rolar logo de cara.
    const [height, setHeight] = useState(600);

    // Se um dia o embed passar a reportar a própria altura, o iframe
    // acompanha e o scroll interno deixa de ser necessário.
    useEffect(() => {
        const onMessage = (e: MessageEvent) => {
            if (e.origin !== GYREHUB_ORIGIN) return;
            const data = e.data as { tipo?: string; altura?: number } | null;
            if (!data || data.tipo !== 'gyrehub:altura') return;
            const h = Number(data.altura);
            if (h > 0 && h < 5000) setHeight(h);
        };
        window.addEventListener('message', onMessage);
        return () => window.removeEventListener('message', onMessage);
    }, []);

    const src =
        `${GYREHUB_ORIGIN}/a/${encodeURIComponent(workspace)}/${encodeURIComponent(agenda)}` +
        `/embed?origem=${encodeURIComponent(
            typeof window === 'undefined' ? '' : window.location.origin,
        )}`;

    return (
        <iframe
            ref={frameRef}
            src={src}
            title="Agendamento"
            loading="lazy"
            sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
            className={className}
            style={{
                width: '100%',
                border: 0,
                display: 'block',
                height,
                minHeight: 460,
                transition: 'height .2s ease',
            }}
        />
    );
};

export default GyreHubAgenda;
