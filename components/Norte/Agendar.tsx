import React, { useEffect, useState } from 'react';
import {
    Arrow,
    Eyebrow,
    NorteNav,
    NorteFooter,
    H2,
    CONTAINER,
    PAPER,
} from './shared';
import GyreHubAgenda from './GyreHubAgenda';
import { whatsappUrlWithSummary } from '../Quiz/summary';
import { QuizAnswers } from '../Quiz/types';

// /agendar — página de agendamento, destino de quem termina a conversa.
//
// A agenda morava dentro do bate-papo e não funcionava bem ali: o embed é
// um iframe branco no meio de uma tela escura, e a conversa re-renderiza a
// cada mensagem, a cada rolagem e a cada mudança de altura. Digitar dentro
// de um iframe que vive nesse ambiente é pedir pra perder o foco.
//
// Aqui a página é praticamente estática: nada acima do iframe muda depois
// que carrega. É a diferença entre remover as causas uma a uma e tirar o
// componente do lugar onde elas existem.

const GYREHUB_WORKSPACE = '298c4d68-d1f9-46ab-ae76-3e6e2f69671a';
const GYREHUB_AGENDA = 'norte-call';
const WA_PHONE = '5592985146299';

// A conversa deixa as respostas aqui antes de encaminhar. sessionStorage e
// não URL: são dados de negócio de quem respondeu, e não têm por que
// aparecer na barra de endereço nem vazar em print ou histórico.
export const HANDOFF_KEY = 'norte:conversa';

type Handoff = { answers: QuizAnswers };

const Agendar: React.FC = () => {
    const [handoff, setHandoff] = useState<Handoff | null>(null);

    // Navegação em SPA não zera a rolagem: vindo do fim da conversa, a
    // pessoa cairia aqui já no meio da página, sem ver a agenda.
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    useEffect(() => {
        try {
            const raw = sessionStorage.getItem(HANDOFF_KEY);
            if (raw) setHandoff(JSON.parse(raw) as Handoff);
        } catch {
            // storage bloqueado ou conteúdo inválido: a página segue de pé,
            // só sem o resumo no botão de WhatsApp.
        }
    }, []);

    const waHref = whatsappUrlWithSummary(WA_PHONE, {}, handoff?.answers ?? {});

    return (
        <div className="min-h-screen bg-white text-[#131313] font-sans antialiased selection:bg-[#8DC63F] selection:text-[#0B0E0C]">
            {/* Sempre a pílula branca: o fundo é claro desde o topo, e a
                logo branca sumiria nele. */}
            <NorteNav scrolled />

            <main className="pt-28 md:pt-36 pb-16 md:pb-24">
                <div className={CONTAINER}>
                    <div className="max-w-2xl mb-9 md:mb-12">
                        <Eyebrow>Último passo</Eyebrow>
                        <h1 className={`mt-4 ${H2} text-[clamp(30px,4.4vw,52px)]`}>
                            Escolhe o melhor horário.
                        </h1>
                        <p className="mt-5 text-[15px] md:text-[17px] tracking-[-0.01em] text-black/45 leading-relaxed">
                            {handoff
                                ? 'Já temos suas respostas em mãos — a conversa começa do ponto onde você parou, não do zero.'
                                : 'São 30 minutos, no horário de Manaus, direto com um estrategista.'}
                        </p>
                    </div>

                    <div
                        className="rounded-[24px] border border-black/[0.07] overflow-hidden"
                        style={{ backgroundColor: PAPER }}
                    >
                        <GyreHubAgenda
                            workspace={GYREHUB_WORKSPACE}
                            agenda={GYREHUB_AGENDA}
                        />
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                        <p className="text-[14px] text-black/45 flex-1">
                            Prefere resolver por mensagem? O botão abre o WhatsApp
                            {handoff ? ' já com tudo o que você respondeu escrito' : ''}.
                        </p>
                        <a
                            href={waHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex flex-shrink-0 items-center justify-center gap-2.5 rounded-full border border-black/15 hover:border-[#8DC63F] hover:bg-[#8DC63F] text-[#131313] hover:text-[#0B0E0C] font-semibold text-sm px-6 py-3.5 transition-colors"
                        >
                            Falar no WhatsApp
                            <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </a>
                    </div>
                </div>
            </main>

            <NorteFooter />
        </div>
    );
};

export default Agendar;
