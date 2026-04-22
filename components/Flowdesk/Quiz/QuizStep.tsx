import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import { QuizStepData } from './quizData';

interface QuizStepProps {
    data: QuizStepData;
    total: number;
    selected?: string;
    onSelect: (option: string) => void;
    onBack: () => void;
    canGoBack: boolean;
}

export const QuizStep: React.FC<QuizStepProps> = ({ data, total, selected, onSelect, onBack, canGoBack }) => {
    const progressPct = (data.step / total) * 100;

    return (
        <motion.div
            key={data.step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="max-w-3xl mx-auto px-6"
        >
            {/* Progress */}
            <div className="mb-10">
                <div className="flex items-center justify-between mb-3">
                    <button
                        onClick={onBack}
                        disabled={!canGoBack}
                        className="inline-flex items-center gap-1.5 text-xs text-[#6B86A3] hover:text-[#A6DEFF] transition-colors disabled:opacity-30 disabled:hover:text-[#6B86A3] tracking-wider uppercase"
                    >
                        <ArrowLeft size={14} />
                        Voltar
                    </button>
                    <div className="text-[11px] text-[#4DD5FF] font-semibold tracking-[0.3em] uppercase">
                        Passo {data.step} de {total} &middot; {data.label}
                    </div>
                </div>
                <div className="relative h-[3px] w-full rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPct}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{
                            background:
                                'linear-gradient(90deg, #2BA8D4 0%, #4DD5FF 50%, #A6DEFF 100%)',
                        }}
                    />
                </div>
            </div>

            {/* Question */}
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-[#E8F4FF] tracking-tight leading-[1.1] mb-10 text-center">
                {data.question}
            </h2>

            {/* Options */}
            <div className="grid gap-3">
                {data.options.map((opt, i) => {
                    const isSelected = selected === opt;
                    return (
                        <motion.button
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
                            onClick={() => onSelect(opt)}
                            className={`group relative w-full text-left px-6 py-5 rounded-2xl border transition-all duration-300 backdrop-blur-xl ${
                                isSelected
                                    ? 'border-[#4DD5FF] bg-gradient-to-br from-[#4DD5FF]/20 to-[#4DD5FF]/5 shadow-[0_10px_40px_-10px_rgba(77,213,255,0.55)]'
                                    : 'border-[#4DD5FF]/15 bg-gradient-to-b from-[#4DD5FF]/[0.05] to-white/[0.02] hover:border-[#4DD5FF]/55 hover:from-[#4DD5FF]/[0.09]'
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                        isSelected
                                            ? 'border-[#4DD5FF] bg-[#4DD5FF]'
                                            : 'border-[#4DD5FF]/30 group-hover:border-[#4DD5FF]/70'
                                    }`}
                                >
                                    {isSelected && <Check size={14} className="text-[#031224]" strokeWidth={3} />}
                                </div>
                                <span
                                    className={`text-base md:text-lg font-medium tracking-wide leading-snug ${
                                        isSelected ? 'text-[#E8F4FF]' : 'text-[#B8CEE4] group-hover:text-[#E8F4FF]'
                                    }`}
                                >
                                    {opt}
                                </span>
                            </div>
                        </motion.button>
                    );
                })}
            </div>
        </motion.div>
    );
};
