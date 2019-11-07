const serviceModule = {
  kubernetes: {
    getInfo: {
      url: '/rpc/api/kube/',
      method: 'get'
    },
    getNamespaces: {
      url: '/rpc/api/kube/api/v1/namespaces/',
      method: 'get'
    },
    checkAuth: {
      url: '/api/kube/',
      method: 'get'
    },
    getRelease:{
      url:'/rpc/api/tiller-deploy/v1/namespaces/',
      method:'get'
    }
  }
}
const apiSetting = { ...serviceModule }

export default apiSetting
