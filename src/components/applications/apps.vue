<template>
  <div style="height: calc(100vh - 160px);">
    <div>{{ $route.params.id }}</div>
    <div>{{ $route.params.namespace }}</div>
    <button @click="secret">secret</button>
    <button @click="resource">resource</button>
    <button @click="service">service</button>
  </div>
</template>

<script>
import http from "../utils/httpAxios.js";
import jsyaml from "js-yaml";

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
    this.getResources();
  },
  methods: {
    resource() {
      console.log(this.resources);
    },
    service() {
      console.log(this.services);
    },
    secret() {
      console.log(this.secrets);
    },
    getResources: async function() {
      await http(this.url).then(res => {
        let _this = this;
        jsyaml.loadAll(res.data.data.manifest, function(doc) {
          if (doc.kind == "Secret") {
            _this.secrets.push({ name: doc.metadata.name, data: doc.data });
          } else if (doc.kind == "Service") {
            _this.services.push({ name: doc.metadata.name, kind: doc.kind });
          } else {
            _this.resources.push({ name: doc.metadata.name, kind: doc.kind });
          }
        });
      });
      // await http()
    }
  },
  data() {
    return {
      url: {
        method: "get"
      },
      services: [],
      secrets: [],
      deployments: [],
      resources: [],
      installnation:{},
    };
  }
};
</script>