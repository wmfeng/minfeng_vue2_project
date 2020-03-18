<template>
  <div class="user">
    <div class="user-tit">
      <el-row>
        <el-col :span="12">
          <div class="user-left">
            <span @click="user_new">新建</span>
            <span @click="user_revamp">修改</span>
            <span @click="user_del">删除</span>
            <!-- <span @click="user_accredit">派驻</span> -->
          </div>
        </el-col>
        <el-col :span="6" :offset="6">
          <div class="user-right">
            <el-input placeholder="请输入内容" v-model="name" @keyup.enter.native="user_search"></el-input>
            <el-button slot="append" icon="el-icon-search" @click="user_search"></el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="user-list">
      <el-table
        :data="userTable"
        stripe
        border
        style="width: 100%"
        @selection-change="checkboxChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
        <el-table-column prop="nickname" label="用户名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="username" label="登录名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="rId" :formatter="usertypeDic" label="用户角色" show-overflow-tooltip></el-table-column>
        <el-table-column
          prop="zhdlsj"
          :formatter="formatterData"
          label="最后登录时间"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="cjr" label="创建人" show-overflow-tooltip></el-table-column>
      </el-table>
      <div class="user-page fr">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pageNo"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="totalCount"
        ></el-pagination>
      </div>
    </div>
    <user-listdialognew
      :newModal="newModal"
      :activeTab="activeTab"
      @newToggle="newToggle"
      :textTit="textTit"
      :userData="userData"
      @addevent="addevent"
    ></user-listdialognew>
    <!-- <xzqhor-bm-modal  @xzqhOrToggle="xzqhOrToggle" :xzqhModel="xzqhModel" :jsdwStr="jsdwStr"></xzqhor-bm-modal> -->
  </div>
</template>
<script>
import userListdialognew from "./user-listdialognew";
// import xzqhorBmModal from "./xzqhorBmModal";
import { userSearch, userByid, userDel } from "@/api/user";
import { formatDate } from "@/utils/data";
import { getDicTab } from "@/utils/config";
export default {
  components: {
    userListdialognew
    // xzqhorBmModal
  },
  data() {
    return {
      newModal: false,
      xzqhModel: false,
      checkBox: 0,
      activeTab: "first",
      textTit: "",
      userId: "",
      name: "",
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      jsdwStr: {},
      userData: {},
      userTable: []
    };
  },
  methods: {
    remarkDic(row) {
      return getDicTab("remark", row);
    },
    addevent(val) {
      this.user_search();
    },
    user_new() {
      this.newModal = true;
      this.textTit = "新建";
      this.userId = "";
      this.userData = {};
    },
    newToggle(val) {
      this.newModal = val;
    },
    user_revamp() {
      let _this = this;
      this.textTit = "修改";
      this.suer_public("newModal");
      if (this.checkBox.length) {
        this.userId = this.checkBox[0].id;
        this.dataFilling(_this.userId).then(res => {
          _this.userData = Object.assign({}, res);
        });
      }
    },
    dataFilling(id) {
      let _this = this;
      return new Promise((resolve, reject) => {
        userByid(id)
          .then(res => {
            let data = res.data;
            if (data.success) {
              resolve(data.data);
            }
          })
          .catch(res => {
            console.log("失败'");
          });
      });
    },
    //删除用户
    user_del() {
      let userArr = [];
      let qData = {};
      if (!this.checkBox || this.checkBox.length == 0) {
        this.$alert(
          "<i class='el-icon-info'></i> 请选择要删除的用户!",
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
        })
          .then(() => {
            this.checkBox.map(i => {
              userArr.push(i.id);
            });
            qData.ids = userArr;
            userDel(qData).then(res => {
              let data = res.data;
              if (data.success) {
                this.user_search();
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
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    //派驻员设置
    user_accredit() {
      let _this = this;
      if (!this.checkBox || this.checkBox.length == 0) {
        this.$alert(
          "<i class='el-icon-info'></i> 请选择要派驻的用户!",
          "提示",
          {
            dangerouslyUseHTMLString: true
          }
        );
        return;
      } else if (this.checkBox.length > 1) {
        this.$alert("<i class='el-icon-info'></i> 只能选择一个用户!", "提示", {
          dangerouslyUseHTMLString: true
        });
        return false;
      } else if (this.remarkDic(this.checkBox[0].rId).indexOf("pzy") == "-1") {
        this.$alert(
          "<i class='el-icon-info'></i> 只能选择派驻员用户!",
          "提示",
          {
            dangerouslyUseHTMLString: true
          }
        );
        return false;
      } else {
        this.xzqhModel = true;
        _this.jsdwStr = {
          num: Math.random(),
          xzqh: this.checkBox[0].xzqh,
          userId: this.checkBox[0].id
        };
      }
    },
    xzqhOrToggle(val) {
      this.xzqhModel = val;
    },
    suer_public(modal) {
      if (!this.checkBox || this.checkBox.length == 0) {
        this.$alert("<i class='el-icon-info'></i> 请选择用户!", "提示", {
          dangerouslyUseHTMLString: true
        });
        return false;
      } else if (this.checkBox.length > 1) {
        this.$alert("<i class='el-icon-info'></i> 只能选择一个用户!", "提示", {
          dangerouslyUseHTMLString: true
        });
        return false;
      } else {
        this[modal] = true;
      }
    },
    //查询
    user_search() {
      let _this = this;
      let obj = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        xzqh: this.$store.state.user.user.uUser.xzqh,
        bmbm: this.$store.state.user.user.uUser.bmbm
      };
      this.name ? (obj.name = this.name) : "";
      userSearch(obj).then(res => {
        let data = res.data;
        if (data.success) {
          _this.userTable = data.data.data;
          _this.totalCount = data.data.totalCount;
        } else {
          _this.userTable = [];
          _this.totalCount = 0;
          this.$message({
            type: "error",
            message: data.msg
          });
        }
      });
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.user_search();
    },
    indexMethod(index) {
      let start = (this.pageNo - 1) * this.pageSize;
      return start + index + 1;
    },
    formatterData(row) {
      return formatDate(row.zhdlsj, "yyyy-MM-dd");
    },
    usertypeDic(row) {
      return getDicTab("role", row.rId);
    },
    checkboxChange(checkBoxVal) {
      this.checkBox = checkBoxVal;
    }
  },
  mounted() {
    this.user_search();
  }
};
</script>

<style lang="scss" scoped>
.user {
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
    .user-right {
      position: relative;
    }
  }
}
</style>
<style lang="scss">
.user {
  .el-input__inner {
    border-radius: 15px;
  }
  .user-right {
    margin-right: 4px;
    .el-input__inner {
      background: #fff;
      border: none;
      height: 32px;
      margin-top: 3px;
    }

    .el-button {
      position: absolute;
      top: 0;
      right: 0;
      background: transparent;
      border: none;
      height: 36px;
      .el-icon-search {
        color: #ccc;
      }
      &:hover {
        .el-icon-search {
          color: #ccc;
        }
      }
    }
  }

  .el-icon-search {
    cursor: pointer;
  }
}
</style>


