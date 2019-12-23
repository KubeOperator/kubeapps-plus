# Kubeapps Plus

[Kubeapps Plus](https://kubeapps.com)是基于Web的UI, 用于在Kubernetes集群中部署和管理应用程序。 Kubeapps Plus使您能够: 

- 从图表存储库中浏览并部署[Helm](https://github.com/helm/helm)图表
- 检查, 升级和删除群集中安装的基于Helm的应用程序
- 添加自定义和私有图表存储库(支持[ChartMuseum](https://github.com/helm/chartmuseum)和[JFrog Artifactory](https://www.jfrog.com/confluence/display/RTF/Helm+Chart +储存库））
- 从[服务目录](https://github.com/kubernetes-incubator/service-catalog)和可用的Service Broker中浏览和设置外部服务
- 通过服务目录绑定将基于Helm的应用程序连接到外部服务
- 基于Kubernetes的安全身份验证和授权[基于角色的访问控制](https://github.com/kubeapps/kubeapps/blob/master/docs/user/access-control.md)

## TL;DR;

```bash
git clone https://github.com/KubeOperator/kubeapps-plus.git
cd kubeapps_plus
helm install --name kubeapps-plus --namespace kubeapps-plus ./chart
```

## 介绍

此图表使用[Helm](https://helm.sh)程序包管理器在[Kubernetes](http://kubernetes.io)群集上引导了[Kubeapps Plus](https://kubeapps.com)部署。

它还打包了[Bitnami MongoDB图表](https://github.com/helm/charts/tree/master/stable/mongodb), 这对于自举MongoDB部署来满足Kubeapps Plus应用程序的数据库要求是必需的。

## 先决条件

- Kubernetes 1.8+(已针对Azure Kubernetes Service, Google Kubernetes Engine, minikube和Docker for Desktop Kubernetes进行了测试)
- Helm 2.10.0+
- 对集群的管理访问以创建自定义资源定义(CRD)

## 安装图表

要以发布名称`kubeapps`安装图表: 

```bash
git clone https://github.com/KubeOperator/kubeapps-plus.git
cd kubeapps_plus
helm install --name kubeapps-plus --namespace kubeapps-plus ./chart
```

> **IMPORTANT** 这假设头盔安装不安全, 在生产中不建议使用。 请参阅[文档以了解如何在生产中保护Helm和Kubeapps Plus的安全](https://github.com/kubeapps/kubeapps/blob/master/docs/user/securing-kubeapps.md)。

该命令在Kubeapps名称空间的Kubernetes集群上部署Kubeapps Plus。 [Parameters](＃parameters)部分列出了可以在安装过程中配置的参数。

> **Caveat**: 每个命名空间仅支持一个Kubeapps Plus安装

> **Tip**: 使用`helm list`列出所有发行版本

安装Kubeapps Plus后, 请按照[入门指南](https://github.com/kubeapps/kubeapps/blob/master/docs/user/getting-started.md)了解有关如何访问和使用Kubeapps的更多信息。 加。

## 参量

有关Kubeapps Plus图表的配置参数的完整列表, 请参见[values.yaml](values.yaml)文件。

使用--helm install的参数`--set key = value [, key = value]`指定每个参数。 例如, 

```console
$ helm install --name kubeapps --namespace kubeapps \
  --set chartsvc.service.port=9090 \
    bitnami/kubeapps
```

上面的命令将Chartsvc Service的端口设置为9090。

或者, 可以在安装图表时提供指定参数值的YAML文件。 例如, 

```console
$ helm install --name kubeapps-plus --namespace kubeapps-plus -f custom-values.yaml bitnami/kubeapps
```

## 配置和安装详细信息

### 配置初始存储库

默认情况下, Kubeapps Plus将跟踪[社区头盔图表](https://github.com/helm/charts)和[Kubernetes服务目录图表](https://github.com/kubernetes-incubator/service-catalog )。 要更改这些默认值, 请使用所需的参数覆盖[values.yaml](values.yaml)文件中存在的`apprepository.initialRepos`对象。

### 配置与自定义名称空间Tiller实例的连接

默认情况下, Kubeapps Plus连接到`kube-system`名称空间(Helm的默认安装位置)中的耕种机服务。

如果您的Tiller实例在不同的命名空间中运行, 或者您希望将Kubeapps Plus的不同实例连接到不同的Tiller实例, 则可以通过设置`tillerProxy.host`参数来实现。 例如, 您可以设置`tillerProxy.host = tiller-deploy.my-custom-namespace: 44134`

### 配置与安全的Tiller实例的连接

在生产中, 我们强烈建议您设置Helm服务器端组件[安全安装Tiller](https://docs.helm.sh/using_helm/#using-ssl-between-helm-and-tiller)。

在[此处](https://github.com/kubeapps/kubeapps/blob/master/docs/user/securing-kubeapps.md)了解更多有关如何保护Kubeapps Plus安装的信息。

### 外部暴露

> **Note**: Kubeapps Plus前端设置了Kubernetes API服务的代理, 因此, 当将Kubeapps Plus服务暴露给Kubernetes集群外部的网络(可能是内部或公共网络)时, Kubernetes API也将在该网络上公开。 。 有关更多详细信息, 请参见[＃1111](https://github.com/kubeapps/kubeapps/issues/1111)。

#### 负载均衡服务

公开Kubeapps Plus仪表板的最简单方法是将LoadBalancer类型分配给Kubeapps Plus前端服务。 例如, 您可以使用以下参数: `frontend.service.type = LoadBalancer`

等待您的集群将LoadBalancer IP或主机名分配给`kubeapps`服务并在该地址上访问它: 

```console
$ kubectl get services --namespace kubeapps --watch
```

#### Ingress

此图表为入口资源提供支持。 如果您的集群上安装了入口控制器, 例如[nginx-ingress](https://hub.kubeapps.com/charts/stable/nginx-ingress)或[traefik](https: //hub.kubeapps。 com / charts / stable / traefik), 则可以利用Ingress控制器公开Kubeapps Plus。

要启用入口集成, 请将“ ingress.enabled”设置为`true`。


##### Hosts

您很可能只想拥有一个映射到此Kubeapps Plus安装的主机名(使用`ingress.hostname`参数设置主机名), 但是, 可能有多个主机。 为方便起见, `ingress.extraHosts`对象是一个数组。

##### 注解

有关注释, 请参阅[本文档](https://github.com/kubernetes/ingress-nginx/blob/master/docs/user-guide/nginx-configuration/annotations.md)。 并非所有的入口控制器都支持所有注释, 但是本文档很好地指出了许多流行的入口控制器支持哪些注释。 可以使用`ingress.annotations`设置注释。

##### TLS

要启用TLS, 请将`ingress.tls`设置为`true`。 启用此参数时, 将从名称为* INGRESS_HOSTNAME-tls *的TLS秘密中检索TLS证书(其中* INGRESS_HOSTNAME *是占位符, 将替换为使用ingress.hostname参数设置的主机名)。

您可以使用`ingress.extraTls`为使用`ingress.extraHosts`数组设置的额外主机提供TLS配置。 请参阅[此示例](https://kubernetes.github.io/ingress-nginx/examples/tls-termination/)了解更多信息。

您可以使用`ingress.secrets`对象提供自己的证书。 如果您的集群具有[cert-manager](https://github.com/jetstack/cert-manager)附件来自动管理和颁发TLS证书, 则将ingress.certManager` boolean设置为true即可启用 cert-manager的相应注释。 有关与配置TLS相关的配置参数的完整列表, 请参见[values.yaml](values.yaml)文件。

## 升级Kubeapps Plus

您可以从Kubeapps Plus Web界面升级Kubeapps Plus。 选择安装Kubeapps Plus的名称空间(如果遵循本指南中的说明, 则为`kubeapps`), 然后单击“升级”按钮。 选择新版本并确认。

> 注意: 如果在首次部署Kubeapps Plus时修改了图表值, 则在升级时需要再次设置这些值。

您还可以使用Helm CLI升级Kubeapps Plus, 首先确保已更新本地图表存储库缓存: 

```console
$ helm repo update
```

现在升级Kubeapps Plus: 

```console
$ export RELEASE_NAME=kubeapps
$ helm upgrade $RELEASE_NAME bitnami/kubeapps
```

如果在升级Kubeapps Plus时发现问题, 请检查[故障排除](＃error-while-upgradeing-the-chart)部分。

## 卸载图表

要卸载/删除`kubeapps`部署: 

```console
$ helm delete --purge kubeapps
$ # Optional: Only if there are no more instances of Kubeapps Plus
$ kubectl delete crd apprepositories.kubeapps.com
```

第一个命令删除与图表关联的大多数Kubernetes组件并删除发行版。 之后, 如果群集中没有更多的Kubeapps Plus实例, 则可以手动删除Kubeapps Plus使用的, 整个群集共享的`apprepositories.kubeapps.com` CRD。

> **NOTE**: 如果您删除`apprepositories.kubeapps.com`的CRD, 则会删除所有`kubeapps-plus`已安装实例的存储库。 如果存在, 这将破坏现有的kubeapps-plus安装。

如果您仅为Kubeapps Plus分配了名称空间, 则可以通过删除名称空间来完全清除剩余的已完成/失败的作业或任何过时的资源

```console
$ kubectl delete namespace kubeapps
```

## 故障排除

### 安装图表时出现禁止错误

如果在安装过程中遇到以下错误: 

```
Error: release kubeapps failed: clusterroles.rbac.authorization.k8s.io "kubeapps-apprepository-controller" is forbidden: attempt to grant extra privileges: [{[get] [batch] [cronjobs] [] []...
```

或:

```
Error: namespaces "kubeapps" is forbidden: User "system:serviceaccount:kube-system:default" cannot get namespaces in the namespace "kubeapps"
```

这通常表明Tiller没有安装足够的权限来创建Kubeapps Plus所需的资源。 为了安装Kubeapps Plus, 耕种机将需要能够在整个群集范围内安装`自定义资源定义`, 以及管理kubeapps命名空间中的应用程序存储库。 在开发环境中启用此功能的最简单方法是使用提升的权限(例如, 以集群管理员身份)安装Tiller。 例如: 

```
kubectl -n kube-system create sa tiller
kubectl create clusterrolebinding tiller --clusterrole cluster-admin --serviceaccount=kube-system:tiller
helm init --service-account tiller
```

但是对于生产环境, 您可以分配特定的权限, 以便分er可以[管理群集上的CRD](https://github.com/kubeapps/kubeapps/blob/master/docs/user/manifests/openshift-tiller-with -crd-rbac.yaml)以及[在您的Kubeapps Plus命名空间中创建应用程序存储库](https://github.com/kubeapps/kubeapps/blob/master/docs/user/manifests/openshift-tiller-with-apprepository -rbac.yaml)(示例来自我们对OpenShift的开发支持)。

尽管不太常见, 但群集中也可能未启用基于角色的访问控制(RBAC)。 要检查您的集群是否具有RBAC, 可以执行: 

```console
$ kubectl api-versions
```

如果以上命令不包含`rbac.authorization.k8s.io`的条目, 则应通过设置`rbac.create = false`来执行图表安装: 

```console
$ helm install --name kubeapps-plus --namespace kubeapps-plus bitnami/kubeapps --set rbac.create=false
```

### 升级图表时出错

升级Kubeapps Plus时, 可能会出现错误。 这可能是由于新图表的重大更改或当前图表安装处于不一致状态引起的。 如果发现升级Kubeapps Plus的问题, 可以按照以下步骤操作: 

> 升级Kubeapps Plus时, 可能会出现错误。 这可能是由于新图表的重大更改或当前图表安装处于不一致状态引起的。 如果发现升级Kubeapps Plus的问题, 可以按照以下步骤操作: ...

1.  (可选)备份您的个人存储库(如果有): 

```console
kubectl get apprepository --namespace kubeapps-plus -o yaml <repo name> > <repo name>.yaml
```

2.  删除Kubeapps Plus: 

```console
helm del --purge kubeapps
```

3.  (可选)删除应用程序存储库CRD: 

> **Warning**: 如果您的集群中安装了多个Kubeapps Plus, 请不要执行此步骤。

```console
kubectl delete crd apprepositories.kubeapps.com
```

4.  (可选)清理Kubeapps Plus命名空间: 

> **Warning**: 如果kubeapps-plus名称空间中的工作负载不是Kubeapps Plus, 则不要执行此步骤。

```console
kubectl delete namespace kubeapps-plus
```

5.  安装最新版本的Kubeapps Plus(使用您需要的任何自定义修改): 

```console
helm repo update
helm install --name kubeapps --namespace kubeapps bitnami/kubeapps
```

6.  (可选)还原第一步中备份的所有存储库: 

```console
kubectl apply -f <repo name>.yaml
```

之后, 您应该可以访问新版本的Kubeapps Plus。 如果上述方法对您不起作用, 或者您遇到其他任何问题, 请打开一个[issue](https://github.com/kubeapps/kubeapps/issues/new)。