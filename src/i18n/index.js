import { createI18n } from "vue-i18n"
import zhLocale from "./lang/zh"
import enLocale from "./lang/en"
import store from "@/store"

// 1. 创建两种语言的数据源
const messages = {
  en: {
    msg: {
      // test: "hello"
      ...enLocale
    }
  },
  zh: {
    msg: {
      // test: "你好"
      ...zhLocale
    }
  }
}

// 2. 创建一个控制语言切换的变量 —— changeLanguage
// 获取本地缓存中的最新语言状态，再赋值给locale
const getlocalStorageLanguage = () => {
  return store && store.getters && store.getters.language
}
// const locale = "zh"

// 3. 初始化 i18n 实例对象
const i18n = createI18n({
  // 4个配置对象
  // 由于是组合式API，因此该属性设置为
  legacy: false,
  // 全局使用 t 函数
  globalInjection: true,
  locale: getlocalStorageLanguage(),
  messages
})

export default i18n
// 在入口文件处，执行第4步，注册i18n实例
