import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../Header';
import { RestaurantHero } from './RestaurantHero';
import { RestaurantPain } from './RestaurantPain';
import { RestaurantStory } from './RestaurantStory';
import { RestaurantCaseStudies } from './RestaurantCaseStudies';
import { RestaurantOffer } from './RestaurantOffer';
import { RestaurantObjections } from './RestaurantObjections';
import { RestaurantUrgency } from './RestaurantUrgency';
import { RestaurantQuizTransition } from './RestaurantQuizTransition';
import { Footer } from '../Footer';
import { BackgroundParticles } from '../BackgroundParticles';
import { FloatingWhatsApp } from '../FloatingWhatsApp';

export const RestaurantLanding: React.FC = () => {
    const navigate = useNavigate();

    const handleAuditClick = () => {
        navigate('/auditoria-restaurante');
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-orange-600 selection:text-white relative">
            <BackgroundParticles />

            <Header onAuditClick={handleAuditClick} />

            <main className="relative z-10">
                <RestaurantHero onAuditClick={handleAuditClick} />
                <RestaurantPain onAuditClick={handleAuditClick} />
                <RestaurantStory onAuditClick={handleAuditClick} />
                <RestaurantCaseStudies onAuditClick={handleAuditClick} />
                <RestaurantOffer onAuditClick={handleAuditClick} />
                <RestaurantObjections onAuditClick={handleAuditClick} />
                <RestaurantUrgency onAuditClick={handleAuditClick} />
                <RestaurantQuizTransition onAuditClick={handleAuditClick} />
            </main>

            <Footer />
            <FloatingWhatsApp />
        </div>
    );
};
