<template>
  <div class>
    <!-- 渲染角色列表 -->
    <el-card>
      <!--  el-table 元素中注入 data 对象数组后,在 el-table-column 中用 prop 属性来对应对象中的键名即可填入数据 -->
      <!-- stripe 属性控制是否斑马表格 -->
      <el-table stripe :data="allRoles" style="width: 100%">
        <!-- 序号 -->
        <el-table-column type="index" :label="$t('msg.role.index')"></el-table-column>
        <!-- 名称 -->
        <el-table-column :label="$t('msg.role.name')" prop="title"></el-table-column>
        <!-- 描述 -->
        <el-table-column :label="$t('msg.role.desc')" prop="describe"></el-table-column>
        <!-- 权限控制操作 -->
        <el-table-column :label="$t('msg.role.action')" width="200">
          <!-- <slot name="default"></slot>默认插槽名字为default -->
          <!-- el-table-column 组件中的内容(el-button组件)是插槽内容，而插槽出口在el-table-column的<slot></slot>里 即el-button 将被渲染到 el-table-cloumn 的模板template 的 默认插槽中 -->
          <!-- row 通常表示 el-table 中的一行数据 -->
          <!-- #default="{row}" 表示 <slot></slot>vue内置组件的使用者(el-table-colum)，接收到了 通过解构赋值将 row 参数传递给这个 -->
          <!-- 权限控制的按钮 -->
          <template #default="{row}">
            <el-button
              type="primary"
              @click="onDistributePermissionClick(row)"
            >{{ $t('msg.role.assignPermissions') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--在角色列表里，为角色分配权限  -->
    <distribute-permission v-model="visiable" :roleId="selectRoleId"></distribute-permission>
  </div>
</template>

<script setup>
// 导入发送ajax请求的api
import { roleList } from '@/api/role.js'
import { ref } from "vue"
import DistributePermission from "./components/DistributePermission.vue"

// 存储角色列表的变量
const allRoles=ref([])
// 获取角色列表的方法getRoleList
const getRoleList=async () => {
  allRoles.value=await roleList()
  console.log("allRoles:",allRoles.value)
}
getRoleList()

// 点击按钮，为角色分配权限
// 点击按钮时，是为哪个角色分配权限，selectRoleId 变量表示该角色的id
const selectRoleId=ref('')
const visiable=ref(false)
const onDistributePermissionClick=(row) => {
  visiable.value=true
  // console.log("row:",row)
  selectRoleId.value=row.id
}

</script>

<style lang="scss" scoped>
</style>