<template>
  <el-breadcrumb class="breadCrumb">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in breadList" :key="item.path" v-if="item.meta.title">
        <i class="el-icon-document breadCrumb_icon" v-if="!index"></i>
        <span  class="no-redirect">{{item.meta.title}}</span>
        <!-- <span v-if="item.redirect==='noredirect'||index==breadList.length-1"  class="no-redirect">{{item.meta.title}}</span> -->
        <!-- <router-link v-else :to="item.redirect||item.path" tag="span">{{item.label}}</router-link> -->
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "breadCrumb",
  created() {
    this.getBreadcrumb();
  },
  data() {
    return {
      navBar: [],
      breadList: null
    };
  },
  computed: {
    //由于兼容性问题，暂时弃用
    // navBar() {
    //     let navs = this.$store.getters.navBar.flatMap(x => {
    //         let arr = [x, x.children];
    //         //三级菜单
    //         if (x.children.children && x.children.children.length) {
    //             arr.push(x.children.children);
    //         }
    //         return arr;
    //     });
    //     navs = navs.flat();
    //     return navs;
    // }
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  computed: {
    ...mapGetters(["navPath", "navTitle"])
  },
  methods: {
    setNavs(navBar) {
      navBar.map(s => {
        this.navBar.push(s);
        if (s.children && s.children.length) {
          this.setNavs(s.children);
        }
      });
    },
    getBreadcrumb() {
      if (!this.navBar.length) {
        this.setNavs(this.$store.getters.navBar);
      }
      let _this = this;
      let matched = this.$route.matched;
      matched.map(m => {
        let nav = _this.navBar.find(n => {
          if (this.navPath) {
            return n[this.navPath] == m.path || n[this.navPath] == m.name;
          } else {
            return n.path == m.path || n.path == m.name;
          }
        });
        if (nav) {
          m.title =
            (this.navTitle && nav[this.navTitle]) || nav.title;
        }
      });
      this.breadList = matched;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/variable.scss";
.breadCrumb {
  padding: 0 20px;
  line-height: 55px;
  border-bottom: 1px dotted #dedede;
  .breadCrumb_icon {
    color: $color;
  }
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
<style lang="scss">
@import "../../assets/style/variable.scss";
.breadCrumb {
  .el-breadcrumb__inner span {
    color: $color;
    cursor: pointer;
  }
  &.el-breadcrumb {
    display: inline-block;
  }
}
.breadcrumb-enter-active {
  transition: all 0.5s ease;
}
.breadcrumb-leave-active {
  transition: all 0.2s ease;
}
.breadcrumb-enter,
.breadcrumb-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.breadcrumb-move {
  transition: all 0.5s;
}
.breadcrumb-leave-active {
  position: absolute;
}
</style>
