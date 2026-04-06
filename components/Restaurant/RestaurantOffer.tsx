import React from 'react';
import { SectionProps } from '../../types';
import { Button } from '../ui/Button';
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
        marketValue: 'Sem equivalente no mercado local',
    },
    {
        icon: Users,
        title: 'Reunião estratégica mensal',
        desc: 'Com o time ER para análise e planejamento do próximo mês.',
        marketValue: 'Incluso',
    },
];

export const RestaurantOffer: React.FC<SectionProps> = ({ onAuditClick }) => {
    return (
        <section className="py-24 bg-[#0a0a0a] border-y border-white/5 relative z-10">
            <div className="max-w-5xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-900/10 text-orange-500 text-xs font-bold tracking-widest uppercase mb-4">
                        O que está incluso
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
                        Tudo que seu restaurante precisa para crescer.<br />
                        <span className="text-orange-500">Em um único parceiro.</span>
                    </h2>
                </div>

                <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16 leading-relaxed">
                    A maioria das agências vende peça separada. Social media por um lado, tráfego por outro, audiovisual por um terceiro.
                    Você vira gerente de fornecedor — e quem paga o preço dessa desorganização é o seu faturamento.
                    <br /><br />
                    <span className="text-white font-medium">
                        Na ER você tem tudo integrado, com um time que conversa entre si e trabalha com um objetivo único: encher o seu salão.
                    </span>
                </p>

                {/* Deliverables */}
                <div className="space-y-4 mb-12">
                    {deliverables.map((item, i) => (
                        <div
                            key={i}
                            className="flex flex-col md:flex-row md:items-center gap-4 p-5 bg-[#050505] border border-white/5 rounded-xl hover:border-orange-500/20 transition-colors"
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div className="w-10 h-10 rounded-lg bg-orange-950/30 flex items-center justify-center flex-shrink-0">
                                    <item.icon size={20} className="text-orange-500" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm md:text-base">{item.title}</h4>
                                    <p className="text-gray-500 text-sm">{item.desc}</p>
                                </div>
                            </div>
                            <div className="text-right md:flex-shrink-0">
                                <span className="text-gray-600 text-sm line-through">{item.marketValue}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Price box */}
                <div className="bg-gradient-to-br from-[#050505] to-orange-950/10 border border-orange-500/30 rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-orange-500 shadow-[0_0_20px_#FF8C00]"></div>

                    <p className="text-gray-500 text-sm uppercase tracking-wider mb-2">Valor total de mercado</p>
                    <p className="text-3xl font-bold text-gray-600 line-through mb-4">R$ 5.300/mês</p>

                    <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Você investe</p>
                    <p className="text-5xl md:text-6xl font-black text-white mb-2">
                        R$ 3.500<span className="text-lg text-gray-500 font-normal">/mês</span>
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mt-4 mb-8">
                        <span className="flex items-center gap-1.5">
                            <Check size={14} className="text-orange-500" />
                            Setup inicial: R$ 800
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Check size={14} className="text-orange-500" />
                            Verba de ads cobrada à parte
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Check size={14} className="text-orange-500" />
                            Sem fidelidade mínima
                        </span>
                    </div>

                    <Button
                        onClick={onAuditClick}
                        className="text-base px-8 py-4 shadow-[0_0_30px_rgba(255,165,0,0.5)] bg-orange-600 hover:bg-orange-700 border-orange-500 text-white animate-pulse-slow"
                    >
                        Quero esse resultado — fazer o diagnóstico
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
};
