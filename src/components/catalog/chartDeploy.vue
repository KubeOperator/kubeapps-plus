<template>
  <div class="catalog-content">
      <!-- header start -->
      <el-row>
          <el-col :span="24">
              <div class="grid-content">
                  <h1 style="float: left">{{chartName}}</h1>
              </div>
          </el-col>
      </el-row>
      <!-- header end -->

      <!-- 间隔线 start -->
      <el-divider></el-divider>
      <!-- 间隔线 end -->

      <!-- foot start -->
      <el-container>
        <el-main>
      <div class="foot-gril margin-t-normal">
          <div>
            <label>{{'Name'}}</label>
            <el-input style="width: 100%;" pattern="[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*" v-model="name" placeholder="请输入内容"></el-input>
          </div>
          <div>
              <label>{{'Version'}}</label>
              <el-select style="width: 100%;" v-model="version" placeholder="请选择">
              <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
          </el-select>
          </div>
          <div class="margin-t-normal">
              <label>{{'Values (YAML)'}}</label>
              <div class="ace-container">
                  <!-- 官方文档中使用 id，这里禁止使用，在后期打包后容易出现问题，使用 ref 或者 DOM 就行 -->
                  <div class="ace-editor" ref="ace">
                  </div>
              </div>
          </div>
          <div>
              <el-button class="ace-xcode-btn" type="primary" size="medium" icon="el-icon-success" @click="submit(name, version, chartName)">{{$t('message.submit')}}</el-button>
          </div>
      </div>
      </el-main>
        <el-aside></el-aside>
      </el-container>
      <!-- foot end -->
  </div>
</template>

<script>
    import ace from 'ace-builds'
    import 'ace-builds/webpack-resolver' // 在 webpack 环境中使用必须要导入
    import 'ace-builds/src-noconflict/theme-monokai' // 默认设置的主题
    import 'ace-builds/src-noconflict/mode-javascript' // 默认设置的语言模式
    import apiSetting from "../utils/apiSetting.js";
    import http from "../utils/httpAxios.js";
    import getParamApi from "../utils/getParamApi";
    import errorMessage from '../utils/errorMessage.js';
    import loading from '../utils/loading.js';
    import noticeMessage from "../utils/noticeMessage";

    export default {
        data() {
            return {
                options: [],
                version: '',
                chartName: '',
                valuesYaml: '',
                name: '',
                aceEditor: null,
                themePath: 'ace/theme/monokai', // 不导入 webpack-resolver，该模块路径会报错
                modePath: 'ace/mode/yaml' // 同上
            }
        },
        beforeMount () {
        },
        mounted () {
        },
        created : async function(){
            let chart = this.$route.params.params ? this.$route.params.params : JSON.parse(sessionStorage.getItem('chartDeploy'))
            console.log('chart', chart)
            this.chartName = chart.name
            this.version = chart.chartVersionList[0].attributes.version
            loading(this, 1000)
            this.getOptions(chart)
            this.init()
        },
        methods:{
            init : async function() {
                await http(getParamApi(apiSetting.kubernetes.getYaml, this.chartName, 'versions', this.version, 'values.yaml')).then(res => {
                    if (res.status == 200) {
                        console.log(res.data)
                        this.valuesYaml = res.data
                        this.aceEditor = ace.edit(this.$refs.ace, {
                            maxLines: 30, // 最大行数，超过会自动出现滚动条
                            minLines: 10, // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
                            fontSize: 14, // 编辑器内字体大小
                            theme: this.themePath, // 默认设置的主题
                            mode: this.modePath, // 默认设置的语言模式
                            value: this.valuesYaml ? this.valuesYaml : '',
                            tabSize: 4 // 制表符设置为 4 个空格大小
                        })
                    } else {
                        errorMessage(this, res);
                    }
                })
            },
            getOptions (chart) {
                for (let o of chart.chartVersionList){
                    let option = {}
                    console.log(o.attributes.version)
                    option.value = o.attributes.version
                    option.label = o.attributes.version
                    this.options.push(option)
                }
            },
            submit(name, version, chartName) {
                console.log(name, version, this.aceEditor.getValue(), this.$store.state.namespaces.activeSpace)
                let params = {
                    appRepositoryResourceName : chartName.split('/')[0],
                    chartName : chartName.split('/')[1],
                    releaseName : name,
                    values : this.aceEditor.getValue(),
                    version : version
                }
                http(getParamApi(apiSetting.kubernetes.deployReleases, this.$store.state.namespaces.activeSpace, 'releases'), params).then(res => {
                    if (res.status == 200) {
                        noticeMessage(this, name + ' 部署成功 ', 'success')
                        this.$router.push('catalog')
                    } else {
                        noticeMessage(this, res.data, 'error');
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .catalog-content{
        padding: 1em;
    }
    .foot-gril{
        padding: 1em;
        text-align: left;
    }
    .ace-xcode-btn{
        margin: 2em 0 0 0;
        width: 20%;
    }
</style>

