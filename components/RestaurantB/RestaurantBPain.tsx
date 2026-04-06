import React from 'react';
import { SectionProps } from '../../types';
import { XCircle, Instagram, MessageSquareOff, Star } from 'lucide-react';

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

export const RestaurantBPain: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="py-24 bg-[#F7F3EE]">
            <div className="max-w-3xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <p className="text-[#D4660A] text-xs font-bold tracking-widest uppercase mb-3">Você se identifica?</p>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#3D2B1F] tracking-tight leading-tight">
                        Se você é dono de restaurante em Manaus,<br />
                        <span className="text-[#D4660A]">aposto que já viveu isso.</span>
                    </h2>
                </div>

                {/* Pain cards */}
                <div className="space-y-3 mb-12">
                    {painPoints.map((pain, i) => (
                        <div
                            key={i}
                            className="flex items-start gap-4 p-5 bg-white border border-[#EAE2D9] rounded-2xl shadow-[0_1px_0_0_#EAE2D9] hover:border-[#D4660A]/30 transition-colors"
                        >
                            <div className="w-10 h-10 rounded-full bg-[#FFF3E0] flex items-center justify-center flex-shrink-0 mt-0.5">
                                <pain.icon size={18} className="text-[#D4660A]" />
                            </div>
                            <p className="text-[#5C5047] leading-relaxed">{pain.text}</p>
                        </div>
                    ))}
                </div>

                {/* Truth bomb */}
                <div className="bg-[#3D2B1F] rounded-[2.25rem] p-8 md:p-10 text-center">
                    <h3 className="text-xl md:text-2xl font-extrabold text-white mb-4">
                        A verdade que ninguém fala:
                    </h3>
                    <p className="text-lg text-white/80 leading-relaxed mb-3">
                        O problema <span className="text-white font-semibold">não é o seu restaurante</span>. É que você está tentando crescer{' '}
                        <span className="text-[#F5A623] font-semibold">sem um sistema</span>.
                    </p>
                    <p className="text-white/50 text-sm">
                        Indicação é ótima. Mas indicação não escala. Você não pode depender de sorte para encher a casa toda semana.
                    </p>
                </div>
            </div>
        </section>
    );
};
