/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#d8b4e2', //light purple
          DEFAULT: '#6f4782', //dark purple
          pink: '#f2eaf3', //pink
          button: '#ffb0c7', //soft pink
        },
      }
    },
  },
  plugins: [],
}