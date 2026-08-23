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
          bright: tokens.brand.bronzeBright,
          deep: tokens.brand.bronzeDeep,
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
        night: {
          DEFAULT: tokens.night.bg,
          elevated: tokens.night.bgElevated,
          card: tokens.night.card,
          text: tokens.night.text,
          "text-secondary": tokens.night.textSecondary,
          "text-muted": tokens.night.textMuted,
          border: tokens.night.border,
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      fontSize: Object.fromEntries(
        Object.entries(tokens.type)
          .filter(([k]) => !k.startsWith("_"))
          .map(([k, v]) => [
            // displayLarge -> display-lg style keys
            k
              .replace(/([A-Z])/g, "-$1")
              .toLowerCase()
              .replace("large", "lg")
              .replace("medium", "md")
              .replace("small", "sm"),
            [
              `${v.size}px`,
              {
                lineHeight: `${v.lineHeight}px`,
                letterSpacing: `${v.tracking}px`,
                fontWeight: `${v.weight}`,
              },
            ],
          ])
      ),
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
