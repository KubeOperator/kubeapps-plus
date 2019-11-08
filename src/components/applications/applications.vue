<template>
  <div class="dashborad" element-loading-text="Loading">
    <el-row style="margin-top:10px;border-bottom: 2px solid #f1f1f1;">
      <el-col :md="6" :lg="4">
        <h1 class="app_title">{{$t('message.application')}}</h1>
      </el-col>
      <el-col :md="{span:4,offest:2}" :lg="3">
        <div style="margin: 1.2em 0;">
          <el-input placeholder="请输入内容">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </el-col>
      <el-col :md="6" :lg="4">
        <div style="margin: 1.8em 0;">
          <el-switch
            v-model="showdelete"
            :active-text="this.$t('message.Show_deleted_apps')"
            inactive-text
          ></el-switch>
        </div>
      </el-col>
      <el-col :md="{span:4,offest:2}" :lg="{span:6,offset:7}">
        <div style="margin: 1.2em 0;">
          <el-button type="primary" @click="getReleaseApp">{{$t('message.Deploy_App')}}</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- <div class="alert margin-c margin-t-bigger">
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
    </div>-->
    <el-row :gutter="20">
      <el-col
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        :xl="4"
        v-for="(catalog, index) in this.releases"
        :key="index"
        class="el-col"
      >
        <el-card :body-style="{ padding: '0px' }" v-if="catalog.status!='DELETED' || showdelete">
          <div class="catalog-image">
            <img
              v-show="catalog.icon"
              :src="catalog.icon"
              class="image"
            />
            <img
              v-show="!catalog.icon"
              src="../../.././static/catalog/default.png"
              class="image"
            />
          </div>
          <div style="padding: 1em;">
            <h3 class="catalog-label">{{catalog.chartMetadata.name}}</h3>
            <div class="bottom clearfix">
              <el-button type="text" class="button-left" disabled>
                <i class="iconfont">&#xe67b;</i>
                &nbsp;{{catalog.version}}
              </el-button>
              <el-button
                size="small"
                type="primary"
                class="button-right"
                round
              >{{catalog.namespace}}</el-button>
              <el-button
                :type="catalog.status != 'DELETED'?'success':'warning'"
                size="small"
                class="button-right"
                round
              >{{catalog.status}}</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import Store from "./store/store.js";
// import apiSetting from "../utils/apiSetting.js";
// import http from "../utils/httpAxios.js";
export default {
  name: "dashboard",
  data() {
    return {
      showdelete: true,
      radio: "",
      loading: false,
      releases: []
    };
  },
  created: function() {},
  mounted: function() {
    this.$store.dispatch("getRelease");
  },
  methods: {
    getReleaseApp() {
      console.log(this.releases);
    }
  },
  computed: {
    getRelease() {
      return this.$store.state.namespaces.releases;
    },
    getLoadingState() {
      return this.$store.state.namespaces.loadingState;
    },
    getReleaseApi() {
      return this.$store.state.namespaces.api;
    }
  },
  watch: {
    getLoadingState(val) {
      this.loading = val;
    },
    getRelease(val) {
      this.releases = val.data;
    }
  }
};
</script>
<style scoped>
.app_title {
}
.alert {
  background-color: #ffffff;
  border-left: 5px solid #00437b;
  box-shadow: 0 4px 25px -3px rgba(0, 0, 0, 0.2);
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
.dashborad {
  height: calc(100vh - 160px);
}
.catalog-content {
  padding: 1em;
}
.grid-content {
  border-radius: 4px;
  min-height: 5em;
}
.catalog-search {
  float: left;
  width: 40%;
  margin: 20px 0 0 1em;
}
.bottom {
  margin-top: 20px; 
  line-height: 12px;
  text-align: left;
}

.button-left {
  padding: 5px 0 5px 5px;
  float: left;
  height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.button-right {
  padding: 5px;
  float: right;
}

.image {
  max-width: 7em;
  max-height: 6em;
  display: block;
  margin: 1em;
}

.el-col {
  padding: 10px 0;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.catalog-image {
  display: flex;
  height: calc(72px + 2em);
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  text-align: center;
  background-color: #f1f1f1;
  box-sizing: border-box;
}

.catalog-desc {
  height: 2em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.catalog-label {
  word-wrap: break-word;
  text-align: center;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  font-size: 1.1em;
  font-weight: 700;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
