<template>
  <el-dropdown class="international" trigger="click" @command="handleSetLanguage">
    <!-- 创建鼠标移入 国际化按钮 的效果 -->
    <div>
      <!-- effect 用来控制 el-tooltip 的样式，国际化样式的图标要分别展示在 登录前 和 登录后 -->
      <el-tooltip :content="$t('msg.navBar.lang')" :effect="effect">
        <svg-icon icon="language"></svg-icon>
      </el-tooltip>
    </div>
    <!-- 具名插槽：向name属性值为dropdown的元素里，插入内容 -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="currentLanguage==='zh'" command="zh">中文</el-dropdown-item>
        <el-dropdown-item :disabled="currentLanguage==='en'" command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { computed,defineProps } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

// 接收父组件传来的 effect
defineProps({
  // 在elementui 里找到tooltip(文字提示)，tooltip的effect属性只能是两个值，dark或者light
  effect: {
    type: String,
    default: 'dark',
    // 通过函数进行判断，effect的值(value)如果不在数组['dark','light']里，就不允许这个指令，
    validator: function(value) {
      return ['dark','light'].indexOf(value)!==-1
    }
  }
})

const store=useStore()
// 通过计算属性，判断当前的语言状态
const currentLanguage=computed(() => store.getters.language)

// 点击切换语言环境
// 获取i18n 实例对象
const i18n=useI18n()
const handleSetLanguage=(newLang) => {
  // 1. 切换 i18n 的语言状态（即改变locale）
  // el-dropdown-item 中的command属性名 是派发到command回调函数的指令参数（即点击‘中文’，这里的lang就是'zh'  点击‘English’，这里的lang就是'en' ）
  i18n.locale.value=newLang
  // 2. 修改vuex 中保存的语言状态
  store.commit('app/setLanguage',newLang)
  // 3. 给一个提示
  // ElMessage.success(`成功切换到${newLang}`)
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}
</script>

<style lang="scss" scope>
</style>
