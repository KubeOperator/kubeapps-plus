# KubeApps Plus

### 1.初始化脚本（检测 Docker 环境 和 Helm 环境）

### 2.用户输入 Docker registry 的地址、账户、密码（默认是 KubeOperator 内置的 Registry 的 ingress）
   
### 3.生成 ImagePullSecert

### 4.打包 Chart, 推送 Docker镜像 到仓库

### 5.用户输入 Chart 的仓库、地址、账户、密码（默认是 KubeApps Plus 内置 Chart) ，然后推送 Chart 到仓库

### 6.引导客户页面添加仓库源