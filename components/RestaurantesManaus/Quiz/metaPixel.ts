// Thin wrapper around the Meta Pixel global `fbq`, safe for SSR/tests.
// The base pixel (init + PageView) is loaded inline in index.html.

type FbqParams = Record<string, string | number | boolean | null | undefined>;

declare global {
    interface Window {
        fbq?: (action: 'track' | 'trackCustom', event: string, params?: FbqParams) => void;
    }
}

const isReady = () => typeof window !== 'undefined' && typeof window.fbq === 'function';

export function trackStandard(event: string, params?: FbqParams) {
    if (!isReady()) return;
    try {
        window.fbq!('track', event, params);
    } catch { /* noop */ }
}

export function trackCustom(event: string, params?: FbqParams) {
    if (!isReady()) return;
    try {
        window.fbq!('trackCustom', event, params);
    } catch { /* noop */ }
}
