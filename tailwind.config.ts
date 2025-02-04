import type { Config } from "tailwindcss";
export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#ff4017",
        primary: "#171717",
        secondary: "#f5f5f5",
        border: "#7d7d7d",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
