<template>
  <div id="app">
    <el-container>
      <el-header>
        <basicHeader></basicHeader>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
        <basicFooter></basicFooter>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import basicHeader from "./components/basic/basicHeader.vue";
import basicFooter from "./components/basic/basicFooter.vue";
export default {
  name: "app",
  components: {
    basicHeader,
    basicFooter
  }
};
</script>

<style>
@import "./assets/css/normalize.css";
@font-face {
  font-family: "iconfont"; /* project id 1481498 */
  src: url("//at.alicdn.com/t/font_1481498_z0wwcntpqo9.eot");
  src: url("//at.alicdn.com/t/font_1481498_z0wwcntpqo9.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1481498_z0wwcntpqo9.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1481498_z0wwcntpqo9.woff") format("woff"),
    url("//at.alicdn.com/t/font_1481498_z0wwcntpqo9.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1481498_z0wwcntpqo9.svg#iconfont") format("svg");
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.el-main {
  padding: inherit !important;
}
.el-header {
  padding: inherit !important;
}
.el-footer {
  padding: inherit !important;
}
</style>
