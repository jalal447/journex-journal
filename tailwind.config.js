/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        jx: {
          black: "#0B0F14",
          green: "#00FF88",
          blue: "#0066FF",
          red: "#FF3B3B",
          white: "#FFFFFF",
          gold: "#FFD700",
        },
      },
      boxShadow: {
        neon: "0 0 0.75rem rgba(0, 255, 136, 0.45)",
        glass: "0 8px 24px rgba(0, 0, 0, 0.35)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(circle at 10% 20%, rgba(0,255,136,0.1), transparent 35%), radial-gradient(circle at 80% 0%, rgba(0,102,255,0.18), transparent 30%)",
      },
      animation: {
        float: "float 8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
