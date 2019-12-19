<template>
    <div class="app-repositories-content">
        <el-row>
            <el-col :span="24">
                <div class="grid-content">
                    <h1 style="float: left">{{$t('message.service_broker')}}</h1>
                </div>
            </el-col>
        </el-row>

        <el-divider></el-divider>

        <el-alert
                :title="brokers.title"
                type="warning"
                :description="brokers.description"
                :closable="false"
                :center="true"
                show-icon>
        </el-alert>
    </div>
</template>

<script>
    import apiSetting from "../utils/apiSetting.js";
    import http from "../utils/httpAxios.js";
    import errorMessage from '../utils/errorMessage.js';
    import loading from '../utils/loading.js';
    import getParamApi from "../utils/getParamApi";

    export default {
        data() {
            return {
                brokers: {}
            }
        },
        created() {
            loading(this, 1000)
            this.init()
        },
        methods: {
            init: async function () {
                await http(apiSetting.kubernetes.getServiceBrokers).then(res => {
                    if (res.status == 200) {
                        this.brokers = {
                            title: 'No Service Brokers installed.',
                            description: `Ask an administrator to install a compatible Service Broker to browse, provision and manage external services within Kubeapps.`
                        }
                        this.queryClusterServiceBrokers()
                    } else {
                        errorMessage(this, res);
                    }
                })
            },
            queryClusterServiceBrokers: async function () {
                await http(getParamApi(apiSetting.kubernetes.getServiceBrokers, 'clusterservicebrokers')).then(res => {
                    if (res.status == 200) {
                        console.log('...')
                    } else {
                        errorMessage(this, res);
                    }
                })
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
</style>

