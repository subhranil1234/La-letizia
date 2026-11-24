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
        obsidian: {
          DEFAULT: "#10100F",
          50: "#1A1A18",
          100: "#141413",
          deep: "#0B0B0A",
        },
        graphite: {
          DEFAULT: "#20201E",
          light: "#2B2B28",
          dark: "#161614",
        },
        gold: {
          illuminated: "#E5AE4C",
          DEFAULT: "#E5AE4C",
          hover: "#F2BE63",
          dim: "#A37526",
        },
        champagne: {
          DEFAULT: "#F5D99B",
          light: "#FCF3DE",
        },
        ivory: {
          DEFAULT: "#F6F0E6",
          muted: "#CBC2B3",
          dim: "#888277",
        },
        botanical: {
          DEFAULT: "#244D38",
          light: "#336B4E",
          dark: "#162E22",
        },
        electricTeal: {
          DEFAULT: "#13C6BA",
          dim: "#0D8E85",
        },
        neonMagenta: {
          DEFAULT: "#CE4AAB",
          dim: "#9A2F7E",
        },
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "Cinzel", "Georgia", "serif"],
        sans: ["var(--font-outfit)", "Outfit", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-space-mono)", "Space Mono", "monospace"],
      },
      letterSpacing: {
        tighter900: "-0.06em",
        tight900: "-0.04em",
        spacious: "0.25em",
        editorial: "0.35em",
      },
    },
  },
  plugins: [],
};
export default config;
