// 处理路由守卫

import router from "@/router"
import store from "@/store"

// 定义一个白名单 —— 表示用户未登录，没有权限时，也能进入的页面
const whiteList = ["/login"]

// 路由前置守卫 —— to 从哪里来  from 到哪里去  next 是否放行
router.beforeEach(async (to, from, next) => {
  // 1. 用户已登录，则不允许跳转到login路由组件（如果本地存储有token，表示用户已登录）
  if (store.getters.token) {
    if (to.path === "/login") {
      // 如果用户已登录，ta还想进入login，就让ta进入首页
      next("/")
    } else {
      // 如果用户未登录，ta想进入login，就让ta跳转到login吧！
      // 判断用户资料是否存在，如果不存在，则dispatch获取用户信息
      if (!store.getters.hasUserInfo) {
        // 解析出用户数据中的权限"permission" const { permission } =
        await store.dispatch("userInfo/reqUserInfo")
        // 处理用户权限 —— 调用store中permission模块中action，筛选出根据权限需要添加的路由
        // const fliterRoutes = await store.dispatch(
        //   "permission/filterRoutes",
        //   permission.menus
        // )
        /**
         * addRoute 将一个路由配置对象 route 添加到路由器
         */
        // fliterRoutes.forEach((route) => router.addRoute(route))
        // next(to.path)
        // 添加动态路由后，需要进行一次主动跳转，才会生效

        // console.log("re:", re)
        // console.log("store:", store.state.userInfo.userInfo.avatar)
      }
      next()
    }
  } else {
    // 2. 用户未登录，只允许进入login
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next("/login")
    }
  }
})
