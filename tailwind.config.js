const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        beige: {
          DEFAULT: "#bda699",
          light: "#b8b6a5",
          text: "#CFCFCF",
          dark: "#94918b",
          darker: "#1a1819",
          inactive: "#AFAA9F",
          active: "#E6E2CF",
          accent: "#E3E3C7",
        },
        brown: {
          DEFAULT: "#4a4341",
        },
        grey: {
          dark: "#0C0C0C",
          lighter: "#1D1D1D",
          foreground: "#2D2D2D",
          detail: "#AAAAAA",
        },
        black: {
          DEFAULT: "#040404",
        },
        transparent: {
          DEFAULT: "rgba(255, 255, 255, 0)",
          bg: "rgba(255, 255, 255, 0.1)",
        },
      },
      zIndex: {
        menu: "9999",
        panels: "999",
        "-1": "-1",
      },
      gridTemplateColumns: {
        "with-sidenav": "400px 1fr",
        "third-one": "3fr 1fr",
      },
      fontFamily: {
        display: [
          "Cormorant",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        labor: [
          "Noto Sans",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      borderWidth: {
        3: "3px",
      },
      height: {
        "9/10": "90%",
      },
      spacing: {
        42: "10.5rem",
      },
      boxShadow: {
        border: "0 0 0 0.1rem #bda699",
      },
      brightness: {
        30: "30%",
      },
      scale: {
        "-1": "-1",
      },
      minWidth: {
        20: "5rem",
      },
      minHeight: {
        20: "5rem",
      },
      translate: {
        '-screen': '-100vh',
      },
      fontSize: {
        xxs: '10px',
      }
    },
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
  },
  variants: {
    extend: {
      scale: ["group-hover"],
      translate: ["group-hover"],
      brightness: ["hover"],
    },
  },
  plugins: [
    require("tailwindcss-easing"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
