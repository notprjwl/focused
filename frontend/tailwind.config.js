/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto"],
        poppins: ["Poppins"],
        honk: ["Honk"],
        inter: ["Inter"],
        crete: ["Crete Round"],
        oswald: ["Oswald"],
        jost: ["Jost"],
        narrow: ["PT Sans Narrow"],
        playfair: ["Playfair Display"],
      },
      colors: {
        transparent: "transparent",
        background: "#202020",
        text: "#636461",
        body: "#ffd3a4",
        red: "#d56272",
        error: "#dd0612",
        buttonColor: "#B9BAA3",
        formBg: "#19191a",
        border: "#3e3e3f",
        borderFocus: "#3a645d86"
      },
      // backgroundImage: {
      //   "home-illustration": "url('/src/assets/home-illustration.png')",
      // },
    },
  },
  plugins: [],
};
