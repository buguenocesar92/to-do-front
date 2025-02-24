/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Asegúrate de incluir todos los archivos .vue, .ts, .js donde uses clases de Tailwind
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
