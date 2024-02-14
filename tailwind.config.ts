import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter Tight", "Arial", "sans-serif"],
    },
    extend: {
      colors: {
        primary: {
          50: "#e6f9f1",
          100: "#c3f2dc",
          200: "#9febc8",
          300: "#7be4b3",
          400: "#96e6be",
          500: "#4dd69f",
          600: "#26cf8c",
          700: "#00c87a",
          800: "#00b06b",
          900: "#009851",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
