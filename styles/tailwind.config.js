/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['EB Garamond', 'serif'],
        sans: ['Hanken Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
