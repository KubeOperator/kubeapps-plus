# Kubeapps Plus apprepository-controller开发人员指南

apprepository-controller是Kubernetes控制器, 用于管理添加到Kubeapps Plus的Helm图表存储库。

## 先决条件

- [Git](https://git-scm.com/)
- [Make](https://www.gnu.org/software/make/)
- [Go programming language](https://golang.org/dl/)
- [Docker CE](https://www.docker.com/community-edition)
- [Kubernetes cluster (v1.8+)](https://kubernetes.io/docs/setup/pick-right-solution/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Telepresence](https://telepresence.io)

*远程呈现并不是一个很难的要求, 但是推荐使用它来获得更好的开发体验*

## 环境

```bash
export GOPATH=~/gopath
export PATH=$GOPATH/bin:$PATH
export KUBEAPPS_DIR=$GOPATH/src/github.com/kubeapps/kubeapps
```

## 下载Kubeapps Plus源代码

```bash
git clone --recurse-submodules https://github.com/kubeapps/kubeapps $KUBEAPPS_DIR
```

“ apprepository-controller”源位于存储库的“ cmd/apprepository-controller/”目录下。

```bash
cd $KUBEAPPS_DIR/cmd/apprepository-controller
```

### 在您的集群中安装Kubeapps Plus

Kubeapps Plus是Kubernetes本地应用程序。 要开发和测试Kubeapps Plus组件, 我们需要一个已安装Kubeapps Plus的Kubernetes集群。 遵循[Kubeapps Plus安装指南](../../chart/kubeapps/README.md)在您的群集中安装Kubeapps Plus。

### 构建`apprepository-controller`二进制文件

```bash
go build
```

这将在工作目录中构建`apprepository-controller`二进制文件。

### 在开发中运行

在开发主机上运行`apprepository-controller`二进制文件之前, 我们应该停止在开发集群中运行的现有控制器。 最好的方法是将“ apprepository-controller”部署的副本数缩放为“ 0”。

```bash
kubectl -n kubeapps scale deployment apprepository-controller --replicas=0
```

> **NOTE** 完成后, 请记住将部署扩展回“ 1”副本

现在, 您可以使用以下命令在开发人员主机上执行“ apprepository-controller”二进制文件: 

```bash
./apprepository-controller --logtostderr --repo-sync-image=quay.io/helmpack/chart-repo:myver --kubeconfig ~/.kube/config
```

现在, 在Kubeapps Plus仪表板上执行应用程序存储库操作将触发在开发主机本地运行的“ apprepository-controller”二进制文件中的操作。

### 运行测试

要在apprepository-controller上开始测试, 请执行以下命令: 

```bash
go test
```

## 构建Kubeapps/存储库控制器Docker映像

要使用docker image标签myver构建`kubeapps/apprepository-controller` docker镜像: 

```bash
cd $KUBEAPPS_DIR
make IMAGE_TAG=myver kubeapps/apprepository-controller
```
