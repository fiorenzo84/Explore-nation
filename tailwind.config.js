/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom:
          "0 0px 0px 0px rgba(90, 200, 126, 0.7), 0 4px 3px 0px rgba(90, 200, 126, 0.5)", //ombre personnalisée
      },
      colors: {
        customGreen: "#5AC87E",
      },
      maxWidth: {
        customWidth: "768px",
      },
    },
  },
  plugins: [],
};
