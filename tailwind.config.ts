import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Tema alquímico-masónico
        flame: {
          primary: '#FF6B35',
          secondary: '#F7931E',
          dark: '#C1440E',
        },
        shadow: {
          light: '#1A1A2E',
          dark: '#0F0F1E',
        },
        light: {
          primary: '#F5F5F5',
          secondary: '#E8E8E8',
        }
      },
    },
  },
  plugins: [],
}
export default config
