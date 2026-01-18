import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Hero } from './Hero';
import { Diagnosis } from './Diagnosis';
import { Ecosystem } from './Ecosystem';
import { CaseStudies } from './CaseStudies';
import { Authority } from './Authority';
import { Testimonials } from './Testimonials';
import { FAQ } from './FAQ';
import { Qualification } from './Qualification';
import { Footer } from './Footer';
import { BackgroundParticles } from './BackgroundParticles';
import { FloatingWhatsApp } from './FloatingWhatsApp';

export const MainLanding: React.FC = () => {
    const navigate = useNavigate();

    const handleAuditClick = () => {
        navigate('/auditoria-de-lucro-invisivel');
    };

    return (
        <div className="min-h-screen bg-er-black text-white font-sans selection:bg-er-red selection:text-white relative">
            <BackgroundParticles />

            <Header onAuditClick={handleAuditClick} />

            <main className="relative z-10">
                <Hero onAuditClick={handleAuditClick} />
                <Authority onAuditClick={handleAuditClick} />
                <CaseStudies onAuditClick={handleAuditClick} />
                <Testimonials onAuditClick={handleAuditClick} />
                <Ecosystem onAuditClick={handleAuditClick} />
                <Diagnosis onAuditClick={handleAuditClick} />
                <FAQ onAuditClick={handleAuditClick} />
                <Qualification onAuditClick={handleAuditClick} />
            </main>

            <Footer />
            <FloatingWhatsApp />
        </div>
    );
};
