<template>
  <div>
    <el-row style="margin-top:10px">
      <el-col :md="6" :lg="4">
        <h1 class="app_title">Applications</h1>
      </el-col>
      <el-col :md={span:4,offest:2} :lg="3">
        <div style="margin: 1.2em 0;">
          <el-input placeholder="请输入内容" v-model="input4">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </el-col>
      <el-col :md="6" :lg="4">
        <div style="margin: 1.8em 0;">
          <el-switch v-model="radio" active-text="显示已删除的应用" inactive-text></el-switch>
        </div>
      </el-col>
      <el-col :md={span:4,offest:2} :lg={span:6,offset:7}>
        <div style="margin: 1.2em 0;">
             <el-button type="primary">{{$t('message.hello')}}</el-button>
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