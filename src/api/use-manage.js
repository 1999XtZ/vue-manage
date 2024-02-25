import myRequest from "@/utils/request.js"

/**
 * 获取用户列表数据
 * data 是一个对象，包含页数page和展示用户的数量size
 */
export const getUserManageList = (data) => {
  return myRequest({
    url: "/user-manage/list",
    params: data
  })
}

/**
 * 批量导入
 */
export const userBatchImport = (data) => {
  return myRequest({
    url: "/user-manage/batch/import",
    method: "POST",
    data
  })
}

/**
 * 删除指定数据
 */
export const deleteUser = (id) => {
  return myRequest({
    url: `/user-manage/detele/${id}`
  })
}

/**
 * 获取所有用户列表数据
 */
export const getUserManageAllList = () => {
  return myRequest({
    url: "/user-manage/all-list"
  })
}

/**
 * 获取用户详情
 */
export const userDetail = (id) => {
  return myRequest({
    url: `/user-manage/detail/${id}`
  })
}

/**
 * 获取指定用户角色
 */
export const userRoles = (id) => {
  return myRequest({
    url: `/user-manage/role/${id}`
  })
}

/**
 * 为用户分配角色 —— 即点击弹窗的确定后，新角色会被勾选上，并且再次打开弹窗，新勾选的角色不会变化
 */
export const updateRole = (id, roles) => {
  return myRequest({
    url: `/user-manage/update-role/${id}`,
    method: "POST",
    data: {
      roles
    }
  })
}
