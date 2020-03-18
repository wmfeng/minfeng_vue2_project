<template>
  <el-menu
    :class="['navBar',{'oneLevel':navOpen,'hori':mode!='vertical'}]"
    unique-opened
    router
    :mode="mode"
    :collapse="mode=='vertical'"
    :default-active="$route.path"
    background-color="#313437"
    text-color="#fff"
  >
    <el-menu-item index class="navBar_title" @click="collapse" v-if="mode=='vertical'">
      <i class="el-icon-menu menu_icon"></i>
      <span>功能菜单</span>
    </el-menu-item>
    
    <navbar-item v-for="item in navBar" :item="item" v-if="!item.hidden" :key="item.path"></navbar-item>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import navbarItem from "./navBar_item";

export default {
  name: "navBar",
  components: { navbarItem },
  props: {
    mode: {
      default: "vertical"
    }
  },
  methods: {
    collapse() {
      this.$store.commit("SET_NAVOPEN");
    }
  },
  computed: {
    ...mapGetters(["navBar", "navOpen"])
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/variable.scss";
.navBar {
  transition: all 0.3s;
  height: 100%;
  &.hori {
    padding-right: 7%;
    li {
      float: right;
    }
  }
}
.oneLevel {
  width: 200px;
  .el-menu-item span {
    height: auto;
    width: auto;
    overflow: hidden;
    visibility: visible;
    display: inline-block;
  }
}
.menu_icon {
  color: $color !important;
}
</style>
<style lang="scss">
@import "../../assets/style/variable.scss";
.navBar {
  .navBar_title {
    color: $color !important;
    border-bottom: 1px solid $color;
  }
  .navBar_dropdown {
    width: 170px;
    .el-dropdown {
      float: right;
    }
  }
}
</style>
