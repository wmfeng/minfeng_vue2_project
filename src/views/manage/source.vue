<template>
    <div class="source">
        <div class="source_tree">
            <el-scrollbar class="page-component__scroll">
                <el-tree :data="treeData" node-key="id" ref="tree" default-expand-all @node-click="nodeClick">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <el-tooltip v-if="node.label.length>8" class="item" effect="dark" :content="node.label" placement="top">
                            <span class="nodeLabel">{{ node.label }}</span>
                        </el-tooltip>
                        <span v-else class="nodeLabel">{{ node.label }}</span>
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
            <el-form :inline="true" :model="formData" label-width="90px" ref="treeForm" class="demo-form-inline" :rules="rules">
                <el-row>
                    <el-col :span="10" :offset="1">
                        <el-form-item label="资源路径" prop="uri">
                            <el-input v-model.trim="formData.uri" placeholder="资源路径"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="3">
                        <el-form-item label="资源名称" prop="pName">
                            <el-input v-model.trim="formData.pName" placeholder="资源名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10" :offset="1">
                        <el-form-item label="资源图标" prop="pIcon">
                            <el-input v-model.trim="formData.pIcon" placeholder="资源图标"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10" :offset="1">
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
import { treeQuery, formSave, treeDel } from "@/api/source";
export default {
    data() {
        return {
            pid: "",
            pureClick: true,
            formData: {},
            treeData: [],
            rules: {
                label: [{ required: true, message: "不能为空" }],
                pIcon: [{ required: true, message: "不能为空" }]
            }
        };
    },
    methods: {
        append(data) {
            this.pid = data.id;
            this.pureClick = false;
            const newChild = { label: "新增节点" };
            data.children.push(newChild);
        },
        appendTj(data) {
            this.pid = data.parentId;
            this.pureClick = false;
            const newChild = { label: "新增节点" };
            if (!data.parentId) {
                this.treeData.push(newChild);
            } else {
                this.treeData.map(t => {
                    if (t.id == data.parentId) {
                        t.children.push(newChild);
                    }
                    return t;
                });
            }
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
            this.$confirm("你确定删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    if (data.id) {
                        treeDel({ id: data.id }).then(res => {
                            let data = res.data;
                            if (data.success) {                             
                                this.$message({
                                    type: "success",
                                    message:data.msg
                                });
                                this.treeQuery();
                                
                            } else {
                                this.$message({
                                    type: "warning",
                                    message:data.msg
                                });
                            }
                        });
                    } else {
                        this.$message({
                            type: "success",
                            message: "删除成功"
                        });
                        this.treeQuery();
                    }
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        nodeClick(data) {
            if (this.pureClick) {
                this.formData = Object.assign({}, data);
            } else {
                this.$refs.treeForm.resetFields();
                delete this.formData.id;
                delete this.formData.children;
                this.pureClick = true;
            }
        },
        treeQuery() {
            treeQuery().then(res => {
                let data = res.data;
                if (data.success) {
                    this.treeData = data.data;
                    this.formData = data.data[0];
                }
            });
        },
        formSave() {
            this.$refs.treeForm.validate(valid => {
                if (valid) {
                    let _this = this;
                    let url = "edit"; //ResponseTree
                    let obj = Object.assign({}, this.formData);
                    obj.label = obj.pName;
                    delete obj.pName;
                    delete obj.parentId;
                    delete obj.permission;
                    if (!obj.id) {
                        url = "add"; //TreeModel
                        obj.pid = this.pid;
                        //delete obj.id;

                        delete obj.parentId;
                    }
                    delete obj.children;
                    formSave(url, obj).then(res => {
                        let data = res.data;
                        if (data.success) {
                            _this.formData = {};
                            _this.treeQuery();
                            _this.$message({
                                message: data.msg,
                                type: "success"
                            });
                            // window.location.reload();
                        } else {
                            _this.$message({
                                message: data.msg,
                                type: "error"
                            });
                        }
                    });
                }
            });
        }
    },
    mounted() {
        this.treeQuery();
        this.$refs.tree.setCheckedKeys([25]);
    }
};
</script>
// <style lang="scss">
// .source {
//     .page-component__scroll{
//         height: 100%;
//         .el-scrollbar__wrap{
//             overflow-x: hidden;
//         }
//     }
// }
// </style>
<style lang="scss" scoped>
.source {
    height: 100%;
    .source_tree {
        float: left;
        width: 300px;
        height: 81vh;
        overflow: auto;
        border-right: 1px dotted #999;
    }
    .nodeLabel {
        width: 126px;
        overflow: hidden;
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .source_form {
        float: left;
        width: calc(100% - 300px);
        height: 100%;
        padding: 20px;
    }
}
</style>
