import React from 'react';
import { SectionProps } from '../../types';
import { Target, Zap } from 'lucide-react';

export const RestaurantBStory: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="py-24 bg-[#FFFDF8]">
            <div className="max-w-3xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <p className="text-[#D4660A] text-xs font-bold tracking-widest uppercase mb-3">Nossa história</p>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#3D2B1F] tracking-tight leading-tight">
                        Como a gente descobriu que restaurante é o{' '}
                        <span className="text-[#D4660A]">nicho mais subatendido de Manaus</span>
                    </h2>
                </div>

                {/* Story body */}
                <div className="space-y-6 text-[#5C5047] leading-relaxed text-lg mb-12">
                    <p>
                        Quando começamos a ER Marketing, atendíamos todo tipo de cliente. Clínicas, construtoras, canais de TV, restaurantes.
                        Mas algo diferente acontecia sempre que a gente trabalhava com food service.
                    </p>
                    <p>
                        Os resultados vinham <span className="text-[#3D2B1F] font-semibold">mais rápido</span>. O dono enxergava o retorno com{' '}
                        <span className="text-[#3D2B1F] font-semibold">mais clareza</span>. E o produto — a comida, o ambiente, a experiência — era
                        naturalmente visual, naturalmente emocional, naturalmente fácil de vender quando a estratégia era certa.
                    </p>
                </div>

                {/* Epiphany cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    <div className="bg-white border border-[#EAE2D9] rounded-[2.25rem] p-7 shadow-[0_1px_0_0_#EAE2D9]">
                        <div className="w-12 h-12 rounded-full bg-[#FFF3E0] flex items-center justify-center mb-4">
                            <Target size={22} className="text-[#D4660A]" />
                        </div>
                        <h4 className="text-[#3D2B1F] font-extrabold text-lg mb-2">Taychi Sushi Bar</h4>
                        <p className="text-[#8B7E74] text-sm leading-relaxed">
                            Resultado mensurável, previsível e crescente em menos de 90 dias.
                        </p>
                    </div>
                    <div className="bg-white border border-[#EAE2D9] rounded-[2.25rem] p-7 shadow-[0_1px_0_0_#EAE2D9]">
                        <div className="w-12 h-12 rounded-full bg-[#FFF3E0] flex items-center justify-center mb-4">
                            <Zap size={22} className="text-[#D4660A]" />
                        </div>
                        <h4 className="text-[#3D2B1F] font-extrabold text-lg mb-2">La Pizza Rio</h4>
                        <p className="text-[#8B7E74] text-sm leading-relaxed">
                            Resultado mensurável, previsível e crescente em menos de 90 dias.
                        </p>
                    </div>
                </div>

                <div className="text-[#5C5047] leading-relaxed text-lg space-y-6">
                    <p>
                        A partir daí, decidimos:{' '}
                        <span className="text-[#D4660A] font-bold">é aqui que a gente vai ser referência.</span>
                    </p>
                    <p>
                        Hoje a ER é a <span className="text-[#3D2B1F] font-semibold">única agência de Manaus</span> que combina{' '}
                        tráfego pago especializado em restaurantes,{' '}
                        produção audiovisual mensal e um{' '}
                        sistema de atendimento com IA que converte lead em reserva — tudo no mesmo pacote,
                        com um time que entende do seu negócio.
                    </p>
                </div>
            </div>
        </section>
    );
};
