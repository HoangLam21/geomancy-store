import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#521417",
        dark: "#272727",
        white: "#FFFFFF",
        gray: "#3A3A3A",
        "light-gray": "#D9D9D9",
      },
    },
  },
  plugins: [],
};
export default config;