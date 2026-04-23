import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Lock, Loader2 } from 'lucide-react';

// ————————————————————————————————————————————————————————————————
// Shared Google Apps Script endpoint (same one the quiz forms use)
// ————————————————————————————————————————————————————————————————
const SHEETS_ENDPOINT =
    'https://script.google.com/macros/s/AKfycbzQvWOnzZHhHIp-kfryN1vDDvLlMDcqoc2I6GOddthjRYYpaTw2RwfdD02WhwXXL7Wj/exec';

export interface PopupFormFields {
    name: string;
    whatsapp: string;
    business: string;
    instagram: string;
}

export type PopupTheme = 'gold' | 'ocean' | 'sage';

interface ThemeTokens {
    surface: string;
    border: string;
    accent: string;
    accentSoft: string;
    text: string;
    textSoft: string;
    textMute: string;
    label: string;
    inputBg: string;
    inputBorder: string;
    inputFocusBorder: string;
    submitBg: string;
    submitText: string;
    submitHoverBg: string;
    closeColor: string;
}

const THEMES: Record<PopupTheme, ThemeTokens> = {
    gold: {
        surface: '#1a1510',
        border: 'rgba(212,165,116,0.35)',
        accent: '#D4A574',
        accentSoft: '#E8C088',
        text: '#F5F1E8',
        textSoft: '#C7BFB1',
        textMute: '#A8A196',
        label: '#D4A574',
        inputBg: 'rgba(255,255,255,0.04)',
        inputBorder: 'rgba(255,255,255,0.1)',
        inputFocusBorder: 'rgba(212,165,116,0.7)',
        submitBg: 'linear-gradient(90deg, #B8875B 0%, #D4A574 50%, #E8C088 100%)',
        submitText: '#1A1208',
        submitHoverBg: 'linear-gradient(90deg, #D4A574 0%, #E8C088 50%, #F5D89F 100%)',
        closeColor: '#C7BFB1',
    },
    ocean: {
        surface: '#08182E',
        border: 'rgba(77,213,255,0.35)',
        accent: '#4DD5FF',
        accentSoft: '#A6DEFF',
        text: '#E8F4FF',
        textSoft: '#B8CEE4',
        textMute: '#6B86A3',
        label: '#4DD5FF',
        inputBg: 'rgba(77,213,255,0.06)',
        inputBorder: 'rgba(77,213,255,0.18)',
        inputFocusBorder: 'rgba(77,213,255,0.7)',
        submitBg: 'linear-gradient(90deg, #2BA8D4 0%, #4DD5FF 50%, #A6DEFF 100%)',
        submitText: '#031224',
        submitHoverBg: 'linear-gradient(90deg, #4DD5FF 0%, #A6DEFF 50%, #C6EDFF 100%)',
        closeColor: '#B8CEE4',
    },
    sage: {
        surface: '#F0ECE3',
        border: 'rgba(31,31,31,0.15)',
        accent: '#C89968',
        accentSoft: '#A77A4B',
        text: '#1F1F1F',
        textSoft: '#3B4236',
        textMute: '#6F7A66',
        label: '#A77A4B',
        inputBg: '#FFFFFF',
        inputBorder: 'rgba(31,31,31,0.12)',
        inputFocusBorder: 'rgba(200,153,104,0.7)',
        submitBg: '#1F1F1F',
        submitText: '#F0ECE3',
        submitHoverBg: '#2E2E2E',
        closeColor: '#3B4236',
    },
};

interface LeadCapturePopupProps {
    open: boolean;
    onClose: () => void;
    theme: PopupTheme;
    title: string;
    subtitle: string;
    businessLabel: string;
    businessPlaceholder: string;
    whatsappUrl: string;
    leadContentName: string;
    leadContentCategory: string;
    storageKey: string;
}

export const LeadCapturePopup: React.FC<LeadCapturePopupProps> = ({
    open,
    onClose,
    theme,
    title,
    subtitle,
    businessLabel,
    businessPlaceholder,
    whatsappUrl,
    leadContentName,
    leadContentCategory,
    storageKey,
}) => {
    const t = THEMES[theme];
    const [fields, setFields] = useState<PopupFormFields>({
        name: '',
        whatsapp: '',
        business: '',
        instagram: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [focused, setFocused] = useState<string | null>(null);

    // Lock body scroll while popup is open
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    // Reset form when popup closes
    useEffect(() => {
        if (!open) setFields({ name: '', whatsapp: '', business: '', instagram: '' });
    }, [open]);

    // ESC to close
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    const update = (key: keyof PopupFormFields) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setFields((f) => ({ ...f, [key]: e.target.value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (submitting) return;
        setSubmitting(true);

        const submittedAt = new Date().toISOString();

        // 1) Persist locally
        try {
            localStorage.setItem(
                storageKey,
                JSON.stringify({ ...fields, submittedAt })
            );
        } catch { /* ignore */ }

        // 2) Send to the shared Google Sheet (fire-and-forget, keepalive so it survives navigation)
        try {
            fetch(SHEETS_ENDPOINT, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({
                    name: fields.name,
                    whatsapp: fields.whatsapp,
                    // map to the existing sheet column name
                    restaurant: fields.business,
                    instagram: fields.instagram,
                    answers: [],
                    submittedAt,
                    page: typeof window !== 'undefined' ? window.location.href : '',
                    referrer: typeof document !== 'undefined' ? document.referrer : '',
                }),
                keepalive: true,
            }).catch(() => undefined);
        } catch { /* ignore */ }

        // 3) Fire Meta Pixel Lead event — this is now the conversion point
        try {
            (window as unknown as {
                fbq?: (action: string, event: string, params?: Record<string, unknown>) => void;
            }).fbq?.('track', 'Lead', {
                content_name: leadContentName,
                content_category: leadContentCategory,
                value: 1,
                currency: 'BRL',
            });
        } catch { /* ignore */ }

        // 4) Redirect to WhatsApp in a new tab
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

        // 5) Close popup shortly after so user sees the transition
        window.setTimeout(() => {
            setSubmitting(false);
            onClose();
        }, 400);
    };

    const inputStyle = (name: string): React.CSSProperties => ({
        width: '100%',
        padding: '14px 16px',
        borderRadius: 14,
        backgroundColor: t.inputBg,
        color: t.text,
        border: `1px solid ${focused === name ? t.inputFocusBorder : t.inputBorder}`,
        outline: 'none',
        fontSize: 15,
        transition: 'border-color 200ms ease, background-color 200ms ease',
    });

    const labelStyle: React.CSSProperties = {
        display: 'block',
        marginBottom: 6,
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: t.label,
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        className="fixed inset-0 z-[100]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={onClose}
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.65)',
                            backdropFilter: 'blur(6px)',
                            WebkitBackdropFilter: 'blur(6px)',
                        }}
                    />
                    <div
                        role="dialog"
                        aria-modal="true"
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none overflow-y-auto"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.94, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.94, y: 20 }}
                            transition={{ duration: 0.28, ease: 'easeOut' }}
                            className="pointer-events-auto w-full max-w-md rounded-3xl p-6 md:p-8 shadow-2xl relative my-8"
                            style={{
                                backgroundColor: t.surface,
                                border: `1px solid ${t.border}`,
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close */}
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Fechar"
                                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                                style={{
                                    color: t.closeColor,
                                    backgroundColor: 'transparent',
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                                        theme === 'sage' ? 'rgba(31,31,31,0.06)' : 'rgba(255,255,255,0.08)';
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                                }}
                            >
                                <X size={18} />
                            </button>

                            {/* Accent tag */}
                            <div
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
                                style={{
                                    border: `1px solid ${t.border}`,
                                    color: t.accent,
                                    fontSize: 10,
                                    fontWeight: 600,
                                    letterSpacing: '0.25em',
                                    textTransform: 'uppercase',
                                }}
                            >
                                <span
                                    style={{
                                        width: 6,
                                        height: 6,
                                        borderRadius: '50%',
                                        backgroundColor: t.accent,
                                    }}
                                />
                                Falar com a equipe
                            </div>

                            {/* Heading */}
                            <h3
                                className="font-serif leading-tight mb-2"
                                style={{
                                    color: t.text,
                                    fontSize: 'clamp(1.5rem, 4vw, 1.875rem)',
                                }}
                            >
                                {title}
                            </h3>
                            <p
                                className="text-sm leading-relaxed mb-6"
                                style={{ color: t.textSoft }}
                            >
                                {subtitle}
                            </p>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label style={labelStyle}>Nome e sobrenome</label>
                                    <input
                                        type="text"
                                        required
                                        value={fields.name}
                                        onChange={update('name')}
                                        onFocus={() => setFocused('name')}
                                        onBlur={() => setFocused(null)}
                                        placeholder="Ex: João Silva"
                                        style={inputStyle('name')}
                                    />
                                </div>

                                <div>
                                    <label style={labelStyle}>WhatsApp</label>
                                    <input
                                        type="tel"
                                        required
                                        value={fields.whatsapp}
                                        onChange={update('whatsapp')}
                                        onFocus={() => setFocused('whatsapp')}
                                        onBlur={() => setFocused(null)}
                                        placeholder="(00) 00000-0000"
                                        style={inputStyle('whatsapp')}
                                    />
                                </div>

                                <div>
                                    <label style={labelStyle}>{businessLabel}</label>
                                    <input
                                        type="text"
                                        required
                                        value={fields.business}
                                        onChange={update('business')}
                                        onFocus={() => setFocused('business')}
                                        onBlur={() => setFocused(null)}
                                        placeholder={businessPlaceholder}
                                        style={inputStyle('business')}
                                    />
                                </div>

                                <div>
                                    <label style={labelStyle}>Instagram (se tiver)</label>
                                    <input
                                        type="text"
                                        value={fields.instagram}
                                        onChange={update('instagram')}
                                        onFocus={() => setFocused('instagram')}
                                        onBlur={() => setFocused(null)}
                                        placeholder="@seunegocio"
                                        style={inputStyle('instagram')}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold tracking-wide transition-all duration-300 hover:-translate-y-[1px] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                                    style={{
                                        background: t.submitBg,
                                        color: t.submitText,
                                        fontSize: 15,
                                    }}
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            Abrindo WhatsApp...
                                        </>
                                    ) : (
                                        <>
                                            Continuar no WhatsApp
                                            <ArrowRight size={16} />
                                        </>
                                    )}
                                </button>
                            </form>

                            <p
                                className="inline-flex items-center gap-1.5 mt-4 text-[11px] tracking-wide"
                                style={{ color: t.textMute }}
                            >
                                <Lock size={11} style={{ color: t.accent }} />
                                Seus dados estão protegidos e não enviamos spam.
                            </p>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};
