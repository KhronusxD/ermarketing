import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    CheckCircle2,
    AlertTriangle,
    Target,
    Flame,
    Sparkles,
    MessageCircle,
    Clock,
} from 'lucide-react';
import { GoldButton, SectionLabel } from '../shared';
import { WHATSAPP_REDIRECT } from './quizData';
import { getDiagnostic } from './diagnostic';

export interface QuizFormFields {
    name: string;
    whatsapp: string;
    restaurant: string;
    instagram: string;
}

interface QuizResultProps {
    answers: (string | undefined)[];
    formData: QuizFormFields;
}

export const QuizResult: React.FC<QuizResultProps> = ({ answers, formData }) => {
    const d = getDiagnostic(answers);
    const firstName = formData.name.trim().split(/\s+/)[0] || '';
    const restaurantName = formData.restaurant.trim() || 'seu restaurante';

    // Fire custom analytics event — GTM / pixel listeners can pick this up
    useEffect(() => {
        try {
            window.dispatchEvent(
                new CustomEvent('diagnosticoCompleted', {
                    detail: { formData, answers, diagnostic: d },
                })
            );
            (window as any).dataLayer?.push({
                event: 'diagnostico_completed',
                restaurant: restaurantName,
            });
        } catch { /* noop */ }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const openWhatsApp = () => {
        window.open(WHATSAPP_REDIRECT, '_blank', 'noopener,noreferrer');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-4xl mx-auto px-6"
        >
            {/* Heading */}
            <div className="text-center mb-12">
                <SectionLabel className="mb-6 mx-auto">
                    <CheckCircle2 size={12} />
                    Diagnóstico personalizado &middot; {restaurantName}
                </SectionLabel>
                <h1 className="font-serif text-3xl md:text-5xl font-semibold text-[#F5F1E8] tracking-tight leading-[1.1] mb-5">
                    {d.headline}
                </h1>
                <p className="text-base md:text-lg text-[#C7BFB1] leading-relaxed max-w-2xl mx-auto">
                    {firstName ? `${firstName}, analisamos` : 'Analisamos'} suas 5 respostas e cruzamos com o padrão de
                    mais de uma dúzia de restaurantes em Manaus. Abaixo, o diagnóstico sintético e o plano para{' '}
                    <span className="italic text-[#E8C088]">{restaurantName}</span>.
                </p>
            </div>

            {/* Featured pain card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="relative p-7 md:p-9 rounded-3xl bg-gradient-to-br from-[#D4A574]/15 via-[#D4A574]/5 to-transparent border border-[#D4A574]/30 mb-5 overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4A574] to-transparent opacity-50"></div>
                <div className="flex items-center gap-2 mb-4">
                    <Flame size={14} className="text-[#E8C088]" />
                    <span className="text-[10px] text-[#D4A574] font-semibold tracking-[0.3em] uppercase">
                        Gargalo principal
                    </span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-[#F5F1E8] leading-tight mb-3">
                    {d.painTitle}
                </h2>
                <p className="text-[#C7BFB1] leading-relaxed text-base md:text-lg">{d.painInsight}</p>

                <div className="mt-6 pt-5 border-t border-[#D4A574]/20">
                    <div className="text-[10px] text-[#E8C088] font-semibold tracking-[0.25em] uppercase mb-1.5">
                        Onde você está hoje
                    </div>
                    <p className="text-[#A8A196] text-sm leading-relaxed">{d.marketingInsight}</p>
                </div>
            </motion.div>

            {/* 3-card grid: modelo / investimento / capacidade */}
            <div className="grid md:grid-cols-3 gap-4 mb-10">
                <InsightCard
                    icon={Target}
                    label="Seu modelo"
                    title={d.modelTitle}
                    body={d.modelInsight}
                    delay={0.25}
                />
                <InsightCard
                    icon={Sparkles}
                    label="Plano recomendado"
                    title={d.investmentTitle}
                    body={d.investmentInsight}
                    accent
                    delay={0.32}
                />
                <InsightCard
                    icon={d.capacityWarning ? AlertTriangle : CheckCircle2}
                    label="Capacidade"
                    title={d.capacityTitle}
                    body={d.capacityInsight}
                    warn={d.capacityWarning}
                    delay={0.39}
                />
            </div>

            {/* Action plan */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.48 }}
                className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-xl border border-white/10 mb-10"
            >
                <div className="text-[10px] text-[#D4A574] font-semibold tracking-[0.3em] uppercase mb-3">
                    Plano de ação
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-[#F5F1E8] mb-6 leading-tight">
                    O que vamos implementar com <span className="italic text-[#E8C088]">{restaurantName}</span>
                </h3>
                <ul className="space-y-3.5">
                    {d.actionPlan.map((item, i) => (
                        <li
                            key={i}
                            className="flex gap-3 items-start text-[#C7BFB1] leading-relaxed text-sm md:text-base"
                        >
                            <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-[#D4A574]"></span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </motion.div>

            {/* Next steps CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="relative p-8 md:p-12 rounded-3xl border border-[#D4A574]/30 text-center overflow-hidden"
                style={{
                    background:
                        'radial-gradient(ellipse at 50% 0%, rgba(212,165,116,0.18) 0%, transparent 60%), linear-gradient(180deg, #1a1510 0%, #14100b 100%)',
                }}
            >
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4A574]/15 border border-[#D4A574]/40 mb-6">
                        <Clock size={12} className="text-[#E8C088]" />
                        <span className="text-[10px] text-[#E8C088] font-semibold tracking-[0.25em] uppercase">
                            Próximo passo
                        </span>
                    </div>

                    <h3 className="font-serif text-2xl md:text-4xl text-[#F5F1E8] mb-4 leading-tight max-w-2xl mx-auto">
                        Nossa equipe vai entrar em contato <span className="italic text-[#E8C088]">em alguns minutos.</span>
                    </h3>

                    <p className="text-[#C7BFB1] leading-relaxed max-w-xl mx-auto mb-2 text-base md:text-lg">
                        Vamos agendar uma consultoria estratégica para{' '}
                        <span className="text-[#F5F1E8] font-medium">implementar, junto com você</span>, as melhorias
                        do seu diagnóstico.
                    </p>
                    <p className="text-[#A8A196] leading-relaxed max-w-xl mx-auto mb-8 text-sm">
                        Chamamos pelo WhatsApp que você cadastrou — normalmente em até 10 minutos em horário comercial.
                    </p>

                    <div className="flex flex-col items-center gap-4">
                        <GoldButton size="lg" onClick={openWhatsApp}>
                            <MessageCircle size={18} />
                            Agilizar meu atendimento no WhatsApp
                        </GoldButton>
                        <p className="text-xs text-[#A8A196] tracking-wide max-w-md">
                            Se preferir não esperar, chame a gente agora — atendimento prioritário pra leads que
                            vieram pelo diagnóstico.
                        </p>
                    </div>
                </div>
            </motion.div>

            <p className="mt-8 text-center text-[11px] text-[#A8A196] tracking-wider">
                Atendemos apenas restaurantes em Manaus &middot; Máximo 4 novos clientes por mês
            </p>
        </motion.div>
    );
};

interface InsightCardProps {
    icon: React.ElementType;
    label: string;
    title: string;
    body: string;
    accent?: boolean;
    warn?: boolean;
    delay?: number;
}

const InsightCard: React.FC<InsightCardProps> = ({ icon: Icon, label, title, body, accent, warn, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className={`p-6 rounded-2xl border backdrop-blur-xl ${
            warn
                ? 'border-[#D4A574]/50 bg-gradient-to-b from-[#D4A574]/10 to-[#D4A574]/5'
                : accent
                ? 'border-[#D4A574]/25 bg-gradient-to-b from-[#D4A574]/8 to-white/[0.02]'
                : 'border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01]'
        }`}
    >
        <div className="flex items-center gap-2 mb-3">
            <Icon size={14} className={warn ? 'text-[#F5D89F]' : accent ? 'text-[#E8C088]' : 'text-[#D4A574]'} />
            <span className="text-[10px] text-[#D4A574] font-semibold tracking-[0.3em] uppercase">{label}</span>
        </div>
        <div className="font-serif text-lg md:text-xl text-[#F5F1E8] leading-tight mb-2">{title}</div>
        <p className="text-[#C7BFB1] text-sm leading-relaxed">{body}</p>
    </motion.div>
);
