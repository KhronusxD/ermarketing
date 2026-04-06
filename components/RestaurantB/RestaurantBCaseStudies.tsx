import React from 'react';
import { ArrowRight, Quote } from 'lucide-react';
import { SectionProps } from '../../types';

const cases = [
    {
        name: 'Taychi Sushi Bar',
        location: 'Manaus',
        problem:
            'O Taychi chegou para nós com um problema claro: fim de semana sempre cheio, semana sempre vazia. O sushi bar tinha produto excelente, mas dependia completamente de indicação e não tinha nenhum sistema de captação ativo.',
        timeframe: 'Em 90 dias',
        stats: [
            { label: 'Reservas mensais', value: '+280%' },
            { label: 'Custo por lead', value: 'R$ 11,80' },
            { label: 'Receita adicional', value: '+R$ 38.000' },
            { label: 'ROI em ads', value: '3,2x' },
        ],
        quote:
            'Em 60 dias o sushi bar tinha fila de espera no fim de semana. Algo que nunca tinha acontecido antes. A ER entende de restaurante de verdade.',
        author: 'Proprietário, Taychi Sushi Bar',
    },
    {
        name: 'La Pizza Rio',
        location: 'Manaus',
        problem:
            'A La Pizza Rio queria crescer no delivery sem depender do iFood. O desafio era criar uma base de clientes própria que pedisse direto — com margem maior e relacionamento real.',
        timeframe: 'Em 90 dias',
        stats: [
            { label: 'Pedidos diretos', value: '+190%' },
            { label: 'Custo por lead', value: 'R$ 9,40' },
            { label: 'Receita adicional', value: '+R$ 24.000' },
            { label: 'ROI em ads', value: '4,1x' },
        ],
        quote:
            'O diferencial foi o atendimento automático. Todo lead recebia resposta em minutos — mesmo de madrugada. A taxa de conversão triplicou.',
        author: 'Proprietário, La Pizza Rio',
    },
];

export const RestaurantBCaseStudies: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section id="casos-reais-b" className="py-24 bg-[#F7F3EE]">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-[#D4660A] text-xs font-bold tracking-widest uppercase mb-3">Resultados reais em Manaus</p>
                    <h2 className="text-3xl md:text-[2.75rem] font-extrabold text-[#3D2B1F] tracking-tight leading-tight">
                        Não acredite na gente.<br />
                        <span className="text-[#D4660A]">Acredite nos números.</span>
                    </h2>
                </div>

                {/* Cases */}
                <div className="space-y-8">
                    {cases.map((c, i) => (
                        <div
                            key={i}
                            className="bg-white border border-[#EAE2D9] rounded-[2.25rem] overflow-hidden shadow-[0_2px_0_0_#EAE2D9] hover:shadow-[0_4px_0_0_#EAE2D9] hover:-translate-y-[1px] transition-all duration-200"
                        >
                            {/* Case header */}
                            <div className="px-8 pt-8 pb-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-xs font-bold text-[#8B7E74] bg-[#F7F3EE] px-3 py-1 rounded-full uppercase border border-[#EAE2D9]">
                                        {c.location}
                                    </span>
                                    <h3 className="text-xl font-extrabold text-[#3D2B1F]">{c.name}</h3>
                                </div>
                                <p className="text-[#5C5047] leading-relaxed text-[0.95rem]">{c.problem}</p>
                            </div>

                            {/* Stats */}
                            <div className="px-8 py-5">
                                <p className="text-xs font-bold text-[#D4660A] uppercase tracking-widest mb-4">{c.timeframe}:</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {c.stats.map((stat, j) => (
                                        <div key={j} className="bg-[#FFF8F0] border border-[#F5DCC3] rounded-2xl p-4 text-center">
                                            <div className="text-xl md:text-2xl font-extrabold text-[#3D2B1F] mb-1 tracking-tight">{stat.value}</div>
                                            <p className="text-[#8B7E74] text-xs uppercase tracking-wide leading-tight font-medium">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Testimonial */}
                            <div className="px-8 pb-8 pt-2">
                                <div className="bg-[#F7F3EE] rounded-2xl p-6 relative">
                                    <Quote className="absolute top-4 left-4 text-[#D4660A]/15 rotate-180" size={28} />
                                    <p className="text-[#5C5047] italic leading-relaxed mb-3 relative z-10 pl-2 text-[0.95rem]">
                                        "{c.quote}"
                                    </p>
                                    <p className="text-[#8B7E74] text-sm font-semibold">— {c.author}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <button
                        onClick={onAuditClick}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4660A] text-white font-extrabold text-base rounded-full border-2 border-[#A34F08] shadow-[0_3px_0_0_#A34F08] hover:shadow-[0_5px_0_0_#A34F08] hover:-translate-y-[2px] active:shadow-none active:translate-y-0 transition-all duration-200 uppercase tracking-wide"
                    >
                        Quero resultado assim — fazer o diagnóstico
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
};
