<template>
  <div class="content">
    <el-card class="box-card">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="活动名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="活动区域" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="即时配送" prop="delivery">
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <h3>
        &nbsp;&nbsp;基础信息列表
        <el-button @click="exportExcel" size="mini" type="primary">导 出</el-button>
        <el-button @click="printExcel('print')" size="mini" type="success">打 印</el-button>
      </h3>
      <!-- style="position:absolute;top:-2000px;" -->
      <div id="print">
        <el-table id="export" :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getLodop } from "@/utils/LodopFuncs";
import { exportExcel } from "@/utils/config";
export default {
  name: "XXX",
  props: {},
  components: {},
  watch: {},
  data() {
    return {
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    // 导出
    exportExcel() {
      exportExcel("export");
    },
    // 打印
    printExcel(id) {
      let str = "";
      let styleArr = document.getElementsByTagName("style");
      for (var i = 0; i < styleArr.length; i++) {
        str += styleArr[i].innerHTML;
      }
      str += `
      .el-table thead{
        color:#606266;
      }
      .el-table th.is-leaf, .el-table td{
        border-right: 1px solid #606266;
      }
      .el-table th.is-leaf, .el-table td{
        border-bottom: 1px solid #606266;
      }
      .el-table--group, .el-table--border{
        border: 1px solid #606266;
      }
      .el-table--group, .el-table--border{
        border-bottom:0px solid #606266;
      }
      .el-table--group::after, .el-table--border::after, .el-table::before{
        background:none;
      }
      .el-table--striped .el-table__body tr.el-table__row--striped td {
          background: none;
      }
      .el-table__header-wrapper tbody td, .el-table__footer-wrapper tbody td {
          background-color: #fff;
          color: #000;
      }
      .el-table__footer-wrapper {
          
      }
      .el-table__footer-wrapper td {
          border-top: 1px solid #606266;
      }
      `;
      var LODOP = null;
      var Html =
        "<head><link rel='stylesheet' href='https://unpkg.com/element-ui/lib/theme-chalk/index.css'><style>" +
        str +
        "</style></head><body>" +
        '<h2 style="text-align:center;margin:10px 0;"></h2>' +
        document.getElementById(id).innerHTML +
        "</body>";
      LODOP = getLodop();
      LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4");
      LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1); //横向时的正向显示
      LODOP.ADD_PRINT_HTM("5%", "1%", "99%", "99%", Html);
      LODOP.SET_PRINT_STYLEA(0, "TableRowThickNess", 50); //数据较多时分页粒度
      LODOP.PREVIEW();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped lang='scss'>
.content {
  h3 {
    height: 42px;
    width: 100%;
    // border-left: 4px solid #000;
    line-height: 42px;
    // font-weight: 500;
    margin: 0;
    background: rgba(237, 244, 245, 1);
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(40, 130, 199, 1);
    line-height: 48px;
  }
}
</style>
