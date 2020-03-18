<template>
  <div class="layout">
    <logoBar></logoBar>
    <navBar class="layout_navBar" mode="horizontal"></navBar>
    <div class="layout_body">
      <tabsBar singleAlive></tabsBar>
    </div>
  </div>
</template>
<script>
import logoBar from "@/views/layout/logoBar";
import navBar from "@/views/layout/navBar";
import breadCrumb from "@/views/layout/breadCrumb";
import tabsBar from "@/views/layout/tabsBar";
export default {
  name: "layout",
  components: {
    logoBar,
    navBar,
    breadCrumb,
    tabsBar
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/variable.scss";
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-width: 1000px;
  .layout_navBar {
    height: $navHeight;
    border-bottom: none;
  }
  .layout_body {
    flex: 1;
    height: 0;
  }
}
</style>
<style lang="scss">
@import "../../assets/style/style.scss";
</style>
