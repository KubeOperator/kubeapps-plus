<template>
    <div class="main_login">
        <el-card class="box-card">
            <div class="main">
                <div class="box-card-left">
                    <img class="login_img" src="../../assets/image/login-banner.png"/>
                </div>
                <div class="box-card-right">
                    <div class="login_title">
                      <span>
                        <i class="iconfont login_title">&#xe650;</i>
                          {{'Kubeapps'}}<span style="color: #fc5a4a;">+ </span>{{ $t('message.login') }}
                      </span>
                    </div>
                    <div class="login_label">{{$t('message.k8s_api_token')}}</div>
                    <el-tooltip
                            class="item"
                            effect="dark"
                            :content=" $t('message.token_warn_alert') "
                            placement="bottom"
                    >
                        <el-input
                                style="margin-top: 20px;"
                                :placeholder="$t('message.token_placeholder')"
                                v-model="input"
                                show-password
                        ></el-input>
                    </el-tooltip>
                    <el-button
                            plain
                            @click="handleToken()"
                            style="margin-top:20px;width: 100%;"
                    >{{$t('message.login')}}
                    </el-button>
                    <div style="margin-top: 50px">
                        <span>
                            <a
                                    href="https://github.com/f2c-innovation/kubeapps_plus_dashborad"
                                    target="_blank"
                            >{{$t('message.ask_for_help')}}</a>
                        </span>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import Store from "../store/store.js";
    import apiSetting from "../utils/apiSetting.js";
    import http from "../utils/httpAxios.js";
    import errorMessage from '../utils/errorMessage.js';
    // import getParamApi from "../utils/getParamApi";
    import noticeMessage from "../utils/noticeMessage";

    export default {
        name: "mainLogin",
        data() {
            return {
                input: "",
            };
        },
        methods: {
            handleToken() {
                Store.save("accessToken", this.input);
                http(apiSetting.kubernetes.getInfo).then(res => {
                    if (res.status == 200) {
                        http(apiSetting.kubernetes.getNamespaces).then(res => {
                            if (res.status == 200) {
                                this.$store.commit('initNamespace', res.data)
                                // this.$store.dispatch('getRelease')
                                this.getConfigJson()
                                this.$router.push("applications");
                            } else {
                                //Error Message
                                errorMessage(this, res);
                            }
                        });
                    } else {
                        //Error Message
                        errorMessage(this, res);
                    }
                },msg =>{
                    errorMessage(this, msg);
                });
            },
            getConfigJson: async function(){
                await http(apiSetting.kubernetes.getConfigJson, {}).then((res) => {
                    if (res.status == 200) {
                        sessionStorage.setItem('nameSpace', res.data.namespace ? res.data.namespace : 'kubeapps')
                    } else {
                        noticeMessage(this, ' 请求获取namespace失败: ' + res, 'error')
                    }
                }).catch(msg => {
                    noticeMessage(this, ' 请求失败: ' + msg.data, 'error')
                })
            }
        }
    };
</script>

<style scoped>
    .main_login {
        height: calc(100vh - 160px);
    }

    .item {
        margin-bottom: 18px;
    }

    .box-card {
        position: relative;
        top: calc(40% - 160px);
        left: calc(50vw - 425px);
        height: 397px;
        width: 850px;
        background-color: white;
    }

    .box-card /deep/ .el-card__body {
        padding: 0 !important;
    }

    .login_img {
        max-width: 100%;
        max-height: 100%;
        display: block;
    }

    .box-card-right {
        position: relative;
        float: left;
        max-width: 439px;
        max-height: 488px;
        padding: 1em;
        margin: 0 0 0 3em;
    }

    .box-card-left {
        position: relative;
        float: left;
        max-width: 439px;
        max-height: 488px;
    }

    .main {
        max-width: 100%;
        max-height: 100%;
    }

    .login_title {
        font-weight: bold;
        font-size: 1.5em;
    }

    .login_label {
        text-align: left;
        margin-top: 50px;
    }
</style>
