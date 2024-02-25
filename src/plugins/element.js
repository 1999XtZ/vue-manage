import ElementPlus from "element-plus"
// 引入element-plus 的样式
import "element-plus/dist/index.css"

// 导入中文语言包
import zhCn from "element-plus/es/locale/lang/zh-cn.mjs"
import en from "element-plus/es/locale/lang/en.mjs"
import store from "@/store"

export default (app) => {
  const locale = store.getters.language === "en" ? en : zhCn
  app.use(ElementPlus, { locale })
}
