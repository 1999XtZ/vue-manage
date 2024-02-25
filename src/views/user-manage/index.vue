<template>
  <div class="user-manage-container">
    <!-- el-card 是卡片视图，将信息聚合在卡片容器中展示 -->
    <!-- 两个按钮：excel导入 excel导出 -->
    <!-- type属性表示button的类型 -->
    <el-card class="header">
      <!-- <div class>
        <el-button type="primary" @click="onImportExcel">{{ $t('msg.excel.importExcel') }}</el-button>
        <el-button type="success">{{ $t('msg.excel.exportExcel') }}</el-button>
      </div>-->
    </el-card>
    <el-card>
      <!-- 表格 table -->
      <!-- :data="tableData"表示表格里的数据来源 -->
      <el-table stripe :data="tableData" style="width:100%">
        <!-- 表格第1列展示：索引 el-table-column 组件表示组件的每一列  -->
        <!-- label属性 —— 被用来定义每一列的标题; type属性 —— 每一列的类型 prop属性 —— 定义了表格中每列数据的字段名，它告诉表格从数据项中取出哪个字段的值来显示在对应列中-->
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <!-- 表格第2列展示：姓名 -->
        <el-table-column prop="username" :label="$t('msg.excel.name')" width="100"></el-table-column>
        <!-- 表格第3列展示：手机号 -->
        <el-table-column prop="mobile" :label="$t('msg.excel.mobile')" width="130"></el-table-column>
        <!-- 表格第4列展示：头像 -->
        <el-table-column :label="$t('msg.excel.avatar')" width="100">
          <!-- table默认不展示头像数据，因此用插槽  row 通常是在 v-for 循环中用于表示当前循环项的一个变量名。在 <el-table-column> 组件的插槽中，row 是指当前行的数据对象，你可以在插槽中使用它来访问当前行的属性值-->
          <template v-slot="{ row }">
            <el-image class="avatar" :src="row.avatar" :preview-src-list="[row.avatar]"></el-image>
          </template>
        </el-table-column>
        <!-- 表格第5列展示：角色 -->
        <el-table-column :label="$t('msg.excel.role')" width="180">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag class="el-tag" v-for="item in row.role" :key="item.id">{{ item.title }}</el-tag>
            </div>
            <div v-else>
              <el-tag class="el-tag" size="mini">{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- 表格第6列展示：时间  prop="openTime" 会展示时间戳 -->
        <el-table-column :label="$t('msg.excel.openTime')" width="120">
          <template #default="{ row }">{{ $filters.dateFilter(row.openTime) }}</template>
        </el-table-column>
        <!-- 表格第7列展示：操作 -->
        <el-table-column :label="$t('msg.excel.action')" fixed="right" width="240">
          <!-- 具名插槽里要获取到当前这一行的数据，才能将row.id传出去 -->
          <template #default="{row}">
            <el-button type="primary">{{ $t('msg.excel.show') }}</el-button>
            <el-button type="info" @click="onShowRoleDialog(row)">{{ $t('msg.excel.showRole') }}</el-button>
            <el-button type="danger" @click="removeUser(row)">{{ $t('msg.excel.remove') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 放置分页器 -->
      <!-- page-sizes 表示会有一个弹窗，修改每页展示的用户数量 -->
      <!-- layout 表示左侧会展示什么数据 -->
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        v-model:page-size="size"
        v-model:current-page="page"
        :page-sizes="[2, 5, 10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 点击"角色" 后的弹窗(子组件) -->
    <!--@updateRoles="getListData" 在父组件中，给子组件绑定自定义事件，事件名字updateRoles，事件触发的回调函数是getListData（该方法是渲染table的发送ajax请求方法，所以无需子组件传递来数据） -->
    <RolesDialog v-model="roleDialogVisiable" :userId="userCurId" @updateRoles="getListData"></RolesDialog>
  </div>
</template>

<script setup>
import { ref,watch } from 'vue'
// import { useRouter } from 'vue-router'
import { getUserManageList,deleteUser } from '@/api/use-manage.js'
import { ElMessageBox,ElMessage } from "element-plus"
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n.js'
import RolesDialog from './components/RoleDialog.vue'

// 定义 用户数据 相关的变量
const tableData=ref([])
// 一共有多少条数据，默认为 0条
const total=ref(0)
// 页数
const page=ref(1)
// 表格里显示的用户数量
const size=ref(2)

// 获取服务器数据
const getListData=async () => {
  const result=await getUserManageList({
    page: page.value,
    size: size.value
  })
  console.log("result:",result)
  tableData.value=result.list
  total.value=result.total
  // console.log("size:",size.value) 确保size.value为数字
}
getListData()
watchSwitchLang(getListData)
/**
 * 分页相关
  */
// handleSizeChange 当每一页展示用户的数量发生变化时 —— size 改变触发
const handleSizeChange=currentSize => {
  size.value=currentSize
  getListData()
}
// handleCurrentChange 表示当前页发生变化时 —— 页码改变
const handleCurrentChange=currentPage => {
  page.value=currentPage
  getListData()
}

// 删除用户
// 实现国际化，引入i18n
const i18n=useI18n()
const removeUser=row => {
  // 删除时给用户一个提示  ElMessageBox返回一个Promise
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1')+
    row.username+
    i18n.t('msg.excel.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    await deleteUser(row._id)
    ElMessage.success(i18n.t('msg.excel.removeSuccess'))
    // 重新渲染数据
    getListData()
  })
}

/**
 * 为员工分配角色
 */
// 控制子组件(弹窗)是否可见的变量
const roleDialogVisiable=ref(false)
// 用户id默认为空字符串
const userCurId=ref("")
const onShowRoleDialog=(row) => {
  roleDialogVisiable.value=true
  // 点击"角色"时，将对应的userId传给子组件
  userCurId.value=row._id
}
/**
 * 当我多次点击同一个用户时，并不会发送两次请求，因此要watch一下roledialog组件是否关闭
 * 此处代码是为了每次点击"角色"时，。。。
 */
watch(roleDialogVisiable,newVal => {
  // 如果弹窗被关闭，则roleDialogVisiable 的新值newVal为 false 。 就将用户当前的id置空，等到弹窗再次出现时，就会重新发送ajax请求
  if(!newVal) userCurId.value=""
})
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  .el-tag {
    margin-right: 6px;
  }

  .pagination {
    margin: 0 auto;
    margin-top: 20px;
    text-align: center;
  }
}
</style>
