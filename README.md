# <img src="./docs/img/logo.png" width="40" align="left"> KubeApps Plus

![License](https://img.shields.io/badge/License-Apache%202.0-red)
![HitCount](http://hits.dwyl.io/kubeoperator/kubeapps-plus.svg)

KubeApps Plus 是 KubeApps 的扩展项目，基于 Web UI 界面在 Kubernetes 集群中部署和管理 Helm-based 的应用程序。
      
> [KubeApps](https://github.com/kubeapps/kubeapps) 是由 [Bitnami](https://bitnami.com/) 发布的 Kubernetes 应用商店。KubeApps Plus 的主要扩展是中文本地化、离线应用包支持。KubeApps Plus 使用 Apache License 2.0 许可, 与 [KubeApps](https://github.com/kubeapps/kubeapps/blob/master/LICENSE) 相同.

> KubeApps Plus is an extension for [KubeApps](https://github.com/kubeapps/kubeapps) which is a popular application dashboard on Kubernetes developed by [Bitnami](https://bitnami.com/). The main extensions are Chinese localization and offline application package support. KubeApps Plus is licensed under the Apache License 2.0, same as [KubeApps](https://github.com/kubeapps/kubeapps/blob/master/LICENSE).

## 主要功能

- 从 Helm Chart Repo 中浏览并部署 Helm Chart 应用；
- 集群中已有 Helm-based 应用的查看、升级和卸载；
- 支持自定义 Helm Chart Repo（比如 ChartMuseum 和 JFrog Artifactory 等）；
- 基于 Kubernetes RBAC 的身份验证和授权；

## 安装 KubeApps Plus

- 自动安装：KubeApps Plus 是 KubeOperator 的一个内置应用。通过 KubeOperator 部署的 K8s 集群会自动安装上 KubeApps Plus；
- 手动安装：使用如下脚本自行在已有 K8s 集群中安装 KubeApps Plus；

```bash
git clone https://github.com/KubeOperator/kubeapps-plus.git
cd kubeapps_plus
helm install --name kubeapps-plus --namespace kubeapps-plus ./chart
```

具体请参考：[KubeApps Plus 手动安装指南](chart+/README.md)

## 使用 KubeApps Plus

- 具体请参考：[KubeApps Plus 使用指南](docs/user/getting-started.md)

## KubeApps Plus 开发指南

- [Kubeapps Plus 架构说明](docs/architecture/overview.md)；
- [KubeApps Plus 构建指南](docs/developer/build.md)；
- [KubeApps Plus 开发文档](docs/developer/README.md)；

## 沟通交流
 
- 技术交流 QQ 群：825046920；
- 技术支持邮箱：support@fit2cloud.com；
- 微信群： 搜索微信号 wh_it0224，添加好友，备注（城市-github用户名）, 验证通过会加入群聊。
