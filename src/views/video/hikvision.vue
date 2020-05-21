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
            <el-form-item label prop>
              <el-button type="primary">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <h3>
        &nbsp;&nbsp;基础信息列表
        <!-- <el-button size="mini" type="primary">导 出</el-button>
        <el-button size="mini" type="success">打 印</el-button>-->
      </h3>
      <div class="video">
        <hikvision-video></hikvision-video>
      </div>
    </el-card>
  </div>
</template>

<script>
import hikvisionVideo from "./components/hikvision_video";
export default {
  name: "hikvision",
  props: {},
  components: {
    hikvisionVideo
  },
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
      }
    };
  },
  methods: {},
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
  .video {
    width: 100%;
    min-height: 65vh;
  }
}
</style>
