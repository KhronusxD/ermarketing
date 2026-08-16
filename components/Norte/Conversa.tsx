import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Arrow, NorteNav, WHATSAPP, H2, H3, TAG } from './shared';
import {
    QUESTION_BY_STEP,
    nicheSpecificQuestion,
    CALENDLY_STANDARD,
    CALENDLY_PREMIUM,
} from '../Quiz/constants';
import { financialInsight, nextStep, qualify } from '../Quiz/branching';
import { submitLead, submitWaitlist } from '../Quiz/services';
import {
    LeadData,
    QualificationLevel,
    QuestionSpec,
    QuizAnswers,
    StepId,
} from '../Quiz/types';

// /conversa — captação de lead em formato de conversa.
//
// Coleta exatamente o mesmo que o diagnóstico de /auditoria-de-lucro-invisivel
// e cai no mesmo webhook: reaproveita o baralho de perguntas, o roteamento
// de branching.ts e o submitLead de services.ts. O que muda é só a
// superfície — pergunta por pergunta, em balão, em vez de tela cheia.
//
// Manter a lógica compartilhada é o ponto: se a régua de qualificação
// mudar, ela muda nos dois lugares de uma vez. Duas cópias divergiriam na
// primeira alteração e a gente passaria a qualificar lead de dois jeitos
// diferentes conforme a porta de entrada.

type Bubble =
    | { from: 'bot'; text: string; id: string }
    | { from: 'user'; text: string; id: string };

// Campos de contato, perguntados um por vez como numa conversa real.
type ContactField = {
    key: keyof LeadData;
    prompt: string;
    placeholder: string;
    type: 'text' | 'tel' | 'email';
    optional?: boolean;
};

const CONTACT_FIELDS: ContactField[] = [
    { key: 'name', prompt: 'Fechado. Como é o seu nome?', placeholder: 'Seu nome', type: 'text' },
    { key: 'company', prompt: 'Prazer! E o nome do seu negócio?', placeholder: 'Nome da empresa', type: 'text' },
    { key: 'whatsapp', prompt: 'Qual o melhor WhatsApp pra te chamar?', placeholder: '(92) 90000-0000', type: 'tel' },
    { key: 'email', prompt: 'E o seu e-mail?', placeholder: 'voce@empresa.com.br', type: 'email' },
];

const PRICE_MESSAGE =
    'Antes de seguir, um combinado pra não gastar o seu tempo: nossos projetos começam em R$ 1.500/mês de honorário, mais R$ 1.000/mês de verba de mídia recomendada no início. Dá uns R$ 2.500/mês pra começar. Faz sentido pro momento do seu negócio?';

const PRICE_OPTIONS = [
    { label: 'Faz sentido, quero seguir', value: 'yes' as const },
    { label: 'Fora do meu momento agora', value: 'no' as const },
];

const CASE_MESSAGE =
    'Só pra você ter referência: o Taychi saiu de R$ 70 mil pra R$ 200 mil por mês em sete meses, e a Odonto Solutions passou a captar lead a R$ 1,57. Nenhum dos dois mudou de produto — mudou o que estava sendo medido.';

let seq = 0;
const uid = () => `m${(seq += 1)}`;

const Conversa: React.FC = () => {
    const [messages, setMessages] = useState<Bubble[]>([]);
    const [typing, setTyping] = useState(false);
    const [step, setStep] = useState<StepId>('q_niche');
    const [answers, setAnswers] = useState<QuizAnswers>({});
    const [contactIdx, setContactIdx] = useState(0);
    const [lead, setLead] = useState<Partial<LeadData>>({});
    const [draft, setDraft] = useState('');
    const [done, setDone] = useState<QualificationLevel | null>(null);
    const [sending, setSending] = useState(false);
    // A nav nasce transparente sobre a foto; sem virar pílula opaca no
    // scroll, os balões passam por baixo dela e ficam ilegíveis.
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const endRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const started = useRef(false);

    // Rola pro fim a cada balão novo — sem isso a conversa cresce pra
    // baixo da dobra e a pessoa não vê a resposta chegar.
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [messages, typing]);

    // O robô "digita" antes de falar. A pausa é proporcional ao tamanho
    // da frase, com teto: sem isso, mensagem longa aparece instantânea e
    // quebra a ilusão; e frase curta com pausa fixa parece travamento.
    const say = useCallback((text: string, after?: () => void) => {
        setTyping(true);
        const delay = Math.min(1500, 420 + text.length * 11);
        window.setTimeout(() => {
            setTyping(false);
            setMessages((m) => [...m, { from: 'bot', text, id: uid() }]);
            after?.();
        }, delay);
    }, []);

    const sayMany = useCallback(
        (texts: string[], after?: () => void) => {
            const [head, ...tail] = texts;
            if (!head) {
                after?.();
                return;
            }
            say(head, () => sayMany(tail, after));
        },
        [say],
    );

    const reply = (text: string) =>
        setMessages((m) => [...m, { from: 'user', text, id: uid() }]);

    // Pergunta da vez, já resolvendo o ramo por nicho.
    const currentQuestion = (): QuestionSpec | undefined => {
        if (step === 'q_niche_specific') {
            return answers.niche ? nicheSpecificQuestion(answers.niche) : undefined;
        }
        return QUESTION_BY_STEP[step];
    };

    // Avança até o próximo passo que precisa de resposta, narrando pelo
    // caminho os passos que são só fala (insight, gate, fechamento).
    const advance = useCallback(
        (from: StepId, withAnswers: QuizAnswers) => {
            const target = nextStep(from, withAnswers);

            if (target === 'insight_financial') {
                const insight = financialInsight(withAnswers);
                const lines = insight
                    ? [insight.headline, 'Dá pra recuperar boa parte disso sem aumentar verba — só ajustando o que é medido.']
                    : ['Boa. Vamos entender como está a sua operação de mídia hoje.'];
                sayMany(lines, () => advance('insight_financial', withAnswers));
                setStep('insight_financial');
                return;
            }

            if (target === 'insight_case') {
                sayMany([CASE_MESSAGE], () => advance('insight_case', withAnswers));
                setStep('insight_case');
                return;
            }

            if (target === 'price_gate') {
                say(PRICE_MESSAGE);
                setStep('price_gate');
                return;
            }

            if (target === 'lead_form') {
                setContactIdx(0);
                say(CONTACT_FIELDS[0].prompt);
                setStep('lead_form');
                return;
            }

            if (target === 'nurture_waitlist') {
                sayMany(
                    [
                        'Entendi, e obrigado pela sinceridade.',
                        'Estamos preparando uma formação mais leve pra quem está nesse momento. Quer que eu te avise quando abrir? Me passa seu nome e e-mail.',
                    ],
                );
                setContactIdx(0);
                setStep('nurture_waitlist');
                return;
            }

            const q = target === 'q_niche_specific'
                ? withAnswers.niche && nicheSpecificQuestion(withAnswers.niche)
                : QUESTION_BY_STEP[target];

            if (q) {
                sayMany(q.sub ? [q.headline, q.sub] : [q.headline]);
            }
            setStep(target);
        },
        [say, sayMany],
    );

    // Abre a conversa
    useEffect(() => {
        if (started.current) return;
        started.current = true;
        const q = QUESTION_BY_STEP.q_niche;
        sayMany([
            'Oi! Sou o assistente da Norte.',
            'Vou te fazer algumas perguntas rápidas pra entender seu negócio antes da conversa com um estrategista. Leva uns 2 minutos.',
            q!.headline,
        ]);
    }, [sayMany]);

    const finish = useCallback(
        async (full: LeadData, withAnswers: QuizAnswers) => {
            const level = qualify(withAnswers);
            setSending(true);
            await submitLead(full, withAnswers, level);
            setSending(false);
            setDone(level);
            sayMany(
                level === 'nurture'
                    ? ['Obrigado! Te aviso assim que abrir.']
                    : [
                          `Perfeito, ${full.name.split(' ')[0]}. Já tenho o que precisava.`,
                          'Agora é só escolher o horário da conversa. Se preferir, pode chamar a gente direto no WhatsApp.',
                      ],
            );
        },
        [sayMany],
    );

    const pickOption = (label: string, field: keyof QuizAnswers, value: string) => {
        reply(label);
        const updated = { ...answers, [field]: value } as QuizAnswers;
        setAnswers(updated);
        advance(step, updated);
    };

    const pickPrice = (opt: (typeof PRICE_OPTIONS)[number]) => {
        reply(opt.label);
        const updated = { ...answers, price_confirmed: opt.value };
        setAnswers(updated);
        advance('price_gate', updated);
    };

    const submitField = (e: React.FormEvent) => {
        e.preventDefault();
        const value = draft.trim();
        if (!value) return;

        const isWaitlist = step === 'nurture_waitlist';
        const fields = isWaitlist
            ? CONTACT_FIELDS.filter((f) => f.key === 'name' || f.key === 'email')
            : CONTACT_FIELDS;
        const field = fields[contactIdx];

        reply(value);
        setDraft('');
        const nextLead = { ...lead, [field.key]: value };
        setLead(nextLead);

        const nextIdx = contactIdx + 1;
        if (nextIdx < fields.length) {
            setContactIdx(nextIdx);
            say(fields[nextIdx].prompt);
            return;
        }

        if (isWaitlist) {
            setSending(true);
            void submitWaitlist(
                {
                    name: nextLead.name ?? '',
                    email: nextLead.email ?? '',
                    whatsapp: nextLead.whatsapp ?? '',
                },
                answers,
            ).then(() => {
                setSending(false);
                setDone('nurture');
                say('Obrigado! Te aviso assim que abrir.');
            });
            return;
        }

        void finish(nextLead as LeadData, answers);
    };

    const question = currentQuestion();
    const showOptions = !typing && !done && question && step !== 'lead_form';
    const showPrice = !typing && !done && step === 'price_gate';
    const isTextStep = step === 'lead_form' || step === 'nurture_waitlist';
    const waitingText = !typing && !done && isTextStep;

    const activeField = (() => {
        if (!waitingText) return undefined;
        const fields =
            step === 'nurture_waitlist'
                ? CONTACT_FIELDS.filter((f) => f.key === 'name' || f.key === 'email')
                : CONTACT_FIELDS;
        return fields[contactIdx];
    })();

    useEffect(() => {
        if (waitingText) inputRef.current?.focus();
    }, [waitingText, contactIdx]);

    return (
        <div className="min-h-screen bg-[#14261A] text-white font-sans antialiased selection:bg-[#8DC63F] selection:text-[#0B0E0C] flex flex-col">
            <NorteNav scrolled={scrolled} />

            <picture aria-hidden="true">
                <source
                    type="image/webp"
                    sizes="100vw"
                    srcSet="/norte/hero/fundo-hero-640.webp 640w, /norte/hero/fundo-hero-1024.webp 1024w, /norte/hero/fundo-hero-1440.webp 1440w"
                />
                <img
                    src="/norte/hero/fundo-hero-1440.jpg"
                    alt=""
                    className="fixed inset-0 w-full h-full object-cover"
                />
            </picture>
            <div
                aria-hidden="true"
                className="fixed inset-0"
                style={{
                    background:
                        'linear-gradient(to bottom, rgba(11,18,13,0.94) 0%, rgba(14,28,19,0.90) 45%, rgba(16,32,22,0.96) 100%)',
                }}
            />

            <main className="relative flex-1 flex flex-col w-full max-w-[720px] mx-auto px-5 pt-28 pb-6">
                <div
                    className="flex-1 space-y-3"
                    role="log"
                    aria-live="polite"
                    aria-label="Conversa com o assistente da Norte"
                >
                    {messages.map((m) =>
                        m.from === 'bot' ? (
                            <div key={m.id} className="flex gap-3 max-w-[86%]">
                                <span className="mt-1 w-8 h-8 rounded-full bg-[#8DC63F] text-[#0B0E0C] flex items-center justify-center flex-shrink-0">
                                    <span className={`${TAG} !text-[10px]`}>N</span>
                                </span>
                                <p className="rounded-2xl rounded-tl-md bg-white/[0.10] border border-white/15 px-4 py-3 text-[15px] leading-relaxed text-white/90">
                                    {m.text}
                                </p>
                            </div>
                        ) : (
                            <div key={m.id} className="flex justify-end">
                                <p className="rounded-2xl rounded-br-md bg-[#8DC63F] text-[#0B0E0C] px-4 py-3 text-[15px] font-medium max-w-[80%]">
                                    {m.text}
                                </p>
                            </div>
                        ),
                    )}

                    {typing && (
                        <div className="flex gap-3">
                            <span className="mt-1 w-8 h-8 rounded-full bg-[#8DC63F] text-[#0B0E0C] flex items-center justify-center flex-shrink-0">
                                <span className={`${TAG} !text-[10px]`}>N</span>
                            </span>
                            <span
                                className="rounded-2xl rounded-tl-md bg-white/[0.10] border border-white/15 px-4 py-4 flex items-center gap-1.5"
                                aria-label="digitando"
                            >
                                {[0, 1, 2].map((i) => (
                                    <span
                                        key={i}
                                        className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce"
                                        style={{ animationDelay: `${i * 0.15}s` }}
                                    />
                                ))}
                            </span>
                        </div>
                    )}

                    <div ref={endRef} />
                </div>

                {/* ─── Área de resposta ─── */}
                <div className="sticky bottom-0 pt-5 pb-2 bg-gradient-to-t from-[#14261A] via-[#14261A] to-transparent">
                    {showOptions && question && (
                        <div className="flex flex-wrap gap-2">
                            {question.options.map((o) => (
                                <button
                                    key={o.id}
                                    type="button"
                                    onClick={() =>
                                        pickOption(o.label, question.field, o.value)
                                    }
                                    className="rounded-full border border-white/25 hover:border-[#8DC63F] hover:bg-[#8DC63F] hover:text-[#0B0E0C] px-4 py-2.5 text-[14px] font-medium transition-colors text-left"
                                >
                                    {o.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {showPrice && (
                        <div className="flex flex-wrap gap-2">
                            {PRICE_OPTIONS.map((o) => (
                                <button
                                    key={o.value}
                                    type="button"
                                    onClick={() => pickPrice(o)}
                                    className="rounded-full border border-white/25 hover:border-[#8DC63F] hover:bg-[#8DC63F] hover:text-[#0B0E0C] px-4 py-2.5 text-[14px] font-medium transition-colors"
                                >
                                    {o.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {waitingText && activeField && (
                        <form onSubmit={submitField} className="flex gap-2">
                            <input
                                ref={inputRef}
                                type={activeField.type}
                                value={draft}
                                onChange={(e) => setDraft(e.target.value)}
                                placeholder={activeField.placeholder}
                                required
                                autoComplete={
                                    activeField.key === 'name'
                                        ? 'name'
                                        : activeField.key === 'email'
                                          ? 'email'
                                          : activeField.key === 'whatsapp'
                                            ? 'tel'
                                            : 'organization'
                                }
                                className="flex-1 rounded-full bg-white/[0.10] border border-white/20 px-5 py-3.5 text-[15px] text-white placeholder-white/35 focus:outline-none focus:border-[#8DC63F] transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={!draft.trim() || sending}
                                aria-label="Enviar"
                                className="w-12 h-12 flex-shrink-0 rounded-full bg-[#8DC63F] hover:bg-[#9ed650] disabled:bg-white/15 disabled:text-white/30 text-[#0B0E0C] flex items-center justify-center transition-colors"
                            >
                                <Arrow className="w-5 h-5" />
                            </button>
                        </form>
                    )}

                    {done && done !== 'nurture' && (
                        <div className="flex flex-col sm:flex-row gap-2.5">
                            <a
                                href={done === 'premium' ? CALENDLY_PREMIUM : CALENDLY_STANDARD}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex-1 inline-flex items-center justify-center gap-2.5 rounded-full bg-[#8DC63F] hover:bg-[#9ed650] text-[#0B0E0C] font-semibold text-sm px-6 py-4 transition-colors"
                            >
                                Escolher horário
                                <Arrow className="w-4 h-4" />
                            </a>
                            <a
                                href={WHATSAPP}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center rounded-full border border-white/25 hover:bg-white/10 text-white font-semibold text-sm px-6 py-4 transition-colors"
                            >
                                Falar no WhatsApp
                            </a>
                        </div>
                    )}

                    {sending && (
                        <p className={`${TAG} text-white/40 mt-3 text-center`}>
                            Enviando…
                        </p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Conversa;
