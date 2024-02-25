<template>
  <!-- 点击"角色"，给员工赋予别的角色 -->
  <!-- el-dialog 组件渲染对话框 -->
  <el-dialog :title="$t('msg.excel.roleDialogTitle')" :model-value="modelValue" @close="closed">
    <!-- 弹窗里面有什么？1. 内容部分(再嵌套一个组件) -->
    <!-- 多选框组件el-checkbox-group -->
    <el-checkbox-group v-model="userRoleTitleList">
      <el-checkbox v-for="item in allRoleList" :key="item.id" :label="item.title"></el-checkbox>
    </el-checkbox-group>

    <!-- 2. 底部的 取消 确认 按钮 -->
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{ $t('msg.universal.confirm') }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { roleList } from "@/api/role.js"
import { userRoles,updateRole } from '@/api/use-manage.js'
import { defineProps,defineEmits,ref,watch } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessage } from 'element-plus'
import { useI18n } from "vue-i18n"

// 接收父组件以props形式传来的传来的modelValue
const props=defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  // 因为点击"角色"后，父组件才会将userId传过来，因此一开始的userId是null，可以采用watch监视userId的变化
  userId: {
    type: String,
    required: true
  }
})

// 在子组件中定义一个自定义事件
const emits=defineEmits(['update:modelValue','updateRoles'])

/**
 * 当点击弹窗的 取消 或 确定时
 */
// 当对话窗关闭时，触发自定义事件，向父组件传递数据 —— 即关闭子组件
// 获取i18n实例对象 ,用实例对象的t()方法，实现国际化
const i18n=useI18n()
const closed=() => {
  emits('update:modelValue',false)
}

const onConfirm=async () => {
  // 1. 点击弹窗的"确定"按钮后。此时userRoleTitleList是一个数组，存储着我们勾选的所有title
  const newRoles=userRoleTitleList.value.map(title => {
    // 返回所有角色的title 与 我们选中的title 相同的项 这样我们就得到了发送ajax请求(更新父组件角色列表 updateRole)时，要携带的参数
    return allRoleList.value.find((role) => role.title===title)
  })
  await updateRole(props.userId,newRoles)
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  // 2. 通知父组件，用户角色更新了(自定义事件！！)
  emits('updateRoles')
  // 3. 关闭弹窗
  closed()
}

// 获取所有的角色
const allRoleList=ref([])
const getRolesList=async () => {
  allRoleList.value=await roleList()
}
getRolesList()
watchSwitchLang(getRolesList)

// 用户当前的角色
const userRoleTitleList=ref([])
const getUserCurrentRole=async () => {
  const res=await userRoles(props.userId)
  console.log("用户当前的id",res)
  // 数组的map方法：用于遍历数组并对每个元素执行指定操作，返回一个新数组
  userRoleTitleList.value=res.role.map((item) => item.title)
}

// 用watch监视props.userId，当props.userId变化时，执行相应的回调函数
watch(() => props.userId,val => {
  // val表示props.userId的新值
  if(val) getUserCurrentRole()
})
</script>

<style lang="scss" scoped>
</style>
