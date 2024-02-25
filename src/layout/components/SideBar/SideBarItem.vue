<template>
  <!-- 根据父组件sidebarMenu 传递过来的route渲染出一二三级菜单 -->
  <!-- 当遍历的route有children时，展示在el-sub-menu中 -->
  <el-sub-menu v-if="route.children.length > 0" :index="route.path">
    <template #title>
      <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
    </template>
    <!-- 循环渲染children -->
    <side-bar-item v-for="item in route.children" :key="item.path" :route="item"></side-bar-item>
  </el-sub-menu>
  <!-- 当遍历的route没有children时，展示在el-menu-item中 -->
  <el-menu-item v-else :index="route.path">
    <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
  </el-menu-item>
</template>

<script setup>
import MenuItem from "./MenuItem.vue"
// import SideBarMenu from "./SideBarMenu.vue"
import { defineProps } from 'vue'
// 接收父组件SideBarMenu 传递过来的参数item
defineProps({
  route: {
    type: Object,
    require: true
  }
})

</script>

<style lang="scss" scoped>
</style>
