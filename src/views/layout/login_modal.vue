<template>
  <el-dialog :visible.sync="loginVisible" width="23%" :before-close="handleClose" id="loginDialog">
    <div v-if="temp == 'dl'">
      <h3 class="loginTitle">登陆</h3>
      <el-input v-model="loginForm.tel" placeholder="请输入登录名/手机号" class="username"></el-input>
      <el-input type="password" v-model="loginForm.passwd" placeholder="请输入密码" class="password"></el-input>
      <div class="passCheck">
        <input type="checkbox" v-model="isCheck" class="isCheck">记住密码
        <span class="remPass">忘记密码</span>
      </div>
      <el-button type="primary" @click="loginUp">登 陆</el-button>
      <div class="registe" @click="temp = 'zc'">立即注册></div>
    </div>
    <div v-if="temp == 'zc'" class="zcBox">
      <h3 class="loginTitle">注册</h3>
      <span class="backLogin" @click="temp = 'dl'">已有账号，立刻登陆></span>
      <el-form ref="zcForm" :model="zcForm" :rules="rules">
        <el-form-item prop="dw">
          <el-input v-model="zcForm.dw" placeholder="单位或个人" class="dw"></el-input>
        </el-form-item>
        <el-form-item prop="zctel">
          <el-input v-model="zcForm.zctel" placeholder="手机号" class="zcusername"></el-input>
        </el-form-item>
        <el-form-item prop="zcpass1">
          <el-input type="password" v-model="zcForm.zcpass1" placeholder="密码" class="zcpassword"></el-input>
        </el-form-item>
        <el-form-item prop="zcpass2">
          <el-input type="password" v-model="zcForm.zcpass2" placeholder="确认密码" class="zcpassword"></el-input>
        </el-form-item>
      </el-form>
      <span style="color:red" v-if="zcForm.zcpass1!=zcForm.zcpass2">两次输入密码不一致</span>
      <div class="agreeOpt">
        <input type="checkbox" v-model="zcCheck"> 同意
        <span>"服务条款"</span>，
        <span>"用户须知"</span> 和
        <span>"隐私相关政策"</span>。
      </div>
      <el-button
        type="primary"
        @click="addUser"
        :disabled="!zcCheck || zcForm.zcpass1!=zcForm.zcpass2 "
      >立即注册</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { zcCommit, getUser } from "@/api/login";
export default {
  data() {
    return {
      loginVisible: false,
      isCheck: false,
      loginForm: {},
      zcForm: {},
      temp: "dl",
      zcCheck: true
    };
  },
  props: {
    modalShow: Boolean
  },
  watch: {
    modalShow(val) {
      this.loginVisible = val;
    }
  },
  methods: {
    handleClose() {
      this.$emit("update:modalShow");
    },
    loginUp() {
      let _this = this;
      if (this.isCheck) {
        this.setCookie(
          this.loginForm.name,
          Base64.encode(this.loginForm.pass),
          7
        );
      } else {
        this.clearCookie();
      }
      _this.$store
        .dispatch("LoginByUsername", this.loginForm)
        .then(res => {
          if (res) {
            if (getToken()) {
              getUser("/uUserPortal/queryBytoken?token=" + getToken()).then(
                res => {
                  let data = res.data;
                  if (data.success) {
                    this.$store.commit(
                      "SET_USER1",
                      data.data.uUserInfoPortal.xm
                    );
                  }
                }
              );
            }
            this.$message({
              message: "登陆成功",
              type: "success"
            });
            _this.loginVisible = false;
          }
        })
        .catch(error => {});
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
    },
    addUser() {
      let obj = {};
      obj.uUserPortal = {
        tel: this.zcForm.zctel,
        password: this.zcForm.zcpass2
      };
      obj.uUserInfoPortal = {};
      let _this = this;
      let url = "/uUserPortal/SaveAndUpdateToUserPortalAndInfoPortal";
      this.$refs.zcForm.validate(valid => {
        if (valid) {
          zcCommit(url, obj).then(res => {
            let data = res.data;
            if (data.success) {
              this.$message({
                message: "注册成功",
                type: "success"
              });
              _this.zcForm = {};
              // _this.temp = 'dl';
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="scss">
.zcBox {
  .el-form-item {
    margin-bottom: 0;
  }
}
#loginDialog {
  .el-dialog__body {
    padding: 15px 20px;
  }

  .el-button + .el-button {
    margin-left: 0;
  }
  .el-button {
    padding: 13px 0;
    display: block;
    width: 100%;
    margin-bottom: 15px;
  }
  .loginTitle {
    font-size: 20px;
    display: inline-block;
    border-bottom: 2px solid #409eff;
    padding: 0 5px 3px 5px;
    margin-bottom: 5px;
  }
  .obtain {
    display: inline-block;
    width: 30%;
  }
  .backLogin {
    float: right;
    cursor: pointer;
    color: #e6a23c;
    font-size: 14px;
  }
  .zcBox .el-input {
    margin-bottom: 15px;
  }
  .zcBox .el-input.password {
    margin-bottom: 15px;
  }
  .agreeOpt {
    color: #999;
    height: 60px;
    span {
      color: #409eff;
    }
  }
  .el-input {
    margin-bottom: 30px;
    position: relative;
    .el-input__inner {
      padding-left: 25px;
    }
  }
  .el-input.zcdxyz {
    display: inline-block;
    width: 65%;
  }
  .el-input.username::after {
    content: "";
    width: 20px;
    height: 20px;
    position: absolute;
    background: url("../../assets/images/username.png") no-repeat;
    background-size: "100% 100%";
    z-index: 999999;
    left: 6px;
    top: 13px;
  }
  .el-input.password::after {
    content: "";
    width: 20px;
    height: 20px;
    position: absolute;
    background: url("../../assets/images/password.png") no-repeat;
    background-size: "100% 100%";
    left: 6px;
    top: 13px;
  }
  .el-input.password {
    margin-bottom: 3px;
  }
  .passCheck {
    height: 70px;
    color: #999;
    padding-top: 8px;
    .remPass {
      float: right;
      color: #409eff;
      cursor: pointer;
    }
  }
  .registe {
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #e6a23c;
    cursor: pointer;
  }
}
</style>
