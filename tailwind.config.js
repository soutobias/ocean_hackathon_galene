/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/**/*.{js,ts,jsx,tsx,mdx}',
    './App.tsx',
  ],
  theme: {
    extend: {
      colors: {
        red: {
          100: '#ffa6a6',
          500: '#fc0505',
        },
        blue: {
          500: '#138a8a',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
