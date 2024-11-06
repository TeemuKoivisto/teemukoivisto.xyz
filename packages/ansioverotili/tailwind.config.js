import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{html,js,svelte,ts}'],
  safelist: ['dark'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: [...fontFamily.sans],
        title: 'Cherry Bomb One, system-ui',
        serif: 'Playfair Display, serif',
      },
    },
  },
}

export default config
