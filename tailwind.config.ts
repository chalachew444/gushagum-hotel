import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wine: {
          50: "#f8f1f2",
          100: "#f0e1e3",
          200: "#e0c7cb",
          300: "#d1a8b0",
          400: "#b77b83",
          500: "#9d5d68",
          600: "#8a4753",
          700: "#722F37",
          800: "#56262d",
          900: "#3d1b22",
        },
        gold: {
          50: "#fdf9ee",
          100: "#f9f0d3",
          200: "#f1e3a4",
          300: "#e7d075",
          400: "#dcb64d",
          500: "#d4af37",
          600: "#b9922d",
          700: "#947425",
          800: "#785b22",
          900: "#5f471d",
        },
      },
      boxShadow: {
        luxury: "0 20px 45px rgba(114, 47, 55, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
