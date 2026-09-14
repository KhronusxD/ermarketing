import React, { useEffect, useState } from 'react';
import {
    WHATSAPP,
    FORMULARIO,
    Arrow,
    Check,
    Eyebrow,
    NorteNav,
    NorteFooter,
    H1,
    H2,
    LABEL,
    PAPER,
    CREAM,
} from './shared';

// /trafego-pago-para-dentistas — LP de nicho.
//
// A rota tem o nome do termo de propósito. Medido no Planejador em
// 14/09/2026: "tráfego pago para dentista" tem 110 buscas/mês e subiu 60%
// no ano, enquanto "marketing para dentista" (210/mês) caiu 24%. O mercado
// está trocando a palavra "marketing" por "tráfego pago", e a URL, o H1 e a
// campanha precisam falar a língua de quem procura hoje.
//
// Enxuta de propósito: a home institucional tem 1.930 linhas, anel 3D e
// maquetes de serviço. Clonar aquilo pra nicho cria um duplicado que
// diverge na primeira alteração. Aqui é a mesma casca (NorteNav, rodapé,
// tokens) com conteúdo escrito só pra dentista.

const SECTION = 'py-16 md:py-24';
const CONTAINER = 'max-w-[1240px] mx-auto px-5 md:px-8';

const DORES = [
    [
        'Indicação é ótima, mas não escala.',
        'Quem indica indica quando lembra. No mês em que ninguém lembra, a agenda sente. E não dá pra planejar contratação nem investimento em cima de uma coisa que você não controla.',
    ],
    [
        'Impulsionar post traz curioso.',
        'O botão de impulsionar entrega o post pra quem já te segue e pra quem clica em tudo. Quem está com dor de dente hoje, ou decidiu fazer um implante, está pesquisando no Google agora.',
    ],
    [
        'Ninguém sabe quanto custa um paciente novo.',
        'Sem essa conta, toda decisão vira palpite: aumentar verba é aposta, cortar é medo, e trocar de agência é sorteio. É a pergunta que a gente responde primeiro.',
    ],
];

const ENTREGAS = [
    'Campanhas no Google e no Meta para quem procura dentista na sua cidade',
    'Medição instalada e testada antes de qualquer verba subir',
    'O lead cai direto no seu WhatsApp, com o histórico registrado no CRM',
    'Relatório semanal com custo por lead e custo por paciente agendado',
];

const BONUS: [string, string][] = [
    [
        'Google Meu Negócio atualizado',
        'É o primeiro lugar onde alguém procura "dentista perto de mim". Fazemos a primeira arrumação completa do perfil: dados, categoria, fotos, serviços e horário.',
    ],
    [
        'Rastreamento de paciente no WhatsApp',
        'O paciente que fechou na conversa volta amarrado ao anúncio que o trouxe. É o que separa "o anúncio deu mensagem" de "o anúncio encheu a cadeira".',
    ],
    [
        'Painel em tempo real',
        'Os números da sua conta num painel com link próprio, aberto quando você quiser, mais a leitura semanal do que mudou. Não é PDF no dia 5.',
    ],
    [
        'Linktree personalizado',
        'A sua página de links com a cara da clínica, e todo clique medido, pra saber de onde vem quem chega.',
    ],
];

const PASSOS: [string, string][] = [
    ['Dias 1 e 2', 'Contrato, acessos e imersão: qual procedimento dá mais margem, qual enche a agenda, e quem já é seu paciente.'],
    ['Dias 3 a 5', 'Medição instalada e conferida. Google Meu Negócio arrumado. Painel no ar.'],
    ['Dias 6 e 7', 'Primeira campanha no ar, com as peças validadas dentro da régua do conselho.'],
    ['Dos 30 aos 90', 'O primeiro mês é de calibração e serve pra aprender. Dos 60 aos 90 dias a curva acelera.'],
];

const FAQ: [string, string][] = [
    [
        'Posso anunciar antes e depois?',
        'É a pergunta que mais aparece, e a resposta honesta é: antes e depois, anúncio de preço e promessa de resultado são os pontos mais sensíveis da publicidade odontológica. A Norte monta a campanha dentro dessa régua e valida as peças com você e com o responsável técnico da clínica. Se uma ideia boa não passar na regra, ela não vai ao ar.',
    ],
    [
        'Em quanto tempo aparece paciente?',
        'Os primeiros 30 dias são de calibração, e nesse período o número serve pra aprender, não pra julgar. Dos 60 aos 90 dias a curva acelera. Quem promete agenda cheia no primeiro mês está chutando.',
    ],
    [
        'Vocês atendem clínica fora de Manaus?',
        'Sim. A Norte é de Manaus e atende o Brasil inteiro. Tráfego pago não depende de a gente estar na mesma cidade, e a reunião semanal é por chamada.',
    ],
    [
        'Preciso ter um Instagram bonito antes de anunciar?',
        'Não precisa estar bonito, precisa não estar abandonado. Quem clica no anúncio quase sempre passa no perfil antes de mandar mensagem. Se o seu estiver parado há meses, a gente fala isso na primeira conversa, antes de você gastar verba.',
    ],
    [
        'Quanto preciso investir de verba?',
        'A recomendação pra começar é R$ 1.000 por mês de verba de mídia, além do honorário. A verba é paga direto na plataforma, no seu cartão e na sua conta. A Norte nunca pede senha nem movimenta dinheiro de cliente.',
    ],
];

const Dentistas: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="min-h-screen bg-white text-[#131313] font-sans antialiased selection:bg-[#8DC63F] selection:text-[#0B0E0C]">
            <NorteNav scrolled={scrolled} enxuta />

            {/* ═══ Hero ═══ */}
            <section className="relative bg-[#14261A] text-white overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-32 right-[-10%] w-[620px] h-[620px] rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(141,198,63,0.18) 0%, transparent 65%)' }}
                />
                <div className={`relative ${CONTAINER}`}>
                    <div className="max-w-4xl">
                        <Eyebrow light>Tráfego pago para clínicas odontológicas</Eyebrow>

                        <h1 className={`mt-4 ${H1} mb-6`} style={{ fontSize: 'clamp(32px, 5vw, 62px)' }}>
                            Cadeira vazia raramente é falta de paciente.
                            <br />
                            <span className="text-white/55">
                                É falta de quem saiba que a sua clínica existe.
                            </span>
                        </h1>

                        <p className="text-[16px] md:text-[20px] tracking-[-0.01em] text-white/65 leading-relaxed max-w-2xl mb-9">
                            A Norte coloca a sua clínica na frente de quem já está
                            procurando dentista na sua cidade, e mostra, toda semana,
                            quanto custou cada paciente novo.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-2.5">
                            <a
                                href={FORMULARIO}
                                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#8DC63F] hover:bg-[#9ed650] text-[#0B0E0C] font-semibold text-sm pl-6 pr-2 py-2 transition-colors"
                            >
                                Quero um diagnóstico da minha clínica
                                <span className="w-8 h-8 rounded-full bg-[#0B0E0C] text-[#8DC63F] flex items-center justify-center transition-transform group-hover:rotate-45">
                                    <Arrow className="w-4 h-4 -rotate-45" />
                                </span>
                            </a>
                            <a
                                href={WHATSAPP}
                                data-whatsapp
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center rounded-full border border-white/25 hover:bg-white/10 text-white font-semibold text-sm px-7 py-3.5 transition-colors"
                            >
                                Falar no WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ A prova ═══ */}
            <section className={SECTION} style={{ backgroundColor: CREAM }}>
                <div className={CONTAINER}>
                    <Eyebrow>Um caso real</Eyebrow>
                    <div className="mt-8 grid md:grid-cols-[1fr_auto] md:items-end gap-10">
                        <div>
                            <div className="flex flex-wrap items-baseline gap-x-14 gap-y-8">
                                {[
                                    ['5.193', 'leads captados'],
                                    ['R$ 1,57', 'por lead'],
                                ].map(([n, l]) => (
                                    <div key={l}>
                                        <div
                                            className={`${H2} text-[#14261A]`}
                                            style={{ fontSize: 'clamp(44px, 7vw, 86px)' }}
                                        >
                                            {n}
                                        </div>
                                        <div className={`${LABEL} text-black/45 mt-2`}>{l}</div>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-9 text-[15px] md:text-[18px] text-black/55 leading-relaxed max-w-xl">
                                A Odonto Solutions procurou a Norte com o mesmo problema
                                que você provavelmente tem: dependia de indicação e não
                                conseguia dizer quanto custava trazer um paciente.
                            </p>
                            <p className={`${LABEL} text-black/35 mt-6`}>
                                Resultado deles, com a operação deles.
                            </p>
                        </div>
                        <img
                            src="/clientes/logos/odonto-solutions.png"
                            alt="Odonto Solutions"
                            loading="lazy"
                            className="h-14 md:h-20 w-auto opacity-60 self-start md:self-end"
                        />
                    </div>
                </div>
            </section>

            {/* ═══ O problema ═══ */}
            <section className={`bg-white ${SECTION}`}>
                <div className={CONTAINER}>
                    <h2 className={`${H2} max-w-3xl`} style={{ fontSize: 'clamp(28px, 4.2vw, 52px)' }}>
                        Três coisas que a gente ouve
                        <br />
                        de quase toda clínica.
                    </h2>
                    <div className="mt-14 grid md:grid-cols-3 gap-y-10 md:gap-x-12">
                        {DORES.map(([t, d], i) => (
                            <div key={t} className={i ? 'md:border-l md:border-black/[0.08] md:pl-12' : ''}>
                                <span className={`${LABEL} text-[#6A9C27]`}>
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <h3 className="mt-4 text-[19px] md:text-[22px] font-semibold tracking-[-0.02em] leading-snug">
                                    {t}
                                </h3>
                                <p className="mt-3 text-[15px] text-black/55 leading-relaxed">{d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ O que entra ═══ */}
            <section className={SECTION} style={{ backgroundColor: PAPER }}>
                <div className={CONTAINER}>
                    <div className="grid md:grid-cols-2 md:gap-20 gap-10">
                        <div>
                            <Eyebrow>O que a Norte faz</Eyebrow>
                            <h2
                                className={`mt-4 ${H2}`}
                                style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
                            >
                                Campanha é o meio.
                                <br />
                                <span className="text-black/40">Agenda cheia é o fim.</span>
                            </h2>
                            <p className="mt-6 text-[15px] md:text-[17px] text-black/55 leading-relaxed">
                                A medição entra antes da verba. Sem evento de conversão
                                instalado e testado, você não sabe qual anúncio trouxe qual
                                paciente, e passa a otimizar no escuro.
                            </p>
                        </div>
                        <ul className="space-y-0 self-center">
                            {ENTREGAS.map((e, i) => (
                                <li
                                    key={e}
                                    className={`flex gap-4 items-start py-5 ${i ? 'border-t border-black/[0.08]' : ''}`}
                                >
                                    <span className="mt-1 w-5 h-5 rounded-full bg-[#8DC63F] text-[#0B0E0C] flex items-center justify-center flex-shrink-0">
                                        <Check className="w-3 h-3" />
                                    </span>
                                    <span className="text-[15px] md:text-[17px] leading-relaxed">{e}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ═══ A régua do conselho ═══ */}
            <section className="bg-[#14261A] text-white py-14 md:py-20">
                <div className={CONTAINER}>
                    <div className="max-w-3xl">
                        <Eyebrow light>Publicidade odontológica</Eyebrow>
                        <h2 className={`mt-4 ${H2}`} style={{ fontSize: 'clamp(26px, 3.4vw, 40px)' }}>
                            A regra do conselho faz parte do trabalho,
                            <br />
                            <span className="text-white/50">não é problema seu.</span>
                        </h2>
                        <p className="mt-6 text-[15px] md:text-[17px] text-white/60 leading-relaxed">
                            Antes e depois, anúncio de preço e promessa de resultado são os
                            pontos mais sensíveis da publicidade odontológica, e é onde a
                            maioria dos anúncios tropeça. A Norte monta a campanha dentro
                            dessa régua e valida cada peça com você e com o responsável
                            técnico da clínica. Se uma ideia boa não passar na regra, ela
                            não vai ao ar.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══ Bônus ═══ */}
            <section className={`bg-white ${SECTION}`}>
                <div className={CONTAINER}>
                    <Eyebrow>Incluído, sem cobrar à parte</Eyebrow>
                    <h2 className={`mt-4 ${H2} max-w-2xl`} style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
                        Quatro coisas que vêm junto.
                    </h2>
                    <div className="mt-14 grid md:grid-cols-2 gap-x-14 gap-y-0">
                        {BONUS.map(([t, d], i) => (
                            <div
                                key={t}
                                className={`py-7 ${i ? 'border-t border-black/[0.08]' : ''} ${i === 1 ? 'md:border-t-0' : ''} ${i % 2 ? 'md:border-l md:border-black/[0.08] md:pl-14' : ''}`}
                            >
                                <h3 className="text-[18px] md:text-[21px] font-semibold tracking-[-0.02em]">
                                    {t}
                                </h3>
                                <p className="mt-3 text-[15px] text-black/55 leading-relaxed">{d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Como começa ═══ */}
            <section className={SECTION} style={{ backgroundColor: CREAM }}>
                <div className={CONTAINER}>
                    <h2 className={`${H2} max-w-2xl`} style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
                        Como começa.
                    </h2>
                    <div className="mt-12 max-w-4xl">
                        {PASSOS.map(([q, o], i) => (
                            <div
                                key={q}
                                className={`flex flex-col sm:flex-row sm:gap-12 gap-2 py-6 ${i ? 'border-t border-black/[0.08]' : ''}`}
                            >
                                <span className={`${LABEL} text-[#6A9C27] sm:min-w-[150px] sm:pt-1`}>
                                    {q}
                                </span>
                                <span className="text-[15px] md:text-[17px] text-black/60 leading-relaxed">
                                    {o}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Quanto custa ═══ */}
            <section className={`bg-white ${SECTION}`}>
                <div className={CONTAINER}>
                    <div className="max-w-3xl">
                        <Eyebrow>Transparência</Eyebrow>
                        <h2 className={`mt-4 ${H2}`} style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
                            Quanto custa, antes de você
                            <br />
                            <span className="text-black/40">perder uma hora em reunião.</span>
                        </h2>
                        <div className="mt-9 flex flex-wrap items-baseline gap-x-12 gap-y-6">
                            <div>
                                <div className={`${H2} text-[#14261A]`} style={{ fontSize: 'clamp(34px, 5vw, 58px)' }}>
                                    R$ 1.800
                                </div>
                                <div className={`${LABEL} text-black/45 mt-2`}>por mês de honorário</div>
                            </div>
                            <div>
                                <div className={`${H2} text-black/35`} style={{ fontSize: 'clamp(34px, 5vw, 58px)' }}>
                                    R$ 1.000
                                </div>
                                <div className={`${LABEL} text-black/45 mt-2`}>de verba, no seu cartão</div>
                            </div>
                        </div>
                        <p className="mt-8 text-[15px] md:text-[17px] text-black/55 leading-relaxed">
                            A verba de mídia é paga direto na plataforma, na sua conta. A
                            Norte nunca pede senha nem movimenta dinheiro de cliente.
                            Dizemos o valor aqui de propósito: ninguém precisa perder uma
                            hora pra descobrir que o momento não é esse.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══ FAQ ═══ */}
            <section className={SECTION} style={{ backgroundColor: PAPER }}>
                <div className={CONTAINER}>
                    <h2 className={`${H2} max-w-2xl`} style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
                        Perguntas que sempre aparecem.
                    </h2>
                    <div className="mt-12 max-w-4xl">
                        {FAQ.map(([p, r], i) => (
                            <details key={p} className={`group py-6 ${i ? 'border-t border-black/[0.08]' : ''}`}>
                                <summary className="flex items-start justify-between gap-6 cursor-pointer list-none text-[17px] md:text-[20px] font-semibold tracking-[-0.02em]">
                                    {p}
                                    <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full border border-black/15 flex items-center justify-center transition-transform group-open:rotate-45">
                                        <span className="block w-2.5 h-px bg-black/45" />
                                        <span className="block w-px h-2.5 bg-black/45 -ml-[5px]" />
                                    </span>
                                </summary>
                                <p className="mt-4 text-[15px] md:text-[16px] text-black/55 leading-relaxed max-w-3xl">
                                    {r}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Fechamento ═══ */}
            <section className="bg-[#14261A] text-white py-20 md:py-28">
                <div className={CONTAINER}>
                    <div className="max-w-3xl">
                        <h2 className={H1} style={{ fontSize: 'clamp(30px, 4.6vw, 58px)' }}>
                            Vamos encher a sua agenda?
                        </h2>
                        <p className="mt-6 text-[15px] md:text-[19px] text-white/60 leading-relaxed max-w-xl">
                            Trinta minutos com um estrategista. Você conta onde está
                            travando, a gente devolve onde está vazando e o que faria
                            diferença primeiro.
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row gap-2.5">
                            <a
                                href={FORMULARIO}
                                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#8DC63F] hover:bg-[#9ed650] text-[#0B0E0C] font-semibold text-sm md:text-base pl-7 pr-2.5 py-2.5 transition-colors"
                            >
                                Quero um diagnóstico da minha clínica
                                <span className="w-9 h-9 rounded-full bg-[#0B0E0C] text-[#8DC63F] flex items-center justify-center transition-transform group-hover:rotate-45">
                                    <Arrow className="w-4 h-4 -rotate-45" />
                                </span>
                            </a>
                            <a
                                href={WHATSAPP}
                                data-whatsapp
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center rounded-full border border-white/25 hover:bg-white/10 text-white font-semibold text-sm md:text-base px-7 py-4 transition-colors"
                            >
                                Falar no WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <NorteFooter />
        </div>
    );
};

export default Dentistas;
