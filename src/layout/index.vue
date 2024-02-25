<template>
  <!-- 登录鉴权的对比页面 -->
  <!-- 登录鉴权：1. 当用户未登录时(没有token时，不允许进入到除了login外的其他页面) 2. 用户登录后，token未过期之前，不允许进入login页面 -->
  <!-- 实现路由鉴权的最好方法：路由守卫 -->
  <div class="app-wrapper" :class="[$store.getters.sidebarOpened? 'openSidebar' : 'hideSidebar']">
    <!-- 左侧 menu -->
    <!-- 如何实现sidebar的主题色更换？？将backgroundColor设置为一个变量 -->
    <SideBar class="sidebar-container" :style="{ backgroundColor: $store.getters.cssVar.menuBg}"></SideBar>
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部 navbar -->
        <NavBar></NavBar>
      </div>
      <!-- 内容区 -->
      <AppMain></AppMain>
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar/index.vue'
import SideBar from './components/SideBar/index.vue'
import AppMain from './components/AppMain/index.vue'
// import variables from '@/styles/variables.module.scss'

// console.log("variables:",variables) 由于vue-cli版本问题问题，需要将variables.scss文件变成variables.module.scss
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.module.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  // 折叠或者展开的动画
  transition: width #{$sidebarDuration};
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hidesideBarWidth});
}
</style>
