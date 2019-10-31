<template>
  <div class="catalog-content">
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <h1 style="float: left">{{$t('catalog')}}</h1>
          <el-input class="catalog-search"
                  placeholder="search charts..."
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
            <h5 style="height: 1em">{{catalog.description}}</h5>
            <div class="bottom clearfix">
              <el-button type="text" class="button-left" disabled>
                {{catalog.version}}
              </el-button>
              <el-button type="text" class="button-right">
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
      currentDate: new Date(),
      catalogList: catalogList
    }
  },
  created() {
    this.init()
    console.log(this.catalogList)
  },
  methods:{
    init(){
      this.catalogList = [
        {name:'aerosplike', description: 'A Helm chart for Aerospike in Kubernetes', version: 'v4.5.0.5', operate: 'stable', image: 'https://hub.kubeapps.com/api/chartsvc/v1/assets/stable/aerospike/logo'},
        {name:'airflow', description: 'Airflow is a platform to programmatically author schedule and mon itor workflows', version: '1.10.5', operate: 'stable', image: 'https://hub.kubeapps.com/api/chartsvc/v1/assets/stable/airflow/logo'},
        {name:'airflow', description: 'Airflow is a platform to programmatically author schedule and mon itor workflows', version: '1.10.5', operate: 'bitnami', image: 'https://hub.kubeapps.com/api/chartsvc/v1/assets/bitnami/airflow/logo'},
        {name:'ambassador', description: 'A Helm chart for Aerospike in Kubernetes', version: '0.85.0', operate: 'stable', image: 'https://hub.kubeapps.com/api/chartsvc/v1/assets/stable/ambassador/logo'},
        {name:'anchore-engine', description: 'Anchore container analysis and policy evaluation engine service', version: '0.5.1', operate: 'incubator', image: 'https://hub.kubeapps.com/api/chartsvc/v1/assets/stable/anchore-engine/logo'}
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
    width: auto;
    margin: 1em;
  }
  .bottom {
    line-height: 12px;
    text-align: left;
  }

  .button-left {
    padding: 0;
    float: left;
  }

  .button-right {
    padding: 0;
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
