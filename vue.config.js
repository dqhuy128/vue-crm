// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/sass/style.scss"`
      }
    }
  }
  // publicPath: process.env.NODE_ENV === "production" ? "/vue-crm/" : "/"
}
