/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          1: "#E3FFCC",
          2: "#0A363C",
          base: "#CEEBB6"
        },
        green: {
          0: "#03181A",
          2: "#5F7173",
          3: "#CED7D8",
          4: "#F3F5F5",
          5: "#234E54",
          brand: "#0A363C"
        },
        grey: {
          dark: {
            1: "#2E3A45",
            2: "#767D85",
            3: "#D5D8DA",
            4: "#F6F8F9"
          }
        },
        orange: {
          0: "#332108",
          2: "#FFD392",
          3: "#FFEDD4",
          4: "#FFFBF4",
          brand: "#FFB240"
        },
        "portal-bg": "#F8F9FA",
        sand: {
          0: "#323130",
          2: "#FCFAF9",
          3: "#FEFDFC",
          4: "#FFFEFE",
          brand: "#F9F5F2"
        },
        semantic: {
          amber: "#DF9900",
          error: "#DD2418",
          success: "#02885B"
        }
      }
    },
  },
  plugins: [],
}

