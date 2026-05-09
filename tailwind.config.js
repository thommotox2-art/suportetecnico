/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-error-container": "#93000a",
        "surface-dim": "#d9dadb",
        "on-secondary-fixed": "#410004",
        "on-secondary-fixed-variant": "#930013",
        "primary-container": "#008742",
        "on-surface-variant": "#3e4a3f",
        "surface": "#f8f9fa",
        "inverse-on-surface": "#f0f1f2",
        "error-container": "#ffdad6",
        "primary-fixed": "#89faa5",
        "on-primary": "#ffffff",
        "tertiary": "#0055A4",
        "on-secondary-container": "#fffbff",
        "tertiary-container": "#3875c6",
        "tertiary-fixed-dim": "#a8c8ff",
        "inverse-surface": "#2e3132",
        "outline": "#6e7a6e",
        "on-secondary": "#ffffff",
        "secondary-container": "#dd2e33",
        "secondary": "#CE2B37",
        "surface-variant": "#e1e3e4",
        "on-primary-container": "#f6fff3",
        "secondary-fixed": "#ffdad7",
        "on-error": "#ffffff",
        "tertiary-fixed": "#d5e3ff",
        "on-primary-fixed": "#00210b",
        "primary-fixed-dim": "#6cdd8c",
        "surface-container-high": "#e7e8e9",
        "on-background": "#191c1d",
        "surface-container-low": "#f3f4f5",
        "on-tertiary-container": "#fefcff",
        "on-primary-fixed-variant": "#005226",
        "on-tertiary-fixed": "#001b3c",
        "surface-tint": "#006d34",
        "background": "#f8f9fa",
        "surface-container": "#edeeef",
        "outline-variant": "#bdcabc",
        "on-tertiary": "#ffffff",
        "on-tertiary-fixed-variant": "#004689",
        "surface-container-highest": "#e1e3e4",
        "surface-bright": "#f8f9fa",
        "primary": "#008c45",
        "surface-container-lowest": "#ffffff",
        "on-surface": "#191c1d",
        "secondary-fixed-dim": "#ffb3ad",
        "inverse-primary": "#6cdd8c",
        "error": "#ba1a1a"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "container-max": "1440px",
        "stack-sm": "0.5rem",
        "stack-lg": "2rem",
        "stack-md": "1rem",
        "gutter": "1.5rem",
        "margin-page": "2rem",
        "sidebar-width": "260px"
      },
      fontFamily: {
        "body-lg": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "headline-md": ["Inter", "sans-serif"],
        "headline-xl": ["Inter", "sans-serif"],
        "mono-label": ["JetBrains Mono", "monospace"],
        "headline-lg": ["Inter", "sans-serif"],
        "label-md": ["Inter", "sans-serif"]
      },
      fontSize: {
        "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "headline-md": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "headline-xl": ["36px", { lineHeight: "44px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "mono-label": ["13px", { lineHeight: "18px", fontWeight: "500" }],
        "headline-lg": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "label-md": ["12px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "600" }]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
