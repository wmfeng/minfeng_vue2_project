<template>
  <div>地图下钻</div>
</template>

<script>
// import { EchartsMapOne } from "@/assets/echarts/mapone";
export default {
  name: "mapGodown",
  data() {
    return {};
  },
  methods: {
    mapOne() {
      let oneMap = this.$echarts.init(this.$refs.mapOne);
    },
    intEcharts() {
      let oneMap = this.$echarts.init(this.$refs.mapOne);
      window.addEventListener("resize", function() {
        oneMap.resize();
      });
    }
  },
  mounted() {}
};
</script>

<style>
</style>