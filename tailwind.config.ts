import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        oliveMain: "#171A12",
        oliveSection: "#202516",
        oliveCard: "#2A2D1F",
        cream: "#EFE7D6",
        creamSoft: "#D8CDB8",
        gold: "#C4A15A",
        goldSoft: "#A98A4C",
        textMain: "#F4ECDD",
        textMuted: "#B9AE9A",
        navy: "#171A12",
        green: "#202516",
        ink: "#2A2D1F",
        espresso: "#171A12",
        ivory: "#EFE7D6",
        ivoryDeep: "#D8CDB8",
        champagne: "#C4A15A",
        oldGold: "#A98A4C",
        softGold: "#C4A15A",
        warm: "#F4ECDD",
        muted: "#B9AE9A",
      },
      fontFamily: {
        serifDisplay: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sansBody: ["Inter", "Segoe UI", "Arial", "sans-serif"],
      },
      boxShadow: {
        premium: "0 24px 70px rgba(8, 10, 6, 0.32)",
      },
    },
  },
  plugins: [],
};

export default config;
