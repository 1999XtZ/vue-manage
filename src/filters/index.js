// 全局属性处理时间展示问题

import dayjs from "dayjs"
// 将时间格式化 —— 将一个字符串型的数字转换为整数型
const dateFilter = (val, format = "YYYY-MM-DD") => {
  // 如果当前val是数字，isNaN(val) 返回false，再取反，进入if判断了
  if (!isNaN(val)) {
    // parseInt将字符串转换为数字
    val = parseInt(val)
  }
  return dayjs(val).format(format)
}

// 再将其设置为 VUE3 的全局属性
export default (app) => {
  // $filters 是全局属性的名字 ， 后面是全局属性的配置
  app.config.globalProperties.$filters = {
    dateFilter
  }
}
