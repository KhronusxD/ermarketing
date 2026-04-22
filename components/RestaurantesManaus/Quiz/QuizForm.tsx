import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import { GoldButton, SectionLabel } from '../shared';
import type { QuizFormFields } from './QuizResult';
import { trackCustom } from './metaPixel';

interface QuizFormProps {
    answers: (string | undefined)[];
    onComplete: (data: QuizFormFields) => void;
}

export const QuizForm: React.FC<QuizFormProps> = ({ answers, onComplete }) => {
    const [fields, setFields] = useState<QuizFormFields>({
        name: '',
        whatsapp: '',
        restaurant: '',
        instagram: '',
    });
    const [submitting, setSubmitting] = useState(false);

    const update = (key: keyof QuizFormFields) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setFields((f) => ({ ...f, [key]: e.target.value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            localStorage.setItem(
                'er-diagnostico-manaus',
                JSON.stringify({ ...fields, answers, ts: new Date().toISOString() })
            );
        } catch { /* ignore storage errors */ }
        trackCustom('DiagnosticoFormSubmit', {
            content_name: 'Diagnostico Manaus - Form Submit',
        });
        onComplete(fields);
    };

    const labelClass = 'text-[10px] text-[#D4A574] font-semibold tracking-[0.25em] uppercase mb-2 block';
    const inputClass =
        'w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-[#F5F1E8] placeholder-[#A8A196]/60 focus:outline-none focus:border-[#D4A574]/70 focus:bg-white/[0.07] transition-all text-base';

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-2xl mx-auto px-6"
        >
            <div className="text-center mb-10">
                <SectionLabel className="mb-6 mx-auto">
                    <CheckCircle2 size={12} />
                    Diagnóstico concluído
                </SectionLabel>

                <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#F5F1E8] tracking-tight leading-[1.1] mb-5">
                    Seu diagnóstico <span className="italic text-[#E8C088]">está pronto.</span>
                </h2>

                <p className="text-base md:text-lg text-[#C7BFB1] leading-relaxed max-w-xl mx-auto">
                    Identificamos os principais gargalos do seu restaurante. Informe onde devemos enviar o plano de
                    crescimento personalizado.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="relative p-6 md:p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-xl border border-white/10"
            >
                <div className="grid md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                        <label className={labelClass}>Nome e sobrenome</label>
                        <input
                            type="text"
                            required
                            value={fields.name}
                            onChange={update('name')}
                            placeholder="Ex: João Silva"
                            className={inputClass}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className={labelClass}>WhatsApp</label>
                        <input
                            type="tel"
                            required
                            value={fields.whatsapp}
                            onChange={update('whatsapp')}
                            placeholder="(92) 98514-6299"
                            className={inputClass}
                        />
                        <p className="text-[11px] text-[#A8A196] mt-2 tracking-wide">Retornamos em até 2 horas.</p>
                    </div>

                    <div>
                        <label className={labelClass}>Nome do restaurante</label>
                        <input
                            type="text"
                            required
                            value={fields.restaurant}
                            onChange={update('restaurant')}
                            placeholder="Ex: Taychi Sushi Bar"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Instagram do restaurante</label>
                        <input
                            type="text"
                            required
                            value={fields.instagram}
                            onChange={update('instagram')}
                            placeholder="@seurestaurante"
                            className={inputClass}
                        />
                    </div>
                </div>

                <div className="mt-8 flex flex-col items-center gap-4">
                    <GoldButton type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
                        {submitting ? 'Gerando diagnóstico...' : 'Ver meu diagnóstico personalizado'}
                        <ArrowRight size={18} />
                    </GoldButton>

                    <p className="inline-flex items-center gap-2 text-xs text-[#A8A196] tracking-wide">
                        <Lock size={12} className="text-[#D4A574]" />
                        Seus dados estão protegidos e não enviamos spam.
                    </p>
                </div>
            </form>

            <p className="mt-6 text-center text-[11px] text-[#A8A196] tracking-wider">
                Atendemos apenas restaurantes em Manaus &middot; Máximo 4 novos clientes por mês
            </p>
        </motion.div>
    );
};
