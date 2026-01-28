import React from 'react';
import { ArrowUpRight, TrendingUp, DollarSign, Users } from 'lucide-react';
import { SectionProps } from '../../types';
import { Button } from '../ui/Button';

export const RestaurantCaseStudies: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="py-24 bg-[#050505] border-y border-white/5 relative z-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-900/10 text-orange-500 text-xs font-bold tracking-widest uppercase mb-4">
                            Resultados na Cozinha
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                            DADOS, NÃO "GIMMICKS"
                        </h2>
                    </div>
                    <p className="text-gray-400 max-w-md text-right md:text-left">
                        Números reais de quem aplicou nossa gestão de tráfego e cardápio.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Case 1 */}
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-orange-500/30 transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-8">
                            <span className="text-xs font-bold text-gray-500 border border-white/10 px-3 py-1 rounded-full uppercase">Dark Kitchen</span>
                            <TrendingUp className="text-green-500 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="mb-6">
                            <p className="text-gray-400 text-sm mb-1">Crescimento de Venda Própria</p>
                            <h3 className="text-4xl font-bold text-white">+180%</h3>
                            <p className="text-xs text-gray-500 mt-1">em 4 meses de site próprio</p>
                        </div>
                        <div className="space-y-3 pt-6 border-t border-white/5">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Economia em Taxas</span>
                                <span className="text-white font-bold">R$ 12k/mês</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Ticket Médio</span>
                                <span className="text-white font-bold">+20%</span>
                            </div>
                        </div>
                    </div>

                    {/* Case 2 */}
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-orange-500/30 transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-8">
                            <span className="text-xs font-bold text-gray-500 border border-white/10 px-3 py-1 rounded-full uppercase">Restaurante ALA CARTE</span>
                            <Button onClick={onAuditClick} variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-600 hover:text-white group-hover:scale-110 transition-transform">
                                <DollarSign />
                            </Button>
                        </div>
                        <div className="mb-6">
                            <p className="text-gray-400 text-sm mb-1">Aumento de Faturamento</p>
                            <h3 className="text-4xl font-bold text-white">R$ 80k</h3>
                            <p className="text-xs text-gray-500 mt-1">adicionais no salão (terça a quinta)</p>
                        </div>
                        <div className="space-y-3 pt-6 border-t border-white/5">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Reservas Online</span>
                                <span className="text-white font-bold">Full House</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Investimento Ads</span>
                                <span className="text-white font-bold">R$ 2.500</span>
                            </div>
                        </div>
                    </div>

                    {/* Case 3 */}
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-orange-500/30 transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-8">
                            <span className="text-xs font-bold text-gray-500 border border-white/10 px-3 py-1 rounded-full uppercase">Franquia de Pizza</span>
                            <Users className="text-blue-500 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="mb-6">
                            <p className="text-gray-400 text-sm mb-1">Novos Clientes</p>
                            <h3 className="text-4xl font-bold text-white">1.200/mês</h3>
                            <p className="text-xs text-gray-500 mt-1">com estratégia de geolocalização</p>
                        </div>
                        <div className="space-y-3 pt-6 border-t border-white/5">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">CAC (Custo/Cliente)</span>
                                <span className="text-white font-bold">R$ 8,50</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Taxa de Retorno</span>
                                <span className="text-white font-bold">45%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
