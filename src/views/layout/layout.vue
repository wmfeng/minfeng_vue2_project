<template>
  <div class="layout">
    <logoBar></logoBar>
    <div class="layout_body">
      <el-scrollbar wrapClass="scrollbar-wrapper">
        <navBar class="layout_navBar"></navBar>
      </el-scrollbar>
      <div class="layout_main">
        <breadCrumb></breadCrumb>
        <TagsView></TagsView>
        <div class="main_body">
          <tabsBar singleAlive></tabsBar>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import logoBar from "@/views/layout/logoBar";
import navBar from "./navBar";
import breadCrumb from "./breadCrumb";
import TagsView from "./TagsView";
import tabsBar from "./tabsBar";

export default {
  name: "layout",
  components: {
    logoBar,
    navBar,
    breadCrumb,
    TagsView,
    tabsBar
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/variable.scss";
.layout {
  height: 100vh;
  min-width: 1000px;
  .layout_body {
    display: flex;
    height: calc(100vh - #{$logoHeight});
    .layout_navBar {
      height: calc(100vh - #{$logoHeight});
    }
    .layout_main {
      display: flex;
      flex-direction: column;
      flex: 1;
      width: 0;
      height: 100%;
      .main_body {
        flex: 1;
        height: 0;
        padding: 10px 20px;
      }
    }
  }
}
</style>
<style lang="scss">
@import "../../assets/style/style.scss";
</style>
