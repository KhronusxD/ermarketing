import React, { useEffect, useState } from 'react';
import {
    Arrow,
    Eyebrow,
    NorteNav,
    NorteFooter,
    H2,
    CONTAINER,
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
                    {/* Duas colunas no desktop. Antes a agenda ocupava os
                        1174px inteiros do container, e ela não é feita pra
                        isso: a régua de dias virava uma fita com barra de
                        rolagem e os horários deixavam meia tela vazia à
                        direita. Num embed de terceiro, largura demais é tão
                        ruim quanto largura de menos. */}
                    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:grid-rows-[auto_1fr] lg:gap-x-16 xl:gap-x-24 lg:gap-y-0 lg:items-start">
                        <div className="max-w-xl lg:col-start-1 lg:row-start-1">
                            <Eyebrow>Último passo</Eyebrow>
                            <h1 className={`mt-4 ${H2} text-[clamp(30px,4.4vw,52px)]`}>
                                Escolha o melhor horário.
                            </h1>
                            <p className="mt-5 text-[15px] md:text-[17px] tracking-[-0.01em] text-black/45 leading-relaxed">
                                {handoff
                                    ? 'Já temos suas respostas em mãos — a conversa começa do ponto onde você parou, não do zero.'
                                    : 'Meia hora com um estrategista, no horário de Manaus.'}
                            </p>

                        </div>

                        {/* No celular a agenda vem logo depois do título:
                            quem chega aqui já sabe o que quer, e enterrar o
                            calendário embaixo de três parágrafos é obrigar a
                            pessoa a rolar pra fazer a única coisa que veio
                            fazer. No desktop ela volta pra coluna da direita
                            e o contexto ocupa a esquerda. */}
                        <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-start-1 lg:row-span-2 rounded-[24px] border border-black/[0.09] bg-white overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_34px_-18px_rgba(0,0,0,0.22)]">
                            <GyreHubAgenda
                                workspace={GYREHUB_WORKSPACE}
                                agenda={GYREHUB_AGENDA}
                            />
                        </div>

                        <div className="max-w-xl lg:col-start-1 lg:row-start-2">
                            <ul className="mt-12 lg:mt-9 space-y-5 border-t border-black/[0.08] pt-8">
                                {[
                                    ['Onde está vazando', 'A gente olha conta, criativo, oferta e funil pra achar por onde o dinheiro está escapando.'],
                                    ['O que faria diferença primeiro', 'Você sai da conversa com uma direção, não com um orçamento na mão.'],
                                    ['Quem atende', 'Um estrategista da casa. Não é ligação de vendedor com roteiro.'],
                                ].map(([titulo, texto]) => (
                                    <li key={titulo} className="flex gap-4">
                                        <span
                                            aria-hidden="true"
                                            className="mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: '#8DC63F' }}
                                        />
                                        <div>
                                            <p className="text-[15px] font-semibold tracking-[-0.01em]">{titulo}</p>
                                            <p className="mt-1 text-[14px] text-black/45 leading-relaxed">{texto}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-9 border-t border-black/[0.08] pt-7">
                                <p className="text-[14px] text-black/45 leading-relaxed">
                                    Prefere resolver por mensagem? O botão abre o WhatsApp
                                    {handoff ? ' já com tudo o que você respondeu escrito' : ''}.
                                </p>
                                <a
                                    href={waHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group mt-4 inline-flex items-center justify-center gap-2.5 rounded-full border border-black/15 hover:border-[#8DC63F] hover:bg-[#8DC63F] text-[#131313] hover:text-[#0B0E0C] font-semibold text-sm px-6 py-3.5 transition-colors"
                                >
                                    Falar no WhatsApp
                                    <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <NorteFooter />
        </div>
    );
};

export default Agendar;
