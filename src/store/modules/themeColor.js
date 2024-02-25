// vuex仓库中存储 SelectColor 组件 点击的主题颜色
import { getItem, setItem } from "@/utils/storage"
import { NEW_COLOR, DEFAULT_COLOR } from "@/constant/index.js"
import variables from "@/styles/variables.module.scss"

export default {
  namespaced: true,

  state: () => ({
    newColor: getItem(NEW_COLOR) || DEFAULT_COLOR,
    variables: variables
  }),

  actions: {},

  mutations: {
    // 修改主题色
    setNewColor(state, newCol) {
      state.newColor = newCol
      state.variables.menuBg = newCol
      setItem(NEW_COLOR, newCol)
    }
  }
}
