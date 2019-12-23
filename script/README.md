开发备注：

1. 初始化脚本（检测Docker环境和Helm环境）
2. 用户输入Docker registry 地址 账户 密码
   （默认是KO内置Registry 的 ingress）
3. 生成ImagePullSecert
4. 打包Chart, 推送Docker镜像到仓库
5. 用户输入Chart 仓库 地址 账户 密码
    （默认是Kubeapps内置Chart)
    
    推送Chart到仓库
6.  引导客户页面添加源