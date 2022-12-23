/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        accent: "#FBD784",
      },
      backgroundColor: {
        background: "rgba(11, 29, 38, 1)",
      },
      fontSize: {
        "5xl": ["3rem", "1.3125"],
      },
      fontFamily: {
        sans: "'Poppins', sans-serif",
        serif: "'Roboto Slab', serif",
      },
      zIndex: {
        fab: 1050,
        drawer: 1200,
        modal: 1300,
        snackbar: 1400,
        tooltip: 1500,
      },
      backgroundImage: {
        "linear-gradient-1":
          "linear-gradient(180deg, rgba(11, 29, 38, 0) 58.85%, #0B1D26 100%)",
      },
    },
  },
  plugins: [],
};
