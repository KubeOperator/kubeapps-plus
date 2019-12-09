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
        getRelease: {
            url: '/rpc/api/tiller-deploy/v1/namespaces/',
            method: 'get'
        },
        getCharts: {
            url: '/api/chartsvc/v1/charts',
            method: 'get'
        },
        getImage: {
            url: '/api/chartsvc',
            method: 'get'
        },
        getAppRepositories: {
            url: 'api/kube/apis/kubeapps.com/v1alpha1/namespaces/kubeapps/apprepositories',
            method: 'get'
        },
        addAppRepositorie: {
            url: 'api/kube/apis/kubeapps.com/v1alpha1/namespaces/',
            method: 'post'
        },
        getServiceBrokers: {
            url: 'api/kube/apis/servicecatalog.k8s.io/v1beta1',
            method: 'get'
        },
        getAppDetail: {
            url: '/rpc/api/tiller-deploy/v1/namespaces/kubeapps/releases/kubeapps'
        },
        getReadme: {
            url: '/api/chartsvc/v1/assets',
            method: 'get'
        },
        getYaml: {
            url: '/api/chartsvc/v1/assets',
            method: 'get'
        },
        deployReleases: {
            url: 'api/tiller-deploy/v1/namespaces',
            method: 'post'
        },
        getLogoImage: {
            url: '/api/chartsvc/v1/assets',
            method: 'get'
        },
        getdetailone:{
            url: '/rpc/api/tiller-deploy/v1/namespaces/'
        },
        getdetailtwo:{
            url: '/rpc/api/kube/apis/apps/v1/namespaces/'
        },
        getdetailthree:{
            url: '/rpc/api/kube/api/v1/namespaces/'
        },
        deleteapp:{
            url:'/rpc/api/tiller-deploy/v1/namespaces/',
            method:'DELETE'
        }
    }
}
const apiSetting = {...serviceModule}

export default apiSetting
