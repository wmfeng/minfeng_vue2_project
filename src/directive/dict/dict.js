import {
  getDicTab
} from "@/utils/config";
export default {
  inserted: async function (el, binding, vnode) {
    
    const {
      value
    } = binding
    el.innerHTML = await getDicTab(value[0], value[1])
  }
}
