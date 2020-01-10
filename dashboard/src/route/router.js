import VueRouter from 'vue-router'

import mainLogin from "../components/login/mainLogin.vue"
import applications from "../components/applications/applications.vue"
import catalog from "../components/catalog/catalog.vue"
import catalogDetails from "../components/catalog/catalogDetails.vue"
import chartDeploy from "../components/catalog/chartDeploy.vue"
import repositories from "../components/configuration/appRepositories.vue"
import addRepositories from "../components/configuration/addAppRepositories.vue"
import brokers from "../components/configuration/serviceBroker.vue"
import apps from "../components/applications/apps.vue"
import Store from "../components/store/store.js"

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器, 
// 或者, 只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { name: '/', path: '/', component: mainLogin,meta: {allowBack: false} },
  { name: 'applications', path: '/applications', component: applications },
  { name: 'catalog', path: '/catalog', component: catalog },
  { name: 'catalogDetails', path: '/catalogDetails', component: catalogDetails, props: { catalog: {}}},
  { name: 'chartDeploy', path: '/chartDeploy', component: chartDeploy, props: { chart: {}}},
  { name: 'repositories', path: '/repositories', component: repositories },
  { name: 'addRepositories', path: '/addRepositories', component: addRepositories, props: { repository: {}}},
  { name: 'brokers', path: '/brokers', component: brokers },
  { name: 'apps', path: '/apps/ns/:namespace/:id',component: apps }
]

// 创建 router 实例, 然后传 `routes` 配置
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

//免登陆白名单
const whiteList = ['/error', '/']

//router.beforeEach 注册一个全局前置守卫
router.beforeEach((to, from, next) => {
  if (Store.fetch("accessToken")) {
    // 检查权限
    next()
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next() // 记得当所有程序执行完毕后要进行next()，不然是无法继续进行的;
    } else {
      next({
        path: '/',
        replace: true,
        query: {
          noGoBack: true
        }
      })
    }
  }

})


export default router
