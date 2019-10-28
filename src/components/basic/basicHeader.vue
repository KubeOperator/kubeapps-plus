<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      @select="handleSelect"
    >
      <el-menu-item index="1" disabled>
        <img src="../../assets/image/logo.svg" alt="" class="logo_header">
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "basicHeader",
  props: {
    msg: String
  },
  data() {
    return {

    };
  },
  methods: {}
};
</script>

<style scoped>
.logo_header{
  height:2.1875em;
}
</style>