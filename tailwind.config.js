// For Tailwind CSS 3.x
module.exports = {
  content: [
      './src/**/*.{js,jsx,ts,tsx}', 
  ],
  theme: {
      extend: {
          colors: {
              black: '#000',
              white: '#fff',
              gray: {
                  light: '#d4d4d4',
                  DEFAULT: '#a3a3a3',
                  dark: '#4b4b4b'
              }
          },
          fontFamily: {
              sans: ['Roboto', 'sans-serif']
          },
          spacing: {
              '1/2': '50%',
              full: '100%',
          },
      },
  },
  plugins: [],
};
