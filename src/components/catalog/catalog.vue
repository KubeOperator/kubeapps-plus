<template>
    <div class="catalog-content">
        <!-- header start -->
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
                    <!--          <el-button size="medium" icon="el-icon-search" class="catalog-search-btn" @click="handleSelect(input)">-->
                    <!--            {{$t('message.search')}}-->
                    <!--          </el-button>-->
                </div>
            </el-col>
        </el-row>
        <!-- header end -->

        <!-- 间隔线 start -->
        <el-divider></el-divider>
        <!-- 间隔线 end -->

        <!-- foot start -->
        <el-row :gutter="20" class="el-row-body">
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" v-for="(catalog, index) in catalogList"
                    :key="index" class="el-col" v-show="(catalog.attributes.name.search(input)>=0
              || catalog.attributes.description.search(input)>=0)">
                <el-card :body-style="{ padding: '0px' }">
                    <div class="catalog-image" @click="goDetails(catalog)">
                        <a><img v-show="catalog.attributes.icon" :src="catalog.attributes.icon " class="image" require></a>
                        <a><img v-show="!catalog.attributes.icon" src="../../assets/image/default.png"
                                class="image"></a>
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
                            <el-button size="medium" type="primary" class="button-right" v-show="catalog.id.indexOf('stable') > -1
                                || catalog.id.indexOf('bitnami') > -1 || catalog.id.indexOf('svc-cat') > -1" round>
                                {{catalog.id | splitName(catalog.id)}}
                            </el-button>
                            <el-button type="warning" class="button-right" v-show="catalog.id.indexOf('incubator') > -1"
                                       round>
                                {{catalog.id | splitName(catalog.id)}}
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
    import loading from '../utils/loading.js';
    import noticeMessage from "../utils/noticeMessage";
    import enerty from '../entity/entity.js';
    import getParamApi from "../utils/getParamApi";

    let catalogList = []
    export default {
        name: "catalog",
        data() {
            return {
                input: '',
                currentDate: new Date(),
                catalogList: catalogList
            }
        },
        created() {
            loading(this, 1500)
            this.init()
        },
        methods: {
            init: async function () {
                await http(apiSetting.kubernetes.getCharts).then(res => {
                    if (res.status == 200) {
                        for (let chart of res.data.data) {
                            if (
                                   chart.attributes.name =='apache'
                                || chart.attributes.name =='docker'
                                || chart.attributes.name =='drupal'
                                || chart.attributes.name =='elasticsearch'
                                || chart.attributes.name =='etcd'
                                || chart.attributes.name =='harbor'
                                || chart.attributes.name =='jenkins'
                                || chart.attributes.name =='kafka'
                                || chart.attributes.name =='mysql'
                                || chart.attributes.name =='mongodb'
                                || chart.attributes.name =='nginx'
                                || chart.attributes.name =='rabbitmq'
                                || chart.attributes.name =='redis'
                                || chart.attributes.name =='tomcat'
                                || chart.attributes.name =='wordpress'
                                || chart.attributes.name =='zookeeper'
                                || chart.attributes.name =='gitlab') {
                                console.log('688688： ', chart.attributes.icon)
                                if(chart.attributes.icon){
                                    http(getParamApi(apiSetting.kubernetes.getImage, chart.attributes.icon)).then(res => {
                                        if (res.status == 200) {
                                            chart.attributes.icon =  res.request.responseURL;
                                            this.catalogList.sort().push(chart)
                                            console.error('???', this.catalogList)
                                        } else {
                                            noticeMessage(this, res.data, 'error');
                                        }
                                    }, msg => {
                                        noticeMessage(this, msg, 'error');
                                    })
                                }else {
                                    this.catalogList.sort().push(chart)
                                    console.error('666', this.catalogList)
                                }
                            }
                        }
                    } else {
                        //Error Message
                        noticeMessage(this, res.data, 'error');
                    }
                }, msg => {
                    noticeMessage(this, msg, 'error');
                })
            },
            handleSelect: async function (key) {
                await this.init()
                this.catalogList = common.search(key, this.catalogList)
            },
            goDetails(catalog) {
                let params = enerty.CatalogEnerty.getCatalog(catalog)
                console.log('params',params)
                sessionStorage.removeItem('catalogDetailsByParams')
                sessionStorage.removeItem('chartName')
                sessionStorage.setItem('chartName', catalog.id)
                sessionStorage.setItem('catalogDetailsByParams', JSON.stringify(params))
                this.$router.push({name: 'catalogDetails', params: params})
            }
        }
    };
</script>

<style scoped>

    .catalog-content {
        padding: 1em;
        height: calc(100vh - 160px);
    }

    .grid-content {
        border-radius: 4px;
        min-height: 5em;
    }

    .catalog-search {
        float: left;
        width: 40%;
        margin: 30px 0 0 1em;
    }

    .catalog-search-btn {
        float: left;
        width: 16%;
        margin: 35px 0 0 1em;
        padding: 11.5px 20px;
        height: 38px;
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
        height: 2.4em;
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

