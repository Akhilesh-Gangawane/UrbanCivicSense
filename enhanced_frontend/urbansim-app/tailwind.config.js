/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#ff6d5a",
        "primary-hover": "#e65c49",
        "background-light": "#fdfbf7",
        "background-dark": "#0f172a", // Dark slate for dark mode
        "surface-light": "#ffffff",
        "surface-dark": "#1e293b",
        "text-main-light": "#1a1a1a",
        "text-main-dark": "#f1f5f9",
        "text-muted-light": "#4b5563",
        "text-muted-dark": "#94a3b8",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.75rem",
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px rgba(255, 109, 90, 0.3)',
      }
    },
  },
  plugins: [],
}
