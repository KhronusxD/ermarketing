import React, { useState } from 'react';
import { SectionProps } from '../../types';
import { Plus, Minus, ShieldCheck } from 'lucide-react';

const objections = [
    {
        question: '"Já tentei agência e não funcionou."',
        answer:
            'A maioria das agências vende presença, não resultado. A ER mede tudo: leads, custo, reservas, retorno. Se não tiver número, não contamos como sucesso. Você vê o resultado mês a mês.',
    },
    {
        question: '"Não tenho tempo para acompanhar tudo isso."',
        answer:
            'Você não precisa. O sistema roda sem você. A reunião mensal de 1 hora é o único compromisso de tempo que pedimos.',
    },
    {
        question: '"R$ 3.500 é muito para o meu momento."',
        answer:
            'Entendemos. É exatamente por isso que fazemos o diagnóstico primeiro — para entender se faz sentido para o seu momento atual. Não atendemos todos. Se não houver fit, a gente fala abertamente.',
    },
    {
        question: '"Meu restaurante é pequeno demais."',
        answer:
            'O Taychi começou pequeno. O que define o resultado não é o tamanho — é a disposição de ter um sistema funcionando.',
    },
    {
        question: '"E se eu quiser sair?"',
        answer:
            'Sem multa, sem fidelidade mínima. Se em 90 dias você não ver resultado, a conversa é honesta e o contrato pode ser encerrado.',
    },
];

export const RestaurantObjections: React.FC<SectionProps> = ({ onAuditClick }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-[#050505] border-y border-white/5 relative z-10">
            <div className="max-w-3xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-900/10 text-orange-500 text-xs font-bold tracking-widest uppercase mb-4">
                        <ShieldCheck size={14} />
                        Transparência total
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                        Respondendo o que você provavelmente<br />
                        <span className="text-orange-500">está pensando agora</span>
                    </h2>
                </div>

                {/* Accordion */}
                <div className="space-y-4">
                    {objections.map((obj, index) => (
                        <div
                            key={index}
                            className={`border rounded-xl transition-all duration-300 ${
                                openIndex === index
                                    ? 'border-orange-500/40 bg-[#0A0A0A]'
                                    : 'border-white/10 bg-transparent hover:border-white/20'
                            }`}
                        >
                            <button
                                className="w-full flex justify-between items-center p-6 text-left"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span
                                    className={`font-semibold ${
                                        openIndex === index ? 'text-white' : 'text-gray-300'
                                    }`}
                                >
                                    {obj.question}
                                </span>
                                {openIndex === index ? (
                                    <Minus className="text-orange-500 flex-shrink-0" size={20} />
                                ) : (
                                    <Plus className="text-gray-500 flex-shrink-0" size={20} />
                                )}
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                            >
                                <div className="p-6 pt-0 text-gray-400 leading-relaxed">
                                    {obj.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
