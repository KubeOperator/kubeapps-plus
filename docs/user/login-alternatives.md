# Kubeapps Plus登录

默认情况下, 首次访问Kubeapps Plus时, 将显示一个登录表单, 供用户引入Kubernetes API令牌: 

![控制台登录](../img/dashboard-login.png)

登录表单的目的是识别用户并将其与Kubernetes服务帐户关联。 Kubeapps Plus将使用此身份信息根据Kubernetes API对用户进行身份验证。 您可以在此[document](./access-control.md)中找到有关Kubeapps Plus的访问控制的更多信息。

但是, 可以禁用该表单或将身份验证委派给OAuth2/OIDC提供程序, 因此用户无需在登录表单中引入令牌。

## 绕过身份验证

如果Kubeapps Plus检测到反向代理(例如Ingress)已经设置了“ Authorization”标头, 则会跳过登录表单。 可以将Ingress对象配置为在对Kubeapps Plus的每个请求上注入硬编码的有效Kubernetes API令牌, 以强制跳过登录表单并允许所有API请求使用硬编码的令牌。

**NOTE**: 在生产中不建议这样做, 因为任何有权访问Kubeapps Plus的人都将被授予与硬编码令牌关联的权限。

这是您可以在Kubeapps Plus图表中配置以设置有效令牌的值的示例: 

```yaml
ingress:
  enabled: true
  hosts:
    - name: kubeapps.local
      path:/
      tls: false
  annotations:
    nginx.ingress.kubernetes.io/proxy-read-timeout: "600"
    nginx.ingress.kubernetes.io/configuration-snippet: |
      add_header Authorization "Bearer TOKEN";
```

您只需要用令牌的实际值替换令牌即可。 上面假设Nginx [入口控制器](https://kubernetes.io/docs/concepts/services-networking/ingress/#ingress-controllers), 以防使用其他控制器而需要修改注释的情况。

# 使用OAuth2/OIDC提供程序

如果您想使用OpenID Connect对Kubeapps Plus用户进行身份验证, 并且您的Kubernetes API服务器配置为使用相同的OAuth2/OIDC提供程序, 请遵循此[guide](./using-an-OIDC-provider.md)。