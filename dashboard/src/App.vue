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
  },
  created() {
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  mounted() {}
};
</script>

<style>
@import "./assets/css/normalize.css";
@import "./assets/css/ma.min.css";
@font-face {
  font-family: 'iconfont';  /* project id 1230044 */
  src: url('./assets/icon/iconfont.eot');
  src: url('./assets/icon/iconfont.eot?#iefix') format('embedded-opentype'),
  url('./assets/icon/iconfont.woff2') format('woff2'),
  url('./assets/icon/iconfont.woff') format('woff'),
  url('./assets/icon/iconfont.ttf') format('truetype'),
  url('./assets/icon/iconfont.svg#iconfont') format('svg');
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
#app {
  font-family: Helvetica, Helvetica Neue, "Avenir", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.el-main {
  padding: inherit !important;
  flex: 1 1;
}
.el-header {
  padding: inherit !important;
}
.el-footer {
  padding: inherit !important;
}
</style>
