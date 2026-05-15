import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Hero } from './Hero';
import { Authority } from './Authority';
import { ClientLogos } from './ClientLogos';
import { Diagnosis } from './Diagnosis';
import { Ecosystem } from './Ecosystem';
import { Partners } from './Partners';
import { FeaturedCases } from './FeaturedCases';
import { ReelsShowcase } from './ReelsShowcase';
import { ClientResults } from './ClientResults';
import { FAQ } from './FAQ';
import { Qualification } from './Qualification';
import { Footer } from './Footer';
import { FloatingWhatsApp } from './FloatingWhatsApp';

export const MainLanding: React.FC = () => {
    const navigate = useNavigate();

    const handleAuditClick = () => {
        navigate('/auditoria-de-lucro-invisivel');
    };

    return (
        <div className="min-h-screen bg-er-black text-white font-sans selection:bg-er-red selection:text-white">
            <Header onAuditClick={handleAuditClick} />

            <main>
                <Hero onAuditClick={handleAuditClick} />
                <Authority onAuditClick={handleAuditClick} />
                <ClientLogos />
                <Diagnosis onAuditClick={handleAuditClick} />
                <Ecosystem onAuditClick={handleAuditClick} />
                <Partners onAuditClick={handleAuditClick} />
                <FeaturedCases onAuditClick={handleAuditClick} />
                <ReelsShowcase />
                <ClientResults onAuditClick={handleAuditClick} />
                <FAQ onAuditClick={handleAuditClick} />
                <Qualification onAuditClick={handleAuditClick} />
            </main>

            <Footer />
            <FloatingWhatsApp />
        </div>
    );
};
