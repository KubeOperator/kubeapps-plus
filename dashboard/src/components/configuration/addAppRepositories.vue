<template>
    <div class="app-repositories-content" >
        <el-row style="border-bottom: 2px solid #f1f1f1;">
            <el-col :span="24">
                <div class="grid-content">
                    <h3 style="float: left;margin-top: 0 !important;">{{$t('message.add_an_app_repository')}}</h3>
                </div>
            </el-col>
        </el-row>

<!--        <el-divider></el-divider>-->

        <div class="foot-gril margin-t-normal">
            <div class="basic-lay">
                <label>{{$t('message.name')}}</label>
                <el-form :model="form" :rules="rules" :ref="form.name" label-width="100px" class="ruleForm">
                    <el-form-item prop="name">
                        <el-input style="width: 100%;"
                              v-model="form.name" placeholder="example" required></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <div class="basic-lay">
                <label>{{$t('message.url')}}</label>
                <el-form :model="form" :rules="rules" :ref="form.url" label-width="100px" class="ruleForm">
                    <el-form-item prop="url">
                        <el-input style="width: 100%;"
                              v-model="form.url" placeholder="https://charts.example.com/stable" required></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <div class="basic-lay">
                <label>{{$t('message.authorization')}}</label>
                <div class="basic-lay">
                    <el-radio v-model="radio" label="none" border>{{$t('message.none')}}</el-radio>
                    <el-radio v-model="radio" label="basic" border>{{$t('message.basic_auth')}}</el-radio>
                    <el-radio v-model="radio" label="bearer" border>{{$t('message.bearer_token')}}</el-radio>
                    <el-radio v-model="radio" label="custom" border>{{$t('message.custom')}}</el-radio>
                </div>
            </div>

            <div v-show="radio == 'basic'" class="basic-lay">
                <label>{{$t('message.basic_auth')}} : {{$t('message.username')}}</label>
                <el-form :model="form" :rules="rules" :ref="form.username" label-width="100px" class="ruleForm">
                    <el-form-item prop="username">
                        <el-input style="width: 100%;"
                              v-model="form.username" placeholder="username" required></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <div v-show="radio == 'basic'" class="basic-lay">
                <label>{{$t('message.basic_auth')}} : {{$t('message.password')}}</label>
                <el-form :model="form" :rules="rules" :ref="form.password" label-width="100px" class="ruleForm">
                    <el-form-item prop="password">
                        <el-input style="width: 100%;"
                              v-model="form.password" placeholder="password" required></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <div v-show="radio == 'bearer'" class="basic-lay">
                <label>{{$t('message.bearer_token')}} : {{$t('message.token')}}</label>
                <el-form :model="form" :rules="rules" :ref="form.token" label-width="100px" class="ruleForm">
                    <el-form-item prop="token">
                        <el-input style="width: 100%;"
                              v-model="form.token" placeholder="xrxNcWghpRLdcPHFgVRM73rr4N7qjvjm" type="" required></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <div v-show="radio == 'custom'">
                <label>{{$t('message.custom')}} : {{$t('message.complete_authorization_header')}}</label>
                <el-input style="width: 100%;"
                          v-model="completeAuthorizationHeader" placeholder="Bearer xrxNcWghpRLdcPHFgVRM73rr4N7qjvjm" type="" required></el-input>
            </div>

            <div class="basic-lay">
                <label>{{$t('message.custom_ca_certificate')}}</label>
                <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="-----BEGIN CERTIFICATE-----
...
-----END CERTIFICATE-----"
                        v-model="customCaCertificate">
                </el-input>
            </div>

            <div class="basic-lay">
                <label>{{$t('message.custom_sync_job_template')}}
                    <el-tooltip class="item" effect="dark" :content=" $t('message.default_sync_job') " placement="top">
                        <i class="el-icon-warning"></i>
                    </el-tooltip>
                </label>
                <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="spec:
  containers:
  - env:
    - name: FOO
      value: BAR
"
                        v-model="customSyncJobTemplate">
                </el-input>
            </div>
        </div>

        <el-button class="gred-btn" type="success" icon="el-icon-plus" @click="installRepo()">
            {{$t('message.install_repo')}}
        </el-button>
        <el-button class="gred-btn" type="primary" icon="el-icon-d-arrow-left" @click="backToPrevious()">
            {{$t('message.back_to_previous')}}
        </el-button>
    </div>
</template>

<script>
    /* eslint-disable */
    import noticeMessage from "../utils/noticeMessage";
    import http from "../utils/httpAxios";
    import getParamApi from "../utils/getParamApi";
    import apiSetting from "../utils/apiSetting";
    import jsyaml from "js-yaml";

    export default {
        data() {
            return {
                form: {
                    name: '',
                    url: '',
                    username: '',
                    password: '',
                    token: '',
                },
                radio: 'none',
                completeAuthorizationHeader: '',
                customCaCertificate: '',
                customSyncJobTemplate: '',
                params: [],
                rules: {
                    name: [
                        { required: true, message: this.$t('message.please_input'), trigger: 'blur' },
                        { min: 1, max: 100, message: this.$t('message.must_1_100_characters'), trigger: 'blur' },
                        { pattern: /[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*/, message: this.$t('message.use_lowercase_alphanumeric_characters'),trigger: 'blur' }
                    ],
                    url: [
                        { required: true, message: this.$t('message.please_enter_url'), trigger: 'blur' },
                        { min: 1, max: 100, message: this.$t('message.must_1_100_characters'), trigger: 'blur' },
                    ],
                    username: [
                        { required: true, message: this.$t('message.please_enter_username'), trigger: 'blur' },
                        { min: 1, max: 100, message: this.$t('message.must_1_100_characters'), trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: this.$t('message.please_enter_password'), trigger: 'blur' },
                        { min: 1, max: 100, message: this.$t('message.must_1_100_characters'), trigger: 'blur' },
                    ],
                    token: [
                        { required: true, message: this.$t('message.please_enter_token'), trigger: 'blur' },
                    ],
                }
            }
        },
        created() {
            this.params = this.$route.params.params ? this.$route.params.params : JSON.parse(sessionStorage.getItem('repositories'))
            this.init()
        },
        methods: {
            init() {

            },
            installRepo: async function(){
                if (!this.form.name) {
                    noticeMessage(this, this.$t('message.name_cannot_be_empty'), 'warning')
                } else if (!this.form.url) {
                    noticeMessage(this, this.$t('message.url_cannot_be_empty'), 'warning')
                } else if (this.radio === 'basic' && !this.form.username) {
                    noticeMessage(this, this.$t('message.username_cannot_be_empty'), 'warning')
                } else if(this.radio === 'basic' && !this.form.password){
                    noticeMessage(this, this.$t('message.password_cannot_be_empty'), 'warning')
                } else if (this.radio === 'bearer' && !this.token) {
                    noticeMessage(this, this.$t('message.token_cannot_be_empty'), 'warning')
                } else if (this.radio === 'custom' && !this.completeAuthorizationHeader) {
                    noticeMessage(this, this.$t('message.custom_cannot_be_empty'), 'warning')
                }else{
                    await this.$confirm(this.$t('message.sure_add'), this.$t('message.tips'), {
                        confirmButtonText: this.$t('message.sure'),
                        cancelButtonText: this.$t('message.cancle'),
                        type: 'warning'
                    }).then(() => {
                        for(let param of this.params){
                            if(this.form.name == param.metadata.name){
                                noticeMessage(this, this.$t('message.name_cannot_be_empty'), 'warning')
                                return;
                            }
                        }
                        noticeMessage(this, this.$t('message.save_now_please'), 'success')
                        this.loading = true
                        this.installRepoSubmit()
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: this.$t('message.cancle')
                        });
                    });
                }
            },
            installRepoSubmit: async function(){
                let auth = {}
                if (this.radio === 'none') {
                    auth = {}
                }else if (this.radio === 'basic') {
                    auth = {
                        customCA: {
                            secretKeyRef: {
                                key: "ca.crt",
                                name: "apprepo-" + this.form.name.replace(/\s+/g, "") + "-secrets"
                            }
                        },
                        header: {
                            secretKeyRef: {
                                key: "authorizationHeader",
                                name: "apprepo-" + this.form.name.replace(/\s+/g, "") + "-secrets"
                            }
                        }
                    }
                }else if(this.radio === 'bearer'){
                    auth = {
                        customCA: {
                            secretKeyRef: {
                                key: "ca.crt",
                                name: "apprepo-" + this.form.name.replace(/\s+/g, "") + "-secrets"
                            }
                        },
                        header: {
                            secretKeyRef: {
                                key: "authorizationHeader",
                                name: "apprepo-" + this.form.name.replace(/\s+/g, "")+ "-secrets"
                            }
                        }
                    }
                }else if(this.radio === 'custom'){
                    auth = {
                        customCA: {
                            secretKeyRef: {
                                key: "ca.crt",
                                name: "apprepo-" + this.form.name.replace(/\s+/g, "") + "-secrets"
                            }
                        },
                        header: {
                            secretKeyRef: {
                                key: "authorizationHeader",
                                name: "apprepo-" + this.form.name.replace(/\s+/g, "") + "-secrets"
                            }
                        }
                    }
                }
                let params = {
                    apiVersion: 'kubeapps.com/v1alpha1',
                    kind: 'AppRepository',
                    metadata: {
                        name: this.form.name.replace(/\s+/g, "")
                    },
                    spec: {
                        auth: auth,
                        syncJobPodTemplate: jsyaml.safeLoad(this.customSyncJobTemplate),
                        type: 'helm',
                        url: this.form.url.replace(/\s+/g, "")
                    },
                }
                await http(getParamApi(apiSetting.kubernetes.addAppRepositorie, sessionStorage.getItem('nameSpace'), 'apprepositories'), params).then((res) => {
                    if (res.status == 200 || res.status == 201) {
                        noticeMessage(this, this.form.name + this.$t('message.save_success'), 'success')
                        this.setScrets()
                    } else {
                        noticeMessage(this, this.form.name + this.$t('message.save_failed') + res, 'error')
                    }
                }).catch(msg => {
                    noticeMessage(this, this.form.name + this.$t('message.request_failed') + msg.data, 'error')
                })
                this.loading = false
            },
            backToPrevious(){
                this.$router.push("/repositories");
            },
            /*
            ** randomWord 产生任意长度随机字母数字组合
            ** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
            */
            randomWord(randomFlag, min, max) {
                let str = "",
                    range = min,
                    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

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
            setScrets: async function(){
                let data = {}
                if(this.radio === 'none'){
                    data = {
                        "ca.crt": btoa(this.customCaCertificate)
                    }
                }else if (this.radio === 'basic') {
                    data = {
                        authorizationHeader: btoa('Basic ' + btoa(this.form.username + ':' + this.form.password)),
                        "ca.crt": btoa(this.customCaCertificate)
                    }
                }else if(this.radio === 'bearer'){
                    data = {
                        authorizationHeader: btoa('Bearer ' + this.token),
                        "ca.crt": btoa(this.customCaCertificate)
                    }
                }else if(this.radio === 'custom'){
                    data = {
                        authorizationHeader: btoa( this.completeAuthorizationHeader),
                        "ca.crt": btoa(this.customCaCertificate)
                    }
                }
                let params = {
                    apiVersion: "v1",
                    kind: "Secret",
                    type: "Opaque",
                    data: data,
                    metadata:{
                        name: "apprepo-" + this.form.name + "-secrets",
                        ownerReferences: [{
                            apiVersion: "kubeapps.com/v1alpha1",
                            blockOwnerDeletion: true,
                            kind: "AppRepository",
                            name: this.form.name,
                            uid: this.randomWord(false, 8, 8) + '-' + this.randomWord(false, 4, 4) + '-' +  this.randomWord(false, 4, 4) + '-' + this.randomWord(false, 4, 4) + '-' +  this.randomWord(false, 12, 12)
                        }]
                    }
                }
                await http(getParamApi(apiSetting.kubernetes.setSecrets, sessionStorage.getItem('nameSpace'), 'secrets'), params).then((res) => {
                    if (res.status == 200 || res.status == 201) {
                        this.$router.push("/repositories");
                    } else {
                        noticeMessage(this, this.form.name + this.$t('message.request_failed') + res, 'error')
                    }
                }).catch(msg => {
                    noticeMessage(this, this.form.name + this.$t('message.request_failed') + msg.data, 'error')
                })
                this.loading = false
            }
        }
    }
</script>

<style scoped>
    .app-repositories-content {
        padding: 1em;
        height: calc(100vh - 120px);
    }

    .grid-content {
        border-radius: 4px;
    }

    .gred-btn {
        margin: 2em;
        float: left;
    }

    .foot-gril {
        padding: 1em;
        text-align: left;
    }

    .basic-lay{
        margin: 1em 0
    }

    .item {
        margin: 4px;
    }

    .app-repositories-content /deep/ .el-form-item__content{
        margin-left: 0 !important;
    }
</style>
