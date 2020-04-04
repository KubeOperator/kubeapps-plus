<template>
    <div class="catalog-content" v-loading.fullscreen.lock="loading" element-loading-text="Loading..." element-loading-background="rgba(0, 0, 0, 0.1)">
        <!-- header start -->
        <el-row style="border-bottom: 2px solid #f1f1f1;">
            <!--            <div class="catalog-div">-->
            <!--                <el-button plain v-for="(label_, index) in labelList" :key="index" class="catalog-button" @click.native="onChangeLabel(label_.key)" :class="{ active: label_.isActive }">-->
            <!--                    {{label_.value}}-->
            <!--                </el-button>-->
            <!--            </div>-->
            <el-tabs class="catalog-div" v-model="activeName" type="card" @tab-click="onChangeLabel" style="margin: 0;">
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
                        <!-- <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" v-for="(catalog, index) in catalogList" -->
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" v-for="(catalog, index) in catalogList"
                    :key="index" class="el-col" v-show="(catalog.attributes.name.search(input)>=0)
                    && (label != 'All' ? (label != 'Other' ? (catalog.attributes.keywords[0].search(label) >=0 
                    ? true : catalog.attributes.keywords[0]= 'Other')
                    : catalog.attributes.keywords[0]!='AI'
                    && catalog.attributes.keywords[0]!='CI'
                    && catalog.attributes.keywords[0]!='CD'
                    && catalog.attributes.keywords[0]!='Management') : !!catalog.attributes.keywords[0])">
                <el-card :body-style="{ padding: '0px' }">
                    <div class="catalog-image" @click="goDetails(catalog)">
                        <a>
                            <img v-if="catalog.attributes.icon.search('http')>=0" :src="catalog.attributes.icon" class="image">
                            <img v-else :src="require(`@/assets/image/charts/${catalog.attributes.icon}`)" class="image">
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
                            <el-button size="medium" type="primary" class="button-right" v-for="(label_, index) in catalog.attributes.keywords" 
                                :key="index" v-show="(label=='All' || label_=='AI' || label_=='CI' || label_=='CD' || label_=='Management' || label=='Other') && index==0" round>
                                {{(label_=='AI'||label_=='CI'||label_=='CD'||label_=='Management')? label_ : '其它'}}
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
    export default {
        name: "catalog",
        data() {
            return {
                input: '',
                currentDate: new Date(),
                loading: true,
                catalogList: catalogList,
                label: label,
                activeName: 'All',
                lang: 'zh-CN',
                changeLang: '切换English',
            }
        },
        computed: {
            labelList() {
                let list = [
                {key: 'All', value: this.$t("message.all_app"), isActive: true},
                {key: 'AI', value: this.$t("message.ai"), isActive: false},
                {key: 'CI', value: this.$t("message.ci"), isActive: false},
                {key: 'CD', value: this.$t("message.cd"), isActive: false},
                {key: 'Management',value: this.$t("message.management_app"), isActive: false},
                {key: 'Other', value: this.$t("message.other_app"), isActive: false}
                ]
                return list

            }
        },
        created() {
            this.label = 'All'
            this.init()
        },
        methods: {
            init: async function () {
                await http(apiSetting.kubernetes.getCharts).then(res => {
                    if (res.status == 200) {
                        this.getList(res.data.data);
                        if ( res.data.data.length < 1){
                            this.chartMessage()
                        }
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
                for (let [index, chart] of Object.entries(data)) {
                    if(chart.attributes.icon){
                        await http(getParamApi(apiSetting.kubernetes.getImage, chart.attributes.icon)).then(res => {
                            if (res.status == 200) {
                                chart.attributes.icon = res.request.responseURL;
                                chart.attributes.icon = common.searchCatelogIcon(chart.attributes.name, chart.attributes.icon)
                                this.catalogList.sort().push(chart)
                            } else {
                                noticeMessage(this, res.data, 'error');
                            }
                        }).catch(msg => {
                            noticeMessage(this, msg, 'error');
                        })
                    }else {
                        chart.attributes.icon = common.searchCatelogIcon(chart.attributes.name)
                        this.catalogList.sort().push(chart)
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
                this.label = tab.name;
                console.log('this.label:',tab.name,'label-status',!this.label)
            },
            chartMessage() {
                this.$message({
                showClose: true,
                message: '提示：Kubeapps-plus 应用商店默认是没有应用的哦！需要你手动上传 chart 离线包或者配置使用你自己的 chart 仓库。配置参考链接: https://docs.kubeoperator.io/KubeOperator-v2.4/kubeapps-plus',
                type: 'warning'
            });
      },
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
        margin: 0px;
    }

    .catalog-div {
        float: left;
        width: 55%;
        margin: 0px;
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

<style>
    .el-tabs__item {
        width: 120px !important;
    }
    .el-tabs__nav-wrap {
        margin-top: 4px;
    }

</style>