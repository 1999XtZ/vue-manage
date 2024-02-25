// 导入layout组件，不再懒加载路由组件
import layout from "@/layout"

// 文章相关
export default {
  path: "/article",
  component: layout,
  name: "articleRanking",
  redirect: "/article/ranking",
  meta: {
    title: "article"
    // icon: "article"
  },

  // 可访问2个页面
  children: [
    {
      path: "/article/ranking",
      // name: "articleRanking",
      component: () => import("@/views/article-ranking/index"),
      meta: {
        title: "articleRanking"
        // icon: "article-ranking"
      }
    },
    {
      path: "/article/:id",
      // name: "articleDetail",
      component: () => import("@/views/article-detail/index"),
      meta: {
        title: "articleDetail"
      }
    }
  ]
}
