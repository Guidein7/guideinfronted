/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        dmSans: ["DM Sans", "sans-serif"],
      },
      colors: {
        darkGray: "#212529",
      },
      animation: {
        blink: 'blink 1s step-start infinite'
      },
      keyframes: {
        blink: {
          '50%': { opacity: 0 }
        }
      }
    
    },
  },
  plugins: [],
}

