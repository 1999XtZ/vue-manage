// 按需引入的createApp方法来创建vue实例
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
// import { createPinia } from "pinia"
// app.use(createPinia())

// 引入element-plus
// import "@/plugins/element.js"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
// 引入全局样式表
import "@/styles/index.scss"
// 导入路由鉴权
import "./permission.js"
// 导入 svgIcon
import installIcons from "@/icons"
// 导入 实现国际化 的i18n实例对象
import i18n from "@/i18n/index.js"
// 导入全局属性 相当于vue2 的过滤器
import installFilter from "@/filters/index.js"

// createApp() 是 Vue 3 中用于创建 Vue 应用程序实例的工厂函数。它接受一个根组件 App 作为参数，并返回一个应用程序实例对象app
const app = createApp(App)
// use方法挂载插件(仓库、路由器)，挂载到vue实例对象上
installIcons(app)
// 过滤器函数接收vue实例作为参数
installFilter(app)
app.use(ElementPlus)
app.use(store).use(router).use(i18n).mount("#app")
