// 导出一个方法 generateTitle , 该方法接收 title，最后返回...，最终实现语言切换
import i18n from "@/i18n"
import { watch } from "vue"
import store from "@/store"

export function generateTitle(title) {
  // console.log("title:", title)
  const re = i18n.global.t("msg.route." + title)
  // console.log("re:", re)
  return re
}

/**
 *
 * @param  {...any} cbs 所有的回调
 */
export function watchSwitchLang(...cbs) {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach((cb) => cb(store.getters.language))
    }
  )
}
