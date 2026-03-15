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
                cream: "#FAF7F2",
                plum: "#3B1260",
                violet: "#6C3BA5",
                rose: "#C8447A",
                text1: "#1E0E35",
                text2: "#5A4870",
                text3: "#9B8EB0",
                borderlight: "#DDD4E8",
                plum2: "#2A0D46",
                gold: "#B8924A",
                "gold-l": "#D4AF6B",
            },
            fontFamily: {
                sans: ["var(--font-body)", "sans-serif"],
                serif: ["var(--font-display)", "serif"],
            },
        },
    },
    plugins: [],
};
export default config;
