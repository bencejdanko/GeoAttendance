/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'xs': '340px', // min-width
      "sm":	"640px",
      "md":	"768px",
      "lg":	"1024px",
      "xl":	"1280px",
      "2xl": "1536px"
    },
  },
  plugins: [],
  variants: {
    extend: {
      opacity: ['disabled'],
      border: ['disabled'],
      // add any tailwind classes you wish to enable disabled: on here  
    }
  },
}

