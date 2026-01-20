import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../Header';
import { RestaurantHero } from './RestaurantHero';
import { RestaurantAuthority } from './RestaurantAuthority';
import { RestaurantCaseStudies } from './RestaurantCaseStudies';
import { RestaurantTestimonials } from './RestaurantTestimonials';
import { RestaurantQualification } from './RestaurantQualification';
import { Diagnosis } from '../Diagnosis'; // Generic enough
import { Ecosystem } from '../Ecosystem'; // Generic enough
import { FAQ } from '../FAQ'; // Generic enough
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
                <RestaurantAuthority onAuditClick={handleAuditClick} />
                <RestaurantCaseStudies onAuditClick={handleAuditClick} />
                <RestaurantTestimonials onAuditClick={handleAuditClick} />
                <Ecosystem onAuditClick={handleAuditClick} />
                <Diagnosis onAuditClick={handleAuditClick} />
                <FAQ onAuditClick={handleAuditClick} />
                <RestaurantQualification onAuditClick={handleAuditClick} />
            </main>

            <Footer />
            <FloatingWhatsApp />
        </div>
    );
};
