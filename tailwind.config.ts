import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
      },
      colors: {
        // Warm, premium, soft-tech palette
        cream: {
          DEFAULT: "#FBF7F4",
          50: "#FDFBF9",
          100: "#FBF7F4",
          200: "#F4ECE6",
        },
        lavender: {
          50: "#F4F1FB",
          100: "#E9E3F7",
          200: "#D8CEF0",
          300: "#C2B2E6",
          400: "#A892D8",
          500: "#8E73C7",
          600: "#7559AE",
          700: "#5E468C",
          800: "#473669",
          900: "#332749",
        },
        peach: {
          50: "#FEF4EE",
          100: "#FCE7DA",
          200: "#F9CFB4",
          300: "#F4B393",
          400: "#EE9670",
          500: "#E47A50",
          600: "#CF6038",
        },
        sage: {
          100: "#E7EFE9",
          300: "#AFC9B6",
          500: "#7BA487",
          700: "#557963",
        },
        ink: {
          DEFAULT: "#2E2A33",
          soft: "#5B5563",
          faint: "#8C8694",
        },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(51, 39, 73, 0.04), 0 8px 24px rgba(51, 39, 73, 0.06)",
        lift: "0 4px 12px rgba(51, 39, 73, 0.06), 0 18px 48px rgba(51, 39, 73, 0.10)",
        glow: "0 0 0 1px rgba(168, 146, 216, 0.18), 0 12px 40px rgba(142, 115, 199, 0.18)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      backgroundImage: {
        "aurora":
          "radial-gradient(1200px 600px at 12% -10%, rgba(216,206,240,0.55), transparent 55%), radial-gradient(900px 500px at 95% 0%, rgba(249,207,180,0.45), transparent 50%), radial-gradient(800px 600px at 50% 120%, rgba(231,239,233,0.5), transparent 55%)",
        "card-sheen":
          "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.55))",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "soft-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        "soft-pulse": "soft-pulse 1.6s ease-in-out infinite",
        shimmer: "shimmer 1.8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
