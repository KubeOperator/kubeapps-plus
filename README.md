# <img src="./docs/img/logo.png" width="40" align="left"> Kubeapps Plus

![License](https://img.shields.io/badge/License-Apache%202.0-red)
![HitCount](http://hits.dwyl.io/kubeoperator/kubeapps-plus.svg)

>
>Kubeapps Plus is an extension for [Kubeapps](https://github.com/kubeapps/kubeapps) which is a popular application dashboard on Kubernetes powered by [bitnami](https://bitnami.com/). The main extensions are localization for chinese and supporting offline application package management.<br>
>Kubeapps Plus is licensed under the Apache License 2.0, same as [Kubeapps](https://github.com/kubeapps/kubeapps/blob/master/LICENSE).
>              
>Kubeapps Plus是基于[Kubeapps](https://github.com/kubeapps/kubeapps)的扩展, [Kubeapps](https://github.com/kubeapps/kubeapps)是由[bitnami](https://bitnami.com/)发布的面向Kubernetes的应用服务目录。Kubeapps Plus的主要扩展是中文本地化, 以及支持离线应用包的管理。<br>
>Kubeapps Plus使用Apache License 2.0许可, 与[Kubeapps](https://github.com/kubeapps/kubeapps/blob/master/LICENSE)相同.
>***

## 一、概要

Kubeapps Plus 是借鉴 kubeapps 的一个国产项目。基于 Web 的UI, 用于在 Kubernetes 集群中部署和管理应用程序。

## 二、功能说明

- 从图表存储库浏览和部署图表 [Helm](https://github.com/helm/helm)
- 检查, 升级和删除群集中安装的基于 Helm 的应用程序
- 添加自定义和 [私人图表存储库](docs/user/private-app-repository.md) (支持 [ChartMuseum](https://github.com/helm/chartmuseum) 和 [JFrog Artifactory](https://www.jfrog.com/confluence/display/RTF/Helm+Chart+Repositories))
- 从以下位置浏览并提供外部服务 [服务目录](https://github.com/kubernetes-incubator/service-catalog)
- 使用服务目录绑定将基于 Helm 的应用程序连接到外部服务
- 基于 Kubernetes 的安全身份验证和授权 [基于角色的访问控制](docs/user/access-control.md)

## 三、基于角色的使用流程

- 管理员角色安装、注册 Kubeapps Plus, 工作空间用户开通上面的其他应用。

![基于角色的使用流程](../docs/img/user-role-process.png)

## 四、快速开始

使用 Helm 图表安装最新版本的 Kubeapps Plus: 

```bash
git clone https://github.com/KubeOperator/kubeapps-plus.git
cd kubeapps_plus
helm install --name kubeapps-plus --namespace kubeapps-plus ./chart
```

有关如何安装和使用 Kubeapps Plus 的详细说明, 请遵循 [入门指南](docs/user/getting-started.md).

## 五、开发人员文件

- The [Kubeapps Plus 构建指南](docs/developer/build.md) 有关从源代码设置构建环境和构建 Kubeapps Plus 的说明。
- The [Kubeapps Plus 开发人员文档](docs/developer/README.md) 有关设置开发人员环境以在 Kubeapps Plus 及其组件上进行开发的说明。

## 六、下一步

如果您已按照 [安装 Kubeapps Plus](docs/user/getting-started.md) 的说明进行操作,  请检查如何 [使用 Kubeapps Plus](docs/user/dashboard.md) 轻松管理在集群中运行的应用程序, 或 [深入了解Kubeapps Plus中包含的内容]](docs/architecture/overview.md).

## 七、相关资源

- [初学者入门](docs/user/getting-started.md)
- [详细的安装说明](chart+/README.md)
- [Kubeapps Plus仪表板文档](docs/user/dashboard.md)
- [Kubeapps Plus组件](docs/architecture/overview.md)

## 八、沟通交流
 
- 技术交流 QQ 群：825046920；
- 技术支持邮箱：support@fit2cloud.com；
- 微信群： 搜索微信号 wh_it0224，添加好友，备注（城市-github用户名）, 验证通过会加入群聊；