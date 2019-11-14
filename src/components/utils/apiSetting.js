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
    },
    getCharts: {
      url:'/api/chartsvc/v1/charts',
      method:'get'
    },
    getAppRepositories: {
      url: 'api/kube/apis/kubeapps.com/v1alpha1/namespaces/kubeapps/apprepositories',
      method:'get'
    },
    getServiceBrokers: {
      url: 'api/kube/apis/servicecatalog.k8s.io/v1beta1',
      method:'get'
    },
    getAppDetail:{
      url: '/rpc/api/tiller-deploy/v1/namespaces/kubeapps/releases/kubeapps'
    }
  }
}
const apiSetting = { ...serviceModule }

export default apiSetting
