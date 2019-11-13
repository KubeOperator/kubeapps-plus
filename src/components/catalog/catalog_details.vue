<template>
  <div class="catalog-content">
    <!-- header start -->
    <el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="https://hub.kubeapps.com/api/chartsvc/v1/assets/stable/aerospike/logo" class="image"/>
<!--            <img v-show="catalog.attributes.icon" :src="catalog.attributes.icon | searchImage(catalog.attributes.icon)" class="image">-->
<!--            <img v-show="!catalog.attributes.icon" src="../../.././static/catalog/default.png" class="image">-->
          </div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content bg-purple">
            <el-col :span="16">
              <h1 class="h1">
                {{'stable/aerospike'}}
              </h1>
              <h5 class="h5">
                {{'v4.5.0.5 - stable'}}
              </h5>
              <h5 class="h5">
                {{'A Helm chart for Aerospike in Kubernetes'}}
                <el-button type="success"
                        size="medium" icon="el-icon-download" class="deploy"
                        @click="deploy(catalog)">{{$t('message.deploy')}}</el-button>
              </h5>
            </el-col>
          </div>
        </el-col>
      </el-row>
    </el-row>
    <!-- header end -->

    <!-- 间隔线 start -->
    <el-divider></el-divider>
    <!-- 间隔线 end -->

    <!-- foot start -->
    <el-container>
      <el-main>
        <vue-markdown class="article" :source="README"></vue-markdown>
      </el-main>
      <el-aside>
        <div class="ChartViewSidebar__section">
          <h2>{{'Chart Versions'}}</h2>
        </div>
      </el-aside>
    </el-container>
    <!-- foot end -->
  </div>
</template>

<script>
import loading from '../utils/loading.js';
// import showdown from 'showdown'
import VueMarkdown from 'vue-markdown'
// import apiSetting from "../utils/apiSetting.js";
// import http from "../utils/httpAxios.js";
// import getParamApi from "../utils/getParamApi";
// import errorMessage from '../utils/errorMessage.js';
export default {
  name:'document',
  components:{
    VueMarkdown
  },
  data(){
    return {
      catalog: {},
      README: `# README`
    }
  },
  mounted () {
    // let converter = new showdown.Converter()
    // let text = this.README.toString()
    // this.html = converter.makeHtml(text)
  },
  created() {
    this
    loading(this, 1000)
    this.init()
    this.README = `# Aerospike Helm Chart

This is an implementation of Aerospike StatefulSet found here:

* <https://github.com/aerospike/aerospike-kubernetes>

## Pre Requisites

* Kubernetes 1.9+

* PV support on underlying infrastructure (only if you are provisioning persistent volume).

* Requires at least \`v2.5.0\` version of helm to support

## StatefulSet Details

* <https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/>

## StatefulSet Caveats

* <https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#limitations>

## Chart Details

This chart will do the following:

* Implement a dynamically scalable Aerospike cluster using Kubernetes StatefulSets

### Installing the Chart

To install the chart with the release name \`my-aerospike\` using a dedicated namespace(recommended):

\`\`\`sh
helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
helm install --name my-aerospike --namespace aerospike stable/aerospike
\`\`\`

The chart can be customized using the following configurable parameters:

| Parameter                       | Description                                                     | Default                      |
| ------------------------------- | ----------------------------------------------------------------| -----------------------------|
| \`image.repository\`              | Aerospike Container image name                                  | \`aerospike/aerospike-server\` |
| \`image.tag\`                     | Aerospike Container image tag                                   | \`4.5.0.5\`                    |
| \`image.pullPolicy\`              | Aerospike Container pull policy                                 | \`Always\`                     |
| \`replicaCount\`                  | Aerospike Brokers                                               | \`1\`                          |
| \`command\`                       | Custom command (Docker Entrypoint)                              | \`[]\`                         |
| \`args\`                          | Custom args (Docker Cmd)                                        | \`[]\`                         |
| \`labels\`                        | Map of labels to add to the statefulset                         | \`{}\`                         |
| \`annotations\`                   | Map of annotations to add to the statefulset                    | \`{}\`                         |
| \`tolerations\`                   | List of node taints to tolerate                                 | \`[]\`                         |
| \`persistentVolume\`              | Config of persistent volumes for storage-engine                 | \`{}\`                         |
| \`confFile\`                      | Config filename. This file should be included in the chart path | \`aerospike.conf\`             |
| \`resources\`                     | Resource requests and limits                                    | \`{}\`                         |
| \`nodeSelector\`                  | Labels for pod assignment                                       | \`{}\`                         |
| \`terminationGracePeriodSeconds\` | Wait time before forcefully terminating container               | \`30\`                         |
| \`service.type\`                  | Kubernetes Service type                                         | \`ClusterIP\`                  |
| \`service.annotations\`           | Kubernetes service annotations, evaluated as a template         | \`{}\`                         |
| \`service.loadBalancerIP\`        | Static IP Address to use for LoadBalancer service type          | \`nil\`                        |
| \`service.clusterIP\`             | Static clusterIP or None for headless services                  | \`None\`                       |
| \`meshService.annotations\`       | Kubernetes service annotations, evaluated as a template         | \`{}\`                         |

Specify parameters using \`--set key=value[,key=value]\` argument to \`helm install\`

Alternatively a YAML file that specifies the values for the parameters can be provided like this:

\`\`\`sh
helm install --name my-aerospike -f values.yaml stable/aerospike
\`\`\`

### Conf files for Aerospike

There is one conf file added to each Aerospike release. This conf file can be replaced with a custom file and updating the \`confFile\` value.

If you modify the \`aerospike.conf\` (and you use more than 1 replica), you want to add the \`#REPLACE_THIS_LINE_WITH_MESH_CONFIG\` comment to the config file (see the default conf file). This will update your mesh to connect each replica.

## Known Limitations

* Persistent volume claims tested only on GCP
* Aerospike cluster is not accessible via an external endpoint
`
  },
  methods:{
    init : async () => {
      this.README = `# Aerospike Helm Chart

This is an implementation of Aerospike StatefulSet found here:

* <https://github.com/aerospike/aerospike-kubernetes>

## Pre Requisites

* Kubernetes 1.9+

* PV support on underlying infrastructure (only if you are provisioning persistent volume).

* Requires at least \`v2.5.0\` version of helm to support

## StatefulSet Details

* <https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/>

## StatefulSet Caveats

* <https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#limitations>

## Chart Details

This chart will do the following:

* Implement a dynamically scalable Aerospike cluster using Kubernetes StatefulSets

### Installing the Chart

To install the chart with the release name \`my-aerospike\` using a dedicated namespace(recommended):

\`\`\`sh
helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
helm install --name my-aerospike --namespace aerospike stable/aerospike
\`\`\`

The chart can be customized using the following configurable parameters:

| Parameter                       | Description                                                     | Default                      |
| ------------------------------- | ----------------------------------------------------------------| -----------------------------|
| \`image.repository\`              | Aerospike Container image name                                  | \`aerospike/aerospike-server\` |
| \`image.tag\`                     | Aerospike Container image tag                                   | \`4.5.0.5\`                    |
| \`image.pullPolicy\`              | Aerospike Container pull policy                                 | \`Always\`                     |
| \`replicaCount\`                  | Aerospike Brokers                                               | \`1\`                          |
| \`command\`                       | Custom command (Docker Entrypoint)                              | \`[]\`                         |
| \`args\`                          | Custom args (Docker Cmd)                                        | \`[]\`                         |
| \`labels\`                        | Map of labels to add to the statefulset                         | \`{}\`                         |
| \`annotations\`                   | Map of annotations to add to the statefulset                    | \`{}\`                         |
| \`tolerations\`                   | List of node taints to tolerate                                 | \`[]\`                         |
| \`persistentVolume\`              | Config of persistent volumes for storage-engine                 | \`{}\`                         |
| \`confFile\`                      | Config filename. This file should be included in the chart path | \`aerospike.conf\`             |
| \`resources\`                     | Resource requests and limits                                    | \`{}\`                         |
| \`nodeSelector\`                  | Labels for pod assignment                                       | \`{}\`                         |
| \`terminationGracePeriodSeconds\` | Wait time before forcefully terminating container               | \`30\`                         |
| \`service.type\`                  | Kubernetes Service type                                         | \`ClusterIP\`                  |
| \`service.annotations\`           | Kubernetes service annotations, evaluated as a template         | \`{}\`                         |
| \`service.loadBalancerIP\`        | Static IP Address to use for LoadBalancer service type          | \`nil\`                        |
| \`service.clusterIP\`             | Static clusterIP or None for headless services                  | \`None\`                       |
| \`meshService.annotations\`       | Kubernetes service annotations, evaluated as a template         | \`{}\`                         |

Specify parameters using \`--set key=value[,key=value]\` argument to \`helm install\`

Alternatively a YAML file that specifies the values for the parameters can be provided like this:

\`\`\`sh
helm install --name my-aerospike -f values.yaml stable/aerospike
\`\`\`

### Conf files for Aerospike

There is one conf file added to each Aerospike release. This conf file can be replaced with a custom file and updating the \`confFile\` value.

If you modify the \`aerospike.conf\` (and you use more than 1 replica), you want to add the \`#REPLACE_THIS_LINE_WITH_MESH_CONFIG\` comment to the config file (see the default conf file). This will update your mesh to connect each replica.

## Known Limitations

* Persistent volume claims tested only on GCP
* Aerospike cluster is not accessible via an external endpoint
`
      // await http(getParamApi(apiSetting.kubernetes.getCharts, this.$route.params.id, 'versions')).then(res => {
      //   if (res.status == 200) {
      //     this.catalog = res.data.data
      //   } else {
      //     //Error Message
      //     errorMessage(this, res);
      //   }
      // })
    },
    deploy (key){
      console.log(key)
    }
  }
};
</script>

<style scoped>
  .catalog-content{
    padding: 1em;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 5em;
    text-align: left;
  }
  .image {
    max-width: 7em;
    max-height: 6em;
    display: block;
    margin: 1em;
  }
  .h1{
    margin: 0.625em 0 0.3125em;
  }
  .h5{
    font-weight: normal;
    color: #44add5;
    margin: 0.625em 0 0.3125em;
    font-size: 1.25em;
  }
  .deploy{
    float: right;
    margin-top: -1em;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  .article{
    text-align: left;
    min-height: 1px;
    box-sizing: border-box;
    padding: 0 0.625em;
    font-size: 1em;
    color: #1C2B39;
    line-height: 1.5;
    font-weight: 400;
    text-rendering: optimizeLegibility;
  }
</style>

