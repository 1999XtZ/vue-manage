const { defineConfig } = require("@vue/cli-service")
const path = require("path")
// https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  // webpack 的 devServe 提供了代理的功能，该代理可以把所有请求到当前服务中的请求，转发(代理)到另外的服务器
  devServer: {
    // 配置反向代理
    proxy: {
      // 当地址中有 /api 时，都会被代理到指定的服务器上
      "/api": {
        // 要代理另外服务器地址
        target: "https://api.imooc-admin.lgdsunday.club/",
        changeOrigin: true
        // 设置为true时，代理服务器会将请求的host设置为目标URL的host，即改变请求头中的host字段，用于支持反向代理
        // 用于解决跨域请求时可能遇到的一些问题。当设置为 true 时，请求头中的host字段会被更改为目标URL的host，从而绕过浏览器的同源策略，解决跨域请求时可能遇到的问题
      }
    }
  },
  chainWebpack: (config) => {
    // 用于处理在<style></style> 标签中使用 ~@ 的规则
    config.resolve.alias.set("@", path.resolve(__dirname, "src"))

    // 规则：用于处理 element-plus 2.0 的错误
    config.module
      .rule("element-plus-2")
      .test(/\.msj$/)
      .type("javascript/auto")
      .include.add(/node_modules/)
      .end()

    // 设置 svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end()
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end()
  }
})
