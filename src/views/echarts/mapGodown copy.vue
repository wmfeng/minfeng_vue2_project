<template>
  <div class="mapgodown" ref="mapGodown"></div>
</template>

<script>
import { EchartsMapGodown } from "@/assets/echarts/mapone";
export default {
  name: "mapGodown",
  data() {
    return {};
  },
  methods: {
    mapOne() {
      let oneMap = this.$echarts.init(this.$refs.mapGodown);
    },
    intEcharts() {
      let oneMap = this.$echarts.init(this.$refs.mapGodown);
      window.addEventListener("resize", function() {
        oneMap.resize();
      });
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.mapgodown{
  height:40vh;
}
</style>