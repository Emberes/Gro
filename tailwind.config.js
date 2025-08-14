/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        greenDark: "#5B913B",
        greenLight: "#77B254",
        beige: "#FFE8B6",
        peach: "#D99D81",
      },
    },
  },
  plugins: [],
};
