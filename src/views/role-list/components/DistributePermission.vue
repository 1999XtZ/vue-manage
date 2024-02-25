<template>
  <el-dialog :title="$t('msg.excel.roleDialogTitle')" :model-value="modelValue" @close="closed">
    <!--  node-key="id" 表示节点树 中的唯一标识是id -->
    <!-- show-checkbox 用于显示树节点前的复选框。设置为 true 表示显示复选框 -->
    <el-tree
      ref="treeRef"
      :data="allPermission"
      show-checkbox
      check-strictly
      node-key="id"
      default-expand-all
      :props="defaultProps"
    ></el-tree>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">
          {{
          $t('msg.universal.confirm')
          }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps,defineEmits,ref,watch } from 'vue'
import { permissionList } from '@/api/permission'
import { watchSwitchLang } from '@/utils/i18n'
import { rolePermission,distributePermission } from '@/api/role.js'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

const props=defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})
const emits=defineEmits(['update:modelValue'])

// 获取所有权限
const allPermission=ref([])
const getPermissionList=async () => {
  allPermission.value=await permissionList()
}
getPermissionList()
watchSwitchLang(getPermissionList)

// 属性结构配置
const defaultProps={
  children: 'children',
  label: 'permissionName'
}

// tree 节点 创建一个 treeRef，用于存储ref标记的内容(可能是DOM元素、可能是组件)
const treeRef=ref(null)

// 获取当前角色的权限 —— 要发送ajax请求才能知道当前角色有什么权限
const getRolePermission=async () => {
  const checkedKeys=await rolePermission(props.roleId)
  // console.log("checkedKeys:",checkedKeys)  checkedKeys是一个数组，每个元素对应权限的key值 ，例如员工管理对应'1'，分配角色对应'1-1'
  // treeRef.value获取到 树型控件 这个DOM元素
  // 该DOM元素有一个方法setCheckedKeys()：若节点的node-key属性的属性值存在于数组checkedKeys中，对应的节点将被选中。使用此方法必须设置 node-key 属性
  treeRef.value.setCheckedKeys(checkedKeys)
}

// 在watch里调用getRolePermission —— 当prop.roleId发生变化时(由null变成当前角色的id时)，再去发送请求
watch(
  () => props.roleId,
  val => {
    if(val) getRolePermission()
  }
)

/**
*  点击"确定"按钮
 */
const i18n=useI18n()
const onConfirm=async () => {
  // 1. 发请求，表示为该角色修改权限
  await distributePermission({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys()
  })
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  closed()
}

/**
 * 关闭
 */
const closed=() => {
  emits('update:modelValue',false)
}
</script>

<style lang="scss" scoped></style>