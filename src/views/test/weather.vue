<template>
  <div class="weather">
    <div class="header"></div>

    <div id="map"></div>
    <div class="fourbox" v-show="!drawer">
      <span :class="[active4?wd:wdactive]" @click="weatherChange(weatherObj.temp,active4)"></span>
      <span :class="[active1?fs:fstive]" @click="weatherChange(weatherObj.windSpeed,active1)"></span>
      <span :class="[active2?jx:jxactive]" @click="weatherChange(weatherObj.snow24hr,active2)"></span>
      <span :class="[active3?js:jsactive]" @click="weatherChange(weatherObj.precip24hr,active3)"></span>
    </div>
    <div class="zsfxBtn">
      <!-- <el-select
        v-model="left_top_value"
        placeholder="请选择"
        style="width:7vw;"
        @change="getSelected"
      >
        <el-option label="农村资源" value="1"></el-option>
        <el-option label="产业分布" value="2"></el-option>
        <el-option label="气象监测" value="3"></el-option>
      </el-select>-->
      <!-- <el-button @click="drawer = !drawer" style="margin-left: 16px;">点我打开</el-button> -->
      <div :class="[isActive1 ? yx : yxactive]" @click="drawer = !drawer"></div>
      <!-- <el-switch v-model="weatherObj.precip24hr.value" active-color="#13ce66" inactive-color="#ff4949" @change="weatherChange(weatherObj.precip24hr)" >{{weatherObj.precip24hr.name}}</el-switch>
      <el-switch v-model="weatherObj.snow24hr.value" active-color="#13ce66" inactive-color="#ff4949" @change="weatherChange(weatherObj.snow24hr)" >{{weatherObj.snow24hr.name}}</el-switch>
      <el-switch v-model="weatherObj.temp.value" active-color="#13ce66" inactive-color="#ff4949" @change="weatherChange(weatherObj.temp)" >{{weatherObj.temp.name}}</el-switch>
      <el-switch v-model="weatherObj.windSpeed.value" active-color="#13ce66" inactive-color="#ff4949" @change="weatherChange(weatherObj.windSpeed)" >{{weatherObj.windSpeed.name}}</el-switch>-->
    </div>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated bounceInLeft"
      leave-active-class="animated bounceOutLeft"
    >
      <div class="weather_left" v-if="drawer">
        <div class="weather_left_son1">
          <div class="allTitle">
            <span style="margin-left:10px;">近日天气预报</span>
          </div>
          <el-row class="ele_row">
            <el-col :span="8" class="ele_col">
              <div class="tianqi_jintian">
                <span>{{todayObj.fcst_valid_local | dataFormat}}</span>
                <span>{{todayObj.dow}}</span>
                <img :src="imgSrc" />
                <span>{{todayObj.mintemp | conversion}} ~ {{todayObj.maxtemp | conversion}}℃</span>
                <span>风速：{{todayObj.windSpeed}}m/s</span>
                <span>{{todayObj.wdir_cardinal}}</span>
              </div>
            </el-col>
            <el-col :span="4" v-for="(item,index) in 4" :key="index" class="ele_col">
              <div class="nextday grid-content bg-purple tqyb">
                <span class="tqRq">{{otherdayObj.fcst_valid_local[index+1] | dataFormat}}</span>
                <span class="tqSj">{{otherdayObj.dow[index+1]}}</span>
                <img :src="oimgSrc[index+1]" />
                <span
                  class="tqWd"
                >{{otherdayObj.mintemp[index+1] | conversion}} ~ {{otherdayObj.maxtemp[index+1] | conversion}}℃</span>
                <span class="tqFs">{{otherdayObj.windSpeed[index+1]}}m/s</span>
                <span class="tqFx">{{otherdayObj.wdir_cardinal[index+1]}}</span>
              </div>
            </el-col>
          </el-row>
          <div class="to_date">
            <div class="date_echarts" id="date_echarts" v-if="switchs === '温度'"></div>
            <div class="date_echarts" id="wind_echarts" v-if="switchs === '风力'"></div>
            <div class="date_echarts" v-show="switchs === '降水'">
              <el-row style="height:100%">
                <el-col :span="2" v-for="(item,index) in tianqi" :key="index" style="height:100%">
                  <div class="jsl">
                    <span>{{item.times}}</span>
                    <span>{{item.maximum}}</span>
                    <span>{{item.uvIndex}}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="date_btn">
              <span @click="btn_switch('温度')" :class="switchs=='温度'?'transparens':''">12小时温度</span>
              <span @click="btn_switch('风力')" :class="switchs=='风力'?'transparens':''">风力风向</span>
              <span @click="btn_switch('降水')" :class="switchs=='降水'?'transparens':''">紫外线指数</span>
            </div>
          </div>
        </div>
        <div class="weather_left_son">
          <div class="allTitle">
            <span style="margin-left:10px;">近日霜降指数</span>
          </div>
          <div class="frost_echarts" id="frost_echarts"></div>
        </div>
      </div>
    </transition>
    <!-- <div class="mldhbox"> -->
    <div class="zsfxBtn1" v-if="drawer">
      <div class="nczy" @click="getSelected('nczy')"></div>
      <div class="cyfb" @click="getSelected('cyfb')"></div>
      <div class="jcfx" @click="getSelected('jcfx')"></div>
      <div class="stzl" @click="getSelected('stzl')"></div>
    </div>
    <div class="radioBtn" v-if="drawer">
      <div :class="[isActive1 ? nyjc : nyjcactive]" @click="right_top_value_btn('nyjc')"></div>
      <div :class="[isActive2 ? qxjc : qxjcactive]" @click="right_top_value_btn('qxjc')"></div>
      <div :class="[isActive3 ? bhjc : bhjcactive]" @click="right_top_value_btn('bhjc')"></div>
      <div :class="[isActive4 ? scjc : scjcactive]" @click="right_top_value_btn('scjc')"></div>
    </div>
    <!-- </div> -->
    <div class="radioBtn" v-if="drawer">
      <div :class="[isActive1 ? nyjc : nyjcactive]" @click="right_top_value_btn('nyjc')"></div>
      <div :class="[isActive2 ? qxjc : qxjcactive]" @click="right_top_value_btn('qxjc')"></div>
      <div :class="[isActive3 ? bhjc : bhjcactive]" @click="right_top_value_btn('bhjc')"></div>
      <div :class="[isActive4 ? scjc : scjcactive]" @click="right_top_value_btn('scjc')"></div>
    </div>
    <!-- </div> -->
    <transition
      name="custom-classes-transition"
      enter-active-class="animated bounceInRight"
      leave-active-class="animated bounceOutRight"
    >
      <div class="weather_right" v-if="drawer">
        <div class="weather_right_son1">
          <div class="allTitle">
            <span style="margin-left:10px;">近日干旱指数</span>
          </div>
          <div class="drought_echarts" id="drought_echarts"></div>
        </div>
        <div class="weather_right_son1">
          <div class="allTitle">
            <span style="margin-left:10px;">近日降水指数</span>
          </div>
          <div class="drought_echarts" id="rainfall_echarts"></div>
        </div>
        <div class="weather_right_son1">
          <div class="allTitle">
            <span style="margin-left:10px;">未来5天大豆农事风险预警</span>
          </div>
          <div class="all_teble">
            <el-row style="marginBottom:0.5vh">
              <el-col :span="5">
                <div class="grid-content rq">
                  <!-- <i style="font-size:20px;color:#9da9b8" class="iconfont icon-riqi"></i>
                  <span style="font-size:10px;color:#9da9b8">日期</span>-->
                </div>
              </el-col>
              <el-col :span="7">
                <div class="grid-content zs">
                  <!-- <i style="font-size:20px;color:#9da9b8" class="iconfont icon-yibiaopan"></i>
                  <span style="font-size:10px;color:#9da9b8">指数</span>-->
                </div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content cy">
                  <!-- <i style="font-size:20px;color:#9da9b8" class="iconfont icon-chayangji"></i>
                  <span style="font-size:10px;color:#9da9b8">插秧</span>-->
                </div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content gg">
                  <!-- <i style="font-size:20px;color:#9da9b8" class="iconfont icon-guangaixitong"></i>
                  <span style="font-size:10px;color:#9da9b8">灌溉</span>-->
                </div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content dy">
                  <!-- <i style="font-size:20px;color:#9da9b8" class="iconfont icon-nongyao"></i>
                  <span style="font-size:10px;color:#9da9b8">打药</span>-->
                </div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content sh">
                  <!-- <i style="font-size:20px;color:#9da9b8" class="iconfont icon-shouhuo"></i>
                  <span style="font-size:10px;color:#9da9b8">收获</span>-->
                </div>
              </el-col>
            </el-row>
            <el-row class="ele_row" v-for="item in dateArr" :key="item.date">
              <el-col :span="5" class="ele_col">
                <div class="bg-purple">
                  <span style="font-size:10px;color:#9da9b8">{{item.date}}</span>
                </div>
              </el-col>
              <el-col :span="6" class="ele_col">
                <div class="bg-purple">
                  <i
                    :class="item.zhishu==0?'el-icon-error':item.zhishu==1 || item.zhishu ==2?'el-icon-warning':'el-icon-success'"
                    :style="{'font-size':'10px','color':item.zhishu==0?'#c45c73':item.zhishu==1 || item.zhishu==2?'#ffd769':'#5fbb71'}"
                  ></i>
                </div>
              </el-col>
              <el-col :span="3" class="ele_col">
                <div class="bg-purple">
                  <i
                    :class="item.qita==0?'el-icon-error':item.qita==1 || item.qita ==2?'el-icon-warning':'el-icon-success'"
                    :style="{'font-size':'10px','color':item.qita==0?'#c45c73':item.qita==1 || item.qita==2?'#ffd769':'#5fbb71'}"
                  ></i>
                </div>
              </el-col>
              <el-col :span="3" class="ele_col">
                <div class="bg-purple">
                  <i
                    :class="item.zhishu==0?'el-icon-error':item.zhishu==1 || item.zhishu ==2?'el-icon-warning':'el-icon-success'"
                    :style="{'font-size':'10px','color':item.zhishu==0?'#c45c73':item.zhishu==1 || item.zhishu==2?'#ffd769':'#5fbb71'}"
                  ></i>
                </div>
              </el-col>
              <el-col :span="3" class="ele_col">
                <div class="bg-purple">
                  <i
                    :class="item.qita==0?'el-icon-error':item.qita==1 || item.qita ==2?'el-icon-warning':'el-icon-success'"
                    :style="{'font-size':'10px','color':item.qita==0?'#c45c73':item.qita==1 || item.qita==2?'#ffd769':'#5fbb71'}"
                  ></i>
                </div>
              </el-col>
              <el-col :span="3" class="ele_col">
                <div class="bg-purple">
                  <i
                    :class="item.zhishu==0?'el-icon-error':item.zhishu==1 || item.zhishu ==2?'el-icon-warning':'el-icon-success'"
                    :style="{'font-size':'10px','color':item.zhishu==0?'#c45c73':item.zhishu==1 || item.zhishu==2?'#ffd769':'#5fbb71'}"
                  ></i>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" :offset="2">
                <div class="bg-purple" style="color:#c45c73">
                  <i class="el-icon-error" style="font-size:10px;"></i>
                  <span style="font-size:12px;">不适宜</span>
                </div>
              </el-col>
              <el-col :span="6" :offset="2">
                <div class="bg-purple" style="color:#ffd769">
                  <i class="el-icon-warning" style="font-size:10px;"></i>
                  <span style="font-size:12px;">需注意</span>
                </div>
              </el-col>
              <el-col :span="6" :offset="2">
                <div class="bg-purple" style="color:#5fbb71">
                  <i class="el-icon-success" style="font-size:10px;"></i>
                  <span style="font-size:12px;">较适宜</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </transition>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated bounceInUp"
      leave-active-class="animated bounceOutDown"
    >
      <el-row class="weather_bottom" id="sjLine">
        <!-- <el-col :span="20" :offset="2" class="ele_col">
          <div class="grid-content bg-purple-dark"></div>
        </el-col>-->
      </el-row>
    </transition>
  </div>
</template>
<script>
import { initMap, changeIBM } from "@/api/map/weather_map";
import { createCharts, navOpenEch, getDateArr } from "@/api/weather.js";
import { getFrost } from "@/api/method";
import { formatDate } from "@/utils/data";
export default {
  name: "weather",
  components: {},
  data() {
    return {
      weatherObj: {
        precip24hr: {
          name: "降水",
          value: false,
          objId: "precip24hr"
        },
        snow24hr: {
          name: "降雪",
          value: false,
          objId: "snow24hr"
        },
        temp: {
          name: "温度",
          value: false,
          objId: "temp"
        },
        windSpeed: {
          name: "风速",
          value: false,
          objId: "windSpeed"
        }
      },
      drawer: true,
      direction: "rtl",
      dateArr: [],
      todayObj: {},
      otherdayObj: {
        fcst_valid_local: [],
        dow: [],
        mintemp: [],
        maxtemp: [],
        windSpeed: [],
        wdir_cardinal: []
      },
      ztslfbshowhide: false,
      activeclass: false,
      activeclass1: false,
      isActive1: true,
      isActive2: false,
      nyjcactive: "nyjcactive",
      qxjcactive: "qxjcactive",
      nyjc: "nyjc",
      qxjc: "qxjc",
      switchs: "温度",
      tianqi: [],
      ztslfbshowhide: false,
      activeclass: false,
      activeclass1: false,
      isActive1: true,
      isActive2: false,
      isActive3: true,
      isActive4: true,
      nyjcactive: "nyjcactive",
      qxjcactive: "qxjcactive",
      nyjc: "nyjc",
      qxjc: "qxjc",
      bhjc: "bhjc",
      scjc: "scjc",
      imgSrc: "",
      oimgSrc: [],
      myCharttiemLine: "",
      isActive1: true,
      yx: "yx",
      yxactive: "yxactive",
      active1: true,
      active2: true,
      active3: true,
      active4: true,
      js: "js",
      jx: "jx",
      wd: "wd",
      fs: "fs",
      wdactive: "wdactive",
      fstive: "fstive",
      jxactive: "jxactive",
      jsactive: "jsactive"
    };
  },
  filters: {
    dataFormat(msg) {
      return formatDate(msg, "yyyy-MM-dd");
    },
    conversion(msg) {
      //       通过公式：C（摄氏度）=(F（华氏度）-32)÷1.8来转换。

      // 摄氏温标（C）和华氏温标（F）之间的换算关系为：

      // F=C×1.8+32

      // C=(F-32)÷1.8
      return ((msg - 23) / 1.8).toFixed(0);
    }
  },
  methods: {
    //

    //右上小类型切换
    right_top_value_btn(val) {
      this.ztslfbshowhide = false;
      // debugger
      if (val == "qxjc") {
        this.isActive2 = false;
        this.isActive1 = true;
        // changeCY("cyfb1");
        this.$router.push({ path: "/weather" });
      } else if (val == "nyjc") {
        this.ztslfbshowhide = true;
        this.isActive1 = false;
        this.isActive2 = true;
        this.$router.push({
          name: "nyjc",
          params: {
            page: "nyjc"
          }
        });
        // changeCY("cyfb1");
      } else if (val == "bhjc") {
        this.$router.push({
          name: "nyjc",
          params: {
            page: "bhjc"
          }
        });
      } else if (val == "scjc") {
        this.$router.push({
          name: "nyjc",
          params: {
            page: "scjc"
          }
        });
      }
    },

    // 左上类型切换
    getSelected(val) {
      if (val == "cyfb") {
        this.$router.push({ path: "/cyfb" });
      } else if (val == "nczy") {
        this.$router.push({ path: "/qyst" });
      } else if (val == "jcfx") {
        this.$router.push({ path: "/nyjc" });
      } else if (val == "stzl") {
        this.$router.push({ path: "/stzl" });
      }
    },
    weatherChange(temp, val) {
      if (temp.name == "风速") {
        this.active1 = !this.active1;
        changeIBM(temp.objId, val);
      } else if (temp.name == "温度") {
        this.active4 = !this.active4;
        changeIBM(temp.objId, val);
      } else if (temp.name == "降雪") {
        this.active2 = !this.active2;
        changeIBM(temp.objId, val);
      } else if (temp.name == "降水") {
        this.active3 = !this.active3;
        changeIBM(temp.objId, val);
      }
    },
    getFrost() {
      let _this = this;
      let url =
        "https://api.weather.com/v2/indices/frost/daypart/15day?geocode=34.350846,108.952789&language=en-US&format=json&apiKey=715688a3fb624aec9688a3fb624aecce";
      getFrost(url)
        .then(res => {
          if (res.status === 200) {
            let { data } = res;
            let arr = data.frostPotentialIndex12hour.fcstValidLocal.map(i => {
              return i.substring(5, 10);
            });
            Array.from(new Set(arr))
              .slice(0, 5)
              .forEach(i => {
                this.dateArr.push({ date: i });
              });
            let seriesData0 = [];
            let seriesData1 = [];
            let arrlengt =
              data.frostPotentialIndex12hour.frostPotentialIndex.length;
            for (var i = 0; i < arrlengt; i++) {
              if (i % 2) {
                seriesData1.push(
                  data.frostPotentialIndex12hour.frostPotentialIndex[i]
                );
              } else {
                seriesData0.push(
                  data.frostPotentialIndex12hour.frostPotentialIndex[i]
                );
              }
            }
            seriesData0.slice(0, 7).forEach((v, i) => {
              _this.dateArr[i].zhishu = v;
            });
            seriesData1.slice(0, 7).forEach((v, i) => {
              _this.dateArr[i].qita = v;
            });
          }
        })
        .catch(err => {});
    },
    async getweather() {
      try {
        let url =
          "https://api.weather.com/v3/wx/forecast/daily/15day?geocode=34.350846,108.952789&format=json&units=e&language=zh-CN&apiKey=715688a3fb624aec9688a3fb624aecce";
        // let url = "https://api.weather.com/v3/wx/conditions/historical/hourly/1day?geocode=34.350846,108.952789&language=zh-CN&format=json&units=e&apiKey=715688a3fb624aec9688a3fb624aecce";

        let res = await getFrost(url);
        if (res.status === 200) {
          let { data } = res;
          console.log(data);
          this.$set(
            this.todayObj,
            "fcst_valid_local",
            data.moonsetTimeLocal[0]
          );
          this.$set(this.todayObj, "dow", data.dayOfWeek[0]);
          if (data.daypart[0].iconCode[0]) {
            this.$set(
              this.todayObj,
              "weatherIcon",
              data.daypart[0].iconCode[0]
            );
            this.$set(
              this.todayObj,
              "wdir_cardinal",
              data.daypart[0].windDirectionCardinal[0]
            );
            this.$set(this.todayObj, "windSpeed", data.daypart[0].windSpeed[0]);
            this.$set(this.todayObj, "mintemp", data.temperatureMin[0]);
            this.$set(this.todayObj, "maxtemp", data.temperatureMax[0]);
          } else {
            this.$set(
              this.todayObj,
              "weatherIcon",
              data.daypart[0].iconCode[1]
            );
            this.$set(
              this.todayObj,
              "wdir_cardinal",
              data.daypart[0].windDirectionCardinal[1]
            );
            this.$set(this.todayObj, "windSpeed", data.daypart[0].windSpeed[1]);
            this.$set(this.todayObj, "mintemp", data.temperatureMin[1]);
            this.$set(this.todayObj, "maxtemp", data.temperatureMax[1]);
          }
          this.imgSrc = require("../../assets/images/qyst/IBM/weather/" +
            this.todayObj.weatherIcon +
            ".png");

          this.$set(
            this.otherdayObj,
            "fcst_valid_local",
            data.moonsetTimeLocal
          );
          this.$set(this.otherdayObj, "dow", data.dayOfWeek);

          let iconCode = [];
          let windDirectionCardinal = [];
          let windSpeed = [];
          let temperatureMin = [];
          let temperatureMax = [];
          if (data.daypart[0].iconCode[0]) {
            for (let m = 0; m < 15; m += 2) {
              iconCode.push(data.daypart[0].iconCode[m]);
              windDirectionCardinal.push(
                data.daypart[0].windDirectionCardinal[m]
              );
              windSpeed.push(data.daypart[0].windSpeed[m]);
              temperatureMin.push(data.temperatureMin[m]);
              temperatureMax.push(data.temperatureMax[m]);
            }
            this.$set(this.otherdayObj, "weatherIcon", iconCode);
            this.$set(this.otherdayObj, "wdir_cardinal", windDirectionCardinal);
            this.$set(this.otherdayObj, "windSpeed", windSpeed);
            this.$set(this.otherdayObj, "mintemp", temperatureMin);
            this.$set(this.otherdayObj, "maxtemp", temperatureMax);
          } else {
            for (let n = 0; n < 15; n += 2) {
              iconCode.push(data.daypart[0].iconCode[n]);
              windDirectionCardinal.push(
                data.daypart[0].windDirectionCardinal[n]
              );
              windSpeed.push(data.daypart[0].windSpeed[n]);
              temperatureMin.push(data.temperatureMin[n]);
              temperatureMax.push(data.temperatureMax[n]);
            }
            this.$set(this.otherdayObj, "weatherIcon", iconCode);
            this.$set(this.otherdayObj, "wdir_cardinal", windDirectionCardinal);
            this.$set(this.otherdayObj, "windSpeed", windSpeed);
            this.$set(this.otherdayObj, "mintemp", temperatureMin);
            this.$set(this.otherdayObj, "maxtemp", temperatureMax);
          }

          let key = data.daypart[0].iconCode[0] ? 0 : 1;
          let oimgSrcD = [];
          for (key; key <= this.otherdayObj.weatherIcon.length; key++) {
            this.oimgSrc.push(
              require("../../assets/images/qyst/IBM/weather/" +
                this.otherdayObj.weatherIcon[key] +
                ".png")
            );
          }
        }
      } catch (err) {}
    },
    btn_switch(val) {
      this.switchs = val;
      if (val == "温度") {
        // EchartDispose("wind_echarts");
        getDateArr(val);
      } else if (val == "风力") {
        getDateArr(val);
      } else {
        this.getTian();
      }
    },
    getTian() {
      let url =
        "https://api.weather.com/v3/wx/forecast/hourly/2day?geocode=34.350846,108.952789&format=json&units=e&language=zh-CN&apiKey=715688a3fb624aec9688a3fb624aecce";
      getFrost(url).then(res => {
        if (res.status === 200) {
          let { data } = res;
          this.tianqi = [];
          for (var i = 0; i < data.validTimeLocal.length / 4; i++) {
            this.tianqi.push({
              times: formatDate(data.validTimeLocal[i], "hh:mm"),
              maximum: data.uvDescription[i],
              uvIndex: data.uvIndex[i]
            });
          }
        }
      });
    },
    timeLineInt() {
      var year = ["2016", "2017", "2018"];
      this.myCharttiemLine = echarts.init(document.getElementById("sjLine"));
      var optionXyMap01 = {
        timeline: {
          data: year,
          axisType: "category",
          autoPlay: true,
          playInterval: 5000,
          left: "10%",
          right: "10%",
          bottom: "3%",
          width: "80%",
          //  height: null,
          label: {
            normal: {
              textStyle: {
                color: "#69bcc8"
              }
            },
            emphasis: {
              textStyle: {
                color: "#69bcc8"
              }
            }
            // formatter: function(s) {
            //   console.log(s);
            //   return s
            //   // return formatDate(s, 'yyyy-MM');
            // }
          },
          symbolSize: 10,
          lineStyle: {
            color: "#69bcc8"
          },
          checkpointStyle: {
            borderColor: "#69bcc8",
            borderWidth: 2
          },
          controlStyle: {
            showNextBtn: true,
            showPrevBtn: true,
            normal: {
              color: "#69bcc8",
              borderColor: "#69bcc8"
            },
            emphasis: {
              color: "#69bcc8",
              borderColor: "#69bcc8"
            }
          }
        },
        options: []
      };

      this.myCharttiemLine.setOption(optionXyMap01);
      this.myCharttiemLine.on("timelinechanged", function(timeLineIndex) {
        // 此处为时间轴监听
      });
    }
  },
  mounted() {
    this.getFrost();
    this.getweather();
    initMap();
    createCharts();
    var _this = this;
    this.btn_switch("温度");
    this.timeLineInt();
    window.onresize = function() {
      navOpenEch();
      _this.myCharttiemLine.resize();
    };
  },
  watch: {
    drawer(val) {
      if (val) {
        createCharts();
        this.btn_switch("温度");
      }

      this.isActive1 = !this.isActive1;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/variable.scss";
.weather {
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: url("../../assets/images/bj.png") center center no-repeat / 100%
    100%;
  .fourbox {
    position: absolute;
    right: 100px;
    top: 100px;
    // border: 1px solid red;
    width: 300px;
    line-height: 50px;
    height: 50px;
    background: url("../../assets/images/wea/bgbg.png") center center no-repeat /
      100%;
    span {
      display: inline-block;
      width: 22px;
      height: 23px;
      margin-left: 42px;
    }
    .js {
      background: url("../../assets/images/wea/tianqizitiku.png") center center
        no-repeat / 100%;
    }
    .fs {
      background: url("../../assets/images/wea/wind.png") center center
        no-repeat / 100%;
    }
    .wd {
      background: url("../../assets/images/wea/turangwendu.png") center center
        no-repeat / 100%;
    }
    .jx {
      background: url("../../assets/images/wea/huaban.png") center center
        no-repeat / 100%;
    }
    .jsactive {
      background: url("../../assets/images/wea/shui.png") center center
        no-repeat / 100%;
    }
    .fstive {
      background: url("../../assets/images/wea/feng.png") center center
        no-repeat / 100%;
    }
    .wdactive {
      background: url("../../assets/images/wea/wen.png") center center no-repeat /
        100%;
    }
    .jxactive {
      background: url("../../assets/images/wea/xue.png") center center no-repeat /
        100%;
    }
  }
  #map {
    width: 100%;
    height: 100%;
  }
  .header {
    height: 9vh;
    width: 100%;
    background: url("../../assets/images/logo_bj.png") center center no-repeat /
      100% 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    // span {
    //   width: 12vw;
    //   height: 4vh;
    //   display: inline-block;
    //   position: absolute;
    //   left: 44vw;
    //   top: 6.8vh;
    //   text-align: center;
    //   font-size: 1.6vw;
    //   font-family: "YouYuan";
    //   font-weight: bold;
    //   color: rgba(34, 164, 255, 1);
    //   text-shadow: 0px 8px 30px rgba(0, 0, 0, 0.5);
    //   background: linear-gradient(
    //     0deg,
    //     rgba(75, 161, 185, 1) 0%,
    //     rgba(160, 219, 230, 1) 99.4873046875%
    //   );
    //   -webkit-background-clip: text;
    //   -webkit-text-fill-color: transparent;
    // }
  }
  .zsfxBtn {
    width: 7vh;
    height: 4vh;
    position: absolute;
    left: 1%;
    top: 1%;
    color: #75bad6;
    z-index: 999;
    span {
      display: inline-block;
      padding: 5px;
      cursor: pointer;
    }
  }
  .weather_left {
    height: calc(100vh - 12vh);
    width: 29%;
    margin-top: 0.8%;
    position: absolute;
    top: 9vh;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-left: 27px;
    // img {
    //   width: 3vw;
    //   height: 3vw;
    // }
    > div {
      width: 100%;
      background: rgba(44, 110, 137, 0.1);
      border: 1px solid rgba(37, 163, 253, 0.25);
    }
    .weather_left_son1 {
      height: 65%;
      // background-color: cadetblue;
      font-size: 14px;
      color: #bbdaec;
      .allTitle {
        height: 2.5vh;
        font-size: 1vw;
        font-family: "Microsoft YaHei";
        font-weight: 500;
        color: rgb(211, 212, 212);
        border-left: 4px solid rgba(105, 188, 200, 1);
        padding-left: 10px;
        margin: 1vh 0;
      }
      .ele_row {
        width: 100%;
        height: 50%;
        color: #d3d4d4;
        background: rgba(44, 110, 137, 0.1);
        // background: rgba(44, 110, 137, 0.1);
        // background-color: aliceblue;
        .ele_col {
          height: 100%;
          // background-color: greenyellow;
          .tianqi_jintian {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            color: #fff;
            img {
              width: 3vw;
              height: 3vw;
            }
          }
          .nextday {
            border-left: 1px solid #085489;

            img {
              width: 2vw;
              height: 2vw;
            }
          }
          .tqyb {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            color: #fff;
            span {
              flex: 1;
            }
            .tqRq {
              line-height: 4.4vh;
              font-size: 13px;
            }
            .tqSj {
              line-height: 2.7vh;
              font-size: 13px;
            }
            .tqWd {
              line-height: 2.7vh;
              font-size: 13px;
            }
            .tqFs {
              line-height: 2.7vh;
              font-size: 13px;
            }
            .tqFx {
              line-height: 2.7vh;
              font-size: 13px;
            }
          }
        }
      }
      .to_date {
        width: 100%;
        height: calc(50% - 4.5vh);
        .date_echarts {
          width: 100%;
          height: 75%;
          margin-top: 5px;
          // background-color: rgba(255, 255, 255, 0.1);
          .jsl {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            border-left: 1px solid #085489;
            color: #d3d4d4;
          }
        }
        .date_btn {
          width: 100%;
          margin-top: 10px;
          cursor: pointer;
          span {
            display: inline-block;
            padding: 10px 15px;
            background-color: rgba(255, 255, 255, 0.1);
            color: #d3d4d4;
            margin-left: 2px;
            font-size: 0.5vw;
            font-family: "Microsoft YaHei";
          }
          .transparens {
            background-color: transparent;
          }
        }
      }
    }
    .weather_left_son {
      height: 33%;
      .allTitle {
        height: 2.5vh;
        font-size: 1vw;
        font-family: "Microsoft YaHei";
        font-weight: 500;
        color: rgb(211, 212, 212);
        border-left: 4px solid rgba(105, 188, 200, 1);
        padding-left: 10px;
        margin: 1vh 0;
        // background-color: #848d94;
      }
      .frost_echarts {
        width: 100%;
        height: calc(100% - 4.5vh);
        background: rgba(44, 110, 137, 0.1);
        // background-color: cornflowerblue;
      }
    }
  }
  .weather_right {
    height: calc(100vh - 12vh);
    width: 30%;
    position: absolute;
    top: 9vh;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-right: 27px;
    margin-top: 0.8%;
    > div {
      height: 32%;
      width: 100%;
    }
    .weather_right_son1 {
      // background: #75bad6;
      border: 1px solid rgba(37, 163, 253, 0.25);
      .allTitle {
        height: 2.5vh;
        font-size: 1vw;
        font-family: "Microsoft YaHei";
        font-weight: 500;
        color: rgb(211, 212, 212);
        border-left: 4px solid rgba(105, 188, 200, 1);
        padding-left: 10px;
        margin: 1vh 0;
      }
      .drought_echarts {
        width: 100%;
        height: calc(100% - 4.5vh);
        background: rgba(44, 110, 137, 0.1);
      }
      .all_teble {
        width: 100%;
        height: calc(100% - 4.5vh);
        margin: 10px auto;
        background: rgba(44, 110, 137, 0.1);
        .grid-content {
          color: "#9da9b8";
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 28px;
          height: 48px;
        }
        .dy {
          background: url("../../assets/images/wea/dy.png") center center
            no-repeat / 100% 100%;
        }
        .cy {
          background: url("../../assets/images/wea/cy.png") center center
            no-repeat / 100% 100%;
        }
        .gg {
          background: url("../../assets/images/wea/gg.png") center center
            no-repeat / 100% 100%;
        }
        .rq {
          background: url("../../assets/images/wea/rq.png") center center
            no-repeat / 100% 100%;
          margin-left: 45px;
        }
        .sh {
          background: url("../../assets/images/wea/sh.png") center center
            no-repeat / 100% 100%;
        }
        .zs {
          background: url("../../assets/images/wea/zs.png") center center
            no-repeat / 100% 100%;
          margin-left: 55px;
        }
        .ele_row {
          border-top: 1px solid #848d94;
        }
        .ele_col {
          margin: 0.7vh 0;
          @media screen and (max-width: 1366) {
            margin: 0.5vh 0;
          }
          .bg-purple {
            color: "#9da9b8";
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
  .weather_bottom {
    height: 8vh;
    width: 37%;
    position: absolute;
    bottom: 0;
    left: 31%;
    // background-color: blueviolet;
    .ele_col {
      height: 100%;
      background: rgba(44, 110, 137, 0.1);
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
// .mldhbox {
//   float: left;
//   width: 40%;
//   overflow: hidden;
//   height: 60vh;
//   position: absolute;
//   top: 9vh;
//   left: 30%;
//   z-index: 0;
// }
.zsfxBtn1 {
  position: absolute;
  left: 31%;
  top: 9vh;
  width: 600px;
  height: 60px;
  border-radius: 4px;
  color: #75bad6;
  font-size: 12px;
  font-family: "Microsoft YaHei";
  font-weight: 400;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .nczy {
    width: 140px;
    height: 40px;
    background: url("../../assets/images/mldh/nczy.png") center center no-repeat /
      100% 100%;
    cursor: pointer;
  }
  .cyfb {
    width: 140px;
    height: 40px;
    background: url("../../assets/images/mldh/cyfb.png") center center no-repeat /
      100% 100%;
    cursor: pointer;
  }
  .jcfx {
    width: 140px;
    height: 40px;
    background: url("../../assets/images/mldh/jcfxactive.png") center center
      no-repeat / 100% 100%;
    cursor: pointer;
  }
  .stzl {
    width: 140px;
    height: 40px;
    background: url("../../assets/images/mldh/stzl.png") center center no-repeat /
      100% 100%;
    cursor: pointer;
  }
}
.radioBtn {
  position: absolute;
  right: 32.2%;
  top: 15%;
  width: 120px;
  height: 150px;
  border-radius: 4px;
  color: #75bad6;
  font-size: 12px;
  font-family: "Microsoft YaHei";
  font-weight: 400;
  z-index: 999;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  flex-wrap: wrap;
  -ms-flex-align: center;
  align-items: center;
  z-index: 999;
  .nyjc {
    width: 114px;
    height: 26px;
    background: url("../../assets/images/mldh/zzjc.png") center center no-repeat /
      100% 100%;
    cursor: pointer;
  }
  .qxjc {
    width: 114px;
    height: 26px;
    background: url("../../assets/images/mldh/qxjc.png") center center no-repeat /
      100% 100%;
    cursor: pointer;
  }
  .scjc {
    width: 114px;
    height: 26px;
    background: url("../../assets/images/mldh/scjc.png") center center no-repeat /
      100% 100%;
    cursor: pointer;
  }
  .bhjc {
    width: 114px;
    height: 26px;
    background: url("../../assets/images/mldh/bhjc.png") center center no-repeat /
      100% 100%;
    cursor: pointer;
  }
  .nyjcactive {
    width: 114px;
    height: 26px;
    background: url("../../assets/images/mldh/ncjcactive.png") center center
      no-repeat / 100% 100%;
    cursor: pointer;
  }
  .qxjcactive {
    width: 114px;
    height: 26px;
    background: url("../../assets/images/mldh/qxjcactive.png") center center
      no-repeat / 100% 100%;
    cursor: pointer;
  }
}

.yx {
  width: 61px;
  height: 30px;
  position: absolute;
  bottom: 4%;
  right: 4%;
  background: url("../../assets/images/qpClose.png") center center
    no-repeat/100% 100%;
  background-color: #152443;
  cursor: pointer;
}
.yxactive {
  width: 61px;
  height: 30px;
  position: absolute;
  bottom: 4%;
  right: 4%;
  background: url("../../assets/images/qpOpen.png") center center no-repeat/100%
    100%;
  background-color: #152443;
  cursor: pointer;
}
</style>
