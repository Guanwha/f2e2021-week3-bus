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
        'main-600': '#07738B',
        'main-500': '#1CC8EE',
        'second-600': '#A98B0D',
        'second-500': '#FCD42C',
        'dark-900': '#0A0A0B',
        'dark-800': '#131414',
        'dark-700': '#1C1D1D',
        'dark-600': '#323232',
        'dark-500': '#414242',
        'light-800': '#F5F5F5',
      },
      fill: {
        'main-600': '#07738B',
        'main-500': '#1CC8EE',
        'second-600': '#A98B0D',
        'second-500': '#FCD42C',
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
        '-10': -10,
        'top': 99999,
      },
      inset: {
        '128': '32rem',
        '160': '40rem',
        '5p': '5%',
        '20p': '20%',
        '30p': '30%',
        '40p': '40%',
        '50p': '50%',
        '60p': '60%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
