# Kubeapps Helm 3支持

我们认为, 可以通过以下方式完成向Helm 3的过渡: 旧的分er代理和新的Helm 3组件可以共存, 并且无需修改仪表板。
应在部署时在Helm中进行Helm 2支持和Helm 3支持之间的选择(例如, 通过在Values中设置`helm3 = true`)。

由于Helm 3摆脱了Tiller, 因此它提供了一个客户端库, 可用于访问所有必需的命令。
我们没有理由为Helm 3实现代理, 而是我们所谓的代理-毕竟, 其目的是从所谓的_Helm 3“ actions”库中执行_actions_。

**现在的情况:**
![现在的情况](https://user-images.githubusercontent.com/7773090/67413010-ac044e00-f5c0-11e9-93e9-f3cdd1eeaca8.PNG)

**随着新增加:**
![随着新增加](https://user-images.githubusercontent.com/7773090/67413025-b45c8900-f5c0-11e9-8961-67377bc8faad.PNG)

## 认证方式

由于Helm 2是基于Tiller服务使用其自己的服务帐户在群集中运行(并且[没有提供将用户凭据映射到Kubernetes中的特定权限的方式](https://helm.sh/docs/securing_installation/＃tiller-and-user-permissions））, 则Kubeapps唯一需要提供的Tiller身份验证(使用TLS时)是`ca.crt`文件。
因此, Kubeapps当前(使用Helm 2)不仅使用直接与API服务器通信时, 还使用用户的承载令牌向Kubernetes API服务器进行身份验证, 而且还要在向Tiller提出任何请求之前验证权限。

使用Helm 3, 所有身份验证将由Kubernetes API服务器处理, 因此以上都不是问题。
我们的计划是, 每当仪表板发出请求时, 我们都将使用InClusterConfig创建一个配置, 我们将其配置文件BearerToken替换为仪表板请求中包含的用户特定令牌。