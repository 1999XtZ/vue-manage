import { createStore } from "vuex"
// import { defineStore } from "pinia"
import userInfo from "./modules/user.js"
import app from "./modules/app.js"
import themeColor from "./modules/themeColor"
import getters from "./getters"
import permission from "./modules/permission"

export default createStore({
  // 将getters注册为vuex的getters
  getters,
  modules: {
    userInfo,
    app,
    themeColor,
    permission
  }
})
