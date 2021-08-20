module.exports = {
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        beige: {
          DEFAULT: '#bda699',
          dark: '#94918b',
          darker: '#1a1819',
        },

      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-easing')
  ],
}
