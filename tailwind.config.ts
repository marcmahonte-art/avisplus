import type { Config } from "tailwindcss";

/**
 * Configuration Tailwind Avis+.
 * Tous les tokens proviennent de DESIGN_SYSTEM_AVIS_PLUS.md (§5 à §16, §40, §41).
 * Les développeurs doivent utiliser les classes `avis-*` plutôt que des couleurs arbitraires.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        avis: {
          /* §5.1 — Couleur principale */
          black: "#050505",
          /* §5.2 — Gris texte */
          text: "#475569",
          /* §5.3 — Gris secondaire */
          muted: "#64748B",
          /* §5.4 — Gris clair */
          border: "#E2E8F0",
          /* §5.5 — Gris très clair */
          soft: "#F8FAFC",
          /* §5.6 — Blanc */
          white: "#FFFFFF",

          /* §6 — Couleur accent */
          primary: "#FFB82E",
          "primary-hover": "#F4A91F",
          "primary-light": "#FFF4D8",
          "primary-dark": "#C98200",
          "accent-soft": "#FFE6A3",

          /* §7 — Couleurs fonctionnelles */
          success: "#16A34A",
          warning: "#F59E0B",
          error: "#DC2626",
          info: "#2563EB",

          /* §31 — Fonds de badges fonctionnels */
          "success-bg": "#DCFCE7",
          "success-text": "#166534",
          "warning-bg": "#FEF3C7",
          "warning-text": "#92400E",
          "error-bg": "#FEE2E2",
          "error-text": "#991B1B",

          /* §8 — Fonds */
          "bg-soft": "#F8FAFC",
          "bg-accent": "#FFF8E8",
        },
      },

      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },

      /* §3 — Hiérarchie typographique */
      fontSize: {
        display: ["64px", { lineHeight: "1.05", fontWeight: "700", letterSpacing: "-0.04em" }],
        "display-sm": ["48px", { lineHeight: "1.08", fontWeight: "700", letterSpacing: "-0.04em" }],
        "display-xs": ["38px", { lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.035em" }],
        h1: ["48px", { lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.03em" }],
        "h1-sm": ["34px", { lineHeight: "1.15", fontWeight: "700", letterSpacing: "-0.03em" }],
        h2: ["36px", { lineHeight: "1.15", fontWeight: "700", letterSpacing: "-0.025em" }],
        "h2-sm": ["30px", { lineHeight: "1.18", fontWeight: "700", letterSpacing: "-0.025em" }],
        h3: ["24px", { lineHeight: "1.25", fontWeight: "650" }],
        h4: ["20px", { lineHeight: "1.3", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "1.65" }],
        body: ["16px", { lineHeight: "1.6" }],
        "body-sm": ["14px", { lineHeight: "1.5" }],
        caption: ["12px", { lineHeight: "1.4", fontWeight: "500" }],
        nav: ["14px", { lineHeight: "1", fontWeight: "500" }],
        eyebrow: ["13px", { lineHeight: "1", fontWeight: "600", letterSpacing: "0.2em" }],
        price: ["28px", { lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.02em" }],
      },

      /* §15 — Border radius */
      borderRadius: {
        xs: "6px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        pill: "9999px",
      },

      /* §16 — Ombres discrètes */
      boxShadow: {
        sm: "0 1px 2px rgba(15, 23, 42, 0.05)",
        md: "0 8px 24px rgba(15, 23, 42, 0.08)",
        lg: "0 20px 50px rgba(15, 23, 42, 0.10)",
        focus: "0 0 0 3px rgba(255, 184, 46, 0.15)",
      },

      /* §14 — Échelle d'espacement 4px */
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },

      maxWidth: {
        container: "1280px",
        digital: "480px",
        "digital-lg": "560px",
      },

      /* §32 — Animations discrètes */
      transitionDuration: {
        fast: "150ms",
        normal: "200ms",
        slow: "300ms",
      },

      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 300ms ease-out both",
        "fade-in": "fade-in 200ms ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
