<template>
  <div class="dictBox">
    <div class="boxTop">
      <el-collapse v-model="activeName">
        <el-collapse-item title="查询条件" name="1">
          <el-form class="headSearch">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-select v-model="bmValue" placeholder="请选择" class="khnd">
                  <el-option v-for="(item,index) in bmoptions" :key="index" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <div class="btnBox" :span="12">
                <el-button type="success" @click="dictList">
                  <span class="el-icon-search"></span>
                </el-button>
              </div>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="boxBot">
      <div class="user-tit">
        <el-row>
          <el-col :span="12">
            <div class="user-left">
              <span @click="dictNew">新建</span>
              <span @click="dict_del">删除</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="user-list">
        <el-table :data="dictData" stripe border style="width: 100%" @selection-change="dictChange">
          <el-table-column type="selection"></el-table-column>
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="dicttype" label="字典类型"></el-table-column>
          <el-table-column prop="dictname" label="字典项"></el-table-column>
          <el-table-column prop="dictcode" label="字典值"></el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="warning" @click="editTab(scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="role-listdialog">
      <el-dialog :title="dictTid" :visible.sync="dialogVisible" width="30%" :before-close="userClose">
        <div class="dict-content">
          <el-form :inline="true" :model="dictForm" label-width="90px" ref="dictForm" class="demo-form-inline" :rules="rulesDic">
            <el-row>
              <el-col :span="23" :offset="1">
                <el-row :gutter="20" style="margin:0 0 10px 0">
                  <el-col :span="5" style="padding:0">
                    <span class="red">*</span>
                    <span>字典类型：</span>
                  </el-col>
                  <el-col :span="19" style="padding:0">
                    <el-form-item prop="dicttype">
                      <el-select v-model="dictForm.dicttype" placeholder="字典类型">
                        <el-option v-for="(item,index) in zdoptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="23" :offset="1">
                <el-row :gutter="20" style="margin:0 0 10px 0">
                  <el-col :span="5" style="padding:0">
                    <span class="red">*</span>
                    <span>字典项：</span>
                  </el-col>
                  <el-col :span="19" style="padding:0">
                    <!-- <el-form-item prop="rolename"> -->
                      <el-form-item prop="dictname">
                        <el-input v-model.trim="dictForm.dictname" placeholder="字典项"></el-input>
                      </el-form-item>
                    <!-- </el-form-item> -->
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="23" :offset="1">
                <el-row :gutter="20" style="margin:0 0 10px 0">
                  <el-col :span="5" style="padding:0">
                    <span class="red">*</span>
                    <span>字典值：</span>
                  </el-col>
                  <el-col :span="19" style="padding:0">
                    <el-form-item prop="dictcode">
                      <el-input v-model="dictForm.dictcode" placeholder="字典值"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="btn_dictAdd">保 存</el-button>
          <el-button @click="dialogVisible=false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
//调dict.js里的接口函数名
import { dictSelect, dictAdd, dictDel } from "@/api/dict";
import { doCreate } from "@/utils/config";
export default {
  data() {
    return {
      dialogVisible: false,
      activeName: "1",
      dictData: [],
      bmValue: "hylx",
      bmoptions: [],
      zdoptions: [],
      dictTid: "",
      checkBox: 0,
      dictForm: {
        dictcode: "",
        dictname: "",
        dicttype: ""
      },
      rulesDic: {
        dicttype: [{ required: true, message: "不能为空" }],
        dictname: [{ required: true, message: "不能为空" }],
        dictcode: [{ required: true, message: "不能为空" }]
      }
    };
  },
  methods: {
    userClose() {
      this.dialogVisible = false;
    },
    //点击查询，显示列表
    dictList() {
      dictSelect(this.bmValue ? this.bmValue : "hylx").then(res => {
        let data = res.data;
        if (data.success) {
          this.dictData = data.data;
        } else {
          this.dictData = [];
          this.$message({
            message: "暂无此字典项",
            type: "error"
          });
        }
      });
    },
    //新增接口
    btn_dictAdd() {
      this.$refs.dictForm.validate(valid => {
        if (valid) {
          let url = "edit";
          let obj = Object.assign({}, this.dictForm);
          let DicType = "";
          if (!obj.id) {
            url = "add";
            delete obj.id;
          }
          DicType = obj.dicttype;
          dictAdd(url, obj).then(res => {
            let data = res.data;
            if (data.success) {
              sessionStorage.removeItem(obj.dicttype);
              doCreate(obj.dicttype);
              this.bmValue = DicType;
              this.dictList();
              this.dialogVisible = false;
              this.$message({
                message: data.msg,
                type: "success"
              });
            } else {
              this.$message({
                message: data.msg,
                type: "error"
              });
            }
          });
        }
      });
    },
    dictNew() {
      this.dialogVisible = true;
      this.dictTid = "新建";
      this.dictForm = {};
      if (this.$refs.dictForm) {
        this.$refs.dictForm.resetFields();
      }
    },
    editTab(row) {
      this.dialogVisible = true;
      this.dictTid = "修改";
      // row.dictcode ? row.dictcode = row.dictcode*1:"";
      this.dictForm = Object.assign({}, row);
      if (this.$refs.dictForm) {
        this.$refs.dictForm.resetFields();
      }
    },
    dict_del() {
      let arrData = [];
      let qData = {};
      let _this = this;
      let dic = "";
      if (!this.checkBox || this.checkBox.length == 0) {
        this.$alert(
          "<i class='el-icon-info'></i> 请选择要删除的项目!",
          "提示",
          {
            dangerouslyUseHTMLString: true
          }
        );
        return;
      } else {
        this.$confirm("你确定删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          _this.checkBox.map(i => {
            arrData.push(i.id);
          });
          dic = _this.checkBox[0].dicttype;
          qData.ids = arrData;
          dictDel(qData).then(res => {
            let data = res.data;
            if (data.success) {
              sessionStorage.removeItem(dic);
              doCreate(dic);
              _this.bmValue = dic;
              _this.dictList();
              this.$message({
                type: "success",
                message: data.msg
              });
            } else {
              this.$message({
                type: "error",
                message: data.msg
              });
            }
          });
        });
      }
    },
    dictChange(val) {
      this.checkBox = val;
    }
  },
  mounted() {
    this.bmoptions = doCreate("all");
    this.zdoptions = doCreate("all");
    this.dictList();
  }
};
</script>

<style lang="scss" scoped>
.dictBox {
 padding: 10px 20px;
  color: #333;
  .headSearch {
    .khnd {
      width: 90%;
    }
  }
  .boxTop,
  .boxBot {
    box-sizing: border-box;
  }
  .boxBot {
    margin-top: 10px;
    .user-tit {
      background: #00b09e;
      margin: 10px 0;
      .user-left {
        span {
          color: #fff;
          width: 70px;
          display: inline-block;
          text-align: center;
          cursor: pointer;
          border-right: 1px solid #fff;
          margin: 10px 0;
        }
      }
    }
  }
  .dict-content {
    border-bottom: 1px dashed #ccc;
    padding-bottom: 20px;
  }
}
</style>
<style lang="scss">
.dictBox {
  .el-collapse-item__content {
    padding: 10px;
  }
  .el-collapse {
    border-top: none;
  }
  .el-collapse-item__header {
    background: #00b09e;
    margin-top: 5px;
    height: 35px;
    line-height: 35px;
    color: #fff;
    font-size: 14px;
    text-indent: 16px;
    border: none;
  }
  .el-collapse-item__arrow {
    line-height: 30px;
  }
  .el-collapse-item__wrap {
    border: 1px solid #00b09e;
    border-top: none;
  }
  .el-table thead.is-group th,
  td {
    text-align: center;
  }
  .el-button--success {
    background: #9585bf;
    border: none;
  }
  .wait-page {
    margin-top: 20px;
  }
  .boxBot {
    .el-input__inner {
      border-radius: 15px;
    }
    .user-right {
      .el-input__inner {
        background: #5998d6;
        border: none;
        margin: 3px 0;
      }
    }
    .el-icon-search {
      cursor: pointer;
    }
  }
  .user-list {
    th,
    td {
      text-align: center;
    }
  }
  .role-listdialog {
    .el-dialog__header {
      background: #00b09e;
      .el-dialog__title {
        color: #fff;
      }
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
  .el-select {
    width: 100%;
  }
}
</style>
