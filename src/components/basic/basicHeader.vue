<template>
  <div>
    <el-menu
            :default-active="activeIndex"
            class="el-menu"
            mode="horizontal"
            text-color="#FFF"
            active-text-color="#888"
            @select="handleSelect">
      <el-menu-item index="1" >
        <img src="../../assets/image/logo.svg" alt="" class="logo_header">
      </el-menu-item>
      <el-menu-item index="2"><i class="iconfont">&#xe643;</i> <i>400-052-0755</i></el-menu-item>
      <el-menu-item index="3"><i class="iconfont">&#xe64a;</i> <i>预约演示</i></el-menu-item>
      <el-menu-item index="4"><i class="iconfont">&#xe64e;</i> <i>客户支持门户</i></el-menu-item>
      <el-menu-item index="5"><i class="iconfont">&#xe7d9;</i> <i>合作伙伴项目报备</i></el-menu-item>
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

      };
    },
    methods: {}
  };
</script>

<style scoped>
  .logo_header{
    height:2.1875em;
  }
  .el-menu{
    background-color: rgb(0,74,113);
  }
  .el-menu li:hover{
    background-color: rgb(15,74,113);
  }
  .el-menu li i{
    vertical-align: middle;
    color: #FFF;
  }
</style>
