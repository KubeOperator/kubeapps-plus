# Kubeapps Plus

[Kubeapps Plus]（https://kubeapps.com）是基于Web的UI，用于在Kubernetes集群中部署和管理应用程序。 Kubeapps Plus使您能够：

- 从图表存储库中浏览并部署[Helm]（https://github.com/helm/helm）图表
- 检查，升级和删除群集中安装的基于Helm的应用程序
- 添加自定义和私有图表存储库（支持[ChartMuseum]（https://github.com/helm/chartmuseum）和[JFrog Artifactory]（https://www.jfrog.com/confluence/display/RTF/Helm+Chart +储存库））
- 从[服务目录]（https://github.com/kubernetes-incubator/service-catalog）和可用的Service Broker中浏览和设置外部服务
- 通过服务目录绑定将基于Helm的应用程序连接到外部服务
- 基于Kubernetes的安全身份验证和授权[基于角色的访问控制]（https://github.com/kubeapps/kubeapps/blob/master/docs/user/access-control.md）

## TL;DR;

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install --name kubeapps --namespace kubeapps bitnami/kubeapps
```

## 介绍

此图表使用[Helm]（https://helm.sh）程序包管理器在[Kubernetes]（http://kubernetes.io）群集上引导了[Kubeapps Plus]（https://kubeapps.com）部署。

它还打包了[Bitnami MongoDB图表]（https://github.com/helm/charts/tree/master/stable/mongodb），这对于自举MongoDB部署来满足Kubeapps Plus应用程序的数据库要求是必需的。

## 先决条件

- Kubernetes 1.8+（已针对Azure Kubernetes Service，Google Kubernetes Engine，minikube和Docker for Desktop Kubernetes进行了测试）
- Helm 2.10.0+
- 对集群的管理访问以创建自定义资源定义（CRD）

## 安装图表

要以发布名称`kubeapps`安装图表：

```console
$ helm repo add bitnami https://charts.bitnami.com/bitnami
$ helm install --name kubeapps-plus --namespace kubeapps-plus bitnami/kubeapps
```

> **IMPORTANT** 这假设头盔安装不安全，在生产中不建议使用。 请参阅[文档以了解如何在生产中保护Helm和Kubeapps Plus的安全]（https://github.com/kubeapps/kubeapps/blob/master/docs/user/securing-kubeapps.md）。

该命令在Kubeapps名称空间的Kubernetes集群上部署Kubeapps Plus。 [Parameters]（＃parameters）部分列出了可以在安装过程中配置的参数。

> **Caveat**: 每个命名空间仅支持一个Kubeapps Plus安装

> **Tip**: 使用`helm list`列出所有发行版本

安装Kubeapps Plus后，请按照[入门指南]（https://github.com/kubeapps/kubeapps/blob/master/docs/user/getting-started.md）了解有关如何访问和使用Kubeapps的更多信息。 加。

## 参量

有关Kubeapps Plus图表的配置参数的完整列表，请参见[values.yaml]（values.yaml）文件。

使用--helm install的参数`--set key = value [，key = value]`指定每个参数。 例如，

```console
$ helm install --name kubeapps --namespace kubeapps \
  --set chartsvc.service.port=9090 \
    bitnami/kubeapps
```

上面的命令将Chartsvc Service的端口设置为9090。

或者，可以在安装图表时提供指定参数值的YAML文件。 例如，

```console
$ helm install --name kubeapps-plus --namespace kubeapps-plus -f custom-values.yaml bitnami/kubeapps
```

## 配置和安装详细信息

### 配置初始存储库

默认情况下，Kubeapps Plus将跟踪[社区头盔图表]（https://github.com/helm/charts）和[Kubernetes服务目录图表]（https://github.com/kubernetes-incubator/service-catalog ）。 要更改这些默认值，请使用所需的参数覆盖[values.yaml]（values.yaml）文件中存在的`apprepository.initialRepos`对象。

### Configuring connection to a custom namespace Tiller instance

By default, Kubeapps Plus connects to the Tiller Service in the `kube-system` namespace, the default install location for Helm.

If your instance of Tiller is running in a different namespace or you want to have different instances of Kubeapps Plus connected to different Tiller instances, you can achieve it by setting the `tillerProxy.host` parameter. For example, you can set `tillerProxy.host=tiller-deploy.my-custom-namespace:44134`

### Configuring connection to a secure Tiller instance

In production, we strongly recommend setting up a [secure installation of Tiller](https://docs.helm.sh/using_helm/#using-ssl-between-helm-and-tiller), the Helm server side component.

Learn more about how to secure your Kubeapps Plus installation [here](https://github.com/kubeapps/kubeapps/blob/master/docs/user/securing-kubeapps.md).

### Exposing Externally

> **Note**: The Kubeapps Plus frontend sets up a proxy to the Kubernetes API service, so when when exposing the Kubeapps Plus service to a network external to the Kubernetes cluster (perhaps on an internal or public network), the Kubernetes API will also be exposed on that network. See [#1111](https://github.com/kubeapps/kubeapps/issues/1111) for more details.

#### LoadBalancer Service

The simplest way to expose the Kubeapps Plus Dashboard is to assign a LoadBalancer type to the Kubeapps Plus frontend Service. For example, you can use the following parameter: `frontend.service.type=LoadBalancer`

Wait for your cluster to assign a LoadBalancer IP or Hostname to the `kubeapps` Service and access it on that address:

```console
$ kubectl get services --namespace kubeapps --watch
```

#### Ingress

This chart provides support for ingress resources. If you have an ingress controller installed on your cluster, such as [nginx-ingress](https://hub.kubeapps.com/charts/stable/nginx-ingress) or [traefik](https://hub.kubeapps.com/charts/stable/traefik) you can utilize the ingress controller to expose Kubeapps Plus.

To enable ingress integration, please set `ingress.enabled` to `true`

##### Hosts

Most likely you will only want to have one hostname that maps to this Kubeapps Plus installation (use the `ingress.hostname` parameter to set the hostname), however, it is possible to have more than one host. To facilitate this, the `ingress.extraHosts` object is an array.

##### Annotations

For annotations, please see [this document](https://github.com/kubernetes/ingress-nginx/blob/master/docs/user-guide/nginx-configuration/annotations.md). Not all annotations are supported by all ingress controllers, but this document does a good job of indicating which annotation is supported by many popular ingress controllers. Annotations can be set using `ingress.annotations`.

##### TLS

To enable TLS, please set `ingress.tls` to `true`. When enabling this parameter, the TLS certificates will be retrieved from a TLS secret with name *INGRESS_HOSTNAME-tls* (where *INGRESS_HOSTNAME* is a placeholder to be replaced with the hostname you set using the `ingress.hostname` parameter).

You can use the `ingress.extraTls` to provide the TLS configuration for the extra hosts you set using the `ingress.extraHosts` array. Please see [this example](https://kubernetes.github.io/ingress-nginx/examples/tls-termination/) for more information.

You can provide your own certificates using the `ingress.secrets` object. If your cluster has a [cert-manager](https://github.com/jetstack/cert-manager) add-on to automate the management and issuance of TLS certificates, set `ingress.certManager` boolean to true to enable the corresponding annotations for cert-manager. For a full list of configuration parameters related to configuring TLS can see the [values.yaml](values.yaml) file.

## Upgrading Kubeapps Plus

You can upgrade Kubeapps Plus from the Kubeapps Plus web interface. Select the namespace in which Kubeapps Plus is installed (`kubeapps` if you followed the instructions in this guide) and click on the "Upgrade" button. Select the new version and confirm.

> NOTE: If the chart values were modified when deploying Kubeapps Plus the first time, those values need to be set again when upgrading.

You can also use the Helm CLI to upgrade Kubeapps Plus, first ensure you have updated your local chart repository cache:

```console
$ helm repo update
```

Now upgrade Kubeapps Plus:

```console
$ export RELEASE_NAME=kubeapps
$ helm upgrade $RELEASE_NAME bitnami/kubeapps
```

If you find issues upgrading Kubeapps Plus, check the [troubleshooting](#error-while-upgrading-the-chart) section.

## Uninstalling the Chart

To uninstall/delete the `kubeapps` deployment:

```console
$ helm delete --purge kubeapps
$ # Optional: Only if there are no more instances of Kubeapps Plus
$ kubectl delete crd apprepositories.kubeapps.com
```

The first command removes most of the Kubernetes components associated with the chart and deletes the release. After that, if there are no more instances of Kubeapps Plus in the cluster you can manually delete the `apprepositories.kubeapps.com` CRD used by Kubeapps Plus that is shared for the entire cluster.

> **NOTE**: If you delete the CRD for `apprepositories.kubeapps.com` it will delete the repositories for **all** the installed instances of `kubeapps`. This will break existing installations of `kubeapps` if they exist.

If you have dedicated a namespace only for Kubeapps Plus you can completely clean remaining completed/failed jobs or any stale resources by deleting the namespace

```console
$ kubectl delete namespace kubeapps
```

## Troubleshooting

### Forbidden error while installing the Chart

If during installation you run into an error similar to:

```
Error: release kubeapps failed: clusterroles.rbac.authorization.k8s.io "kubeapps-apprepository-controller" is forbidden: attempt to grant extra privileges: [{[get] [batch] [cronjobs] [] []...
```

Or:

```
Error: namespaces "kubeapps" is forbidden: User "system:serviceaccount:kube-system:default" cannot get namespaces in the namespace "kubeapps"
```

This usually is an indication that Tiller was not installed with enough permissions to create the resources required by Kubeapps Plus. In order to install Kubeapps Plus, tiller will need to be able to install Custom Resource Definitions cluster-wide, as well as manage app repositories in your kubeapps namespace. The easiest way to enable this in a development environment is install Tiller with elevated permissions (e.g. as a cluster-admin). For example:

```
kubectl -n kube-system create sa tiller
kubectl create clusterrolebinding tiller --clusterrole cluster-admin --serviceaccount=kube-system:tiller
helm init --service-account tiller
```

but for a production environment you can assign the specific permissions so that tiller can [manage CRDs on the cluster](https://github.com/kubeapps/kubeapps/blob/master/docs/user/manifests/openshift-tiller-with-crd-rbac.yaml) as well as [create app repositories in your Kubeapps Plus namespace](https://github.com/kubeapps/kubeapps/blob/master/docs/user/manifests/openshift-tiller-with-apprepository-rbac.yaml) (examples are from our in development support for OpenShift).

It is also possible, though less common, that your cluster does not have Role Based Access Control (RBAC) enabled. To check if your cluster has RBAC you can execute:

```console
$ kubectl api-versions
```

If the above command does not include entries for `rbac.authorization.k8s.io` you should perform the chart installation by setting `rbac.create=false`:

```console
$ helm install --name kubeapps --namespace kubeapps bitnami/kubeapps --set rbac.create=false
```

### Error while upgrading the Chart

It is possible that when upgrading Kubeapps Plus an error appears. That can be caused by a breaking change in the new chart or because the current chart installation is in an inconsistent state. If you find issues upgrading Kubeapps Plus you can follow these steps:

> Note: This steps assume that you have installed Kubeapps Plus in the namespace `kubeapps` using the name `kubeapps`. If that is not the case replace the command with your namespace and/or name.

1.  (Optional) Backup your personal repositories (if you have any):

```console
kubectl get apprepository --namespace kubeapps -o yaml <repo name> > <repo name>.yaml
```

2.  Delete Kubeapps Plus:

```console
helm del --purge kubeapps
```

3.  (Optional) Delete the App Repositories CRD:

> **Warning**: Don't execute this step if you have more than one Kubeapps Plus installation in your cluster.

```console
kubectl delete crd apprepositories.kubeapps.com
```

4.  (Optional) Clean the Kubeapps Plus namespace:

> **Warning**: Don't execute this step if you have workloads other than Kubeapps Plus in the `kubeapps` namespace.

```console
kubectl delete namespace kubeapps
```

5.  Install the latest version of Kubeapps Plus (using any custom modifications you need):

```console
helm repo update
helm install --name kubeapps --namespace kubeapps bitnami/kubeapps
```

6.  (Optional) Restore any repositories you backed up in the first step:

```console
kubectl apply -f <repo name>.yaml
```

After that you should be able to access the new version of Kubeapps Plus. If the above doesn't work for you or you run into any other issues please open an [issue](https://github.com/kubeapps/kubeapps/issues/new).
