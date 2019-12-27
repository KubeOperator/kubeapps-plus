# Kubeapps Plus 架构说明

本文档从高层次描述了 KubeApps Plus 架构。

### KubeApps Plus 仪表盘

KubeApps Plus 的核心是集群内 Kubernetes 仪表板, 可为您提供简单的浏览和体验, 以安装和管理打包为 Helm 图表的 Kubernetes 应用程序。

仪表板使用 Javascript 编程语言编写, 并使用 Vue.js 库进行开发。

### Tiller proxy

为了保护对 Tiller 的访问并允许仪表板交互 Helm Tiller 服务器, 我们部署了 proxy 来处理与 Tiller 的通信。 该 proxy 的目标是验证发出请求的用户是否具有足够的权限来创建或删除作为正在部署或删除的特定图表部分的所有资源。

该代理是用Go编写的。 在此 [tiller-proxy](/cmd/tiller-proxy/README.md) 中检查有关实现的更多详细信息。

### CRD 储存库 和 控制器

KubeApps Plus 中的图表存储库通过名为 “apprepositories.kubeapps.com” 的 “CustomResourceDefinition” 进行管理。 添加到 KubeApps Plus 的每个存储库都是一个类型为 AppRepository 的对象, 而 apprepository-controller 将监视这些对象类型的更改以更新要部署的可用图表的列表。

### `chart-repo`

“chart-repo” 组件是一种工具, 可扫描 Helm 图表存储库并在 MongoDB 数据库中的图表元数据。 然后, 由 Chartsvc 组件提供此元数据。 它是 [Helm Monocular 项目](https://github.com/helm/monocular/tree/master/cmd/chart-repo)的一部分进行维护。

### `chartsvc`

“chartsvc” 组件是一个微服务, 可创建 API 端点来访问在 MongoDB 数据库中的 Helm 图表存储库中图表的元数据。 它是 [Helm Monocular 项目](https://github.com/helm/monocular/tree/master/cmd/chartsvc) 的一部分进行维护。