import store from "@/store"
import axios from "axios"
import { ElMessage } from "element-plus"
import { isCheckTimeout } from "@/utils/auth.js"

// 创建一个axios实例对象
const myRequest = axios.create({
  // 动态的baseURL，根据生产环境或者开发环境不同而切换
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
myRequest.interceptors.request.use(
  // 请求成功后
  (config) => {
    // 配置请求头(将icode添加到每次请求的请求头中)
    config.headers.icode = "100DB175C640CB64"
    // 统一注入token
    if (store.getters.token) {
      // 如果本地中存在token，判断一下是否时效过期 —— isCheckTimeout()函数返回true 表示token时效过了
      if (isCheckTimeout()) {
        // 超时，执行 退出 操作，即触发userInfo仓库中actions里的logout方法
        store.dispatch("userInfo/logout")
        return Promise.reject(new Error("token 失效"))
      }

      // 请求头中携带token的常用方式
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  },
  // 请求失败后
  (err) => {
    return Promise.reject(err)
  }
)

// 响应拦截器
myRequest.interceptors.response.use(
  // 请求成功后，响应拦截器的处理
  (response) => {
    // console.log("response:", response)
    const { success, message, data } = response.data
    // console.log("response中的data:", data)
    // 判断当前请求是否成功
    // 成功的话，则返回解析后的数据
    if (success) {
      return data
    } else {
      // 失败的话(请求成功，业务失败)，消息提示
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  // 请求失败后，响应拦截器的处理
  (err) => {
    // 账号是否在另外设备登录？？服务端返回的状态码为401时，表明状态码过期
    if (err.response && err.response.data && err.response.data.code === 401) {
      store.dispatch("userInfo/logout")
    }
    ElMessage.error(err.message)
    return Promise.reject(err)
  }
)

// 导出axios实例对象
export default myRequest
