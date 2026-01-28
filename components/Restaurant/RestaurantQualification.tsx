import React from 'react';
import { Check } from 'lucide-react';
import { SectionProps } from '../../types';
import { Button } from '../ui/Button';

export const RestaurantQualification: React.FC<SectionProps> = ({ onAuditClick }) => {
    const criteria = [
        "Donos de Restaurante, Delivery ou Dark Kitchen que faturam acima de R$ 30k/mês.",
        "Quem está cansado de pagar taxas abusivas para aplicativos e quer canal próprio.",
        "Negócios que têm produto bom, mas sofrem para encher o salão ou manter pedidos constantes."
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-[#050505]">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 text-white">PARA QUEM É ESTA AUDITORIA?</h2>

                <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 md:p-12 mb-10 text-left shadow-2xl">
                    <ul className="space-y-6">
                        {criteria.map((item, index) => (
                            <li key={index} className="flex items-start gap-4">
                                <div className="w-6 h-6 rounded-full bg-orange-600 flex-shrink-0 flex items-center justify-center mt-1">
                                    <Check size={14} className="text-white" strokeWidth={3} />
                                </div>
                                <span className="text-lg md:text-xl text-gray-200">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col items-center">
                    <Button onClick={onAuditClick} className="w-full md:w-auto text-lg px-12 py-5 shadow-[0_0_50px_rgba(255,165,0,0.4)] bg-orange-600 hover:bg-orange-700 border-orange-500 text-white animate-pulse-slow">
                        QUERO ESCALAR MEU RESTAURANTE
                    </Button>
                    <p className="mt-4 text-gray-500 text-sm">
                        Sem compromisso. Análise focada em lucro.
                    </p>
                </div>
            </div>
        </section>
    );
};
