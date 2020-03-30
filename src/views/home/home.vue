<template>
  <div class="home">
    <div class="car">
      <div class="a car_a">
        <img src="../../assets/images/home/car_a.png" />
        <p>
          本月供应项目
          <span>128</span>个
        </p>
      </div>
      <div class="a car_b">
        <img src="../../assets/images/home/car_b.png" />
        <p>
          本月需求项目
          <span>128</span>个
        </p>
      </div>
      <div class="a car_c">
        <img src="../../assets/images/home/car_c.png" />
        <p>
          本月成交项目
          <span>128</span>个
        </p>
      </div>
      <div class="a car_d">
        <img src="../../assets/images/home/car_d.png" />
        <p>
          本月成交金额
          <span>1564.00</span>万
        </p>
      </div>
    </div>
    <div class="con">
      <div class="b con_a">
        <p>供应项目统计</p>
        <div class="echarts" ref="echartsOne"></div>
      </div>
      <div class="b con_b">
        <p>登记类型统计</p>
        <div class="echarts" ref="echartsTwo"></div>
      </div>
      <div class="b con_c">
        <p>项目进度统计</p>
        <div class="echarts" ref="echartsThree" id="three"></div>
      </div>
      <div class="b con_d">
        <p>我的任务</p>
        <div class="echarts"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { EchartsOne, EchartsTwo, EchartsThree } from "@/assets/echarts/home";
export default {
  components: {
  },
  data() {
    return {};
  },
  methods: {
    // 供应项目统计
    echartsOne() {
      let echartsOne = this.$echarts.init(this.$refs.echartsOne);
      let xData = [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月"
      ];
      let sData = [42, 40, 59, 48, 42, 63, 65, 58, 58, 62, 63, 65];
      echartsOne.setOption(EchartsOne(xData, sData));
    },
    // 登记类型统计
    echartsTwo() {
      let echartsTwo = this.$echarts.init(this.$refs.echartsTwo);
      let lData = ["IDS", "VPN", "交换机", "防火墙", "WAF", "堡垒机"];
      let sData = [
        {
          value: 10,
          name: "IDS"
        },
        {
          value: 5,
          name: "VPN"
        },
        {
          value: 15,
          name: "交换机"
        },
        {
          value: 25,
          name: "防火墙"
        },
        {
          value: 20,
          name: "WAF"
        },
        {
          value: 35,
          name: "堡垒机"
        }
      ];
      echartsTwo.setOption(EchartsTwo(lData, sData));
    },
    // 项目进度统计
    echartsThree() {
      let echartsThree = this.$echarts.init(this.$refs.echartsThree);
      let xData = ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'];
      let sData1 = [400, 400, 300, 300, 300, 400, 400, 400, 300];
      let sData2 = [400, 500, 500, 500, 500, 400, 400, 500, 500];
      let sData3 = [400, 600, 700, 700, 1000, 400, 400, 600, 700];
      echartsThree.setOption(EchartsThree(xData,sData1,sData2,sData3));
      let app = { currentIndex: -1 };
      setInterval(function() {//定时器
        let dataLen = echartsThree._model.option.series[0].data.length;
        // 取消之前高亮的图形
        echartsThree.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: app.currentIndex
        });
        app.currentIndex = (app.currentIndex + 1) % dataLen;
        // 高亮当前图形
        echartsThree.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: app.currentIndex
        });
        // 显示 tooltip
        echartsThree.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: app.currentIndex
        });
      }, 1000);
    },
    // 初始化图形
    intEcharts() {
      let echartsOne = this.$echarts.init(this.$refs.echartsOne);
      let echartsTwo = this.$echarts.init(this.$refs.echartsTwo);
      let echartsThree = this.$echarts.init(this.$refs.echartsThree);
      window.addEventListener("resize", function() {
        echartsOne.resize();
        echartsTwo.resize();
        echartsThree.resize();
      });
    }
  },
  mounted() {
    this.echartsOne();
    this.echartsTwo();
    this.echartsThree();
    this.intEcharts();
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/variable.scss";
.home {
  height: calc(100vh - #{$logoHeight} - 80px);
  .car {
    display: flex;
    justify-content: space-between;
    height: 10vh;
    width: 100%;
    padding-bottom: 1vh;
    .a {
      width: 24%;
      border-bottom: 6px solid #eaebec;
      text-align: center;
      line-height: 9vh;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 41px;
      }
      p {
        padding-left: 1vw;
        font-size: 18px;
        color: #fff;
        span {
          font-weight: 700;
          font-size: 20px;
          padding: 0 5px;
        }
      }
    }
    .car_a {
      background-color: #4497d1;
    }
    .car_b {
      background-color: #46c8bd;
    }
    .car_c {
      background-color: #61a0a8;
    }
    .car_d {
      background-color: #eaba39;
    }
  }
  .con {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .b {
      width: 48%;
      p {
        height: 30px;
        line-height: 30px;
        padding-left: 35px;
        font-size: 18px;
        font-weight: 700;
      }
      .echarts {
        height: 32vh;
      }
    }
    .con_a {
      p {
        background-image: url("../../assets/images/home/con_gyxx.png");
        background-position: left center;
        background-repeat: no-repeat;
      }
    }
    .con_b {
      p {
        background-image: url("../../assets/images/home/con_djlx.png");
        background-position: left center;
        background-repeat: no-repeat;
      }
    }
    .con_c {
      p {
        background-image: url("../../assets/images/home/con_xmjd.png");
        background-position: left center;
        background-repeat: no-repeat;
      }
    }
    .con_d {
      p {
        background-image: url("../../assets/images/home/con_wdrw.png");
        background-position: left center;
        background-repeat: no-repeat;
      }
    }
  }
}
</style>