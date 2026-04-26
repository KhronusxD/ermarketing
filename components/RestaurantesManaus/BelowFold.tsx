import React from 'react';
import { Gallery } from './Gallery';
import { Pain } from './Pain';
import { Why } from './Why';
import { Story } from './Story';
import { Cases } from './Cases';
import { Offer } from './Offer';
import { Objections } from './Objections';
import { Urgency } from './Urgency';
import { QuizCTA } from './QuizCTA';
import { SectionProps } from '../../types';

// Bundles every section that lives below the Hero on /restaurantes-manaus into
// a single lazy chunk. This pulls framer-motion (and the section bodies) off
// the LCP critical path — Hero renders without waiting for them. The chunk is
// fetched as soon as the entry chunk finishes (well before the user can scroll
// far enough to need it).
const BelowFold: React.FC<SectionProps> = ({ onAuditClick }) => (
    <>
        <Gallery withHeader />
        <Pain onAuditClick={onAuditClick} />
        <Why onAuditClick={onAuditClick} />
        <Story onAuditClick={onAuditClick} />
        <Cases onAuditClick={onAuditClick} />
        <Offer onAuditClick={onAuditClick} />
        <Objections onAuditClick={onAuditClick} />
        <Urgency onAuditClick={onAuditClick} />
        <QuizCTA onAuditClick={onAuditClick} />
        <Gallery reverse speed="slow" />
    </>
);

export default BelowFold;
