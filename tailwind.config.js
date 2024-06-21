/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  darkMode: "class",
  theme: {

    screens: {
      xs: "614px",
      sm: "1002px",
      md: "1022px",
      lg: "1092px",
      xl: "1280px",
    },

    extend: {

      colors: {
        dim: {
          50: "#e0c9e6",   // Lightest shade
          100: "#d4b0dd",
          200: "#c785d4",
          300: "#b655c3",
          400: "#a43bb1",
          500: "#8E00AA",   // Base color
          600: "#7e0099",
          700: "#6e0088",
          800: "#5e0077",
          900: "#4e0066",   // Darkest shade
        },
      }


    },
  },

  plugins: [],
}

