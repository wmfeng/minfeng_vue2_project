<template>
  <div class="logoBar">
    <div class="logo"></div>
    <headDrop class="drop"></headDrop>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import headDrop from "./headDrop";
import axios from "axios";

export default {
  name: "logoBar",
  components: { headDrop },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/variable.scss";
.logoBar {
  height: $logoHeight;
  background-color: $color;
  .logo {
    float: left;
    width: 50%;
    height: 100%;
    padding-left: 50px;
    font-size: 40px;
    font-weight: bold;
    color: #fff;
    line-height: $logoHeight;
  }
}
</style>
