<template>
  <div class="main_login">
    <el-card class="box-card" v-loading="loading" element-loading-text="loading">
      <div class="main">
        <div class="box-card-left">
          <img class="login_img" src="../../.././static/img/login-banner.png" />
        </div>
        <div class="box-card-right">
          <div class="login_title">
            <span>
              <i class="iconfont login_title">&#xe650;</i>
              {{ $t('message.login') }}
            </span>
          </div>
          <div class="login_label">{{$t('message.k8s_api_token')}}</div>
          <el-tooltip
            class="item"
            effect="dark"
            :content=" $t('message.token_warn_alert') "
            placement="bottom"
          >
            <el-input
              style="margin-top: 20px;"
              :placeholder="$t('message.token_placeholder')"
              v-model="input"
              show-password
            ></el-input>
          </el-tooltip>
          <el-button
            plain
            @click="handleToken()"
            style="margin-top:20px;width: 100%;"
          >{{$t('message.login')}}</el-button>
          <div style="margin-top: 50px">
            <span>
              <a
                href="https://github.com/f2c-innovation/kubeapps_plus_dashborad"
                target="_blank"
              >{{$t('message.ask_for_help')}}</a>
            </span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import Store from "../store/store.js";
import apiSetting from "../utils/apiSetting.js";
import http from "../utils/httpAxios.js";
export default {
  name: "mainLogin",
  data() {
    return {
      input: "",
      loading: false
    };
  },
  methods: {
    handleToken() {
      Store.save("accessToken", this.input);
      this.loading = true;
      http(apiSetting.kubernetes.getInfo).then(res => {
        if (res.status == 200) {
          http(apiSetting.kubernetes.getNamespaces).then(resu => {
            if (resu.status == 200) {
              console.log(200);
            } else {
              //Error Message
              this.loading = false
              this.errorMessage()
            }
          });
        } else {
          //Error Message
          this.loading = false
          this.errorMessage()
        }
      });
      // window.alert("Dashboard");
      // this.$router.push("/dashboard")
    },
      errorMessage() {
        const h = this.$createElement;

        this.$notify({
          title: 'Error',
          message: h('i', { style: 'color: black'}, this.$t('message.error_network')),
          type: 'error',
          offset: 100
        });
      },
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
  top: calc(40% - 160px);
  left: calc(50vw - 425px);
  height: 397px;
  width: 850px;
  background-color: white;
}
.login_img {
  max-width: 100%;
  max-height: 100%;
  display: block;
}
.box-card-right {
  position: relative;
  float: left;
  max-width: 397px;
  max-height: 428px;
  padding: 1em;
  margin: 0 0 0 4em;
}
.box-card-left {
  position: relative;
  float: left;
  max-width: 397px;
  max-height: 448px;
}
.main {
  max-width: 100%;
  max-height: 100%;
}
.login_title {
  font-weight: bold;
  font-size: 1.5em;
}
.login_label {
  text-align: left;
  margin-top: 50px;
}
</style>
