// 前端主动介入 token 时效的处理
// 1. 用户登陆时，记录当前登录时间 2. 制定一个失效时长 3. 在接口调用时，根据当前时间对比登录时间,看是否超过了 时效时长(如果未超过，则正常进行后续操作; 如果超过，则进行 退出登录 操作)

import { getItem, setItem } from "@/utils/storage"
import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from "@/constant/index.js"
// 1. 获取时间戳
export function getTimeStamp() {
  // 返回登录时的时间（登录的时间已经保存在localStorage）
  return getItem(TIME_STAMP)
}

// 2. 设置时间戳
export function setTimeStamp() {
  // 将用户登录时的 时刻 保存在本地存储中
  setItem(TIME_STAMP, Date.now())
}

// 3. 是否超超时
export function isCheckTimeout() {
  // 当前时间
  const currentTime = Date.now()
  // 本地缓存的时刻
  const prevTime = getTimeStamp()
  /* if (currentTime - prevTime > TOKEN_TIMEOUT_VALUE) {
    // 如果超出 TOKEN_TIMEOUT_VALUE ，返回true , 否则返回false
    return true
  } else {
    return false
  } */
  return currentTime - prevTime > TOKEN_TIMEOUT_VALUE
}
