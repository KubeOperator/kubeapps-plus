# KubeApps Plus Chartsvc开发指南

“chartsvc” 组件是一个微服务, 它创建一个 API 端点来访问在 MongoDB 服务器中的 Helm 图表存储库中图表的元数据。 其源代码保存在[Monocular项目存储库](https://github.com/helm/monocular)中。

## 前提条件

- [Git](https://git-scm.com/)
- [Make](https://www.gnu.org/software/make/)
- [Go programming language](https://golang.org/dl/)
- [Docker CE](https://www.docker.com/community-edition)
- [Kubernetes cluster (v1.8+)](https://kubernetes.io/docs/setup/pick-right-solution/). [Minikube](https://github.com/kubernetes/minikbue) is recommended.
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Telepresence](https://telepresence.io)

## 环境

```bash
export GOPATH=~/gopath
export PATH=$GOPATH/bin:$PATH
export MONOCULAR_DIR=$GOPATH
```

## 下载Monocular源代码

```bash
git clone https://github.com/helm/monocular $MONOCULAR_DIR
```

“chartsvc” 源位于 “cmd/chartsvc/” 目录下。

### 在您的集群中安装 KubeApps Plus

KubeApps Plus 是 Kubernetes 本地应用程序。 要开发和测试 KubeApps Plus 组件, 我们需要一个已安装 KubeApps Plus 的 Kubernetes 集群。 遵循[KubeApps Plus安装指南](../../char/README.md) 在您的群集中安装 KubeApps Plus。

### 建立`chartsvc`图像

```bash
cd $MONOCULAR_DIR
dep ensure
make -C cmd/chartsvc docker-build
```

这将构建`chartsvc` Docker镜像。

### 在开发中运行

#### 选项1: 使用网真(推荐)

```bash
telepresence --swap-deployment kubeapps-internal-chartsvc --namespace kubeapps-plus --expose 8080:8080 --docker-run --rm -ti quay.io/helmpack/chartsvc/chartsvc --mongo-user=root --mongo-url=kubeapps-mongodb
```

请注意, 应重新构建Chartsvc, 以使新更改生效。

#### 选项2: 替换Chartsvc部署中的图像

注意: 默认情况下, KubeApps Plus 会尝试获取图像的最新版本, 因此为了使此工作流在 Minikube 中正常工作, 您需要首先更新 imagePullPolicy: 

```
kubectl patch deployment kubeapps-internal-chartsvc -n kubeapps-plus --type=json -p='[{"op": "replace", "path": "/spec/template/spec/containers/0/imagePullPolicy", "value": "IfNotPresent"}]'
```

```
kubectl set image -n kubeapps-plus deployment kubeapps-internal-chartsvc chartsvc=quay.io/helmpack/chartsvc:latest
```

为了进一步重新部署, 您可以更改版本以部署不同的标记或重建相同的映像并重新启动Pod执行: 

```
kubectl delete pod -n kubeapps-plus -l app=kubeapps-internal-chartsvc
```

注意: 如果您使用云提供商来开发服务, 则需要重新标记映像并将其推送到公共注册表。

### 运行测试

您可以将Chartsvc测试与Monocular项目的测试一起运行: 

```bash
go test -v ./...
```
