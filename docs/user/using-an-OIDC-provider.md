# 将OAuth2/OIDC提供程序与Kubeapps Plus一起使用

OpenID Connect(OIDC)是OAuth 2.0协议之上的一个简单的身份层, 它允许客户端基于授权服务器执行的身份验证来验证用户的身份, 以及获取有关用户的基本配置文件信息。

可以将您的Kubernetes集群配置为使用OIDC提供程序, 以便通过单个应用程序管理帐户, 组和角色。 此外, 某些托管的Kubernetes环境允许通过普通OAuth2(GKE)进行身份验证。
本指南将说明如何使用现有的OAuth2提供程序(包括OIDC)对Kubeapps Plus中的用户进行身份验证。

## 先决条件

对于本指南, 我们假设您具有一个Kubernetes群集, 该群集已正确配置为使用身份提供程序(IdP)来处理对群集的身份验证。 您可以在[此处](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#openid-connect-tokens)中找到有关Kubernetes如何使用OIDC令牌的更多信息。 这意味着应该将Kubernetes API服务器配置为使用该OIDC提供程序。

Kubernetes集群中可以使用多个身份提供者(IdP)。 已使用以下提供程序验证了本指南的步骤: 

- [Keycloak](https://www.keycloak.org/): 开源身份和访问管理。
- [Dex](https://github.com/dexidp/dex): 带有可插拔连接器的开源OIDC和OAuth 2.0提供程序。
- [Azure Active Directory](https://docs.microsoft.com/zh-cn/azure/active-directory/fundamentals/active-directory-whatis): 可以用于AKS的身份提供程序。
- [Google OpenID Connect](https://developers.google.com/identity/protocols/OpenIDConnect): 适用于Google帐户的OAuth 2.0。

为了使Kubeapps Plus使用身份提供程序, 必须至少配置以下参数: 

- 客户ID: IdP的客户ID。
- 客户端机密: (如果已配置)用于验证客户端ID的机密。
- 提供程序名称(可以为oidc, 在这种情况下, 还需要OIDC颁发者URL)。
- Cookie机密: 16、24或32字节的base64编码种子字符串, 用于加密敏感数据(例如, “ echo“ not-good-secret” | base64“)。

**Note**: 根据身份提供者的配置, 可能需要更多参数。

Kubeapps Plus使用[OAuth2代理](https://github.com/pusher/oauth2_proxy)处理OAuth2/OpenIDConnect身份验证。 以下各节说明如何为测试的某些身份提供程序找到上述参数。 如果已将群集配置为使用身份提供程序, 则您将已经知道其中一些参数。 可以在[OAuth2代理验证配置页面](https://pusher.github.io/oauth2_proxy/auth-configuration)上找到更多详细信息。

### Keycloak

如果是Keycloak, 则可以在Keycloak管理控制台中找到参数: 

- 客户端ID: Keycloak客户端ID。
- 客户端机密: 与上述客户端关联的机密。
- OIDC发行者网址: `https: // <keycloak.domain>/auth/realms/<realm>`。

### Dex

对于Dex, 您可以在服务器从中读取配置的配置(如果在群集中部署Dex, 则为ConfigMap)中找到需要设置的参数。 请注意, 由于Dex只是一个连接器, 因此您需要使用一些第三方凭据(可能也包括client-id和client-secret)对其进行配置。 不要将这些凭证与您在“ staticClients”部分下可以找到的应用程序的凭证混淆。

- 客户端ID: 静态客户端ID。
- 客户端机密: 静态客户端机密。
- OIDC发行者网址: Dex URL(即https://dex.example.com:32000)。

### Azure活动目录

要使用Azure Active Directory设置Azure Kubernetes群集(aks), 可以遵循[本指南](https://docs.microsoft.com/zh-cn/azure/aks/aad-integration)。 在本教程的最后, 您应该有一个Active Directory应用程序(服务器)。 那就是我们将从中获取所需参数的应用程序。

- 客户端ID: Azure Active Directory服务器应用程序ID。
- 客户机密: 服务器应用程序的“密码”密钥。
- OIDC颁发者网址: `https: //sts.windows.net/<Tenant-ID>/`。 租户ID可以在“主页>默认目录-属性>目录ID”中找到。

### Google OIDC

对于Google, 我们可以使用OAuth 2.0客户端ID。 您可以在[here](https://developers.google.com/identity/protocols/OpenIDConnect)中找到更多信息。 特别是, 我们将使用“ Web应用程序”。

- 客户端ID: `<abc> .apps.googleusercontent.com`。
- 客户端秘密: Web应用程序的秘密。
- OIDC发行者网址: https: //accounts.google.com。

## 部署代理以访问Kubeapps Plus

身份验证的主要区别在于, 我们将访问oauth2代理服务, 而不是访问Kubeapps Plus服务, 该服务负责使用身份提供者对用户进行身份验证, 并在对Kubeapps Plus的请求中注入所需的凭据。 针对此用例, 有许多可用的解决方案, 例如[keycloak-gatekeeper](https://github.com/keycloak/keycloak-gatekeeper)和[oauth2_proxy](https://github.com/pusher/oauth2_proxy )。 在本指南中, 我们将使用`oauth2_proxy`, 因为它为许多提供程序都支持OIDC和纯OAuth2。

一旦可以访问代理, 您将被重定向到身份提供者进行身份验证。 成功进行身份验证后, 您将被重定向到Kubeapps Plus, 并使用用户的OIDC令牌进行身份验证。

下一节将说明如何使用Kubeapps Plus图表或手动部署此代理。

### 使用图表

如果指定了必要的标志, 则Kubeapps Plus图表可让您自动将代理作为Sidecar容器部署。 简而言之, 您需要启用该功能并设置客户端ID, 密码和IdP URL。 以下示例使用Google作为身份提供者, 修改以下标志以使其适应: 

**示例1: 使用OIDC提供程序**

此示例将`oauth2-proxy`的通用OIDC提供程序与Google一起使用, 但适用于任何OIDC提供程序, 例如Keycloak, Dex, Okta或Azure Active Directory等。 带有一个选项, 该选项仅允许通过不安全的连接设置cookie以用于本地开发: 

```
helm install bitnami/kubeapps \
  --namespace kubeapps --name kubeapps \
  --set authProxy.enabled=true \
  --set authProxy.provider=oidc \
  --set authProxy.clientID=my-client-id.apps.googleusercontent.com \
  --set authProxy.clientSecret=my-client-secret \
  --set authProxy.cookieSecret=$(echo "not-good-secret" | base64) \
  --set authProxy.additionalFlags="{-cookie-secure=false,-oidc-issuer-url=https://accounts.google.com}" \
```

**示例2: 使用自定义的oauth2-proxy提供程序**

oauth2-proxy随附的某些特定提供程序正在使用OpenIDConnect获取所需的IDToken, 并且可以代替通用oidc提供程序使用。 当前, 这仅包括GitLab, Google和LoginGov提供程序(有关OAuth2提供程序的完整列表, 请参见[OAuth2_Proxy的提供程序配置](https://pusher.github.io/oauth2_proxy/auth-configuration））。 用户身份验证流程与上述相同, 但UI有所不同, 例如默认的登录按钮是为提供程序定制的(而不是“使用OpenID Connect登录”), 或者在接受请求的范围时进行了改进的表示(例如 Google的情况下, 但只有在您请求附加范围时才可见)。

在这里, 我们不再需要提供发出者-url作为附加标志: 

```
helm install bitnami/kubeapps \
  --namespace kubeapps --name kubeapps \
  --set authProxy.enabled=true \
  --set authProxy.provider=google \
  --set authProxy.clientID=my-client-id.apps.googleusercontent.com \
  --set authProxy.clientSecret=my-client-secret \
  --set authProxy.cookieSecret=$(echo "not-good-secret" | base64) \
  --set authProxy.additionalFlags="{-cookie-secure=false}"
```

**示例3: GKE集群上的Kubeapps Plus身份验证**

Google Kubernetes Engine不允许使用OIDC IDToken来验证对托管API服务器的请求, 而需要使用标准OAuth2访问令牌。
因此, 在GKE上部署Kubeapps Plus时, 我们需要确保

*包括用户与云平台交互所需的范围, 并且
*当与托管Kubernetes API通信时, Kubeapps Plus前端使用OAuth2`access_key`作为承载令牌。

请注意, 在此处使用自定义`google`提供程序可使google以用户友好的方式提示用户同意以下范围中请求的特定权限。 您也可以使用oidc提供程序, 但是在这种情况下, 不会提示用户征求额外的同意: 

```
helm install bitnami/kubeapps \
  --namespace kubeapps --name kubeapps \
  --set authProxy.enabled=true \
  --set authProxy.provider=google \
  --set authProxy.clientID=my-client-id.apps.googleusercontent.com \
  --set authProxy.clientSecret=my-client-secret \
  --set authProxy.cookieSecret=$(echo "not-good-secret" | base64) \
  --set authProxy.additionalFlags="{-cookie-secure=false,-scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/cloud-platform}" \
  --set frontend.proxypassAccessTokenAsBearer=true
```

### 手动部署

如果要手动部署代理, 首先, 您将为该代理创建Kubernetes部署和服务。 对于下面的代码段, 您需要设置环境变量AUTH_PROXY_CLIENT_ID, AUTH_PROXY_CLIENT_SECRET, AUTH_PROXY_DISCOVERY_URL和来自IdP和KuBEAPPS_NAMESPACE的信息。

```
export AUTH_PROXY_CLIENT_ID=<ID>
export AUTH_PROXY_CLIENT_SECRET=<SECRET>
export AUTH_PROXY_DISCOVERY_URL=<URL>
export AUTH_PROXY_COOKIE_SECRET=$(echo "not-good-secret" | base64)
kubectl create -n $KUBEAPPS_NAMESPACE -f - -o yaml << EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    name: kubeapps-auth-proxy
  name: kubeapps-auth-proxy
spec:
  replicas: 1
  selector:
    matchLabels:
      name: kubeapps-auth-proxy
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
    type: RollingUpdate
  template:
    metadata:
      labels:
        name: kubeapps-auth-proxy
    spec:
      containers:
      - args:
        - -provider=oidc
        - -client-id=$AUTH_PROXY_CLIENT_ID
        - -client-secret=$AUTH_PROXY_CLIENT_SECRET
        - -oidc-issuer-url=$AUTH_PROXY_DISCOVERY_URL
        - -cookie-secret=$AUTH_PROXY_COOKIE_SECRET
        - -upstream=http://localhost:8080/
        - -http-address=0.0.0.0:3000
        - -email-domain="*"
        - -pass-basic-auth=false
        - -pass-access-token=true
        - -pass-authorization-header=true
        image: bitnami/oauth2-proxy
        imagePullPolicy: IfNotPresent
        name: kubeapps-auth-proxy
---
apiVersion: v1
kind: Service
metadata:
  labels:
    name: kubeapps-auth-proxy
  name: kubeapps-auth-proxy
spec:
  ports:
  - name: http
    port: 3000
    protocol: TCP
    targetPort: 3000
  selector:
    name: kubeapps-auth-proxy
  sessionAffinity: None
  type: ClusterIP
EOF
```

上面是一个示例部署, 根据身份提供者的配置, 这些标志可能会有所不同。 对于此示例, 我们使用: 

- `-client-id`, `-client-secret`和`-oidc-issuer-url`: 如上节所述, 客户端ID, 机密和IdP URL。
- `-upstream`: `kubeapps`服务的内部URL。
- `-http-address = 0.0.0.0: 3000`: 在所有界面中监听。

**NOTE**: 如果身份提供者使用自签名证书部署(Keycloak或Dex可能是这种情况), 则需要禁用TLS和cookie验证。 为此, 您可以在上面的部署中添加标志-ssl-insecure-skip-verify和标志--cookie-secure = false。 您可以在[此处](https://pusher.github.io/oauth2_proxy/docs/configuration)中找到`oauth2-proxy`的更多选项。

#### 公开代理

一旦代理就位并且能够连接到IdP, 我们将需要公开它以将其作为Kubeapps Plus的主要端点(而不是`kubeapps`服务)进行访问。 我们可以使用Ingress对象来实现。 请注意, 这样做需要一个[入口控制器](https://kubernetes.io/docs/concepts/services-networking/ingress/#ingress-controllers)。 还有其他方法可以公开“ kubeapps-auth-proxy”服务, 例如, 在云环境中使用“ LoadBalancer”作为类型。 如果使用Ingress, 请记住将主机`kubeapps.local`修改为要用作Kubeapps Plus主机名的值: 

```
kubectl create -n $KUBEAPPS_NAMESPACE -f - -o yaml << EOF
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    nginx.ingress.kubernetes.io/connection-proxy-header: keep-alive
    nginx.ingress.kubernetes.io/proxy-read-timeout: "600"
  name: kubeapps
spec:
  rules:
  - host: kubeapps.local
    http:
      paths:
      - backend:
          serviceName: kubeapps-auth-proxy
          servicePort: 3000
        path:/
EOF
```
