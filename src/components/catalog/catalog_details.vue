<template>
  <div class="catalog-content">
    <!-- header start -->
    <el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple grid-img">
            <img v-show="catalog.icon" :src="catalog.icon | searchImage(catalog.icon)" class="image">
            <img v-show="!catalog.icon" src="../../.././static/catalog/default.png" class="image">
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
      <el-main>
        <vue-markdown class="article" :source="README"></vue-markdown>
      </el-main>

      <el-aside>
        <div class="el-collapse-right">
          <el-collapse v-model="activeNames">
            <el-collapse-item title="Chart Versions" name="1" active>
              <div v-for="(char, index) in chartVersionList" :key="index">
                <a @click="selectChart(char)">
                  {{char.attributes.version}} {{'-'}} {{char.attributes.created | UTC2GMT(char.attributes.created)}}
                </a>
              </div>
            </el-collapse-item>
            <el-collapse-item title="App Version" name="2" active>
              <div>{{catalog.appVersion}}</div>
            </el-collapse-item>
            <el-collapse-item title="Home" name="3" active>
              <div>
                <a @click="selectChart()">
                  {{'https://httpd.apache.org'}}
                </a>
              </div>
            </el-collapse-item>
            <el-collapse-item title="Maintainers" name="4" active>
              <div>
                <a @click="selectChart()">
                  {{'gsemet'}}
                </a>
              </div>
            </el-collapse-item>
            <el-collapse-item title="Related" name="5" class="is-active">
              <div>
                <a @click="selectChart()">
                  {{'https://github.com/bitnami/bitnami-docker-apache'}}
                </a>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-aside>

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
import errorMessage from '../utils/errorMessage.js';

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
      activeNames: ['1', '2', '3', '4', '5']
    }
  },
  mounted () {
  },
  created() {
    let chart = this.$route.params.catalog ? this.$route.params.catalog : JSON.parse(sessionStorage.getItem('catalogDetailsByParams'))
    this.catalog = {
      id: chart.id,
      icon: chart.attributes.icon,
      version: chart.relationships.latestChartVersion.data.version,
      appVersion: chart.relationships.latestChartVersion.data.app_version,
      desc: chart.attributes.description
    }
    loading(this, 1000)
    this.init()
  },
  methods:{
    init : async function() {
      await http(getParamApi(apiSetting.kubernetes.getCharts, this.catalog.id, 'versions')).then(res => {
        if (res.status == 200) {
          this.chartVersionList = res.data.data
          http(getParamApi(apiSetting.kubernetes.getReadme, this.catalog.id, 'versions', this.catalog.version, 'README.md')).then(res => {
            if (res.status == 200) {
              this.README = res.data
            } else {
              errorMessage(this, res);
            }
          })
        } else {
          errorMessage(this, res);
        }
      })
    },
    deploy (key){
      console.log(key)
    },
    selectChart (catalog) {
      loading(this, 1000)
      this.catalog = {
        id: catalog.id,
        version: catalog.attributes.version,
        appVersion: catalog.attributes.app_version,
        desc: catalog.relationships.chart.data.description,
        icon: catalog.relationships.chart.data.icon
      }
      this.init()
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

