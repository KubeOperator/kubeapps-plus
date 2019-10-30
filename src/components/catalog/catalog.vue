<template>
  <div class="catalog-content">
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <h1 style="float: left">{{'Catalog'}}</h1>
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
    <el-row>
      <el-col :span="8" v-for="catalog in catalogList" :key="catalog.name">
        <el-card :body-style="{ padding: '0px' }">
          0
          <div style="padding: 14px;">
            <span>{{catalog.name}}</span>
            <div class="bottom clearfix">
              {{catalog.description}}
              <el-button type="text" class="button">
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
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
