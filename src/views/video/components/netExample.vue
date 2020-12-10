<template>
  <div class="video-player">
    <div id="divPlugin" class="divPlugin" ref="divPlugin" v-if="plugin"></div>
    <!-- <div class="down" v-else>
            <a href="http://jbfsys.oss-cn-beijing.aliyuncs.com/download/VideoWebPlugin-1564128302790.exe">下载</a>
    </div>-->
  </div>
</template>
<script>
export default {
  name: "videoPlayer",
  props: ["cameraIndexCode", "layout"],
  data() {
    return {
      plugin: true,
      oWebControl: null, //插件对象
      initCount: 0,
      pubKey: "", //公钥加密
      playMode: "",
      video_init_data: {
        appkey: "28730366",
        appSecret: "HSZkCJpSJ7gSUYrO6wVi",
        ip: "10.19.132.75",
        port: "443",
        snapDir: "D:\\SnapDir",
        videoDir: "D:\\VideoDir",
        layout: ""
        // encryptedFields:'secret',
        // enableHttps:'1',
      },
      video_play_data: {
        cameraIndexCode: "",
        streamMode: 0,
        transMode: 1,
        gpuMode: 0,
        wndId: -1
      },
      //videoWidth videoHeight screenWidth screenHeight
      //这四个参数为了使插件大小和屏幕宽度一致变化
      videoWidth: 700,
      videoHeight: 300,
      screenWidth: document.documentElement.clientWidth, //屏幕宽度
      screenHeight: document.documentElement.clientHeight, //屏幕高度
      //设置窗口遮挡 根据浏览器大小变化视频插件的大小
      iLastCoverLeft: 0,
      iLastCoverTop: 0,
      iLastCoverRight: 0,
      iLastCoverBottom: 0
    };
  },
  created() {},
  mounted() {
    //插件初始化
    this.initPlugin();
    this.$nextTick(() => {
      this.videoWidth = this.$refs.divPlugin.offsetWidth;
      this.videoHeight = this.$refs.divPlugin.offsetHeight;
    });
    // 监听窗口变化
    let _this = this;
    window.onresize = function() {
      // 定义窗口大小变更通知事件
      _this.screenWidth = document.documentElement.clientWidth; //窗口宽度
      _this.screenHeight = document.documentElement.clientHeight; //窗口高度
    };
    window.addEventListener("scroll", function() {
      if (this.oWebControl != null) {
        this.oWebControl.JS_Resize(this.videoWidth, this.videoHeight);
        this.setWndCover();
      }
    });
  },
  destroyed() {
    if (this.oWebControl != null) {
      this.oWebControl.JS_Disconnect().then(
        function() {},
        function() {}
      );
    }
  },
  methods: {
    //   插件初始化
    initPlugin() {
      let _this = this;
      this.oWebControl = new WebControl({
        szPluginContainer: "divPlugin",
        iServicePortStart: 15900,
        iServicePortEnd: 15909,
        cbConnectSuccess: e => {
          this.plugin = true;
          // _this.setCallbacks();
          if (_this.oWebControl) {
            _this.oWebControl
              .JS_StartService("window", {
                dllPath: "./VideoPluginConnect.dll"
                //dllPath: "./DllForTest-Win32.dll"
              })
              .then(
                res => {
                  _this.oWebControl
                    .JS_CreateWnd(
                      "divPlugin",
                      _this.videoWidth,
                      _this.videoHeight
                    )
                    .then(() => {
                      // console.log("JS_CreateWnd success");
                      _this.initVideo();
                    });
                },
                function() {}
              );
          } else {
          }
        },
        cbConnectError: () => {
          //console.log("cbConnectError");
          _this.oWebControl = null;
          $("#divPlugin").html("插件未启动，正在尝试启动，请稍候...");
          WebControl.JS_WakeUp("VideoWebPlugin://");
          _this.initCount++;
          if (_this.initCount < 3) {
            setTimeout(() => {
              _this.initPlugin();
            }, 3000);
          } else {
            $("#divPlugin").html("插件启动失败，请检查插件是否安装！");
            this.plugin = false;
          }
        },
        cbConnectClose: () => {
          //console.log("cbConnectClose");
          this.oWebControl.JS_Disconnect().then(
            function() {},
            function() {}
          );
          this.oWebControl = null;
        }
      });
    },
    // 初始化参数
    initVideo() {
      // console.log(this.getPubKey)
      this.getPubKey(() => {
        let appkey = this.video_init_data.appkey;
        let secret = this.video_init_data.appSecret;
        let ip = this.video_init_data.ip;
        let szPort = this.video_init_data.port;
        let snapDir = this.video_init_data.snapDir;
        let videoDir = this.video_init_data.videoDir;
        let layout = this.layout;
        // let encryptedFields = ['secret'];
        let port = parseInt(szPort);
        // let enableHttps = parseInt(this.video_init_data.enableHttps);
        // encryptedFields = encryptedFields.join(",");
        this.oWebControl
          .JS_RequestInterface({
            funcName: "init",
            argument: JSON.stringify({
              appkey: appkey,
              secret: secret,
              ip: ip,
              playMode: 0, // 预览
              port: port,
              snapDir: snapDir,
              videoDir: videoDir,
              layout: layout
              // enableHTTPS: enableHttps,
              // encryptedFields: encryptedFields
            })
          })
          .then(function(oData) {
            // console.log(JSON.stringify(oData))
          });
        this.startRealPlay();
      });
    },
    // 获取公钥
    getPubKey(callback) {
      // console.log(this.oWebControl,'oWebControloWebControl')
      this.oWebControl
        .JS_RequestInterface({
          funcName: "getRSAPubKey",
          argument: JSON.stringify({
            keyLength: 1024
          })
        })
        .then(oData => {
          // console.log(oData)
          if (oData.responseMsg.data) {
            this.pubKey = oData.responseMsg.data;
            callback();
          }
        });
    },
    // RSA加密
    setEncrypt(value) {
      let encrypt = new JSEncrypt();
      encrypt.setPublicKey(this.pubKey);
      return encrypt.encrypt(value);
    },
    // 视频预览
    startRealPlay() {
      // console.log('------开始播放-------')
      let cameraIndexCode = this.cameraIndexCode;
      let streamMode = this.video_play_data.streamMode;
      let transMode = this.video_play_data.transMode;
      let gpuMode = this.video_play_data.gpuMode;
      let wndId = -1; //默认为空闲窗口回放
      // console.log('------开始播放-------',cameraIndexCode)
      if (this.layout == 1) {
        //用户点击具体摄像头播放
        this.oWebControl
          .JS_RequestInterface({
            funcName: "startPreview",
            argument: JSON.stringify({
              cameraIndexCode: cameraIndexCode,
              streamMode: streamMode,
              transMode: transMode,
              gpuMode: gpuMode,
              wndId: 1
            })
          })
          .then(function(oData) {
            // console.log('err:',oData)
          });
      } else {
        //循环出所有视频并播放
        for (let i = 0; i < cameraIndexCode.length; i++) {
          this.oWebControl
            .JS_RequestInterface({
              funcName: "startPreview",
              argument: JSON.stringify({
                cameraIndexCode: cameraIndexCode[i],
                streamMode: streamMode,
                transMode: transMode,
                gpuMode: gpuMode,
                wndId: i + 1
              })
            })
            .then(function(oData) {
              // console.log('err:',oData)
            });
        }
      }
    },

    //根据窗口变化设置视频插件大小
    resizewindow(w, h) {
      w = w < 1423 ? 1423 : w;
      h = h < 754 ? 754 : h;
      window.resizeTo(w, h);
    },
    //设置窗口遮挡
    setWndCover() {
      let iWidth = document.body.clientWidth;
      let iHeight = document.body.clientHeight;
      let oDivRect = document
        .getElementById("divPlugin")
        .getBoundingClientRect();
      let iCoverLeft = oDivRect.left < 0 ? Math.abs(oDivRect.left) : 0;
      let iCoverTop = oDivRect.top < 0 ? Math.abs(oDivRect.top) : 0;
      let iCoverRight =
        oDivRect.right - iWidth > 0 ? Math.round(oDivRect.right - iWidth) : 0;
      let iCoverBottom =
        oDivRect.bottom - iHeight > 0
          ? Math.round(oDivRect.bottom - iHeight)
          : 0;
      iCoverLeft = iCoverLeft > 700 ? 700 : iCoverLeft;
      iCoverTop = iCoverTop > 400 ? 400 : iCoverTop;
      iCoverRight = iCoverRight > 700 ? 700 : iCoverRight;
      iCoverBottom = iCoverBottom > 400 ? 400 : iCoverBottom;
      if (this.iLastCoverLeft != iCoverLeft) {
        //console.log("iCoverLeft: " + iCoverLeft);
        this.iLastCoverLeft = iCoverLeft;
        this.oWebControl.JS_SetWndCover("left", iCoverLeft);
      }
      if (this.iLastCoverTop != iCoverTop) {
        //console.log("iCoverTop: " + iCoverTop);
        this.iLastCoverTop = iCoverTop;
        this.oWebControl.JS_SetWndCover("top", iCoverTop);
      }
      if (this.iLastCoverRight != iCoverRight) {
        //console.log("iCoverRight: " + iCoverRight);
        this.iLastCoverRight = iCoverRight;
        this.oWebControl.JS_SetWndCover("right", iCoverRight);
      }
      if (this.iLastCoverBottom != iCoverBottom) {
        //console.log("iCoverBottom: " + iCoverBottom);
        this.iLastCoverBottom = iCoverBottom;
        this.oWebControl.JS_SetWndCover("bottom", iCoverBottom);
      }
    }
  },
  watch: {
    screenWidth(n, o) {
      this.videoWidth = this.$refs.divPlugin.offsetWidth;
      this.videoHeight = this.$refs.divPlugin.offsetHeight;
      this.oWebControl.JS_Resize(this.videoWidth, this.videoHeight);
      this.resizewindow(n, this.screenHeight);
      this.setWndCover();
    },
    screenHeight(n, o) {
      this.videoWidth = this.$refs.divPlugin.offsetWidth;
      this.videoHeight = this.$refs.divPlugin.offsetHeight;
      this.oWebControl.JS_Resize(this.videoWidth, this.videoHeight);
      this.resizewindow(this.screenWidth, n);
      this.setWndCover();
    },
    //海康的视频播放插件是默认最高层级这样会导致页面中的弹框等被遮挡，定义一个全局的变量videohide
    //当弹框出现时 视频插件隐藏，解决此问题。
    "$store.state.videohide"(n, o) {
      if (n) {
        this.oWebControl.JS_HideWnd();
      } else if (!n) {
        this.oWebControl.JS_ShowWnd();
      }
    },
    videoDialog(n) {
      if (n) {
        this.initPlugin();
      }
    }
  }
};
</script>
<style  scoped>
.video-player {
  width: 100%;
  height: 100%;
}
.divPlugin {
  width: 100%;
  height: 100%;
  color: red;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  font-size: 18px;
}
.down {
  width: 100%;
  height: 100%;
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}
.down a {
  color: red;
}
</style>