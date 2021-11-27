module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/f2e2021-week3-bus/'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/styles/app.scss";
        `
      }
    }
  }
};
