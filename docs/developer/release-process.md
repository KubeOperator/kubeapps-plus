# Kubeapps Plus发布开发人员指南

本文档的目的是指导您完成发布新版本的Kubeapps Plus的过程。

## 1 - 创建一个新的git标签

第一步是标记存储库主分支提示并将其推向上游。 重要的是要注意, 标记名称将用作发行版名称。

```bash
export VERSION_NAME="v1.0.0-beta.1"

git tag ${VERSION_NAME}
git push origin ${VERSION_NAME}
```

这将触发构建, 测试和“发布” [CI中的工作流程](https://circleci.com/gh/kubeapps/workflows)。
 
## 2 - 完成GitHub release notes

发布工作完成后, 您将预先填充GitHub发布草稿。 您仍然必须**在版本重点中添加高级说明**。 保存草稿, 并且**尚未发布**。

## 3 - 发布图表版本

此时, 您将拥有一组新的已发布docker映像以及一些等待发布的发行说明。

但在此之前, 我们需要在“图表/kubeapps/Chart.yaml”中创建带有图表版本的PR并将其合并([示例](https://github.com/kubeapps/kubeapps/pull/663/files）） 。 这将触发另一个CI作业, 该作业将发布指向步骤1中构建的新Docker映像的图表的新版本。

## 4 - 发布GitHub版本

一旦发布了图表并由同行评审了发行说明, 就发布发行内容, 我们就完成了!

不要忘记在#kubeapps plus中促进发行!
