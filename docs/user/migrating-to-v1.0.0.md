# Migration to v1.0.0

此版本包含一些重大更改, 可以使升级合理
难。 现在还需要Helm 2.10及更高版本才能安装Kubeapps Plus。

如果您在升级到v1.0.0版本时遇到困难, 我们建议备份
您可能添加的所有AppRepository对象(自定义存储库)并执行
全新安装的Kubeapps Plus。

要备份自定义存储库, 请为每个存储库运行以下命令: 

```
kubectl get apprepository -o yaml <repo name> > <repo name>.yaml
```

**Note**: 您无需备份“稳定”, “孵化器”, “ bitnami”或
svc-cat存储库, 因为在重新安装Kubeapps Plus时将重新创建它们。

备份自定义存储库后, 运行以下命令删除
并重新安装Kubeapps Plus: 

```
helm delete --purge kubeapps
helm install bitnami/kubeapps --version 1.0.0
```

要恢复自定义存储库备份, 请为每个备份库运行以下命令
仓库: 

```
kubectl apply -f <repo name>.yaml
```
