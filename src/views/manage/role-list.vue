<template>
  <div class="role-list">
    <el-table :data="roleTable" stripe border style="width: 100%" @selection-change="handleSelectionChange">>
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index" label="序号" width="80" :index="indexMethod"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="remark" label="角色描述" show-overflow-tooltip></el-table-column>
    </el-table>
    <el-pagination layout="total,prev, pager, next" :total="totalCount" class="fr mar10" @current-change="currentPage" :current-page.sync="pageNo" :page-size="pageSize"></el-pagination>
  </div>
</template>
<script>
import { roleSearchPage } from "@/api/role";
export default {
    data() {
        return {
            roleTable: [],
            pageSize: 10,
            pageNo: 1,
            totalCount: 0
        };
    },
    props: {
        roleTab: 0
    },
    methods: {
        handleSelectionChange(val) {
            this.$emit("checkboxChange", val);
        },
        currentPage(val) {
            this.pageNo = val;
            this.roleList(this.pageSize, this.pageNo);
        },
        indexMethod(index) {
            let start = (this.pageNo - 1) * this.pageSize;
            return start + index + 1;
        },
        roleList(pageSize, pageNo) {
            roleSearchPage(pageSize, pageNo).then(res => {
                let data = res.data;
                if (data.success) {
                    this.roleTable = data.data.data;
                    this.totalCount = data.data.totalCount;
                }else{
                    this.roleTable = [];
                    this.totalCount = 0;
                    this.$message({
                        type: "error",
                        message: data.msg
                    });
                }
            });
        }
    },
    mounted() {
        this.roleList(this.pageSize, this.pageNo);
    },
    watch: {
        roleTab(val) {
            this.roleList(this.pageSize, this.pageNo);
        }
    }
};
</script>

<style lang="scss">
.role-list {
    th,
    td {
        text-align: center;
    }
}

</style>


