<template>
  <el-breadcrumb separator="/" class="breadcrumb">
    <!-- 给el-breadcrumb-item 添加动画 -->
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in breadcrumbData" :key="item.path">
        <!-- 不可点击的面包屑：通常是最后一项，因为最后一项代表当前页面 -->
        <span
          class="no-redirect"
          v-if="index === breadcrumbData.length - 1"
        >{{ generateTitle(item.meta.title)}}</span>
        <!-- 可点击的面包屑 -->
        <span class="redirect" v-else @click="onLinkClick(item)">{{ generateTitle(item.meta.title)}}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
// 监听route的变化，当route变化时，通过route.match得到路由数组，动态渲染面包屑
import { watch,ref } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { generateTitle } from '@/utils/i18n'
// 获取路由器实例对象
const route=useRoute()
// 使用 route.match 属性来：获取与给定路由地址匹配的标准化的 路由记录数组
const breadcrumbData=ref([])
const getBreadcrumbData=() => {
  // console.log("route.match:",route.matched) 返回当前路由组件的path，以及上级的path，即当前路由组件的路由表数组
  // 此后，我们将有meta && meta.title 的路由筛选出来，展示到动态面包屑中
  breadcrumbData.value=route.matched.filter((item) => item.meta&&item.meta.title)
  // console.log("breadcrumbData:",breadcrumbData.value)
}
watch(route,() => {
  getBreadcrumbData()
},{
  immediate: true
})

// 将来需要主题替换，所以 可点击项hover时的颜色 设置为主色
const store=useStore()
const linkHoverColor=ref(store.getters.cssVar.menuBg)

// 跳转点击事件
const router=useRouter()
const onLinkClick=(item) => {
  router.push(item.path)
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
  }

  .redirect {
    cursor: pointer;
    color: #666;
    font-weight: 700;
  }

  .redirect:hover {
    color: v-bind(linkHoverColor);
  }
}
</style>
