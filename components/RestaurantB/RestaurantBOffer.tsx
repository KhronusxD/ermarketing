import React from 'react';
import { SectionProps } from '../../types';
import {
    ArrowRight,
    MousePointerClick,
    Video,
    Palette,
    Share2,
    Bot,
    BarChart3,
    Users,
    Check,
} from 'lucide-react';

const deliverables = [
    {
        icon: MousePointerClick,
        title: 'Gestão de tráfego pago',
        desc: 'Meta Ads e Google Ads com foco em reservas e delivery — não em clique vazio.',
        marketValue: 'R$ 1.500/mês',
    },
    {
        icon: Video,
        title: '1 dia de captação audiovisual profissional',
        desc: 'Vídeos e fotos no seu restaurante que fazem o cliente sentir o prato pela tela.',
        marketValue: 'R$ 800/mês',
    },
    {
        icon: Palette,
        title: 'Edição de 4 vídeos + 12 artes',
        desc: 'Conteúdo mensal com identidade visual consistente.',
        marketValue: 'R$ 700/mês',
    },
    {
        icon: Share2,
        title: 'Social media completo',
        desc: 'Feed, stories e gestão de comentários com estratégia de conteúdo definida.',
        marketValue: 'R$ 800/mês',
    },
    {
        icon: Bot,
        title: 'CRM com IA agêntica via WhatsApp',
        desc: 'Atende o lead, qualifica o interesse, agenda a reserva e faz follow-up automático, 24h por dia.',
        marketValue: 'R$ 1.500/mês',
    },
    {
        icon: BarChart3,
        title: 'Relatório mensal de resultado',
        desc: 'Leads gerados, custo por lead, reservas convertidas, ROI. Sem achismo.',
        marketValue: 'Sem equivalente local',
    },
    {
        icon: Users,
        title: 'Reunião estratégica mensal',
        desc: 'Com o time ER para análise e planejamento do próximo mês.',
        marketValue: 'Incluso',
    },
];

export const RestaurantBOffer: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="py-24 bg-[#FFFDF8]">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-6">
                    <p className="text-[#D4660A] text-xs font-bold tracking-widest uppercase mb-3">O que está incluso</p>
                    <h2 className="text-3xl md:text-[2.75rem] font-extrabold text-[#3D2B1F] tracking-tight leading-tight mb-4">
                        Tudo que seu restaurante precisa para crescer.{' '}
                        <span className="text-[#D4660A]">Em um único parceiro.</span>
                    </h2>
                </div>

                <p className="text-[#5C5047] text-center max-w-2xl mx-auto mb-14 leading-relaxed">
                    A maioria das agências vende peça separada. Social media por um lado, tráfego por outro, audiovisual por um terceiro.
                    Você vira gerente de fornecedor — e quem paga o preço dessa desorganização é o seu faturamento.
                    <br /><br />
                    <span className="text-[#3D2B1F] font-semibold">
                        Na ER você tem tudo integrado, com um time que conversa entre si e trabalha com um objetivo único: encher o seu salão.
                    </span>
                </p>

                {/* Deliverables */}
                <div className="space-y-3 mb-12">
                    {deliverables.map((item, i) => (
                        <div
                            key={i}
                            className="flex flex-col md:flex-row md:items-center gap-4 p-5 bg-white border border-[#EAE2D9] rounded-2xl shadow-[0_1px_0_0_#EAE2D9] hover:border-[#D4660A]/30 transition-colors"
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div className="w-11 h-11 rounded-full bg-[#FFF3E0] flex items-center justify-center flex-shrink-0">
                                    <item.icon size={20} className="text-[#D4660A]" />
                                </div>
                                <div>
                                    <h4 className="text-[#3D2B1F] font-bold text-sm md:text-base">{item.title}</h4>
                                    <p className="text-[#8B7E74] text-sm">{item.desc}</p>
                                </div>
                            </div>
                            <div className="text-right md:flex-shrink-0">
                                <span className="text-[#B5ADA5] text-sm line-through">{item.marketValue}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Price box */}
                <div className="bg-[#D4660A] rounded-[2.25rem] p-8 md:p-10 text-center relative overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/5 rounded-full"></div>
                    <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full"></div>

                    <div className="relative z-10">
                        <p className="text-white/60 text-sm uppercase tracking-widest mb-2">Valor total de mercado</p>
                        <p className="text-2xl font-bold text-white/40 line-through mb-4">R$ 5.300/mês</p>

                        <p className="text-white/70 text-sm uppercase tracking-widest mb-2">Você investe</p>
                        <p className="text-5xl md:text-6xl font-extrabold text-white mb-2 tracking-tight">
                            R$ 3.500<span className="text-lg text-white/50 font-normal">/mês</span>
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 text-sm text-white/70 mt-4 mb-8">
                            <span className="flex items-center gap-1.5">
                                <Check size={14} className="text-white" />
                                Setup inicial: R$ 800
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Check size={14} className="text-white" />
                                Verba de ads cobrada à parte
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Check size={14} className="text-white" />
                                Sem fidelidade mínima
                            </span>
                        </div>

                        <button
                            onClick={onAuditClick}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#D4660A] font-extrabold text-base rounded-full border-2 border-[#EAE2D9] shadow-[0_3px_0_0_#C4B5A5] hover:shadow-[0_5px_0_0_#C4B5A5] hover:-translate-y-[2px] active:shadow-none active:translate-y-0 transition-all duration-200 uppercase tracking-wide"
                        >
                            Quero esse resultado — fazer o diagnóstico
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
