import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LeadData } from './types';
import { Lock, CheckCircle } from 'lucide-react';

interface LeadFormProps {
    onSubmit: (data: LeadData) => void;
    isSubmitting?: boolean;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSubmit, isSubmitting = false }) => {
    const [formData, setFormData] = useState<LeadData>({
        name: '',
        email: '',
        whatsapp: '',
        instagram: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#050505] relative overflow-hidden">
            <div className="w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 shadow-2xl z-10 relative">
                {/* Glow effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-er-red shadow-[0_0_20px_rgba(230,0,0,0.8)] rounded-full"></div>

                <div className="text-center mb-8 mt-4">
                    <div className="inline-flex items-center gap-2 text-er-red mb-4 bg-er-red/10 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                        <CheckCircle className="w-3 h-3" /> Análise Concluída
                    </div>
                    <h2 className="text-2xl font-sans font-bold text-white mb-2">Sua Auditoria está pronta.</h2>
                    <p className="text-gray-400 text-sm">
                        Identificamos <span className="text-white font-semibold">3 pontos críticos</span>. Informe onde devemos enviar o relatório completo e o Plano de Recuperação.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-xs font-medium text-gray-400 mb-1 ml-1">NOME E SOBRENOME</label>
                        <input
                            required
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-[#050505] border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-er-red focus:ring-1 focus:ring-er-red transition-all placeholder-gray-600"
                            placeholder="Ex: João Silva"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-xs font-medium text-gray-400 mb-1 ml-1">E-MAIL PESSOAL</label>
                        <input
                            required
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-[#050505] border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-er-red focus:ring-1 focus:ring-er-red transition-all placeholder-gray-600"
                            placeholder="joao@email.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="whatsapp" className="block text-xs font-medium text-gray-400 mb-1 ml-1">WHATSAPP</label>
                        <input
                            required
                            type="tel"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleChange}
                            className="w-full bg-[#050505] border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-er-red focus:ring-1 focus:ring-er-red transition-all placeholder-gray-600"
                            placeholder="Para envio rápido do plano"
                        />
                    </div>

                    <div>
                        <label htmlFor="instagram" className="block text-xs font-medium text-gray-400 mb-1 ml-1">INSTAGRAM (@SEUPERFIL)</label>
                        <input
                            required
                            type="text"
                            name="instagram"
                            value={formData.instagram}
                            onChange={handleChange}
                            className="w-full bg-[#050505] border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-er-red focus:ring-1 focus:ring-er-red transition-all placeholder-gray-600"
                            placeholder="@seu.restaurante"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full bg-er-red hover:bg-[#cc0000] text-white font-bold py-4 rounded-lg shadow-lg shadow-er-red/20 transition-all flex items-center justify-center gap-2 mt-6"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" /> Processando...
                            </span>
                        ) : (
                            <>
                                LIBERAR MEU DIAGNÓSTICO AGORA <Lock className="w-4 h-4" />
                            </>
                        )}
                    </motion.button>
                </form>

                <p className="text-center text-xs text-gray-600 mt-6 flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" /> Seus dados estão protegidos e não enviamos spam.
                </p>
            </div>
        </div>
    );
};

export default LeadForm;
