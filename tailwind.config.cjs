/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        theme: {
          1: '#C0D9F4',
          2: '#0A1C62',
          3: '#4A8BDF',
          4: '#A0006D',
        },
      },
    },
  },
  plugins: [],
};
