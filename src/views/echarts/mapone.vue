<template>
  <div class="echartsMap">
    <div class="mapOne a">
        <mapGodown></mapGodown>
    </div>
    <div class="mapTwo a">one</div>
    <div class="mapThree a">one</div>
    <div class="mapFour a">one</div>
  </div>
</template>

<script>
// import { EchartsMapOne } from "@/assets/echarts/mapone";
import mapGodown from './mapGodown'
export default {
  name: "mapone",
  components: {
      mapGodown
  },
  data() {
    return {};
  },
  methods: {
    // mapOne() {
    //   let oneMap = this.$echarts.init(this.$refs.mapOne);
    //   oneMap.setOption(EchartsMapOne());
    // },
    // intEcharts() {
    //   let oneMap = this.$echarts.init(this.$refs.mapOne);
    //   window.addEventListener("resize", function() {
    //     oneMap.resize();
    //   });
    // }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.echartsMap {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .a {
    width: 49%;
    height: 40vh;
  }
}
</style>
<style lang="scss">
</style>