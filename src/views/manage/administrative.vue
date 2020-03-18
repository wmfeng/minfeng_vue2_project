<template>
  <div class="adminis">
    <div class="source_tree">
      <el-scrollbar class="page-component__scroll">
        <el-tree
          :data="treeData"
          node-key="id"
          ref="tree"
          :default-expand-all="false"
          @node-click="nodeClick"
          :expand-on-click-node="false"
          :default-expanded-keys="expandKeys"
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
            <span>
              <i class="el-icon-plus" @click="() => append(data)"></i>

              <i class="el-icon-delete" @click="() => remove(node, data)"></i>
            </span>
          </span>
        </el-tree>
      </el-scrollbar>
    </div>
    <div class="source_form">
      <el-form
        :inline="true"
        :model="formData"
        label-width="120px"
        ref="treeForm"
        class="demo-form-inline"
        :rules="rules"
      >
        <el-row>
          <el-col :span="12" :offset="2">
            <el-form-item label="行政区划名称" prop="name">
              <el-input v-model="formData.name" placeholder="行政区划名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="2">
            <el-form-item label="行政区划编码" prop="bm">
              <el-input v-model.number="formData.bm" placeholder="行政区划编码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="2">
            <el-form-item label="备注" prop="bz">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5}"
                v-model="formData.bz"
                placeholder="备注"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" :offset="5">
            <el-form-item label="." class="none">
              <el-button type="primary" @click="formSave">确定</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import { treeQuery, formSave, deleteTree } from "@/api/administrative";
export default {
  data() {
    return {
      pid: "",
      pureClick: true,
      formData: {},
      treeData: [],
      expandKeys: [],
      formBm: "",
      rules: {
        bm: [{ required: true, message: "编码不能为空" }],
        name: [{ required: true, message: "不能为空" }]
      }
    };
  },
  methods: {
    append(data) {
      this.pid = data.bm;
      this.formBm = data.bm;
      this.formData.bm = data.bm;
      this.pureClick = false;
      const newChild = { label: "新增节点", bm: Number(data.bm) };
      data.children.push(newChild);
    },
    remove(node, data) {
      this.pureClick = false;
      // const parent = node.parent;
      // const children = parent.data.children || parent.data;
      // const index = children.findIndex(d => d.id === data.id);
      // children.splice(index, 1);
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
            deleteTree({ bm: data.bm }).then(res => {
              let data = res.data;
              if (data.success) {
                this.$message({
                  type: "success",
                  message: data.msg
                });
                this.treeQuery();
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
          message: "删除成功!"
        });
        this.treeQuery();
      }
    },
    nodeClick(data) {
      this.$refs.treeForm.resetFields();
      data.bm = Number(data.bm);
      if (this.pureClick) {
        this.formData = Object.assign({}, data);
      } else {
        this.formData = {};
        this.formData.bm = Number(this.formBm);
        // delete this.formData.id;
        // delete this.formData.label;
        // delete this.formData.children;
        this.pureClick = true;
      }
    },
    treeQuery() {
      let obj = this.$store.state.user.user.uUser.xzqh;
      treeQuery({ bm: obj }).then(res => {
        let data = res.data;
        if (data.success) {
          this.treeData = data.data;
          this.expandKeys = [this.treeData.length ? this.treeData[0].id : ""];
          this.formData = Object.assign({}, data.data[0]);
          this.$refs.treeForm.resetFields();
        }
      });
    },
    formSave() {
      this.$refs.treeForm.validate(valid => {
        if (valid) {
          let _this = this;
          let url = "update";
          let obj = Object.assign({}, this.formData);
          if (!obj.id) {
            url = "add";
            obj.parentId = this.pid;
          }
          if ((obj.parentId + "").length == 14) {
            this.$message({
              showClose: true,
              message: "小组不允许再添加下级",
              duration: 4000,
              type: "error"
            });
            return;
          }
          if (
            obj.parentId !=
              (obj.bm + "").substring(0, (obj.parentId + "").length) ||
            ((obj.parentId + "").length < 6 &&
              (obj.bm + "").length != (obj.parentId + "").length + 2)
          ) {
            this.$message({
              showClose: true,
              message: "请输入正确的行政区划编码",
              duration: 4000,
              type: "error"
            });
            return;
          }
          if (
            6 <= (obj.parentId + "").length &&
            (obj.parentId + "").length < 12
          ) {
            if ((obj.bm + "").length != (obj.parentId + "").length + 3) {
              this.$message({
                showClose: true,
                message: "请输入正确的行政区划编码",
                duration: 4000,
                type: "error"
              });
              return;
            }
          }
          if ((obj.parentId + "").length >= 12) {
            if ((obj.bm + "").length != (obj.parentId + "").length + 2) {
              this.$message({
                showClose: true,
                message: "请输入正确的行政区划编码",
                duration: 4000,
                type: "error"
              });
              return;
            }
          }

          formSave(url, obj).then(res => {
            let data = res.data;
            if (data.success) {
              _this.formData = {};
              _this.treeQuery();
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
        }
      });
    }
  },
  mounted() {
    this.treeQuery();
    // this.$refs.tree.setCheckedKeys([14]);
  }
};
</script>
<style lang="scss" scoped>
.adminis {
  height: 100%;
  .source_tree {
    float: left;
    width: 300px;
    height: 100%;
    height: 81vh;
    overflow: auto;
    border-right: 1px dotted #999;
  }
  .source_form {
    float: left;
    width: calc(100% - 300px);
    height: 100%;
    padding: 20px;
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
