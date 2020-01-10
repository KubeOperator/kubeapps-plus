<template>
    <div>
        <el-menu
                class="el-menu"
                mode="horizontal"
                text-color="#ffffff"
                background-color="#004971"
                active-text-color="#ffb876"
        >
            <el-menu-item index="1">
                <img src="../../assets/image/logo.svg" alt class="logo_header"/>
                <i class="icon_font" style="color: #fc5a4a;margin-top: 5px;">&#xeb9b;</i>
            </el-menu-item>
            <el-menu-item
                    index="2"
                    v-if="this.$route.path != '/'"
                    @click="$router.push('/applications')"
            >{{$t('message.application')}}
            </el-menu-item>
            <el-menu-item
                    index="3"
                    v-if="this.$route.path != '/'"
                    @click="$router.push('/catalog')"
            >{{$t('message.catalog')}}
            </el-menu-item>

            <el-menu-item index="4" class="header-right" @click="logout()" v-if="this.$route.path != '/'">
                <i class="iconfont">&#xe85f;</i>
                {{$t('message.logout')}}
            </el-menu-item>
            <el-submenu index="5" class="header-right">
                <template slot="title">
                    <i class="iconfont">&#xe655;</i>
                    {{$t('message.language')}}
                </template>
                <el-menu-item index="5-1" @click="changeLangToZH()">中文</el-menu-item>
                <el-menu-item index="5-2" @click="changeLangToEnglish()">English</el-menu-item>
            </el-submenu>
            <el-submenu index="6" class="header-right" v-if="this.$route.path != '/'">
                <template slot="title">
                    <i class="iconfont">&#xe641;</i>
                    {{$t('message.configuration')}}
                </template>
                <el-menu-item index="6-1" @click="appRepositories">{{$t('message.app_repositories')}}</el-menu-item>
                <el-menu-item index="6-2" @click="updateNamespace">{{$t('message.update_namespace')}}</el-menu-item>
<!--                <el-menu-item index="6-2" @click="serviceBroker">{{$t('message.service_broker')}}</el-menu-item>-->
            </el-submenu>
            <el-submenu index="7" class="header-right" v-if="this.$route.path != '/'">
                <template slot="title">
                    <i class="iconfont">&#xe7bb;</i>
                    {{(getActivespace=='')?$t('message.namespace'):getActivespace}}
                </template>
                <div v-for="item in getnamespace" :key="item.metadata.name">
                    <el-menu-item index @click="changeActiveSpace(item.metadata.name)">{{item.metadata.name}}
                    </el-menu-item>
                </div>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    import http from "../utils/httpAxios";
    import apiSetting from "../utils/apiSetting";
    import noticeMessage from "../utils/noticeMessage";

    export default {
        name: "basicHeader",
        props: {
            msg: String
        },
        data() {
            return {
                activeNamespace: this.getActivespace
            };
        },
        created: function () {
            //默认从session 里取namespaces
            // this.nameSpaces = sessionStorage.getItem('nameSpaces')
            // this.nameSpaces = Store.fetch("Namespaces");
        },
        methods: {
            changeLangToZH() {
                this.$i18n.locale = "cn";
            },
            changeLangToEnglish() {
                this.$i18n.locale = "en";
            },
            logout() {
                this.$store.commit("signOut");
                this.$router.push("/");
            },
            appRepositories() {
                this.$router.push("/repositories");
            },
            serviceBroker() {
                this.$router.push("/brokers");
            },
            changeActiveSpace(name) {
                this.$store.commit("updateActiveSapce", name);
                this.$store.dispatch('getRelease')
            },
            updateNamespace() {
                noticeMessage(this, ' 正在更新, 请稍等 ', 'success')
                http(apiSetting.kubernetes.getNamespaces).then(res => {
                    if (res.status == 200) {
                        noticeMessage(this, '更新成功', 'success')
                        this.$store.commit('initNamespace', res.data)
                    } else {
                        noticeMessage(this, '更新失败 ' + res.data, 'error')
                    }
                });
            }
        },
        computed: {
            getnamespace() {
                return this.$store.state.namespaces.items;
            },
            getActivespace() {
                return this.$store.state.namespaces.activeSpace;
            }
        }
    };
</script>

<style scoped>
    .logo_header {
        height: 2.1875em;
    }

    .icon_font {
        font-family: "iconfont" !important;
        font-size: 14px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }

    .el-menu {
        background-color: rgb(0, 74, 113);
    }

    .el-menu li {
        font-weight: bold;
    }

    .el-menu li i {
        vertical-align: middle;
        color: white;
    }

    .header-right {
        float: right !important;
    }

    .el-submenu__title,
    .el-menu-item {
        border-bottom: 0 !important;
    }

    .el-submenu >>> .el-submenu__title {
        border-bottom: 0 !important;
    }
</style>
