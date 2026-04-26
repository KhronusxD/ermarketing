import React, { lazy, Suspense, useState } from 'react';
import { Header } from './Header';
import { Hero } from './Hero';
import { Footer } from './Footer';
import { FloatingWhatsApp } from '../FloatingWhatsApp';
import { LeadCapturePopup } from '../LeadCapturePopup';

// Below-the-fold sections — split out so framer-motion (134 KiB) and the
// section bodies don't compete with the Hero LCP. They load on idle / when
// the user begins scrolling. Each chunk lands well before its section enters
// the viewport on a normal scroll.
const BelowFold = lazy(() => import('./BelowFold'));

const RESTAURANT_WHATSAPP =
    'https://wa.me/5592985146299?text=Ol%C3%A1%21%20Vim%20da%20p%C3%A1gina%20da%20ER%20Marketing%20para%20restaurantes.%20Quero%20saber%20como%20voc%C3%AAs%20podem%20lotar%20o%20meu%20sal%C3%A3o%20com%20mais%20clientes.';

export const RestaurantesManausLanding: React.FC = () => {
    const [popupOpen, setPopupOpen] = useState(false);

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
                <Suspense fallback={<div style={{ minHeight: '100vh' }} aria-hidden="true" />}>
                    <BelowFold onAuditClick={handleAuditClick} />
                </Suspense>
            </main>

            <Footer />
            <FloatingWhatsApp onOverrideClick={() => setPopupOpen(true)} />

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
        </div>
    );
};
