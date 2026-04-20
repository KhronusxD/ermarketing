import React from 'react';
import { useNavigate } from 'react-router-dom';
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

export const RestaurantesManausLanding: React.FC = () => {
    const navigate = useNavigate();

    const handleAuditClick = () => {
        navigate('/diagnostico-manaus');
    };

    return (
        <div
            className="min-h-screen text-[#F5F1E8] font-sans selection:bg-[#D4A574] selection:text-[#0A0A0F] relative overflow-hidden"
            style={{ backgroundColor: '#0A0A0F' }}
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
            <FloatingWhatsApp />
        </div>
    );
};
