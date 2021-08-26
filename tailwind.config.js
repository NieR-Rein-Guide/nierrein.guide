module.exports = {
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        beige: {
          DEFAULT: "#bda699",
          light: "#b8b6a5",
          dark: "#94918b",
          darker: "#1a1819",
        },
        brown: {
          DEFAULT: "#4a4341",
        },
        transparent: {
          bg: "rgba(255, 255, 255, 0.1)",
        },
      },
      zIndex: {
        "-1": "-1",
      },
      gridTemplateColumns: {
        "with-sidenav": "400px 1fr",
      },
    },
  },
  variants: {
    extend: {
      scale: ["group-hover"],
    },
  },
  plugins: [require("tailwindcss-easing")],
};
