# KubeApps Plus 安装指南

[KubeApps Plus](https://kubeapps.com) 是基于 Web 的 UI, 用于在 Kubernetes 集群中部署和管理应用程序。 KubeApps Plus 使您能够: 

- 从 Helm Chart Repo 中浏览并部署 Helm Chart 应用；
- 集群中已有 Helm-based 应用的查看、升级和卸载；
- 支持自定义 Helm Chart Repo(比如 ChartMuseum 和 JFrog Artifactory 等)；
- 基于 Kubernetes RBAC 的身份验证和授权；

## 前提条件

- Kubernetes 1.8+ (已针对 Azure Kubernetes Service, Google Kubernetes Engine, minikube 和 Docker for Desktop Kubernetes 进行了测试)
- Helm 2.10.0+
- 对集群的管理访问以创建自定义资源定义(CRD)

## 安装 KubeApps Plus

```bash
# 登录 K8s 集群的 master 节点
git clone https://github.com/KubeOperator/kubeapps-plus.git
cd kubeapps-plus
helm install --name kubeapps-plus --namespace kubeapps-plus ./chart
```

该命令在 kubeApps-plus 命名空间的 Kubernetes 集群上部署 KubeApps Plus。

> **注**: 每个命名空间仅支持一个 KubeApps Plus 安装

> 使用 `helm list` 列出所有发行版本

安装 KubeApps Plus 后, 请按照 [KubeApps Plus 入门指南](../docs/user/getting-started.md) 了解有关如何访问和使用 KubeApps Plus 的更多信息

### 配置初始存储库

默认情况下, KubeApps Plus 将使用本地的 [Docker 镜像仓库](https://github.com/docker/distribution)与 [ChartMuseum 仓库](https://github.com/helm/chartmuseum)。 要更改这些默认值, 请使用所需的参数覆盖[values.yaml](values.yaml) 文件中存在的 `apprepository.initialRepos` 对象。

### 推送初始镜像

默认情况下, KubeApps Plus 可以推送 GitLab、Jenkins、Harbor、Sonarqube、Tensorflow 等镜像。

[使用方法](../script/README.md):

Helm Chart 离线包包括两个离线包，一个是 CI 相关的应用包括 Gitlab、Harbor、Jenkins 和 Sonarqube，另外一个是 AI 机器学习应用包括 Tensorflow-notebook 和 Tensorflow-serving，用户可以根据需要下载并安装。
请自行下载 Chart 离线包，并复制到目标机器的 /tmp 目录下。

- 下载链接: https://github.com/KubeOperator/KubeOperator/releases

默认使用本地 ChartMuseum 仓库，如果需要修改仓库地址，请修改 kubeappsctl.sh 文件里的 repo_url、repo_username、repo_password 等参数。
安装过程中需要手动输入的信息，选择默认值，即选择不使用外部 Docker Image registry 和不使用外部 Chart 仓库。

```bash
# 首先登录 master 节点，其次进入 tmp (或其他自定义)目录
cd /tmp
wget http://xxx.xxx.xxx.xxx/kubeapps-plus/kubeapps-plus-package-v1.0-CI-xx.tar.gz
# 解压文件到本目录
tar zxvf kubeapps-plus-package-v1.0-CI-xx.tar.gz
# 解压后会出现一个 kubeapps-plus-CI 目录
cd kubeapps-plus-CI
# 执行 kubeappsctl.sh shell 文件,将会下载镜像并推送到本地(或自定义)仓库
./kubeappsctl.sh start
```

#### 负载均衡服务

公开 KubeApps Plus 仪表板的最简单方法是将 LoadBalancer 类型分配给 KubeApps Plus 前端服务。 例如, 您可以使用以下参数: `frontend.service.type = LoadBalancer`

等待您的集群将 LoadBalancer IP 或 主机名 分配给 `kubeapps-plus` 服务并在该地址上访问它: 

```console
$ kubectl get services --namespace kubeapps-plus --watch
```

#### Ingress

此图表为入口资源提供支持, 可以利用 Ingress 控制器公开 KubeApps Plus。

要启用入口集成, 请将 “ingress.enabled” 设置为 `true`。

##### Hosts

您很可能只想拥有一个映射到此 KubeApps Plus 安装的主机名(使用 `ingress.hostname` 参数设置主机名), 但是, 可能有多个主机。 为方便起见, `ingress.extraHosts` 对象是一个数组。

## 卸载 Chart

```console
$ helm delete --purge kubeapps-plus
```

### 升级 chart

1.  (可选)备份您的个人存储库(如果有): 

```console
kubectl get apprepository --namespace kubeapps-plus -o yaml <repo name> > <repo name>.yaml
```

2.  删除 KubeApps Plus : 

```console
helm del --purge kubeapps-plus
```

3.  (可选)删除应用程序存储库 CRD: 

> **注**: 如果您的集群中安装了多个 KubeApps Plus, 请不要执行此步骤。

```console
kubectl delete crd apprepositories.kubeapps.com
```

4.  (可选)清理 KubeApps Plus 命名空间:

> **注**: 如果 kubeapps-plus 命名空间中的工作负载不是 KubeApps Plus, 则不要执行此步骤。

```console
kubectl delete namespace kubeapps-plus
```

5.  安装最新版本的 KubeApps Plus (使用您需要的任何自定义修改): 

```console
helm repo update
helm install --name kubeapps-plus --namespace kubeapps-plus ./chart
```

6.  (可选)还原第一步中备份的所有存储库: 

```console
kubectl apply -f <repo name>.yaml
```