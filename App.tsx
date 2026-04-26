import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// /restaurantes-manaus is the single most-visited LP and is pre-rendered as
// static HTML at build time (see scripts/prerender.tsx). For hydration to
// reuse that DOM the route component has to render eagerly on both server
// and client — so this one is a static import. The ~11 KiB it adds to the
// entry chunk is paid back many times over by skipping the lazy round-trip
// at LCP time.
import { RestaurantesManausLanding } from './components/RestaurantesManaus/Landing';

// Every other LP stays code-split so a first-time visitor only downloads
// what they need.
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

// Router lives in the entry (index.tsx for browser, prerender.tsx for build),
// so the same App tree can be rendered with BrowserRouter or StaticRouter.
const App: React.FC = () => {
    return (
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
    );
};

export default App;
