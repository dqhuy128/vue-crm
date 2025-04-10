// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/sass/style.scss"`
      }
    }
  }
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://api.skygroupvn.com.vn/api',
  //       changeOrigin: true
  //     }
  //   }
  // }
  // publicPath: process.env.NODE_ENV === "production" ? "/vue-crm/" : "/"
}
