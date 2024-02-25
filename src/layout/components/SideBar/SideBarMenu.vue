<template>
  <!-- :unique-opened="true" 表示一次只能打开一个菜单项 -->
  <!-- :collapse="!$store.getters.sidebarOpened" 点击汉堡 将 el-menu 折叠 -->
  <el-menu
    :collapse="!$store.getters.sidebarOpened"
    :unique-opened="true"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    :default-active="activeMenu"
    router
  >
    <side-bar-item v-for="item in routes" :key="item.path" :route="item"></side-bar-item>
  </el-menu>
</template>

<script setup>
import { useRouter,useRoute } from 'vue-router'
// 引入过滤后的 routes ，并动态生成一级、二级等的sidebar菜单 , 将得到的数据放到计算属性里，然后渲染出菜单
import { filterRoutes,generateMenus } from '@/utils/route.js'
import { computed } from 'vue'
import SideBarItem from './SideBarItem.vue'

// 路由器实例对象
const router=useRouter()
// 路由器实例对象的getRouter()方法能够 获取所有的(！!) 路由记录 的完整列表 (包括新增的路由)
// 这个路由表距离我们想要的存在两个问题：存在重复的路由数据; 不满足该条件 meta && meta.title && meta.icon 的路由页面 不应该存在
// 由于路由最终会被渲染成为sidebar菜单，因此要创建 utils/route 文件，创建两个方法分别处理对应的两个问题：
// console.log("router.getRoutes:",router.getRoutes())

// 通过计算属性得到 真实的、包含结构的 routes
const routes=computed(() => {
  // 得到过滤后的路由配置数组
  const fRoutes=filterRoutes(router.getRoutes())
  // console.log("fRouters:",fRoutes)
  return generateMenus(fRoutes)
})
console.log("routes:",routes.value)

// 默认激活项 ()

// 计算高亮 menu 的方法
const route=useRoute()
const activeMenu=computed(() => {
  const { path }=route
  return path
})
</script>

<style lang="scss" scoped>
</style>
