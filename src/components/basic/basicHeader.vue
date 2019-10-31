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
        <img src="../../assets/image/logo.svg" alt class="logo_header" />
        <i class="iconfont" style="color: #fc5a4a;margin-top: 5px;">&#xeb9b;</i>
      </el-menu-item>
      <el-menu-item
        index="2"
        v-if="this.$route.path != '/'"
        @click="$router.push('/dashboard')"
      >{{$t('message.application')}}</el-menu-item>
      <el-menu-item
        index="3"
        v-if="this.$route.path != '/'"
        @click="$router.push('/catalog')"
      >{{$t('message.catalog')}}</el-menu-item>

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
      <el-menu-item index="6" class="header-right" v-if="this.$route.path != '/'">
        <i class="iconfont">&#xe641;</i>
        {{$t('message.configuration')}}
      </el-menu-item>
      <el-submenu index="7" class="header-right" v-if="this.$route.path != '/'">
        <template slot="title">
          <i class="iconfont">&#xe7bb;</i>
          {{(activeNamespace=='')?$t('message.namespace'):activeNamespace}}
        </template>
        <div v-for="item in this.nameSpaces.items" :key="item.metadata.name">
          <el-menu-item index @click="activeSpace(item.metadata.name)">{{item.metadata.name}}</el-menu-item>
        </div>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import Store from "../store/store.js";
export default {
  name: "basicHeader",
  props: {
    msg: String
  },
  data() {
    return {
      nameSpaces: {},
      activeNamespace: ""
    };
  },
  created: function() {
    //默认从session 里取namespaces
    // this.nameSpaces = sessionStorage.getItem('nameSpaces')
    this.nameSpaces = Store.fetch("Namespaces");
  },
  methods: {
    changeLangToZH() {
      this.$i18n.locale = "cn";
    },
    changeLangToEnglish() {
      this.$i18n.locale = "en";
    },
    activeSpace(name) {
      Store.save("activeNamespace", name);
      this.activeNamespace = name;
    },
    logout() {
      Store.save("activeNamespace", "");
      Store.save("accessToken", null);
      Store.save("Namespaces", null);
      this.$router.push("/")
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
