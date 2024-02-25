<template>
  <div class="navbar">
    <!-- 汉堡按钮 -->
    <Hamburger class="hamburger-container"></Hamburger>
    <!-- 动态面包屑 -->
    <Breadcrumb class="breadcrum-container"></Breadcrumb>
    <!-- 渲染用户头像：用到element-plus的两个组件 el-dropdown 和 avatar -->
    <div class="right-menu">
      <!-- el-dropdown 是 Element Plus 提供的下拉菜单组件，用于展示下拉选项。 trigger="click" 表示点击触发下拉菜单的展示 -->
      <!-- 渲染头像的容器 avatar-container -->
      <!-- 切换主题色的组件 -->
      <change-theme-color class="right-menu-item hover-effect"></change-theme-color>
      <!-- 切换语言的组件 -->
      <ChangeLanguage class="right-menu-item hover-effect"></ChangeLanguage>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            class="el-avatar"
            shape="square"
            :size="40"
            :src="$store.getters.userInfomation.avatar"
          ></el-avatar>
          <!-- class="el-icon-s-tools" 指定了要显示的图标样式，其中 el-icon-s-tools 是 Element Plus 提供的一个图标样式 -->
          <!-- <i class="el-icon-s-tools"></i> -->
        </div>
        <!-- 下拉选项 -->
        <!-- #dropdown 是 Vue 3 中的插槽语法，用于具名插槽的定义。在这个插槽中，你可以放置一些内容，然后在父组件中使用 <template v-slot:dropdown> 或者简写为 <template #dropdown> 来指定这个插槽的内容 -->
        <template v-slot:dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <!-- el-dropdown-item 是 Element Plus 组件库中的一个下拉菜单项组件 -->
              <el-dropdown-item>{{ $t('msg.navBar.home') }}</el-dropdown-item>
            </router-link>
            <a href="https://www.bilibili.com/" target="__blank">
              <el-dropdown-item>{{ $t('msg.navBar.course') }}</el-dropdown-item>
            </a>
            <!-- divided 属性用于在下拉菜单中当前项与其他项之间添加分隔线，这样就会在退出登录项上方添加一条分隔线，使得 UI 更加清晰 -->
            <el-dropdown-item
              divided
              @click="$store.dispatch('userInfo/logout')"
            >{{ $t('msg.navBar.logout') }}</el-dropdown-item>
            <!-- 退出登录：1. 用户主动退出 2. 用户被动退出(token过期 或 被其他人顶下来) -->
            <!-- 退出登录的操作是固定的：清理当前用户缓存数据、清理掉权限相关配置、返回到登录页 -->
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
// 导入 汉堡按钮 组件
import Hamburger from "@/components/Hamburger"
// 导入 动态面包屑 组件
import Breadcrumb from '@/components/Breadcrumb/index.vue'
// 导入 国际化 组件
import ChangeLanguage from '@/components/ChangeLanguage/index.vue'
// 导入 切换主题色 组件
import ChangeThemeColor from '@/components/ChangeThemeColor/index.vue'
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    // hover 动画
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .breadcrum-container {
    float: left;
  }
}

.right-menu {
  display: flex;
  align-items: center;
  float: right;
  padding-right: 16px;

  .right-menu-item {
    display: inline-block;
    padding: 0 50px;
    font-size: 30px;
    color: #5a5e66;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
    }
  }

  .avatar-container {
    cursor: pointer;

    .avatar-wrapper {
      margin-top: 5px;
      position: relative;

      .el-avatar {
        // --el-avatar-background-color: none;
        background-color: transparent;
        margin-right: 20px;
      }
    }
  }
}
</style>
