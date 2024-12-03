/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "navbar-color": "#FFF4B7",
        "sidebar-color": "#006A67",
      },
    },
  },
  plugins: [],
};
