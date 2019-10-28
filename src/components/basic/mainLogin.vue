<template>
  <div class="main_login">
    <el-card class="box-card">
      
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
  }
</style>