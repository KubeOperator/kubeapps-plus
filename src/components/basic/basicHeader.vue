<template>
  <div>
    <el-menu class="el-menu" mode="horizontal" text-color="#ffffff" background-color="#004971" active-text-color="#ffffff">
      <el-menu-item index="1">
        <img src="../../assets/image/logo.svg" alt class="logo_header" />
        <i class="iconfont">&#xea35;</i>
      </el-menu-item>

      <el-submenu index="2" class="change_lang">
        <template slot="title">{{$t('message.language')}}</template>
        <el-menu-item index="2-1" @click='changeLangToZH()'>中文</el-menu-item>
        <el-menu-item index="2-2" @click='changeLangToEnglish()'>English</el-menu-item>
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
