/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        indigo: colors.indigo,
        emerald: colors.emerald,
        slate: colors.slate,
      },
      boxShadow: {
        card: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)'
      }
    },
  },
  plugins: [],
};
