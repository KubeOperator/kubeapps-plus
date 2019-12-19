# 改善用于部署和升级应用程序的用户体验

本文档的目的是为改进当前部署和升级应用程序的方法指定设计建议。

## 问题的定义

当用户部署应用程序时，我们将提供图表包含的默认值“ values.yaml”。 这是他们必须修改默认行为的唯一机制。 在许多情况下，他们希望通过简单的修改(例如更改默认主机名或修改默认密码)来修改此默认设置。 在values.yaml中找到这些设置通常很冗长，这并非易事。 他们应该能够轻松地修改一些“通用”参数。 无论如何，对于高级用户来说，他们应该仍然可以修改“ values.yaml”以微调应用程序的设置。

部署应用程序后，最终用户将需要对其进行升级。 现在，除了必须处理“ values.yaml”文件的复杂性之外，有必要记住在原始“ values.yaml”中所做的更改，以便将其移植到新版本中。 在Kubeapps Plus中，一旦用户选择了一个新版本，这些值就会被新版本的默认值替换，这使得用以前的版本修改这些值非常困难。 应该可以采用与部署中相同的方法：具有易于填写的表单，可以切换到高级表单，以便他们可以根据自己的喜好修改值。

## 所需的用户体验(UX)

### 部署和升级表格

当用户到达部署表单时，所需的行为是拥有两个不同的视图，一个用于基本表单，另一个用于高级部署。 这可以表示为两个不同的选项卡。 基本部署应包含所有基本参数，而高级表单将像今天一样显示信息。 对于第一个版本，在基本部署表单中所做的更改不会影响高级表单，反之亦然。 仅当用户单击“提交”时，当前表单信息(基本或高级)才会发送到后端。

这是基本部署表单的建议视图：

<img src="./img/deployment-form-basic.png" width="500px">

对于高级选项卡：

<img src="./img/deployment-form-adv.png" width="500px">

*请注意，设计可能会有所不同，最终提案将在其他PR中提交

一旦用户部署了应用程序，则在尝试升级时，应显示基本表单。 该表格将预先填写先前版本的值。 切换到新版本时，应保留这些基本参数。

如果用户决定选择表单的高级版本，则我们应该表示现有值，以便用户可以将其复制粘贴到新版本。 理想情况下，我们可以表示一个git-patch视图，以通知用户先前的“ values.yaml”中的更改，但这超出了本设计的范围。

## 基本参数定义

应按图表定义应用程序支持的基本参数。 除了应用程序的不同文件外，我们还应将这些参数的信息包括在不同的文件中。 提议的方法是使用文件：values.schema.json。 该文件将是[JSON Schema](https://json-schema.org/)。 我们选择了这种方法，因为Helm v3还将其用于验证图表的“ values.yaml”([链接](https://github.com/helm/helm/pull/5350/））。 而且，可以像我们对服务目录实例那样从JSON模式自动生成表单。 我们暂时不会这样做，因为我们无法确定是否存在`values.schema.json`，它代表了`values.yaml`的所有相关字段。 无论如何，我们不会自动生成表格以提供更好的体验。

这个JSON模式可以让我们知道`values.yaml`文件的结构，但是，要知道哪些参数应该以基本形式表示，我们需要更多信息。 特别是，我们需要将众所周知的参数(例如“磁盘大小”)映射到“ values.yaml”中的参数。 为此，我们可以在JSON模式中包含一个新标签。 对于磁盘大小，我们将参数标记为“ form = diskSize”，以便Kubeapps Plus可以识别它。 有了这两条信息，我们就能提供理想的体验。 有关示例，请参见下一部分。

### v1支持的应用程序和参数

我们应该确定要支持的应用程序和参数的第一个子集，以便提供此功能的第一个版本。 根据通过Kubeapps Plus安装的Bitnami管理的图表的受欢迎程度，我们选择了：

1.	bitnami/wordpress
2.	bitnami/apache
3.	bitnami/postgresql

基于这些应用程序，我们可以支持的第一批参数是：

- Username. String. 应用程序的管理员用户名。
- Password. Password. 应用程序的管理员密码。
- Email. String. 应用程序的管理员电子邮件。
- Enable External Database. Object. 需要启用。 要使用的数据库细节，而不是内置的。
  - host: String. 数据库主机。
  - user: String. 数据库用户。
  - password: Password. 数据库密码。
  - database: String. 数据库名称。
  - port: Number. 数据库端口。
- Enable Hostname. Object. 需要启用。 主机名详细信息。
  - Hostname: String. 要使用的主机名。
  - Enable TLS: Boolean. 需要启用。 需要证书管理员。
- Disk size. Choice. 每个应用程序要定义的大小。 小，中，大或其他。 在“其他”的情况下，允许写入自定义磁盘大小。
- Required Resources. Choice. 每个应用程序要定义的资源。 小，中，大或其他。 如果是Other，则允许编写自定义CPU的内存要求。
- Enable Metrics. Boolean. 使用Prometheus导出器。
- Replicas. Number. 副本数。

注意，我们应该能够以通用的方式表示任何参数。 我们只是在定义一组众所周知的参数，以便能够呈现更丰富的视图。

### JSON模式定义

基于以上参数，这可能是WordPress的JSON模式的示例：

```json
{ 
  "$schema": "http://json-schema.org/schema#",
  "type": "object",

  "properties": {
    "wordpressUsername": { "type": "string", "title": "Username", "form": "username" },
    "wordpressPassword": { "type": "string", "title": "Password", "form": "password" },
    "wordpressEmail": { "type": "string", "title": "Email", "form": "email" },
    "mariadb": { 
      "type": "object",
      "properties": {
        "enabled": { "type": "boolean", "title": "Enable External Database" }
      }
    },
    "externalDatabase": {
      "type": "object",
      "title": "External Database Details",
      "form": "externalDatabase",
      "properties": {
        "host": { "type": "string" },
        "user": { "type": "string" },
        "password": { "type": "string" },
        "database": { "type": "string" },
        "port": { "type": "integer" }
      }
    },
    "persistence": {
      "type": "object",
      "properties": {
        "size": {
          "type": "string",
          "title": "Disk Size",
          "form": "diskSize",
          "anyOf": [
            {"pattern": ".*"},
            {"enum": ["10Gi", "50Gi", "100Gi"]},
          ]
        }
      }
    },
    "resources": {
      "type": "object",
      "title": "Required Resources",
      "description": "Deployment resource requests",
      "form": "resources",
      "properties": {
        "requests": {
          "type": "object",
          "properties": {
            "memory": {
              "type": "string",
              "anyOf": [
                { "pattern": ".*" },
                { "enum": ["128Mi", "512Mi", "1Gi"] }
              ]
            },
            "cpu": {
              "type": "string",
              "anyOf": [
                { "pattern": ".*" },
                { "enum": ["100m", "300m", "500m"] }
              ]
            }
          }
        },
      }
    },
    "enableMetrics": { "type": "boolean", "title": "Enable Metrics", "form": "enableMetrics" },
    "replicas": { "type": "integer", "title": "Number of Replicas", "form": "replicas" }
  },

  "required": ["wordpressUsername", "wordpressEmail", "persistence", "resources"],
}
```

这个`values.schema.json`是WordPress`values.yaml`的有效JSON模式。 由于可以包含values.yaml文件的每个单个参数，因此它可以更加完整。

请注意，为了能够提供更丰富的表单表示，我们在标签中加入了“ form = {}”标签以及一组众所周知的参数。 这使我们知道我们需要在表单中表示哪些参数以及如何将它们映射为有效值。 如果有一个未知的参数，我们应该能够将其解析为通用输入。

## 部署工作流程

本部分根据上面的JSON模式定义定义部署逻辑的工作方式。

1. 部署组件将加载图表的详细信息。 如果图表未包含文件“ values.schema.json”或“ form”的任何键，请从今天开始继续操作； 仅允许高级部署。 在其他情况下，请转到下一步。
2. 加载`values.schema.json`。 从这时起，将向用户显示两个不同的选项卡。 如果用户将选项卡从“基本”更改为“高级”，将显示新表单。 我们将使用YAML库将更改从一种形式移植到另一种形式：https：//github.com/eemeli/yaml/。
3. Kubeapps Plus将支持某些类型的参数(例如`username`或`resources`)。 如果存在这些参数，我们将呈现该参数的丰富视图，例如使用卡片选择而不是文本框。 对于不支持的参数，我们应该能够使用自动生成功能。 这可能是不可能的，因此在这种情况下，该参数将被忽略(开发者控制台出现错误)。 如果参数具有“标题”或“描述”，则应以表格形式使用。
4. 一旦用户单击“提交”，我们还将使用JSON模式来验证已处理对象是否符合定义。

## 升级工作流程

升级工作流程将与部署类似，但有一些警告：

1. 如果要升级的应用程序不包含“ values.schema.json”或任何“ form”键，请按今天的方式操作。 如果当前版本包含该版本，我们假定它将包含在新版本中。 如果是这种情况，请转到下一步。
2. 使用当前的“值”(来自旧版本)来预先填充表单信息。
3. 一旦用户选择了新版本，就会加载新的“ schema”。 对于先前版本中存在的参数，请使用先前的值重新填写表格。 如果表单中有一个新参数，请将其保留为空(或使用其默认值)。 如果不再使用参数，请忽略它。
4. 生成最终对象并对其进行验证的逻辑与部署相同。

## 发展历程

实现此功能所需的代码/时间非常多。 为了避免出现较大的PR或临时分支，我们建议逐步实现此功能，在`master`上合并更改，但使用功能标志保护当前状态。 如果禁用功能标志(默认行为)，则将显示当前的部署和升级表单。 对于开发人员(或想要测试功能的任何人)，我们将启用此标志以激活新表单。 我们可以将该标志存储在Kubeapps Plus ConfigMap中。 功能完成后，将从配置中删除此标志，从而为所有人启用该功能。

## 任务定义

这是我们为该功能预见的任务列表。 此列表可能取决于新发现：

- Create a values.schema.json for the desired applications.
  - WordPress
  - Apache
  - PostgreSQL
- Create a test step to ensure that if the `values.schema.json` exists, the default `values.yaml` complies with it.
- Create the feature flag.
- Use the file `values.schema.json` to verify the content of the values.yaml to submit.
- Change the current management of the `values.yaml` from text to a [YAML Document](https://eemeli.org/yaml/#documents).
- Design and create the components for the rich view, using the `form` key definition.
  - Username
  - Password
  - Email
  - Enable External Database
  - Enable Hostname
  - Enable TLS
  - Disk size
  - Required Resources
  - Enable Metrics
  - Replicas
- Design and create generic components in case the `form` key is defined with unknown parameters.
  - Text
  - Choice
- Adapt the DeploymentForm to render the basic form.
- Adapt the UpgradeForm to render the form.
- Improve the UpgradeForm to migrate values from one version to other.

## 已知限制

在某些情况下，基本形式还不够。 例如，对于WordPress，用户将能够为WordPress实例设置资源要求，但不能为MariaDB依赖项设置资源要求。 管理图表的团队应该一个一个地决定我们应该包括哪些参数，并在需要新的“参数”时与我们进行沟通。