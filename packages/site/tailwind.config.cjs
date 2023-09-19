const { screens } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,svelte}'],
  darkMode: ['class', "[class~='dark']"],
  theme: {
    extend: {
      backgroundImage: {
        // nav: 'linear-gradient(rgb(80, 149, 251) -59%, rgb(95, 160, 255))',
      },
      colors: {
        main: {
          DEFAULT: 'rgb(241, 243, 255)',
          footer: 'linear-gradient(rgb(95, 160, 255) -59%, rgb(88, 155, 255))',
          'nav-top': 'rgb(80, 149, 251)',
          'nav-bot': 'rgb(95, 160, 255)',
          'footer-top': 'rgb(80, 149, 251)',
          'footer-bot': 'rgb(95, 160, 255)',
          // 'nav-top': 'linear-gradient(rgb(80, 149, 251) -59%, rgb(95, 160, 255))',
        },
        dark: {
          lighter: '#271c1c',
          article: '#0b1212',
          DEFAULT: 'rgb(10 10 10)', // rgb(29 22 56);
          'nav-top': 'rgb(34 25 66)',
          'nav-bot': 'rgb(31 16 41)',
          'footer-top': 'rgb(25 24 67)',
          'footer-bot': 'rgb(31 16 41)',
          // nav: 'linear-gradient(rgb(34 25 66) -59%, rgb(31 16 41))',
          footer: 'linear-gradient(rgb(34 25 66) -59%, rgb(26 2 2))',
        },
      },
      fontFamily: {
        cursive: 'Permanent Marker, cursive;',
        sans: 'Rubik, sans-serif;',
        serif: 'Playfair Display, serif;',
      },
    },
    screens: {
      xs: '480px',
      ...screens,
    },
  },
  plugins: [],
}
