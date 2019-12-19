# Kubeapps Plus组件

### Kubeapps Plus仪表板

仪表板是Kubeapps Plus项目的主要UI组件。 仪表板使用Javascript编写，使用React Javascript库作为前端。

请参阅[Kubeapps Plus仪表板开发人员指南](dashboard.md)中的开发人员设置。

### chartsvc

“ chartsvc”组件是一个微服务，可创建API端点来访问在MongoDB服务器中填充的Helm图表存储库中图表的元数据。

请参阅[Kubeapps Plus Chartsvc开发人员指南](chartsvc.md)中的开发人员设置。

### chart-repo

“ chart-repo”组件是一种工具，可扫描Helm图表存储库并在MongoDB服务器中填充图表元数据。 然后，由“ chartsvc”组件提供此元数据。

请参阅[Kubeapps Plus chart-repo开发人员指南](chart-repo.md)进行开发人员设置。

### tiller-proxy

“ tiller-proxy”组件是一种服务，既用作Tiller的客户端，又提供一种授权用户在不同名称空间中部署，升级和删除图表的方法。

请参阅[Kubeapps Plus耕till代理开发指南](tiller-proxy.md)进行开发人员设置。
