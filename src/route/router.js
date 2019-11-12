import VueRouter from 'vue-router'

import mainLogin from "../components/login/mainLogin.vue"
import applications from "../components/applications/applications.vue"
import catalog from "../components/catalog/catalog.vue"
import catalogDetails from "../components/catalog/catalog_details.vue"
import repositories from "../components/configuration/appRepositories.vue"
import brokers from "../components/configuration/serviceBroker.vue"
import apps from "../components/applications/apps.vue"

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/', component: mainLogin,meta: {allowBack: false} },
  { path: '/applications', component: applications },
  { path: '/catalog', component: catalog },
  { path: '/catalogDetails', component: catalogDetails, props: { id: '', icon : '', desc: '', version: ''}},
  { path: '/repositories', component: repositories },
  { path: '/brokers', component: brokers },
  { path: '/apps/ns/:namespace/:id',component: apps }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
export default  new VueRouter({
  routes // (缩写) 相当于 routes: routes
})
