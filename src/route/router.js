import VueRouter from 'vue-router'

import mainLogin from "../components/login/mainLogin.vue"
import applications from "../components/applications/applications.vue"
import catalog from "../components/catalog/catalog.vue"
import catalogDetails from "../components/catalog/catalogDetails.vue"
import chartDeploy from "../components/catalog/chartDeploy.vue"
import repositories from "../components/configuration/appRepositories.vue"
import brokers from "../components/configuration/serviceBroker.vue"
import apps from "../components/applications/apps.vue"

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { name: '/', path: '/', component: mainLogin,meta: {allowBack: false} },
  { name: 'applications', path: '/applications', component: applications },
  { name: 'catalog', path: '/catalog', component: catalog },
  { name: 'catalogDetails', path: '/catalogDetails', component: catalogDetails, props: { catalog: {}}},
  { name: 'chartDeploy', path: '/chartDeploy', component: chartDeploy, props: { chart: {}}},
  { name: 'repositories', path: '/repositories', component: repositories },
  { name: 'brokers', path: '/brokers', component: brokers },
  { name: 'apps', path: '/apps/ns/:namespace/:id',component: apps }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
export default  new VueRouter({
  routes // (缩写) 相当于 routes: routes
})
