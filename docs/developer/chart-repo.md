# Kubeapps Plus chart-repo开发人员指南

“ chart-repo”组件是一种工具，可扫描Helm图表存储库并在MongoDB服务器中填充图表元数据。 然后，由“ chartsvc”组件提供此元数据。 其源代码保存在[Monocular项目存储库](https://github.com/helm/monocular)中。

## 先决条件

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

“ chart-repo”源位于“ cmd / chart-repo /”目录下。

### 在您的集群中安装Kubeapps Plus

Kubeapps Plus是Kubernetes本地应用程序。 要开发和测试Kubeapps Plus组件，我们需要一个已安装Kubeapps Plus的Kubernetes集群。 遵循[Kubeapps Plus安装指南](../../ chart / kubeapps / README.md)在您的群集中安装Kubeapps Plus。

### 构建 `chart-repo` 镜像

```bash
cd $MONOCULAR_DIR
go mod tidy
make -C cmd/chart-repo docker-build
```

这将构建`chart-repo` Docker镜像。 有关更多详细信息，请参考[Monocular Developers Guide](https://github.com/helm/monocular/blob/master/docs/development.md)。

### 在开发中运行

```bash
export MONGO_PASSWORD=$(kubectl get secret --namespace kubeapps kubeapps-mongodb -o go-template='{{index .data "mongodb-root-password" | base64decode}}')
telepresence --namespace kubeapps --docker-run -e MONGO_PASSWORD=$MONGO_PASSWORD --rm -ti quay.io/helmpack/chart-repo /chart-repo sync --mongo-user=root --mongo-url=kubeapps-mongodb stable https://kubernetes-charts.storage.googleapis.com
```

请注意，应重新构建图表仓库，以使新更改生效。

### 运行测试

您可以运行图表chart-repo测试以及Monocular项目的测试：

```bash
go test -v ./...
```
