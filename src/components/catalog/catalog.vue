<template>
  <div class="catalog-content">
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <h1 style="float: left">{{$t('message.catalog')}}</h1>
          <el-input class="catalog-search"
                  :placeholder="$t('message.search_charts')"
                  prefix-icon="el-icon-search"
                  v-model="input"
                  clearable>
          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" v-for="catalog in catalogList" :key="catalog.name" class="el-col">
        <el-card :body-style="{ padding: '0px' }">
          <div class="catalog-image">
            <img :src="catalog.image" class="image">
          </div>
          <div style="padding: 1em;">
            <h3 class="catalog-label">{{catalog.name}}</h3>
            <h5 class="catalog-desc">{{catalog.description}}</h5>
            <div class="bottom clearfix">
              <el-button type="text" class="button-left" disabled>
                <i class="iconfont">&#xe67b;</i>&nbsp;{{catalog.version}}
              </el-button>
              <el-button size="medium" type="primary" class="button-right" v-show="catalog.operate == 'stable'
              || catalog.operate == 'bitnami'" round>
                {{catalog.operate}}
              </el-button>
              <el-button type="warning" class="button-right" v-show="catalog.operate == 'incubator'" round>
                {{catalog.operate}}
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  let catalogList = []
export default {
  name: "catalog",
  data(){
    return {
      input: '',
      currentDate: new Date(),
      catalogList: catalogList
    }
  },
  created() {
    this.init()
  },
  methods:{
    init(){
      this.catalogList = [
        {name:'aerosplike', description: 'A Helm chart for Aerospike in Kubernetes', version: '4.5.0.5', operate: 'stable', image: 'https://hub.kubeapps.com/api/chartsvc/v1/assets/stable/aerospike/logo'},
        {name:'airflow1', description: 'Airflow is a platform to programmatically author schedule and mon itor workflows', version: '1.10.5', operate: 'stable', image: 'https://hub.kubeapps.com/api/chartsvc/v1/assets/stable/airflow/logo'},
        {name:'airflow2', description: 'Airflow is a platform to programmatically author schedule and mon itor workflows', version: '1.10.5', operate: 'bitnami', image: 'https://hub.kubeapps.com/api/chartsvc/v1/assets/bitnami/airflow/logo'},
        {name:'ambassador', description: 'A Helm chart for Aerospike in Kubernetes', version: '0.85.0', operate: 'stable', image: 'https://hub.kubeapps.com/api/chartsvc/v1/assets/stable/ambassador/logo'},
        {name:'anchore-engine1', description: 'Anchore container analysis and policy evaluation engine service', version: '0.5.1', operate: 'incubator', image: 'https://hub.kubeapps.com/api/chartsvc/v1/assets/stable/anchore-engine/logo'},
        {name:'anchore-engine2', description: 'Anchore container analysis and policy evaluation engine service', version: '0.5.1', operate: 'incubator', image: 'https://hub.kubeapps.com/api/chartsvc/v1/assets/bitnami/apache/logo'},
        {name:'anchore-engine3', description: 'Anchore container analysis and policy evaluation engine service', version: '0.5.1', operate: 'incubator', image: 'https://hub.kubeapps.com/api/chartsvc/v1/assets/stable/anchore-engine/logo'},
        {name:'anchore-engine4', description: 'Anchore container analysis and policy evaluation engine service', version: '0.5.1', operate: 'incubator', image: 'https://hub.kubeapps.com/api/chartsvc/v1/assets/stable/apm-server/logo'},
        {name:'anchore-engine5', description: 'Anchore container analysis and policy evaluation engine service', version: '0.5.1', operate: 'incubator', image: 'https://hub.kubeapps.com/api/chartsvc/v1/assets/stable/atlantis/logo'},
        {name:'anchore-engine6', description: 'Anchore container analysis and policy evaluation engine service', version: '0.5.1', operate: 'incubator', image: 'https://hub.kubeapps.com/api/chartsvc/v1/assets/stable/anchore-engine/logo'},
        {name:'anchore-engine7', description: 'Anchore container analysis and policy evaluation engine service', version: '0.5.1', operate: 'incubator', image: 'https://hub.kubeapps.com/api/chartsvc/v1/assets/argo/argo-cd/logo'},
        {name:'anchore-engine8', description: 'Anchore container analysis and policy evaluation engine service Anchore container analysis and policy evaluation engine service', version: '0.5.1', operate: 'incubator', image: 'https://hub.kubeapps.com/api/chartsvc/v1/assets/stable/anchore-engine/logo'}
      ];
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
  }
  .catalog-search{
    float: left;
    width: 40%;
    margin: 20px 0 0 1em;
  }
  .bottom {
    line-height: 12px;
    text-align: left;
  }

  .button-left {
    padding: 5px;
    float: left;
  }

  .button-right {
    padding: 5px;
    float: right;
  }

  .image {
    max-width: 7em;
    max-height: 6em;
    display: block;
    margin: 1em;
  }

  .el-col{
    padding: 10px 0;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .catalog-image{
    display: flex;
    height: calc(72px + 2em);
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    text-align: center;
    background-color: #f1f1f1;
    box-sizing: border-box;
  }

  .catalog-desc{
    height: 2em;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .catalog-label{
    word-wrap: break-word;
    text-align: center;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    font-size: 1.1em;
    font-weight: 700;
    margin: 0;
  }
</style>
