import React from 'react';
import { ArrowUpRight, TrendingUp, DollarSign, Users } from 'lucide-react';
import { SectionProps } from '../types';
import { Button } from './ui/Button';

export const CaseStudies: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="py-24 bg-[#050505] border-y border-white/5 relative z-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-er-red/10 text-er-red text-xs font-bold tracking-widest uppercase mb-4">
                            Resultados Reais
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                            DADOS, NÃO PROMESSAS
                        </h2>
                    </div>
                    <p className="text-gray-400 max-w-md text-right md:text-left">
                        O resultado da nossa metodologia aplicada em diferentes nichos.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Case 1 */}
                    <div className="bg-[#050505] border border-white/10 rounded-xl p-8 hover:border-er-red/30 transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-8">
                            <span className="text-xs font-bold text-gray-500 border border-white/10 px-3 py-1 rounded-full uppercase">E-commerce</span>
                            <TrendingUp className="text-green-500 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="mb-6">
                            <p className="text-gray-400 text-sm mb-1">Crescimento de Receita</p>
                            <h3 className="text-4xl font-bold text-white">+240%</h3>
                            <p className="text-xs text-gray-500 mt-1">em 90 dias de operação</p>
                        </div>
                        <div className="space-y-3 pt-6 border-t border-white/5">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">ROAS Médio</span>
                                <span className="text-white font-bold">12.5x</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Custo por Venda</span>
                                <span className="text-white font-bold">-45%</span>
                            </div>
                        </div>
                    </div>

                    {/* Case 2 */}
                    <div className="bg-[#050505] border border-white/10 rounded-xl p-8 hover:border-er-red/30 transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-8">
                            <span className="text-xs font-bold text-gray-500 border border-white/10 px-3 py-1 rounded-full uppercase">Infoproduto</span>
                            <Button onClick={onAuditClick} variant="outline" className="border-er-red text-er-red hover:bg-er-red hover:text-white group-hover:scale-110 transition-transform">
                                <DollarSign />
                            </Button>
                        </div>
                        <div className="mb-6">
                            <p className="text-gray-400 text-sm mb-1">Faturamento em Lançamento</p>
                            <h3 className="text-4xl font-bold text-white">R$ 1.2M</h3>
                            <p className="text-xs text-gray-500 mt-1">com investimento de R$ 180k</p>
                        </div>
                        <div className="space-y-3 pt-6 border-t border-white/5">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Leads Captados</span>
                                <span className="text-white font-bold">15.000+</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Conversão LP</span>
                                <span className="text-white font-bold">65%</span>
                            </div>
                        </div>
                    </div>

                    {/* Case 3 */}
                    <div className="bg-[#050505] border border-white/10 rounded-xl p-8 hover:border-er-red/30 transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-8">
                            <span className="text-xs font-bold text-gray-500 border border-white/10 px-3 py-1 rounded-full uppercase">Serviços B2B</span>
                            <Users className="text-blue-500 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="mb-6">
                            <p className="text-gray-400 text-sm mb-1">Volume de Leads Qualificados</p>
                            <h3 className="text-4xl font-bold text-white">50/dia</h3>
                            <p className="text-xs text-gray-500 mt-1">preenchimento de form qualificado</p>
                        </div>
                        <div className="space-y-3 pt-6 border-t border-white/5">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">CAC (Custo/Cliente)</span>
                                <span className="text-white font-bold">R$ 45,00</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Taxa de Agendamento</span>
                                <span className="text-white font-bold">30%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};