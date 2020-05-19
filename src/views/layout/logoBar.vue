<template>
  <div class="logoBar">
    <div class="logo">
      <!-- <i class="el-icon-goods"></i> -->
      <!-- <a
        href="/help/云南接口文档.docx"
        download="云南接口文档.docx"
        id="help"
        style="color:#fff;font-size:14px; margin-right:30px;"
      >
        使用说明
        <i class="el-icon-download"></i>
      </a> -->
    </div>
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
