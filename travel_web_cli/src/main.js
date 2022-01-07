import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import router from './router'
import BaiduMap from 'vue-baidu-map'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Router)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(BaiduMap, {
  ak: "rQxHPQX1ua21rWnXzTbUh5KSSUbnefxR"
})
Vue.config.productionTip = false

const app = new Vue({
  router,
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: h => h(App),
})
app.$mount('#app')
