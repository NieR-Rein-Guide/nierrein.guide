module.exports = {
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        beige: {
          DEFAULT: "#bda699",
          light: "#b8b6a5",
          text: '#CFCFCF',
          dark: "#94918b",
          darker: "#1a1819",
          inactive: '#AFAA9F',
          active: '#E6E2CF',
          accent: '#E3E3C7',
        },
        brown: {
          DEFAULT: "#4a4341",
        },
        grey: {
          dark: '#0C0C0C',
          lighter: '#1D1D1D',
          foreground: '#2D2D2D',
          detail: '#AAAAAA'
        },
        black: {
          DEFAULT: "#040404",
        },
        transparent: {
          DEFAULT: 'rgba(255, 255, 255, 0)',
          bg: "rgba(255, 255, 255, 0.1)",
        },
      },
      zIndex: {
        "-1": "-1",
      },
      gridTemplateColumns: {
        "with-sidenav": "400px 1fr",
        "third-one": "3fr 1fr",
      },
      fontFamily: {
       'display': ['Cormorant', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
       'labor': ['Noto Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderWidth: {
        3: '3px'
      },
      height: {
        '9/10': '90%',
      }
    },
  },
  variants: {
    extend: {
      scale: ["group-hover"],
      translate: ["group-hover"],
      brightness: ['hover'],
    },
  },
  plugins: [require("tailwindcss-easing")],
};
