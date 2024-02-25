<template>
  <!-- 渲染图标 -->
  <!-- 1. element icon -->
  <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></i>
  <!-- 2. 非element icon-->
  <svg-icon v-else :icon="icon"></svg-icon>
  <!-- 渲染文本 -->
  <span>{{ generateTitle(title) }}</span>
</template>

<script setup>
import { generateTitle } from '@/utils/i18n'
import { defineProps } from 'vue'
defineProps({
  title: {
    type: String,
    require: true
  },
  icon: {
    type: String,
    require: true
  }
})

</script>

<style lang="scss" scoped>
</style>
