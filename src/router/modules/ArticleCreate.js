// 导入layout组件，不再懒加载路由组件
import layout from "@/layout"

// 文章相关
export default {
  path: "/article",
  component: layout,
  name: "articleCreate",
  redirect: "/article/ranking",
  meta: {
    title: "article"
  },
  // 可访问2个页面
  children: [
    {
      path: "/article/create",
      // name: "articleCreate",
      component: () => import("@/views/article-create/index"),
      meta: {
        title: "articleCreate"
        // icon: "article-create"
      }
    },
    {
      path: "/article/editor/:id",
      name: "articleEditor",
      component: () => import("@/views/article-create/index"),
      meta: {
        title: "articleEditor"
      }
    }
  ]
}
