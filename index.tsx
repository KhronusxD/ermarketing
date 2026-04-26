import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error('Could not find root element to mount to');
}

const tree = (
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

// If the build script pre-rendered this route into static markup, hydrate
// it (React reuses the existing DOM, so the LCP element painted by the HTML
// parser stays put). Otherwise this is a route the build did not pre-render
// — fall back to a plain createRoot mount.
if (rootElement.firstElementChild) {
    hydrateRoot(rootElement, tree);
} else {
    createRoot(rootElement).render(tree);
}
