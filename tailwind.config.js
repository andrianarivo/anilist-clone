/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'deep-dark': '#18181b',
        'default': '#1a1a1d',
      },
    },
  },
  plugins: [],
};
