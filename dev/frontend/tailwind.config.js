/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
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

