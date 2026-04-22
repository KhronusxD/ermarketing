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
import { OceanButton, SectionLabel } from '../shared';
import { WHATSAPP_REDIRECT } from './quizData';
import { getDiagnostic } from './diagnostic';
import { trackCustom, trackStandard } from './metaPixel';

export interface QuizFormFields {
    name: string;
    whatsapp: string;
    business: string;
    instagram: string;
}

interface QuizResultProps {
    answers: (string | undefined)[];
    formData: QuizFormFields;
}

export const QuizResult: React.FC<QuizResultProps> = ({ answers, formData }) => {
    const d = getDiagnostic(answers);
    const firstName = formData.name.trim().split(/\s+/)[0] || '';
    const businessName = formData.business.trim() || 'seu negócio';

    useEffect(() => {
        try {
            window.dispatchEvent(
                new CustomEvent('diagnosticoFlowdeskCompleted', {
                    detail: { formData, answers, diagnostic: d },
                })
            );
            (window as any).dataLayer?.push({
                event: 'flowdesk_diagnostico_completed',
                business: businessName,
            });
        } catch { /* noop */ }
        trackStandard('Lead', {
            content_name: 'Diagnostico Flowdesk - Result',
            content_category: 'flowdesk',
            value: 1,
            currency: 'BRL',
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const openWhatsApp = () => {
        trackCustom('FlowdeskWhatsAppClick', {
            content_name: 'Diagnostico Flowdesk - WhatsApp CTA',
        });
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
                    Diagnóstico personalizado &middot; {businessName}
                </SectionLabel>
                <h1 className="font-serif text-3xl md:text-5xl font-semibold text-[#E8F4FF] tracking-tight leading-[1.1] mb-5">
                    {d.headline}
                </h1>
                <p className="text-base md:text-lg text-[#B8CEE4] leading-relaxed max-w-2xl mx-auto">
                    {firstName ? `${firstName}, analisamos` : 'Analisamos'} suas 5 respostas e cruzamos com o padrão
                    dos clientes ER. Abaixo, o diagnóstico sintético e o plano recomendado para{' '}
                    <span className="italic text-[#A6DEFF]">{businessName}</span>.
                </p>
            </div>

            {/* Featured pain card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="relative p-7 md:p-9 rounded-3xl bg-gradient-to-br from-[#4DD5FF]/18 via-[#4DD5FF]/6 to-transparent border border-[#4DD5FF]/35 mb-5 overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4DD5FF] to-transparent opacity-60"></div>
                <div className="flex items-center gap-2 mb-4">
                    <Flame size={14} className="text-[#A6DEFF]" />
                    <span className="text-[10px] text-[#4DD5FF] font-semibold tracking-[0.3em] uppercase">
                        Gargalo principal
                    </span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-[#E8F4FF] leading-tight mb-3">
                    {d.painTitle}
                </h2>
                <p className="text-[#B8CEE4] leading-relaxed text-base md:text-lg">{d.painInsight}</p>

                <div className="mt-6 pt-5 border-t border-[#4DD5FF]/25">
                    <div className="text-[10px] text-[#A6DEFF] font-semibold tracking-[0.25em] uppercase mb-1.5">
                        Onde você está hoje
                    </div>
                    <p className="text-[#7FC4FF] text-sm leading-relaxed">{d.marketingInsight}</p>
                </div>
            </motion.div>

            {/* 3-card grid: negócio / plano / momento */}
            <div className="grid md:grid-cols-3 gap-4 mb-10">
                <InsightCard
                    icon={Target}
                    label="Seu negócio"
                    title={d.modelTitle}
                    body={d.modelInsight}
                    delay={0.25}
                />
                <InsightCard
                    icon={Sparkles}
                    label="Plano recomendado"
                    title={`${d.planTitle} · ${d.planPrice}`}
                    body={d.planInsight}
                    accent
                    delay={0.32}
                />
                <InsightCard
                    icon={d.momentWarning ? AlertTriangle : CheckCircle2}
                    label="Seu momento"
                    title={d.momentTitle}
                    body={d.momentInsight}
                    warn={d.momentWarning}
                    delay={0.39}
                />
            </div>

            {/* Action plan */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.48 }}
                className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-b from-[#4DD5FF]/[0.05] to-white/[0.01] backdrop-blur-xl border border-[#4DD5FF]/15 mb-10"
            >
                <div className="text-[10px] text-[#4DD5FF] font-semibold tracking-[0.3em] uppercase mb-3">
                    Plano de ação
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-[#E8F4FF] mb-6 leading-tight">
                    O que vamos implementar com <span className="italic text-[#A6DEFF]">{businessName}</span>
                </h3>
                <ul className="space-y-3.5">
                    {d.actionPlan.map((item, i) => (
                        <li
                            key={i}
                            className="flex gap-3 items-start text-[#B8CEE4] leading-relaxed text-sm md:text-base"
                        >
                            <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-[#4DD5FF]"></span>
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
                className="relative p-8 md:p-12 rounded-3xl border border-[#4DD5FF]/35 text-center overflow-hidden"
                style={{
                    background:
                        'radial-gradient(ellipse at 50% 0%, rgba(77,213,255,0.22) 0%, transparent 60%), linear-gradient(180deg, #081828 0%, #050E1A 100%)',
                }}
            >
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#4DD5FF]/15 border border-[#4DD5FF]/40 mb-6">
                        <Clock size={12} className="text-[#A6DEFF]" />
                        <span className="text-[10px] text-[#A6DEFF] font-semibold tracking-[0.25em] uppercase">
                            Próximo passo
                        </span>
                    </div>

                    <h3 className="font-serif text-2xl md:text-4xl text-[#E8F4FF] mb-4 leading-tight max-w-2xl mx-auto">
                        Nossa equipe vai entrar em contato{' '}
                        <span className="italic text-[#A6DEFF]">em alguns minutos.</span>
                    </h3>

                    <p className="text-[#B8CEE4] leading-relaxed max-w-xl mx-auto mb-2 text-base md:text-lg">
                        Vamos conversar sobre o plano recomendado e{' '}
                        <span className="text-[#E8F4FF] font-medium">implementar, junto com você</span>, as
                        melhorias do seu diagnóstico.
                    </p>
                    <p className="text-[#7FC4FF] leading-relaxed max-w-xl mx-auto mb-8 text-sm">
                        Chamamos pelo WhatsApp que você cadastrou — normalmente em até 2 horas em horário comercial.
                    </p>

                    <div className="flex flex-col items-center gap-4">
                        <OceanButton size="lg" onClick={openWhatsApp}>
                            <MessageCircle size={18} />
                            Agilizar meu atendimento no WhatsApp
                        </OceanButton>
                        <p className="text-xs text-[#6B86A3] tracking-wide max-w-md">
                            Se preferir não esperar, chame a gente agora — atendimento prioritário pra leads que
                            vieram pelo diagnóstico.
                        </p>
                    </div>
                </div>
            </motion.div>

            <p className="mt-8 text-center text-[11px] text-[#6B86A3] tracking-wider">
                Máximo 4 novos clientes por mês &middot; atenção direta da equipe ER
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
                ? 'border-[#4DD5FF]/50 bg-gradient-to-b from-[#4DD5FF]/12 to-[#4DD5FF]/5'
                : accent
                ? 'border-[#4DD5FF]/30 bg-gradient-to-b from-[#4DD5FF]/10 to-white/[0.02]'
                : 'border-[#4DD5FF]/15 bg-gradient-to-b from-[#4DD5FF]/[0.05] to-white/[0.01]'
        }`}
    >
        <div className="flex items-center gap-2 mb-3">
            <Icon size={14} className={warn ? 'text-[#C0EAFF]' : accent ? 'text-[#A6DEFF]' : 'text-[#4DD5FF]'} />
            <span className="text-[10px] text-[#4DD5FF] font-semibold tracking-[0.3em] uppercase">{label}</span>
        </div>
        <div className="font-serif text-lg md:text-xl text-[#E8F4FF] leading-tight mb-2">{title}</div>
        <p className="text-[#B8CEE4] text-sm leading-relaxed">{body}</p>
    </motion.div>
);
