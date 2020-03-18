<template>
  <div class="source">
    <div class="source_tree">
      <el-scrollbar class="page-component__scroll">
        <el-tree
          :data="xzqh_treeData"
          node-key="id"
          ref="tree"
          :default-expand-all="false"
          @node-click="xzqh_nodeClick"
          :expand-on-click-node="false"
          :default-expanded-keys="expandKeysXzqh"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <el-tooltip
              v-if="node.label.length>8"
              class="item"
              effect="dark"
              :content="node.label"
              placement="top"
            >
              <span class="nodeLabel">{{ node.label }}</span>
            </el-tooltip>
            <span v-else class="nodeLabel">{{ node.label }}</span>
          </span>
        </el-tree>
      </el-scrollbar>
    </div>
    <div class="source_tree">
      <el-scrollbar class="page-component__scroll">
        <el-tree
          :data="bm_treeData"
          node-key="id"
          ref="tree"
          :default-expand-all="false"
          @node-click="nodeClick"
          :expand-on-click-node="false"
          :default-expanded-keys="expandKeysBm"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <el-tooltip
              v-if="data.bmjc.length>8"
              class="item"
              effect="dark"
              :content="data.bmjc"
              placement="top"
            >
              <span class="nodeLabel">{{ data.bmjc }}</span>
            </el-tooltip>
            <span v-else class="nodeLabel">{{ data.bmjc }}</span>
            <span>
              <el-tooltip class="item" effect="dark" content="添加下级" placement="top">
                <i class="el-icon-plus" @click.stop="() => append(data)"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="添加本级" placement="top">
                <i class="el-icon-circle-plus-outline" @click.stop="() => appendTj(data)"></i>
              </el-tooltip>
              <i class="el-icon-delete" @click.stop="() => remove(node, data)"></i>
            </span>
          </span>
        </el-tree>
      </el-scrollbar>
    </div>
    <div class="source_form">
      <el-scrollbar class="page-component__scroll">
        <el-form
          :inline="true"
          :model="formData"
          label-width="140px"
          ref="formData"
          class="demo-form-inline"
          :rules="rules"
        >
          <el-row>
            <el-col :offset="1" :lg="22" :sm="22">
              <div class="page_middle">部门管理</div>
              <hr />
            </el-col>
          </el-row>
          <el-row>
            <el-col :lg="10" :sm="22" :offset="1">
              <el-form-item label="组织类型" prop="zzlx">
                <el-select
                  v-model="formData.zzlx"
                  placeholder="请选择"
                  style="width:100%"
                  @change="zzlxChenge"
                >
                  <el-option
                    v-for="(item,index) in typeoptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg="10" :sm="22" :offset="1">
              <el-form-item label="部门名称" prop="name">
                <el-input v-model.trim="formData.name" placeholder="部门名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :lg="10" :offset="1" :sm="22">
              <el-form-item label="部门简称" prop="bmjc">
                <el-input v-model.trim="formData.bmjc" placeholder="部门简称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="10" :offset="1" :sm="22">
              <el-form-item label="部门编码" prop="bm">
                <el-input v-model.trim="formData.bm" placeholder="部门编码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2" :offset="11">
              <el-form-item class="none">
                <el-button type="primary" @click="formSave">保存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import {
  treeQueryBm,
  formSave,
  findRoles,
  deleteTree,
  delMember
} from "@/api/department";
import { treeQuery } from "@/api/administrative";
import { doCreate, getDicTab } from "@/utils/config";
export default {
  data() {
    return {
      pid: "",
      pureClick: true,
      expandKeysBm: [],
      expandKeysXzqh: [],
      formData: {
        bm: ""
      },
      formData1: {
        dyrs: 0,
        zzdyrs: 0,
        ltxdyrs: 0
      },
      formData2: {
        dyrs: 0,
        zzdyrs: 0,
        ltxdyrs: 0
      },
      formData3: {
        dyrs: 0,
        zzdyrs: 0,
        ltxdyrs: 0
      },
      formData4: {
        dyrs: 0,
        zzdyrs: 0,
        ltxdyrs: 0
      },
      formData5: {
        dyrs: 0,
        lssysdy: 0,
        lssyxdy: 0
      },
      formData6: {
        dyrs: 0,
        zzdyrs: 0,
        ltxdyrs: 0
      },
      formData7: {
        dyrs: 0,
        lssysdy: 0,
        lssyxdy: 0
      },
      formData8: {
        dyrs: 0,
        lssysdy: 0,
        lssyxdy: 0
      },
      bm_treeData: [],
      xzqh_treeData: [],
      typeoptions: [],
      formBm: "",
      xzqh: "",
      userXzqh: this.$store.state.user.user.uUser.xzqh,
      bm: "",
      dzbArr1: [{ name: "" }],
      rules: {
        zzlx: [{ required: true, message: "不能为空" }],
        name: [{ required: true, message: "不能为空" }],
        bmjc: [{ required: true, message: "不能为空" }],
        bm: [{ required: true, message: "不能为空" }]
      }
    };
  },
  methods: {
    zzlxChenge() {
      this.dzbArr1 = [{ name: "" }];
    },
    append(data) {
      this.formBm = data.bm;
      this.pid = data.bm;
      this.pureClick = false;
      const newChild = { bmjc: "新增节点", bm: data.bm };
      data.children.push(newChild);
    },
    appendTj(data) {
      this.formBm = data.fId;
      this.pid = data.fId;
      this.pureClick = false;
      const newChild = { bmjc: "新增节点", bm: data.fId };
      if (data.fId == "0") {
        this.bm_treeData.push(newChild);
      } else {
        this.bm_treeData.map(t => {
          if (t.bm == data.fId) {
            t.children.push(newChild);
          } else if (data.fId == "0") {
            t.children.push(newChild);
          }
          return t;
        });
      }
    },
    remove(node, data) {
      this.pureClick = false;
      if (node.childNodes.length) {
        this.$message({
          type: "warning",
          message: "请删除子节点后再操作~"
        });
        return;
      }
      if (data.id) {
        this.$confirm("你确定删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            deleteTree({ bm: data.bm, xzqh: data.xzqh }).then(res => {
              let data = res.data;
              if (data.success) {
                this.$message({
                  type: "success",
                  message: data.msg
                });
                this.treeQueryBm(this.userXzqh);
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
      } else {
        this.$message({
          type: "success",
          message: "操作成功"
        });
        this.treeQueryBm(this.userXzqh);
      }
    },
    nodeClick(data) {
      if (this.pureClick) {
        this.xzqh = data.xzqh || "";
        this.bm = data.bm || "";
        this.dzbArr1 = [];
        this.formData = Object.assign({}, data);
      } else {
        this.$refs.formData.resetFields();
        this.formData = {
          bm: ""
        };
        this.formData.bm = this.formBm;
        this.pureClick = true;
      }
    },
    xzqh_nodeClick(row) {
      this.userXzqh = row.bm;
      this.pid = "";
      this.treeQueryBm(row.bm);
    },
    treeQueryXzqh() {
      let obj = this.$store.state.user.user.uUser.xzqh;
      treeQuery({ bm: obj }).then(res => {
        let data = res.data;
        if (data.success && data.data.length) {
          this.xzqh_treeData = data.data;
          this.expandKeysXzqh = [data.data[0].id];
          this.treeQueryBm(data.data[0].bm);
        } else {
          this.xzqh_treeData = [];
          this.bm_treeData = [];
          this.formData = {};
          this.expandKeysXzqh = [];
        }
      });
    },
    treeQueryBm(bm) {
      this.formData = { name: "", bm: "", zzlx: "", bmjc: "" };
      let obj = {
        xzqh: bm
        // bm: this.$store.state.user.user.uUser.bmbm
      };
      treeQueryBm(obj).then(res => {
        let data = res.data;
        if (data.success && data.data.length) {
          this.bm_treeData = data.data;
          this.dzbArr1 = [];
          this.formData = Object.assign({}, data.data[0]);
          this.$refs.formData.resetFields();
        } else {
          this.bm_treeData = [];
          this.$refs.formData.resetFields();
          this.pid = "";
        }
      });
    },
    saveFuncSame() {
      let _this = this;
      let url = "update";
      let obj = {};
      obj.dzb = "";
      if (this.formData.zzlx != 6) {
        this.dzbArr1.forEach((item, index) => {
          if (item.name) {
            obj.dzb += item.name + ",";
          }
        });
      }
      if (!obj.id) {
        url = "add";
        obj.fId = this.pid;
        obj.xzqh = this.userXzqh;
      }

      obj.dzb = obj.dzb ? obj.dzb.substring(0, obj.dzb.length - 1) : "";
      if (obj.fId != "0") {
        if (
          obj.fId != (obj.bm + "").substring(0, (obj.fId + "").length) ||
          ((obj.fId + "").length < 6 &&
            (obj.bm + "").length != (obj.fId + "").length + 3)
        ) {
          this.$message({
            showClose: true,
            message: "请输入正确的部门编码",
            duration: 3000,
            type: "error"
          });
          return;
        }
        if ((obj.fId + "").length >= 6) {
          if ((obj.bm + "").length != (obj.fId + "").length + 2) {
            this.$message({
              showClose: true,
              message: "请输入正确的部门编码",
              duration: 3000,
              type: "error"
            });
            return;
          }
        }
        if ((obj.fId + "").length >= 8) {
          this.$message({
            showClose: true,
            message: "请输入正确的部门编码",
            duration: 3000,
            type: "error"
          });
          return;
        }
      } else {
        if ((obj.bm + "").length != 3) {
          this.$message({
            showClose: true,
            message: "请输入正确的部门编码",

            type: "error"
          });
          return;
        }
      }
      formSave(url, obj).then(res => {
        let data = res.data;
        if (data.success) {
          _this.formData = {};
          _this.treeQueryBm(obj.xzqh);
          _this.$message({
            message: data.msg,
            type: "success"
          });
        } else {
          _this.$message({
            message: data.msg
          });
        }
      });
    },
    formSave() {
      let _this = this;
      this.$refs.formData.validate(valid => {
        if (valid) {
          _this.saveFuncSame();
        }
      });
    }
  },

  mounted() {
    this.treeQueryXzqh();
    this.$refs.tree.setCurrentKey([1]);
    this.typeoptions = doCreate("type");
  }
};
</script>
<style lang="scss" scoped>
.source {
  padding: 10px 20px;
  height: 100%;
  .source_tree {
    float: left;
    width: 300px;
    height: 81vh;
    overflow: auto;
    border-right: 1px dotted #999;
  }
  .source_form {
    float: left;
    width: calc(100% - 600px);
    height: 100%;
  }
  .page_middle {
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #f3f3f3;
  }
  .marr10 {
    margin: 15px 3% 15px 0;
  }
  .nodeLabel {
    width: 160px;
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>


