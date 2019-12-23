# 基本表格支持

**NOTE:** 此功能正在大力开发中。 下文所述的某些内容将来可能会更改。

从Kubeapps Plus 1.6.0开始, 可以在图表中包含JSON模式, 该图表定义了values.yaml文件的结构。 此JSON模式用于两个目标: 

 - 验证给定的值满足定义的架构。 如果提交的值无效, 则安装或升级将失败。 Helm v3中已引入了此功能。
 - 为用户提供了一个更简单的视图, 因此该图表更易于部署和配置。

此功能的目的是向用户提供最常用的参数, 这些参数通常在以更加用户友好的形式部署图表(如用户名和密码)之前进行修改。

本文档指定了需要定义哪些内容才能向图表用户呈现此基本形式。

## 创建一个values.schema.json

这个文件是随Helm v3一起引入的, 是一个[JSON Schema](https://json-schema.org/), 用于定义图表的“ values.yaml”文件的结构, 包括所需的验证次数。 如果图表包含其架构, 则在提交新版本之前会验证所使用的值。

该文件可以定义图表的一些或每个可能的值。 写入后, 应将其包含在Helm软件包中。 可以在[here](https://github.com/helm/helm/issues/5812)中找到将其包含在Helm中的建议。

## 用于标识基本参数的附加注释

为了识别应在表单中显示的值, 必须包含一些特殊标签。

首先, 必须指定标签“ form”并将其设置为“ true”。 模式中用此标记标记的所有属性都将以表格形式表示。 例如: 

```
    "wordpressUsername": {
      "type": "string",
      "form": true
    },
```

通过上面的定义, 我们将值“ wordpressUsername”标记为要在表单中表示的值。 请注意, 除了用于验证提交的值是否具有正确的类型之外, “ type”标记还将用于呈现适当的HTML组件, 以以下形式表示输入: 

![用户名输入](../img/username-input.png)

除了`type`, 还有其他标签可用于自定义参数的表示方式: 

 - `title` 用于呈现参数的标题。 如果未指定, 则Kubeapps Plus将使用该值的路径(即“ credentials.username”)。
 - `description` 用于包含参数的其他信息。
 - `default` 用于设置默认值。 请注意, 只有在`values.yaml`文件尚未具有参数默认值的情况下, 才使用此字段。
 
### 自定义类型: Slider

可以将组件渲染为滑块, 然后用户可以拖放此滑块以选择其首选值: 

![磁盘输入](../img/disk-input.png)

为了渲染滑块, 您可能需要设置一些要求和其他标签: 

 - 目前唯一支持的`type`是字符串。 其他类型, 例如“整数”将被转换为字符串。
 - 有必要指定标签“ render”并将其设置为“ slider”。
 - 标签“ sliderMin”标识了滑块允许的最小值(可以绕过在输入中写入较小的值)。
 - 标签`sliderMax`标识了滑块允许的最大值(可以绕过在输入中写入较大的值)。
 - 标签“ sliderUnit”指定要设置的值的单位。 例如“ Gi”。

 这是一个滑块参数的示例: 

```json
    "size": {
      "type": "string",
      "title": "Disk Size",
      "form": true,
      "render": "slider",
      "sliderMin": 1,
      "sliderMax": 100,
      "sliderUnit": "Gi"
    }
```

### 小节

当类型为object的属性设置为form标识符时, 它将被呈现为一个小节。 子部分是一组参数, 这些参数组合在一起: 

![主机名部分](../img/hostname-section.png)

“对象”中的所有参数将在小节中呈现。

请注意, 在某些情况下, 参数会导致其余参数不再相关。 例如, 将“ ingress.enabled”设置为“ false”会使“ ingress.hostname”无关紧要。 为了避免混淆, 您可以设置特殊标签“ hidden”来隐藏该参数。 标签“ hidden”可以是一个“字符串”, 指向需要为true的参数, 以隐藏元素或对象以设置指向的值需要匹配的值。

这是带有可隐藏参数的小节的示例: 

```json
    "ingress": {
      "type": "object",
      "form": "ingress",
      "title": "Ingress Details",
      "properties": {
        "enabled": {
          "type": "boolean",
          "form": "enableIngress",
          "title": "Use a custom hostname",
          "description": "Enable the ingress resource that allows you to access the WordPress installation."
        },
        "hostname": {
          "type": "string",
          "form": "hostname",
          "title": "Hostname",
          "hidden": {
            "value": "ingress.enabled",
            "condition": false
          }
        }
      }
    },
```

请注意, 隐藏另一个参数的参数不必位于该部分本身内。 在另一个示例中, “ mariadb.enabled”用于隐藏“ externalDatabase”中的某些参数: 

```json
    "mariadb": {
      "type": "object",
      "properties": {
        "enabled": {
          "type": "boolean",
          "title": "Use a new MariaDB database hosted in the cluster",
          "form": "useSelfHostedDatabase",
        }
      }
    },
    "externalDatabase": {
      "type": "object",
      "title": "External Database Details",
      "form": "externalDatabase",
      "properties": {
        "host": {
          "type": "string",
          "form": "externalDatabaseHost",
          "title": "Database Host",
          "hidden": "mariadb.enabled"
        },
      }
    },
```

## 例

这是[WordPress图表的工作示例](https://github.com/helm/charts/blob/master/stable/wordpress/values.schema.json)

以及结果形式: 

![基本形式](../img/basic-form.png)
