# Kubeapps Plus分iller代理开发指南

“ tiller-proxy”组件是一个微服务, 可创建用于访问Helm Tiller服务器的API端点。

## 先决条件

- [Git](https://git-scm.com/)
- [Make](https://www.gnu.org/software/make/)
- [Go programming language](https://golang.org/dl/)
- [Docker CE](https://www.docker.com/community-edition)
- [Kubernetes cluster (v1.8+)](https://kubernetes.io/docs/setup/pick-right-solution/). [Minikube](https://github.com/kubernetes/minikbue) is recommended.
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

## 环境

```bash
export GOPATH=~/gopath
export PATH=$GOPATH/bin:$PATH
export KUBEAPPS_DIR=$GOPATH/src/github.com/kubeapps/kubeapps
```
## 下载kubeapps plus源代码

```bash
git clone --recurse-submodules https://github.com/kubeapps/kubeapps $KUBEAPPS_DIR
```

tiller-proxy源位于cmd/tiller-proxy/目录下, 并使用pkg目录中的软件包。

### 在您的集群中安装Kubeapps Plus

Kubeapps Plus是Kubernetes本地应用程序。 要开发和测试Kubeapps Plus组件, 我们需要一个已安装Kubeapps Plus的Kubernetes集群。 遵循[Kubeapps Plus安装指南](../../chart/kubeapps/README.md)在您的群集中安装Kubeapps Plus。

### 构建`tiller-proxy`二进制文件

```bash
cd $KUBEAPPS_DIR/cmd/tiller-proxy
go build
```

这将在工作目录中构建`tiller-proxy`二进制文件。

### 在开发中运行

如果您使用的是Minikube, 请务必启动启用RBAC的集群(在Minikube 0.26+中默认情况下处于启用状态), 以便检查授权功能: 

```
minikube start
eval $(minikube docker-env)
```

注意: 默认情况下, Kubeapps Plus会尝试获取图像的最新版本, 因此为了使此工作流在Minikube中正常工作, 您需要首先更新imagePullPolicy: 

```
kubectl patch deployment kubeapps-internal-tiller-proxy -n kubeapps --type=json -p='[{"op": "replace", "path": "/spec/template/spec/containers/0/imagePullPolicy", "value": "IfNotPresent"}]'
```

创建`tiller-proxy`映像的最简单方法是执行Makefile任务来执行此操作: 

```bash
IMAGE_TAG=dev make kubeapps/tiller-proxy
```

这将生成一个映像kubeapps/tiller-proxy: dev, 可以在当前部署中使用: 

```
kubectl set image -n kubeapps deployment kubeapps-internal-tiller-proxy proxy=kubeapps/tiller-proxy:dev
```

为了进一步重新部署, 您可以更改版本以部署不同的标记或重建相同的映像并重新启动Pod执行: 

```
kubectl delete pod -n kubeapps -l app=kubeapps-internal-tiller-proxy
```

注意: 如果您使用云提供商来开发服务, 则需要重新标记映像并将其推送到公共注册表。

### 运行测试

您可以运行分er代理测试以及所有项目的测试

```bash
make test
```
