# 项目中的端到端测试

在每个CI构建中, 都会运行一组端到端测试, 以尽可能多地验证这些更改不包括从用户角度出发的回归。 当前的端到端测试分两个步骤(或类别)执行: 

 - 图表测试
 - 浏览器测试

这些测试由脚本[scripts/e2e-test.sh](../../script/e2e-test.sh)执行。 该脚本: 

 1. 使用证书安装Tiller
 2. 使用CI流程中生成的映像安装Kubeapps Plus
 3. 等待不同的部署准备就绪
 4. 执行Helm测试(有关更多详细信息, 请参阅以下部分)。
 5. 执行Web浏览器测试(有关更多详细信息, 请参见以下部分)。

如果以上所有方法均成功, 则将控制以正确的退出代码返回给CI。

## 图表测试

项目中的图表测试是使用[Helm提供的]测试功能定义的(https://helm.sh/docs/developing_charts/#chart-tests)。 这些测试的目标是图表已成功部署, 并且所部署的每个微服务的基本功能均按预期工作。 如果需要, 特定的功能测试应包含在单元测试或浏览器测试中。

您可以在[图表文件夹](../../chart/kubeapps/templates/tests)中找到当前的图表测试。

## Web浏览器测试

除了图表测试运行的基本功能测试之外, 该项目还包含Web浏览器测试, 您可以在[integration](../../integration)文件夹中找到该测试。

这些测试基于[Puppeteer](https://github.com/GoogleChrome/puppeteer)。 Puppeteer是一个NodeJS库, 它提供了高级API来控制Chrome或Chromium(默认情况下为无头模式)。

在Puppeteer之上, 我们使用`jest-puppeteer`模块, 该模块允许我们使用与项目中其余单元测试相同的语法执行这些测试。

上面指向的“集成”文件夹是独立的。 这意味着运行浏览器测试所需的不同依赖关系未包含在默认的“ package.json”中。 在该文件夹中, 可以找到一个“ Dockerfile”, 该文件用于生成具有运行浏览器测试所需的所有依赖项的映像。

可以在本地或在容器环境中运行这些测试。

### 在本地运行浏览器测试

要在本地运行测试, 您只需要安装所需的依赖项并设置所需的环境变量: 

```bash
cd integration
yarn install
INTEGRATION_ENTRYPOINT=http://kubeapps.local LOGIN_TOKEN=foo yarn start
```

如果发生任何问题, 除了测试日志外, 您还可以在“报告/屏幕截图”文件夹中找到失败测试的屏幕截图。

### 在Pod中运行浏览器测试

由于CI环境没有必需的依赖关系并提供了可重现的环境, 因此可以在Kubernetes窗格中运行浏览器测试。 为此, 您可以启动一个实例, 该实例运行映像“ kubeapps/integration-tests”。 该映像包含所有必需的依赖关系, 并且它将一直等待, 因此您可以在其中执行命令。 此设置的目的是, 您可以将最新测试复制到映像中, 运行测试并在出现故障的情况下提取屏幕截图: 

```bash
cd integration
# Deploy the executor pod
kubectl apply -f manifests/executor.yaml
pod=$(kubectl get po -l run=integration -o jsonpath="{.items[0].metadata.name}")
# Copy latest tests
kubectl cp ./use-cases ${pod}:/app/
# Run tests
kubectl exec -it ${pod} --/bin/sh -c 'INTEGRATION_ENTRYPOINT=http://kubeapps.kubeapps LOGIN_TOKEN=foo yarn start'
# If the tests fail, get report screenshot
kubectl cp ${pod}:/app/reports ./reports
```
