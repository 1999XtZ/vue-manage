// 处理 页面权限 相关
import { publicRoutes, privateRoutes } from "@/router"

export default {
  namespaced: true,

  state: () => ({
    // 路由表：初始时的路由表
    routes: publicRoutes
  }),

  actions: {
    /**
     * 根据权限数据筛选路由:
     * 1. 获取用户信息，其中包含了"permission"字段，里面的"menus"数组代表该用户的页面权限
     * 2. 为"menus"数组里每个元素对应的私有路由指定name，如果menus，存在于menus数组里，说明该用户可访问对应的私有路由表
     * 3. 因此还需要处理一下私有路由表，将menus数组里每一个元素变成顶层路由，它的children就是该用户可访问的所有路由。—— 在routes文件夹中新建modules ，里面的每一个js文件对应一个menus元素
     * @param {*} content
     * @param {*} menus 权限数据 —— 一个数组，表示该用户所拥有的权限 "userManage" "roleList" "permissionList" "articleCreate" "articleRanking" 中的一个或多个
     */
    filterRoutes(context, menus) {
      // routes 表示筛选之后，经过 addRoute 进行添加的私有路由表数组
      const routes = []
      // 遍历权限数据
      menus.forEach((element) =>
        // 在私有路由表中进行匹配，返回所有匹配上的私有路由
        routes.push(...privateRoutes.filter((item) => item.name === element))
      )

      /**
       * 所有不匹配的路由，全部进入 404 路由配置
       * 注意：该配置必须在所有路由之后
       *
       * 往routes里添加完所有动态路由之后，如果有不匹配的，进入404路由
       */
      routes.push({
        path: "/:catchAll(.*)",
        redirect: "/404"
      })
      context.commit("setRoutes", routes)
      return routes
    }
  },

  mutations: {
    setRoutes(state, newRoutes) {
      state.routes = [...publicRoutes, ...newRoutes]
    }
  }
}
