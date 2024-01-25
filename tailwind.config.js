/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '576px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      fluid: '100%'
    },
    extend: {
      colors: {
        dim: {
          50: '#5F99F7',
          100: '#5F99F7',
          200: '#38444d',
          300: '#202e3a',
          400: '#253341',
          500: '#5F99F7',
          600: '#5F99F7',
          700: '#192734',
          800: '#162d40',
          900: '#15202b'
        }
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  },
  prefix: 'tw-'
}
// export const content = ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}']
// export const theme = {
//   extend: {}
// }
// export const plugins = []
// export const corePlugins = {
//   preflight: false
// }
// export const prefix = 'tw-'
