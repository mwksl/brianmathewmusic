import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/(frontend)/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        inter: ["var(--font-inter)"],
        playfair: ["var(--font-playfair)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
