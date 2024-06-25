/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'taqtile-background': '#FFFFFF',
        'taqtile-green': '#004440',
        'taqtile-accent': '#00D5D4',
        'taqtile-font-primary': '#2E3233',
        'taqtile-font-secondary': '#01322B',
      },
    },
  },
  plugins: [],
};