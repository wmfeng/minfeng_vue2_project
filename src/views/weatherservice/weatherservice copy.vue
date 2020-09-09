<template>
  <div>
    气象服务
    <el-date-picker
      @change="changeTime"
      v-model="value1"
      value-format="yyyy-MM-dd"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    ></el-date-picker>
    <el-select v-model="value" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script>
import { getFrost } from "@/api/weather";
export default {
  name: "XXX",
  props: {},
  components: {},
  watch: {},
  data() {
    return {
      // value1: [1593619200000, 1596643200000],
      // 或
      value1: ["2020-7-24", "2020-7-25"],
      options: [],
      value: ''
    };
  },
  methods: {
    changeTime(val) {},
    getYear() {
      let myDate = new Date();
      let startYear = myDate.getFullYear() - 4; //起始年份
      let endYear = myDate.getFullYear() + 4; //结束年份
      for (let i = startYear; i <= endYear; i++) {
        this.options.unshift({ value: i, label: i });
      }
    },

    /* 农业气象 start*/

    // Degree Days Index - Daily - 15 Day（生长度日，热度日冷度日，积温）
    agriculturalMeteorology() {
      let url =
        "/v2/indices/degreeDays/daily/15day?geocode=34.350846,108.952789&language=zh-CN&format=json&apiKey=715688a3fb624aec9688a3fb624aecce";
      getFrost(url).then((res) => {
        console.log("生长度日，热度日冷度日，积温", res);
      });
    },
    // Frost Potential Index - Daypart - 15 Day（霜冻指数）
    frostindex() {
      let url =
        "/v2/indices/frost/daypart/15day?geocode=34.350846,108.952789&language=zh-CN&format=json&apiKey=715688a3fb624aec9688a3fb624aecce";
      getFrost(url).then((res) => {
        console.log("霜冻指数", res);
      });
    },
    // Watering Needs Index - Daypart - 10 Day（需水量指数，灌溉需求）
    irrigationdemand() {
      let url =
        "/v2/indices/wateringNeeds/daypart/10day?geocode=34.350846,108.952789&language=zh-CN&format=json&apiKey=715688a3fb624aec9688a3fb624aecce";
      getFrost(url).then((res) => {
        console.log("需水量指数，灌溉需求", res);
      });
    },
    // Location Services – Point（位置服务-点）
    locationServicePoint() {
      let url =
        "/v3/location/search?query=atlanta&locationType=locid&language=zh-CN&format=json&apiKey=715688a3fb624aec9688a3fb624aecce";
      let url2 =
        "/v3/location/search?query=Lincoln Memorial Circle SW&locationType=address&language=zh-CN&format=json&apiKey=715688a3fb624aec9688a3fb624aecce";
      getFrost(url).then((res) => {
        console.log("位置服务-点", res);
      });
    },
    // Location Services - Search（位置服务-查询）
    locationServicesInquiries() {
      let url =
        "/v3/location/search?query=atlanta&locationType=locid&language=zh-CN&format=json&apiKey=715688a3fb624aec9688a3fb624aecce";
      let url2 =
        "/v3/location/search?query=Lincoln Memorial Circle SW&locationType=address&language=zh-CN&format=json&apiKey=715688a3fb624aec9688a3fb624aecce";
      getFrost(url2).then((res) => {
        console.log("位置服务-点", res);
      });
    },
    // Location Services - Near（位置服务-附近）
    locationServicesNearby() {
      let url =
        "/v3/location/near?geocode=34.350846,108.952789&product=observation&format=json&apiKey=715688a3fb624aec9688a3fb624aecce";
      getFrost(url).then((res) => {
        console.log("位置服务-附近", res);
      });
    },
    // Agriculture - Croptype Lookup15天作物种类，103作物   (接口报400)
    cropType() {
      let url =
        "/v3/wx/forecast/hourly/agriculture/15day?geocode=34.350846,108.952789&format=json&units=e&apiKey=715688a3fb624aec9688a3fb624aecce";
      getFrost(url).then((res) => {
        console.log("作物种类，103作物", res);
      });
    },
    // 15-Day Solar Energy - Hourly Forecast太阳辐照度
    solarIrradiance() {
      let url =
        "/v3/wx/forecast/hourly/energysolar/15day?geocode=34.350846,108.952789&format=json&units=e&apiKey=715688a3fb624aec9688a3fb624aecce";
      getFrost(url).then((res) => {
        console.log("太阳辐照度", res);
      });
    },
    // 7-Day Solar Energy - 15 Minute Forecast
    minuteForecast() {
      let url =
        "/v3/wx/forecast/15minute/energysolar/7day?geocode=34.350846,108.952789&format=json&units=e&apiKey=715688a3fb624aec9688a3fb624aecce";
      getFrost(url).then((res) => {
        console.log("Minute Forecast", res);
      });
    },
    /* 农业气象 end*/

    /*核心气象数据 start*/

    // Alert Headlines 政府发布的告警标题和所要求语⾔的详细信息
    languageDetail() {
      let url =
        "/v3/alerts/headlines?countryCode=US&format=json&language=zh-CN&apiKey=715688a3fb624aec9688a3fb624aecce";
      getFrost(url).then((res) => {
        console.log("政府发布的告警标题和所要求语⾔的详细信息", res);
      });
    },
    // Alert Details所要求语⾔的详细信息
    alllanguageDetail() {
      let url =
        "/v3/alerts/detail?alertId=c092289d-1282-318a-b0c6-ab4c95ee3c57&format=json&language=en-US&apiKey=715688a3fb624aec9688a3fb624aecce";
      getFrost(url).then((res) => {
        console.log("所要求语⾔的详细信息", res);
      });
    },
    // Daily Forecast (3 Day, 5 Day, 7 Day, 10 Day)（预测）
    prediction() {
      let url =
        "/v3/wx/forecast/daily/7day?geocode=34.350846,108.952789&format=json&units=e&language=zh-CN&apiKey=715688a3fb624aec9688a3fb624aecce";
      getFrost(url).then((res) => {
        console.log("预测", res);
      });
    },
    /*核心气象数据 end*/
  },
  created() {},
  mounted() {
    this.getYear();
    // this.agriculturalMeteorology();
  },
};
</script>

<style scoped lang='scss'>
</style>
