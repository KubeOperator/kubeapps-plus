<template>
  <div id="app">
    <el-container>
      <el-header>
        <basicHeader></basicHeader>
      </el-header>
      <el-main>
        <mainLogin>

        </mainLogin>
      </el-main>
      <el-footer>
        <basicFooter></basicFooter>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import basicHeader from "./components/basic/basicHeader.vue"
import mainLogin from "./components/basic/mainLogin.vue"
import basicFooter from "./components/basic/basicFooter.vue"
export default {
  name: "app",
  components: {
    basicHeader,
    basicFooter,
    mainLogin
  }
};
</script>

<style>
@import "./assets/css/normalize.css"; 
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
