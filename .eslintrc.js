// ESLint 的配置文件(一个插件化的JavaScript代码检测工具)
// 它遵循commonJS的导出规则，所导出的对象就是 ESLint 的配置对象

module.exports = {
  // 表示.eslintrc.js文件所在的文件夹 即为根目录，ESLint 规则将被限制到该目录下
  root: true,
  // env表示 启用ESLint检测的环境
  // node:true 即在node环境下启动ESLint检测
  env: {
    node: true
  },
  // ESLint中基础配置需要继承的配置
  // 若需要对ESLint的配置进行延伸，那么就是在 标准化standard 配置下进行延伸配置
  extends: ["plugin:vue/vue3-essential", "@vue/standard"],
  // 解析器
  parserOptions: {
    parser: "@babel/eslint-parser"
  },
  // 需要修改的启用规则以及对应的错误级别
  /*
    "off"或0    关闭规则
    "warn"或1   开启规则，使用警告级别的错误：warn(不会导致程序退出)
    "error"或2  开启规则，使用错误级别的错误：error(当被触发时，程序会退出)
  */
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // quotes: "warn", //表示对于引号的使用，如果是警告级别的问题，会发出警告
    "space-before-function-paren": "off",
    "vue/multi-word-component-names": "off", //Component name "index" should not always be multi-word
    "comma-spacing": "off", // 关闭逗号后的空格检查
    "space-infix-ops": "off", // 关闭等号前后空格的检查
    quotes: "off", // 禁用字符串引号规则
    "keyword-spacing": "off", // 禁用 keyword-spacing 规则
    "no-useless-return": "off",
    "space-after-semicolon": "off", //关闭分号后面缺少空格的检查
    "eol-last": "off" // 关闭对vue文件最末行有无空格的检查
  }
}
