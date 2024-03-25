/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "mentorlink-blue": "#2764FF",
        "mentorlink-black": "#000000",
        "mentorlink-white": "#FFFFFF",
        "mentorlink-offwhite": "#F6F6F6",
        "mentorlink-gray": "#828282",
      },
    },
  },
  plugins: [],
};
