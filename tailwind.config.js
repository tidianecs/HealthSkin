// tailwind.config.js

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          dark:  '#1a2e1a',
          mid:   '#2d4a2d',
          light: '#d4e8c2',
        },
        cream: {
          DEFAULT: '#f7f2e8',
          light:   '#faf7f0',
        },
        badge: {
          green:  '#d4e8c2',
          peach:  '#f0d9c0',
          pink:   '#f0d0cc',
          yellow: '#e8efc4',
        },
      },
      fontFamily: {
        sans:    ['DM Sans', 'sans-serif'],
        display: ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        xl:   '16px',
        '2xl':'20px',
        pill: '999px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-2deg)' },
          '50%':      { transform: 'translateY(-8px) rotate(2deg)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}