<template>
  <!-- element-plus@2.5.5 已经支持i18n 的语言切换 -->
  <!-- <el-config-provider :locale="$store.getters.language === 'en' ? en : zhCn"> -->
  <router-view />
  <!-- </el-config-provider> -->
</template>

<script setup>
// 已经完成了 element-plus 的主题变更，但是当前的主题变更还有一个小问题，那就是：在刷新页面后，新主题会失效
// 那么出现这个问题的原因，非常简单：因为没有写入新的 style
// 所以我们只需要在 应用加载后，写入 style 即可
// 那么写入的时机，我们可以放入到 app.vue 中
import { useStore } from 'vuex'
import { writeNewStyle,generateNewStyle } from '@/utils/elementThemeColor.js'
const store=useStore()
generateNewStyle(store.getters.newColor).then((newStyle) => {
  writeNewStyle(newStyle)
})
// 导入 element-plus 的中英文语言包
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// import en from "element-plus/es/locale/lang/en.mjs"
</script>

<style>
</style>
