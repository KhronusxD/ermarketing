import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Calendar, AlertTriangle, ArrowRight, Download, CheckCircle, MessageCircle } from 'lucide-react';
import { DiagnosisResult, LeadData } from './types';

interface ResultsProps {
    result: DiagnosisResult;
    leadData: LeadData;
}

const Results: React.FC<ResultsProps> = ({ result, leadData }) => {
    // Chart Data for Gauge
    const data = [
        { name: 'Score', value: result.score, color: result.score > 70 ? '#10b981' : result.score > 40 ? '#fbbf24' : '#E60000' },
        { name: 'Remaining', value: 100 - result.score, color: '#1e293b' },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                    <div>
                        <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Relatório Gerado para</p>
                        <h1 className="text-2xl font-sans font-bold text-white">{leadData.name} <span className="text-gray-500 font-normal">| {leadData.website || "Website não informado"}</span></h1>
                    </div>
                    <div className="flex items-center gap-2 bg-green-900/20 border border-green-800/50 px-4 py-2 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-green-400 text-sm font-medium">Análise Finalizada</span>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* Score Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-4 bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden"
                    >
                        <h3 className="text-gray-400 font-medium mb-4">Saúde Digital</h3>
                        <div className="w-full h-[180px] relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="100%"
                                        startAngle={180}
                                        endAngle={0}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={0}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center pb-2">
                                <span className={`text-4xl font-bold ${result.score > 70 ? 'text-green-400' : 'text-amber-400'}`}>
                                    {result.score}%
                                </span>
                            </div>
                        </div>
                        <p className={`mt-2 text-sm font-medium px-3 py-1 rounded-full ${result.score > 70 ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'}`}>
                            {result.score > 70 ? "Bom Potencial" : "Atenção Requerida"}
                        </p>
                    </motion.div>

                    {/* Verdict Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-8 bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 relative"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <AlertTriangle className="w-32 h-32 text-er-red" />
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-er-red font-bold uppercase tracking-wide text-sm mb-2 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" /> Ponto Crítico Identificado
                            </h3>
                            <h2 className="text-3xl font-sans font-bold text-white mb-4">
                                O Veredito: <span className="text-white border-b-2 border-er-red/50">{result.verdictTitle}</span>
                            </h2>
                            <p className="text-gray-300 leading-relaxed text-lg mb-6">
                                {result.verdictDescription}
                            </p>

                            <div className="bg-[#050505] border border-white/10 rounded-lg p-4 flex gap-4 items-start">
                                <div className="p-2 bg-er-red/10 rounded-md">
                                    <Download className="w-5 h-5 text-er-red" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">Perda Estimada</h4>
                                    <p className="text-sm text-gray-400">Com base nas suas respostas, estima-se que você esteja desperdiçando cerca de <span className="text-white font-bold">40% da sua verba</span> nesta etapa.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-r from-red-900/40 to-[#0A0A0A] border border-er-red/30 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-er-red to-transparent opacity-50"></div>

                    <h2 className="text-2xl md:text-3xl font-sans font-bold text-white mb-4">
                        Plano de Recuperação Personalizado
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                        O relatório completo foi enviado para <b>{leadData.email}</b>. Mas, como detectamos um erro crítico de <span className="text-white font-semibold underline decoration-er-red">{result.category}</span>, abrimos uma vaga extra na agenda do nosso estrategista sênior.
                    </p>

                    <div className="flex flex-col gap-3 w-full max-w-md mx-auto">
                        <button
                            className="w-full inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-er-red rounded-xl hover:bg-[#cc0000] shadow-[0_0_30px_rgba(230,0,0,0.3)] hover:scale-105 group"
                        >
                            <Calendar className="mr-2 w-5 h-5" />
                            AGENDAR SESSÃO (GRATUITO)
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                window.open('https://wa.me/5592985146299?text=Ol%C3%A1%2C%20acabei%20de%20fazer%20a%20auditoria%20e%20gostaria%20de%20agendar%20minha%20sess%C3%A3o.', '_blank');
                            }}
                            className="w-full inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white transition-all duration-200 bg-[#25D366] rounded-xl hover:bg-[#20bd5a] hover:scale-105 shadow-[0_0_20px_rgba(37,211,102,0.3)]"
                        >
                            <MessageCircle className="mr-2 w-5 h-5" />
                            Agendar pelo WhatsApp
                        </button>
                    </div>

                    <p className="mt-6 text-xs text-gray-500">Vaga reservada por 15 minutos.</p>
                </motion.div>

                <footer className="mt-12 text-center text-gray-600 text-sm">
                    <p>&copy; {new Date().getFullYear()} ER Marketing. Todos os direitos reservados.</p>
                </footer>
            </div>
        </div>
    );
};

export default Results;
