import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'


Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
}).$mount('#app')
