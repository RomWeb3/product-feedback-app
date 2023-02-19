/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        violet: "#AD1FEA",
        blue: "#4661E6",
        verydarkblue: "#373F68",
        lightgray: "#F2F4FF",
        verylightgray: "#F7F8FD",
        darkblue: "#3A4374",
        gray: "#647196",
        orange: "#F49F85",
        lightblue: "#62BCFA",
        semiblack: "rgba(0, 0, 0, 0.5)",
        gradient:
          "radial-gradient(128.88% 128.88% at 103.9% -10.39%, #E84D70 0%, #A337F6 53.09%, #28A7ED 100%)",
      },
    },
    plugins: [],
  },
};
