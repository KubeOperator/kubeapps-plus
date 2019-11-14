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
                  {{catalog.version}}&nbsp;{{'-'}}&nbsp;{{catalog.id | splitName(catalog.id)}}
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
        <div class="ChartViewSidebar__section">
          <h2>{{'Chart Versions'}}</h2>
          <div class="ChartVersionsList">
            <ul class="remove-style padding-l-reset margin-b-reset">
              <li style="height: 15px" v-for="(char, index) in chartVersionList" :key="index">
                <a @click="selectChart()">
                  {{char.attributes.version}} {{'-'}} {{char.attributes.created | UTC2GMT(char.attributes.created)}}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="ChartViewSidebar__section">
          <h2>{{'App Version'}}</h2>
          <div class="ChartVersionsList">
            {{catalog.version}}
          </div>
        </div>
        <div class="ChartViewSidebar__section">
          <h2>{{'Home'}}</h2>
          <div class="ChartVersionsList">
            <ul class="remove-style padding-l-reset margin-b-reset">
              <li style="height: 15px">
                <a @click="selectChart()">
                  {{'https://httpd.apache.org'}}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="ChartViewSidebar__section">
          <h2>{{'Maintainers'}}</h2>
          <div class="ChartVersionsList">
            <ul class="remove-style padding-l-reset margin-b-reset">
              <li style="height: 15px">
                <a @click="selectChart()">
                  {{catalog.id | splitName(catalog.id)}}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="ChartViewSidebar__section">
          <h2>{{'Related'}}</h2>
          <div class="ChartVersionsList">
            <ul class="remove-style padding-l-reset margin-b-reset">
              <li style="height: 15px">
                <a @click="selectChart()">
                  {{'https://github.com/bitnami/bitnami-docker-apache'}}
                </a>
              </li>
            </ul>
          </div>
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
      id: '',
      versionNew: '',
      chartVersionList: []
    }
  },
  mounted () {
    // let converter = new showdown.Converter()
    // let text = this.README.toString()
    // this.html = converter.makeHtml(text)
  },
  created() {
    this.catalog = this.$route.params
    this.id = this.$route.params.id
    console.log(this.id)
    loading(this, 1000)
    this.init()
  },
  methods:{
    init : async function() {
      await http(getParamApi(apiSetting.kubernetes.getCharts, this.id, 'versions')).then(res => {
        if (res.status == 200) {
          console.log(res.data.data)
          this.chartVersionList = res.data.data
          this.versionNew = res.data.data[0].attributes.version
          http(getParamApi(apiSetting.kubernetes.getReadme, this.id, 'versions', this.versionNew, 'README.md')).then(res => {
            if (res.status == 200) {
              this.README = res.data
            } else {
              //Error Message
              errorMessage(this, res);
            }
          })
        } else {
          //Error Message
          errorMessage(this, res);
        }
      })
    },
    deploy (key){
      console.log(key)
    },
    selectChart () {
      console.log('111')
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
    padding: 0 1.625em;
    font-size: 1em;
    color: #1C2B39;
    line-height: 1.5;
    font-weight: 400;
    text-rendering: optimizeLegibility;
  }
  .ChartViewSidebar__section{
    padding-top: .1px;
    overflow-wrap: break-word;
    max-height: 150px;
  }
  .padding-l-reset {
    padding-left: 0;
  }
  .remove-style {
    list-style: none;
  }
  .margin-b-reset {
    margin-bottom: 0;
  }
  .margin-b-reset li {
    max-height: 20px;
  }
  .ChartVersionsList_li {
    max-height: 20px;
  }
</style>

