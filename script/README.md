# Helm Charts 离线安装包

Helm Chart 离线包包括两个离线包，一个是 CI 相关的应用包括 Gitlab、Harbor、Jenkins 和 Sonarqube，另外一个是 AI 机器学习应用包括 Tensorflow-notebook 和 Tensorflow-serving，用户可以根据需要下载并安装。
请自行下载 Chart 离线包，并复制到目标机器的 /tmp 目录下。

- 下载链接: https://github.com/KubeOperator/KubeOperator/releases

默认使用本地 ChartMuseum 仓库，如果需要修改仓库地址，请修改 kubeappsctl.sh 文件里的 repo_url、repo_username、repo_password 等参数。
安装过程中需要手动输入的信息，选择默认值，即选择不使用外部 Docker Image registry 和不使用外部 Chart 仓库。

#### 安装步骤:

```bash
# 首先登录 master 节点，其次进入 tmp (或其他自定义)目录
cd /tmp
wget http://xxx.xxx.xxx.xxx/kubeapps-plus/kubeapps-plus-package-v1.0-CI-xx.tar.gz
# 解压文件到本目录
tar zxvf kubeapps-plus-package-v1.0-CI-xx.tar.gz
# 解压后会出现一个 kubeapps-plus-CI 目录
cd kubeapps-plus-CI
# 执行 kubeappsctl.sh shell 文件,将会下载镜像并推送到本地(或自定义)仓库
./kubeappsctl.sh start
```