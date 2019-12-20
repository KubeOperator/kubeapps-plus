# Kubeapps Plus中的访问控制

Kubeapps Plus要求用户使用Kubernetes API令牌登录才能进行
以用户身份向Kubernetes API服务器发出请求。 这样可以确保
Kubeapps Plus用户仅被允许查看和管理他们所使用的应用程序
有权访问(例如, 在特定的名称空间内)。 如果用户没有
有权访问特定资源, Kubeapps Plus将显示错误说明
访问资源所需的角色。

如果您的集群支持[令牌
身份验证](https://kubernetes.io/docs/admin/authentication/)您可以登录
具有相同的标记。 或者, 您可以为创建服务帐户
Kubeapps Plus用户。 下面的示例使用服务帐户, 因为它是最
常见情况。

## 服务帐号

要在“默认”名称空间中为用户“示例”创建服务帐户, 请运行
下列: 

```bash
kubectl create -n default serviceaccount example
```

要获取此服务帐户的API令牌, 请运行以下命令: 

```bash
kubectl get -n default secret $(kubectl get -n default serviceaccount example -o jsonpath='{.secrets[].name}') -o go-template='{{.data.token | base64decode}}' && echo
```

## 分配Kubeapps Plus用户角色

Kubeapps Plus将在您的集群中安装一组预设的Roles和ClusterRoles
您可以绑定到用户或服务帐户。 每个角色和ClusterRole
与Kubeapps Plus中的某个操作有关。 本文档描述
在用户中执行操作所应应用的角色
Kubeapps Plus。

### 应用领域

#### 读取对名称空间中的应用程序的访问

为了列出和查看命名空间中的应用程序, 首先我们将创建一个“ ClusterRole”, 具有对所有可能资源的读访问权限。 万一你想要
要限制此访问权限, 请创建自定义群集角色, 或使用[默认角色](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#user-faceing-roles)中的一种。 然后, 我们将该集群角色绑定到我们的服务帐户。

```bash
kubectl apply -f https://raw.githubusercontent.com/kubeapps/kubeapps/master/docs/user/manifests/kubeapps-applications-read.yaml
kubectl create -n default rolebinding example-view \
  --clusterrole=kubeapps-applications-read \
  --serviceaccount default:example
```

#### 对名称空间内的应用程序进行写访问

为了在命名空间中创建, 更新和删除应用程序, 请应用
在所需的命名空间中编辑ClusterRole。 `edit` ClusterRole应该是
在大多数Kubernetes发行版中都可用, 您可以找到有关以下内容的更多信息: 
那个角色
[此处](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#user-faceing-roles)。

```bash
kubectl create -n default rolebinding example-edit \
  --clusterrole=edit \
  --serviceaccount default:example
```

### 服务目录, 服务实例和绑定

#### 对名称空间内的服务实例和绑定的读取访问权限

服务目录中的Service Broker, 类和计划是集群范围的
资源, 但是服务实例和绑定可以限制为名称空间。
我们需要定义两个角色(“ kubeapps-service-catalog-browse”和“
`kubeapps-service-catalog-read`)来分隔查看服务所需的角色
实例和绑定, 以便可以将它们应用于所需的名称空间。

为了列出和查看命名空间中的服务实例, 我们将创建
所有命名空间中的“ kubeapps-service-catalog-browse” ClusterRole和
所需名称空间中的“ kubeapps-service-catalog-read”。

```bash
kubectl apply -f https://raw.githubusercontent.com/kubeapps/kubeapps/master/docs/user/manifests/kubeapps-service-catalog-browse.yaml
kubectl create clusterrolebinding example-kubeapps-service-catalog-browse --clusterrole=kubeapps-service-catalog-browse --serviceaccount default:example

kubectl apply -f https://raw.githubusercontent.com/kubeapps/kubeapps/master/docs/user/manifests/kubeapps-service-catalog-read.yaml
kubectl create -n default rolebinding example-kubeapps-service-catalog-read --clusterrole=kubeapps-service-catalog-read --serviceaccount default:example
```

#### 对名称空间内的服务实例和绑定的写访问

为了在命名空间中创建和删除服务实例和绑定, 
在所需的名称空间中创建并绑定“ kubeapps-service-catalog-write” ClusterRole。

```bash
kubectl apply -f https://raw.githubusercontent.com/kubeapps/kubeapps/master/docs/user/manifests/kubeapps-service-catalog-write.yaml
kubectl create -n default rolebinding example-kubeapps-service-catalog-write --clusterrole=kubeapps-service-catalog-write --serviceaccount default:example
```

#### 管理员访问权限以配置Service Broker

为了从“ Service Brokers配置”页面重新同步Service Broker, 
在所有名称空间中创建并应用“ kubeapps-service-catalog-admin” ClusterRole。

```bash
kubectl apply -f https://raw.githubusercontent.com/kubeapps/kubeapps/master/docs/user/manifests/kubeapps-service-catalog-admin.yaml
kubectl create clusterrolebinding example-kubeapps-service-catalog-admin --clusterrole=kubeapps-service-catalog-admin --serviceaccount default:example
```

### 应用程式储存库

#### 读取对应用程序存储库的访问权限

为了在Kubeapps Plus中列出已配置的应用程序存储库, 请将[用户/组主题](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#command-line-utilities)绑定到` 舵图已安装在Kubeapps Plus名称空间中的$ RELEASE_NAME-repositories-read`角色。

```bash
export KUBEAPPS_NAMESPACE=kubeapps
export KUBEAPPS_RELEASE_NAME=kubeapps
kubectl create -n $KUBEAPPS_NAMESPACE rolebinding example-kubeapps-repositories-read \
  --role=$KUBEAPPS_RELEASE_NAME-repositories-read \
  --serviceaccount default:example
```

#### 写入对应用程序存储库的访问权限

与读取访问权限类似, 将用户/组主题绑定到
`$ KUBEAPPS_RELEASE_NAME-repositories-write`名称空间中的角色Kubeapps Plus安装在
供用户在Kubeapps Plus中创建和刷新应用程序存储库

```bash
export KUBEAPPS_NAMESPACE=kubeapps
export KUBEAPPS_RELEASE_NAME=kubeapps
kubectl create -n $KUBEAPPS_NAMESPACE rolebinding example-kubeapps-repositories-write \
  --role=$KUBEAPPS_RELEASE_NAME-repositories-write \
  --serviceaccount default:example
```

### 跨多个名称空间分配角色

要在多个名称空间中授予权限, 只需创建相同的RoleBindings
您要为其配置访问权限的每个命名空间中。 例如, 给
“示例”用户权限, 用于管理“示例”名称空间中的应用程序: 

```bash
kubectl create -n example rolebinding example-kubeapps-applications-write --clusterrole=kubeapps-applications-read --serviceaccount default:example
kubectl create -n example rolebinding example-kubeapps-applications-write --clusterrole=kubeapps-applications-write --serviceaccount default:example
```

请注意, 无需在命名空间Kubeapps Plus中重新创建RoleBinding。
因为已经创建了, 所以也需要安装。

如果您想授予每个命名空间访问权限, 只需创建一个
ClusterRoleBinding而不是RoleBinding。 例如, 授予“ example”用户权限来管理_any_名称空间中的应用程序: 

```bash
kubectl create clusterrolebinding example-kubeapps-applications-write --clusterrole=kubeapps-applications-read --serviceaccount default:example
kubectl create clusterrolebinding example-kubeapps-applications-write --clusterrole=kubeapps-applications-write --serviceaccount default:example
```

## 使用集群管理员用户(不推荐)

为Kubeapps Plus配置访问权限的更简单方法是为用户提供
集群管理员访问(有效禁用RBAC)。 不建议这样做, 但是
用于快速演示或评估。

```bash
kubectl create serviceaccount kubeapps-operator
kubectl create clusterrolebinding kubeapps-operator --clusterrole=cluster-admin --serviceaccount=default:kubeapps-operator
```
