/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'SF Pro Display', 'SF Pro Text', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['SF Pro Display', 'DM Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: 'hsl(221 83% 53%)',
          foreground: 'hsl(0 0% 100%)',
        },
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(0 0% 3.9%)',
        border: 'hsl(0 0% 89.8%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'bounce': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

