/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
  theme: {
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
    },
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
        playfair: ["Playfair Display"]
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
        borderFocus: "#3a645d86",
        textTint: "#dfe0df",
        errorField: "#aa040d",
        borderTable: "#37383c",
      }
      // backgroundImage: {
      //   "home-illustration": "url('/src/assets/home-illustration.png')",
      // },
    }
  },
};