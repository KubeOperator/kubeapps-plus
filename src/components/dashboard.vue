<template>
  <div>
    <el-row style="margin-top:10px border-bottom: 2px solid #f1f1f1;">
      <el-col :md="6" :lg="4">
        <h1 class="app_title">Applications</h1>
      </el-col>
      <el-col :md="{span:4,offest:2}" :lg="3">
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
      <el-col :md="{span:4,offest:2}" :lg="{span:6,offset:7}">
        <div style="margin: 1.2em 0;">
          <el-button type="primary">{{$t('message.hello')}}</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="alert margin-c margin-t-bigger">
      <header>
        <div class="margin-b-big">
          <h5 class="type-regular">
            <span class="error__icon margin-r-small">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12" y2="8" />
              </svg>
            </span>Supercharge your Kubernetes cluster
          </h5>
        </div>
      </header>
      <div class="message__content margin-l-enormous">
        <div>
          <p
            class="margin-v-normal"
          >Deploy applications on your Kubernetes cluster with a single click.</p>
        </div>
      </div>
    </div>
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
.alert {
    background-color: #ffffff;
    border-left: 5px solid #00437B;
    box-shadow: 0 4px 25px -3px rgba(0,0,0,0.2);
    overflow: hidden;
    padding: 0.625em 2.5em 0.625em 1.25em;
    position: relative;
}
.margin-c {
    margin-left: auto;
    margin-right: auto;
}
.margin-t-bigger {
    margin-top: 1.875em;
}
</style>