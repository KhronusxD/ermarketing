import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// ──────────────────────────────────────────────────────────────────────
// Eager-imported routes — these are pre-rendered to static HTML at build
// time (see scripts/prerender.tsx). The cost of bundling them into the
// entry is paid back by skipping the lazy roundtrip at LCP, AND by
// giving Google/AI crawlers full HTML on first byte (huge SEO win).
// Add a new route to the eager list every time you add it to ROUTES in
// the prerender script.
// ──────────────────────────────────────────────────────────────────────
import { MainLanding } from './components/MainLanding';
import QuizFlow from './components/Quiz/QuizFlow';
import { RestaurantesManausLanding } from './components/RestaurantesManaus/Landing';
import BlogIndex from './components/Blog/Index';
import BlogPost from './components/Blog/Post';
import Sobre from './components/About/Sobre';
import AuthorPage from './components/About/AuthorPage';
import MetaAppIndex from './components/MetaApp/Index';
import MetaAppPrivacy from './components/MetaApp/Privacy';
import MetaAppTerms from './components/MetaApp/Terms';
import LinksPage from './components/Links';
import LabPerformance from './components/LabPerformance';
import EdRodriguesCapture from './components/EdRodriguesCapture';
import NorteLanding from './components/NorteLanding';
import NorteServicePage from './components/Norte/ServicePage';
import Conversa from './components/Norte/Conversa';
import Agendar from './components/Norte/Agendar';
import NotFound from './components/NotFound';

// Lazy routes — code-split so a first-time visitor only downloads what
// they need. These pages aren't pre-rendered (low-traffic or interactive).
const RestaurantLanding = lazy(() =>
    import('./components/Restaurant/RestaurantLanding').then((m) => ({
        default: m.RestaurantLanding,
    })),
);
const RestaurantBLanding = lazy(() =>
    import('./components/RestaurantB/RestaurantBLanding').then((m) => ({
        default: m.RestaurantBLanding,
    })),
);
const DiagnosticoFlow = lazy(() =>
    import('./components/RestaurantesManaus/Quiz/DiagnosticoFlow').then((m) => ({
        default: m.DiagnosticoFlow,
    })),
);
const RestaurantQuizFlow = lazy(() => import('./components/Restaurant/RestaurantQuizFlow'));
const Flowdesk = lazy(() =>
    import('./components/Flowdesk/Flowdesk').then((m) => ({ default: m.Flowdesk })),
);
const FlowdeskDiagnostico = lazy(() =>
    import('./components/Flowdesk/Quiz/DiagnosticoFlow').then((m) => ({
        default: m.DiagnosticoFlow,
    })),
);
const Candeia = lazy(() =>
    import('./components/Candeia/Candeia').then((m) => ({ default: m.Candeia })),
);
const Privacy = lazy(() =>
    import('./components/Legal/Privacy').then((m) => ({ default: m.Privacy })),
);
const Terms = lazy(() =>
    import('./components/Legal/Terms').then((m) => ({ default: m.Terms })),
);

// Minimal fallback — solid dark panel that matches the shell background so
// users don't see a white flash while the chunk arrives.
const RouteFallback: React.FC = () => (
    <div
        style={{ minHeight: '100vh', backgroundColor: '#050505' }}
        aria-hidden="true"
    />
);

// Router lives in the entry (index.tsx for browser, prerender.tsx for build),
// so the same App tree can be rendered with BrowserRouter or StaticRouter.
const App: React.FC = () => {
    return (
        <Suspense fallback={<RouteFallback />}>
            <Routes>
                {/* Pre-rendered (eager) */}
                {/* A home é a Norte desde o rebrand. A LP anterior da ER
                    Marketing continua servida em /er-marketing, e /norte
                    segue de pé pra não quebrar link já divulgado — o
                    canonical dela aponta pra raiz. */}
                <Route path="/" element={<NorteLanding />} />
                <Route path="/er-marketing" element={<MainLanding />} />
                <Route path="/auditoria-de-lucro-invisivel" element={<QuizFlow />} />
                <Route path="/restaurantes-manaus" element={<RestaurantesManausLanding />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/sobre/ed-rodrigues" element={<AuthorPage />} />
                <Route path="/blog" element={<BlogIndex />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/meta-app" element={<MetaAppIndex />} />
                <Route path="/meta-app/privacidade" element={<MetaAppPrivacy />} />
                <Route path="/meta-app/termos" element={<MetaAppTerms />} />
                <Route path="/links" element={<LinksPage />} />
                <Route path="/lab-de-performance" element={<LabPerformance />} />
                <Route path="/edrodrigues" element={<EdRodriguesCapture />} />
                <Route path="/norte" element={<NorteLanding />} />
                <Route path="/norte/:slug" element={<NorteServicePage />} />
                <Route path="/conversa" element={<Conversa />} />
                <Route path="/agendar" element={<Agendar />} />

                {/* Lazy */}
                <Route path="/restaurante" element={<RestaurantLanding />} />
                <Route path="/restaurante-b" element={<RestaurantBLanding />} />
                <Route path="/diagnostico-manaus" element={<DiagnosticoFlow />} />
                <Route path="/auditoria-restaurante" element={<RestaurantQuizFlow />} />
                <Route path="/flowdesk" element={<Flowdesk />} />
                <Route path="/diagnostico-flowdesk" element={<FlowdeskDiagnostico />} />
                <Route path="/lp-psicologia" element={<Candeia />} />
                <Route path="/politica-de-privacidade" element={<Privacy />} />
                <Route path="/termos-de-uso" element={<Terms />} />

                {/* 404 catch-all — last route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default App;
