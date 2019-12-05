<template>
    <div class="app-repositories-content" v-loading.fullscreen.lock="loading" element-loading-text="Loading" element-loading-background="rgba(0, 0, 0, 0.1)">
        <el-row>
            <el-col :span="24">
                <div class="grid-content">
                    <h1 style="float: left">{{$t('message.app_repositories')}}</h1>
                </div>
            </el-col>
        </el-row>

        <el-divider></el-divider>

        <el-table
                :data="tableData"
                stripe
                style="width: 100%">
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="metadata.name"
                    :label="$t('message.repo')"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="spec.url"
                    :label="$t('message.url')">
            </el-table-column>
            <el-table-column :label="$t('message.actions')">
                <template slot-scope="scope">
                    <el-button
                            size="medium" icon="el-icon-refresh"
                            @click="refresh(scope.$index, scope.row.metadata.name)">{{$t('message.refresh')}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button class="gred-btn" type="primary" icon="el-icon-refresh" @click="refreshAll()">
            {{$t('message.refresh_all')}}
        </el-button>
    </div>
</template>

<script>
    import apiSetting from "../utils/apiSetting.js";
    import http from "../utils/httpAxios.js";
    import errorMessage from '../utils/errorMessage.js';
    import getParamApi from "../utils/getParamApi";
    import loading from '../utils/loading.js';
    import noticeMessage from '../utils/noticeMessage.js';

    export default {
        data() {
            return {
                loading: true,
                tableData: []
            }
        },
        created() {
            loading(this, 1000)
            this.init()
        },
        methods: {
            init: async function () {
                await http(apiSetting.kubernetes.getAppRepositories).then(res => {
                    if (res.status == 200) {
                        console.log(res)
                        this.tableData = res.data.items
                    } else {
                        //Error Message
                        this.loading = false;
                        errorMessage(this, res);
                    }
                })
                this.loading = false
            },
            refresh: async function(index, name) {
                this.loading = true
                await http(getParamApi(apiSetting.kubernetes.getAppRepositories, name)).then(res => {
                    if (res.status == 200) {
                        delete this.tableData[index]
                        let repo = res.data
                        this.tableData.push(repo)
                    } else {
                        //Error Message
                        this.loading = false;
                        errorMessage(this, res);
                    }
                }).catch(msg => {
                    noticeMessage(this, msg.data, 'error');
                })
                this.loading = false
            },
            refreshAll() {
                for (let [i, v] of this.tableData) {
                    this.refresh(i, v.metadata.name)
                }
            }
        }
    }
</script>

<style scoped>
    .app-repositories-content {
        padding: 1em;
        height: calc(100vh - 160px);
    }

    .grid-content {
        border-radius: 4px;
        min-height: 5em;
    }

    .gred-btn {
        margin: 2em;
        float: left;
    }
</style>
