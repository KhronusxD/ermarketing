import React from 'react';
import { SectionProps } from '../../types';
import { Lightbulb, Target, Zap } from 'lucide-react';

export const RestaurantStory: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="py-24 bg-[#0a0a0a] border-y border-white/5 relative z-10">
            <div className="max-w-4xl mx-auto px-6">
                {/* Section header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-900/10 text-orange-500 text-xs font-bold tracking-widest uppercase mb-4">
                        <Lightbulb size={14} />
                        Nossa história
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                        Como a gente descobriu que restaurante é o<br />
                        <span className="text-orange-500">nicho mais subatendido de Manaus</span>
                    </h2>
                </div>

                {/* Story body */}
                <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
                    <p>
                        Quando começamos a ER Marketing, atendíamos todo tipo de cliente. Clínicas, construtoras, canais de TV, restaurantes.
                        Mas algo diferente acontecia sempre que a gente trabalhava com food service.
                    </p>
                    <p>
                        Os resultados vinham <span className="text-white font-medium">mais rápido</span>. O dono enxergava o retorno com{' '}
                        <span className="text-white font-medium">mais clareza</span>. E o produto — a comida, o ambiente, a experiência — era
                        naturalmente visual, naturalmente emocional, naturalmente fácil de vender quando a estratégia era certa.
                    </p>
                </div>

                {/* Epiphany moment */}
                <div className="my-12 flex flex-col md:flex-row gap-6">
                    <div className="flex-1 bg-[#050505] border border-orange-500/20 rounded-xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-transparent"></div>
                        <div className="w-10 h-10 rounded-lg bg-orange-950/30 flex items-center justify-center mb-4">
                            <Target size={20} className="text-orange-500" />
                        </div>
                        <h4 className="text-white font-bold mb-2">Taychi Sushi Bar</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Resultado mensurável, previsível e crescente em menos de 90 dias.
                        </p>
                    </div>
                    <div className="flex-1 bg-[#050505] border border-orange-500/20 rounded-xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-transparent"></div>
                        <div className="w-10 h-10 rounded-lg bg-orange-950/30 flex items-center justify-center mb-4">
                            <Zap size={20} className="text-orange-500" />
                        </div>
                        <h4 className="text-white font-bold mb-2">La Pizza Rio</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Resultado mensurável, previsível e crescente em menos de 90 dias.
                        </p>
                    </div>
                </div>

                <div className="text-gray-400 leading-relaxed text-lg space-y-6">
                    <p>
                        A partir daí, decidimos:{' '}
                        <span className="text-orange-500 font-semibold">é aqui que a gente vai ser referência.</span>
                    </p>
                    <p>
                        Hoje a ER é a <span className="text-white font-semibold">única agência de Manaus</span> que combina{' '}
                        <span className="text-white">tráfego pago especializado em restaurantes</span>,{' '}
                        <span className="text-white">produção audiovisual mensal</span> e um{' '}
                        <span className="text-white">sistema de atendimento com IA</span> que converte lead em reserva — tudo no mesmo pacote,
                        com um time que entende do seu negócio.
                    </p>
                </div>
            </div>
        </section>
    );
};
