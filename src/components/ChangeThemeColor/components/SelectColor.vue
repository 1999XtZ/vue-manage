<template>
  <!-- 颜色选择的组件 SelectColor -->
  <!-- el-dialog 以弹出层的形式展示 -->
  <!-- vue3中，组件间的双向数据绑定可以使用v-model：子组件通过v-bind绑定父组件传来的数据modelValue -->
  <!-- 弹出层宽度是22% -->
  <el-dialog
    :title="$t('msg.universal.title')"
    v-bind:model-value="modelValue"
    @close="unvisiable"
    width="22%"
  >
    <!-- 弹出层的内容区：在内容区中选择颜色，使用取色器组件 -->
    <div class="center">
      <p class="title">{{ $t('msg.theme.themeColorChange') }}</p>
      <!-- predefine 表示初始的、可选的值 -->
      <el-color-picker v-model="myColor" :predefine="predefineColors"></el-color-picker>
    </div>
    <!-- 弹出层的footer -->
    <template #footer>
      <!-- "取消"按钮 -->
      <el-button @click="unvisiable">{{$t('msg.universal.cancel') }}</el-button>
      <!-- "确定"按钮 -->
      <el-button type="primary" @click="confirm">{{$t('msg.universal.confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps,defineEmits,ref } from 'vue'
import { useStore } from 'vuex'
import { writeNewStyle,generateNewStyle } from '@/utils/elementThemeColor'
// 接收父组件传来的 modelValue，顺便将其解构出来
// 随后子组件用v-bind，将modelValue绑定给model-value
defineProps({
  modelValue: {
    type: Boolean,
    // 必传
    require: true
    // 默认值为false
    // default: false
  }
})

// 子组件声明 一个自定义事件 'update:modelValue' —— 该事件可以告诉父组件，modelValue发生了变化
const emits=defineEmits(['update:modelValue'])

// 点击"取消"按钮时，触发自定义事件'update:modelValue'，同时传递值false，这样的话父组件中的visiable变量 == false
const unvisiable=() => {
  // 通知父组件，modelValue的值发生了变化，变成了false
  emits('update:modelValue',false)
}

// 点击"确定"按钮时，
const store=useStore()
const confirm=async () => {
  // 1. 修改 element-plus 的主题色
  const newStyleText=await generateNewStyle(myColor.value)
  writeNewStyle(newStyleText)
  // 2. 将默认主题色myColor 保存到vuex中
  store.commit('themeColor/setNewColor',myColor.value)
  // 3. 将弹出层(子组件)关闭掉
  unvisiable()
}

// 初始主题色
const myColor=ref(store.getters.newColor)

// 初始的预定义色值
const predefineColors=[
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
]

</script>

<style lang="scss" scoped>
.center {
  text-align: center;

  .title {
    margin-bottom: 12px;
  }
}
</style>
