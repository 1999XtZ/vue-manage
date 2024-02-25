// @/constant/index.js 专用于 定义并对外暴露 要存储到 localStorage 的 key

export const TOKEN = "token"

// 用户登录的时间戳（时刻）
export const TIME_STAMP = "timeStamp"

// 超时时长 —— 设置为2h (1h = 60 * 60 * 1000 ms)
export const TOKEN_TIMEOUT_VALUE = 2 * 3600 * 1000

// 一个账户只能在一个设备登录。 别被人顶下来的业务逻辑：
// 1. 服务端返回数据时，以特定状态码告诉前端"你的账户设备在别处登录"
// 2. 当前端接收到特定状态码时，表示遇到了特定状态：token 时效 或 单点登录
// 3. 此时进行 退出登录 处理

// 创建国际化相关的常量
export const LANG = "language"

// 新的主题色
export const NEW_COLOR = "newColor"
// 默认主题色
export const DEFAULT_COLOR = "#409eff"
