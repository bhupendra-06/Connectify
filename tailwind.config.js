/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // screens: {
    //   'xs': '380px',
    //   // => @media (min-width: 640px) { ... }
    // },

    extend: {
      colors: {
        primaryColor: 'rgb(135 16 221)', // Example custom color
      },
      animation: {
        progress: 'progress linear',
      },
      keyframes: {
        progress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      duration: {
        9000: "9000ms", // Custom duration class
      },
    },
  },
  plugins: [],
}

