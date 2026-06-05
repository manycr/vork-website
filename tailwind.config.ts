import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        vorkBlack: "#101010",
        vorkCream: "#f4f0e8",
        vorkAccent: "#f2db9c"
      }
    }
  },
  plugins: []
};

export default config;
