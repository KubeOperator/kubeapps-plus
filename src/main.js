import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './route/router.js'
import VueRouter from 'vue-router'


Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
