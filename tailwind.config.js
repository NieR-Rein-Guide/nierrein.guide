module.exports = {
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        beige: {
          DEFAULT: '#bda699',
          light: '#b8b6a5',
          dark: '#94918b',
          darker: '#1a1819',
        },
        brown: {
          DEFAULT: '#4a4341',
        }
      }
    },
  },
  variants: {
    extend: {
      scale: ['group-hover'],
    },
  },
  plugins: [
    require('tailwindcss-easing')
  ],
}
