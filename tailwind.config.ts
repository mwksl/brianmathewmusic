import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/(frontend)/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-space-mono)"],
        heading: ["var(--font-custom)", "serif"],
        sans: ["var(--font-custom)", "serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        "accent-light": "var(--accent-light)",
        "text-muted": "var(--text-muted)",
      },
    },
  },
  plugins: [],
} satisfies Config;
