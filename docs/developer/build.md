# KubeApps Plus 构建指南

本指南说明了如何构建 KubeApps Plus。

## 前提条件

- [Git](https://git-scm.com/)
- [Make](https://www.gnu.org/software/make/)
- [Go programming language](https://golang.org/)
- [kubecfg](https://github.com/ksonnet/kubecfg)
- [Docker CE](https://www.docker.com/community-edition)

## 环境设定

```bash
export GOPATH=~/gopath
export PATH=$GOPATH/bin:$PATH
export KUBEAPPS_DIR=$GOPATH/src/github.com/KubeOperator/kubeapps-plus
```
## 下载 KubeApps Plus 源代码

```bash
git clone git@github.com:KubeOperator/kubeapps-plus.git $KUBEAPPS_DIR
cd $KUBEAPPS_DIR
```

## 构建 KubeApps Plus

KubeApps Plus 由许多集群内组件组成。 一次性构建所有这些组件: 

```bash
make IMAGE_TAG=myver all
```

或者, 如果您希望构建特定的组件, 请执行以下操作: 

```bash
# to build the kubeapps-plus binary
make IMAGE_TAG=myver kubeapps-plus

# to build the kubeapps/dashboard docker image
make IMAGE_TAG=myver kubeapps/dashboard

# to build the kubeapps/apprepository-controller docker image
make IMAGE_TAG=myver kubeapps/apprepository-controller

# to build the kubeapps/tiller-proxy docker image
make IMAGE_TAG=myver kubeapps/tiller-proxy
```

## 运行测试

要测试所有组件: 

```bash
make test
```

或者, 如果您想测试特定组件, 请执行以下操作: 

```bash
# to test the kubeapps-plus binary
make test-kubeapps-plus

# to test kubeapps-plus/dashboard
make test-dashboard

# to test the cmd/apprepository-controller package
make test-apprepository-controller

# to test the cmd/tiller-proxy package
make test-tiller-proxy
```
