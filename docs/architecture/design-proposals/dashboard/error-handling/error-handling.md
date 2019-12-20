# 仪表板错误处理

作者(s): @maguohao2018

日期: 2019/12/02

类型: 设计文件

## 目的

本文档的目标是提出一种一致的错误处理机制, 该机制可解决两种类型的错误, 即Kubeapps前端仪表板中的意外/未处理(瞬态服务器错误, 语法错误)和已处理(重试, 404, ...)错误。 。

### 背景

当前, 通过try/catch呈现错误或通过调度自定义的Redux操作来按情况管理错误处理。 然后, 将在这些特定组件内部处理并显示这些错误。

## 总览

我们希望改善意外错误和预期/已处理错误的错误处理, 因此我们可以实现: 

* 总是会处理意外的错误, 并且会通知用户。 它们不会在半渲染或损坏的视图中被遮盖。
* 总会有一个可以显示错误的地方。
* 错误消息必须以一致的方式显示在UI中。
* 我们将有一个定义的API来引发错误。 聚合资源特定的错误操作。
* 意外错误和已处理错误均应通过相同机制提出并显示。 这意味着例如Vue组件和异步Thunk Action具有一致的引发错误的方式。
* 支持显示多个错误。 在我们的案例中很重要, 因为我们依赖于为单一目的(添加新存储库)并行调用多个API端点(创建密钥, 创建appRepository)。

## 详细设计

### 1 - 意外的, 未处理的错误

这些是应用程序在运行时引发的错误。 与API通讯时从应用程序逻辑异常到网络错误。

如今, 我们正在处理基于案例的错误, 如果我们希望通过副作用(即重试)或向用户显示可操作的信息来对抛出的错误做出反应(即双关), 这将是一件好事。 但这是脆弱的, 因为它迫使我们提前预测从哪里可以得到错误以及如何处理错误。 此外, 我们需要确保在每个页面上都有显示这些错误的位置。 **这就是为什么使用通用的全局**捕获所有“对不起, 出错了” **组件会有所帮助的原因。**

为什么我们需要全部？

当前, 如果应用程序遇到运行时错误, 则该应用程序将停止渲染, 但不会通知用户发生问题。 使页面处于潜在损坏状态。 [this](https://github.com/kubeapps/kubeapps/issues/632)是这种行为的一个示例。

此行为可能会造成混淆, 因此最好向用户显示“出了点问题, 请仔细检查'foo'和/或在此处创建问题...”

#### 实施细节

从理论上讲, 使用Vue的[Error boundary](https://reactjs.org/docs/error-boundaries.html)可以轻松实现全部目标。 在我们的例子中, 我们将包装“ Root”或“ Layout”组件的渲染内容。 如果我们希望允许应用程序呈现页眉和页脚但包装动态内容, 则可以在LayoutComponent中进行操作, 例如: 

将动态内容包装在页面内, 但不包括页眉和页脚。

```tsx
<main>
  <ErrorBoundary>
    <div className="container">{this.props.children}</div>
  </ErrorBoundary>
</main>
```

`错误边界`的工作方式是捕获任何错误, 在这种情况下, 它将呈现现有的`意外错误警报`组件。

注意: ErrorBoundary不适用于[此处](https://reactjs.org/docs/error-boundaries.html#how-about-event-handlers)所述的事件处理程序, 但在我们的案例中仍然是一个很好的补充 因为我们有一些客户端逻辑, 即解析YAML。

### 2 - 处理的错误

当前, 我们在集中向用户公开特定错误的方式方面做得很好。 为此, 我们使用了一个名为“ ErrorSelector”的多功能组件, 该组件负责根据错误的性质以不同的方式显示错误。

这种方法不错, 但有一些缺点: 

* 错误渲染发生在每个调用“ ErrorSelector”的组件中, 这意味着容易错过一致性。
* 我们要求在每个页面中都有一个错误占位符, 否则, 如果引发错误并在没有错误边界的页面中捕获错误, 则不会显示该占位符。
* By design, it does not support showing multiple errors at the same time, limiting its extensibility.

#### 实现细节: 将单个errorContainer连接到全局Redux错误名称空间

我们可以实现单个ErrorSelector组件, 该组件仅在布局中呈现一次并连接到Redux存储。 这是[此模式](https://stackoverflow.com/a/34403521)的示例。

这个新商店将能够包含多个错误。 这旨在支持其中2个异步调用可以返回2个都相关的错误的情况。 这也使我们将来可以使用类的第三方库轻松处理堆积的错误。

在我们的案例中, 实施概述可能看起来像这样, 下面有更多详细信息: 

![错误处理概述](overview.png)

此图表示从我们的[行动计划](＃action-plan)实施“阶段4”之后的系统状态。

##### 组件交互(生产者)

与错误进行交互的方式有两种, 它们都使用纯同步Redux动作实现。

1 - 显示错误

不同的组件或Thunk动作将能够通过将其及其某些属性作为通用的“ kubeapps @ ERROR/SHOW” Redux动作来“引发”错误。 一些功能要求: 

* 此操作应在其有效负载中包含足够的属性, 以便ErrorSelector能够识别出哪个错误以及如何处理该错误。
* `kubeapps-plus@ERROR/SHOW` 将取代目前 `ERROR_APPS`, `ERROR_CATALOG`, `ERROR_CHART`, `ERROR_README`, `ERROR_REPOS` , `AUTHENTICATION_ERROR`

2 - 清除全部或单个错误

需要一种方法来从商店或所有商店中删除一个错误, 从而使其从UI中消失。 我们将通过调度“ ERROR/CLEAR”操作来实现。

可以在两种情况下触发此错误。

1. 当用户更改路径时, 我们捕获到LOCATION_CHANGE中的错误, 减少了 **清除所有错误**.
2. 当用户单击错误中的“关闭”链接时, 我们 **清除一个错误** 由其ID引用。 `{ Type: "ERROR/CLEAR", payload: { id: "errorID",  } }`.

##### 减速机和商店信息

我们将创建一个新的化简器, 称为“错误”, 它将负责处理和存储应用程序错误。

商店将通过以下[this common](https://redux.js.org/recipes/structuringreducers/normalizingstateshape#designing-a-normalized-state)Redux非规范化模式进行定义。

|属性|类型|描述|
|---|---|---|
|byId|`{ [errorID: string]: KubeappsError }`|它将包含通过其ID索引的Kubeapps Plus错误的地图|
|allIds | string [] |包含错误ID的数组。|

ById将用于存储适当的错误, 这些错误是具有其属性的常规Kubeapps Plus错误。 该ID将在创建过程中生成, 例如使用[shortID](https://github.com/dylang/shortid)。

AllId将包含标识符列表, 并将用于指示顺序。 

在我们的例子中, 这种模式可以看作是一个过大的杀手, 因为我们不会更新资源, 但是它将帮助我们删除单个错误并且不依赖于数组定位。 它还为我们应该如何开始考虑映射商店建立了先例。

##### 代表性成分(消费者)

当前, 我们的errorSelector组件接受一组属性, 这些属性然后用于决定显示哪种错误以及如何显示错误。 这种抽象将继续使用, 而不是在渲染过程中作为常规组件道具传递, 而是通过全新的ErrorContainer中的mapStateToProps检索它们, 然后将其连接现有的errorSelector组件。

##### 错误边界整合(消费者)

在上一节[1-意外的未处理错误](＃1 ---意外的未处理错误)中, 我们提到了使用新的ErrorBoundary包装器, 该包装器将捕获任何错误, 然后将其信息呈现给用户。 作为第一步, 这很好, 但是理想情况下, 为了实现收敛, 我们可以使此包装程序仅用于分发“错误/显示”并期望其他内容来显示它(参见图)。 甚至更进一步的是, 通过实现componentDidCatch`, 我们的ErrorSelector组件也可以成为包装器。

## 注意事项

* 如前所述, 例如ThunkActions中发生了errorBoundary [不捕获异步错误](https://reactjs.org/docs/error-boundaries.html#how-about-event-handlers), 这意味着我们需要 重新检查我们的操作, 并确保我们正在分发“ ERRORS/SHOW”。
* 此设计不包括按错误类型清除特定错误的功能。 可以通过扩展`ERROR/CLEAR`, 即`{Type: “ ERROR/CLEAR”, 有效载荷: {errorType: “ NotFound”}}`来轻松支持。

## 行动计划

该设计可以分多个阶段实施: 

* 阶段1: 通过重用UnexpectedError组件, 为意外的运行时呈现错误实现错误边界。 [＃724](https://github.com/kubeapps/kubeapps/issues/724)。
* 阶段2: 在连接到Redux存储的布局中实现ErrorSelector的实例, 将几个ErrorSelector使用者移至该新模型[＃725](https://github.com/kubeapps/kubeapps/issues/725)。
* 阶段3: 完成所有这些使用方的渲染, 从渲染组件到分发错误并删除那些渲染[＃725](https://github.com/kubeapps/kubeapps/issues/725)。
* 阶段4: 更改errorBoundary组件以依赖于阶段2中实现的已连接errorSelector并删除其自己的呈现器[＃726](https://github.com/kubeapps/kubeapps/issues/726)。
* 阶段5: 研究合并errorBoundary和errorSelector [＃727](https://github.com/kubeapps/kubeapps/issues/727)。

我的观点是, 就优先级而言, 我们短期内真正需要的只是第1阶段。通过Redux机制进行的全局错误处理虽然很不错, 但目前并没有严格要求, 因为该应用程序在新版本方面的增长并不多 意见还没有。

## 参考文献

* [全局错误模式示例](https://stackoverflow.com/questions/34403269/what-is-the-best-way-to-deal-with-a-fetch-error-in-Vue-redux/34403521#34403521 )
* [Redux状态最佳实践](https://redux.js.org/recipes/structuringreducers/normalizingstateshape#designing-a-normalized-state)
* [Vue错误边界](https://reactjs.org/docs/error-boundaries.html)