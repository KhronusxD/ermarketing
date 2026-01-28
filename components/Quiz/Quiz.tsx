import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question, QuestionOption } from './types';
import { ChevronRight } from 'lucide-react';

interface QuizProps {
    question: Question;
    onAnswer: (option: QuestionOption) => void;
    currentStepIndex: number;
}

const Quiz: React.FC<QuizProps> = ({ question, onAnswer, currentStepIndex }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#050505] relative">
            <div className="w-full max-w-2xl z-10 pt-20 pb-10">

                <div className="mb-8 pl-1">
                    <span className="text-er-red text-sm font-bold tracking-widest uppercase mb-2 block">
                        PASSO {currentStepIndex} DE 5 • {question.category}
                    </span>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={question.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="w-full"
                    >
                        <h2 className="text-2xl md:text-3xl font-sans font-bold text-white mb-8 leading-snug">
                            {question.text}
                        </h2>

                        <div className="space-y-3">
                            {question.options.map((option, index) => (
                                <motion.button
                                    key={option.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{
                                        scale: 1.02,
                                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                                        borderColor: "rgba(230, 0, 0, 0.5)"
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => onAnswer(option)}
                                    className="w-full text-left p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md group flex items-center justify-between transition-all duration-200 shadow-lg hover:shadow-er-red/10"
                                >
                                    <span className="text-gray-200 font-medium text-lg group-hover:text-white transition-colors">
                                        {option.label}
                                    </span>
                                    <div className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center group-hover:border-er-red group-hover:bg-er-red transition-all">
                                        <ChevronRight className="w-4 h-4 text-[#050505] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-er-red/5 rounded-full blur-[100px] pointer-events-none" />
        </div>
    );
};

export default Quiz;
