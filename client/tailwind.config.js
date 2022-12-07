/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens: {
        ssm: "375px",
      },
      backgroundImage: {
        game: "url('assets/img/bg.jpg')",
      },
      colors: {
        blueBold: "#020230",
      },
    },
  },
  plugins: [],
};
