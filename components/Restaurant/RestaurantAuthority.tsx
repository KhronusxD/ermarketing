import React from 'react';
import { SectionProps } from '../../types';
import { Button } from '../ui/Button';

export const RestaurantAuthority: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="py-20 bg-[#0a0a0a] border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <p className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-4">Track Record Gastronômico</p>
                <h2 className="text-3xl font-bold text-white mb-12">ESTRATÉGIA TESTADA EM +50 RESTAURANTES</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
                    <div className="py-4">
                        <div className="text-5xl font-black text-white mb-2">+150k</div>
                        <p className="text-gray-500 text-sm uppercase tracking-wide">Pedidos/Mês Gerenciados</p>
                    </div>
                    <div className="py-4">
                        <div className="text-5xl font-black text-white mb-2">35%</div>
                        <p className="text-gray-500 text-sm uppercase tracking-wide">Redução Média de CMV</p>
                    </div>
                    <div className="py-4">
                        <div className="text-5xl font-black text-white mb-2">3x</div>
                        <p className="text-gray-500 text-sm uppercase tracking-wide">Aumento de Venda Direta</p>
                    </div>
                </div>

                <div className="mt-12 p-6 bg-white/5 rounded-lg inline-block border border-white/5 max-w-3xl">
                    <p className="text-gray-300 italic mb-6">
                        "Enquanto o mercado foca em postar 'foto de comida', nós focamos na engenharia do seu cardápio, no LTV do cliente e na redução da dependência de apps."
                    </p>
                    <Button onClick={onAuditClick} className="shadow-[0_0_20px_rgba(255,165,0,0.4)] bg-orange-600 hover:bg-orange-700 border-orange-500 text-white">
                        CONHECER METODOLOGIA
                    </Button>
                </div>
            </div>
        </section>
    );
};
