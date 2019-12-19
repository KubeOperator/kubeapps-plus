# Kubernetes服务目录Kubeapps Plus集成

## Kubernetes服务目录

[服务目录](https://svc-cat.io/)是一个扩展API，使在
Kubernetes集群可轻松使用外部托管软件产品，例如
作为云提供商提供的数据存储服务。 这些服务是
由Service Broker提供，Service Broker是与这些提供程序对话的端点。
一旦集群管理员部署了ClusterServiceBroker，几个
ClusterServiceClasses和ClusterServicePlans将在集群中可用
供用户提供这些服务。 要提供服务，用户将创建
一个ServiceInstance对象，并将其连接到他们的应用程序，他们将创建
一个ServiceBinding对象。

![服务目录图](../img/service-catalog-diagram.png)

## 服务目录和Kubeapps Plus

Kubeapps Plus与服务目录具有本机集成，并允许Kubeapps Plus用户
直接从Kubeapps Plus界面配置外部云服务。

在本教程中，我们将说明如何将服务目录部署到您的集群中，
我们将配置两个Service Broker(GCP和Azure)，并提供一些
我们将在其他应用程序中使用的云服务。

本教程假定您已经具有使用Helm和
Kubeapps Plus。 如果没有Helm或Kubeapps Plus，则可以按照[Kubeapps Plus的安装说明](getting-started.md)。

## 部署服务目录

服务目录以Helm图表的形式分发，可以随时使用
与Kubeapps Plus一起部署。

要将其部署到您的集群中，请导航至“服务实例”，然后单击
安装目录。

![服务目录安装](../img/install-service-catalog.png)

您将像其他任何Helm图表一样部署服务目录
通过Kubeapps Plus安装。 我们建议至少更改以下值
`values.yaml`：

```
asyncBindingOperationsEnabled: true
```

一些GCP服务类别需要此值才能正常工作。

或者，您可以使用Helm CLI部署服务目录：

```
helm repo add svc-cat https://svc-catalog-charts.storage.googleapis.com
helm repo update
helm install svc-cat/catalog --name catalog --namespace catalog --set asyncBindingOperationsEnabled=true
```

这会将Service Catalog API服务器及其控制器部署到名为
目录。

## 部署Azure Service Broker

要为Azure部署Open Service Broker，首先需要做的是
要做的是正确配置您的Azure帐户。 您将要使用的服务
是付费的，因此，您需要具有帐户和帐单设置
正确设置。

设置好帐户后，请按照[打开服务中的说明
AKS上的Azure代理快速入门](https://github.com/Azure/open-service-broker-azure/blob/master/docs/quickstart-aks.md)。
尽管快速入门提到了AKS，但这些说明应该可以在任何Kubernetes中使用
簇。

要检查代理是否已成功部署，请运行以下命令：
```
kubectl get ClusterServiceBroker osba
```

如果代理已成功安装且目录已正确安装
下载后，您应该获得以下输出：

```
NAME         URL                                                                                     STATUS   AGE
osba         https://osba-open-service-broker-azure.osba.svc.cluster.local                           Ready    6m
```

## Kubeapps Plus集成

当用户单击Kubeapps Plus中的“服务实例”菜单时，他们将获得列表
所选名称空间中可用的服务实例数量。 由于我们尚未配置
列表仍然是空的，我们将收到有关配置的消息
一个实例。

![空服务实例](../img/service-instances-empty.png)

单击“部署服务实例”将为我们提供可用列表
类：

![Azure类别](../img/azure-classes.png)
![Google类](../img/google-classes.png)

## 例。 使用Azure MySQL作为数据库的Wordpress

对于第一个示例，我们将提供一个Azure MySQL实例，我们将
将其用作我们新的Wordpress部署的数据库。

### 设置Azure MySQL数据库

在类列表中，单击Azure数据库中的“选择计划”
MySQL 5.7卡：

![Azure MySQL类](../img/azure-mysql-class.png)

我们将选择“基本层”，足以满足我们的测试目的

![Azure MySQL基本层](../img/azure-basic-tier.png)

给它命名后，我们将为实例提供一组选项，
例如允许传入流量的防火墙规则，实例的位置，
和Azure资源组：

![Azure MySQL选项](../img/azure-mysql-options.png)

单击“提交”后，实例将开始配置。刷新
定期翻页查看进度。设置Azure MySQL实例
大约需要10-15分钟。

![Azure MySQL设置](../img/azure-mysql-provisioning.png)

设置后，您将能够创建绑定来连接您的应用程序
对此。单击“添加绑定”并为其选择一个名称(默认名称应为
可以)。创建一个新的绑定应该很快。

![预配置Azure Azure](../img/azure-mysql-provisioned.png)

绑定创建完成后，创建的详细信息
单击“显示”可直接在同一页面上浏览机密。 (确保
可以访问此页面(可能在其他浏览器选项卡中)，因为我们需要
下一步中的这些值)。

重要的是要了解机密的模式，因为它是依赖的
在代理和实例上。对于Azure MySQL，秘密将包括
以下架构：

```
database: name of the database
host: the URL of the instance
username: the user name to connect to the database
password: the password for user username
port: the port where MySQL is listening
[...]
```

### 部署Wordpress

现在，我们将使用Azure MySQL作为数据库来部署Wordpress。 在“目录”中
我们将搜索`wordpress`：

![搜索Wordpress](../img/search-wordpress.png)

我们将单击“部署”，并将修改应用程序的“ values.yaml”
具有以下值：

```
externalDatabase.host: host value in the binding secret
externalDatabase.user: username value in the binding secret
externalDatabase.password: password value in the binding secret
externalDatabase.database: database value in the binding secret
mariadb.enabled: false (to avoid deploying a MariaDB database)
```

修改完这些值后，点击“提交”，然后等到
部署完成：

![部署Wordpress](../img/wordpress-deployed.png)

如果检查wordpress pod日志，我们可以看到它已成功连接
到Azure MySQL数据库：

```
kubectl logs wordpress-app-wordpress-597b9dbb5-2rk4k

Welcome to the Bitnami wordpress container
Subscribe to project updates by watching https://github.com/bitnami/bitnami-docker-wordpress
Submit issues and feature requests at https://github.com/bitnami/bitnami-docker-wordpress/issues

WARN  ==> You set the environment variable ALLOW_EMPTY_PASSWORD=yes. For safety reasons, do not use this flag in a production environment.
nami    INFO  Initializing apache
apache  INFO  ==> Patching httpoxy...
apache  INFO  ==> Configuring dummy certificates...
nami    INFO  apache successfully initialized
nami    INFO  Initializing php
nami    INFO  php successfully initialized
nami    INFO  Initializing mysql-client
nami    INFO  mysql-client successfully initialized
nami    INFO  Initializing libphp
nami    INFO  libphp successfully initialized
nami    INFO  Initializing wordpress
mysql-c INFO  Trying to connect to MySQL server
mysql-c INFO  Found MySQL server listening at 93489418-7a54-4b2c-b807-d239cb26ad5d.mysql.database.azure.com:3306
mysql-c INFO  MySQL server listening and working at 93489418-7a54-4b2c-b807-d239cb26ad5d.mysql.database.azure.com:3306
```
