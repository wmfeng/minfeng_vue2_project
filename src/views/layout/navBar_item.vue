<template>
  <el-menu-item v-if="!item.children||!item.children.length" :index="getPath(item)" :key="item.id">
    <i v-if="getIcon(item)" :class="getIcon(item)"></i>
    <i v-else class="el-icon-tickets"></i>
    <span v-if="getTitle(item)">{{getTitle(item)}}</span>
  </el-menu-item>
  <el-menu-item
    v-else-if="item.children.length===1 && (!item.children[0].children||!item.children[0].children.length)"
    :index="getPath(item)+'/'+getPath(item.children[0])"
    :key="item.children[0].id"
  >
    <i v-if="getIcon(item)" :class="getIcon(item)"></i>
    <i v-else class="el-icon-tickets"></i>
    <span v-if="getTitle(item.children[0])">{{getTitle(item.children[0])}}</span>
  </el-menu-item>
  <el-submenu v-else :index="getPath(item)" :key="item.id">
    <template slot="title">
      <i v-if="getIcon(item)" :class="getIcon(item)"></i>
      <i v-else class="el-icon-tickets"></i>
      <span v-if="getTitle(item)">{{getTitle(item)}}</span>
    </template>
    <!-- <el-scrollbar wrapClass="scrollbar-wrapper"> -->
    <template v-for="child in item.children" v-if="!child.hidden">
      <navbar-item v-if="child.children&&child.children.length" :key="getPath(child)" :item="child"></navbar-item>
      <el-menu-item v-else :index="getPath(item)+'/'+getPath(child)" :key="child.id">
        <span v-if="getTitle(child)">{{getTitle(child)}}</span>
      </el-menu-item>
    </template>
    <!-- </el-scrollbar> -->
  </el-submenu>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "navbarItem",
  props: {
    item: {
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(["navPath", "navTitle", "navIcon"])
  },
  methods: {
    getPath(item) {
      //获取静态路由匹配
      // return (this.navPath && item[this.navPath]) || item.path;
      //接口获取路由匹配
      return (this.navPath && item[this.navPath]) || item.uri;
    },
    getTitle(item) {
      // return (this.navTitle && item[this.navTitle]) || item.meta.title;
      return (this.navTitle && item[this.navTitle]) || item.pName;
    },
    getIcon(item) {
      if (this.navIcon) {
        return item[this.navIcon] || "";
      } else {
        return item.pIcon || "";
      }
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/style/variable.scss";
.el-menu--collapse.navBar {
  .el-menu-item span,
  .el-submenu .el-submenu__title span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }
  .el-submenu .el-submenu__title .el-submenu__icon-arrow {
    display: none;
  }
}
.el-menu--collapse.oneLevel {
  .el-menu-item span,
  .el-submenu .el-submenu__title span {
    height: auto;
    width: auto;
    overflow: hidden;
    visibility: visible;
    display: inline-block;
  }
  .el-submenu .el-submenu__title .el-submenu__icon-arrow {
    display: inline-block;
  }
}
// .el-menu--horizontal.navBar {
//   display: flex;
//   .el-menu-item,
//   .el-submenu {
//     flex: 1;
//     width: 0;
//     text-align: center;
//   }
//   .el-menu-item,
//   .el-submenu .el-submenu__title {
//     height: $navHeight;
//     line-height: $navHeight;
//     padding: 0 8px;
//   }
//   .el-menu-item {
//     padding: 0;
//   }
// }
</style>
