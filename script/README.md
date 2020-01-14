# Helm Charts 离线安装包

本脚本为离线推送脚本，将 Kubeapps-plus 默认的 Chart 推送至指定的仓库。

默认使用本地 ChartMuseum 仓库，如果需要修改仓库地址，请修改 kubeappsctl.sh 文件里的 repo_url、repo_username、repo_password 等参数。

使用方法:

```
# 首先登录 master 节点，其次进入 tmp (或其他自定义)目录
cd /tmp
wget http://172.16.10.63/kubeapps-plus/kubeapps-offline-scripts-v1.0-38.tar.gz
# 解压文件到本目录
tar zxvf kubeapps-offline-scripts-v1.0-38.tar.gz
# 解压后会出现一个 script 目录
cd script
# 执行 kubeappsctl.sh shell 文件,将会下载镜像并推送到本地(或自定义)仓库
./kubeappsctl.sh start
```