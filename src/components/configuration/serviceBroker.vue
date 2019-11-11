<template>
  <div class="app-repositories-content">
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <h1 style="float: left">{{$t('message.service_broker')}}</h1>
        </div>
      </el-col>
    </el-row>

    <el-divider></el-divider>

    <el-alert
            title="警告提示的文案"
            type="warning"
            show-icon>
    </el-alert>
  </div>
</template>

<script>
  import loading from '../utils/loading.js';

  export default {
    data() {
      return {
      }
    },
    created(){
      loading(this, 1000)
      this.init()
    },
    methods: {
      init : async function () {
      }
    }
  }
</script>

<style scoped>
  .app-repositories-content{
    padding: 1em;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 5em;
  }
</style>
