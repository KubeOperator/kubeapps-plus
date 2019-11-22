<template>
  <div class="catalog-content">
    <!-- header start -->
    <el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple grid-img">
            <img v-show="catalog.icon" :src="catalog.icon | searchImage(catalog.icon)" class="image">
            <img v-show="!catalog.icon" src="../../assets/image/default.png" class="image">
          </div>
        </el-col>
        <el-col :span="20">
          <el-col :span="19">
            <div class="grid-content bg-purple">
              <h1 class="h1">
                {{catalog.id}}
              </h1>
              <h5 class="h5">
                {{catalog.appVersion}}&nbsp;{{'-'}}&nbsp;{{catalog.id | splitName(catalog.id)}}
              </h5>
              <h5 class="h5">
                {{catalog.desc}}
              </h5>
            </div>
          </el-col>
          <el-col :span="1" class="deploy">
            <el-button type="success"
             size="medium" icon="el-icon-download"
             @click="deploy(catalog)">{{$t('message.deploy')}}</el-button>
          </el-col>
        </el-col>
      </el-row>
    </el-row>
    <!-- header end -->

    <!-- 间隔线 start -->
    <el-divider></el-divider>
    <!-- 间隔线 end -->

    <!-- foot start -->
    <el-container>
      <!-- left start-->
      <el-main>
        <vue-markdown class="article" :source="README"></vue-markdown>
      </el-main>
      <!-- left end-->

      <!-- right start-->
      <el-aside>
        <div class="el-collapse-right">
          <el-collapse v-model="activeNames">
            <el-collapse-item :title="$t('message.chart_versions')" name="1">
              <div v-for="(char, index) in chartVersionList" :key="index">
                <a @click="selectChart(char)">
                  {{char.attributes.version}} {{'-'}} {{char.attributes.created | UTC2GMT(char.attributes.created)}}
                </a>
              </div>
            </el-collapse-item>
            <el-collapse-item :title="$t('message.app_version')" name="2">
              <div>{{catalog.appVersion}}</div>
            </el-collapse-item>
            <el-collapse-item :title="$t('message.home')" name="3">
              <div>
                <a :href="catalog.home" target="_blank">
                  {{catalog.home}}
                </a>
              </div>
            </el-collapse-item>
            <el-collapse-item :title="$t('message.maintainers')" name="4">
              <div v-for="maintainer in catalog.maintainers" :key="maintainer.name">
                <div>
                  {{maintainer.name}}
                </div>
              </div>
            </el-collapse-item>
            <el-collapse-item :title="$t('message.related')" name="5">
              <div v-for="source in catalog.sources" :key="source">
                <a :href="source" target="_blank">
                  {{source}}
                </a>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-aside>
      <!-- right end-->

    </el-container>
    <!-- foot end -->
  </div>
</template>

<script>
import loading from '../utils/loading.js';
import VueMarkdown from 'vue-markdown'
import apiSetting from "../utils/apiSetting.js";
import http from "../utils/httpAxios.js";
import getParamApi from "../utils/getParamApi";
import noticeMessage from '../utils/noticeMessage.js';

export default {
  name:'document',
  components:{
    VueMarkdown
  },
  data(){
    return {
      catalog: {},
      README: '',
      chartVersionList: [],
      activeNames: ['1', '2', '3', '4', '5'],
      chartName: ''
    }
  },
  mounted () {
  },
  created() {
    let chart = this.$route.params.params ? this.$route.params.params : JSON.parse(sessionStorage.getItem('catalogDetailsByParams'))
    this.chartName = sessionStorage.getItem('chartName')
    this.catalog = {
      id: chart.id,
      icon: chart.icon,
      version: chart.version,
      appVersion: chart.appVersion,
      desc: chart.desc,
      home: chart.home,
      sources: chart.sources,
      maintainers: chart.maintainers
    }
    loading(this, 1000)
    this.init()
  },
  methods:{
    init : async function() {
      await http(getParamApi(apiSetting.kubernetes.getCharts, this.chartName, 'versions')).then(res => {
        if (res.status == 200) {
          this.chartVersionList = res.data.data
          http(getParamApi(apiSetting.kubernetes.getReadme, this.chartName, 'versions', this.catalog.version, 'README.md')).then(res => {
            if (res.status == 200) {
              this.README = res.data
            } else {
              noticeMessage(this, res, 'error');
            }
          })
        } else {
          noticeMessage(this, res, 'error');
        }
      })
    },
    deploy (){
      let params = {
        name : this.chartName,
        version : this.catalog.version,
        chartVersionList : this.chartVersionList
      }
      sessionStorage.removeItem('chartDeploy')
      sessionStorage.setItem('chartDeploy', JSON.stringify(params))
      this.$router.push({name : 'chartDeploy', params : params})
    },
    selectChart (catalog) {
      loading(this, 1000)
      this.catalog = {
        id: catalog.id,
        version: catalog.attributes.version,
        appVersion: catalog.attributes.app_version,
        desc: catalog.relationships.chart.data.description,
        icon: catalog.relationships.chart.data.icon,
        home: catalog.relationships.chart.data.home,
        sources: catalog.relationships.chart.data.sources,
        maintainers: catalog.relationships.chart.data.maintainers
      }
      sessionStorage.removeItem('catalogDetailsByParams')
      sessionStorage.setItem('catalogDetailsByParams', JSON.stringify(this.catalog))
      this.init()
    }
  }
};
</script>

<style scoped>

  .catalog-content{
    padding: 1em;
    height: calc(100vh - 160px);
  }

  .grid-content {
    border-radius: 4px;
    min-height: 5em;
    text-align: left;
  }

  .grid-img{
    text-align: center !important;
  }

  .image {
    margin-top: 25px;
  }

  .h1{
    margin: 0.625em 0 0.3125em;
  }

  .h5{
    font-weight: normal;
    color: #44add5;
    margin: 0.625em 0 0.3125em;
    font-size: 1.25em;
    max-width: 80%;
  }

  .deploy{
    margin: 10% 1% 0 0;
  }

  .el-aside {
    padding: 1em;
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
    padding: 0 1.625em;
    font-size: 1em;
    color: #1C2B39;
    line-height: 1.5;
    font-weight: 400;
    text-rendering: optimizeLegibility;
  }

  .margin-b-reset li {
    max-height: 20px;
  }

  .el-collapse-right{
  }

</style>

