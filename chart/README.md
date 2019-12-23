# KubeApps Plus

[KubeApps Plus](https://kubeapps.com) 是基于Web的UI, 用于在 Kubernetes 集群中部署和管理应用程序。 KubeApps Plus 使您能够: 

- 从 Helm Chart Repo 中浏览并部署 Helm Chart 应用；
- 集群中已有 Helm-based 应用的查看、升级和卸载；
- 支持自定义 Helm Chart Repo（比如 ChartMuseum 和 JFrog Artifactory 等）；
- 基于 Kubernetes RBAC 的身份验证和授权；

## 先决条件

- Kubernetes 1.8+ (已针对Azure Kubernetes Service, Google Kubernetes Engine, minikube 和 Docker for Desktop Kubernetes进行了测试)
- Helm 2.10.0+
- 对集群的管理访问以创建自定义资源定义(CRD)

## 安装

```bash
git clone https://github.com/KubeOperator/kubeapps-plus.git
cd kubeapps_plus
helm install --name kubeapps-plus --namespace kubeapps-plus ./chart
```

该命令在 KubeApps-plus 名称空间的 Kubernetes 集群上部署 KubeApps Plus。

> **注**: 每个命名空间仅支持一个 KubeApps Plus 安装

> 使用`helm list`列出所有发行版本

安装 KubeApps Plus 后, 请按照[入门指南](https://github.com/kubeapps/kubeapps/blob/master/docs/user/getting-started.md) 了解有关如何访问和使用Kubeapps Plus的更多信息

## 配置参数

配置参数请参考文档: [values.yaml](values.yaml)

使用--helm install的参数`--set key = value [, key = value]`指定每个参数。 例如, 

```console
$ helm install --name kubeapps --namespace kubeapps \
  --set chartsvc.service.port=9090 \
    bitnami/kubeapps
```

上面的命令将 Chartsvc Service 的端口设置为9090。

或者, 可以在安装 chart 时提供指定参数值的YAML文件。 例如, 

```console
$ helm install --name kubeapps-plus --namespace kubeapps-plus -f custom-values.yaml bitnami/kubeapps
```

### 配置初始存储库

默认情况下, KubeApps Plus 将跟踪[社区helm chart](https://github.com/helm/charts)和[Kubernetes服务目录图表](https://github.com/kubernetes-incubator/service-catalog )。 要更改这些默认值, 请使用所需的参数覆盖[values.yaml](values.yaml)文件中存在的`apprepository.initialRepos`对象。

### 配置与自定义名称空间 Tiller 实例的连接

默认情况下, KubeApps Plus连接到 `kube-system` 名称空间( Helm 的默认安装位置)中的耕种机服务。

如果您的 Tiller 实例在不同的命名空间中运行, 或者您希望将 KubeApps Plus 的不同实例连接到不同的 Tiller 实例, 则可以通过设置`tillerProxy.host`参数来实现。 例如, 您可以设置`tillerProxy.host = tiller-deploy.my-custom-namespace: 44134`

### 配置与安全的Tiller实例的连接

在生产中, 我们强烈建议您设置Helm服务器端组件[安全安装Tiller](https://docs.helm.sh/using_helm/#using-ssl-between-helm-and-tiller)。

[securing-kubeapps.md](https://github.com/kubeapps/kubeapps/blob/master/docs/user/securing-kubeapps.md) 了解更多有关如何保护 KubeApps Plus 安装的信息。


#### 负载均衡服务

公开 KubeApps Plus 仪表板的最简单方法是将 LoadBalancer 类型分配给 KubeApps Plus 前端服务。 例如, 您可以使用以下参数: `frontend.service.type = LoadBalancer`

等待您的集群将 LoadBalancer IP或主机名分配给`kubeapps`服务并在该地址上访问它: 

```console
$ kubectl get services --namespace kubeapps-plus --watch
```

#### Ingress

此图表为入口资源提供支持。 如果您的集群上安装了入口控制器, 例如[nginx-ingress](https://hub.kubeapps.com/charts/stable/nginx-ingress)或[traefik](https: //hub.kubeapps。 com / charts / stable / traefik), 则可以利用Ingress控制器公开Kubeapps Plus。

要启用入口集成, 请将 “ingress.enabled” 设置为 `true`。


##### Hosts

您很可能只想拥有一个映射到此 KubeApps Plus 安装的主机名(使用`ingress.hostname`参数设置主机名), 但是, 可能有多个主机。 为方便起见, `ingress.extraHosts`对象是一个数组。

## 升级 KubeApps Plus

您可以从Kubeapps Plus Web 界面升级 KubeApps Plus。 选择安装 KubeApps Plus 的名称空间(如果遵循本指南中的说明, 则为`kubeapps`), 然后单击“升级”按钮。 选择新版本并确认。

> 注意: 如果在首次部署Kubeapps Plus时修改了图表值, 则在升级时需要再次设置这些值。

您还可以使用 Helm CLI 升级 KubeApps Plus, 首先确保已更新本地 Chart 存储库缓存: 

```console
$ helm repo update
```

升级Kubeapps Plus: 

```console
$ export RELEASE_NAME=kubeapps
$ helm upgrade $RELEASE_NAME bitnami/kubeapps
```

## 卸载 Chart

```console
$ helm delete --purge kubeapps
$ # Optional: Only if there are no more instances of KubeApps Plus
$ kubectl delete crd apprepositories.kubeapps.com
```

### 升级 chart 时出错

> 升级 KubeApps Plus 时, 可能会出现错误。 这可能是由于新图表的重大更改或当前图表安装处于不一致状态引起的。 如果发现升级 KubeApps Plus 的问题, 可以按照以下步骤操作: ...

1.  (可选)备份您的个人存储库(如果有): 

```console
kubectl get apprepository --namespace kubeapps-plus -o yaml <repo name> > <repo name>.yaml
```

2.  删除 KubeApps Plus : 

```console
helm del --purge kubeapps
```

3.  (可选)删除应用程序存储库 CRD: 

> **注**: 如果您的集群中安装了多个 Kubeapps Plus, 请不要执行此步骤。

```console
kubectl delete crd apprepositories.kubeapps.com
```

4.  (可选)清理Kubeapps Plus命名空间: `a`

> **注**: 如果 kubeapps-plus 名称空间中的工作负载不是 Kubeapps Plus, 则不要执行此步骤。

```console
kubectl delete namespace kubeapps-plus
```

5.  安装最新版本的 Kubeapps Plus (使用您需要的任何自定义修改): 

```console
helm repo update
helm install --name kubeapps --namespace kubeapps bitnami/kubeapps
```

6.  (可选)还原第一步中备份的所有存储库: 

```console
kubectl apply -f <repo name>.yaml
```