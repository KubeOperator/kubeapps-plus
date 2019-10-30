import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './route/router.js'
import VueRouter from 'vue-router'
import i18n from './i18n/i18n'
import Resource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Resource)
new Vue({
  render: h => h(App),
  router,
  i18n,
}).$mount('#app')
