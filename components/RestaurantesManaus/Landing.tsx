import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Header } from './Header';
import { Hero } from './Hero';
import { Footer } from './Footer';

// Below-the-fold sections AND the two framer-motion-driven UI shells
// (FloatingWhatsApp, LeadCapturePopup) are split out so framer-motion (134
// KiB) and the section bodies don't compete with the Hero LCP.
//
// IMPORTANT: rendering these via Suspense fires the dynamic import the moment
// React reaches it during the initial render. That defeats the point —
// framer-motion shows up in the LCP critical path on Lighthouse Lantern. We
// gate the render on a useEffect/idle callback so the chunks only start
// fetching after the Hero has painted. FloatingWhatsApp + LeadCapturePopup
// were previously static imports — moving them out of the entry chunk
// removes framer-motion (and its lucide deps) from the LCP critical chain.
const BelowFold = lazy(() => import('./BelowFold'));
const FloatingWhatsApp = lazy(() =>
    import('../FloatingWhatsApp').then((m) => ({ default: m.FloatingWhatsApp })),
);
const LeadCapturePopup = lazy(() =>
    import('../LeadCapturePopup').then((m) => ({ default: m.LeadCapturePopup })),
);

const RESTAURANT_WHATSAPP =
    'https://wa.me/5592985146299?text=Ol%C3%A1%21%20Vim%20da%20p%C3%A1gina%20da%20ER%20Marketing%20para%20restaurantes.%20Quero%20saber%20como%20voc%C3%AAs%20podem%20lotar%20o%20meu%20sal%C3%A3o%20com%20mais%20clientes.';

export const RestaurantesManausLanding: React.FC = () => {
    const [popupOpen, setPopupOpen] = useState(false);
    const [showBelowFold, setShowBelowFold] = useState(false);

    // Defer the BelowFold chunk fetch until after Hero paints. Idle callback
    // with a short fallback timeout so the page still hydrates fully even on
    // browsers that never go idle (Safari) or if the user scrolls fast.
    useEffect(() => {
        const trigger = () => setShowBelowFold(true);
        const onScroll = () => trigger();
        window.addEventListener('scroll', onScroll, { once: true, passive: true });
        const ric = (window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback;
        const id = ric ? ric(trigger, { timeout: 1500 }) : window.setTimeout(trigger, 600);
        return () => {
            window.removeEventListener('scroll', onScroll);
            const cic = (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
            if (ric && cic) cic(id);
            else window.clearTimeout(id);
        };
    }, []);

    // WhatsApp CTAs open the lead-capture popup; Meta Lead fires on submit.
    const handleAuditClick = () => setPopupOpen(true);

    return (
        <div
            className="min-h-screen text-[#F5F1E8] font-sans selection:bg-[#D4A574] selection:text-[#111112] relative overflow-hidden"
            style={{ backgroundColor: '#111112' }}
        >
            {/* Global ambient backdrop */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div
                    className="absolute inset-0 opacity-60"
                    style={{
                        backgroundImage:
                            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(212,165,116,0.08), transparent), radial-gradient(ellipse 80% 50% at 50% 120%, rgba(212,165,116,0.06), transparent)',
                    }}
                ></div>
                {/* Noise texture */}
                <div
                    className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                    style={{
                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    }}
                ></div>
            </div>

            <Header onAuditClick={handleAuditClick} />

            <main className="relative z-10">
                <Hero onAuditClick={handleAuditClick} />
                {showBelowFold ? (
                    <Suspense fallback={<div style={{ minHeight: '100vh' }} aria-hidden="true" />}>
                        <BelowFold onAuditClick={handleAuditClick} />
                    </Suspense>
                ) : (
                    <div style={{ minHeight: '100vh' }} aria-hidden="true" />
                )}
            </main>

            <Footer />

            {/* FloatingWhatsApp + LeadCapturePopup are gated behind the same
                idle/scroll trigger as BelowFold so framer-motion doesn't sneak
                into the LCP critical chain. The popup also mounts when the
                user clicks an audit CTA so it's available even before idle. */}
            {(showBelowFold || popupOpen) && (
                <Suspense fallback={null}>
                    {showBelowFold && (
                        <FloatingWhatsApp onOverrideClick={() => setPopupOpen(true)} />
                    )}
                    <LeadCapturePopup
                        open={popupOpen}
                        onClose={() => setPopupOpen(false)}
                        theme="gold"
                        title="Falar com a equipe"
                        subtitle="Deixe seus dados e te chamamos no WhatsApp em minutos — atendimento direto da equipe."
                        businessLabel="Nome do restaurante"
                        businessPlaceholder="Ex: Taychi Sushi Bar"
                        whatsappUrl={RESTAURANT_WHATSAPP}
                        leadContentName="Restaurantes Manaus · Popup"
                        leadContentCategory="restaurantes"
                        storageKey="er-lead-restaurantes-manaus"
                    />
                </Suspense>
            )}
        </div>
    );
};
