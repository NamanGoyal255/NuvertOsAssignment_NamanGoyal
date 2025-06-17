/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        beige: '#f5f5dc', 
        'card-bg': '#f8fafc',
        'primary-gradient-start': '#667eea',
        'primary-gradient-end': '#764ba2',
        'pinkish': '#f093fb',
        'reddish': '#f5576c',
        'soft-black': '#1e293b',
      },
      animation: {
        'gradient-x': 'gradientX 3s ease infinite',
      },
      keyframes: {
        gradientX: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      },
      backgroundSize: {
        '400': '400% 100%',
      }
    },
  },
  plugins: [],
}
