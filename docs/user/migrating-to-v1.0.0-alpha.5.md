# Migration to v1.0.0-alpha.5

如果从v1.0.0-alpha.5之前的版本更新Kubeapps Plus，则该发行版包含一些重大更改，应谨慎处理。 作为总结，此版本包括以下重大更改：

- 推荐的安装Kubeapps Plus的方法是通过其Helm图表。
- “ kubeapps plus” CLI现在已弃用。 **它不会包含在将来的版本中**.
- 默认情况下，Kubeapps Plus不再安装Tiller，Kubeless和SealedSecrets。
- [实验性Helm CRD控制器](https://github.com/bitnami-labs/helm-crd)已替换为Tiller服务器的安全REST代理。 有关此代理的详细信息[here](../../cmd/tiller-proxy/README.md)。

这些是您需要按照以下步骤将Kubeapps Plus升级到此版本的步骤。

## 安装 Tiller

请按照[本指南](./securing-kubeapps.md)中的步骤安全地安装Tiller。 请勿安装Kubeapps Plus图表，因为它将失败，因为它将查找已存在的资源。 新的Tiller实例准备就绪后，您可以使用`kubeapps'1.0.0-alpha.5中包含的实用程序命令迁移现有发行版：

```
$ kubeapps migrate-configmaps-to-secrets --target-tiller-namespace kube-system
2019/12/06 12:24:23 Migrated foo.v1 as a secret
2019/12/06 12:24:23 Done. ConfigMaps are left in the namespace kubeapps-plus to debug possible errors. Please delete them manually
```

**NOTE**: 该工具假定您已将Helm存储发行版作为机密部署。 如果不是这种情况，您仍然可以迁移正在执行的发行版：

```
kubectl get configmaps -n kubeapps-plus -o yaml -l OWNER=TILLER | sed 's/namespace: kubeapps-plus/namespace: kube-system/g'  | kubectl create -f -
```

如果列出发行版，则应该可以看到所有发行版：

```
$ helm ls --tls --tls-ca-cert ca.cert.pem --tls-cert helm.cert.pem --tls-key helm.key.pem
NAME	REVISION	UPDATED                 	STATUS  	CHART          	NAMESPACE
foo 	1       	Mon Aug  6 12:10:07 2018	DEPLOYED	aerospike-0.1.7	default
```

**NOTE**: 如果尚未使用TLS证书安装Helm，则可以跳过TLS标志。

## 删除以前的Kubeapps Plus安装

现在，我们已经备份了发行版，我们应该删除现有的Kubeapps Plus资源。 为此，请执行：

```
kubeapps down
kubectl delete crd helmreleases.helm.bitnami.com sealedsecrets.bitnami.com
kubectl delete -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.7.0/controller.yaml
kubectl get helmreleases -o=name --all-namespaces | xargs kubectl patch $1 --type merge -p '{ "metadata": { "finalizers": [] } }'
```

等待直到删除Kubeapps Plus命名空间中的所有内容：

```
$ kubectl get all --namespace kubeapps-plus
No resources found.
```

### 删除无块

如果要删除Kubeless(如果不使用它)，则可以执行以下命令将其删除：

```
kubectl delete -f https://github.com/kubeless/kubeless/releases/download/v0.6.0/kubeless-v0.6.0.yaml
```

## 安装Kubeapps Plus图表

现在，您可以使用此存储库中包含的Helm图表安装新版本的Kubeapps Plus：

```
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install \
  --tls --tls-ca-cert ca.cert.pem --tls-cert helm.cert.pem --tls-key helm.key.pem \
  --set tillerProxy.tls.ca="$(cat ca.cert.pem)" \
  --set tillerProxy.tls.key="$(cat helm.key.pem)" \
  --set tillerProxy.tls.cert="$(cat helm.cert.pem)" \
  --namespace kubeapps-plus \
  bitnami/kubeapps
```

**NOTE**: 如果尚未使用TLS证书安装Helm，则可以跳过TLS标志。

当图表最终准备就绪时，您可以访问该应用程序，您将看到以前的应用程序。
