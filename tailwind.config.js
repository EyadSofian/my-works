/** @type {import('tailwindcss').Config} */
// "Obsidian Monochrome" — elegant dark theme. Token keys kept stable;
// values repointed to near-black zinc + a single refined blue accent.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Reference channel triplets so opacity modifiers + theme-switching both work.
        ink: {
          900: 'rgb(var(--c-ink-900) / <alpha-value>)',
          800: 'rgb(var(--c-ink-800) / <alpha-value>)',
          700: 'rgb(var(--c-ink-700) / <alpha-value>)',
          600: 'rgb(var(--c-ink-600) / <alpha-value>)',
        },
        haze: { 300: 'rgb(var(--c-haze-300) / <alpha-value>)' },
        mist: { 100: 'rgb(var(--c-mist-100) / <alpha-value>)' },
        amber: {
          500: 'rgb(var(--c-amber-500) / <alpha-value>)', // accent (blue)
          400: 'rgb(var(--c-amber-400) / <alpha-value>)',
        },
        ember: { 600: 'rgb(var(--c-ember-600) / <alpha-value>)' }, // gradient partner (indigo)
        electric: { cyan: 'rgb(var(--c-cyan-400) / <alpha-value>)' },
        jade: { 400: 'rgb(var(--c-jade-400) / <alpha-value>)' },
      },
      fontFamily: {
        display: ['Archivo', '"Space Grotesk"', 'sans-serif'],
        sans: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        arabic: ['"IBM Plex Sans Arabic"', 'Almarai', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      boxShadow: {
        glow: '0 0 60px -12px rgba(59,130,246,0.5)',
        'glow-cyan': '0 0 50px -12px rgba(125,211,252,0.4)',
      },
      backgroundImage: {
        'accent-gradient': 'var(--accent-gradient)',
        'cobalt-well': 'var(--bg-gradient)',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'float-slow': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'float-slow': 'float-slow 6s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'spin-slow': 'spin-slow 18s linear infinite',
      },
    },
  },
  plugins: [],
};
