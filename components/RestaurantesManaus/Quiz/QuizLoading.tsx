import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Check } from 'lucide-react';
import { SectionLabel } from '../shared';

interface QuizLoadingProps {
    onDone: () => void;
    minDurationMs?: number;
}

const STEPS = [
    'Cruzando suas respostas com o padrão de restaurantes em Manaus',
    'Identificando o gargalo principal da sua operação',
    'Montando o plano de ação personalizado',
    'Finalizando seu diagnóstico',
];

export const QuizLoading: React.FC<QuizLoadingProps> = ({ onDone, minDurationMs = 3600 }) => {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const perStep = Math.floor(minDurationMs / STEPS.length);
        const timers: number[] = [];
        STEPS.forEach((_, i) => {
            timers.push(window.setTimeout(() => setActiveStep(i + 1), perStep * (i + 1)));
        });
        const done = window.setTimeout(onDone, minDurationMs + 250);
        return () => {
            timers.forEach((t) => window.clearTimeout(t));
            window.clearTimeout(done);
        };
    }, [minDurationMs, onDone]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-2xl mx-auto px-6 text-center"
        >
            <SectionLabel className="mb-8 mx-auto">
                <Loader2 size={12} className="animate-spin" />
                Processando seu diagnóstico
            </SectionLabel>

            <h2 className="font-serif text-3xl md:text-5xl font-semibold text-[#F5F1E8] tracking-tight leading-[1.1] mb-5">
                Estamos analisando <span className="italic text-[#E8C088]">suas respostas.</span>
            </h2>

            <p className="text-base md:text-lg text-[#C7BFB1] leading-relaxed max-w-xl mx-auto mb-10">
                Em instantes seu diagnóstico personalizado estará pronto. Não feche esta página.
            </p>

            <div className="relative p-6 md:p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-xl border border-white/10 text-left">
                <ul className="space-y-4">
                    {STEPS.map((label, i) => {
                        const done = i < activeStep;
                        const current = i === activeStep;
                        const pending = i > activeStep;
                        return (
                            <li key={i} className="flex items-center gap-3.5">
                                <span
                                    className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center border transition-colors duration-300 ${
                                        done
                                            ? 'bg-[#D4A574]/20 border-[#D4A574]/60'
                                            : current
                                            ? 'bg-[#D4A574]/10 border-[#D4A574]/50'
                                            : 'bg-white/[0.03] border-white/10'
                                    }`}
                                >
                                    {done ? (
                                        <Check size={12} className="text-[#E8C088]" strokeWidth={3} />
                                    ) : current ? (
                                        <Loader2 size={12} className="text-[#E8C088] animate-spin" />
                                    ) : (
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                                    )}
                                </span>
                                <span
                                    className={`text-sm md:text-base transition-colors duration-300 ${
                                        pending ? 'text-[#A8A196]' : 'text-[#F5F1E8]'
                                    }`}
                                >
                                    {label}
                                </span>
                            </li>
                        );
                    })}
                </ul>

                {/* Gold progress bar */}
                <div className="mt-7 h-[3px] rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (activeStep / STEPS.length) * 100)}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-[#B8875B] via-[#D4A574] to-[#E8C088]"
                    />
                </div>
            </div>

            <p className="mt-8 text-[11px] text-[#A8A196] tracking-wider">
                Atendemos apenas restaurantes em Manaus &middot; Máximo 4 novos clientes por mês
            </p>
        </motion.div>
    );
};
