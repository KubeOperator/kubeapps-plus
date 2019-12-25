# Helm Charts 安装

Helm 图表的规范来源，它是 KubeApps Plus 图表存储库的汇总。

## 初始化脚本

1.检测 Docker 环境 和 Helm 环境

```
echo "Kubeapps 推送Docker镜像及Helm Chart包脚本"
echo
echo "Usage: "
echo "  ./kubeappsctl.sh [COMMAND] [ARGS...]"
echo "  ./kubeappsctl.sh --help"
echo
echo "Commands: "
echo "  start 推送Docker镜像及Helm Chart包"
```

2.用户输入 Docker registry 的地址、账户、密码（默认是 KubeOperator 内置的 Registry 的 ingress）
   
```
echo "Kubeapps 推送Docker镜像及Helm Chart包脚本"
echo
echo "Usage: "
echo "  ./kubeappsctl.sh [COMMAND] [ARGS...]"
echo "  ./kubeappsctl.sh --help"
echo
echo "Commands: "
echo "  start 推送Docker镜像及Helm Chart包"
```
   
3.生成 ImagePullSecert

```
echo "Kubeapps 推送Docker镜像及Helm Chart包脚本"
echo
echo "Usage: "
echo "  ./kubeappsctl.sh [COMMAND] [ARGS...]"
echo "  ./kubeappsctl.sh --help"
echo
echo "Commands: "
echo "  start 推送Docker镜像及Helm Chart包"
```

4.打包 Chart, 推送 Docker镜像 到仓库

```
echo "Kubeapps 推送Docker镜像及Helm Chart包脚本"
echo
echo "Usage: "
echo "  ./kubeappsctl.sh [COMMAND] [ARGS...]"
echo "  ./kubeappsctl.sh --help"
echo
echo "Commands: "
echo "  start 推送Docker镜像及Helm Chart包"
```

5.用户输入 Chart 的仓库、地址、账户、密码（默认是 KubeApps Plus 内置 Chart) ，然后推送 Chart 到仓库

```
echo "Kubeapps 推送Docker镜像及Helm Chart包脚本"
echo
echo "Usage: "
echo "  ./kubeappsctl.sh [COMMAND] [ARGS...]"
echo "  ./kubeappsctl.sh --help"
echo
echo "Commands: "
echo "  start 推送Docker镜像及Helm Chart包"
```

6.引导客户页面添加仓库源

```
    echo "Kubeapps 推送Docker镜像及Helm Chart包脚本"
    echo
    echo "Usage: "
    echo "  ./kubeappsctl.sh [COMMAND] [ARGS...]"
    echo "  ./kubeappsctl.sh --help"
    echo
    echo "Commands: "
    echo "  start 推送Docker镜像及Helm Chart包"
```