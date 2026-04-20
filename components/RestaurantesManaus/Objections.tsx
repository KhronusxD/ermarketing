import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { SectionProps } from '../../types';
import { SectionLabel } from './shared';

const objections = [
    {
        question: '"Já tentei agência e não funcionou."',
        answer:
            'A maioria das agências não é especializada em restaurante. A ER só atende restaurantes — e mede resultado em reservas e faturamento, não em curtidas.',
    },
    {
        question: '"Não tenho tempo para acompanhar tudo isso."',
        answer:
            'Você não precisa. A operação roda sem você. O único compromisso de tempo que pedimos é 1 hora por mês na reunião estratégica.',
    },
    {
        question: '"R$ 3.500 é muito para o meu momento."',
        answer:
            'É exatamente por isso que fazemos um diagnóstico antes. Se não fizer sentido financeiro para o seu momento atual, a gente fala com honestidade. Não atendemos todo mundo.',
    },
    {
        question: '"Meu restaurante é pequeno demais."',
        answer:
            'O Taychi começou pequeno. O que define o resultado não é o tamanho — é a disposição de ter um sistema funcionando.',
    },
];

export const Objections: React.FC<SectionProps> = ({ onAuditClick }) => {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <section className="py-24 md:py-32 relative">
            <div className="max-w-3xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-14"
                >
                    <SectionLabel className="mb-6">Quebra de objeções</SectionLabel>
                    <h2 className="font-serif text-3xl md:text-5xl font-semibold text-[#F5F1E8] tracking-tight leading-tight">
                        Respondendo o que você<br />
                        <span className="italic text-[#E8C088]">está pensando agora.</span>
                    </h2>
                </motion.div>

                <div className="space-y-3">
                    {objections.map((obj, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className={`rounded-2xl border transition-all duration-500 overflow-hidden backdrop-blur-xl ${
                                open === i
                                    ? 'border-[#D4A574]/40 bg-gradient-to-b from-[#D4A574]/[0.08] to-transparent'
                                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                            }`}
                        >
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="w-full flex items-center justify-between gap-4 p-6 text-left"
                            >
                                <span
                                    className={`font-serif text-lg md:text-xl transition-colors ${
                                        open === i ? 'text-[#F5F1E8]' : 'text-[#C7BFB1]'
                                    }`}
                                >
                                    {obj.question}
                                </span>
                                <div
                                    className={`flex-shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                                        open === i
                                            ? 'border-[#D4A574] bg-[#D4A574]/20 text-[#E8C088]'
                                            : 'border-white/20 text-[#A8A196]'
                                    }`}
                                >
                                    {open === i ? <Minus size={16} /> : <Plus size={16} />}
                                </div>
                            </button>
                            <AnimatePresence initial={false}>
                                {open === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <div className="px-6 pb-6 text-[#A8A196] leading-relaxed">{obj.answer}</div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
