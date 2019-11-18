<template>
  <div style="height: calc(100vh - 160px);" class="main_page">
    <el-row>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-row>
          <el-col :offset="2" :span="4">
            <div class>
              <el-button type="primary" @click="this.getdebug">主要按钮</el-button>
            </div>
          </el-col>
          <el-col :offset="12" :span="4">
            <div class>
              <el-button type="success">成功按钮</el-button>
            </div>
          </el-col>
        </el-row>
        <div v-show="this.AccessURLs!=''"></div>
        <div v-show="this.AccessURLs==''">
          <h6>Access URLs</h6>
          <p>The current application does not expose a public URL.</p>
        </div>
        <div v-show="this.secrets !=[]">
          <h6>Secrets</h6>
          <el-table :data="secrets" stripe style="width: 80%">
            <el-table-column prop="name" label="NAME" width="180"></el-table-column>
            <el-table-column prop="type" label="TYPE" width="180"></el-table-column>
            <el-table-column prop="crt" label="CRT"></el-table-column>
            <el-table-column prop="key" label="KEY"></el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import http from "../utils/httpAxios.js";
import jsyaml from "js-yaml";
// import { Base64 } from 'js-base64';

export default {
  created: function() {
    this.url.url =
      "/rpc/api/tiller-deploy/v1/namespaces/" +
      this.$route.params.namespace +
      "/releases/" +
      this.$route.params.id;
    console.log(this.url);
  },
  mounted: function() {
    this.getResources();
  },
  methods: {
    getdebug() {
      // console.log(this.services)
      // console.log(this.serviceDetail)
      console.log(this.secrets);
    },
    getResources: async function() {
      await http(this.url).then(res => {
        let _this = this;
        jsyaml.loadAll(res.data.data.manifest, function(doc) {
          if (doc.kind == "Secret") {
            _this.secrets.push({ name: doc.metadata.name,type:doc.type,key: doc.data[0],crt: doc.data[1] });
            console.log()
          } else if (doc.kind == "Service") {
            _this.services.push({ name: doc.metadata.name, kind: doc.kind });
          } else {
            _this.resources.push({ name: doc.metadata.name, kind: doc.kind });
          }
        });
      });
      //Deployments
      for (let index = 0; index < this.services.length; index++) {
        var basicurl = {};
        basicurl.url =
          "/rpc/api/kube/apis/apps/v1/namespaces/" +
          this.$route.params.namespace +
          "/deployments/" +
          this.services[index].name;
        basicurl.method = "get";
        http(basicurl).then(res => {
          console.log(res);
        });
      }
      //Services
      for (let index = 0; index < this.services.length; index++) {
        var _basicurl = {};
        _basicurl.url =
          "/rpc/api/kube/api/v1/namespaces/" +
          this.$route.params.namespace +
          "/services/" +
          this.services[index].name;
        _basicurl.method = "get";
        http(_basicurl).then(res => {
          console.log(res);
        });
      }
    }
  },
  data() {
    return {
      url: {
        method: "get"
      },
      services: [],
      serviceDetail: [],
      secrets: [],
      deployments: [],
      deploymentDetail: [],
      resources: [],
      installnation: {},
      AccessURLs: ""
    };
  }
};
</script>
<style scoped>
.main_page {
  margin-top: 25px;
}
</style>