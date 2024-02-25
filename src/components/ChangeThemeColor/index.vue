<template>
  <!-- 主题图标 v-bind：https://v3.cn.vuejs.org/api/instance-properties.html#attrs-->
  <!-- v-bind="$attrs" 表示将父组件中传递给当前组件  ChangeThemeColor 的所有非 prop 特性绑定到 el-dropdown 组件上。这样做的好处是可以将父组件中的特性直接传递给子组件，而不需要在子组件中显式声明这些特性 -->
  <!-- <ChangeThemeColor class="right-menu-item hover-effect" /> 父组件中的class可以穿透到子组件ChangeThemeColor中，而v-bind="$attrs"又保证了该class传递到el-dropdown中 -->
  <el-dropdown v-bind="$attrs" trigger="click" class="theme" @command="handleSetTheme">
    <!-- 图标 -->
    <div>
      <el-tooltip :content="$t('msg.navBar.themeChange')">
        <svg-icon icon="change-theme" />
      </el-tooltip>
    </div>
    <!-- 下拉项 -->
    <!-- 具名插槽：可以在 #dropdown 插槽中定义任意数量的下拉菜单项，这些内容将会显示在 el-dropdown 组件的下拉菜单中 -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">{{ $t('msg.theme.themeColorChange') }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 展示弹出层 用到 el-color-picker 取色器组件 -->
  <div>
    <!-- 父组件给子组件绑定一个值visiable(布尔值类型) -->
    <!-- 等价于 <SelectColor :model-value="visiable" @update:modelValue="(e)=>visiable=e.target.value" /> 意味着：父组件用props传递了modelValue属性给子组件，属性的值为visiable，同时父组件监听了子组件的自定义事件updata:modelValue，此时如果子组件内触发该事件，父组件就会接收到触发事件时传递的值，并将值赋值给visiable -->
    <select-color v-model="visiable"></select-color>
  </div>
</template>

<script setup>
import { ref } from "vue"
import SelectColor from './components/SelectColor.vue'
// 当我们点击父组件的图标(还是其他？？)，这时弹出层需要展示出来
const handleSetTheme=(command) => { visiable.value=true }

// 与子组件 实现双向数据绑定的 数据 —— 控制弹出层(子组件)是否显示，最初是隐藏的
const visiable=ref(false)
</script>

<style lang="scss" scoped>
</style>
