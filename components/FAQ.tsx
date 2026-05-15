import React, { useState } from 'react';
import { SectionProps } from '../types';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: 'Como funciona a reunião de diagnóstico?',
        answer:
            'É uma call de 15 minutos com um dos sócios. Antes dela, você responde um questionário rápido (3 minutos) que serve pra gente já entrar na reunião com o contexto do seu negócio. Na call, mostramos onde está o gargalo e o plano dos próximos 90 dias. Sem PDF de 40 páginas — só o que importa.',
    },
    {
        question: 'Qual o investimento necessário pra começar?',
        answer:
            'Não trabalhamos com pacotes fechados. A reunião existe pra desenhar um projeto compatível com o seu momento e objetivo. Focamos em empresas que já investem em tráfego ou têm capacidade pra começar — não atendemos quem ainda precisa validar o produto.',
    },
    {
        question: 'Quais nichos vocês atendem?',
        answer:
            'A metodologia é agnóstica de nicho porque é baseada em fundamentos de negócio e comportamento humano. Temos cases consolidados em e-commerce, infoproduto, serviços B2B, food service, varejo local e educação digital.',
    },
    {
        question: 'A ER faz só tráfego pago?',
        answer:
            'Não. Somos uma assessoria completa de performance: gestão de tráfego, copy, criativos, landing pages, CRM, automação, social media, produção audiovisual e estratégia comercial. O sócio que cuida do seu projeto fica responsável pelo todo.',
    },
    {
        question: 'Em quanto tempo eu vejo resultado?',
        answer:
            'Os primeiros 30 dias são de aprendizado: tracking, ajuste de público e teste de criativos. Os 60 dias seguintes são de aceleração. Quem espera curva real de retorno antes de 90 dias geralmente desliga o canal antes de ele aprender — e perde dinheiro à toa.',
    },
];

export const FAQ: React.FC<SectionProps> = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="relative bg-er-black text-white overflow-hidden">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-10 -left-8 select-none font-display uppercase leading-[0.78] whitespace-nowrap text-white/5"
                style={{ fontSize: 'clamp(180px, 24vw, 380px)' }}
            >
                dúvidas
            </div>

            <div className="relative z-10 max-w-[1100px] mx-auto px-6 py-24 md:py-32">
                <div className="mb-12 md:mb-16">
                    <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                        ◆ FAQ
                    </p>
                    <h2
                        className="font-display uppercase leading-[0.88] tracking-tight"
                        style={{ fontSize: 'clamp(44px, 6.5vw, 96px)' }}
                    >
                        Perguntas que
                        <br />
                        <span className="text-er-red">você devia fazer.</span>
                    </h2>
                </div>

                <div className="border-t border-white/15">
                    {faqs.map((faq, index) => {
                        const open = openIndex === index;
                        return (
                            <div
                                key={faq.question}
                                className="border-b border-white/15"
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        setOpenIndex(open ? null : index)
                                    }
                                    className="w-full flex items-start justify-between gap-6 text-left py-6 md:py-8 group"
                                >
                                    <div className="flex items-start gap-4 md:gap-8 flex-1">
                                        <span className="text-er-red font-display text-lg md:text-xl leading-none pt-1">
                                            {`0${index + 1}`}
                                        </span>
                                        <span
                                            className={`font-display uppercase leading-tight tracking-tight transition-colors ${
                                                open ? 'text-white' : 'text-white/85 group-hover:text-white'
                                            }`}
                                            style={{
                                                fontSize: 'clamp(20px, 2.4vw, 32px)',
                                            }}
                                        >
                                            {faq.question}
                                        </span>
                                    </div>
                                    <span
                                        className={`flex-shrink-0 w-8 h-8 border border-white/30 flex items-center justify-center text-white/70 transition-transform ${
                                            open ? 'bg-er-red border-er-red text-white rotate-45' : ''
                                        }`}
                                    >
                                        +
                                    </span>
                                </button>
                                <div
                                    className={`grid transition-all duration-300 ease-out ${
                                        open
                                            ? 'grid-rows-[1fr] opacity-100 pb-8 md:pb-10'
                                            : 'grid-rows-[0fr] opacity-0'
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="pl-10 md:pl-16 text-sm md:text-base text-white/65 leading-relaxed max-w-3xl">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
