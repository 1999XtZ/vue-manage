import { getItem, setItem } from "@/utils/storage"
import { LANG } from "@/constant/index.js"

// sidebar 左侧菜单伸缩功能

export default {
  namespaced: true,

  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || "zh"
  }),

  actions: {},

  mutations: {
    /**
     * 设置国际化
     */
    setLanguage(state, lang) {
      setItem(LANG, lang)
      state.language = lang
    }
  }
}
