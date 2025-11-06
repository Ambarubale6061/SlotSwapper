/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#facc15",
        swapPending: "#9d4edd",
        sidebarBg: "#1f2937",
        mainBg: "#f3f4f6",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
