<template>
  <div>
    <el-menu
      class="el-menu"
      mode="horizontal"
      text-color="#FFF"
      active-text-color="#888"
    >
      <el-menu-item index="1">
        <img src="../../assets/image/logo.svg" alt class="logo_header" />
        <i class="iconfont">&#xea35;</i>
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
  methods: {}
};
</script>

<style scoped>
.logo_header {
  height: 2.1875em;
}
.el-menu {
  background-color: rgb(0, 74, 113);
}
.el-menu li:hover {
  background-color: rgb(15, 74, 113);
}
.el-menu li i {
  vertical-align: middle;
  color: #fff;
}
</style>
