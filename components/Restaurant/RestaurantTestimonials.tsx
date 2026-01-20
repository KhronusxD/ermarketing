import React from 'react';
import { Quote } from 'lucide-react';
import { SectionProps } from '../../types';

export const RestaurantTestimonials: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="py-24 bg-[#0a0a0a] relative z-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16 text-white">
                    QUEM JÁ ESCALOU COM A GENTE
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            name: "André M.",
                            role: "Dono de Hamburgueria Artesanal",
                            text: "Eu vendia R$ 80 mil mas sobrava zero. A auditoria mostrou que meu CMV estava em 42% e eu nem sabia. Ajustamos o cardápio e hoje sobra 15% líquido todo mês."
                        },
                        {
                            name: "Carla S.",
                            role: "Fundadora, Sushi Delivery",
                            text: "Achei que o problema era falta de pedidos. Na verdade, eu estava 'comprando' cliente caro demais no iFood. Criamos nosso canal próprio e a margem dobrou."
                        },
                        {
                            name: "Roberto F.",
                            role: "Sócio, Rede de Pizzarias",
                            text: "A gente abriu 3 unidades em 1 ano, mas o controle financeiro virou um caos. A ER organizou a casa e implementou um marketing que traz cliente para o salão na terça-feira."
                        }
                    ].map((item, index) => (
                        <div key={index} className="bg-[#050505] p-8 rounded-xl border border-white/5 relative hover:border-orange-500/30 transition-colors cursor-pointer group" onClick={onAuditClick}>
                            <Quote className="absolute top-6 left-6 text-orange-500/20 rotate-180 group-hover:text-orange-500/40 transition-colors" size={40} />
                            <p className="text-gray-300 italic mb-6 relative z-10 mt-6 leading-relaxed">"{item.text}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-orange-900/20 rounded-full flex items-center justify-center font-bold text-orange-500 border border-orange-500/20">
                                    {item.name[0]}
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">{item.name}</h4>
                                    <p className="text-gray-500 text-xs">{item.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
