# AuthN/AuthZ in Kubeapps Plus

## 目的

利用Kubeapps Plus中Kubernetes的RBAC原语来：

1.  提供对仪表板的身份验证访问
1.  将仪表板中的某些操作限制为单个用户

## 动机

考虑一家企业MyCompany Ltd.，它希望向其员工提供Kubeapps Plus，作为部署和管理在Kubernetes集群中运行的应用程序的一种方式。 Kubeapps Plus由集群操作员安装到集群中，并通过Kubeconfig凭据进行访问。 员工在其本地计算机上运行Kubeapps Plus仪表板以访问Kubeapps Plus。

为了使访问Kubeapps Plus更加容易，群集操作员将Kubeapps Plus配置为可通过Ingress进行外部访问。 现在，每个人都可以访问_kubeapps.mycompany.com_来访问Kubeapps Plus仪表板。 为了限制对该外部域的访问，该公司希望使员工能够从其用户界面使用其Kubernetes凭据登录。

此外，该公司希望将管理某些应用程序的能力限制于某些团队。 他们为团队A创建一个受限制的名称空间，并且仅允许该团队中的员工通过创建适当的RBAC角色来查看，创建和管理该名称空间内的应用程序。 但是，由于Kubeapps Plus使用其自己的服务帐户和RBAC角色来访问Kubernetes API，因此所有员工都可以在Team A的命名空间中查看，创建和管理应用程序，即使他们的Kubeconfig凭据对其进行了限制。

如上所述，这是通过使用Kubeconfig凭据和RBAC角色在Kubernetes中解决的问题。 Kubernetes仪表板允许用户通过提供接受承载令牌的登录表单来利用其凭据和RBAC角色。 当用户使用令牌登录时，使用该令牌向Kubernetes API发出所有请求。 Kubeapps Plus仪表板具有与Kubernetes仪表板非常相似的访问机制，我建议我们遵循他们的脚步以启用经过身份验证和授权的访问。

## 目标与非目标

* 启用使用用户提供的Kubernetes凭据从UI访问Kubernetes API
* 利用现有的Kubernetes RBAC角色来限制未经授权的操作，提供一种根据名称空间或类型(Helm，Kubeless，服务目录等)限制操作的机制
* 支持以安全方式在外部公开Kubeapps Plus的能力，从而无需安装CLI即可更轻松地访问Kubeapps Plus
* 避免引入单独的方法来管理对Kubernetes资源的访问和授权(例如Kubeapps Plus内部用户数据库)
* 不支持所有可能的Kubernetes身份验证提供程序和方法

## 用户故事

* 作为集群运营商，我想在外部公开Kubeapps Plus，但只允许授权用户执行某些操作
* 作为组织中一个工程团队的成员，我希望能够在我的团队的命名空间中部署和管理应用程序，但是我不想访问另一个团队的应用程序
* 作为SRE，我想向我的团队提供访问权限以查看集群中正在运行的应用程序的状态，但是我不想放弃写访问权限以创建或删除应用程序
* 作为SRE，我希望限制访问服务目录中提供更昂贵的服务计划的权限

## 认证方式

集群运营商能够实施各种策略以对Kubernetes集群进行身份验证。 最常见的方法是客户端证书/密钥和令牌认证。 此外，身份验证代理可用于与其他身份验证协议集成，身份验证Webhook可用于验证令牌身份验证中的承载令牌。

### 在`Kubeapps Plus up'上配置身份验证提供程序

配置身份验证提供程序通常由集群运营商完成，并且通常需要使用标志来配置API服务器以启用不同的策略。 因此，使用身份验证提供程序配置群集超出了Kubeapps Plus的范围。

### 使用客户端证书/密钥验证登录

客户端证书和密钥对是针对群集进行身份验证的常用方法。 Kubeconfig可以指向文件系统中的证书或密钥，也可以将它们作为base64编码的字符串嵌入到文件中。 不幸的是，对于Kubeapps Plus，无法在XMLHttpRequest(浏览器AJAX请求)中包含客户端证书和密钥对，因此我们将无法在Kubeapps Plus中利用客户端证书/密钥身份验证(请参阅[＃200](https ：//github.com/Kubeapps Plus / Kubeapps Plus / issues / 200＃issuecomment-376617420））。

### 使用令牌验证登录

承载令牌通过HTTP请求中的_Authorization_标头传递，这使得它们很容易传递来自Kubeapps Plus的请求。 为了对用户使用令牌认证，集群运营商将需要使用[令牌认证文件](https://kubernetes.io/docs/admin/authentication/#static-token-file)配置API服务器。 用户令牌对。

但是，使用令牌身份验证的另一种方法是使用[服务帐户](https://kubernetes.io/docs/admin/authentication/#service-account-tokens)。 这些通常是在Pod中使用的机器人帐户，Kubernetes会生成承载令牌以供他们通过API进行身份验证。 由于大多数Kubernetes发行版都默认启用了服务帐户，因此它们可以为创建和管理用户对Kubeapps Plus的访问提供一种好方法。 Kubernetes仪表板[在其文档中描述了使用服务帐户为仪表板创建用户](https://github.com/kubernetes/dashboard/wiki/Creating-sample-user)。

集群运营商还可以将集群配置为使用[OpenID Connect令牌对用户进行身份验证](https://kubernetes.io/docs/admin/authentication/#openid-connect-tokens)。 可以从OpenID Connect提供程序(例如Azure Active Directory，Salesforce和Google)中检索这些令牌。 配置此方法后，可以将这些提供者之一返回的ID令牌用作承载令牌。 如您所见，支持令牌身份验证本身提供了许多不同的选项，用于配置对Kubernetes和Kubeapps Plus的访问。

## 用户体验

### 集群运营商

#### 配置Kubeapps Plus进行身份验证

默认情况下，应根据生产用例配置Kubeapps Plus。 用于Kubernetes API代理的服务帐户将没有附加RBAC角色。 集群运营商将需要创建令牌并将其提供给Kubeapps Plus用户。

群集操作员可能需要配置API服务器，以针对不同的提供程序(例如Azure Active Directory或Google)对用户进行身份验证。 然后，访问集群的开发人员可以使用这些提供程序登录，并获得短暂的访问令牌来访问Kubernetes API和Kubeapps Plus。

#### 创建新用户

鉴于大多数(如果不是全部)Kubernetes发行版都将具有服务帐户，这对于集群运营商来说是管理对Kubeapps Plus的访问的一种简便方法。 要创建用户，集群运营商将创建一个服务帐户：

```
apiVersion: v1
kind: ServiceAccount
metadata:
  name: johnsmith
  namespace: Kubeapps-plus-users
```

可以在任何命名空间中创建服务帐户，上面的示例使用_kubeapps-users_隔离Kubeapps Plus用户的服务帐户。

然后，集群运营商将需要为用户创建一组RBAC角色和绑定。 Kubeapps Plus文档将需要定义不同功能的角色集。 就本示例而言，我们将服务帐户绑定到_cluster-admin_角色。

```
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: johnsmith
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: johnsmith
  namespace: Kubeapps-plus-users
```

现在，要检索该帐户的令牌，集群操作员将需要运行以下命令：

```
kubectl -n kube-system describe secret $(kubectl -n Kubeapps-plus-users get secret | grep johnsmith | awk '{print $1}')
```

```
Name: johnsmith-token-6gl6l
Namespace: Kubeapps Plus-users
Labels: <none>
Annotations: kubernetes.io/service-account.name=johnsmith
              kubernetes.io/service-account.uid=b16afba9-dfec-11e7-bbb9-901b0e532516
Type: kubernetes.io/service-account-token

Data
====
ca.crt: 1025 bytes
namespace: 11 bytes
token: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
```

然后可以将令牌复制并提供给开发人员，然后开发人员可以登录到Kubeapps Plus。

### 开发者

#### 首次访问Kubeapps Plus

当开发人员首次访问Kubeapps Plus或在新设备上访问Kubeapps Plus时，将看到一个登录提示，类似于下面显示的Kubernetes仪表板中的登录提示。

![Kubernetes仪表板登录](image_0.png)

用户将需要向集群运营商索取令牌以访问Kubeapps Plus，一旦收到令牌，便可以在登录表单中输入令牌并单击“登录”。 从那时起，仪表板对Kubernetes API的所有请求都将使用此令牌。

#### 返回Kubeapps Plus

登录后，令牌应保留(例如保存在cookie或本地存储中)，这样我们在返回仪表板时无需提示用户登录。

#### 注销

顶部导航栏中将需要有一个“注销” /“注销”选项，以便已登录的用户可以返回登录提示以结束其会话或使用其他令牌登录。

#### Namespaces 命名空间

开发人员在Kubeapps Plus中所做的一切都将在Kubernetes命名空间中。 默认情况下将使用_default_名称空间，并且在顶级导航中将有一个选择器来选择名称空间。

![命名空间选择器](image_1.png)

#### 未经授权访问

如果登录的用户尝试在Kubeapps Plus中执行未经授权的操作(例如，在他们无权访问的命名空间中安装Helm Release)，则UI应该显示失败请求的有意义的错误。 特别是，它应该解释特定操作需要哪些RBAC角色，并指向有关群集操作员如何扩展角色的文档。

## 实施

### 仪表板

#### 命名空间

当前，所有列表视图(应用程序，功能等)均不受命名空间限制。 为了能够在特定名称空间中列出和查看应用程序资源而无需群集范围的权限，默认情况下，仪表板将按名称空间对所有操作进行作用域设置。 在顶部导航栏中可以选择当前名称空间。

Kubeapps Plus将尝试从API提取名称空间列表，但是如果不允许此操作(由于没有相关的RBAC角色)，它将回退到在存储在localStorage中的_kubernetes_namespaces_数组中列出名称空间。 默认情况下，它将包含_default_。 在此后备模式下，用户可以选择向_kuberetes_namespaces_数组添加名称空间。

通过选择名称空间选择器中的_all_选项，也可以列出群集范围内的资源。

#### 令牌认证

仪表板将显示登录提示，以输入用于对Kubernetes API代理的所有请求的承载令牌。 承载令牌将通过密钥_kubernetes_access_token_存储在localStorage中。 注销时，将需要删除localStorage中的_kubernetes_access_token_。 我们可能需要设置一个单例，以暴露预先配置为获取的axios库(HTTP请求库)并将令牌包含在每个请求的Authorization标头中。

#### 错误处理

当前，在所有情况下，仪表板都无法很好地处理API错误。 通过此更改，当某些RBAC角色丢失时，可能会出现更多API错误(未经授权的错误)。 使用_await / async_时，通常会导致承诺拒绝的API错误会作为JavaScript异常抛出。 可能可以利用[React Error Boundaries](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html)捕获组件内的错误并显示 错误信息。

### Kubernetes API Proxy

#### 启用外部访问

出于安全原因，默认情况下，kubectl代理不接受来自非本地主机名的请求。 要启用从LoadBalancer IP /主机名或Ingress主机名的访问，我们将在运行代理时设置`--accept-hosts =。*`选项。

由于Kubeapps Plus现在将很高兴将整个Kubernetes API暴露给已配置的Ingress，因此这显然引起了安全方面的担忧。 为了减轻这种攻击面：

1.  默认情况下，分配给代理容器的服务帐户将没有配置的RBAC角色

2.  我们将在代理上配置_-- accept-paths_选项以仅公开Kubeapps Plus使用的端点

3.  默认情况下(今天)，Kubeapps Plus nginx-ingress服务将默认配置为_ClusterIP_，集群操作员将需要显式设置自己的Ingress或将服务切换到LoadBalancer以启用从集群外部的访问-将记录在案

最重要的是，文档应鼓励集群运营商确保仅可通过私有内部网络(例如VPN)访问Kubeapps Plus。

### 文献资料

#### Kubeapps Plus的RBAC角色

为了使集群运营商能够清楚，正确地将RBAC角色分配给Kubeapps Plus用户，我们概述了在Kubeapps Plus中执行特定操作所需的确切角色。 表示特定名称空间的角色必须在该名称空间中应用。 _Namespace_列中的通配符指示该角色可以应用于特定的名称空间(推荐)或群集范围内。

##### 应用领域

<table>
  <tr>
    <td>Operation</td>
    <td>API Group</td>
    <td>Namespace</td>
    <td>Resources</td>
    <td>Verbs</td>
    <td>Explanation</td>
  </tr>
  <tr>
    <td>List Applications</td>
    <td>helm.bitnami.com</td>
    <td>*</td>
    <td>helmreleases</td>
    <td>list</td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td>Kubeapps Plus</td>
    <td>configmaps</td>
    <td>list</td>
    <td>Helm (Tiller) stores release data in ConfigMaps</td>
  </tr>
  <tr>
    <td>View Application</td>
    <td>helm.bitnami.com</td>
    <td>*</td>
    <td>helmreleases</td>
    <td>get</td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td>Kubeapps Plus</td>
    <td>configmaps</td>
    <td>get</td>
    <td>Helm (Tiller) stores release data in ConfigMaps</td>
  </tr>
  <tr>
    <td>View Application Health Status</td>
    <td>apps</td>
    <td>*</td>
    <td>deployments</td>
    <td>list, watch</td>
    <td>Kubeapps Plus watches Deployments to monitor rollout status</td>
  </tr>
  <tr>
    <td>View Application URLs</td>
    <td></td>
    <td>*</td>
    <td>services</td>
    <td>list, watch</td>
    <td>Kubeapps Plus watches App's Services to display URLs to access the app</td>
  </tr>
  <tr>
    <td>Deploy Helm Chart</td>
    <td>helm.bitnami.com</td>
    <td>*</td>
    <td>helmreleases</td>
    <td>create</td>
    <td>Kubeapps Plus uses the Helm CRD controller to create and manage Helm Releases</td>
  </tr>
  <tr>
    <td>Upgrade Helm Release</td>
    <td>helm.bitnami.com</td>
    <td>*</td>
    <td>helmreleases</td>
    <td>update</td>
    <td></td>
  </tr>
  <tr>
    <td>Delete Helm Release</td>
    <td>helm.bitnami.com</td>
    <td>*</td>
    <td>helmreleases</td>
    <td>delete</td>
    <td></td>
  </tr>
</table>

##### 功能

<table>
  <tr>
    <td>Operation</td>
    <td>API Group</td>
    <td>Namespace</td>
    <td>Resources</td>
    <td>Verbs</td>
    <td>Explanation</td>
  </tr>
  <tr>
    <td>List Functions</td>
    <td>kubeless.io</td>
    <td>*</td>
    <td>functions</td>
    <td>list</td>
    <td></td>
  </tr>
  <tr>
    <td>View Function</td>
    <td>kubeless.io</td>
    <td>*</td>
    <td>functions</td>
    <td>get</td>
    <td></td>
  </tr>
  <tr>
    <td>View Function Health Status</td>
    <td>apps</td>
    <td>*</td>
    <td>deployments</td>
    <td>list, watch</td>
    <td>Kubeapps Plus watches Deployments to monitor rollout status</td>
  </tr>
  <tr>
    <td>View Function Logs</td>
    <td></td>
    <td>*</td>
    <td>pods</td>
    <td>list</td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td>*</td>
    <td>pods/logs</td>
    <td>get</td>
    <td></td>
  </tr>
  <tr>
    <td>Test Function</td>
    <td></td>
    <td>*</td>
    <td>services/proxy</td>
    <td>get,
create</td>
    <td>Send GET and POST requests to function HTTP endpoints</td>
  </tr>
  <tr>
    <td>Update Function</td>
    <td>kubeless.io</td>
    <td>*</td>
    <td>functions</td>
    <td>update</td>
    <td></td>
  </tr>
  <tr>
    <td>Delete Function</td>
    <td>kubeless.io</td>
    <td>*</td>
    <td>functions</td>
    <td>delete</td>
    <td></td>
  </tr>
  <tr>
    <td>Read ConfigMap</td>
    <td></td>
    <td>kubeless</td>
    <td>configmaps</td>
    <td>get</td>
    <td>Read Kubeless Configmap to retrieve information about the available runtimes</td>
  </tr>
</table>

##### 应用程式储存库

<table>
  <tr>
    <td>Operation</td>
    <td>API Group</td>
    <td>Namespace</td>
    <td>Resources</td>
    <td>Verbs</td>
    <td>Explanation</td>
  </tr>
  <tr>
    <td>List App Repositories</td>
    <td>Kubeapps Plus.com</td>
    <td>Kubeapps Plus</td>
    <td>apprepositories</td>
    <td>list</td>
    <td></td>
  </tr>
  <tr>
    <td>View App Repository</td>
    <td>Kubeapps Plus.com</td>
    <td>Kubeapps Plus</td>
    <td>apprepositories</td>
    <td>get</td>
    <td></td>
  </tr>
  <tr>
    <td>Resync App Repository</td>
    <td>Kubeapps Plus.com</td>
    <td>Kubeapps Plus</td>
    <td>apprepositories</td>
    <td>update</td>
    <td></td>
  </tr>
  <tr>
    <td>Update App Repository</td>
    <td>Kubeapps Plus.com</td>
    <td>Kubeapps Plus</td>
    <td>apprepositories</td>
    <td>update</td>
    <td></td>
  </tr>
  <tr>
    <td>Delete App Repository</td>
    <td>Kubeapps Plus.com</td>
    <td>Kubeapps Plus</td>
    <td>apprepositories</td>
    <td>delete</td>
    <td></td>
  </tr>
</table>

##### 服务目录

<table>
  <tr>
    <td>Operation</td>
    <td>API Group</td>
    <td>Namespace</td>
    <td>Resources</td>
    <td>Verbs</td>
    <td>Explanation</td>
  </tr>
  <tr>
    <td>List Service Brokers</td>
    <td>servicecatalog.k8s.io</td>
    <td>cluster-wide</td>
    <td>clusterservicebrokers</td>
    <td>list</td>
    <td></td>
  </tr>
  <tr>
    <td>Relist Service Broker</td>
    <td>servicecatalog.k8s.io</td>
    <td>cluster-wide</td>
    <td>clusterservicebrokers</td>
    <td>patch</td>
    <td></td>
  </tr>
  <tr>
    <td>List Service Classes</td>
    <td>servicecatalog.k8s.io</td>
    <td>cluster-wide</td>
    <td>clusterserviceclasses</td>
    <td>list</td>
    <td></td>
  </tr>
  <tr>
    <td>List Service Plans</td>
    <td>servicecatalog.k8s.io</td>
    <td>cluster-wide</td>
    <td>clusterserviceplans</td>
    <td>list</td>
    <td></td>
  </tr>
  <tr>
    <td>List Service Instances</td>
    <td>servicecatalog.k8s.io</td>
    <td>*</td>
    <td>serviceinstances</td>
    <td>list</td>
    <td></td>
  </tr>
  <tr>
    <td>View Service Instances</td>
    <td>servicecatalog.k8s.io</td>
    <td>*</td>
    <td>serviceinstances</td>
    <td>get</td>
    <td></td>
  </tr>
  <tr>
    <td>Create Service Instances</td>
    <td>servicecatalog.k8s.io</td>
    <td>*</td>
    <td>serviceinstances</td>
    <td>create</td>
    <td></td>
  </tr>
  <tr>
    <td>Delete Service Instances</td>
    <td>servicecatalog.k8s.io</td>
    <td>*</td>
    <td>servicebindings</td>
    <td>delete</td>
    <td></td>
  </tr>
  <tr>
    <td>List Service Bindings</td>
    <td>servicecatalog.k8s.io</td>
    <td>*</td>
    <td>servicebindings</td>
    <td>list</td>
    <td></td>
  </tr>
  <tr>
    <td>View Service Bindings</td>
    <td>servicecatalog.k8s.io</td>
    <td>*</td>
    <td>servicebindings</td>
    <td>get</td>
    <td></td>
  </tr>
  <tr>
    <td>View Service Binding Credentials</td>
    <td></td>
    <td>*</td>
    <td>secrets</td>
    <td>get</td>
    <td>Kubeapps Plus can display credentials retrieved from the binding</td>
  </tr>
  <tr>
    <td>Create Service Bindings</td>
    <td>servicecatalog.k8s.io</td>
    <td>*</td>
    <td>servicebindings</td>
    <td>create</td>
    <td></td>
  </tr>
  <tr>
    <td>Delete Service Bindings</td>
    <td>servicecatalog.k8s.io</td>
    <td>*</td>
    <td>servicebindings</td>
    <td>delete</td>
    <td></td>
  </tr>
</table>

#### 在外部公开Kubeapps Plus

我们将添加文档来描述如何在外部公开Kubeapps Plus。 有多种方法可以实现此目的：

1.  创建和管理一个单独的Ingress资源，该资源充当Kubeapps Plus创建的Nginx-ingress服务的反向代理(**推荐**)

2.  将Kubeapps Plus创建的nginx-ingress服务更改为LoadBalancer类型，并获取由基础云提供商提供的IP地址/主机名

3.  修改Kubeapps Plus创建的Ingress对象以使用其他Ingress控制器(通过配置_kubernetes.io/ingress.class_批注)

#### 使用oauth2_proxy提供额外的身份验证层

我们将添加文档来描述如何在Kubeapps Plus前面放置[oauth2_proxy](https://github.com/bitly/oauth2_proxy)之类的东西，以启用附加的身份验证/授权层。 使用oauth2_proxy可以通过公司的GitHub组织，Google域等配置登录。

在使用已配置的提供程序执行oauth2跳转之后，用户仍然需要使用令牌登录才能访问Kubernetes API。 可能可以设置代理以转发从oauth2跳转中检索到的访问令牌，以便Kubeapps Plus可以使用它。 参见[https://github.com/kubernetes/dashboard/pull/1539](https://github.com/kubernetes/dashboard/pull/1539)

## 公开问题
