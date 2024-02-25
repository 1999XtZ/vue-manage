import myRequset from "@/utils/request"

/**
 * 获取所有权限
 */
export const permissionList = () => {
  return myRequset({
    url: "/permission/list"
  })
}
