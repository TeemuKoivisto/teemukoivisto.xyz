const { screens } = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '480px',
      ...screens,
    },
  },
  plugins: [],
}
