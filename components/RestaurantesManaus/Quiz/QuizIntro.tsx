import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, BarChart3, ClipboardList } from 'lucide-react';
import { GoldButton, SectionLabel } from '../shared';

interface QuizIntroProps {
    onStart: () => void;
}

const FEATURES = [
    { icon: Clock, label: 'Diagnóstico em 2 minutos' },
    { icon: BarChart3, label: 'Análise de Tráfego & Reservas' },
    { icon: ClipboardList, label: 'Plano de Ação Imediato' },
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
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A574]"></span>
                Diagnóstico de Crescimento para Restaurantes™
            </SectionLabel>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight text-[#F5F1E8] mb-6">
                Descubra por que seu restaurante não está lotado —{' '}
                <span className="italic text-[#E8C088]">mesmo investindo em marketing.</span>
            </h1>

            <p className="text-lg text-[#C7BFB1] leading-relaxed mb-12 max-w-2xl mx-auto">
                Um diagnóstico gratuito, baseado em dados reais de restaurantes em Manaus, que identifica
                exatamente onde está o gargalo do seu crescimento.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 mb-12">
                {FEATURES.map(({ icon: Icon, label }, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-center gap-2.5 px-5 py-4 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-xl border border-white/10"
                    >
                        <Icon size={16} className="text-[#D4A574] shrink-0" />
                        <span className="text-sm text-[#F5F1E8] font-medium tracking-wide">{label}</span>
                    </div>
                ))}
            </div>

            <GoldButton size="lg" onClick={onStart} className="mx-auto">
                Iniciar diagnóstico gratuito
                <ArrowRight size={18} />
            </GoldButton>

            <p className="mt-6 text-xs text-[#A8A196] tracking-wider">
                100% gratuito &middot; sem compromisso &middot; resultado em 2 minutos
            </p>
        </motion.div>
    );
};
