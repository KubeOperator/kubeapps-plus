<template>
  <div>
    <div>{{ $route.params.id }}</div>
    <div>{{ $route.params.namespace }}</div>
  </div>
</template>

<script>
import http from "../utils/httpAxios.js";
export default {
  created: function() {
    this.url.url =
      "/rpc/api/tiller-deploy/v1/namespaces/" +
      this.$route.params.namespace +
      "/releases/" +
      this.$route.params.id;
    console.log(this.url);
  },
  mounted: function() {
    http(this.url).then(res => {
      console.log(res);
    });
  },
  data() {
    return {
      url: {
        method: "get"
      }
    };
  }
};
</script>