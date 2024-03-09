/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "gradient-to-tl": "linear-gradient(to top left, white, #6133B4)",
      }),
    },
  },
  plugins: [],
};
