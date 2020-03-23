<template>
    <div class="catalog-content" v-loading.fullscreen.lock="loading" element-loading-text="Loading" element-loading-background="rgba(0, 0, 0, 0.1)">
        <!-- header start -->
        <el-row style="border-bottom: 2px solid #f1f1f1;">
<!--            <div class="catalog-div">-->
<!--                <el-button plain v-for="(label_, index) in labelList" :key="index" class="catalog-button" @click.native="onChangeLabel(label_.key)" :class="{ active: label_.isActive }">-->
<!--                    {{label_.value}}-->
<!--                </el-button>-->
<!--            </div>-->
            <el-tabs class="catalog-div" type="card" @tab-click="onChangeLabel">
                <el-tab-pane v-for="label_ in labelList" :key="label_.key" class="catalog-button" :label="label_.value" :name="label_.key">
                </el-tab-pane>
            </el-tabs>
            <el-input class="catalog-search"
                      :placeholder="$t('message.search_charts')"
                      prefix-icon="el-icon-search"
                      v-model="input"
                      clearable>
            </el-input>
        </el-row>
        <!-- header end -->

        <!-- 间隔线 start -->
        <!-- 间隔线 end -->

        <!-- foot start -->
        <el-row :gutter="20" class="el-row-body">
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" v-for="(catalog, index) in catalogList"
                    :key="index" class="el-col" v-show="(catalog.attributes.name.search(input)>=0
              || catalog.attributes.description.search(input)>=0)
              && (label!='All'?(label!='Other'?catalog.attributes.keywords[0].search(label)>=0: true):true
                && label!='All'?(label!='Other'?catalog.attributes.keywords[1].search(label)>=0: true):true)">
                <el-card :body-style="{ padding: '0px' }">
                    <div class="catalog-image" @click="goDetails(catalog)">
                        <a>
                            <img v-if="!catalog.attributes.icon && catalog.attributes.name.search('gitlab')>=0" src="../../assets/image/charts/gitlab-stack-110x117.png" class="image">
                            <img v-else-if="!catalog.attributes.icon && !catalog.attributes.name.search(gitlab)>=0" src="../../assets/image/default.png" class="image">
                            <img v-else-if="(catalog.attributes.icon.search('harbor')>=0)" src="../../assets/image/charts/harbor-stack-110x117.png" class="image" require>
                            <img v-else-if="(catalog.attributes.icon.search('jenkins')>=0)" src="../../assets/image/charts/jenkins-stack-110x117.png" class="image" require>
                            <img v-else-if="(catalog.attributes.icon.search('sonarqube')>=0)" src="../../assets/image/charts/sonarqube-stack-110x117.png" class="image" require>
                            <img v-else-if="(catalog.attributes.icon.search('gitlab')>=0)" src="../../assets/image/charts/gitlab-stack-110x117.png" class="image" require>
                            <img v-else-if="(catalog.attributes.icon.search('istio')>=0)" src="../../assets/image/charts/istio-110x117.png" class="image" require>
                            <img v-else-if="(catalog.attributes.icon.search('tensorflow')>=0)" src="../../assets/image/charts/tensorflow-stack-110x117.png" class="image" require>
                            <img v-else-if="(catalog.attributes.icon.search('grafana')>=0)" src="../../assets/image/charts/grafana-stack-110x117.png" class="image" require>
                            <img v-else-if="(catalog.attributes.icon.search('kubeapps')>=0)" src="../../assets/image/charts/kubeapps-plus-stack-110x117.png" class="image" require>
                            <img v-else-if="(catalog.attributes.icon.search('loki')>=0)" src="../../assets/image/charts/loki-stack-110x117.png" class="image" require>
                            <img v-else-if="(catalog.attributes.icon.search('prometheus')>=0)" src="../../assets/image/charts/prometheus-stack-110x117.png" class="image" require>
                            <img v-else-if="(catalog.attributes.icon.search('argo')>=0)" src="../../assets/image/charts/argo-110x117.png" class="image" require>
                            <img v-else :src="catalog.attributes.icon" class="image" require>
                        </a>
                    </div>
                    <div style="padding: 1em;">
                        <h3 class="catalog-label">{{catalog.attributes.name}}</h3>
                        <h5 class="catalog-desc">{{catalog.attributes.description}}</h5>
                        <div class="bottom clearfix">
                            <el-button type="text" class="button-left" disabled>
                                <i class="iconfont">&#xe67b;</i>&nbsp;
                                {{catalog.relationships.latestChartVersion.data.app_version ?
                                catalog.relationships.latestChartVersion.data.app_version :
                                catalog.relationships.latestChartVersion.data.version}}
                            </el-button>
                            <el-button size="medium" type="primary" class="button-right" v-if="catalog.id.indexOf('stable') > -1
                                || catalog.id.indexOf('bitnami') > -1 || catalog.id.indexOf('svc-cat') > -1"
                                @click.native="$router.push('/repositories')" round>
                                {{catalog.id | splitName(catalog.id)}}
                            </el-button>
                            <el-button type="warning" class="button-right" v-else-if="catalog.id.indexOf('incubator') > -1"
                                       @click.native="$router.push('/repositories')" round>
                                {{catalog.id | splitName(catalog.id)}}
                            </el-button>
                            <el-button type="success" class="button-right" v-else
                                       @click.native="$router.push('/repositories')" round>
                                {{catalog.id | splitName(catalog.id)}}
                            </el-button>
                            <el-button size="medium" type="primary" class="button-right" v-for="(label, index) in catalog.attributes.keywords" :key="index" v-show="label=='AI' || label=='CI' || label=='CD' || label=='Management'" round>
                                {{label ? label : '其它'}}
                            </el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <!-- foot end -->
    </div>
</template>

<script>
    import apiSetting from "../utils/apiSetting.js";
    import http from "../utils/httpAxios.js";
    import common from '../common/common.js';
    import noticeMessage from "../utils/noticeMessage";
    import enerty from '../entity/entity.js';
    import getParamApi from "../utils/getParamApi";
    /* eslint-disable */
    let label = "";
    let catalogList = [];
    let labelList = [
        {key: 'All', value: '全部', isActive: true},
        {key: 'AI', value: 'AI', isActive: false},
        {key: 'CI', value: 'CI', isActive: false},
        {key: 'CD', value: 'CD', isActive: false},
        {key: 'Management', value: '管理', isActive: false},
        {key: 'Other', value: '其它', isActive: false}
        ];
    export default {
        name: "catalog",
        data() {
            return {
                input: '',
                currentDate: new Date(),
                loading: true,
                catalogList: catalogList,
                labelList: labelList,
                label: label
            }
        },
        created() {
            this.init()
        },
        methods: {
            init: async function () {
                await http(apiSetting.kubernetes.getCharts).then(res => {
                    if (res.status == 200) {
                        this.getList(res.data.data)
                    } else {
                        noticeMessage(this, res.data, 'error');
                    }
                }).catch(msg => {
                    noticeMessage(this, msg, 'error');
                })
                this.loading = false
            },
            getList: async function(data){
                this.catalogList = []
                for (let [index, chart] of data.entries()) {
                    if(chart.attributes.icon){
                        await http(getParamApi(apiSetting.kubernetes.getImage, chart.attributes.icon)).then(res => {
                            if (res.status == 200) {
                                chart.attributes.icon = res.request.responseURL;
                                if(!chart.attributes.icon){
                                    chart.attributes.icon = common.searchIcon(chart.attributes.name)
                                }
                                this.catalogList.sort().push(chart)
                            } else {
                                noticeMessage(this, res.data, 'error');
                            }
                        }).catch(msg => {
                            noticeMessage(this, msg, 'error');
                        })
                    }else {
                        if (common.searchIcon('argo')) {
                        chart.attributes.icon = common.searchIcon(chart.attributes.name.replace('-cd',''))
                        this.catalogList.sort().push(chart)
                        }else {
                        chart.attributes.icon = common.searchIcon(chart.attributes.name)
                        this.catalogList.sort().push(chart)
                        }
                    }
                }
            },
            goDetails(catalog) {
                let params = enerty.CatalogEnerty.getCatalog(catalog)
                sessionStorage.removeItem('catalogDetailsByParams')
                sessionStorage.removeItem('chartName')
                sessionStorage.setItem('chartName', catalog.id)
                sessionStorage.setItem('catalogDetailsByParams', JSON.stringify(params))
                this.$router.push({name: 'catalogDetails', params: params})
            },
            onChangeLabel(tab, event){
                console.log(tab)
                this.label = tab.name;
            }
        }
    };
</script>

<style scoped>

    .catalog-content {
        padding: 1em;
        height: calc(100vh - 120px);
    }

    .grid-content {
        border-radius: 4px;
        min-height: 5em;
    }

    .app-type {
        margin:0.27em
    }

    .catalog-search {
        float: right;
        width: 40%;
        margin: 0px;;
    }

    .catalog-div {
        float: left;
        width: 55%;
        margin: 0px;;
    }

    .catalog-button {
        float: left;
    }

    .bottom {
        line-height: 12px;
        text-align: left;
    }

    .button-left {
        padding: 5px 0 5px 5px;
        float: left;
        max-width: 60%;
        height: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .button-right {
        padding: 0 5px;
        float: right;
        min-height: 2em;
    }

    .image {
        max-width: 7em;
        max-height: 6em;
        display: block;
        margin: 1em;
        cursor: hand;
    }

    .el-col {
        padding: 10px 0;
    }

    .clearfix:before, .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
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

    .catalog-desc {
        height: 4.2em;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 0.7em;
        font-weight: normal;
    }

    .catalog-label {
        word-wrap: break-word;
        text-align: center;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        font-size: 1.1em;
        font-weight: 700;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .el-row-body {
        line-height: 1.15;
    }

</style>

