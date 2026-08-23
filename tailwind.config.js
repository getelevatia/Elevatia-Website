/** @type {import('tailwindcss').Config} */

// Shared brand tokens. Source of truth lives in design-harvest/design-tokens.json;
// this is the committed copy that sync-tokens.sh writes, because Vercel only ever
// sees this repo and a path reaching outside it would break the deploy.
const tokens = require("./src/lib/design-tokens.json");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bronze: {
          DEFAULT: tokens.brand.bronze,
          light: tokens.brand.bronzeLight,
          dark: tokens.brand.bronzeDark,
        },
        cream: {
          DEFAULT: tokens.neutral.background,
          light: tokens.neutral.card,
        },
        ink: {
          DEFAULT: tokens.neutral.text,
          secondary: tokens.neutral.textSecondary,
          muted: tokens.neutral.textMuted,
        },
        hairline: tokens.neutral.border,
      },
      borderRadius: Object.fromEntries(
        Object.entries(tokens.radius).map(([k, v]) => [k, `${v}px`])
      ),
      spacing: Object.fromEntries(
        Object.entries(tokens.spacing).map(([k, v]) => [k, `${v}px`])
      ),
    },
  },
  plugins: [],
};
