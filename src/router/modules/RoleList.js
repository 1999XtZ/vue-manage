// 导入layout组件，不再懒加载路由组件
import layout from "@/layout"

// 默认导出用户管理路由表
export default {
  // 用户相关
  path: "/user",
  component: layout,
  redirect: "/user/manage",
  // 这里的名字跟ajax返回的用户信息的"permission"字段中的"menus"字段里 某个元素一致
  name: "roleList",
  meta: {
    title: "user",
    icon: "personnel"
  },
  // 可访问一个页面
  children: [
    {
      path: "/user/role",
      // name: "userRole",
      component: () => import("@/views/role-list/index"),
      meta: {
        title: "roleList",
        icon: "role"
      }
    }
  ]
}
