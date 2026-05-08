import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50: '#edf8ef',
          100: '#d6f0da',
          200: '#b7e3bf',
          300: '#8ed19b',
          400: '#65bc73',
          500: '#41a451',
          600: '#2b7a45',
          700: '#21623a',
          800: '#19502f',
          900: '#143f26',
        },
        red: {
          50: '#fff0f0',
          100: '#ffd6d6',
          200: '#f9b3b3',
          300: '#f08a8a',
          400: '#e95f5f',
          500: '#dd4343',
          600: '#c92e2e',
          700: '#a92424',
          800: '#862121',
          900: '#691d1d',
        },
      },
    },
  },
};

export default config;
