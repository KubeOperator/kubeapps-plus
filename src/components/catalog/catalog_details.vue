<template>
  <div class="catalog-content">
    <el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img v-show="catalog.attributes.icon" :src="catalog.attributes.icon | searchImage(catalog.attributes.icon)" class="image">
            <img v-show="!catalog.attributes.icon" src="../../.././static/catalog/default.png" class="image">
          </div>
        </el-col>
        <el-col :span="20"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
<!--      <el-col :span="24">-->
<!--        <div class="grid-content">-->
<!--          <h1 style="float: left">{{$t('message.catalog')}}</h1>-->
<!--          <el-input class="catalog-search"-->
<!--                  :placeholder="$t('message.search_charts')"-->
<!--                  prefix-icon="el-icon-search"-->
<!--                  v-model="input"-->
<!--                  clearable>-->
<!--          </el-input>-->
<!--          <el-button-->
<!--                  size="medium" icon="el-icon-sold-out" class="catalog-search-btn"-->
<!--                  @click="handleSelect(input)">{{$t('message.search')}}</el-button>-->
<!--        </div>-->
<!--      </el-col>-->
    </el-row>

    <el-divider></el-divider>

  </div>
</template>

<script>
import loading from '../utils/loading.js';
// import apiSetting from "../utils/apiSetting.js";
// import http from "../utils/httpAxios.js";
// import getParamApi from "../utils/getParamApi";
// import errorMessage from '../utils/errorMessage.js';

export default {
  data(){
    return {
      catalog: {}
    }
  },
  created() {
    alert(111)
    console.log(this.$route)
    loading(this, 2000)
    this.init()

  },
  methods:{
    init : async () => {
      // await http(getParamApi(apiSetting.kubernetes.getCharts, this.$route.params.id, 'versions')).then(res => {
      //   if (res.status == 200) {
      //     this.catalog = res.data.data
      //   } else {
      //     //Error Message
      //     errorMessage(this, res);
      //   }
      // })

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
</style>

