/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: {
        sm: '1rem',
        lg: '3rem',
        xl: '4rem',
      },
    },
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        montserrat: ['Montserrat'],
      },
      colors: {
        dark: '#0f172a',
      },
    },
  },
  plugins: [require('daisyui')],
};
