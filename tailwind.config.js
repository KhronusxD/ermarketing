/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './index.html',
        './App.tsx',
        './index.tsx',
        './types.ts',
        './components/**/*.{ts,tsx,js,jsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['"Playfair Display"', 'serif'],
            },
            colors: {
                er: {
                    black: '#050505',
                    red: '#E60000',
                    redHover: '#cc0000',
                    gray: '#1A1A1A',
                },
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                glow: 'glow 2s ease-in-out infinite alternate',
                'gradient-shift': 'gradient-shift 4s ease infinite',
                'gradient-loop': 'gradient-loop 3.5s linear infinite',
                shimmer: 'shimmer 3s linear infinite',
                'float-slow': 'float-slow 6s ease-in-out infinite',
                marquee: 'marquee 50s linear infinite',
                'marquee-reverse': 'marquee-reverse 60s linear infinite',
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 5px #E60000, 0 0 10px #E60000' },
                    '100%': { boxShadow: '0 0 20px #E60000, 0 0 30px #E60000' },
                },
                'gradient-shift': {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                'gradient-loop': {
                    '0%': { backgroundPosition: '200% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                'float-slow': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-12px)' },
                },
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                'marquee-reverse': {
                    '0%': { transform: 'translateX(-50%)' },
                    '100%': { transform: 'translateX(0)' },
                },
            },
        },
    },
    plugins: [],
};
