/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx,html}", "./index.html"],

  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
          hover: "var(--accent-hover)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        xs: [
          "1.2rem",
          { lineHeight: "1.6rem", letterSpacing: "0.02rem", fontWeight: 400 },
        ],
        sm: [
          "1.4rem",
          { lineHeight: "2rem", letterSpacing: "0.02rem", fontWeight: 400 },
        ],
        base: [
          "1.6rem",
          { lineHeight: "2.4rem", letterSpacing: "0.02rem", fontWeight: 400 },
        ],
        lg: [
          "1.8rem",
          { lineHeight: "2.6rem", letterSpacing: "0.02rem", fontWeight: 500 },
        ],
        xl: [
          "2rem",
          { lineHeight: "2.8rem", letterSpacing: "0.02rem", fontWeight: 500 },
        ],
        "2xl": [
          "2.4rem",
          { lineHeight: "3.2rem", letterSpacing: "0.02rem", fontWeight: 600 },
        ],
        "3xl": [
          "3rem",
          { lineHeight: "3.6rem", letterSpacing: "0.02rem", fontWeight: 600 },
        ],
        "4xl": [
          "3.6rem",
          { lineHeight: "4.4rem", letterSpacing: "0.02rem", fontWeight: 700 },
        ],
        "5xl": [
          "4.8rem",
          { lineHeight: "5.2rem", letterSpacing: "0.02rem", fontWeight: 700 },
        ],
        "6xl": [
          "6rem",
          { lineHeight: "6.4rem", letterSpacing: "0.02rem", fontWeight: 700 },
        ],
        "7xl": [
          "7.2rem",
          { lineHeight: "8rem", letterSpacing: "0.02rem", fontWeight: 700 },
        ],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
