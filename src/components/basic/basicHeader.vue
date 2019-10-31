<template>
  <div>
      <el-menu class="el-menu"
               mode="horizontal"
               text-color="#ffffff"
               background-color="#004971"
               active-text-color="#ffffff">
      <el-menu-item index="1">
        <img src="../../assets/image/logo.svg" alt class="logo_header" />
        <i class="iconfont" style="color: #fc5a4a">&#xeb9b;</i>
      </el-menu-item>
        <el-menu-item index="2" v-if="this.$route.path != '/'">
            {{$t('message.application')}}
        </el-menu-item>
        <el-menu-item index="3" v-if="this.$route.path != '/'">
            {{$t('message.catalog')}}
        </el-menu-item>

        <el-menu-item index="4" class="header-right" v-if="this.$route.path != '/'">
            <i class="iconfont">&#xe85f;</i>
            {{$t('message.logout')}}
        </el-menu-item>
        <el-submenu index="5" class="header-right">
            <template slot="title">
                <i class="iconfont">&#xe655;</i>
                {{$t('message.language')}}
            </template>
            <el-menu-item index="5-1" @click='changeLangToZH()'>中文</el-menu-item>
            <el-menu-item index="5-2" @click='changeLangToEnglish()'>English</el-menu-item>
        </el-submenu>
        <el-menu-item index="6" class="header-right" v-if="this.$route.path != '/'">
            <i class="iconfont">&#xe641;</i>
            {{$t('message.configuration')}}
        </el-menu-item>
        <el-submenu index="7" class="change_lang" v-if="this.$route.path != '/'">
            <template slot="title">
                <i class="iconfont">&#xe7bb;</i>
                {{$t('message.namespace')}}
            </template>
            <div v-for="item in this.nameSpaces.items" :key="item.metadata.name">
                <el-menu-item index="">{{item.metadata.name}}</el-menu-item>
            </div>
        </el-submenu>
    </el-menu>

  </div>
</template>

<script>
export default {
  name: "basicHeader",
  props: {
    msg: String
  },
  data() {
    return {
        nameSpaces: {}
    };
  },
  created() {
    this.init()
  },
  methods: {
    changeLangToZH(){
       this.$i18n.locale = 'cn'
    },
    changeLangToEnglish(){
       this.$i18n.locale = 'en'
    },
    init() {
        //默认从session 里取namespaces
        // this.nameSpaces = sessionStorage.getItem('nameSpaces')

        this.nameSpaces = {
            "kind": "NamespaceList",
            "apiVersion": "v1",
            "metadata": {
                "selfLink": "/api/v1/namespaces/",
                "resourceVersion": "129088"
            },
            "items": [
                {
                    "metadata": {
                        "name": "default",
                        "selfLink": "/api/v1/namespaces/default",
                        "uid": "e8dcb0ba-b59c-403f-8680-70e838bedf7f",
                        "resourceVersion": "149",
                        "creationTimestamp": "2019-10-22T07:02:03Z"
                    },
                    "spec": {
                        "finalizers": [
                            "kubernetes"
                        ]
                    },
                    "status": {
                        "phase": "Active"
                    }
                },
                {
                    "metadata": {
                        "name": "kube-node-lease",
                        "selfLink": "/api/v1/namespaces/kube-node-lease",
                        "uid": "789f16e3-c4ac-4144-a972-a7eb854eab1d",
                        "resourceVersion": "38",
                        "creationTimestamp": "2019-10-22T07:02:00Z"
                    },
                    "spec": {
                        "finalizers": [
                            "kubernetes"
                        ]
                    },
                    "status": {
                        "phase": "Active"
                    }
                },
                {
                    "metadata": {
                        "name": "kube-public",
                        "selfLink": "/api/v1/namespaces/kube-public",
                        "uid": "b46f6686-04df-4b23-ad2e-2ab1d44973f9",
                        "resourceVersion": "34",
                        "creationTimestamp": "2019-10-22T07:02:00Z"
                    },
                    "spec": {
                        "finalizers": [
                            "kubernetes"
                        ]
                    },
                    "status": {
                        "phase": "Active"
                    }
                },
                {
                    "metadata": {
                        "name": "kube-system",
                        "selfLink": "/api/v1/namespaces/kube-system",
                        "uid": "305e8aba-45c2-48cf-a0f1-a4c39638a202",
                        "resourceVersion": "23",
                        "creationTimestamp": "2019-10-22T07:02:00Z"
                    },
                    "spec": {
                        "finalizers": [
                            "kubernetes"
                        ]
                    },
                    "status": {
                        "phase": "Active"
                    }
                },
                {
                    "metadata": {
                        "name": "kubeapps",
                        "selfLink": "/api/v1/namespaces/kubeapps",
                        "uid": "4b306a7b-b19d-432e-8824-0141a652bd7d",
                        "resourceVersion": "1030",
                        "creationTimestamp": "2019-10-22T07:09:03Z",
                        "labels": {
                            "name": "kubeapps"
                        }
                    },
                    "spec": {
                        "finalizers": [
                            "kubernetes"
                        ]
                    },
                    "status": {
                        "phase": "Active"
                    }
                },
                {
                    "metadata": {
                        "name": "kubernetes-dashboard",
                        "selfLink": "/api/v1/namespaces/kubernetes-dashboard",
                        "uid": "979bf9dd-92dc-47f0-869a-b2c724024c8b",
                        "resourceVersion": "372",
                        "creationTimestamp": "2019-10-22T07:02:13Z",
                        "labels": {
                            "addonmanager.kubernetes.io/mode": "Reconcile",
                            "kubernetes.io/minikube-addons": "dashboard"
                        },
                        "annotations": {
                            "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"v1\",\"kind\":\"Namespace\",\"metadata\":{\"annotations\":{},\"labels\":{\"addonmanager.kubernetes.io/mode\":\"Reconcile\",\"kubernetes.io/minikube-addons\":\"dashboard\"},\"name\":\"kubernetes-dashboard\"}}\n"
                        }
                    },
                    "spec": {
                        "finalizers": [
                            "kubernetes"
                        ]
                    },
                    "status": {
                        "phase": "Active"
                    }
                }
            ]
        }
    }
  }
};
</script>

<style scoped>
.logo_header {
  height: 2.1875em;
}
.el-menu {
    background-color: rgb(0, 74, 113);
}
.el-menu li i {
  vertical-align: middle;
  color:white;
}
.change_lang {
  float: right !important;
}
.header-right{
    float: right !important;
}
.el-submenu__title,.el-menu-item{
  border-bottom: 0 !important;
}
.el-submenu >>> .el-submenu__title{
  border-bottom: 0 !important;
}
</style>
