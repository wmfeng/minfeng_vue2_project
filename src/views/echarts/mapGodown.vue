<template>
  <div class="mapgodown" id="chart-panel" ref="mapGodown"></div>
</template>

<script>
import request from "@/utils/request";
var nanchang = require("../../assets/mapJson/jiangxi/nanchang.json");
var jingdezhen = require("../../assets/mapJson/jiangxi/jingdezhen.json");
var pos = {
  leftPlus: 12,
  leftCur: 70,
  left: 15,
  top: 15
};
var line = [
  [0, 0],
  [8, 11],
  [0, 22]
];
var idx = 0;

var style = {
  font: '18px "Microsoft YaHei", sans-serif',
  textColor: "#eee",
  lineColor: "rgba(147, 235, 248, .8)"
};
var curGeoJson = {};
var cityMap = {
  南昌市: nanchang,
  景德镇市: jingdezhen
  // "萍乡市": pingxiang,
  // "九江市": jiujiang,
  // "新余市": xinyu,
  // "鹰潭市": yingtan,
  // "赣州市": ganzhou,
  // "吉安市": jian,
  // "宜春市": yichun,
  // "抚州市": fuzhou,
  // "上饶市": shangrao
};
var geoCoordMap = {
  南昌: [115.89, 28.48],
  景德镇: [117.28, 29.09],
  萍乡: [113.93, 27.41],
  九江: [115.97, 29.51],
  新余: [114.81, 27.72],
  鹰潭: [117.12, 28.1],
  赣州: [115.04, 25.67],
  吉安: [115.05, 26.88],
  宜春: [114.41, 28.03],
  抚州: [116.45, 27.79],
  上饶: [117.92, 28.22]
};
var levelColorMap = {
  "1": "rgba(241, 109, 115, .8)",
  "2": "rgba(255, 235, 59, .7)",
  "3": "rgba(147, 235, 248, 1)"
};
var defaultOpt = {
  mapName: "china", // 地图展示
  goDown: false, // 是否下钻
  bgColor: "#404a59", // 画布背景色
  activeArea: [], // 区域高亮,同echarts配置项
  data: [],
  // 下钻回调(点击的地图名、实例对象option、实例对象)
  callback: function(name, option, instance) {}
};
var name = [];
var opt = {
  bgColor: "#154e90", // 画布背景色
  mapName: "江西", // 地图名
  goDown: true, // 是否下钻
  // 下钻回调
  callback: function(name, option, instance) {},
  // 数据展示
  data: [
    {
      name: "南昌",
      value: 10,
      level: 1
    },
    {
      name: "景德镇",
      value: 12,
      level: 2
    },
    {
      name: "萍乡",
      value: 11,
      level: 3
    },
    {
      name: "赣州",
      value: 16,
      level: 2
    },
    {
      name: "吉安",
      value: 12,
      level: 1
    }
  ]
};
export default {
  name: "mapGodown",
  data() {
    return {};
  },
  methods: {
    extendsMap(opt) {
      // 实例
      let chart = this.$echarts.init(document.getElementById("chart-panel"));
      if (opt) {
        opt = this.$echarts.util.extend(defaultOpt, opt);
      }
      // 层级索引
      name = [opt.mapName];
      let _this = this; //改变this指向（此this中可获取到echarts下registerMap方法）
      let option = {
        backgroundColor: opt.bgColor,
        tooltip: {
          //划过出现框
          show: true,
          trigger: "item",
          padding: 0,
          showDelay: 0,
          hideDelay: 0,
          enterable: true,
          transitionDuration: 0,
          extraCssText: "z-index:100",
          backgroundColor: "transparent",
          formatter: params => {
            if (params.componentSubType == "map") {
              return;
            } else {
              let str = `
               <div class="echartstit">
               总缺口量
               <span style="color:red;">
              ${params.name}
               </span>
               万立方米
               </div>
              `;
              return str;
            }
          },
          position: (point, params, dom, rect, size) => {
            // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            // var x = 0; // x坐标位置
            // var y = 0; // y坐标位置

            // 当前鼠标位置
            var pointX = point[0];
            var pointY = point[1];
            let x = pointX - size.contentSize[0] / 2 - 1;
            let y = pointY - size.contentSize[1] - 20;
            return [x, y];
          }
        },
        graphic: [
          {
            type: "group",
            left: pos.left,
            top: pos.top - 4,
            children: [
              {
                type: "line",
                left: 0,
                top: -20,
                shape: {
                  x1: 0,
                  y1: 0,
                  x2: 60,
                  y2: 0
                },
                style: {
                  stroke: style.lineColor
                }
              },
              {
                type: "line",
                left: 0,
                top: 20,
                shape: {
                  x1: 0,
                  y1: 0,
                  x2: 60,
                  y2: 0
                },
                style: {
                  stroke: style.lineColor
                }
              }
            ]
          },
          {
            id: name[idx],
            type: "group",
            left: pos.left + 2,
            top: pos.top,
            children: [
              {
                type: "polyline",
                left: 90,
                top: -12,
                shape: {
                  points: line
                },
                style: {
                  stroke: "transparent",
                  key: name[0]
                },
                onclick: function() {
                  let name = this.style.key;
                  _this.resetOption(chart, option, name);
                }
              },
              {
                type: "text",
                left: 0,
                top: "middle",
                style: {
                  text: name[0] === "江西" ? "江西省" : name[0],
                  textAlign: "center",
                  fill: style.textColor,
                  font: style.font
                },
                onclick: function() {
                  _this.resetOption(chart, option, "江西");
                }
              },
              {
                type: "text",
                left: 0,
                top: 10,
                style: {
                  text: "JIANGXI",
                  textAlign: "center",
                  fill: style.textColor,
                  font: '12px "Microsoft YaHei", sans-serif'
                },
                onclick: function() {
                  _this.resetOption(chart, option, "江西");
                }
              }
            ]
          }
        ],
        geo: {
          map: opt.mapName,
          roam: true, //控制地图是否可以放大缩小
          zoom: 1,
          label: {
            normal: {
              show: true,
              textStyle: {
                color: "#fff"
              }
            },
            emphasis: {
              textStyle: {
                color: "#fff"
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(147, 235, 248, 1)",
              borderWidth: 1,
              areaColor: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(147, 235, 248, 0)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(147, 235, 248, .2)" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              shadowColor: "rgba(128, 217, 248, 1)",
              // shadowColor: 'rgba(255, 255, 255, 1)',
              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 10
            },
            emphasis: {
              areaColor: "#389BB7",
              borderWidth: 0
            }
          },
          regions: opt.activeArea.map(function(item) {
            if (typeof item !== "string") {
              return {
                name: item.name,
                itemStyle: {
                  normal: {
                    areaColor: item.areaColor || "#389BB7"
                  }
                },
                label: {
                  normal: {
                    show: item.showLabel,
                    textStyle: {
                      color: "#fff"
                    }
                  }
                }
              };
            } else {
              return {
                name: item,
                itemStyle: {
                  normal: {
                    borderColor: "#91e6ff",
                    areaColor: "#389BB7"
                  }
                }
              };
            }
          })
        },
        series: [
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            // symbol: 'diamond',
            showEffectOn: "render",
            rippleEffect: {
              period: 15,
              scale: 6,
              brushType: "fill"
            },
            hoverAnimation: true,
            itemStyle: {
              normal: {
                color: function(params) {
                  return levelColorMap[params.value[3]];
                },
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            data: this.initSeriesData(opt.data)
          }
        ]
      };
      chart.setOption(option);
      // 点击事件
      chart.off("click");
      chart.on("click", function(params) {
        let _self = this;
        if (opt.goDown && params.name !== name[idx]) {
          if (cityMap[params.name]) {
            let url = cityMap[params.name];
            request(url, "get").then(res => {
              curGeoJson.UTF8Encoding = res.config.UTF8Encoding;
              curGeoJson.features = res.config.features;
              curGeoJson.properties = res.config.properties;
              curGeoJson.type = res.config.type;
              _this.$echarts.registerMap(params.name, curGeoJson);
              _this.resetOption(_self, option, params.name);
            });
          }
        }
      });
      chart.setMap = function(mapName) {
        let _self = this;
        if (mapName.indexOf("市") < 0) mapName = mapName + "市";
        let citySource = cityMap[mapName];
        if (citySource) {
          let url = "./map/" + citySource + ".json";
          request(url, "get").then(res => {
            curGeoJson.UTF8Encoding = res.config.UTF8Encoding;
            curGeoJson.features = res.config.features;
            curGeoJson.properties = res.config.properties;
            curGeoJson.type = res.config.type;
            _self.$echarts.registerMap(params.name, curGeoJson);
            _self.resetOption(_this, option, params.name);
          });
        }
        _this.resetOption(this, option, mapName);
      };
      return chart;
    },
    // 初始化地图
    initMap() {
      this.$echarts.registerMap(
        "江西",
        require("../../assets/mapJson/jiangxi/jiangxi.json")
      );
      this.extendsMap(opt);
    },
    /**
     * i 实例对象
     * o option
     * n 地图名
     **/
    resetOption(i, o, n) {
      let breadcrumb = this.createBreadcrumb(n);
      let j = name.indexOf(n);
      let l = o.graphic.length;
      if (j < 0) {
        o.graphic.push(breadcrumb);
        o.graphic[0].children[0].shape.x2 = 145;
        o.graphic[0].children[1].shape.x2 = 145;
        if (o.graphic.length > 2) {
          for (let x = 0; x < opt.data.length; x++) {
            if (n === opt.data[x].name + "市") {
              o.series[0].data = this.initSeriesData([opt.data[x]]);
              break;
            } else o.series[0].data = [];
          }
        }
        name.push(n);
        idx++;
      } else {
        o.graphic.splice(j + 2, l);
        if (o.graphic.length <= 2) {
          o.graphic[0].children[0].shape.x2 = 60;
          o.graphic[0].children[1].shape.x2 = 60;
          o.series[0].data = this.initSeriesData(opt.data);
        }
        name.splice(j + 1, l);
        idx = j;
        pos.leftCur -= pos.leftPlus * (l - j - 1);
      }

      o.geo.map = n;
      o.geo.zoom = 0.4;
      i.clear();
      i.setOption(o);
      this.zoomAnimation();
      opt.callback(n, o, i);
    },
    /*
     * name 地图名
     面包屑
     **/
    createBreadcrumb(name) {
      let cityToPinyin = {
        南昌市: "nanchang",
        景德镇市: "jingdezhen",
        萍乡市: "pingxiang",
        九江市: "jiujiang",
        新余市: "xinyu",
        鹰潭市: "yingtan",
        赣州市: "ganzhou",
        吉安市: "jian",
        宜春市: "yichun",
        抚州市: "fuzhou",
        上饶市: "shangrao"
      };
      let breadcrumb = {
        type: "group",
        id: name,
        left: pos.leftCur + pos.leftPlus,
        top: pos.top + 3,
        children: [
          {
            type: "polyline",
            left: -90,
            top: -5,
            shape: {
              points: line
            },
            style: {
              stroke: "#fff",
              key: name
              // lineWidth: 2,
            },
            onclick: function() {
              let name = this.style.key;
              this.resetOption(chart, option, name);
            }
          },
          {
            type: "text",
            left: -68,
            top: "middle",
            style: {
              text: name,
              textAlign: "center",
              fill: style.textColor,
              font: style.font
            },
            onclick: function() {
              let name = this.style.text;
              this.resetOption(chart, option, name);
            }
          },
          {
            type: "text",
            left: -68,
            top: 10,
            style: {
              name: name,
              text: cityToPinyin[name] ? cityToPinyin[name].toUpperCase() : "",
              textAlign: "center",
              fill: style.textColor,
              font: '12px "Microsoft YaHei", sans-serif'
            },
            onclick: function() {
              let name = this.style.name;
              this.resetOption(chart, option, name);
            }
          }
        ]
      };
      pos.leftCur += pos.leftPlus;
      return breadcrumb;
    },
    /*
      设置effectscatter
      后台获取回来的数据可通过此处传入
      展示数据，鼠标划过展示具体数值可从此处传递到tooltip下params中的值
    */

    initSeriesData(data) {
      let temp = [];
      for (let i = 0; i < data.length; i++) {
        let geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
          temp.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value, data[i].level),
            dataOne: "2222"
          });
        }
      }
      return temp;
    },
    /*
      下钻之后地图不会呈缩略状态
    */

    zoomAnimation() {
      let chart = this.$echarts.init(document.getElementById("chart-panel"));
      let count = null;
      let zoom = function(per) {
        if (!count) count = per;
        count = count + per;
        chart.setOption({
          geo: {
            zoom: count
          }
        });
        if (count < 1)
          window.requestAnimationFrame(function() {
            zoom(0.2);
          });
      };
      window.requestAnimationFrame(function() {
        zoom(0.2);
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initMap();
    });
  }
};
</script>

<style lang="scss" scoped>
.mapgodown {
  height: 40vh;
}
</style>
<style lang="scss">
.echartstit {
  padding: 20px;
  background-image: url("../../assets/images/1 (2).png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: #000;
  font-size: 10px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 10px;
  }
}
</style>