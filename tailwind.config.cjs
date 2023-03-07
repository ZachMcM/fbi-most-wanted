/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend : {
      colors: {
        cover: "rgba(0, 0, 0, 0.9)",
      },
    }
  },
  plugins: [],
}
