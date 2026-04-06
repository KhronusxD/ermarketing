import React from 'react';
import { ArrowRight, TrendingUp, Quote } from 'lucide-react';
import { SectionProps } from '../../types';
import { Button } from '../ui/Button';

const cases = [
    {
        name: 'Taychi Sushi Bar',
        location: 'Manaus',
        problem:
            'O Taychi chegou para nós com um problema claro: fim de semana sempre cheio, semana sempre vazia. O sushi bar tinha produto excelente, mas dependia completamente de indicação e não tinha nenhum sistema de captação ativo.',
        timeframe: 'Em 90 dias',
        stats: [
            { label: 'Reservas mensais', value: '+280%' },
            { label: 'Custo por lead qualificado', value: 'R$ 11,80' },
            { label: 'Receita adicional', value: '+R$ 38.000' },
            { label: 'Retorno sobre investimento', value: '3,2x' },
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
            { label: 'Pedidos diretos via WhatsApp', value: '+190%' },
            { label: 'Custo por lead', value: 'R$ 9,40' },
            { label: 'Receita adicional', value: '+R$ 24.000' },
            { label: 'Retorno sobre investimento', value: '4,1x' },
        ],
        quote:
            'O diferencial foi o atendimento automático. Todo lead recebia resposta em minutos — mesmo de madrugada. A taxa de conversão triplicou.',
        author: 'Proprietário, La Pizza Rio',
    },
];

export const RestaurantCaseStudies: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section id="casos-reais" className="py-24 bg-[#050505] border-y border-white/5 relative z-10">
            <div className="max-w-5xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-900/10 text-orange-500 text-xs font-bold tracking-widest uppercase mb-4">
                        <TrendingUp size={14} />
                        Resultados reais em Manaus
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
                        Não acredite na gente.<br />
                        <span className="text-orange-500">Acredite nos números.</span>
                    </h2>
                </div>

                {/* Cases */}
                <div className="space-y-12">
                    {cases.map((c, i) => (
                        <div
                            key={i}
                            className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/20 transition-colors"
                        >
                            {/* Case header */}
                            <div className="px-8 pt-8 pb-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-xs font-bold text-gray-500 border border-white/10 px-3 py-1 rounded-full uppercase">
                                        {c.location}
                                    </span>
                                    <h3 className="text-2xl font-bold text-white">{c.name}</h3>
                                </div>
                                <p className="text-gray-400 leading-relaxed">{c.problem}</p>
                            </div>

                            {/* Stats */}
                            <div className="px-8 py-6">
                                <p className="text-sm font-bold text-orange-500 uppercase tracking-wider mb-4">{c.timeframe}:</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {c.stats.map((stat, j) => (
                                        <div key={j} className="bg-white/5 rounded-xl p-4 text-center">
                                            <div className="text-xl md:text-2xl font-black text-white mb-1">{stat.value}</div>
                                            <p className="text-gray-500 text-xs uppercase tracking-wide leading-tight">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Testimonial */}
                            <div className="px-8 pb-8 pt-2">
                                <div className="bg-[#050505] border border-white/5 rounded-xl p-6 relative">
                                    <Quote className="absolute top-4 left-4 text-orange-500/15 rotate-180" size={32} />
                                    <p className="text-gray-300 italic leading-relaxed mb-4 relative z-10 pl-2">
                                        "{c.quote}"
                                    </p>
                                    <p className="text-gray-500 text-sm font-medium">— {c.author}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <Button
                        onClick={onAuditClick}
                        className="text-base px-8 py-4 shadow-[0_0_30px_rgba(255,165,0,0.4)] bg-orange-600 hover:bg-orange-700 border-orange-500 text-white"
                    >
                        Quero resultado assim — fazer o diagnóstico
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
};
