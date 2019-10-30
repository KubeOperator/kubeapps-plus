/**
 * dev分支 webpack版本，要带api
 * @注意
 * 带参数的查询的url 不以 '/' 结尾
 */
const serviceModule = {
    dashboard: {
      getUserInfo: {
        url: '/api/dashboard/user/info',
        method: 'get'
      },
      getTaskList: {
        url: '/api/dashboard/flow/runtime/task/pending',
        method: 'post'
      },
      checkAuth: {
          url: '/api/kube/',
          method: 'get'
      }
    }
  }
  const apiSetting = {...serviceModule}
  
  export default apiSetting