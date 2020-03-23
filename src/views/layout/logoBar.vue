<template>
  <div class="logoBar">
    <div class="logo">
      <!-- <i class="el-icon-goods"></i> -->
      project
    </div>
    <headDrop class="drop"></headDrop>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import headDrop from "./headDrop";

export default {
  name: "logoBar",
  components: { headDrop }
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
