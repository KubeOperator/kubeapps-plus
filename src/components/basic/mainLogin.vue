<template>
  <div class="main_login">
    <el-card class="box-card">
      <p class="login_context">Your cluster operator should provide you with a Kubernetes API token. Click here for more info on how to create and use Bearer Tokens.</p>
      <el-input placeholder="请输入token" v-model="input" show-password></el-input>
        <el-button round
        style="margin-top:20px;"
        >登录</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "mainLogin"
};
</script>

<style scoped>
.main_login {
  height: calc(100vh - 120px);
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
    top:calc(50% - 120px);
    left:calc(50vw - 240px);
    height: 240px;
    width: 480px;
    background: linear-gradient(-40deg, #1683C6 36%, #1A3663 100%);
  }
  .login_context{
    color: white;
    text-align: left;
  }
</style>