<template>
  <div class>
    <div class="logo-container">
      <el-avatar
        class="el-avatar"
        :size="logoHeight"
        shape="square"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
      />
      <h1 class="logo-title" v-if="$store.getters.sidebarOpened">imooc-admin</h1>
    </div>
    <!-- sidebarmenu过长时，给一个滚动条 -->
    <el-scrollbar>
      <SideBarMenu></SideBarMenu>
    </el-scrollbar>
    <!-- 动态menu菜单：当动态路由表发生变化时，menu菜单自动发生变化。即根据路由表的配置，自动生成对应的menu菜单。步骤：1. 定义路由表对应menu菜单规则 2. 根据规则制定路由表 3. 根据规则，依据路由表，生成menu菜单 -->
  </div>
</template>

<script setup>
import SideBarMenu from './SideBarMenu.vue'
const logoHeight=44
</script>

<style lang="scss" scoped>
.logo-container {
  height: v-bind(logoHeight) + "px";
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }

  .el-avatar {
    // 处理主题色变化后，头像的底色
    background-color: transparent;
  }
}
</style>
