module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#000000",
          surface: "#0F172A",
          surfaceLight: "#1E293B",
          border: "#334155",
          muted: "#94A3B8",
        },
        brand: {
          blue: "#38BDF8",
          cyan: "#22D3EE",
          amber: "#F59E0B",
          red: "#EF4444",
          green: "#34D399",
          purple: "#A78BFA",
        },
        status: {
          online: "#22D3EE",
          degraded: "#F59E0B",
          critical: "#EF4444",
          offline: "#94A3B8",
          maintenance: "#A78BFA",
          optimal: "#34D399",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
