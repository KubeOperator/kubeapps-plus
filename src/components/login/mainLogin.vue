<template>
  <div class="main_login">
    <el-card class="box-card">
      <div class="main">
        <div class="box-card-left">
          <img class="login_img" src="../../.././static/img/login-banner.png"/>
        </div>
        <div class="box-card-right">
          <div class="login_title"><span><i class="iconfont login_title">&#xe650;</i> Login</span></div>
          <div class="login_label">Kubernetes API Token</div>
          <el-tooltip class="item" effect="dark" content="Your cluster operator should provide you with a Kubernetes API token." placement="bottom">
            <el-input style="margin-top: 20px;" placeholder="请输入token" v-model="input" show-password></el-input>
          </el-tooltip>
          <el-button plain
                     @click="handleToken()"
                     style="margin-top:20px;width: 100%;">登录</el-button>
          <div style="margin-top: 50px"><span ><a href="https://github.com/f2c-innovation/kubeapps_plus_dashborad/issues" target="_blank">Forget Token | Ask For Help</a></span></div>
        </div>
      </div>

    </el-card>
  </div>
</template>

<script>
import Store from "../store/store.js"
export default {
  name: "mainLogin",
  data(){
    return {
      input:''
    }
  },
  methods:{
    handleToken(){
      if(this.input.length > 2){
        Store.save('accessToken', this.input)
        this.$router.push("/dashboard")
      }else{
        console.log("False")
      }
    }
  }
};
</script>

<style scoped>
  .main_login {
    height: calc(100vh - 160px);
  }
  .item {
    margin-bottom: 18px;
  }
  .box-card {
    position: relative;
    top:calc(40% - 160px);
    left: calc(50vw - 425px);
    height: 397px;
    width: 850px;
    background-color: white;
  }
  .login_img{
    max-width: 100%;
    max-height: 100%;
    display: block;
  }
  .box-card-right{
    position: relative;
    float: left;
    max-width: 397px;
    max-height: 428px;
    padding: 1em;
    margin: 0 0 0 4em;
  }
  .box-card-left{
    position: relative;
    float: left;
    max-width: 397px;
    max-height: 448px;
  }
  .main{
    max-width: 100%;
    max-height: 100%;
  }
  .login_title{
    font-weight: bold;
    font-size: 1.5em;
  }
  .login_label{
    text-align: left;
    margin-top: 50px;
  }
</style>
