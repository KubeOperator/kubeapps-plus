# 在Kubeapps Plus中使用私有存储库

可以使用私有的Helm存储库来存储您自己的Helm图表，并使用Kubeapps Plus进行部署。 在本指南中，我们将展示如何使用当前可用的一些解决方案来做到这一点：

- [ChartMuseum](#chartmuseum)
- [Harbor](#harbor)
- [Artifactory](#artifactory) (Pro)

## ChartMuseum

[ChartMuseum](https://chartmuseum.com)是用Go(Golang)编写的开源Helm Chart存储库，并支持云存储后端，包括Google Cloud Storage，Amazon S3，Microsoft Azure Blob存储，阿里云OSS 存储和OpenStack对象存储。

要将ChartMuseum与Kubeapps Plus一起使用，请首先从stable存储库中部署其Helm图表：

<img src="../img/chartmuseum-chart.png" alt="ChartMuseum Chart" width="300px">

在部署表单中，我们应该至少更改两件事：

- `env.open.DISABLE_API`: 我们应该将此值设置为“ false”，以便可以使用ChartMuseum API推送新图表。
- `persistence.enabled`: 我们将这个值设置为“ true”以对我们存储的图表启用持久性。 请注意，这将创建一个[Kubernetes持久卷声明](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#lifecycle-of-a-volume-and-claim)，因此取决于您的Kubernetes提供者 您可能需要手动分配所需的“永久数量”才能满足要求。 一些Kubernetes提供商会自动为您创建PV，因此将此值设置为`true`就足够了。

<img src="../img/chartmuseum-deploy-form.png" alt="ChartMuseum Deploy Form" width="600px">

### ChartMuseum: 上传图表

部署ChartMuseum后，您将可以上传图表。 在一个终端中，打开到应用程序的端口转发隧道：

```console
$ export POD_NAME=$(kubectl get pods --namespace default -l "app=chartmuseum" -l "release=my-chartrepo" -o jsonpath="{.items[0].metadata.name}")
$ kubectl port-forward $POD_NAME 8080:8080 --namespace default
Forwarding from 127.0.0.1:8080 -> 8080
Forwarding from [::1]:8080 -> 8080
```

在另一个终端中，您可以推送图表：

```console
$ helm package/path/to/my/chart
Successfully packaged chart and saved it to:/path/to/my/chart/my-chart-1.0.0.tgz
$ curl --data-binary "@my-chart-1.0.0.tgz" http://localhost:8080/api/charts
{"saved":true}
```

### ChartMuseum: 在Kubeapps Plus中配置存储库

要添加私有存储库，请在Kubeapps Plus中转到“配置>应用存储库”，然后单击“添加应用存储库”。 您将需要使用ChartMuseum服务的Kubernetes DNS名称添加存储库。 这将是`<release_name> -chartmuseum。<namespace>：8080`：

<img src="../img/chartmuseum-repository.png" alt="ChartMuseum App Repository" width="300px">

创建存储库后，您可以单击特定存储库的链接，并且可以使用Kubeapps Plus部署自己的应用程序。

### ChartMuseum: 认证/授权

可以将ChartMuseum配置为通过两种不同的机制使用身份验证：

-使用HTTP [基本身份验证](https://chartmuseum.com/docs/#basic-auth)(用户/密码)。 要使用此功能，需要：
   -部署ChartMuseum时，请指定参数`secret.AUTH_USER`和`secret.AUTH_PASS`。
   -在将存储库添加到Kubeapps Plus时指定用户和密码，然后选择“基本身份验证”。
-使用[JWT令牌](https://github.com/chartmuseum/auth-server-example)。 获得有效令牌后，您可以在表单中选择“承载者令牌”，并将令牌添加到专用字段中。

## Harbor

[Harbor](https://github.com/goharbor/harbor)是一个开源的受信任云本机注册表项目，用于存储，签名和扫描内容，例如 Docker映像。 Harbor由[Cloud Native Computing Foundation](https://cncf.io/)托管。 从1.6.0版开始，Harbour是一个复合云本机注册表，它支持容器映像管理和Helm图表管理。 Harbor集成了[ChartMuseum](https://chartmuseum.com)以提供Helm图表存储库功能。 可以通过基于角色的访问控制来控制对Harbour Chart存储库中的Helm Charts的访问。

要将Harbor与Kubeapps Plus一起使用，请首先使用[Harbor离线安装程序](https://github.com/goharbor/harbor/blob/master/docs/installation_guide.md#downloading-the-installer)或官方[Harbor]部署Harbor 舵图](https://github.com/goharbor/harbor-helm)。 这是使用Harbor脱机安装程序将Harbor部署为在Linux机器上用作Helm Chart信息库的最低步骤。

```
$ wget https://storage.googleapis.com/harbor-releases/release-1.8.0/harbor-offline-installer-v1.8.1.tgz
$ tar xvf harbor-offline-installer-v1.8.1.tgz
$ cd harbor
$ sed -i 's/hostname: reg.mydomain.com/hostname: <Current-Machine-IP>/' harbor.yml
$ sudo ./install.sh --with-chartmuseum
```

如果成功安装Harbor，您将看到以下消息。

```console
----Harbor has been installed and started successfully.----

Now you should be able to visit the admin portal at http://<IP>.
For more details, please visit https://github.com/goharbor/harbor .
```

### Harbor: 上传图表

- 首先在Harbor.yml中以默认管理员用户身份登录“ http：// <IP>”处的Harbor管理门户。
- 创建一个具有公共访问权限的名为“ my-helm-repo”的新项目。 每个项目都将用作Helm图表存储库。
  <img src="../img/harbor-new-project.png" width="300px">
- 单击项目名称以查看项目详细信息页面，然后单击“头盔图”选项卡以列出所有头盔图。
  <img src="../img/harbor-list-charts.png" width="600px">
- 点击“上传”按钮上传头盔图表。 您也可以使用helm命令上传图表。
  <img src="../img/harbor-upload-chart.png" width="500px">

有关更多详细信息，请参考['在港口管理头盔图表'](https://github.com/goharbor/harbor/blob/master/docs/user_guide.md#manage-helm-charts)。

### Harbor: 在Kubeapps Plus中配置存储库

要将Harbor添加为私有图表存储库，请在Kubeapps Plus中转到“配置>应用程序存储库”，然后单击“添加应用程序存储库”，并使用Harbor Helm存储库URL`http：// <IP>/chartrepo/my-helm- 回购`。

<img src="../img/harbor-add-repo.png" width="300px">

创建存储库后，您可以单击特定存储库的链接，并且可以使用Kubeapps Plus部署自己的应用程序。

### Harbor: 认证/授权

可以将Harbor配置为使用HTTP基本身份验证：

   - 在港口中创建新项目以用作掌舵图存储库时，请将项目的“访问权限”设置为非公开。 这将强制进行身份验证，以通过Helm CLI或其他客户端访问图表存储库中的图表。
   - 在Kubeapps Plus中的“添加应用程序存储库”时，为“授权”选择“基本身份验证”，然后为Harbor指定用户名和密码。

## Artifactory

JFrog Artifactory是一个存储库管理器，支持所有主要的包装格式，构建工具和CI服务器。

> **Note**: 为了使用Helm存储库功能，必须使用Artifactory Pro帐户。

要在Kubeapps Plus中安装Artifactory，请首先将JFrog存储库添加到Kubeapps Plus。 转到“配置>应用存储库”并添加其存储库：

<img src="../img/jfrog-repository.png" alt="JFrog repository" width="300px">

然后单击JFrog存储库并部署Artifactory。 有关详细的安装说明，请查看其[自述文件](https://github.com/jfrog/charts/tree/master/stable/artifactory)。 如果您没有其他要求，则可以使用默认值。

部署后，在安装向导中，选择“ Helm”以初始化存储库：

<img src="../img/jfrog-wizard.png" alt="JFrog repository" width="600px">

默认情况下，Artifactory创建一个名为`helm`的图表存储库。 那就是您可以用来存储应用程序的那个。

### Artifactory: 上传图表

首先，您将需要获取Helm存储库的用户和密码。 为此，请单击“ helm”存储库，然后在“ Set Me Up”菜单中输入密码。 之后，您将能够看到存储库用户和密码。

完成此操作后，您将可以上传图表：

```
$ curl -u{USER}:{PASSWORD} -T/path/to/chart.tgz "http://{REPO_URL}/artifactory/helm/"
```

### Artifactory: 在Kubeapps Plus中配置存储库

为了能够首先使用Kubeapps Plus访问私有图表，您需要生成一个令牌。 您可以使用Artifactory API来做到这一点：

```
curl -u{USER}:{PASSWORD} -XPOST "http://{REPO_URL}/artifactory/api/security/token?expires_in=0" -d "username=kubeapps" -d "scope=member-of-groups:readers"
{
  "scope" : "member-of-groups:readers api:*",
  "access_token" : "TOKEN CONTENT",
  "token_type" : "Bearer"
}
```

上面的命令创建一个具有只读权限的令牌。 现在，您可以转到“配置>应用程序存储库”菜单并添加您的个人存储库：

<img src="../img/jfrog-custom-repo.png" alt="JFrog custom repository" width="400px">

提交存储库后，您将可以单击新的存储库，并查看上一步中上传的图表。

## 修改同步作业

Kubeapps Plus运行定期作业(CronJob)，以填充和同步每个存储库中现有的图表。 从Kubeapps Plus v1.4.0开始，可以修改此作业的规范。 如果您需要在某个Kubernetes节点中运行Pod或设置一些环境变量，这将很有用。 为此，您可以编辑(或创建)AppRepository并指定`syncJobPodTemplate`字段。 例如：

```yaml
apiVersion: kubeapps.com/v1alpha1
kind: AppRepository
metadata:
  name: my-repo
  namespace: kubeapps
spec:
  syncJobPodTemplate:
    metadata:
      labels:
        my-repo: "isPrivate"
    spec:
      containers:
        - env:
            - name: FOO
              value: BAR
  url: https://my.charts.com/
```

上面的代码将生成一个带有标签“ my-repo：isPrivate”和环境变量“ FOO = BAR”的Pod。
