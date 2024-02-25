<template>
  <!-- 下拉框组件 -->
  <!-- v-bind="$attrs" 表示：将父组件中传递给当前组件 ChangeThemeColor 的所有非 prop 特性绑定到 el-dropdown 组件上。好处：可以让 el-dropdown 组件继承父组件传递的特性，而不需要在 el-dropdown 组件中显式声明这些特性  -->
  <el-dropdown v-bind="$attrs" trigger="click" class="theme" @command="handleSetThemeColor">
    <!-- 图标 -->
    <div>
      <!-- 鼠标移入图标时，显示的文字 -->
      <el-tooltip :content="$t('msg.navBar.themeChange')"></el-tooltip>
      <svg-icon icon="change-theme"></svg-icon>
    </div>
    <!-- menu -->
    <!-- 具名插槽：可以在 #dropdown 插槽中定义任意数量的下拉菜单项，这些内容将会显示在 el-dropdown 组件的下拉菜单中 -->
    <template #dropdown>
      <el-dropdown-item command="color">{{ $t('msg.theme.themeColorChange') }}</el-dropdown-item>
    </template>
  </el-dropdown>
  <!-- 弹出层 -->
  <div></div>
</template>

<script setup>
// 这里接收的command是 el-dropdown-item 中command属性的值
const handleSetThemeColor=(command) => { }
</script>

<style lang="scss" scoped>
</style>
