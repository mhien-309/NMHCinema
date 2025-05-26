/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        red: {
          50: '#FFF5F5',
          100: '#FFE0E0',
          200: '#FFB3B3',
          300: '#FF8080',
          400: '#FF5C5C',
          500: '#FF3B3B',
          600: '#FF1A1A',
          700: '#E60000',
          800: '#B30000',
          900: '#800000',
        },
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [],
};