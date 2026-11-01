/** @type {import('tailwindcss').Config} */
// Utsav AI — "Indian Contemporary Royal" design tokens.
// Colours resolve to CSS variables (see src/styles/index.css) so light/dark themes swap in one place.
const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        'surface-2': token('surface-2'),
        line: token('line'),
        ink: token('ink'),
        'ink-2': token('ink-2'),
        primary: token('primary'),
        'on-primary': token('on-primary'),
        maroon: token('maroon'),
        burgundy: token('burgundy'),
        gold: token('gold'),
        'gold-ink': token('gold-ink'),
        saffron: token('saffron'),
        peach: token('peach'),
        rose: token('rose'),
        forest: token('forest'),
        danger: token('danger'),
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Manrope', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        // Fluid display sizes for editorial headings
        'display-xl': ['clamp(2.75rem, 1.6rem + 4.6vw, 5.25rem)', { lineHeight: '1.02', letterSpacing: '-0.015em' }],
        'display-lg': ['clamp(2.1rem, 1.4rem + 2.6vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.01em' }],
        'display-md': ['clamp(1.6rem, 1.2rem + 1.4vw, 2.35rem)', { lineHeight: '1.15' }],
      },
      borderRadius: {
        card: '1.125rem',
      },
      boxShadow: {
        card: '0 1px 2px rgb(var(--c-shadow) / 0.06), 0 8px 24px -12px rgb(var(--c-shadow) / 0.18)',
        lift: '0 2px 4px rgb(var(--c-shadow) / 0.06), 0 18px 40px -18px rgb(var(--c-shadow) / 0.32)',
      },
      maxWidth: {
        shell: '78rem',
      },
    },
  },
  plugins: [],
};
