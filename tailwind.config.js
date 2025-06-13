import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            container: {
                center: true,
                padding: '1.5rem',
                screens: {
                    '2xl': '1400px',
                },
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            colors: {
                background: 'hsl(var(--background) / <alpha-value>)',
                foreground: 'hsl(var(--foreground) / <alpha-value>)',
                card: {
                    DEFAULT: 'hsl(var(--card) / <alpha-value>)',
                    foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
                    foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
                    foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
                    foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
                    foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
                    foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
                    foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
                },
                border: 'hsl(var(--border) / <alpha-value>)',
                input: 'hsl(var(--input) / <alpha-value>)',
                ring: 'hsl(var(--ring) / <alpha-value>)',
                chart: {
                    1: 'hsl(var(--chart-1) / <alpha-value>)',
                    2: 'hsl(var(--chart-2) / <alpha-value>)',
                    3: 'hsl(var(--chart-3) / <alpha-value>)',
                    4: 'hsl(var(--chart-4) / <alpha-value>)',
                    5: 'hsl(var(--chart-5) / <alpha-value>)',
                },
                sidebar: {
                    DEFAULT: 'hsl(var(--sidebar-background) / <alpha-value>)',
                    foreground: 'hsl(var(--sidebar-foreground) / <alpha-value>)',
                    primary: 'hsl(var(--sidebar-primary) / <alpha-value>)',
                    'primary-foreground': 'hsl(var(--sidebar-primary-foreground) / <alpha-value>)',
                    accent: 'hsl(var(--sidebar-accent) / <alpha-value>)',
                    'accent-foreground': 'hsl(var(--sidebar-accent-foreground) / <alpha-value>)',
                    border: 'hsl(var(--sidebar-border) / <alpha-value>)',
                    ring: 'hsl(var(--sidebar-ring) / <alpha-value>)',
                },
            },
            keyframes: {
                shine: {
                    '0%': {backgroundPosition: '0% 50%'},
                    '100%': {backgroundPosition: '100% 50%'},
                },
                'accordion-down': {
                    from: {height: 0},
                    to: {height: 'var(--radix-accordion-content-height)'},
                },
                'accordion-up': {
                    from: {height: 'var(--radix-accordion-content-height)'},
                    to: {height: 0},
                },
                aurora: {
                    '0%': {backgroundPosition: '0% center'},
                    '100%': {backgroundPosition: '200% center'},
                },
                meteor: {
                    '0%': {
                        transform: 'translateX(0) translateY(0)',
                        opacity: '1',
                    },
                    '100%': {
                        transform: 'translateX(-500px) translateY(500px)',
                        opacity: '0',
                    },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                shine: 'shine var(--duration, 3s) linear infinite',
                aurora: 'aurora 5s linear infinite',
                meteor: 'meteor var(--duration-meteor, 5s) linear infinite',
            },
        },
    },

    plugins: [forms, require('tailwindcss-animate')],
};
