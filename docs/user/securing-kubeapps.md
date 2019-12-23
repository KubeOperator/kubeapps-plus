# 保护 Kubeapps Plus 安装

在本指南中, 我们将说明如何保护多租户群集中Kubeapps Plus的安装。 仅当具有不同权限的不同人员可以访问同一群集时, 才需要执行以下步骤。 可以在[here](https://github.com/kubernetes/helm/blob/master/docs/securing_installation.md)中找到保护helm的通用说明。

主要目标是确保对[Tiller](https://github.com/kubernetes/helm/blob/master/docs/securing_installation.md)的访问(helm服务器端组件)。 Tiller有权创建或删除集群中的任何资源, 因此我们在公开其提供的功能时应格外小心。

为了利用Kubeapps Plus安全功能, 您需要配置两件事: ** TLS证书**, 用于控制对Tiller和[** RBAC角色**]的访问(https://kubernetes.io/docs/reference/access-authn-authz/rbac/)授权请求。

## 安全安装 Tiller

您可以遵循Helm文档以安全方式部署Tiller。 我们尤其对以下方面感兴趣: 

- 使用TLS证书控制对Tiller部署的访问: https://docs.helm.sh/using_helm/#using-ssl-between-helm-and-tiller
- 将发布信息存储为秘密: https: //docs.helm.sh/using_helm/#tiller-s-release-information

从这些指南中, 您可以找到如何创建TLS证书以及安全安装Tiller的必要标志: 

```
helm init --tiller-tls --tiller-tls-verify \
  --override 'spec.template.spec.containers[0].command'='{/tiller,--storage=secret}' \
  --tiller-tls-cert ./tiller.cert.pem \
  --tiller-tls-key ./tiller.key.pem \
  --tls-ca-cert ca.cert.pem
```

## 使用TLS证书部署Kubeapps Plus

这是使用我们的证书安装Kubeapps Plus的命令: 

```bash
git clone https://github.com/KubeOperator/kubeapps-plus.git
cd kubeapps_plus
helm install \
  --tls --tls-ca-cert ca.cert.pem --tls-cert helm.cert.pem --tls-key helm.key.pem \
  --set tillerProxy.tls.ca="$(cat ca.cert.pem)" \
  --set tillerProxy.tls.key="$(cat helm.key.pem)" \
  --set tillerProxy.tls.cert="$(cat helm.cert.pem)" \
  --name kubeapps-plus \
  --namespace kubeapps-plus \
  ./chart
```

> Note: 要使用“ tls-verify”标志(并验证Tiller主机名), 证书应已在群集内配置了Tiller的主机: 默认情况下为“ tiller-deploy.kube-system”。

## 启用 RBAC

为了能够授权来自用户的请求, 必须在Kubernetes集群中启用[RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)。 某些提供程序默认情况下启用了它, 但是在某些情况下, 您需要显式设置它。 查看您的提供商文档以了解如何启用它。 要验证您的集群是否具有可用的RBAC, 您可以检查API组是否存在: 

```
$ kubectl api-versions | grep rbac.authorization
rbac.authorization.k8s.io/v1
```

一旦您的群集启用了RBAC, 请阅读[本文档](/docs/user/access-control.md), 以了解如何使用标识用户帐户的令牌登录Kubeapps Plus, 以及如何创建具有不同权限的用户。

简而言之, Kubeapps Plus授权将验证: 

- 获取版本详细信息时, 它将检查用户是否对版本的所有组件都具有“读取”访问权限。
- 在创建, 升级或删除发行版时, 它会检查是否允许用户创建, 更新或删除发行表中包含的所有组件。

例如, 如果用户帐户“ foo”要部署由“部署”和“服务”组成的图表“ bar”, 则应具有足够的权限来创建其中的每一个。 在其他情况下, 它将收到一条错误消息, 提示缺少部署图表所需的权限。