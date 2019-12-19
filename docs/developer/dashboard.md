# Kubeapps Plus仪表板开发人员指南

仪表板是Kubeapps Plus项目的主要UI组件。 仪表板使用Javascript编写，使用VUE Javascript库作为前端。

## 先决条件

- [Git](https://git-scm.com/)
- [Node 8.x](https://nodejs.org/)
- [Yarn](https://yarnpkg.com)
- [Kubernetes cluster (v1.8+)](https://kubernetes.io/docs/setup/pick-right-solution/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Docker CE](https://www.docker.com/community-edition)
- [Telepresence](https://telepresence.io)

*网真并不是一个硬性要求，但建议使用它来获得更好的开发人员体验*

## 环境

```bash
export GOPATH=~/gopath
export PATH=$GOPATH/bin:$PATH
export KUBEAPPS_DIR=$GOPATH/src/github.com/kubeapps/kubeapps
```
## 下载kubeapps-plus源代码

```bash
git clone --recurse-submodules https://github.com/kubeapps/kubeapps $KUBEAPPS_DIR
```

仪表板应用程序源位于存储库的“ dashboard /”目录下

```bash
cd $KUBEAPPS_DIR/dashboard
```

### 在您的集群中安装Kubeapps Plus

Kubeapps Plus是Kubernetes本地应用程序。 要开发和测试Kubeapps Plus组件，我们需要一个已安装Kubeapps Plus的Kubernetes集群。 遵循[Kubeapps Plus安装指南](../../ chart / kubeapps / README.md)在您的群集中安装Kubeapps Plus。

### 在开发中运行仪表板

[网真](https://www.telepresence.io/)是Kubernetes微服务的本地开发工具。 由于仪表板是在Kubernetes集群中运行的服务，因此我们使用网真将对集群中运行的仪表板的请求代理到本地开发主机。

首先安装仪表板依赖包：

```bash
yarn install
```

接下来，创建一个“ telepresence”外壳，以交换“ kubeapps”命名空间中的“ kubeapps-internal-dashboard”部署，并将本地端口“ 3000”转发到“ kubeapps-internal-dashboard” pod的端口“ 8080”。

```bash
telepresence --namespace kubeapps-plus --method inject-tcp --swap-deployment kubeapps-internal-dashboard --expose 3000:8080 --run-shell
```

> **NOTE**: 如果遇到使此设置正常运行的问题，请尝试将上述命令中的智真代理方法切换为“ vpn-tcp”。 请参阅[网真文档](https://www.telepresence.io/reference/methods)，以了解有关可用代理方法及其局限性的更多信息。

最后，在网真外壳中启动仪表板

```bash
yarn run start
```

现在，您只需像往常一样访问仪表板即可访问本地开发服务器(例如，进行端口转发或访问Ingress URL)。

#### 故障排除

在某些情况下，即使断开网真，“创建VUE应用”脚本仍会继续监听3000端口。 如果您发现localhost：3000仍在服务于仪表板，即使您的网真已关闭，请检查是否正在运行“ Create VUE App”脚本进程(“ ps aux | grep react”)并将其杀死。

### 运行测试

在显示板目录中执行以下命令以启动测试运行程序，该运行程序将监视更改并在检测到更改时自动重新运行测试。

```bash
yarn run test
```

> **NOTE**: macOS用户可能需要安装watchman(https://facebook.github.io/watchman/)。

