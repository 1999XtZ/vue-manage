import i18n from "@/i18n"
export const validatePassword = () => {
  return (rule, value, callback) => {
    // 密码的验证规则
    if (value.length < 6) {
      callback(new Error(i18n.global.t("msg.login.passwordRule")))
    } else {
      callback()
    }
  }
}
