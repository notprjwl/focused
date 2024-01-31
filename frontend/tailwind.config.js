/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        honk: ["Honk"],
        poppins:["Poppins"],
        crete:["Crete Round"],
        dm:["dm mono"]
      },
    },
  },
  plugins: [],
};
