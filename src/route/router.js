import VueRouter from 'vue-router'
import Store from "../components/store/store.js"
import mainLogin from "../components/login/mainLogin.vue"
import dashboard from "../components/dashboard.vue"

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { name: 'login', path: '/', component: mainLogin },
  { path: '/dashboard', component: dashboard }
]

var router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

router.beforeEach((to, from, next) => {

  if (to.name != 'login') {
    if (Store.fetch("accessToken") === null) {
      next({ path: '/' })
    }
  }

  next()
})

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
export default router
