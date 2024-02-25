import { createRouter, createWebHashHistory } from "vue-router"

// 导入 layout 组件
import layout from "@/layout/index.vue"

// 导入私有路由表
import UserManage from "./modules/UserManage"
import RoleList from "./modules/RoleList"
import PermissionList from "./modules/PermissionList"
import Article from "./modules/Article"
import ArticleCreate from "./modules/ArticleCreate"

// 私有路由表(需要权限才能访问的路由)
export const privateRoutes = [
  UserManage,
  RoleList,
  PermissionList,
  Article,
  ArticleCreate
]

// 公有路由表
const publicRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue")
  },
  {
    // 首页
    path: "/",
    // 重定向 —— 当访问到 '/' 时，就会重定向到 '/profile'
    redirect: "/profile",
    component: layout,
    children: [
      {
        // 个人中心 路由页面
        path: "/profile",
        name: "profile",
        component: () => import("@/views/profile/index"),
        meta: {
          // 之前制定规则时，meta里有title和icon的话，此路由组件会显示在sidebar的menu中
          title: "profile",
          icon: "user"
        }
      },
      {
        // 404 路由页面
        path: "/404",
        name: "404",
        component: () => import("@/views/error-page/404")
      },
      {
        // 404 路由页面
        path: "/401",
        name: "401",
        component: () => import("@/views/error-page/401")
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes, ...privateRoutes]
  // 为了实现对不同角色映射不同权限的管理，私有路由表和公有路由表不能合并在一起了
  // routes: publicRoutes
})

export default router
