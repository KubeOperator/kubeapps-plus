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
          <div style="margin-top: 50px"><span ><a href="mailto:support@fit2cloud.com" target="_blank">Forget Token | Ask For Help</a></span></div>
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
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    position: relative;
    top:calc(40% - 160px);
    left: calc(50vw - 425px);
    height: 488px;
    width: 850px;
    background-color: white;
  }
  .login_img{
    width: 100%;
    height: 100%;
    display: block;
  }
  .box-card-right{
    position: relative;
    float: right;
    width: 377px;
    height: 428px;
    padding: 10px;
  }
  .box-card-left{
    position: relative;
    float: left;
    width: 397px;
    height: 448px;
  }
  .main{
    width: 100%;
    height: 100%;
  }
  .login_title{
    margin-top: 50px;
    font-weight: bold;
    font-size: 30px;
    font-family: "Interstate", "Fira Sans", -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  }
  .login_label{
    text-align: left;
    margin-top: 50px;
  }
</style>
