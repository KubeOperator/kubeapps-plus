<template>
  <div style="height: calc(100vh - 160px);" class="main_page">
    <el-row>
      <el-col :span="4" :offset="2">
        <el-card :body-style="{ padding: '0px'}" style="text-align:left">
          <div class="catalog-image">
            <img v-show="catalog.icon" :src="catalog.icon" class="image" />
            <img v-show="!catalog.icon" src="../../assets/image/default.png" class="image" />
          </div>
          <div style="padding: 1em;">
            <h5 class="catalog-label" style="font-size: 18px;">{{catalog.releaseName}}</h5>
            <p class="catalog-label" style="font-size: 14px;">{{catalog.description}}</p>
            <el-divider></el-divider>
            <p class="label" style="font-size: 12px;">{{'App Version: ' + catalog.appv}}</p>
            <p class="label" style="font-size: 12px;">{{'App Version: ' + catalog.chartv}}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="14" :offset="2" style="text-align:left">
        <el-row>
          <el-col :span="3">
            <el-button
              :type="(this.status)?'success':'warning'"
            >{{(this.status)?'Ready':'Not Ready'}}</el-button>
          </el-col>
          <el-col :offset="14" :span="3">
            <el-button @click="getdebug">Upgrade</el-button>
          </el-col>
          <el-col :offset="1" :span="3">
            <el-button type="danger" @click="dialogVisible = true">Delete</el-button>
          </el-col>
        </el-row>
        <div v-show="this.AccessURLs!=''"></div>
        <div v-show="this.AccessURLs==''">
          <h6>Access URLs</h6>
          <p>The current application does not expose a public URL.</p>
        </div>
        <div v-show="this.note != undefined">
          <h6>Notes</h6>
          <section class="AppNotes Terminal elevation-1">
            <div class="Terminal__Top type-small">
              <div class="Terminal__Top__Buttons">
                <span class="Terminal__Top__Button Terminal__Top__Button--red"></span>
                <span class="Terminal__Top__Button Terminal__Top__Button--yellow"></span>
                <span class="Terminal__Top__Button Terminal__Top__Button--green"></span>
              </div>
            </div>
            <div class="Terminal__Tab">
              <pre class="Terminal__Code">
                <code>{{this.note}}
              </code>
            </pre>
            </div>
          </section>
        </div>
        <div v-show="this.secrets.length != 0">
          <h6>Secrets</h6>
          <el-table :data="secrets" stripe style="width: 100%">
            <el-table-column prop="name" label="NAME"></el-table-column>
            <el-table-column prop="type" label="TYPE"></el-table-column>
            <el-table-column label="CRT">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="open(secrets[scope.$index].crt)"
                  type="text"
                  size="small"
                >查看</el-button>
              </template>
            </el-table-column>
            <el-table-column label="KEY">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="open(secrets[scope.$index].key)"
                  type="text"
                  size="small"
                >查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-show="this.deployments.length != 0">
          <h6>Deployments</h6>
          <el-table :data="deployments" style="width: 100%">
            <el-table-column prop="name" label="NAME"></el-table-column>
            <el-table-column prop="desired" label="DESIRED"></el-table-column>
            <el-table-column prop="update" label="UP-TO-DATE"></el-table-column>
            <el-table-column prop="available" label="AVAILABLE"></el-table-column>
          </el-table>
        </div>
        <div v-show="this.serviceDetail.length != 0">
          <h6>Services</h6>
          <el-table :data="serviceDetail" style="width: 100%">
            <el-table-column prop="name" label="NAME"></el-table-column>
            <el-table-column prop="type" label="TYPE"></el-table-column>
            <el-table-column prop="cluster" label="CLUSTER-IP"></el-table-column>
            <el-table-column prop="external" label="EXTERNAL-IP"></el-table-column>
            <el-table-column prop="port" label="PORT(S)"></el-table-column>
          </el-table>
        </div>
        <div v-show="this.resources.length!=0">
          <h6>Other Resources</h6>
          <el-table :data="resources" style="width: 100%">
            <el-table-column prop="name" label="NAME"></el-table-column>
            <el-table-column prop="kind" label="KIND"></el-table-column>
          </el-table>
        </div>
        <div class="margin-t-normal">
          <h6>{{'Installation Values'}}</h6>
          <div class="ace-container">
            <!-- 官方文档中使用 id，这里禁止使用，在后期打包后容易出现问题，使用 ref 或者 DOM 就行 -->
            <div class="ace-editor" ref="ace"></div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <p>Are you sure you want to delete this?</p>
      <el-switch v-model="purge" active-text="Purge release"></el-switch>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ace from "ace-builds";
import "ace-builds/webpack-resolver"; // 在 webpack 环境中使用必须要导入
import "ace-builds/src-noconflict/theme-monokai"; // 默认设置的主题
import "ace-builds/src-noconflict/mode-javascript"; // 默认设置的语言模式
import apiSetting from "../utils/apiSetting.js";
import http from "../utils/httpAxios.js";
import jsyaml from "js-yaml";
// import { Base64 } from "js-base64";

export default {
  created: function() {
    this.url.url =
      apiSetting.kubernetes.getdetailone.url +
      this.$route.params.namespace +
      "/releases/" +
      this.$route.params.id;
  },
  mounted: function() {
    this.getResources();
  },
  methods: {
    getdebug() {
      console.log(this.deployments);
    },
    printdebug(data, log) {
      console.log(data, log);
    },
    handleClose(done) {
      this.$confirm("确认关闭？").then(_ => {
        done(_);
      });
    },
    getResources: async function() {
      await http(this.url).then(res => {
        let _this = this;
        this.valuesYaml = res.data.data.config.raw;
        this.catalog.description = res.data.data.chart.metadata.description;
        this.catalog.icon = res.data.data.chart.metadata.icon;
        this.catalog.appv = res.data.data.chart.metadata.appVersion;
        this.catalog.releaseName = res.data.data.chart.metadata.name;
        this.catalog.chartv = res.data.data.chart.metadata.version;
        this.note = res.data.data.info.status.notes;
        this.aceEditor = ace.edit(this.$refs.ace, {
          maxLines: 30, // 最大行数，超过会自动出现滚动条
          minLines: 10, // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
          fontSize: 14, // 编辑器内字体大小
          theme: this.themePath, // 默认设置的主题
          mode: this.modePath, // 默认设置的语言模式
          value: this.valuesYaml ? this.valuesYaml : "",
          tabSize: 4 // 制表符设置为 4 个空格大小
        });
        jsyaml.loadAll(res.data.data.manifest, function(doc) {
          console.log(doc);
          if (doc.kind == "Secret") {
            _this.secrets.push({
              name: doc.metadata.name,
              type: doc.type
              // key: Base64.decode(doc.data["tls.crt"]),
              // crt: Base64.decode(doc.data["tls.key"])
            });
          } else if (doc.kind != "Deployment") {
            _this.resources.push({ name: doc.metadata.name, kind: doc.kind });
          } else if (doc.kind == "Deployment") {
            _this.services.push({ name: doc.metadata.name, kind: doc.kind });
          }
        });
      });
      //Deployments
      for (let index = 0; index < this.services.length; index++) {
        var basicurl = {};
        basicurl.url =
          apiSetting.kubernetes.getdetailtwo.url +
          this.$route.params.namespace +
          "/deployments/" +
          this.services[index].name;
        basicurl.method = "get";
        http(basicurl).then(res => {
          if (res.status == 200) {
            res.data.status.availableReplicas > 0 && this.status
              ? (this.status = true)
              : (this.status = false);
            this.deployments.push({
              name: res.data.metadata["name"],
              desired: res.data.status.replicas ? res.data.status.replicas : 0,
              update: res.data.status.updatedReplicas
                ? res.data.status.updatedReplicas
                : 0,
              available: res.data.status.availableReplicas
                ? res.data.status.availableReplicas
                : 0
            });
          }
        });
      }
      //Services
      for (let index = 0; index < this.services.length; index++) {
        var _basicurl = {};
        _basicurl.url =
          apiSetting.kubernetes.getdetailtwo +
          this.$route.params.namespace +
          "/services/" +
          this.services[index].name;
        _basicurl.method = "get";
        http(_basicurl).then(res => {
          this.serviceDetail.push({
            name: res.data.metadata["name"],
            type: res.data.spec.type,
            cluster: res.data.spec.clusterIP,
            //TO_DO
            external: "NONE",
            port:
              res.data.spec.ports[0].port +
              "/" +
              res.data.spec.ports[0].protocol
          });
        });
      }
    },
    open(data) {
      this.$alert(data, "密钥", {
        confirmButtonText: "确定"
        // callback: action => {
        //   this.$message({
        //     type: "info",
        //     message: `action: ${action}`
        //   });
        // }
      });
    }
  },
  data() {
    return {
      url: {
        method: "get"
      },
      dialogVisible: false,
      services: [],
      serviceDetail: [],
      secrets: [],
      deployments: [],
      deploymentDetail: [],
      resources: [],
      installnation: {},
      AccessURLs: "",
      aceEditor: null,
      valuesYaml: "",
      note: "",
      status: "",
      catalog: {},
      purge: false,
      themePath: "ace/theme/monokai", // 不导入 webpack-resolver，该模块路径会报错
      modePath: "ace/mode/yaml" // 同上
    };
  }
};
</script>
<style scoped>
.main_page {
  margin-top: 25px;
}
.Terminal {
  background-color: #111a22;
  border-radius: 5px;
  padding: 0.625em 1.25em;
}
.type-small {
  font-size: 0.8em;
}
.Terminal__Top {
  height: 35px;
  display: flex;
  align-items: center;
}

.Terminal__Top__Title {
  flex: 1;
  text-align: center;
  color: darkgray;
}

.Terminal__Top__Button {
  border-radius: 15px;
  display: inline-block;
  height: 0.75em;
  margin-right: 0.3125em;
  width: 0.75em;
}

.Terminal__Top__Button--red {
  background: #dd751d;
}

.Terminal__Top__Button--yellow {
  background: #f9b479;
}

.Terminal__Top__Button--green {
  background: #008145;
}

.Terminal__Tab {
  padding-bottom: 0.625em;
}

.Terminal__Code {
  margin: 0;
  padding: 0;
  white-space: pre-line;
}

.Terminal__Code code {
  color: darkgray;
}

.Terminal__Code code.Terminal__Code__Command {
  color: #f1f1f1;
  display: inline-block;
  margin-top: 1.25em;
}

.Terminal__Code code.Terminal__Code__Command:first-child {
  margin-top: 0;
}

.Terminal__Code code.Terminal__Code__Command:before {
  content: "$";
  margin-right: 0.5em;
}
group::after,
.el-table::before {
  background-color: white !important;
}
.margin-t-normal {
  margin-bottom: 3em;
}
.catalog-image {
  display: flex;
  height: calc(72px + 2em);
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  text-align: center;
  background-color: #f1f1f1;
  box-sizing: border-box;
}
.image {
  max-width: 7em;
  max-height: 6em;
  display: block;
  margin: 1em;
}
.label {
}
</style>