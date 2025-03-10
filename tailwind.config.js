/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          200: "#D6C7FF",
          300: "#D1C0FF",
          400: "#AB8BFF",
          500: "#5D20A6",
        },
        dark: {
          400: "#1D2129",
          500: "#0F0D23",
          600: '#030014',
          700: '#151312'
        },
        light: {
          200: "#FAF9F7",
          300: "#A8B5DB",
          400: "#9CA4AB",
          500: "#9B9EA7"
        },
        star: {
          DEFAULT: "#FFCD1A", // Gold color for ratings
        },
      }
    },
  },
  plugins: [],
}