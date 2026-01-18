import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, FileText, ArrowRight, Clock } from 'lucide-react';
import { TOOL_LOGOS } from './constants';

interface LandingProps {
    onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-[#050505] text-white">
            {/* Background decoration */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-er-red/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-er-red/5 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl w-full text-center z-10"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-er-red mb-6">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-er-red opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-er-red"></span>
                    </span>
                    AUDITORIA DE LUCRO INVISÍVEL &trade;
                </div>

                <h1 className="text-4xl md:text-6xl font-sans font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                    Descubra quanto dinheiro sua empresa <span className="text-white border-b-4 border-er-red/60">deixa na mesa</span> todos os meses.
                </h1>

                <h2 className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Uma auditoria digital gratuita, baseada em dados de <span className="text-white font-semibold">+150 projetos</span>, que identifica exatamente onde está o gargalo do seu crescimento.
                </h2>

                <div className="flex flex-col md:flex-row justify-center gap-4 mb-10">
                    {[
                        { icon: Clock, text: "Diagnóstico em 2 minutos" },
                        { icon: BarChart3, text: "Análise de Tráfego & Vendas" },
                        { icon: FileText, text: "Plano de Correção Imediata" }
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                            <item.icon className="w-4 h-4 text-er-red" />
                            <span className="text-sm font-medium text-gray-200">{item.text}</span>
                        </div>
                    ))}
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onStart}
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-er-red rounded-xl hover:bg-[#cc0000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-er-red focus:ring-offset-[#050505] w-full md:w-auto shadow-[0_0_20px_rgba(230,0,0,0.3)]"
                >
                    INICIAR AUDITORIA DE LUCRO
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
            </motion.div>

            <div className="absolute bottom-6 left-0 w-full text-center">
                <p className="text-xs text-gray-600 mb-3 uppercase tracking-wider font-semibold">Tecnologias Analisadas</p>
                <div className="flex justify-center gap-6 opacity-30 grayscale mix-blend-screen px-4 flex-wrap">
                    {TOOL_LOGOS.map((logo, i) => (
                        <span key={i} className="text-sm font-bold font-sans text-gray-400">{logo}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Landing;
