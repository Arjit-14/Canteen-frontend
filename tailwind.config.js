/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Stranger Things Red - Blood/Demogorgon
                primary: {
                    50: '#fef2f2',
                    100: '#fee2e2',
                    200: '#fecaca',
                    300: '#fca5a5',
                    400: '#f87171',
                    500: '#ef4444',
                    600: '#dc2626',
                    700: '#b91c1c',
                    800: '#991b1b',
                    900: '#7f1d1d',
                },
                // Neon/Electric accents
                neon: {
                    pink: '#ff1744',
                    blue: '#00d4ff',
                    purple: '#b388ff',
                    yellow: '#ffea00',
                },
                // Upside Down dark palette
                dark: {
                    50: '#262626',
                    100: '#1f1f1f',
                    200: '#1a1a1a',
                    300: '#171717',
                    400: '#141414',
                    500: '#0f0f0f',
                    600: '#0c0c0c',
                    700: '#0a0a0a',
                    800: '#080808',
                    900: '#050505',
                    950: '#000000',
                },
                // Keep secondary for success states
                secondary: {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    200: '#bbf7d0',
                    300: '#86efac',
                    400: '#4ade80',
                    500: '#22c55e',
                    600: '#16a34a',
                    700: '#15803d',
                    800: '#166534',
                    900: '#14532d',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                stranger: ['Bebas Neue', 'Impact', 'sans-serif'],
                retro: ['Righteous', 'cursive'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'bounce-slow': 'bounce 2s infinite',
                'slide-in': 'slideIn 0.3s ease-out',
                'fade-in': 'fadeIn 0.3s ease-out',
                'flicker': 'flicker 2s linear infinite',
                'glow-pulse': 'glowPulse 2s ease-in-out infinite',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                slideIn: {
                    '0%': { transform: 'translateY(-10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                flicker: {
                    '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: '1' },
                    '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: '0.4' },
                },
                glowPulse: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(220, 38, 38, 0.5), 0 0 40px rgba(220, 38, 38, 0.3)' },
                    '50%': { boxShadow: '0 0 30px rgba(220, 38, 38, 0.8), 0 0 60px rgba(220, 38, 38, 0.5)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
            boxShadow: {
                'neon-red': '0 0 20px rgba(220, 38, 38, 0.5), 0 0 40px rgba(220, 38, 38, 0.3)',
                'neon-pink': '0 0 20px rgba(255, 23, 68, 0.5), 0 0 40px rgba(255, 23, 68, 0.3)',
                'neon-blue': '0 0 20px rgba(0, 212, 255, 0.5), 0 0 40px rgba(0, 212, 255, 0.3)',
            },
        },
    },
    plugins: [],
}
