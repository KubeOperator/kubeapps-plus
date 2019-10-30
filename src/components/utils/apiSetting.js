/**
 * dev分支 webpack版本，要带api
 * @注意
 * 带参数的查询的url 不以 '/' 结尾
 */
const serviceModule = {
  kubernetes: {
    getInfo: {
      url: '/rpc/api/kube/',
      method: 'get'
    },
    namebase: {
      url: '/rpc/api/kube/api/v1/namespaces/',
      method: 'get'
    },
    checkAuth: {
      url: '/api/kube/',
      method: 'get'
    }
  }
}
const apiSetting = { ...serviceModule }

export default apiSetting