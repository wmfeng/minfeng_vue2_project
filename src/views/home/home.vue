<template>
  <div class="home">
    <!-- <img src="file:///C:/Users/gaoyangad/Pictures/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20190610094428.jpg" alt /> -->
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/variable.scss";
.home {
  height: calc(100vh - #{$logoHeight} - 80px);
  background: url("../../assets/images/home.png") center center no-repeat / 100%
    100%;
}
</style>
