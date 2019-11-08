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
          <el-button
                  size="medium" icon="el-icon-search" class="catalog-search-btn"
                  @click="handleSelect(input)">{{$t('message.search')}}</el-button>
        </div>
      </el-col>
    </el-row>
    <el-dsearchivider></el-dsearchivider>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" v-for="(catalog, index) in catalogList" :key="index" class="el-col">
        <el-card :body-style="{ padding: '0px' }">
          <div class="catalog-image">
            <img v-show="catalog.attributes.icon" :src="catalog.attributes.icon | searchImage(catalog.attributes.icon)" class="image">
            <img v-show="!catalog.attributes.icon" src="../../.././static/catalog/default.png" class="image">
          </div>
          <div style="padding: 1em;">
            <h3 class="catalog-label">{{catalog.attributes.name}}</h3>
            <h5 class="catalog-desc">{{catalog.attributes.description}}</h5>
            <div class="bottom clearfix">
              <el-button type="text" class="button-left" disabled>
                <i class="iconfont">&#xe67b;</i>&nbsp;
                {{catalog.relationships.latestChartVersion.data.app_version ? catalog.relationships.latestChartVersion.data.app_version : catalog.relationships.latestChartVersion.data.version}}
              </el-button>
              <el-button size="medium" type="primary" class="button-right" v-show="catalog.id.indexOf('stable') > -1
              || catalog.id.indexOf('bitnami') > -1 || catalog.id.indexOf('svc-cat') > -1" round>
                  {{catalog.id | splitName(catalog.id)}}
              </el-button>
              <el-button type="warning" class="button-right" v-show="catalog.id.indexOf('incubator') > -1" round>
                  {{catalog.id | splitName(catalog.id)}}
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import apiSetting from "../utils/apiSetting.js";
import http from "../utils/httpAxios.js";
import errorMessage from '../utils/errorMessage.js';
import common from '../common/common.js';

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
    init : async function (){
        await http(apiSetting.kubernetes.getCharts).then(res => {
            if (res.status == 200) {
                this.catalogList = res.data.data
            } else {
                //Error Message
                this.loading = false;
                errorMessage(this, res);
            }
        })

    },
    handleSelect : async function (key) {
        await this.init()
        this.catalogList = common.search(key, this.catalogList)
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
  .catalog-search-btn{
    float: left;
    width: 16%;
    margin: 20px 0 0 1em;
    padding: 11.5px 20px;
  }
  .bottom {
    line-height: 12px;
    text-align: left;
  }

  .button-left {
    padding: 5px 0 5px 5px;
    float: left;
    max-width: 70%;
    height: 24px;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
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
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
</style>

