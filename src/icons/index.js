// 1. 导入所有的svg图标
// 2. 完成 SvgIcon 组件的全局注册（避免后续用到时，还需要注册啥的）
import SvgIcon from "@/components/SvgIcon/index.vue"

// https://webpack.docschina.org/guides/dependency-management/#requirecontext
// 通过 require.context() 函数来创建自己的 context
const svgRequire = require.context("./svg", false, /\.svg$/)
// 此时返回一个 require 的函数，可以接受一个 request 的参数，用于 require 的导入。
// 该函数提供了三个属性，可以通过 require.keys() 获取到所有的 svg 图标
// 遍历图标，把图标作为 request 传入到 require 导入函数中，完成本地 svg 图标的导入
svgRequire.keys().forEach((svgIcon) => svgRequire(svgIcon))

export default (app) => {
  // 将 SvgIcon 组件全局注册，以后使用时，使用 <svg-icon></svg-icon> 即可
  app.component("svg-icon", SvgIcon)
}
