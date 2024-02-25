// 此ajax请求是 “获取角色列表”

import myRequset from "@/utils/request"

/**
 * 获取所有角色
 */
export const roleList = () => {
  return myRequset({
    url: "/role/list"
  })
}

/**
 * 获取指定角色的权限(需要传递一个参数)
 */
export const rolePermission = (roleId) => {
  return myRequset({
    url: `/role/permission/${roleId}`
  })
}

/**
 * 为角色修改权限
 */
export const distributePermission = (data) => {
  return myRequset({
    url: "/role/distribute-permission",
    method: "POST",
    data
  })
}
