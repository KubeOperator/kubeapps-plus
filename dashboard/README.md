# 仪表板开发指南

[KubeApps Plus 安装指南](../../chart/kubeapps/README.md) 您可以使用仪表板开始在群集中管理和部署应用程序。 请查看 [KubeApps Plus 使用指南](getting-started.md) 指南, 以了解如何访问仪表板和部署第一个应用程序。

以下各节将引导您完成 Kubeapps Plus 仪表板的一些常见任务。

## 使用图表

### 使用仪表板部署新应用程序

* 从仪表板欢迎页面开始: 

  ![仪表板主页](../docs/img/dashboard-login.png)

* 使用“图表”菜单从官方 Kubernetes 图表存储库中的图表列表中选择一个应用程序。 本示例假定您要部署 WordPress。

 ![WordPress图表](../docs/img/wordpress-search.png)
 
 - 单击 “使用 Helm 部署”按钮。
 
   ![WordPress图表](../docs/img/wordpress-chart.png)
 
 - 系统将提示您输入应用程序的发行名称和值。
 
   ![WordPress安装](../docs/img/wordpress-installation.png)
 
 - 点击“提交”按钮。 该应用程序将被部署。 您将能够直接从浏览器跟踪新的 Kubernetes 部署。
 
   ![WordPress部署](../docs/img/wordpress-deployment.png)
 
 要获取 WordPress 用户名和密码, 请参考部署页面的 “注释” 部分, 其中包含您需要运行以获取部署凭据的命令。

### 列出集群中运行的所有应用程序

“应用程序”页面显示群集中由Helm管理的应用程序部署的列表。

![部署列表](../docs/img/dashboard-deployments.png)

### 删除现有的应用程序部署

您可以通过单击应用程序状态页面上的“删除”按钮来从集群中删除任何应用程序: 

![部署删除](../docs/img/dashboard-delete-deployment.png)

### 添加更多图表存储库

默认情况下, Kubeapps Plus带有启用的官方Kubernetes图表存储库。 您可以在“配置”菜单下的“应用程序存储库”页面中查看已启用的图表存储库的列表: 

![存储库列表](../docs/img/dashboard-repos.png)

通过单击“添加应用程序存储库”按钮来添加新的存储库(例如, 您组织的图表存储库)。 使用以下准则填写“添加存储库”表单: 

* 名称: 使用任何唯一标识符。
* URL: 添加图表存储库的URL(与 “helm repo add” 使用的URL相同)

![添加存储库](../docs/img/dashboard-add-repo.png)

### 仪表板 dashboard 开发项目设置
```
cd dashboard
yarn install
```

### 编译和热重装以进行开发
```
yarn serve
```

### 编译并最小化生产
```
yarn build
```

### 整理和修复文件
```
yarn lint
```

### 自定义配置
查看 [配置参考](https://cli.vuejs.org/config/).
