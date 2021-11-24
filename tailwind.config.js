module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
      // xl: '1280px',
      // '2xl': '1536px',
    },
    extend: {
      colors: {
        'main-500': '#1CC8EE',
        'dark-900': '#0A0A0B',
        'dark-800': '#131414',
        'dark-700': '#1C1D1D',
        'dark-600': '#323232',
        'dark-500': '#414242',
        'light-800': '#F5F5F5',
      },
      fill: {
        'main-500': '#1CC8EE',
        'dark-900': '#0A0A0B',
        'dark-800': '#131414',
        'dark-700': '#1C1D1D',
        'dark-600': '#323232',
        'dark-500': '#414242',
        'light-800': '#F5F5F5',
      },
      minWidth: {
        80: '20rem',
      },
      zIndex: {
        'top': 99999,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
