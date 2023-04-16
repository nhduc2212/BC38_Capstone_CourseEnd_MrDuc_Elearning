module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme:{
      extend: {
          height:{
              100:"800px"
          },
          width:{
              80100:"80%"
          },
          zIndex:{
            1000000:"1000000"
        },
      },
  },
  plugins: [],
  corePlugins:{
      preflight: false,
  }
};