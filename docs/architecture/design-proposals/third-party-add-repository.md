# 添加存储库并从外部来源触发图表部署

## 目的

为图表存储库（例如Harbor）启用外部用户界面，以触发在Kubeapps Plus中添加存储库或触发将图表直接部署到Kubeapps Plus UI中。

## 动机

Kubeapps Plus专注于呈现来自多个存储库的应用程序目录，并使这些应用程序易于部署。 Kubeapps Plus不会（也不应该）专注于应用程序存储库的管理，也不会将其填充到应用程序中。

其他项目（例如Harbor）特别关注于云本地资源（例如图像和应用程序）的存储库管理。 这些项目不一定专注于部署这些应用程序或图像的用户体验。

通过使这些项目与Kubeapps Plus集成，用户可以无缝地从将新应用程序上载到存储库，直到在配置的Kubeapps Plus安装中测试该应用程序的部署。 或者从准备具有特定应用程序的存储库，到使Kubeapps Plus中的用户访问这些应用程序。

## 目标与非目标

* 使第3方站点提供“向Kubeapps Plus添加存储库”操作，该操作将导致Kubeapps Plus安装扫描并将该存储库包括在其目录中。
* 因此，第三方可以链接以直接从Kubeapps Plus UI中的存储库中部署图表。

## 假设条件
 - 第三方（例如Harbor）和Kubeapps Plus（也就是Kubernetes集群）都必须使用相同的OpenID Connect身份提供程序。
 - 群集中的RBAC策略使用户可以部署应用程序并为相关管理员创建AppRepository自定义资源定义（这是Kubeapps Plus安装过程的一部分）。
 
## 用户故事

* 作为Harbor的存储库维护者，我想将新的存储库添加到Kubeapps Plus，以便Kubeapps Plus用户可以从我的存储库中部署图表。
* 作为Harbor存储库的贡献者，我想在上载到Harbor后测试图表的安装，以便可以验证用户的安装体验。
* 作为Harbor的存储库维护者，我想从Kubeapps Plus中删除我的存储库，以便用户不再从我的存储库安装应用程序，除非另行通知。

## 实作

### Kubeapps Plus
Kubeapps Plus provides an api endpoint for app repositories:
 * Create App Repository:
   - URL: /api/backend/v1/apprepositories
   - Method: POST
   - Data
   ```
   syntax = "proto3";
   message CreateAppRepositoryRequest {
     message AppRepository {
       string name = 1;
       string url = 2;
     }
     // Later add credentials

     AppRepository app_repository = 1;
   }
   ```
   or JSON equivalent
   ```
   {
     appRepository: {
       name: "foo",
       url: "https://example.com/stable"
     }
   }
   ```
   - Success response: 201 Created with the following data:
   ```
   message CreateAppRepositoryResponse {
     string repository_prefix = 1; // e.g. "/#/charts/<repository-name>/"
   }
   ```
   or JSON equivalent
   ```
   {
     repositoryPrefix: "/#/charts/my-repo/"
   }
   ```
   - Error responses
     - 401 Unauthorized
     - 400 Bad Request
     - Body of error responses to be defined.

* Delete App Repository
   - URL: /api/backend/v1/apprepositories/<app-repo-name>
   - Method: DELETE
   - Success response: 200 OK
   - Error responses
     - 401 Unauthorized
     - Body of error responses to be defined.

### 第三方
然后，第三方应用程序可以：

 * 使用它们的OpenID Connect`id_token`作为载体，在以上内容中发布以在Kubeapps Plus中创建新存储库，或者（如果请求是从浏览器发送的）则首先在单独的标签/ iframe中通过Kubeapps Plus进行身份验证，以 设置oauth2_proxy cookie。 假设关联的身份具有RBAC权限以在集群中创建存储库，则调用将成功。
 * 提供链接以使用“ repositoryPrefix”部署图表，例如。 `/＃/ charts / my-repo / <图表名称>`

 尽管不是必需的，但是如果不同的用户和/或群集需要，则可以为第三方应用程序配置多个Kubeapps Plus安装。
 
## 问题

* 为什么不启用不添加存储库的图表部署呢？
  - 此时，Kubeapps Plus允许仅从存储库安装图表，依靠其他服务来解析并提供所有图表元数据（README，values.yaml等），以供Kubeapps Plus使用。
* ...