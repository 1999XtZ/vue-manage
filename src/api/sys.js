import myRequest from "@/utils/request.js"

// 封装登录的请求 —— 得到一个promise实例对象
export const login = (data) => {
  return myRequest({
    url: "sys/login",
    method: "post",
    data
  })
}

// 获取用户信息
/* 获取用户信息需要对应的token，可以利用axios的请求拦截器对token进行统一注入 */
export const getUserInfo = () => {
  return myRequest({
    url: "/sys/profile",
    method: "get"
  })
}
