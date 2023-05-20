/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  important: true,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      mxs: { max: '475px' },
      // => @media (max-width: 475px) { ... }

      msm: { max: '640px' },
      // => @media (max-width: 640px) { ... }

      mmd: { max: '768px' },
      // => @media (max-width: 768px) { ... }

      mlg: { max: '1024px' },
      // => @media (max-width: 1024px) { ... }

      mxl: { max: '1280px' },
      // => @media (max-width: 1280px) { ... }

      m2xl: { max: '1536px' },
      // => @media (max-width: 1536px) { ... }

      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
