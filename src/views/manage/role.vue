<template>
  <div class="role">
    <div class="role-tit">
      <el-row>
        <el-col :span="12">
          <div class="role-left">
            <span @click="role_new">新建</span>
            <span @click="role_revamp">修改</span>
            <span @click="role_del">删除</span>
            <span @click="role_accredit">授权</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <role-list @checkboxChange="checkboxChange" :roleTab="roleTab"></role-list>
    <role-listdialognew
      :newModal="newModal"
      @newToggle="newToggle"
      :textTit="textTit"
      :roleData="roleData"
      @upTabelList="upTabelList"
    ></role-listdialognew>
    <role-listdialogaccr :accrModal="accrModal" :check="checkBox" @accrToggle="accrToggle"></role-listdialogaccr>
  </div>
</template>
<script>
import roleList from "./role-list";
import roleListdialognew from "./role-listdialognew";
import roleListdialogaccr from "./role-listdialogaccr";
import { roleDel, roleSearch } from "@/api/role";
export default {
  components: {
    roleList,
    roleListdialognew,
    roleListdialogaccr
  },
  data() {
    return {
      newModal: false,
      accrModal: false,
      checkBox: [],
      textTit: "",
      roleData: {},
      roleTab: [],
      name: ""
    };
  },
  methods: {
    role_new() {
      this.newModal = true;
      this.textTit = "新建";
      this.roleData = {};
    },
    newToggle(val) {
      this.newModal = val;
    },
    accrToggle(val) {
      this.accrModal = val;
    },
    role_revamp() {
      this.suer_public("newModal");
      this.textTit = "修改";
      if (this.checkBox.length) {
        this.roleData = this.checkBox[0];
      }
    },
    role_del() {
      let dataArr = [];
      let qData = {};
      if (!this.checkBox || this.checkBox.length == 0) {
        this.$alert(
          "<i class='el-icon-info'></i> 请选择要删除的角色!",
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
          this.checkBox.map(i => {
            dataArr.push(i.id);
          });
          qData.ids = dataArr;
          roleDel(qData).then(res => {
            let data = res.data;
            if (data.success) {
              this.role_search();
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
    role_search() {
      roleSearch(this.name).then(res => {
        let data = res.data;
        if (data.success) {
          this.roleTab = data.data;
          this.name = "";
        } else {
          this.roleTab = [];
        }
      });
    },
    role_accredit() {
      this.suer_public("accrModal");
    },
    suer_public(modal) {
      if (!this.checkBox || this.checkBox.length == 0) {
        this.$alert("<i class='el-icon-info'></i> 请选择角色!", "提示", {
          dangerouslyUseHTMLString: true
        });
        return;
      } else if (this.checkBox.length > 1) {
        this.$alert("<i class='el-icon-info'></i> 只能选择一个角色!", "提示", {
          dangerouslyUseHTMLString: true
        });
      } else {
        this[modal] = true;
      }
    },
    checkboxChange(checkBoxVal) {
      this.checkBox = checkBoxVal;
    },
    upTabelList() {
      this.roleTab = Math.random();
    }
  }
};
</script>

<style lang="scss" scoped>
.role {
  .role-tit {
    background: #00b09e;
    margin: 10px 0;
    .role-left {
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
</style>


