<template>
    <div class="catalog-content" v-loading.fullscreen.lock="loading" element-loading-text="Loading" element-loading-background="rgba(0, 0, 0, 0.1)">
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
                        <label>{{$t('message.name')}}</label>
                        <el-input style="width: 100%;"
                                  pattern="[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*"
                                  v-model="releaseName" placeholder="请输入内容" required></el-input>
                    </div>

                    <div>
                        <label>{{$t('message.version')}}</label>
                        <el-select style="width: 100%;" v-model="version" @change="onChange(version)" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </div>

                    <div class="margin-t-normal">
                        <label>{{$t('message.values_yaml')}}</label>
                        <div class="ace-container">
                            <!-- 官方文档中使用 id, 这里禁止使用, 在后期打包后容易出现问题, 使用 ref 或者 DOM 就行 -->
                            <div class="ace-editor" ref="ace">
                            </div>
                        </div>

                    </div>

                    <div>
                        <el-button class="ace-xcode-btn" type="success" size="medium" icon="el-icon-success"
                                   @click="submit(releaseName, version, chartName)">{{$t('message.submit')}}
                        </el-button>
                        <el-button class="ace-xcode-btn" type="primary" size="medium" icon="el-icon-upload2"
                                   @click="restoreChartDefaults()">{{$t('message.restore_chart_defaults')}}
                        </el-button>
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
    // import loading from '../utils/loading.js';
    import noticeMessage from "../utils/noticeMessage";
    /* eslint-disable */
    export default {
        data() {
            return {
                options: [],
                version: '',
                chartName: '',
                releaseName: '',
                loading: true,
                aceEditor: null,
                themePath: 'ace/theme/monokai', // 不导入 webpack-resolver, 该模块路径会报错
                modePath: 'ace/mode/yaml' // 同上
            }
        },
        beforeMount() {
        },
        mounted() {
            this.aceEditor = ace.edit(this.$refs.ace, {
                maxLines: 30, // 最大行数, 超过会自动出现滚动条
                minLines: 10, // 最小行数, 还未到最大行数时, 编辑器会自动伸缩大小
                fontSize: 14, // 编辑器内字体大小
                theme: this.themePath, // 默认设置的主题
                mode: this.modePath, // 默认设置的语言模式
                value: '',
                tabSize: 4 // 制表符设置为 4 个空格大小
            })
        },
        created: async function () {
            let chart = this.$route.params.params ? this.$route.params.params : JSON.parse(sessionStorage.getItem('chartDeploy'))
            this.chartName = chart.name
            this.version = chart.version
            this.getOptions(chart)
            this.releaseName = this.chartName.split('/')[1] + '-' + this.randomWord(false, 6, 10)
            this.init()
        },
        methods: {
            init: async function () {
                await http(getParamApi(apiSetting.kubernetes.getYaml, this.chartName, 'versions', this.version, 'values.yaml')).then(res => {
                    if (res.status == 200) {
                        this.aceEditor.setValue(res.data)
                    } else {
                        noticeMessage(this, res, 'error');
                    }
                }).catch(msg => {
                    noticeMessage(this, msg.data, 'error');
                })
                this.loading = false
            },
            /*
            ** randomWord 产生任意长度随机字母数字组合
            ** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
            */
            randomWord(randomFlag, min, max) {
                let str = "",
                    range = min,
                    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

                // 随机产生
                if (randomFlag) {
                    range = Math.round(Math.random() * (max - min)) + min;
                }
                for (let i = 0; i < range; i++) {
                    let pos = Math.round(Math.random() * (arr.length - 1));
                    str += arr[pos];
                }
                return str.toLowerCase();
            },
            getOptions(chart) {
                for (let o of chart.chartVersionList) {
                    let option = {}
                    option.value = o.attributes.version
                    option.label = o.attributes.version
                    this.options.push(option)
                }
            },
            onChange() {
                this.init()

            },
            submit: async function(releaseName, version, chartName) {
                if (!releaseName) {
                    noticeMessage(this, ' 名称不允许为空, 请填写名称 ', 'warning')
                } else if (!version) {
                    noticeMessage(this, ' 版本不允许为空, 请填写版本 ', 'warning')
                } else if (!this.aceEditor.getValue()) {
                    noticeMessage(this, ' 值(YAML)不允许为空, 请填写值(YAML) ', 'warning')
                } else {
                    await this.$confirm('即将开始部署, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        noticeMessage(this, ' 正在部署, 请稍等 ', 'success')
                        this.loading = true
                        this.deploy(releaseName, version, chartName)
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消部署'
                        });
                    });
                }
            },
            timeout: async function(ms) {
                await new Promise((resolve) => {
                    setTimeout(resolve, ms);
                })
            },
            deploy: async function(releaseName, version, chartName){
                let params = {
                    appRepositoryResourceName: chartName.split('/')[0],
                    chartName: chartName.split('/')[1],
                    releaseName: releaseName,
                    values: this.aceEditor.getValue(),
                    version: version
                }
                await http(getParamApi(apiSetting.kubernetes.deployReleases, this.$store.state.namespaces.activeSpace, 'releases'), params).then((res) => {
                    this.timeout(14000);
                    if (res.status == 200) {
                        noticeMessage(this, releaseName + ' 部署成功! ', 'success')
                        this.$router.push('/apps/ns/' + this.$store.state.namespaces.activeSpace + '/' + releaseName)
                    } else {
                        noticeMessage(this, releaseName + ' 部署失败: ' + res, 'error')
                    }
                }).catch(msg => {
                    noticeMessage(this, releaseName + ' 请求失败: ' + msg.data, 'error')
                })
                this.loading = false
            },
            restoreChartDefaults(){
                this.init()
            }
        }
    }
</script>

<style scoped>

    .catalog-content {
        padding: 1em;
        height: calc(100vh - 160px);
    }

    .foot-gril {
        padding: 1em;
        text-align: left;
    }

    .ace-xcode-btn {
        margin: 2em 2em 0 0;
        width: 31%;
    }

</style>

