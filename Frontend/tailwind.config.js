/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1a3c6e",
          50: "#f0f4f9",
          100: "#e0e9f3",
          200: "#c0d2e7",
          300: "#91b3d6",
          400: "#5c8dc0",
          500: "#1a3c6e", // Primary
          600: "#153058",
          700: "#112646",
          800: "#0d1d35",
          900: "#091424",
        },
        accent: {
          DEFAULT: "#f59e0b",
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b", // Accent
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        success: "#10b981",
        error: "#ef4444",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-out forwards",
        slideUp: "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    "bg-primary", "bg-accent", "bg-success", "bg-error",
    "text-primary", "text-accent", "text-success", "text-error",
    "bg-primary/5", "bg-accent/5", "bg-success/5", "bg-error/5",
    "bg-primary/10", "bg-accent/10", "bg-success/10", "bg-error/10",
    "shadow-primary/20", "shadow-accent/20", "shadow-success/20", "shadow-error/20"
  ],
};
