<template>
  <div class="login">
    <div class="header">
      <span class="header-tit">前端框架标准版</span>
      <span class="header-login">欢迎您登录系统!</span>
    </div>
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="6" :offset="5">
          <div class="fl-box">
            <div class="fl-bg">
              <!-- <img src="../../assets/images/login.png" alt=""> -->
            </div>
          </div>
        </el-col>
        <el-col :span="6" :offset="3">
          <div class="fr-box">
            <div class="fr-box-content">
              <div class="login-tit">
                <p>登录</p>
                <i></i>
              </div>
              <div class="login-content">
                <el-form :model="loginForm" ref="loginForm" :rules="rules">
                  <el-form-item prop="username">
                    <el-input
                      placeholder="用户名"
                      v-model="loginForm.username"
                      @focus="inputFocus"
                      name="name"
                    >
                      <i slot="prefix" class="el-input__icon person"></i>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="password" :class="{marginToggle:error}">
                    <el-input
                      type="password"
                      placeholder="密 码"
                      v-model="loginForm.password"
                      @keyup.enter.native="loginBtn"
                      @focus="inputFocus"
                      name="passwd"
                    >
                      <i slot="prefix" class="el-input__icon password-icon"></i>
                    </el-input>
                    <p class="error" v-if="error">用户名和密码不正确</p>
                  </el-form-item>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-input
                        v-model="loginForm.captcha"
                        placeholder="请输入验证码"
                        @keyup.enter.native="loginBtn"
                      ></el-input>
                    </el-col>
                    <el-col :span="12">
                      <div class="verify-img">
                        <img :src="src" @click="changeImg" />
                      </div>
                    </el-col>
                  </el-row>
                  <div class="rember-pass">
                    <el-checkbox v-model="checked">记住密码</el-checkbox>
                  </div>
                  <el-button type="primary" @click="loginBtn">登录</el-button>
                </el-form>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="footer">
      <p>whb</p>
    </div>
  </div>
</template>
<script>
import { getImg } from "@/api/login";
let Base64 = require("js-base64").Base64;
export default {
  data() {
    return {
      checked: false,
      baseUrl: process.env.VUE_APP_BASE_URL,
      src: process.env.VUE_APP_BASE_URL + "/captcha.jpg",
      loginForm: {
        username: "",
        password: "",
        captcha: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    loginBtn() {
      let _this = this;
      if (this.checked) {
        this.setCookie(
          this.loginForm.username,
          Base64.encode(this.loginForm.password),
          7
        );
      } else {
        this.clearCookie();
      }
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          _this.$store
            .dispatch("loginSecurity", _this.loginForm)
            .then(res => {
              _this.$router.push({ path: "/" });
            })
            .catch(error => {
              _this.changeImg();
              // _this.$router.push({ path: "/login" });
            });
        }
      });
    },
    inputFocus() {
      this.$store.state.user.error = false;
    },
    changeImg() {
      this.src = "";
      this.$nextTick(() => {
        this.src = this.baseUrl + "/captcha.jpg";
      });
    },
    getCookie() {
      if (document.cookie.length) {
        let arr = document.cookie.split("; ");
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("=");
          if (arr2[0] == "userName") {
            this.loginForm.username = arr2[1];
          } else if (arr2[0] == "userPwd") {
            this.loginForm.password = Base64.decode(arr2[1]);
          }
        }
      }
    },
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date();
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    clearCookie: function() {
      this.setCookie("", "", -1);
    }
  },
  mounted() {
    this.getCookie();
  },
  computed: {
    error() {
      return this.$store.getters.error;
    }
  }
};
</script>



<style lang="scss" scoped>
.login {
  height: 100vh;
  min-width: 1000px;
  .header {
    height: 120px;
    padding: 0 30px;
    span {
      line-height: 120px;
    }
    .header-tit {
      color: #3383d0;
      font-size: 34px;
      font-family: "黑体";
      font-weight: bold;
    }
    .header-login {
      float: right;
      color: #999999;
      font-size: 14px;
    }
  }
  .content {
    background: url("../../assets/images/login.png") no-repeat;
    background-size: 100%;
    width: 100%;
    height: calc(100% - 240px);
  }
  .footer {
    height: 120px;
    line-height: 120px;
    text-align: center;
    p {
      color: #999999;
      font-size: 14px;
      margin: 0;
    }
  }
  .el-row,
  .fl-box,
  .fr-box {
    height: 100%;
    width: 100%;
  }
  .el-col {
    height: 100%;
  }
  .fr-box,
  .fl-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .fl-bg {
    height: 100%;
    width: 340px;
    img {
      height: 100%;
    }
  }
  .fr-box-content {
    background: #fff;
    width: 340px;
    padding: 0 35px 20px 35px;
    .login-tit {
      p {
        font-size: 20px;
        color: #3383d0;
        text-align: center;
        line-height: 50px;
        margin: 0;
      }
      i {
        width: 100%;
        height: 20px;
        background: url("../../assets/images/login_lucency.png") no-repeat;
        display: inline-block;
      }
    }
    .login-content {
      .person {
        background: url("../../assets/images/username.png") no-repeat;
        width: 13px;
        height: 13px;
      }
      .password-icon {
        background: url("../../assets/images/password.png") no-repeat;
        width: 13px;
        height: 13px;
      }
      .error {
        font-size: 14px;
        color: red;
      }
      .marginToggle {
        margin-bottom: 0;
      }
    }
    .el-row,
    .el-col {
      height: 40px;
    }
    .verify-img {
      height: 100%;
      margin-right: -20px;
      img {
        height: 100%;
      }
    }
    .rember-pass {
      margin: 20px 0;
      span {
        color: #999999;
        font-size: 14px;
      }
    }
  }
  img {
    display: inline-block;
    height: auto;
    max-width: 100%;
  }
}
</style>
<style lang="scss">
.login {
  .el-input__prefix {
    display: flex;
    align-items: center;
  }
  .rember-pass {
    span {
      color: #999999;
      font-size: 14px;
    }
  }
  .el-button {
    width: 100%;
  }
}
</style>
