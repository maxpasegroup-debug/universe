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
        royal: {
          50: "#0b0b0b",
          100: "#050505",
          200: "#080808",
          300: "#0c0c0c",
          400: "#101010",
        },
        gold: {
          50: "#fff3c4",
          100: "#ffe39a",
          200: "#ffd166",
          300: "#ffc233",
          400: "#ffae1a",
          500: "#ff9a00",
          600: "#f08a00",
          700: "#d47a00",
          800: "#b56900",
          900: "#8d4f00",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gold-glow": "radial-gradient(circle at 30% 30%, rgba(255, 190, 50, 0.35) 0%, rgba(0, 0, 0, 0) 60%)",
        "gold-linear": "linear-gradient(135deg,#C6A052,#FFD700,#B8963A)",
      },
      boxShadow: {
        "gold-glow": "0 0 18px rgba(255, 215, 0, 0.35), 0 0 55px rgba(255, 215, 0, 0.16)",
      },
    },
  },
  plugins: [],
};
export default config;
