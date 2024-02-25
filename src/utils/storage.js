// 将token存储到localStorage —— 只要token没过期，用户就能自动登录

// 1. 存储数据 set
export const setItem = (key, value) => {
  // value为基本数据类型，或者复杂数据类型
  if (typeof value === "object") {
    // 如果value为复杂数据类型，将其转化成字符串
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 2. 获取数据
export const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  // 存储时，将复杂数据类型的value转化成了字符串，那么获取数据时，要转换回去
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

// 3. 删除指定数据
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}

// 4. 删除所有数据
export const clearAllItem = () => {
  window.localStorage.clear()
}
