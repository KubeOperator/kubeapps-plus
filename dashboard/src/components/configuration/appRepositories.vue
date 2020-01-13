<template>
    <div class="app-repositories-content" v-loading.fullscreen.lock="loading" element-loading-text="Loading" element-loading-background="rgba(0, 0, 0, 0.1)">
        <!-- header start -->
        <el-row style="border-bottom: 2px solid #f1f1f1;">
            <el-col :md="6" :lg="4">
                <div class="grid-content">
                    <h2 class="app-type">{{$t('message.app_repositories')}}</h2>
                </div>
            </el-col>
        </el-row>
        <!-- header end -->

        <!-- 间隔线 start -->
<!--        <el-divider></el-divider>-->
        <!-- 间隔线 end -->

        <!-- foot start -->
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
                            size="medium" icon="el-icon-remove-outline"
                            @click="deleteSubmit(scope.row)">{{$t('message.delete')}}
                    </el-button>
                    <el-button
                            size="medium" icon="el-icon-refresh"
                            @click="refresh()">{{$t('message.refresh')}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button class="gred-btn" type="success" icon="el-icon-circle-plus-outline" @click="addAppRepository()">
            {{$t('message.add_app_repository')}}
        </el-button>
        <el-button class="gred-btn" type="primary" icon="el-icon-refresh" @click="refreshAll()">
            {{$t('message.refresh_all')}}
        </el-button>
        <!-- foot end -->
    </div>
</template>

<script>
    import apiSetting from "../utils/apiSetting.js";
    import http from "../utils/httpAxios.js";
    import errorMessage from '../utils/errorMessage.js';
    import getParamApi from "../utils/getParamApi";
    import noticeMessage from "../utils/noticeMessage";

    /* eslint-disable */
    export default {
        data() {
            return {
                loading: true,
                tableData: []
            }
        },
        created() {
            this.init()
        },
        methods: {
            init: async function () {
                await http(getParamApi(apiSetting.kubernetes.getAppRepositories, sessionStorage.getItem('nameSpace'), 'apprepositories')).then(res => {
                    if (res.status == 200) {
                        this.tableData = res.data.items
                    } else {
                        this.loading = false;
                        errorMessage(this, res);
                    }
                })
                this.loading = false
            },
            refresh: async function() {
                this.loading = true
                await this.init()
            },
            refreshAll: async function() {
                this.loading = true
                await this.init()
            },
            addAppRepository (){
                let params = this.tableData
                sessionStorage.setItem('repositories', JSON.stringify(params))
                this.$router.push({name: 'addRepositories', params: params})
            },
            deleteSubmit: async function(row){
                await this.$confirm('是否确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    noticeMessage(this, ' 正在删除, 请稍等 ', 'success')
                    this.loading = true
                    this.deleteRepo(row)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            deleteRepo: async function(row){
                let name = row.metadata.name
                let namespace = row.metadata.namespace
                await http(getParamApi(apiSetting.kubernetes.delAppRepositorie, namespace, 'apprepositories', name), {}).then((res) => {
                    if (res.status == 200) {
                        noticeMessage(this, name + ' 删除成功! ', 'success')
                        this.refreshAll()
                    } else {
                        noticeMessage(this, name + ' 删除失败: ' + res, 'error')
                    }
                }).catch(msg => {
                    noticeMessage(this, name + ' 请求失败: ' + msg.data, 'error')
                })
                this.loading = false
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
    }

    .gred-btn {
        margin: 2em;
        float: left;
    }

    .app-type {
        margin:0.27em
    }
</style>
