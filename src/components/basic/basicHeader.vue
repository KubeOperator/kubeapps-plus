<template>
  <div>
    <el-menu
      class="el-menu"
      mode="horizontal"
    >
      <el-menu-item index="1">
        <img src="../../assets/image/logo.svg" alt class="logo_header" />
        <i class="iconfont">&#xea35;</i>
      </el-menu-item>

      <el-submenu index="2" class="change_lang">
        <template slot="title">{{$t('message.language')}}</template>
        <el-menu-item index="2-1" @click='changeLangToZH()'>中文</el-menu-item>
        <el-menu-item index="2-2" @click='changeLangToEnglish()'>English</el-menu-item>
      </el-submenu>
        <el-menu-item index="2" v-if="this.$router.path != '/'">
            {{$t('message.application')}}
        </el-menu-item>
        <el-menu-item index="3">
            {{$t('message.catalog')}}
        </el-menu-item>
        <el-menu-item index="4">
        </el-menu-item>
        <el-menu-item index="5">
        </el-menu-item>
        <el-menu-item index="6">
            {{$t('message.namespace')}}
        </el-menu-item>
        <el-menu-item index="7">
            <i class="iconfont">&#xe641;</i>{{$t('message.configuration')}}
        </el-menu-item>
        <el-submenu index="8">
            <template slot="title">
                <i class="iconfont">&#xe655;</i>
                {{$t('message.internationalization')}}
            </template>
            <el-menu-item index="2-1">中文</el-menu-item>
            <el-menu-item index="2-2">English</el-menu-item>
        </el-submenu>
        <el-menu-item index="9">
            <i class="iconfont">&#xe85f;</i>{{$t('message.logout')}}
        </el-menu-item>
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
    return {};
  },
  methods: {
    changeLangToZH(){
       this.$i18n.locale = 'cn'
    },
    changeLangToEnglish(){
       this.$i18n.locale = 'en'
    }
  }
};
</script>

<style scoped>
.logo_header {
  height: 2.1875em;
}
.el-menu li i {
  vertical-align: middle;
  color:white;
}
.change_lang {
  float: right !important;
}
.el-submenu__title,.el-menu-item{
  border-bottom: 0 !important;
}
.el-submenu >>> .el-submenu__title{
  border-bottom: 0 !important;
}
</style>
