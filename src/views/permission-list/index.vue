<template>
  <div>
    <el-card>
      <!-- 由于权限列表是分为一二级的，所以需要树形结构 -->
      <!-- row-key 表示当前这一行的key值,id是服务端返回数据中的id -->
      <!-- default-expand-all 表示一开始展开所有数据 -->
      <!-- children 表示当前子级的字段; hasChildren 用于指定哪些行是包含子节点的-->
      <el-table
        stripe
        :data="allPermission"
        style="width:100%"
        row-key="id"
        default-expand-all
        :tree-props="{ children:'children', hasChildren: 'hasChildren'}"
      >
        <!--  lable是为了实现国际化 -->
        <!-- 权限名称 -->
        <el-table-column prop="permissionName" :label="$t('msg.permission.name')"></el-table-column>
        <!-- 权限标识 -->
        <el-table-column prop="permissionMark" :label="$t('msg.permission.name')"></el-table-column>
        <!-- 权限描述 -->
        <el-table-column prop="permissionDesc" :label="$t('msg.permission.name')"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { permissionList } from '@/api/permission.js'

// 存储权限列表的变量
const allPermission=ref([])
// 获取权限列表
const getPermissionList=async (roleId) => {
  allPermission.value=await permissionList(roleId)
  console.log("allPermission.value:",allPermission.value)
}
getPermissionList()

</script>

<style lang="scss" scoped>
</style>
