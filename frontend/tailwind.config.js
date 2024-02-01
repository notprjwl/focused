/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        honk: ["Honk"],
        inter: ["Inter"],
        crete:["Crete Round"],
      },
      colors: {
        background: "#f2f6fe",
        text: "#0f0f10",
      },
    },
  },
  plugins: [],
};
