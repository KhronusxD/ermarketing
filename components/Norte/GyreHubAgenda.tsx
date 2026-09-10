import React, { useEffect, useRef, useState } from 'react';
import { converter, rastrear } from '../tracking';

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
// A altura é fixa e o iframe rola por dentro, porque hoje não dá pra
// confiar na altura que o embed reporta. Medido em 09/09/2026, escutando
// as mensagens do embed em produção: ele manda `gyrehub:altura` **uma
// única vez, com altura 0**, cerca de 1,3s depois de carregar, e nunca
// mais. (Correção de um comentário anterior, que dizia que a mensagem
// nunca chegava — ela chega, só chega zerada.)
//
// A causa está no lado do GyreHub, em `components/agendamento/
// agenda-embed.tsx`: `avisar()` roda com o ref ainda vazio, cai no
// fallback `document.body.scrollHeight` (0 àquela altura), e o
// `ResizeObserver` fica dentro de um `if (ref.current && ...)` que não
// chega a ser satisfeito — por isso a única mensagem. Enquanto isso não
// for corrigido lá, altura automática aqui só encolheria o iframe a zero.
//
// O guard `h > 0` abaixo é o que impede isso de acontecer. Quando o
// embed passar a reportar direito, ele assume sozinho e a altura fixa
// deixa de importar.
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
    const [height, setHeight] = useState(760);

    // Se um dia o embed passar a reportar a própria altura, o iframe
    // acompanha e o scroll interno deixa de ser necessário.
    // O agendamento em si acontece DENTRO do iframe, em outro domínio.
    // Não dá pra observar de fora: nem clique, nem navegação, nem DOM.
    // Se o GyreHub um dia avisar por postMessage, a conversão dispara.
    // Enquanto isso, a medição confiável do funil para na conversa
    // concluída, que acontece um passo antes.
    const jaContou = useRef(false);

    useEffect(() => {
        const onMessage = (e: MessageEvent) => {
            if (e.origin !== GYREHUB_ORIGIN) return;
            const data = e.data as { tipo?: string; altura?: number } | null;
            if (!data) return;

            if (
                !jaContou.current &&
                typeof data.tipo === 'string' &&
                /agendad|confirmad|booked|scheduled/i.test(data.tipo)
            ) {
                jaContou.current = true;
                converter('agendamento');
                rastrear('Schedule', { content_name: 'Agenda Norte' });
            }

            if (data.tipo !== 'gyrehub:altura') return;
            const h = Number(data.altura);
            if (h > 0 && h < 5000) setHeight(h);
        };
        window.addEventListener('message', onMessage);
        return () => window.removeEventListener('message', onMessage);
    }, []);

    // Calculado uma vez. Se o src for recomputado a cada render do pai, o
    // React troca o atributo e o iframe recarrega — e recarregar no meio do
    // preenchimento apaga o horário escolhido e o que já foi digitado.
    const [src] = useState(
        () =>
            `${GYREHUB_ORIGIN}/a/${encodeURIComponent(workspace)}/${encodeURIComponent(agenda)}` +
            `/embed?origem=${encodeURIComponent(
                typeof window === 'undefined' ? '' : window.location.origin,
            )}`,
    );

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
                minHeight: 620,
            }}
        />
    );
};

// memo: o pai re-renderiza a cada mensagem e a cada evento de scroll, e
// nada disso deve chegar no iframe.
export default React.memo(GyreHubAgenda);
