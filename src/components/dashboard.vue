<template>
  <div>
    <el-row style="margin-top:10px">
      <el-col :span="6">
        <h1 class="app_title">Applications</h1>
      </el-col>
      <el-col :span="4">
        <div style="margin: 1.2em 0;">
          <el-input placeholder="请输入内容" v-model="input4">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div style="margin: 1.8em 0;">
          <el-switch v-model="radio" active-text="显示已删除的应用" inactive-text></el-switch>
        </div>
      </el-col>
      <el-col :span="4" :offset="4">
        <div style="margin: 1.2em 0;">
             <el-button type="primary">新建应用</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "dashboard",
  data() {
    return {
      radio: ""
    };
  }
};
</script>
<style scoped>
.app_title {
}
</style>