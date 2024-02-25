<template>
  <div class="hamburger-container" @click="toggleClick">
    <svg-icon
      class="hamburger"
      :icon="$store.getters.sidebarOpened? 'hamburger-opened':'hamburger-closed'"
    ></svg-icon>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

const store=useStore()
const toggleClick=() => {
  store.commit('app/triggerSidebarOpened')
}
</script>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;

  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
