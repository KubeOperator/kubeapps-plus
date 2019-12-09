<template>
    <div class="app-repositories-content" v-loading.fullscreen.lock="loading" element-loading-text="Loading" element-loading-background="rgba(0, 0, 0, 0.1)">
        <el-row>
            <el-col :span="24">
                <div class="grid-content">
                    <h1 style="float: left">{{$t('message.add_an_app_repository')}}</h1>
                </div>
            </el-col>
        </el-row>

        <el-divider></el-divider>


    </div>
</template>

<script>
    // import apiSetting from "../utils/apiSetting.js";
    // import http from "../utils/httpAxios.js";
    // import errorMessage from '../utils/errorMessage.js';
    import loading from '../utils/loading.js';

    /* eslint-disable */
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
