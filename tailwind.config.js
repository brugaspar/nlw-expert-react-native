/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: "Inter_400Regular",
        subtitle: "Inter_500Medium",
        heading: "Inter_600SemiBold",
        bold: "Inter_700Bold",
      },
    },
  },
  plugins: [],
};
