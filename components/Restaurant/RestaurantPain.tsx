import React from 'react';
import { SectionProps } from '../../types';
import { AlertTriangle, MessageSquareOff, Instagram, Star, XCircle } from 'lucide-react';

const painPoints = [
    {
        icon: XCircle,
        text: 'Você investe em impulsionamento, o post tem curtida, mas o salão continua vazio na terça-feira.',
    },
    {
        icon: Instagram,
        text: 'Você tem um Instagram bonito, mas ele não traz cliente — só seguidor.',
    },
    {
        icon: MessageSquareOff,
        text: 'Um lead manda mensagem às 20h perguntando sobre reserva, e quando alguém responde no dia seguinte, ele já foi para o concorrente.',
    },
    {
        icon: Star,
        text: 'Você sabe que seu produto é bom — as avaliações do Google provam isso — mas o movimento não reflete a qualidade.',
    },
];

export const RestaurantPain: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="py-24 bg-[#050505] border-y border-white/5 relative z-10">
            <div className="max-w-4xl mx-auto px-6">
                {/* Section header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-900/10 text-orange-500 text-xs font-bold tracking-widest uppercase mb-4">
                        <AlertTriangle size={14} />
                        Você se identifica?
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                        Se você é dono de restaurante em Manaus,<br />
                        <span className="text-orange-500">aposto que já viveu isso.</span>
                    </h2>
                </div>

                {/* Pain cards */}
                <div className="space-y-4 mb-12">
                    {painPoints.map((pain, i) => (
                        <div
                            key={i}
                            className="flex items-start gap-4 p-6 bg-[#0a0a0a] border border-white/5 rounded-xl hover:border-orange-500/20 transition-colors"
                        >
                            <div className="w-10 h-10 rounded-lg bg-red-950/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <pain.icon size={20} className="text-red-500" />
                            </div>
                            <p className="text-gray-300 leading-relaxed">{pain.text}</p>
                        </div>
                    ))}
                </div>

                {/* Truth bomb */}
                <div className="bg-gradient-to-br from-[#0a0a0a] to-orange-950/10 border border-orange-500/20 rounded-2xl p-8 md:p-10 text-center">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                        A verdade que ninguém fala:
                    </h3>
                    <p className="text-lg text-gray-300 leading-relaxed mb-4">
                        O problema <span className="text-white font-semibold">não é o seu restaurante</span>. É que você está tentando crescer{' '}
                        <span className="text-orange-500 font-semibold">sem um sistema</span>.
                    </p>
                    <p className="text-gray-500">
                        Indicação é ótima. Mas indicação não escala. Você não pode depender de sorte para encher a casa toda semana.
                    </p>
                </div>
            </div>
        </section>
    );
};
