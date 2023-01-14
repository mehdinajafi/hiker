/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
      },
      container: {
        center: true,
        padding: "1rem",
      },
      colors: {
        primary: "hsl(248deg 100% 60%)",
        "primary-dark": "hsl(248deg 100% 50%)",
        muted: "hsl(210deg, 38%, 15%)",
        info: "hsl(230deg,100%,69%)",
        success: "hsl(160deg, 100%, 40%)",
        "success-background": "hsla(160deg, 100%, 40%, 0.1)",
        alert: "hsl(30deg, 100%, 50%)",
        "alert-background": "hsl(40deg 13% 13%)",
        error: "hsl(340deg, 95%, 60%)",
        "error-background": "hsla(340deg, 95%, 43%, 0.1)",
      },
      backgroundColor: {
        background: "#ffffff",
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
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
