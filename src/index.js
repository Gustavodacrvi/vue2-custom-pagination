
import Pagination from "./Pagination.vue"

function install(Vue) {
  if (install.installed) return;
  install.installed = true
  Vue.component("v-custom-pagination", Pagination)
}

const plugin = {
  install
}

let GlobalVue = null
if (typeof window !== "undefined") {
  GlobalVue = window.Vue
} else if (typeof global !== "undefined") {
  GlobalVue = global.vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}

Pagination.install = install

export default Pagination
