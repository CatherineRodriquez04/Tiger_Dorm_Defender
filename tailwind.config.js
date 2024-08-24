/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
        sm: "640px",
        md: "768px",
        lg: "960px",
        xl: "1200px",
    },
    fontFamily:{
      primary: ['"Press Start 2P"', 'cursive'],
    },
    extend: {

      colors: {
        primary: '#FFFBD7',
        accent: {
          DEFAULT: '#941DFC',
          hover: 'black',
        }
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
}

