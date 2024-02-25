// 处理与用户相关的数据
import { login, getUserInfo } from "@/api/sys.js"
import md5 from "md5"
import { getItem, setItem, clearAllItem } from "@/utils/storage.js"
// 导入token常量
import { TOKEN } from "@/constant"
import router from "@/router/index.js"
import { setTimeStamp } from "@/utils/auth.js"

export default {
  // 表示这是一个单独的模块，模块的所有内容都将被包装在命名空间中，防止与其他模块的命名冲突。
  namespaced: true,

  state: () => {
    return {
      token: getItem(TOKEN) || "",
      userInfo: {}
    }
  },

  actions: {
    // 登录请求动作
    reqLogin(context, userInfo) {
      const { username, password } = userInfo
      // const result = await login(data)
      // 在login.vue组件中触发reqLogin方法，得到一个promise实例对象
      return new Promise((resolve, reject) => {
        login({
          username,
          // 使用 md5 对密码进行加密(不能明文传输密码！)
          password: md5(password)
        })
          .then((data) => {
            // 登录成功之后，触发mutations，同时保存登录时间
            // console.log("data:", data, "this:", this)
            // 跳转
            router.push("/")
            // 保存登录时间
            setTimeStamp()
            this.commit("userInfo/setToken", data.token)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    // 在layout组件中，获取用户信息
    async reqUserInfo(context) {
      const result = await getUserInfo()
      // console.log("result:", result)
      // 在 Vuex 的 actions 中，this 指向当前的 Vuex store 实例
      this.commit("userInfo/setUserInfo", result)
      return result
    },

    // 退出登录
    logout() {
      this.commit("userInfo/setToken", "")
      this.commit("userInfo/setUserInfo", {})
      // 清空缓存
      clearAllItem()
      // 清理掉权限相关的配置
      // 返回登录页面
      router.push("/login")
    }
  },

  mutations: {
    setToken(state, value) {
      state.token = value
      setItem(TOKEN, value)
    },
    // 修改小仓库state里的userInfo
    setUserInfo(state, result) {
      state.userInfo = result
    }
  }
}
