import Vue from 'vue'
import 'normalize.css/normalize.css'
import 'animate.css/animate.css'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import VCharts from 'v-charts'
import i18n from "./i18n"
import './plugins/element.js'
import "@/directive"
import './router/permission'
import '@/components'


Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.use(VCharts)

Vue.use(ElementUI, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

new Vue({
  router,
  store,
  i18n,
  render: function (h) {
    return h(App)
  },
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')