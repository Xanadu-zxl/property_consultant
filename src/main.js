// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/reset.css'
import './assets/svg/style.css'
import { Tabbar, TabbarItem, Collapse, CollapseItem, List } from 'vant'
import axios from 'axios'
import unit from './unit/index'
import vueJsonp from 'vue-jsonp'

Vue.prototype.$axios = axios // 全局注册，使用方法为:this.$axios

Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(List)
Vue.use(unit)
Vue.use(vueJsonp)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'

})
