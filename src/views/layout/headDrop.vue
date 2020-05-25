<template>
  <div class="headDrop">
    <el-dropdown>
      <span class="el-dropdown-link">
        {{$t("headDrop.welcome")}}, {{username}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" v-if="!token">
        <el-dropdown-item @click.native="btn_login">{{$t("headDrop.login")}}</el-dropdown-item>
      </el-dropdown-menu>
      <el-dropdown-menu slot="dropdown" v-else>
        <el-dropdown-item @click.native="btn_modify">{{$t("headDrop.changepassword")}}</el-dropdown-item>
        <el-dropdown-item @click.native="btn_out">{{$t("headDrop.dropout")}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dropdown
      @command="handleSetLanguage"
      trigger="click"
      style="padding-left:10px;cursor: pointer;"
    >
      <span class="el-dropdown-link">
        {{$t("headDrop.switchZhOrEn")}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="zh" :disabled="language==='zh'">中文</el-dropdown-item>
        <el-dropdown-item command="en" :disabled="language==='en'">English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="formData" ref="from" :rules="rules" label-width="80px">
        <el-form-item label="原密码" prop="oldPassWord">
          <el-input type="password" v-model="formData.oldPassWord"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassWord">
          <el-input type="password" v-model="formData.newPassWord"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="btn_save">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <loginModal :modalShow.sync="loginShow"></loginModal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth";
import { validPassword } from "@/utils/validate";
import loginModal from "@/views/layout/login_modal";
export default {
  name: "headDrop",
  components: {
    loginModal
  },
  data() {
    const oldPassWord = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入旧密码"));
      } else {
        callback();
      }
    };
    const newPassWord = (rule, value, callback) => {
      if (!validPassword(value)) {
        callback(new Error("密码由6-20字母和数字组成"));
      } else {
        if (value === this.formData.oldPassWord) {
          callback(new Error("旧密码不能和新密码一样"));
        } else {
          callback();
        }
      }
    };
    return {
      username: "",
      dialogVisible: false,
      loginShow: false,
      formData: {
        oldPassWord: "",
        newPassWord: "",
        id: ""
      },
      rules: {
        oldPassWord: [{ required: true, validator: oldPassWord }],
        newPassWord: [{ required: true, validator: newPassWord }]
      }
    };
  },
  computed: {
    ...mapGetters(["token"]),
    language() {
      return this.$store.state.app.language;
    }
  },
  methods: {
    // 中英文切换
    handleSetLanguage(lang) {
      this.$i18n.locale = lang;
      this.$store.dispatch("setLanguage", lang);
      this.$message({
        message: "switch language success",
        type: "success"
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    btn_login() {
      this.loginShow = true;
    },
    btn_modify() {
      this.dialogVisible = true;
    },
    btn_save() {
      let _this = this;
      this.$refs.from.validate(valid => {
        if (valid) {
        } else {
          return false;
        }
      });
    },
    btn_out() {
      this.$store.dispatch("LogOut");
    }
  },

  mounted() {
    this.username = this.$store.getters.nickname;
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/variable.scss";
.headDrop {
  float: right;
  height: 30px;
  line-height: 30px;
  margin-top: calc((#{$logoHeight} - 30px) / 2);
  margin-right: 20px;
}
</style>

<style lang="scss">
.headDrop {
  .el-dialog__header {
    line-height: 24px;
  }
  .el-dropdown {
    color: #fff;
  }
}
</style>
