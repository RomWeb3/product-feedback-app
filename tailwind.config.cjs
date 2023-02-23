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
        separator: "#8C92B3",
        border: "#64719627",
        red: "#D73737",
        gradient:
          "radial-gradient(128.88% 128.88% at 103.9% -10.39%, #E84D70 0%, #A337F6 53.09%, #28A7ED 100%)",
      },
    },
    screens: {
      vsm: { max: "360px" },
      // => @media (min-width: 640px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    plugins: [],
  },
};
