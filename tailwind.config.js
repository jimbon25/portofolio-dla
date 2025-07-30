/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1', // indigo-500
          dark: '#4f46e5', // indigo-600
        },
        background: '#f8fafc', // slate-50
      },
      keyframes: {
        ripple: {
          '0%': { opacity: '0.5', transform: 'scale(0)' },
          '100%': { opacity: '0', transform: 'scale(2)' },
        },
      },
      animation: {
        ripple: 'ripple 0.4s linear',
      },
    },
  },
  plugins: [],
}

