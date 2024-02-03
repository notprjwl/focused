/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins:["Poppins"],
        honk: ["Honk"],
        inter: ["Inter"],
        crete: ["Crete Round"],
        oswald: ["Oswald"],
        jost: ["Jost"]
      },
      colors: {
        background: "#ffffff",
        text: "#0f0f10",
        body: "#ffd3a4"
      },
    },
  },
  plugins: [],
};
