/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background-color": "#323031",
        "title-text": "#F0EFF4",
        "inactive-text": "#818181",
        "active-text": "#9E829C",
      },
    },
  },
  plugins: [],
};
