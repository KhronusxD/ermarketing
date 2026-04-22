import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import { OceanButton, SectionLabel } from '../shared';
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
        business: '',
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
                'er-diagnostico-flowdesk',
                JSON.stringify({ ...fields, answers, ts: new Date().toISOString() })
            );
        } catch { /* ignore storage errors */ }
        trackCustom('FlowdeskFormSubmit', {
            content_name: 'Diagnostico Flowdesk - Form Submit',
        });
        onComplete(fields);
    };

    const labelClass = 'text-[10px] text-[#4DD5FF] font-semibold tracking-[0.25em] uppercase mb-2 block';
    const inputClass =
        'w-full px-5 py-4 rounded-2xl bg-[#4DD5FF]/5 border border-[#4DD5FF]/15 text-[#E8F4FF] placeholder-[#6B86A3] focus:outline-none focus:border-[#4DD5FF]/70 focus:bg-[#4DD5FF]/10 transition-all text-base';

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

                <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#E8F4FF] tracking-tight leading-[1.1] mb-5">
                    Seu diagnóstico <span className="italic text-[#A6DEFF]">está pronto.</span>
                </h2>

                <p className="text-base md:text-lg text-[#B8CEE4] leading-relaxed max-w-xl mx-auto">
                    Informe onde devemos enviar o plano personalizado. Nossa equipe te chama em até 2 horas.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="relative p-6 md:p-8 rounded-3xl bg-gradient-to-b from-[#4DD5FF]/[0.06] to-white/[0.02] backdrop-blur-xl border border-[#4DD5FF]/15"
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
                            placeholder="(00) 00000-0000"
                            className={inputClass}
                        />
                        <p className="text-[11px] text-[#6B86A3] mt-2 tracking-wide">Retornamos em até 2 horas.</p>
                    </div>

                    <div>
                        <label className={labelClass}>Nome do negócio</label>
                        <input
                            type="text"
                            required
                            value={fields.business}
                            onChange={update('business')}
                            placeholder="Ex: Clínica Rio / Advogado João"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Instagram (se tiver)</label>
                        <input
                            type="text"
                            value={fields.instagram}
                            onChange={update('instagram')}
                            placeholder="@seunegocio"
                            className={inputClass}
                        />
                    </div>
                </div>

                <div className="mt-8 flex flex-col items-center gap-4">
                    <OceanButton type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
                        {submitting ? 'Gerando diagnóstico...' : 'Ver meu diagnóstico personalizado'}
                        <ArrowRight size={18} />
                    </OceanButton>

                    <p className="inline-flex items-center gap-2 text-xs text-[#6B86A3] tracking-wide">
                        <Lock size={12} className="text-[#4DD5FF]" />
                        Seus dados estão protegidos e não enviamos spam.
                    </p>
                </div>
            </form>

            <p className="mt-6 text-center text-[11px] text-[#6B86A3] tracking-wider">
                Apenas 4 vagas por mês &middot; cada cliente recebe atenção direta da equipe
            </p>
        </motion.div>
    );
};
