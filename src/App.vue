<template>
  <div id="app">
    <el-container>
      <el-header>
        <basicHeader></basicHeader>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer v-if="this.$route.path != '/catalog'">
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
  },
  mounted() {

  }
};
</script>

<style>
  @import "./assets/css/normalize.css";
  @font-face {
    font-family: 'iconfont';  /* project id 1481498 */
    src: url('//at.alicdn.com/t/font_1481498_ba4lb1nswoq.eot');
    src: url('//at.alicdn.com/t/font_1481498_ba4lb1nswoq.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1481498_ba4lb1nswoq.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1481498_ba4lb1nswoq.woff') format('woff'),
    url('//at.alicdn.com/t/font_1481498_ba4lb1nswoq.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1481498_ba4lb1nswoq.svg#iconfont') format('svg');
  }
  .iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /* margin-top: 60px; */
  }
  .el-main{
    padding: inherit !important;
  }
  .el-header{
    padding: inherit !important;
  }
  .el-footer{
    padding: inherit !important;
  }
</style>
