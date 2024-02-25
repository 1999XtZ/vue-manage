<template>
  <div class="app-main">
    <!-- 路由出口 (点击sidebar里的东西，路由出口在appmain里)-->
    <router-view></router-view>
  </div>
</template>

<script setup>
import { } from 'vue'
</script>

<style lang="scss" scoped>
.app-main {
  // 浏览器可视区域的高度是 100vh
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
