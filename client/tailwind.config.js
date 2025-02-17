/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#0A192F',
       'secondary': '#F97316',
        'tertiary': '#54D6BB',
        
        
      },
     
    },
     screens:{
        'xs': '440px',
        // => @media (min-width: 440px) { ... }
       'sm': '640px',

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
      }
  },
  plugins: [],
}

