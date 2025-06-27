/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
  },
  plugins: [require('tw-animate-css')],
  safeList: ['bg-opacity-50',],
};