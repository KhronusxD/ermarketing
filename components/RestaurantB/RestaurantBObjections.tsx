import React, { useState } from 'react';
import { SectionProps } from '../../types';
import { Plus, Minus } from 'lucide-react';

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

export const RestaurantBObjections: React.FC<SectionProps> = ({ onAuditClick }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-[#F7F3EE]">
            <div className="max-w-3xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <p className="text-[#D4660A] text-xs font-bold tracking-widest uppercase mb-3">Transparência total</p>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#3D2B1F] tracking-tight leading-tight">
                        Respondendo o que você provavelmente{' '}
                        <span className="text-[#D4660A]">está pensando agora</span>
                    </h2>
                </div>

                {/* Accordion */}
                <div className="space-y-3">
                    {objections.map((obj, index) => (
                        <div
                            key={index}
                            className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                                openIndex === index
                                    ? 'border-[#D4660A]/40 bg-white shadow-[0_2px_0_0_#EAE2D9]'
                                    : 'border-[#EAE2D9] bg-white shadow-[0_1px_0_0_#EAE2D9] hover:border-[#D4660A]/20'
                            }`}
                        >
                            <button
                                className="w-full flex justify-between items-center p-6 text-left"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className={`font-bold ${openIndex === index ? 'text-[#3D2B1F]' : 'text-[#5C5047]'}`}>
                                    {obj.question}
                                </span>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ml-4 transition-colors ${
                                    openIndex === index ? 'bg-[#D4660A] text-white' : 'bg-[#F7F3EE] text-[#8B7E74]'
                                }`}>
                                    {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                                </div>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                            >
                                <div className="px-6 pb-6 text-[#5C5047] leading-relaxed">
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
