import React, { useEffect, useState } from 'react';
import {
    WHATSAPP,
    FORMULARIO,
    Arrow,
    Check,
    Eyebrow,
    NorteNav,
    NorteFooter,
    CountUp,
    useScrollReveal,
    IconSearch,
    IconRoute,
    IconRocket,
    IconChart,
    IconCompass,
    H1,
    H2,
    LABEL,
    PAPER,
    CREAM,
} from './shared';
import {
    AnelDeCards,
    ServiceMock,
    MethodAccordion,
    Manifesto,
    ResultViz,
    RESULT_SKINS,
    RES_SKIN,
    type FanCard,
    type Token,
    type Passo,
} from './home-pecas';

// /dentistas — versão rica da LP de odontologia.
//
// Mesma copy da /trafego-pago-para-dentistas, com o maquinário visual da
// institucional: anel de cartas girando, manifesto que se revela na
// rolagem, contadores, acordeão do método e as maquetes de interface.
//
// As duas existem pra serem comparadas com verba real. A enxuta carrega
// menos e vai direto ao ponto; esta impressiona mais e pede mais scroll.
// Qual converte dentista é pergunta empírica, não de gosto.
//
// Nenhuma peça foi duplicada: tudo vem de Norte/home-pecas.tsx, que saiu
// de dentro da NorteLanding justamente pra isso.

const SECTION = 'py-16 md:py-24';
const CONTAINER = 'max-w-[1240px] mx-auto px-5 md:px-8';

// O anel. Só dado real do dossiê — a Norte tem dois clientes de saúde
// (Odonto Solutions e Bem Fisio), então as cartas de saúde vêm primeiro e
// o resto da volta se completa com o método e com resultado de outros
// segmentos, que é o que prova operação. Inventar doze clínicas aqui seria
// o jeito mais rápido de perder a venda na primeira pergunta.
const ANEL: FanCard[] = [
    { kind: 'dash', skin: 'white', tag: 'Odontologia', client: 'Odonto Solutions', metric: 'R$ 1,57', label: 'custo por lead' },
    { kind: 'statement', skin: 'dark', tag: 'Nosso método', line: 'Medição instalada antes da verba subir.' },
    { kind: 'accent', skin: 'lime', tag: 'Odontologia', client: 'Odonto Solutions', metric: '5.193', label: 'leads captados' },
    { kind: 'metric', skin: 'glass', tag: 'Saúde', client: 'Bem Fisio', metric: '+450', label: 'leads/mês' },
    { kind: 'statement', skin: 'dark', tag: 'Nosso método', line: 'Cada real medido em CAC e ROAS.' },
    { kind: 'chart', skin: 'white', tag: 'Restaurante', client: 'Taychi Sushi', metric: '200k', label: 'faturamento/mês', bars: [26, 33, 41, 49, 63, 78, 100] },
    { kind: 'metric', skin: 'glass', tag: 'Construção', client: 'Conceito Obras', metric: '+150', label: 'leads/mês' },
    { kind: 'statement', skin: 'dark', tag: 'Nosso método', line: 'Relatório semanal, sem achismo.' },
    { kind: 'pills', skin: 'white', tag: 'Varejo', client: 'Amazon One', metric: 'R$ 1M', label: 'em 6 meses', pills: ['Meta Ads', 'Google', 'Remarketing', 'CRM'] },
    { kind: 'metric', skin: 'glass', tag: 'Serviços', client: 'iTV Manaus', metric: 'R$ 15k', label: 'de faturamento' },
    { kind: 'statement', skin: 'dark', tag: 'Nosso método', line: 'Time fixo, com nome, na sua conta.' },
    { kind: 'accent', skin: 'lime', tag: 'Infoproduto', client: 'A Escola de Sites', metric: '+20 mil', label: 'leads gerados' },
];

const MANIFESTO_DENTISTA: Token[] = [
    'Quem', 'procura', { chip: IconCompass }, 'dentista', 'hoje',
    'precisa', { chip: IconRocket }, 'achar', 'você.',
];
const MANIFESTO_FORTES = new Set(['achar', 'você.']);

const PASSOS: Passo[] = [
    {
        icon: IconSearch,
        title: 'Diagnóstico',
        lead: 'Entender a sua clínica',
        body: 'Qual procedimento dá mais margem, qual enche a agenda, quanto vale um paciente novo pra você e por onde eles chegam hoje. Sem isso, campanha é chute caro.',
    },
    {
        icon: IconRoute,
        title: 'Medição',
        lead: 'Antes de qualquer verba',
        body: 'Evento de conversão instalado e testado, Google Meu Negócio arrumado e o lead caindo no WhatsApp com registro. Se não dá pra medir, não sobe.',
    },
    {
        icon: IconRocket,
        title: 'Campanha',
        lead: 'No ar, dentro da régua',
        body: 'Google e Meta mirando quem procura dentista na sua cidade, com as peças validadas dentro da regra do conselho antes de publicar.',
    },
    {
        icon: IconChart,
        title: 'Escala',
        lead: 'Com dado, não com fé',
        body: 'Com custo por paciente estável, a verba sobe onde o dado manda subir. Toda semana você recebe o que mudou e por quê.',
    },
];

const DORES = [
    ['Indicação é ótima, mas não escala.', 'Quem indica indica quando lembra. No mês em que ninguém lembra, a agenda sente. E não dá pra planejar contratação nem equipamento em cima de uma coisa que você não controla.'],
    ['Impulsionar post traz curioso.', 'O botão de impulsionar entrega pra quem já te segue e pra quem clica em tudo. Quem está com dor hoje, ou decidiu fazer um implante, está pesquisando no Google agora.'],
    ['Ninguém sabe quanto custa um paciente novo.', 'Sem essa conta, toda decisão vira palpite: aumentar verba é aposta, cortar é medo, trocar de agência é sorteio.'],
];

const BONUS: [string, string][] = [
    ['Google Meu Negócio atualizado', 'É o primeiro lugar onde alguém procura "dentista perto de mim". Fazemos a primeira arrumação completa do perfil: dados, categoria, fotos, serviços e horário.'],
    ['Rastreamento de paciente no WhatsApp', 'O paciente que fechou na conversa volta amarrado ao anúncio que o trouxe. É o que separa "o anúncio deu mensagem" de "o anúncio encheu a cadeira".'],
    ['Painel em tempo real', 'Os números da sua conta num painel com link próprio, aberto quando você quiser, mais a leitura semanal do que mudou. Não é PDF no dia 5.'],
    ['Linktree personalizado', 'A sua página de links com a cara da clínica, e todo clique medido, pra saber de onde vem quem chega.'],
];

const RESULTADOS = [
    { client: 'Odonto Solutions', category: 'Odontologia', headline: '5.193 leads', body: 'captados a R$ 1,57 cada.' },
    { client: 'Bem Fisio', category: 'Saúde', headline: '+450 leads/mês', body: 'com funil de agendamento.' },
    { client: 'Taychi Sushi', category: 'Restaurante', headline: '70k → 200k/mês', body: 'em 7 meses, com funis pra loja física.' },
    { client: 'Conceito Obras', category: 'Construção', headline: '+150 leads/mês', body: 'qualificados, em Steel Frame.' },
    { client: 'Amazon One', category: 'Varejo', headline: 'R$ 1M', body: 'de faturamento em 6 meses.' },
    { client: 'iTV Manaus', category: 'Serviços', headline: 'R$ 15 mil', body: 'de faturamento com leads a R$ 0,50/dia.' },
];

const FAQ: [string, string][] = [
    ['Posso anunciar antes e depois?', 'É a pergunta que mais aparece, e a resposta honesta é: antes e depois, anúncio de preço e promessa de resultado são os pontos mais sensíveis da publicidade odontológica. A Norte monta a campanha dentro dessa régua e valida as peças com você e com o responsável técnico da clínica. Se uma ideia boa não passar na regra, ela não vai ao ar.'],
    ['Em quanto tempo aparece paciente?', 'Os primeiros 30 dias são de calibração, e nesse período o número serve pra aprender, não pra julgar. Dos 60 aos 90 dias a curva acelera. Quem promete agenda cheia no primeiro mês está chutando.'],
    ['Vocês atendem clínica fora de Manaus?', 'Sim. A Norte é de Manaus e atende o Brasil inteiro. Tráfego pago não depende de a gente estar na mesma cidade, e a reunião semanal é por chamada.'],
    ['Preciso ter um Instagram bonito antes de anunciar?', 'Não precisa estar bonito, precisa não estar abandonado. Quem clica no anúncio quase sempre passa no perfil antes de mandar mensagem. Se o seu estiver parado há meses, a gente fala isso na primeira conversa, antes de você gastar verba.'],
    ['Quanto preciso investir de verba?', 'A recomendação pra começar é R$ 1.000 por mês de verba de mídia, além do honorário. A verba é paga direto na plataforma, no seu cartão e na sua conta. A Norte nunca pede senha nem movimenta dinheiro de cliente.'],
];

const DentistasCompleta: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    useScrollReveal();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="min-h-screen bg-white text-[#131313] font-sans antialiased selection:bg-[#8DC63F] selection:text-[#0B0E0C]">
            <NorteNav scrolled={scrolled} enxuta />

            {/* ═══ Hero com o anel ═══ */}
            <section className="relative bg-[#14261A] text-white overflow-hidden pt-28 md:pt-36 pb-16 md:pb-20">
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
                            <span className="text-white/55">É falta de quem saiba que a sua clínica existe.</span>
                        </h1>
                        <p className="text-[16px] md:text-[20px] tracking-[-0.01em] text-white/65 leading-relaxed max-w-2xl mb-9">
                            A Norte coloca a sua clínica na frente de quem já está procurando
                            dentista na sua cidade, e mostra, toda semana, quanto custou cada
                            paciente novo.
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

                    <AnelDeCards cards={ANEL} />
                </div>
            </section>

            {/* ═══ Manifesto ═══ */}
            <section className={`bg-white ${SECTION} text-center`}>
                <div className={CONTAINER}>
                    <Manifesto tokens={MANIFESTO_DENTISTA} fortes={MANIFESTO_FORTES} />
                </div>
            </section>

            {/* ═══ Os números do case ═══ */}
            <section className={SECTION} style={{ backgroundColor: CREAM }}>
                <div className={CONTAINER}>
                    <Eyebrow>Um caso real</Eyebrow>
                    <div className="mt-9 grid md:grid-cols-[1fr_auto] md:items-end gap-10">
                        <div>
                            <div className="flex flex-wrap items-baseline gap-x-16 gap-y-8">
                                <div>
                                    <CountUp
                                        value={5193}
                                        className={`${H2} text-[#14261A] block`}
                                        style={{ fontSize: 'clamp(44px, 7vw, 86px)', lineHeight: 1 }}
                                    />
                                    <div className={`${LABEL} text-black/45 mt-3`}>leads captados</div>
                                </div>
                                <div>
                                    <CountUp
                                        prefix="R$ "
                                        value={1.57}
                                        decimals={2}
                                        className={`${H2} text-[#14261A] block`}
                                        style={{ fontSize: 'clamp(44px, 7vw, 86px)', lineHeight: 1 }}
                                    />
                                    <div className={`${LABEL} text-black/45 mt-3`}>por lead</div>
                                </div>
                            </div>
                            <p className="mt-9 text-[15px] md:text-[18px] text-black/55 leading-relaxed max-w-xl">
                                A Odonto Solutions procurou a Norte com o mesmo problema que
                                você provavelmente tem: dependia de indicação e não conseguia
                                dizer quanto custava trazer um paciente.
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

            {/* ═══ O problema, com maquete ═══ */}
            <section className={`bg-white ${SECTION}`}>
                <div className={CONTAINER}>
                    <div className="grid lg:grid-cols-2 lg:gap-20 gap-12 items-center">
                        <div>
                            <h2 className={H2} style={{ fontSize: 'clamp(28px, 4.2vw, 50px)' }}>
                                Três coisas que a gente ouve
                                <br />
                                de quase toda clínica.
                            </h2>
                            <div className="mt-10">
                                {DORES.map(([t, d], i) => (
                                    <div key={t} className={`py-6 ${i ? 'border-t border-black/[0.08]' : ''}`}>
                                        <div className="flex gap-4 items-baseline">
                                            <span className={`${LABEL} text-[#6A9C27] flex-shrink-0`}>
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                            <div>
                                                <h3 className="text-[19px] md:text-[22px] font-semibold tracking-[-0.02em] leading-snug">
                                                    {t}
                                                </h3>
                                                <p className="mt-2.5 text-[15px] text-black/55 leading-relaxed">{d}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative h-[360px] md:h-[440px] rounded-[26px] overflow-hidden" style={{ backgroundColor: PAPER }}>
                            <ServiceMock slug="trafego-pago" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Método ═══ */}
            <section className={SECTION} style={{ backgroundColor: PAPER }}>
                <div className={CONTAINER}>
                    <Eyebrow>Como funciona</Eyebrow>
                    <h2 className={`mt-4 ${H2} max-w-2xl mb-12`} style={{ fontSize: 'clamp(28px, 4vw, 50px)' }}>
                        Quatro passos, sempre
                        <br />
                        na mesma ordem.
                    </h2>
                    <MethodAccordion passos={PASSOS} />
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
                            técnico da clínica. Se uma ideia boa não passar na regra, ela não
                            vai ao ar.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══ Resultados ═══ */}
            <section className={`bg-white ${SECTION}`}>
                <div className={CONTAINER}>
                    <Eyebrow>Já entregamos</Eyebrow>
                    <h2 className={`mt-4 ${H2} max-w-2xl mb-12`} style={{ fontSize: 'clamp(28px, 4vw, 50px)' }}>
                        Resultado de quem já confiou.
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {RESULTADOS.map((r, i) => {
                            const skin = RESULT_SKINS[i % RESULT_SKINS.length];
                            const c = RES_SKIN[skin];
                            return (
                                <div
                                    key={r.client}
                                    className={`rounded-2xl border p-6 flex flex-col min-h-[236px] ${c.box}`}
                                >
                                    <div className="flex items-center justify-between gap-3 mb-4">
                                        <span className={`text-[13px] font-semibold ${c.name}`}>{r.client}</span>
                                        <span className={`text-[11px] px-2.5 py-1 rounded-full ${c.pill}`}>
                                            {r.category}
                                        </span>
                                    </div>
                                    <ResultViz index={i} skin={skin} />
                                    <div className="mt-auto pt-5">
                                        <p className={`${H2} text-[21px] leading-tight mb-2 ${c.head}`}>
                                            {r.headline}
                                        </p>
                                        <p className={`text-[14px] leading-snug ${c.body}`}>{r.body}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <p className={`${LABEL} text-black/35 mt-8`}>
                        Resultado deles, com a operação deles.
                    </p>
                </div>
            </section>

            {/* ═══ Bônus ═══ */}
            <section className={SECTION} style={{ backgroundColor: CREAM }}>
                <div className={CONTAINER}>
                    <Eyebrow>Incluído, sem cobrar à parte</Eyebrow>
                    <h2 className={`mt-4 ${H2} max-w-2xl`} style={{ fontSize: 'clamp(28px, 4vw, 50px)' }}>
                        Quatro coisas que vêm junto.
                    </h2>
                    <div className="mt-12 grid md:grid-cols-2 gap-x-14">
                        {BONUS.map(([t, d], i) => (
                            <div
                                key={t}
                                className={`py-7 ${i ? 'border-t border-black/[0.08]' : ''} ${i === 1 ? 'md:border-t-0' : ''} ${i % 2 ? 'md:border-l md:border-black/[0.08] md:pl-14' : ''}`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-full bg-[#8DC63F] text-[#0B0E0C] flex items-center justify-center flex-shrink-0">
                                        <Check className="w-3.5 h-3.5" />
                                    </span>
                                    <h3 className="text-[18px] md:text-[21px] font-semibold tracking-[-0.02em]">{t}</h3>
                                </div>
                                <p className="mt-3 text-[15px] text-black/55 leading-relaxed">{d}</p>
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
                        <h2 className={`mt-4 ${H2}`} style={{ fontSize: 'clamp(28px, 4vw, 50px)' }}>
                            Quanto custa, antes de você
                            <br />
                            <span className="text-black/40">perder uma hora em reunião.</span>
                        </h2>
                        <div className="mt-9 flex flex-wrap items-baseline gap-x-14 gap-y-6">
                            <div>
                                <CountUp
                                    prefix="R$ "
                                    value={1800}
                                    className={`${H2} text-[#14261A] block`}
                                    style={{ fontSize: 'clamp(34px, 5vw, 58px)', lineHeight: 1 }}
                                />
                                <div className={`${LABEL} text-black/45 mt-3`}>por mês de honorário</div>
                            </div>
                            <div>
                                <CountUp
                                    prefix="R$ "
                                    value={1000}
                                    className={`${H2} text-black/35 block`}
                                    style={{ fontSize: 'clamp(34px, 5vw, 58px)', lineHeight: 1 }}
                                />
                                <div className={`${LABEL} text-black/45 mt-3`}>de verba, no seu cartão</div>
                            </div>
                        </div>
                        <p className="mt-8 text-[15px] md:text-[17px] text-black/55 leading-relaxed">
                            A verba de mídia é paga direto na plataforma, na sua conta. A
                            Norte nunca pede senha nem movimenta dinheiro de cliente. Dizemos
                            o valor aqui de propósito: ninguém precisa perder uma hora pra
                            descobrir que o momento não é esse.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══ FAQ ═══ */}
            <section className={SECTION} style={{ backgroundColor: PAPER }}>
                <div className={CONTAINER}>
                    <h2 className={`${H2} max-w-2xl`} style={{ fontSize: 'clamp(28px, 4vw, 50px)' }}>
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
                            Trinta minutos com um estrategista. Você conta onde está travando,
                            a gente devolve onde está vazando e o que faria diferença primeiro.
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

export default DentistasCompleta;
