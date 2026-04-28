import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Hero } from './Hero';
import { Footer } from './Footer';

// Below-the-fold sections AND FloatingWhatsApp are split out so framer-motion
// (134 KiB) and the section bodies don't compete with the Hero LCP.
//
// IMPORTANT: rendering these via Suspense fires the dynamic import the moment
// React reaches it during the initial render. That defeats the point —
// framer-motion shows up in the LCP critical path on Lighthouse Lantern. We
// gate the render on a useEffect/idle callback so the chunks only start
// fetching after the Hero has painted.
const BelowFold = lazy(() => import('./BelowFold'));
const FloatingWhatsApp = lazy(() =>
    import('../FloatingWhatsApp').then((m) => ({ default: m.FloatingWhatsApp })),
);

export const RestaurantesManausLanding: React.FC = () => {
    const navigate = useNavigate();
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

    // Audit CTAs route to the existing diagnostic quiz. The Meta Lead event
    // is fired at the end of the quiz (QuizForm submit), not here, so the
    // conversion only counts when the lead actually completes the form.
    const handleAuditClick = () => navigate('/diagnostico-manaus');

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

            {/* FloatingWhatsApp is gated behind the same idle/scroll trigger
                as BelowFold so framer-motion doesn't sneak into the LCP
                critical chain. No onOverrideClick — the floater opens the
                default WhatsApp link directly. */}
            {showBelowFold && (
                <Suspense fallback={null}>
                    <FloatingWhatsApp />
                </Suspense>
            )}
        </div>
    );
};
