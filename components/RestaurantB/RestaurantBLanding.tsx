import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RestaurantBHeader } from './RestaurantBHeader';
import { RestaurantBHero } from './RestaurantBHero';
import { RestaurantBPain } from './RestaurantBPain';
import { RestaurantBStory } from './RestaurantBStory';
import { RestaurantBCaseStudies } from './RestaurantBCaseStudies';
import { RestaurantBOffer } from './RestaurantBOffer';
import { RestaurantBObjections } from './RestaurantBObjections';
import { RestaurantBUrgency } from './RestaurantBUrgency';
import { RestaurantBQuizTransition } from './RestaurantBQuizTransition';
import { RestaurantBFooter } from './RestaurantBFooter';
import { FloatingWhatsApp } from '../FloatingWhatsApp';

export const RestaurantBLanding: React.FC = () => {
    const navigate = useNavigate();

    const handleAuditClick = () => {
        navigate('/auditoria-restaurante');
    };

    return (
        <div className="min-h-screen bg-[#FFFDF8] text-[#3D2B1F] font-sans selection:bg-[#D4660A] selection:text-white relative">
            <RestaurantBHeader onAuditClick={handleAuditClick} />

            <main>
                <RestaurantBHero onAuditClick={handleAuditClick} />
                <RestaurantBPain onAuditClick={handleAuditClick} />
                <RestaurantBStory onAuditClick={handleAuditClick} />
                <RestaurantBCaseStudies onAuditClick={handleAuditClick} />
                <RestaurantBOffer onAuditClick={handleAuditClick} />
                <RestaurantBObjections onAuditClick={handleAuditClick} />
                <RestaurantBUrgency onAuditClick={handleAuditClick} />
                <RestaurantBQuizTransition onAuditClick={handleAuditClick} />
            </main>

            <RestaurantBFooter />
            <FloatingWhatsApp />
        </div>
    );
};
