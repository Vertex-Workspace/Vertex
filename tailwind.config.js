/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      height: {},
      screens: {
        '3xl': '1700px',
      },
    },
  },
  plugins: [],
}