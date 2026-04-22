import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, BarChart3, ClipboardList } from 'lucide-react';
import { OceanButton, SectionLabel } from '../shared';

interface QuizIntroProps {
    onStart: () => void;
}

const FEATURES = [
    { icon: Clock, label: 'Diagnóstico em 2 minutos' },
    { icon: BarChart3, label: 'Análise por tipo de negócio' },
    { icon: ClipboardList, label: 'Plano recomendado na hora' },
];

export const QuizIntro: React.FC<QuizIntroProps> = ({ onStart }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-3xl mx-auto text-center px-6"
        >
            <SectionLabel className="mb-8 mx-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4DD5FF]"></span>
                Diagnóstico de Crescimento &middot; ER Marketing
            </SectionLabel>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight text-[#E8F4FF] mb-6">
                Descubra qual plano faz sentido{' '}
                <span className="italic text-[#A6DEFF]">pro seu momento.</span>
            </h1>

            <p className="text-lg text-[#B8CEE4] leading-relaxed mb-12 max-w-2xl mx-auto">
                5 perguntas rápidas. No fim, você sai com um diagnóstico personalizado e a indicação do plano ER
                certo pra você — Start, Essencial ou Profissional.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 mb-12">
                {FEATURES.map(({ icon: Icon, label }, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-center gap-2.5 px-5 py-4 rounded-2xl bg-gradient-to-b from-[#4DD5FF]/[0.06] to-white/[0.02] backdrop-blur-xl border border-[#4DD5FF]/15"
                    >
                        <Icon size={16} className="text-[#4DD5FF] shrink-0" />
                        <span className="text-sm text-[#E8F4FF] font-medium tracking-wide">{label}</span>
                    </div>
                ))}
            </div>

            <OceanButton size="lg" onClick={onStart} className="mx-auto">
                Iniciar diagnóstico gratuito
                <ArrowRight size={18} />
            </OceanButton>

            <p className="mt-6 text-xs text-[#6B86A3] tracking-wider">
                100% gratuito &middot; sem compromisso &middot; resultado em 2 minutos
            </p>
        </motion.div>
    );
};
