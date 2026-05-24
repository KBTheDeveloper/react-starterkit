/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  // Prevent conflicts with Ant Design (optional but recommended)
  corePlugins: {
    preflight: false, // disable Tailwind's base reset (Ant Design already has one)
  },
};
