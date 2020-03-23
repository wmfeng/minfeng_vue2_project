<template>
  <div class="home">
     <el-button type="primary" @click="newData()">主要按钮</el-button>
     <el-input @focus="change" v-model="input" placeholder="请输入内容"></el-input>
    <!-- <img src="file:///C:/Users/gaoyangad/Pictures/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20190610094428.jpg" alt /> -->
      <newModel :newModal="newModal" :data333="data" @newToggle="newToggle"></newModel>
  </div>
</template>
<script>
import newModel from "./new_Dialog";
export default {
  components: {
    newModel
  },
  data() {
    return {
      newModal: false,
      input: '',
      data: 22222
    };
  },
  methods: {
    change() {
      this.newModal = true;
    },
    newData() {//点击出现模态框
      // this.newModal = true;
      // this.data = 33333;
    },
    newToggle(val) {
      this.newModal = val;
    },
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/variable.scss";
.home {
  height: calc(100vh - #{$logoHeight} - 80px);
  // background: url("../../assets/images/home.png") center center no-repeat / 100%
  //   100%;
}
</style>