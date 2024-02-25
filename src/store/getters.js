// getters起到 快捷访问 的作用

import { generateColors } from "@/utils/elementThemeColor"
import { getItem } from "@/utils/storage.js"
import { NEW_COLOR } from "@/constant"

const getters = {
  // state是大仓库，读取小仓库userInfo中的token。 这里是直接从vuex中的state取数据
  token: (state) => state.userInfo.token,
  // 如果返回的不是一个空对象(即 return true)，则认为用户登录成功
  hasUserInfo: (state) => {
    return JSON.stringify(state.userInfo.userInfo) !== "{}"
  },
  // 用户的信息
  userInfomation: (state) => state.userInfo.userInfo,

  // 切换主题颜色
  // cssVar: (state) => variables,
  cssVar: (state) => {
    // 对于vuex而言，getters相当于它的计算属性，只有依赖的值发生变化，getters才会重新计算
    return {
      ...state.themeColor.variables,
      ...generateColors(getItem(NEW_COLOR))
    }
  },

  // sidebar 左侧菜单伸缩功能
  sidebarOpened: (state) => state.app.sidebarOpened,
  // vuex中的语言状态，也是本地缓存中的语言状态
  language: (state) => state.app.language,

  // 新选中的主题色
  newColor: (state) => state.themeColor.newColor
}
export default getters
