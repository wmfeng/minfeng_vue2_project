<template>
  <div class="logoBar">
    <div class="logo">
      <el-radio-group v-model="lang" size="small">
        <el-radio label="zh" border>简体中文</el-radio>
        <el-radio label="en" border>English</el-radio>
      </el-radio-group>
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
  computed: {
    lang: {
      get() {
        return this.$store.state.app.language;
      },
      set(lang) {
        this.$i18n.locale = lang;
        this.$store.dispatch("setLanguage", lang);
      }
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/variable.scss";
.logoBar {
  height: $logoHeight;
  background-color: #4497d1;
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
