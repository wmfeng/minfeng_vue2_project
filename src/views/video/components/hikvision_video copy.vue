<template>
  <div class="hikvision_video">
    <!--预览界面-->
    <div id="operate" class="operate">
      <div class="module">
        <div class="item">
          <span class="label">监控点编号：</span>
          <input id="cameraIndexCode" type="text" value />
        </div>
        <div class="item" style="margin-top: 20px;margin-left: -20px;">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button
            style="width:20px;padding:0;margin:0;"
            id="startPreview"
            class="btn"
          >预览</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button
            style="width:90px;padding:0;margin:0;"
            id="stopAllPreview"
            class="btn"
          >停止全部预览</button>
        </div>
      </div>
    </div>
    <!--视频窗口展示-->
    <div id="playWnd" class="playWnd" style="left: 109px; top: 133px;"></div>
  </div>
</template>

<script>
//声明公用变量
// var initCount = 0;
// var pubKey = "";
// var oWebControl = null;
export default {
  name: "hikvision_video",
  props: {},
  components: {},
  watch: {},
  data() {
    return {
      initCount: 0,
      pubKey: "",
      oWebControl: null
    };
  },
  methods: {
    // 创建播放实例
    initPlugin() {
      let _this = this;
      _this.oWebControl = new WebControl({
        szPluginContainer: "playWnd", // 指定容器id
        iServicePortStart: 15900, // 指定起止端口号，建议使用该值
        iServicePortEnd: 15909,
        szClassId: "23BF3B0A-2C56-4D97-9C03-0CB103AA8F11", // 用于IE10使用ActiveX的clsid
        cbConnectSuccess: function() {
          // 创建WebControl实例成功
           _this.oWebControl
            .JS_StartService("window", {
              // WebControl实例创建成功后需要启动服务
              dllPath: "./VideoPluginConnect.dll" // 值"./VideoPluginConnect.dll"写死
            })
            .then(
              function() {
                // 启动插件服务成功
                 _this.oWebControl.JS_SetWindowControlCallback({
                  // 设置消息回调
                  // cbIntegrationCallBack: cbIntegrationCallBack
                });

                 _this.oWebControl.JS_CreateWnd("playWnd", 1000, 600).then(function() {
                  //JS_CreateWnd创建视频播放窗口，宽高可设定
                  _this.init(); // 创建播放实例成功后初始化
                });
              },
              function() {
                // 启动插件服务失败
              }
            );
        },
        cbConnectError: function() {
          let _this = this;
          // 创建WebControl实例失败
            _this.oWebControl = null;
          $("#playWnd").html("插件未启动，正在尝试启动，请稍候...");
          WebControl.JS_WakeUp("VideoWebPlugin://"); // 程序未启动时执行error函数，采用wakeup来启动程序
          this.initCount++;
          if (this.initCount < 3) {
            setTimeout(function() {
              this.initPlugin();
            }, 3000);
          } else {
            $("#playWnd").html("插件启动失败，请检查插件是否安装！");
          }
        },
        cbConnectClose: function(bNormalClose) {
          // 异常断开：bNormalClose = false
          // JS_Disconnect正常断开：bNormalClose = true
          console.log("cbConnectClose");
           _this.oWebControl = null;
        }
      });
    },
    // 设置窗口控制回调
    setCallbacks() {
      this.oWebControl.JS_SetWindowControlCallback({
        // cbIntegrationCallBack: cbIntegrationCallBack
      });
    },
    // 推送消息
    cbIntegrationCallBack(oData) {
      showCBInfo(JSON.stringify(oData.responseMsg));
    },
    // 显示回调信息
    showCBInfo(szInfo, type) {
      if (type === "error") {
        szInfo =
          "<div style='color: red;'>" +
          dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss") +
          " " +
          szInfo +
          "</div>";
      } else {
        szInfo =
          "<div>" +
          dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss") +
          " " +
          szInfo +
          "</div>";
      }
      $("#cbInfo").html(szInfo + $("#cbInfo").html());
    },
    //初始化
    init() {
      let _this = this;
      _this.getPubKey(function() {
        ////////////////////////////////// 请自行修改以下变量值	////////////////////////////////////
        var appkey = "28730366"; //综合安防管理平台提供的appkey，必填
        var secret = _this.setEncrypt("HSZkCJpSJ7gSUYrO6wVi"); //综合安防管理平台提供的secret，必填
        var ip = "10.19.132.75"; //综合安防管理平台IP地址，必填
        var playMode = 0; //初始播放模式：0-预览，1-回放
        var port = 443; //综合安防管理平台端口，若启用HTTPS协议，默认443
        var snapDir = "D:\\SnapDir"; //抓图存储路径
        var videoDir = "D:\\VideoDir"; //紧急录像或录像剪辑存储路径
        var layout = "1x1"; //playMode指定模式的布局
        var enableHTTPS = 1; //是否启用HTTPS协议与综合安防管理平台交互，这里总是填1
        var encryptedFields = "secret"; //加密字段，默认加密领域为secret
        var showToolbar = 1; //是否显示工具栏，0-不显示，非0-显示
        var showSmart = 1; //是否显示智能信息（如配置移动侦测后画面上的线框），0-不显示，非0-显示
        var buttonIDs =
          "0,16,256,257,258,259,260,512,513,514,515,516,517,768,769"; //自定义工具条按钮
        ////////////////////////////////// 请自行修改以上变量值	////////////////////////////////////

         _this.oWebControl
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
          .then(function(oData) {
             _this.oWebControl.JS_Resize(1000, 600); // 初始化后resize一次，规避firefox下首次显示窗口后插件窗口未与DIV窗口重合问题
          });
      });
    },
    //获取公钥
    getPubKey(callback) {
      let _this = this;
      _this.oWebControl
        .JS_RequestInterface({
          funcName: "getRSAPubKey",
          argument: JSON.stringify({
            keyLength: 1024
          })
        })
        .then(function(oData) {
          console.log(oData);
          if (oData.responseMsg.data) {
            _this.pubKey = oData.responseMsg.data;
            callback();
          }
        });
    },
    //RSA加密
    setEncrypt(value) {
      var encrypt = new JSEncrypt();
      encrypt.setPublicKey(this.pubKey);
      return encrypt.encrypt(value);
    }
  },
  created() {},
  mounted() {
    //页面加载时创建播放实例初始化
    this.initPlugin();
  }
};
</script>

<style scoped lang='scss'>
.hikvision_video {
  .playWnd {
    margin: 30px 0 0 400px;
    width: 1000px; /*播放容器的宽和高设定*/
    height: 600px;
    border: 1px solid red;
  }
  .operate {
    margin-top: 24px;
  }
  .operate::after {
    content: "";
    display: block;
    clear: both;
  }
  .module {
    float: left;
    width: 340px;
    /*min-height: 320px;*/
    margin-left: 16px;
    padding: 16px 8px;
    box-sizing: border-box;
    border: 1px solid #e5e5e5;
  }
  .module .item {
    margin-bottom: 4px;
  }
  .module input[type="text"] {
    box-sizing: border-box;
    display: inline-block;
    vertical-align: middle;
    margin-left: 0;
    width: 150px;
    min-height: 20px;
  }
  .module .btn {
    min-width: 80px;
    min-height: 24px;
    margin-top: 100px;
    margin-left: 80px;
  }
}
</style>
