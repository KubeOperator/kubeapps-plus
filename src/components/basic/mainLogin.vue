<template>
  <div class="main_login">
    <el-card class="box-card">
      <img class="login_img" src="../../.././static/img/login-banner.png"/>
      <p class="login_context">Your cluster operator should provide you with a Kubernetes API token.
        Click here for more info on how to create and use Bearer Tokens.</p>
      <el-input placeholder="请输入token" v-model="input" show-password></el-input>
        <el-button round
        @click="handleToken()"
        style="margin-top:20px;"
        >登录</el-button>
    </el-card>
  </div>
</template>

<script>
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
    top:20%;
    left: 20%;
    height: 60%;
    width: 60%;
    background-color: white;
    box-shadow: 15 15px 15px #DDD;
  }
  .login_img{
    width: 100%;
    height: 50%;
    display: block;
  }
  .login_context{
    color: #888;
    text-align: left;
  }
</style>
