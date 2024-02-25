// 导入layout组件，不再懒加载路由组件
import layout from "@/layout"

// 默认导出用户管理路由表
export default {
  // 用户相关
  path: "/user",
  component: layout,
  redirect: "/user/manage",
  // 这里的名字跟ajax返回的用户信息的"permission"字段中的"menus"字段里 某个元素一致
  name: "userManage",
  meta: {
    title: "user",
    icon: "personnel"
  },

  // 可访问三个页面
  children: [
    {
      path: "/user/manage",
      // name: "userManage",
      component: () => import("@/views/user-manage/index"),
      meta: {
        // 这里的title 跟后续国际化的 自定义切换语言 有关，因此title的内容要根据 @/i18n/lang/zh.js 中的内容写
        title: "userManage",
        icon: "personnel-manage"
      }
    },
    {
      path: "/user/info/:id",
      // name: "userInfo",
      component: () => import("@/views/user-info/index"),
      meta: {
        title: "userInfo"
      }
    },
    {
      path: "/user/import",
      name: "import",
      component: () => import("@/views/import/index"),
      meta: {
        title: "excelImport"
      }
    }
  ]
}
