import React from 'react';
import { Header } from './Header';
import { Hero } from './Hero';
import { Gallery } from './Gallery';
import { Pain } from './Pain';
import { Why } from './Why';
import { Story } from './Story';
import { Cases } from './Cases';
import { Offer } from './Offer';
import { Objections } from './Objections';
import { Urgency } from './Urgency';
import { QuizCTA } from './QuizCTA';
import { Footer } from './Footer';
import { FloatingWhatsApp } from '../FloatingWhatsApp';
import { trackStandard } from './Quiz/metaPixel';

const RESTAURANT_WHATSAPP =
    'https://wa.me/5592985146299?text=Ol%C3%A1%21%20Vim%20da%20p%C3%A1gina%20da%20ER%20Marketing%20para%20restaurantes.%20Quero%20saber%20como%20voc%C3%AAs%20podem%20lotar%20o%20meu%20sal%C3%A3o%20com%20mais%20clientes.';

export const RestaurantesManausLanding: React.FC = () => {
    const handleAuditClick = () => {
        trackStandard('Lead', {
            content_name: 'Restaurantes Manaus · WhatsApp CTA',
            content_category: 'restaurantes',
            value: 1,
            currency: 'BRL',
        });
        window.open(RESTAURANT_WHATSAPP, '_blank', 'noopener,noreferrer');
    };

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
                <Gallery withHeader />
                <Pain onAuditClick={handleAuditClick} />
                <Why onAuditClick={handleAuditClick} />
                <Story onAuditClick={handleAuditClick} />
                <Cases onAuditClick={handleAuditClick} />
                <Offer onAuditClick={handleAuditClick} />
                <Objections onAuditClick={handleAuditClick} />
                <Urgency onAuditClick={handleAuditClick} />
                <QuizCTA onAuditClick={handleAuditClick} />
                <Gallery reverse speed="slow" />
            </main>

            <Footer />
            <FloatingWhatsApp
                onBeforeOpen={() =>
                    trackStandard('Lead', {
                        content_name: 'Restaurantes Manaus · WhatsApp Flutuante',
                        content_category: 'restaurantes',
                        value: 1,
                        currency: 'BRL',
                    })
                }
            />
        </div>
    );
};
