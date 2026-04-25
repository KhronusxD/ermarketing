import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Route-level code splitting. Each LP becomes its own chunk so a first-time
// visitor only downloads the code for the LP they actually opened, not every
// landing page bundled into one giant JS file. This is the single biggest win
// for FCP/LCP on LPs like /restaurantes-manaus.
const MainLanding = lazy(() =>
    import('./components/MainLanding').then((m) => ({ default: m.MainLanding })),
);
const QuizFlow = lazy(() => import('./components/Quiz/QuizFlow'));
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
const RestaurantesManausLanding = lazy(() =>
    import('./components/RestaurantesManaus/Landing').then((m) => ({
        default: m.RestaurantesManausLanding,
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

// Minimal fallback — solid dark panel that matches the shell background so
// users don't see a white flash while the chunk arrives.
const RouteFallback: React.FC = () => (
    <div
        style={{ minHeight: '100vh', backgroundColor: '#050505' }}
        aria-hidden="true"
    />
);

const App: React.FC = () => {
    return (
        <Router>
            <Suspense fallback={<RouteFallback />}>
                <Routes>
                    <Route path="/" element={<MainLanding />} />
                    <Route path="/auditoria-de-lucro-invisivel" element={<QuizFlow />} />
                    <Route path="/restaurante" element={<RestaurantLanding />} />
                    <Route path="/restaurante-b" element={<RestaurantBLanding />} />
                    <Route path="/restaurantes-manaus" element={<RestaurantesManausLanding />} />
                    <Route path="/diagnostico-manaus" element={<DiagnosticoFlow />} />
                    <Route path="/auditoria-restaurante" element={<RestaurantQuizFlow />} />
                    <Route path="/flowdesk" element={<Flowdesk />} />
                    <Route path="/diagnostico-flowdesk" element={<FlowdeskDiagnostico />} />
                    <Route path="/lp-psicologia" element={<Candeia />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;
