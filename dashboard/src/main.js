import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './route/router.js'
import VueRouter from 'vue-router'
import i18n from './i18n/i18n'
import Resource from 'vue-resource'
import vuex from 'vuex'
import store from './components/store/index.js'
import ace from 'ace-builds'

// 自定义过滤器
import * as filters from './components/utils/splitName.js'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
import * as searchs from './components/utils/searchImage.js'
Object.keys(searchs).forEach(key => {
  Vue.filter(key, searchs[key])
})

import * as utc2gmts from './components/utils/UTC2GMT.js'
Object.keys(utc2gmts).forEach(key => {
  Vue.filter(key, utc2gmts[key])
})

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Resource)
Vue.use(vuex)
Vue.use(ace)
Vue.filter('uppercase',function(value){
  return value.toString().toUpperCase()
})

new Vue({
  render: h => h(App),
  router,
  i18n,
  store
}).$mount('#app')
