import echarts from 'echarts'

export let EchartsOne = (xData, sData) => {
    let option = {
        // backgroundColor: '#080b30',//背景颜色
        title: {
            text: 'title',
            show: false,
            textStyle: {
                align: 'center',
                color: 'red',
                fontSize: 20,
            },
            top: '5%',
            left: 'center',
        },
        tooltip: {
            trigger: 'axis',
            show: true,
            axisPointer: {
                lineStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{//鼠标划过y轴线条颜色
                            offset: 0,
                            color: 'rgba(0, 255, 233,0)'
                        }, {
                            offset: 0.5,
                            color: 'rgba(255, 255, 255,1)',
                        }, {
                            offset: 1,
                            color: 'rgba(0, 255, 233,0)'
                        }],
                        global: false
                    }
                },
            },
        },
        grid: {
            top: '15%',
            left: '1%',
            right: '5%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            axisLine: {
                show: true
            },
            splitArea: {
                show: false,
                color: '#f00',
                lineStyle: {
                    color: '#f00'
                },
            },
            axisLabel: {
                color: '#666666'//x轴字体颜色
            },
            splitLine: {
                show: false
            },
            boundaryGap: false,
            data: xData,

        }],
        yAxis: [{
            type: 'value',
            name: "单位/个",
            min: 0,
            max: 100,
            splitNumber: 5,
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#dddddd'
                }
            },
            axisLine: {
                show: true,
            },
            axisLabel: {
                show: true,
                margin: 20,
                textStyle: {
                    color: '#666',

                },
            },
            axisTick: {
                show: false,
            },
        }],
        series: [{
            name: '注册总量',
            type: 'line',
            smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: 'circle',
            symbolSize: 12,
            lineStyle: {
                normal: {
                    color: "#81bce3",//线条颜色
                    shadowColor: 'rgba(0, 0, 0, .3)',
                    shadowBlur: 0,
                    shadowOffsetY: 0,
                    shadowOffsetX: 0,
                },
            },
            label: {
                show: false,//是否展示具体点数据
                position: 'top',
                textStyle: {
                    color: 'red',
                }
            },
            itemStyle: {
                color: "#fff",
                borderColor: "#81bce3",
                borderWidth: 1,
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 0,
                shadowOffsetX: 0,
            },
            tooltip: {
                show: true
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#b7d9f0'
                    },
                    {
                        offset: 1,
                        color: '#ffffff'
                    }
                    ], false),
                    shadowColor: '#fff',
                    shadowBlur: 10
                }
            },
            data: sData
        },
        ]
    };
    return option;
}



export let EchartsTwo = (lData, sData) => {
    let option = {
        // backgroundColor: "#fff",
        color: ["#EAEA26", "#906BF9", "#FE5656", "#01E17E", "#3DD1F9", "#FFAD05"],
        title: {
            text: '网络/安全设备',
            left: '60',
            top: 0,
            show: false,
            textAlign: 'center',
            textStyle: {
                color: '#fff',
                fontSize: 14,
                fontWeight: 0
            }
        },
        grid: {
            left: "5%",
            top: 100,
            bottom: 10,
            right: 10,
            containLabel: true
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {
            type: "scroll",
            orient: "vartical",
            // x: "right",
            top: "center",
            right: "10%",
            // bottom: "0%",
            itemWidth: 16,
            itemHeight: 8,
            itemGap: 16,
            textStyle: {
                color: '#A3E2F4',
                fontSize: 12,
                fontWeight: 0
            },
            data: lData
        },
        polar: {},
        angleAxis: {
            interval: 1,
            type: 'category',
            data: [],
            z: 10,
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#0B4A6B",
                    width: 1,
                    type: "solid"
                },
            },
            axisLabel: {
                interval: 0,
                show: true,
                color: "#0B4A6B",
                margin: 8,
                fontSize: 16
            },
        },
        radiusAxis: {
            // min: 40,
            // max: 120,
            interval: 20,
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#0B3E5E",
                    width: 1,
                    type: "solid"
                },
            },
            axisLabel: {
                formatter: '{value} %',
                show: false,
                padding: [0, 0, 0, 0],
                color: "red",
                fontSize: 16
            },
            splitLine: {//是否展示环形
                show: false,
                lineStyle: {
                    color: "#0B3E5E",
                    width: 2,
                    type: "solid"
                }
            }
        },
        calculable: false,
        series: [
            // {
            //     type: 'pie',
            //     show: false,
            //     radius: ["5%", "10%"],
            //     hoverAnimation: false,
            //     labelLine: {
            //         normal: {
            //             show: false,
            //             length: 30,
            //             length2: 55
            //         },
            //         emphasis: {
            //             show: false
            //         }
            //     },
            //     data: [{
            //         name: '1111',
            //         value: 10,
            //         itemStyle: {
            //             normal: {
            //                 color: "#fff"
            //             }
            //         }
            //     }]
            // },
            // {
            //     type: 'pie',
            //     radius: ["90%", "95%"],
            //     hoverAnimation: false,
            //     labelLine: {
            //         normal: {
            //             show: false,
            //             length: 30,
            //             length2: 55
            //         },
            //         emphasis: {
            //             show: false
            //         }
            //     },
            //     name: "",
            //     data: [{
            //         name: '',
            //         value: 0,
            //         itemStyle: {
            //             normal: {
            //                 color: "#fff"
            //             }
            //         }
            //     }]
            // },
            {
                stack: 'a',
                type: 'pie',
                radius: ['20%', '80%'],
                roseType: 'area',
                zlevel: 10,
                label: {
                    normal: {
                        show: true,
                        formatter: "{c}",
                        textStyle: {
                            fontSize: 12,
                        },
                        position: 'outside'
                    },
                    emphasis: {
                        show: true
                    }
                },
                labelLine: {
                    normal: {
                        show: true,
                        length: 20,
                        length2: 55
                    },
                    emphasis: {
                        show: true,//鼠标划过时折线条是否消失
                    }
                },
                data: sData
            },]
    };
    return option;
}



export let EchartsThree = (xData,sData1,sData2,sData3) => {
    let option = {
        // backgroundColor: '#ccc',
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '2%',
            right: '4%',
            bottom: '14%',
            top: '16%',
            containLabel: true
        },
        legend: {
            data: ['1', '2', '3'],
            right: 10,
            top: 12,
            textStyle: {
                color: "#000"
            },
            itemWidth: 12,
            itemHeight: 10,
            itemGap: 35
        },
        xAxis: {
            type: 'category',
            data: xData,
            axisLine: {
                lineStyle: {
                    color: '#000'
                }
            },
            axisLabel: {
                interval: 0,
                // rotate: 40,
                textStyle: {
                    fontFamily: 'Microsoft YaHei'
                }
            },
        },

        yAxis: {
            type: 'value',
            name: "单位",
            // max: '1200',
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#000'
                }
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: 'red'
                }
            },
            axisLabel: {}
        },
        "dataZoom": [{
            "show": true,
            "height": 12,
            "xAxisIndex": [
                0
            ],
            bottom: '8%',
            "start": 10,
            "end": 90,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
                color: "#d3dee5",

            },
            textStyle: {
                color: "#000"
            },
            borderColor: "#90979c"
        }, {
            "type": "inside",
            "show": true,
            "height": 15,
            "start": 1,
            "end": 35
        }],
        series: [{
            name: '1',
            type: 'bar',
            barWidth: '15%',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#fccb05'
                    }, {
                        offset: 1,
                        color: '#f5804d'
                    }]),
                    barBorderRadius: 0,
                },
            },
            data: sData1
        },
        {
            name: '2',
            type: 'bar',
            barWidth: '15%',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#8bd46e'
                    }, {
                        offset: 1,
                        color: '#09bcb7'
                    }]),
                    barBorderRadius: 0,
                }

            },
            data: sData2
        },
        {
            name: '3',
            type: 'bar',
            barWidth: '15%',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#248ff7'
                    }, {
                        offset: 1,
                        color: '#6851f1'
                    }]),
                    barBorderRadius: 0,
                }
            },
            data: sData3
        }]
    };
    return option;
}