<template>
  <div class="role-listdialogNew">
    <el-dialog :title="text_Tit " :visible.sync="newModalToggle" width="50%" :before-close="roleClose">
      <div class="role-content">
        <el-form :inline="true" class="demo-form-inline" :model="roleForm" ref="roleForm" :rules="rulesRole">
          <el-row :gutter="20">
            <el-col :span="23" :offset="1">
              <el-row :gutter="20" style="margin:0 0 10px 0">
                <el-col :span="5" style="padding:0">
                  <span>角色名称：</span>
                </el-col>
                <el-col :span="19" style="padding:0">
                  <el-form-item prop="rolename">
                    <el-input v-model.trim="roleForm.rolename"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="23" :offset="1">
              <el-row :gutter="20" style="margin:0 0 10px 0">
                <el-col :span="5" style="padding:0">
                  <span>角色描述：</span>
                </el-col>
                <el-col :span="19" style="padding:0">
                  <el-form-item prop="remark">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model.trim="roleForm.remark">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="btn_roleAdd">保 存</el-button>
        <el-button @click="btn_roleCancel">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>



<script>
import { roleAdd, roleSearchPage } from "@/api/role";
export default {
  data() {
    return {
      newModalToggle: false,
      text_Tit: "",
      newData: new Date().getTime(),
      pageSize: 3,
      pageNo: 1,
      pageSize2: 10,
      pageNo2: 1,
      roleForm: {
        rolename: "",
        remark: ""
      },
      rulesRole: {
        rolename: [{ required: true, message: "不能为空" }],
        remark: [{ required: true, message: "不能为空" }]
      }
    };
  },
  props: {
    newModal: Boolean,
    textTit: {
      default: ""
    },
    roleData: {
      default:()=> {}
    }
  },
  methods: {
    btn_roleCancel() {
      this.newModalToggle = false;
      this.$emit("newToggle", this.newModalToggle);
    },
    roleClose() {
      this.btn_roleCancel();
    },
    btn_roleAdd() {
      this.$refs.roleForm.validate(valid => {
        if (valid) {
          let url = "edit";
          if (!this.roleForm.id) {
            url = "add";
          }
          roleAdd(url, this.roleForm).then(res => {
            let data = res.data;
            if (data.success) {
              this.btn_roleCancel();
              
          this.$emit("upTabelList");
            
            }
            this.$message({
              message: data.msg,
              type: "success"
            });
          });
        }
      });
    },
    roleList(pageSize, pageNo) {
      roleSearchPage(pageSize, pageNo).then(res => {
        let data = res.data;
        if (data.success) {
        }
      });
    }
  },
  watch: {
    newModal(val) {
      this.newModalToggle = val;
      this.text_Tit = this.textTit;
      if (this.$refs.roleForm) {
        this.$refs.roleForm.resetFields();
      }
    },
    roleData(val) {
      this.roleForm = Object.assign({}, val);
    }
  }
};
</script>
<style lang="scss" scoped>
.role-listdialogNew {
  .role-content {
    border-bottom: 1px dashed #ccc;
    padding-bottom: 20px;
  }
}
</style>


<style lang="scss">
.role-listdialogNew {
  .el-dialog__header {
    background: #00b09e;
    .el-dialog__title {
      color: #fff;
    }
  }
  .el-dialog__body {
    padding: 20px 20px 0 20px;
  }
  .role-content {
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

