<template>
  <div class="user-listdialog">
    <el-dialog
      :title="text_Tit "
      :visible.sync="newModalToggle"
      width="50%"
      :before-close="userClose"
    >
      <div class="user-content">
        <el-tabs v-model="tabToggle" type="card">
          <el-tab-pane label="登录信息" name="first">
            <el-form
              :inline="true"
              class="demo-form-inline"
              :model="userForm.uUser"
              ref="userForm"
              :rules="rulesUser"
            >
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span class="red">*</span>
                      <span>昵称：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-form-item prop="nickname">
                        <el-input v-model.trim="userForm.uUser.nickname"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span class="red">*</span>
                      <span>账号：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-form-item prop="username">
                        <el-input v-model.trim="userForm.uUser.username"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span class="red">*</span>
                      <span>密码：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-form-item prop="password">
                        <el-input type="password" v-model.trim="userForm.uUser.password"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>

                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span class="red">*</span>
                      <span>角色：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-form-item prop="rId">
                        <el-select v-model="userForm.uUser.rId" placeholder="请选择">
                          <el-option
                            v-for="(item,index) in typeoptions"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span class="red">*</span>
                      <span>行政区划：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-form-item prop="xzqh">
                        <el-input
                          v-model="userForm.uUser.xzqh"
                          placeholder="请选择"
                          @focus="modelStatus('xzqh')"
                          readonly
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span class="red">&nbsp;&nbsp;</span>
                      <span>部门：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-form-item>
                        <el-input
                          v-model="userForm.uUser.bmbm"
                          placeholder="请选择"
                          @focus="modelStatus('bm')"
                          clearable
                          @clear="clearBm"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="userbtn_save">保 存</el-button>
        <el-button @click="btn_cancel">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 行政证区划弹框 -->
    <el-dialog :title="model_Tit" :visible.sync="xzqh_model" width="50%" :before-close="xzqhClose">
      <el-tree
        :data="xzqh_data"
        @node-click="nodeClick"
        default-expand-all
        :expand-on-click-node="false"
        :highlight-current="true"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" @click="xzqh_save">保 存</el-button> -->
        <el-button @click="xzqhClose">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 部门弹框 -->
    <el-dialog :title="model_Tit" :visible.sync="bm_model" width="50%" :before-close="xzqhClose">
      <el-tree
        :data="bm_data"
        @node-click="bmnodeClick"
        default-expand-all
        :expand-on-click-node="false"
        :highlight-current="true"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" @click="xzqh_save">保 存</el-button> -->
        <el-button @click="xzqhClose">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>



<script>
import { doCreate, getDicTab } from "@/utils/config";
import { userAdd, userSearch } from "@/api/user";
import { roleSearch } from "@/api/role";
import { validPassword } from "@/utils/validate";
import { treeQuery } from "@/api/administrative";
import { treeQueryBm } from "@/api/department";
import { debug } from "util";
export default {
  data() {
    const PassWord = (rule, value, callback) => {
      if (!validPassword(value)) {
        callback(new Error("密码由6-20字母和数字组成"));
      } else {
        callback();
      }
    };
    return {
      newModalToggle: false,
      xzqh_model: false,
      bm_model: false,
      tabToggle: "",
      text_Tit: "",
      xzqh_data: [],
      bm_data: [],
      userXzqh: "",
      bmbm: "",
      xzqh: "",
      model_Tit: "",
      typeoptions: [],
      userForm: {
        uUser: {
          nickname: "",
          username: "",
          password: "",
          rId: "",
          userstatus: "",
          yxkssj: "",
          yxjzsj: "",
          mmyxsj: "",
          xzqh: "",
          bmbm: ""
        },
        uUserInfo: {
          zc: "",
          lx: "",
          sstd: "",
          tel: ""
        }
      },
      rulesUser: {
        nickname: [{ required: true, message: "不能为空" }],
        username: [{ required: true, message: "不能为空" }],
        xzqh: [{ required: true, message: "不能为空" }],
        // bmbm: [{ required: true, message: "不能为空" }],
        password: [
          {
            required: true,
            validator: PassWord,
            trigger: "blur"
          }
        ],
        rId: [{ required: true, message: "不能为空" }]
      }
    };
  },
  props: {
    newModal: Boolean,
    activeTab: {
      default: "first"
    },
    textTit: {
      default: ""
    },
    userData: {
      default: () => {}
    }
  },
  methods: {
    clearBm() {
      this.userForm.uUser.bmbm = "";
      this.bmbm = "";
    },
    remarkDic(row) {
      return getDicTab("remark", row);
    },
    remarkHq(row) {
      if (row.search("_") != -1) {
        return row.split("_")[0];
      } else {
        return row;
      }
    },
    //查询部门树
    bmData() {
      treeQueryBm({ xzqh: this.xzqh }).then(res => {
        let data = res.data;
        this.bm_model = true;
        if (data.success) {
          this.bm_data = data.data;
        }
      });
    },
    modelStatus(data) {
      let _this = this;
      if (data) {
        if (data == "xzqh") {
          this.model_Tit = "行政区划";
          treeQuery({ bm: this.userXzqh }).then(res => {
            let data = res.data;
            this.xzqh_model = true;
            if (data.success) {
              _this.xzqh_data = data.data;
              // _this.$refs.multipleTable.toggleRowSelection(_this.xzqh,true);
            }
          });
        } else if (data == "bm") {
          if (this.userForm.uUser.xzqh) {
            this.model_Tit = "部门编码";
            this.bmData();
          } else {
            this.$message({
              type: "warning",
              message: "请返回选择行政区划"
            });
            return false;
          }
        }
      }
    },
    xzqhClose() {
      this.xzqh_model = false;
      this.bm_model = false;
    },
    btn_cancel() {
      this.newModalToggle = false;
      this.$emit("newToggle", this.newModalToggle);
    },
    userClose() {
      this.btn_cancel();
    },
    nodeClick(data) {
      this.xzqh = data.bm;
      this.userForm.uUser.xzqh = data.name;
      this.userForm.uUser.bmbm = "";
      this.xzqh_model = false;
      this.bm_model = false;
    },
    bmnodeClick(data) {
      this.bmbm = data.bm;
      this.userForm.uUser.bmbm = data.name;
      this.xzqh_model = false;
      this.bm_model = false;
    },

    userbtn_save() {
      let _this = this;
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.userForm.uUser.xzqh = this.xzqh;
          this.userForm.uUser.bmbm = this.bmbm;
          this.userForm.uUser.cjr = this.$store.getters.user.uUser.nickname;
          if (
            _this.remarkDic(_this.userForm.uUser.rId).indexOf("czy_") != "-1" ||
            _this.remarkDic(_this.userForm.uUser.rId).indexOf("gly_bm_") !=
              "-1" ||
            _this.remarkDic(_this.userForm.uUser.rId).indexOf("ld_bm") != "-1"
          ) {
            if (_this.bmbm == "") {
              _this.$message({
                message: "请选择部门~",
                type: "error"
              });
              _this.userForm.uUser.xzqh = getDicTab("xzqh", this.xzqh);
              return;
            } else {
              userAdd(_this.userForm).then(res => {
                let data = res.data;
                if (data.success) {
                  delete _this.userForm.uUser.id;
                  _this.btn_cancel();
                  _this.bmbm = "";
                  _this.xzqh = "";
                  _this.$message({
                    message: data.msg,
                    type: "success"
                  });
                  _this.$emit("addevent", Math.random());
                } else {
                  _this.$message({
                    message: data.msg,
                    type: "error"
                  });
                }
              });
            }
          } else {
            userAdd(_this.userForm).then(res => {
              let data = res.data;
              if (data.success) {
                delete _this.userForm.uUser.id;
                _this.btn_cancel();
                _this.bmbm = "";
                _this.xzqh = "";
                _this.$message({
                  message: data.msg,
                  type: "success"
                });
                _this.$emit("addevent", Math.random());
              } else {
                _this.$message({
                  message: data.msg,
                  type: "error"
                });
              }
            });
          }
        }
      });
    },
    //解析用户角色
    userRole() {
      let dicMap = window.sessionStorage;
      roleSearch().then(res => {
        let data = res.data;
        if (data.success) {
          this.typeoptions = data.data.map(i => {
            i.label = i.rolename;
            i.value = i.id;
            return i;
          });
          dicMap.setItem("role", JSON.stringify(data.data));
          let remarkArr = [];
          data.data.map(i => {
            remarkArr.push({
              label: i.remark,
              value: i.id
            });
          });
          dicMap.setItem("remark", JSON.stringify(remarkArr));
        }
      });
    }
  },
  watch: {
    newModal(val) {
      this.newModalToggle = val;
      this.tabToggle = this.activeTab;
      this.text_Tit = this.textTit;
      if (this.$refs.userForm) {
        this.$refs.userForm.resetFields();
      }
    },
    userData(val) {
      if (!(JSON.stringify(val) == "{}")) {
        this.xzqh = val.uUser.xzqh;
        this.bmbm = val.uUser.bmbm;
        let obj = Object.assign({}, val.uUser);
        obj.xzqh = getDicTab("xzqh", val.uUser.xzqh);
        if (val.uUser.bmbm) {
          obj.bmbm = getDicTab("bmbm", val.uUser.xzqh + "-" + val.uUser.bmbm);
        }

        this.userForm.uUser = Object.assign({}, obj);
      } else {
        if (this.$refs.userForm) {
          this.$refs.userForm.resetFields();
        }
        this.userForm.uUser = {
          nickname: "",
          username: "",
          password: "",
          rId: "",
          userstatus: "",
          yxkssj: "",
          yxjzsj: "",
          mmyxsj: "",
          xzqh: "",
          bmbm: ""
        };
      }
    }
  },
  mounted() {
    this.userRole();
    this.userXzqh = this.$store.state.user.user.uUser.xzqh;
  }
};
</script>
<style lang="scss" scoped>
.user-listdialog {
  .user-content {
    border-bottom: 1px dashed #ccc;
    padding-bottom: 20px;
  }
}
</style>


<style lang="scss">
.user-listdialog {
  .el-dialog__header {
    background: #00b09e;
    .el-dialog__title {
      color: #fff;
    }
  }
  .el-dialog__body {
    padding: 20px 20px 0 20px;
  }
  .user-content {
    .el-input__inner {
      border-radius: 0;
    }
    .el-select {
      width: 100%;
    }
    .el-date-editor {
      width: 100%;
    }
    .el-button {
      height: 40px;
      margin: 0 5px;
    }
  }
  .el-dialog__footer {
    text-align: center;
  }
  .el-form-item {
    width: 100%;
    margin-bottom: 0;
    & > div {
      width: 100%;
    }
  }
}
</style>

