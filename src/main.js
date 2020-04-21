import Vue from 'vue'
import 'normalize.css/normalize.css'
import 'animate.css/animate.css'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'
import './plugins/element.js'
import "@/directive"
import './router/permission'
import '@/components'


Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  },
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')