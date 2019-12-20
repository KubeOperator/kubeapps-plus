# AppRepository Controller

用于管理应用程序(Helm)存储库的控制器为
[Kubeapps Plus](https://kubeapps.com).

一个AppRepository资源如下所示：

```
apiVersion: v1
items:
apiVersion: kubeapps.com/v1alpha1
kind: AppRepository
metadata:
  name: bitnami
spec:
  url: https://charts.bitnami.com/incubator
  type: helm
```

该控制器将监视上述类型的资源并创建[Kubernetes CronJobs](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/)
计划将存储库同步到数据库。 这是
Kubeapps Plus旨在与它一起使用。

基于[Kubernetes示例控制器](https://github.com/kubernetes/sample-controller)。