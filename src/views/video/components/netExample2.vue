<template>
  <div id="playWnd" class="playWnd" :style="{width:swfWidth+'px',height:swfHeight+'px'}"></div>
</template>

<script>
export default {
  name: "XXX",
  props: {},
  components: {},
  watch: {},
  data() {
    return {
      swfHeight: "",
      swfWidth: "",
      //初始化参数
      initparam: {
        appKey: "xxxxx",
        secret: "xxxxxxx",
        apiIp: "xxx.xxx.xxx",
        apiPort: 8099,
        layout: "1x1" //这里是来控制你一开始初始化之后的分屏的
      },
      //监控点编号
      pointCode: "xxxxxxx",
      pubKey: "",
      oWebControl: null
    };
  },
  methods: {
    //海康插件页面渲染方法
    //Html：<div id="playWnd" class="playWnd"></div> 就是放插件的盒子,id不要改，改了的话下面的方法里面也要改
    //css:自己写一个盒子，让上面这个盒子100%就好
    //js:data，methods,生命周期函数里面也要去看下
    //想要用海康视频直接把从onSearch以下的所以方法复制过去
    // 前面三个接口是我们自己要写的
    //查询videoList,密钥getInitParam,执行就是videoPreview
    onSearch() {
      this.oWebControl.JS_ShowWnd();
      this.videoList = [];
      videoList('接口参数').then(res => {
        if (res.statusCode == 200) {
          this.videoList = res.result.rows;
        } else {
          this.$message({
            message: res.message,
            type: "warning"
          });
        }
      });
    },
    //获取海康密钥
    getInitParam() {
      getInitParam("xxx").then(res => {
        this.initparam = res;
        this.init();
      });
    },
    //执行每监控点预览的操作 //获取监控点编号
    videoPreview(val, index) {
      this.position = index;
      this.oWebControl.JS_ShowWnd();
      this.pointCode = val.pointCode;
      this.startpreview();
    },
    // 创建播放实例
    initPlugin() {
      this.oWebControl = new WebControl({
        szPluginContainer: "playWnd", // 指定容器id
        iServicePortStart: 15900, // 指定起止端口号，建议使用该值
        iServicePortEnd: 15909,
        szClassId: "23BF3B0A-2C56-4D97-9C03-0CB103AA8F11", // 用于IE10使用ActiveX的clsid
        // 创建WebControl实例成功
        cbConnectSuccess: () => {
          this.oWebControl
            .JS_StartService("window", {
              // WebControl实例创建成功后需要启动服务
              dllPath: "./VideoPluginConnect.dll" // 值"./VideoPluginConnect.dll"写死
            })
            .then(
              () => {
                // 启动插件服务成功
                this.oWebControl.JS_SetWindowControlCallback({
                  // 设置消息回调
                  cbIntegrationCallBack: this.cbIntegrationCallBack
                });

                this.oWebControl
                  .JS_CreateWnd("playWnd", this.swfWidth, this.swfHeight)
                  .then(() => {
                    //JS_CreateWnd创建视频播放窗口，宽高可设定
                    this.getInitParam(); // 创建播放实例成功后初始化
                  });
              },
              () => {
                // 启动插件服务失败
              }
            );
        },
        // 创建WebControl实例失败
        cbConnectError: () => {
          this.oWebControl = null;
          $("#playWnd").html("插件未启动，正在尝试启动，请稍候...");
          this.WebControl.JS_WakeUp("VideoWebPlugin://"); // 程序未启动时执行error函数，采用wakeup来启动程序
          this.initCount++;
          if (this.initCount < 3) {
            setTimeout(() => {
              this.initPlugin();
            }, 3000);
          } else {
            console.log("插件启动失败，请检查插件是否安装!");
          }
        },
        // 异常断开：bNormalClose = false
        cbConnectClose: bNormalClose => {
          // JS_Disconnect正常断开：bNormalClose = true
          console.log("cbConnectClose");
          this.oWebControl = null;
        }
      });
    },
    // 设置窗口控制回调
    setCallbacks() {
      this.oWebControl.JS_SetWindowControlCallback({
        cbIntegrationCallBack: this.cbIntegrationCallBack
      });
    },
    // 推送消息
    cbIntegrationCallBack(oData) {
      console.log(oData.responseMsg);
      /* showCBInfo(JSON.stringify(oData.responseMsg)); */
    },
    //初始化
    init() {
      this.getPubKey(() => {
        ////////////////////////////////// 请自行修改以下变量值	////////////////////////////////////
        let appkey = this.initparam.appKey; //综合安防管理平台提供的appkey，必填
        let secret = this.setEncrypt(this.initparam.secret); //综合安防管理平台提供的secret，必填
        let ip = this.initparam.apiIp; //综合安防管理平台IP地址，必填
        let port = this.initparam.apiPort; //综合安防管理平台端口，若启用HTTPS协议，默认443
        port = parseInt(port);
        let layout = this.initparam.layout;
        let playMode = 0; //初始播放模式：0-预览，1-回放
        let snapDir = "D:\\SnapDir"; //抓图存储路径
        let videoDir = "D:\\VideoDir"; //紧急录像或录像剪辑存储路径
        let enableHTTPS = 1; //是否启用HTTPS协议与综合安防管理平台交互，是为1，否为0
        let encryptedFields = "secret"; //加密字段，默认加密领域为secret
        let showToolbar = 1; //是否显示工具栏，0-不显示，非0-显示
        let showSmart = 1; //是否显示智能信息（如配置移动侦测后画面上的线框），0-不显示，非0-显示
        let buttonIDs =
          "0,16,256,257,258,259,260,512,513,514,515,516,517,768,769"; //自定义工具条按钮
        ////////////////////////////////// 请自行修改以上变量值	////////////////////////////////////
        this.oWebControl
          .JS_RequestInterface({
            funcName: "init",
            argument: JSON.stringify({
              appkey: appkey, //API网关提供的appkey
              secret: secret, //API网关提供的secret
              ip: ip, //API网关IP地址
              playMode: playMode, //播放模式（决定显示预览还是回放界面）
              port: port, //端口
              snapDir: snapDir, //抓图存储路径
              videoDir: videoDir, //紧急录像或录像剪辑存储路径
              layout: layout, //布局
              enableHTTPS: enableHTTPS, //是否启用HTTPS协议
              encryptedFields: encryptedFields, //加密字段
              showToolbar: showToolbar, //是否显示工具栏
              showSmart: showSmart, //是否显示智能信息
              buttonIDs: buttonIDs //自定义工具条按钮
            })
          })
          .then(oData => {
            this.oWebControl.JS_Resize(this.swfWidth, this.swfHeight); // 初始化后resize一次，规避firefox下首次显示窗口后插件窗口未与DIV窗口重合问题
            //startpreview();  //初始化之后开启预览
          });
      });
    },
    //获取公钥
    getPubKey(callback) {
      this.oWebControl
        .JS_RequestInterface({
          funcName: "getRSAPubKey",
          argument: JSON.stringify({
            keyLength: 1024
          })
        })
        .then(oData => {
          console.log(oData);
          if (oData.responseMsg.data) {
            this.pubKey = oData.responseMsg.data;
            callback();
          }
        });
    },
    //RSA加密
    setEncrypt(value) {
      let encrypt = new JSEncrypt();
      encrypt.setPublicKey(this.pubKey);
      return encrypt.encrypt(value);
    },
    // 设置窗口裁剪，当因滚动条滚动导致窗口需要被遮住的情况下需要JS_CuttingPartWindow部分窗口
    setWndCover() {
      let iWidth = $(window).width();
      let iHeight = $(window).height();
      let oDivRect = $("#playWnd")
        .get(0)
        .getBoundingClientRect();
      let iCoverLeft = oDivRect.left < 0 ? Math.abs(oDivRect.left) : 0;
      let iCoverTop = oDivRect.top < 0 ? Math.abs(oDivRect.top) : 0;
      let iCoverRight =
        oDivRect.right - iWidth > 0 ? Math.round(oDivRect.right - iWidth) : 0;
      let iCoverBottom =
        oDivRect.bottom - iHeight > 0
          ? Math.round(oDivRect.bottom - iHeight)
          : 0;

      iCoverLeft = iCoverLeft > this.swfWidth ? this.swfWidth : iCoverLeft;
      iCoverTop = iCoverTop > this.swfHeight ? this.swfHeight : iCoverTop;
      iCoverRight = iCoverRight > this.swfWidth ? this.swfWidth : iCoverRight;
      iCoverBottom =
        iCoverBottom > this.swfHeight ? this.swfHeight : iCoverBottom;
      this.oWebControl.JS_RepairPartWindow(
        0,
        0,
        this.swfWidth + 1,
        this.swfHeight
      ); // 多1个像素点防止还原后边界缺失一个像素条
      if (iCoverLeft != 0) {
        this.oWebControl.JS_CuttingPartWindow(0, 0, iCoverLeft, this.swfHeight);
      }
      if (iCoverTop != 0) {
        this.oWebControl.JS_CuttingPartWindow(
          0,
          0,
          this.swfWidth + 1,
          iCoverTop
        ); // 多剪掉一个像素条，防止出现剪掉一部分窗口后出现一个像素条
      }
      if (iCoverRight != 0) {
        this.oWebControl.JS_CuttingPartWindow(
          this.swfWidth - iCoverRight,
          0,
          iCoverRight,
          this.swfHeight
        );
      }
      if (iCoverBottom != 0) {
        this.oWebControl.JS_CuttingPartWindow(
          0,
          this.swfHeight - iCoverBottom,
          this.swfWidth,
          iCoverBottom
        );
      }
    },
    //视频“预览”功能
    startpreview() {
      let pointCode = this.pointCode;
      let cameraIndexCode = pointCode; //获取输入的监控点编号值，必填
      let streamMode = 0; //主子码流标识：0-主码流，1-子码流
      let transMode = 1; //传输协议：0-UDP，1-TCP
      let gpuMode = 0; //是否启用GPU硬解，0-不启用，1-启用
      let wndId = -1; //播放窗口序号（在2x2以上布局下可指定播放窗口）
      cameraIndexCode = cameraIndexCode.replace(/(^\s*)/g, "");
      cameraIndexCode = cameraIndexCode.replace(/(\s*$)/g, "");
      this.oWebControl.JS_RequestInterface({
        funcName: "startPreview",
        argument: JSON.stringify({
          cameraIndexCode: cameraIndexCode, //监控点编号
          streamMode: streamMode, //主子码流标识
          transMode: transMode, //传输协议
          gpuMode: gpuMode, //是否开启GPU硬解
          wndId: wndId //可指定播放窗口
        })
      });
    },

    //停止全部预览功能
    stopAllPreview() {
      this.oWebControl.JS_RequestInterface({
        funcName: "stopAllPreview"
      });
    },
    //关闭视频窗口
    closeWindow() {
      if (this.oWebControl != null) {
        this.oWebControl.JS_HideWnd(); // 先让窗口隐藏，规避可能的插件窗口滞后于浏览器消失问题
        this.oWebControl.JS_Disconnect().then(
          () => {
            // 断开与插件服务连接成功
          },
          () => {
            // 断开与插件服务连接失败
          }
        );
      }
    }
  },
  created() {
    this.getInitParam(); //获取初始话所需的参数
  },
  beforeMount() {
    this.WebControl = WebControl;
  }, //调用电脑中的插件
  mounted() {
    this.swfHeight = document.getElementById("videoMaincontent1").offsetHeight;
    this.swfWidth = document.getElementById("videoMaincontent1").offsetWidth;
    //页面加载时创建播放实例初始化
    this.initPlugin();
    // 监听resize事件，使插件窗口尺寸跟随DIV窗口变化
    $(window).resize(() => {
      if (this.oWebControl != null) {
        this.oWebControl.JS_Resize(this.swfWidth, this.swfHeight);
        this.setWndCover();
      }
    });
    // 监听滚动条scroll事件，使插件窗口跟随浏览器滚动而移动
    $(window).scroll(() => {
      if (this.oWebControl != null) {
        this.oWebControl.JS_Resize(this.swfWidth, this.swfHeight);
        this.setWndCover();
      }
    });
  },
  beforeDestroy() {
    this.closeWindow(); //关闭插件
  }
};
</script>

<style scoped lang='scss'>
</style>
