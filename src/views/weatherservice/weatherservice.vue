<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
    </el-form>
    <el-select
      @change="chagneSelsect"
      @visible-change="visibleChangeSelect"
      v-model="selectValue"
      disabled
      placeholder="请选择"
    >
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>

    <div class="custom-tree-container">
      <div class="block">
        <p>使用 scoped slot</p>
        <el-tree :data="data" node-key="id" default-expand-all>
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ data.label }}</span>
            <span>
              <el-button type="text" size="mini" @click="() => append(data)">Append</el-button>
              <el-button type="text" size="mini" @click="() => remove(node, data)">Delete</el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <el-date-picker v-model="yearMonth" type="month" placeholder="选择月"></el-date-picker>
    <el-date-picker
      @change="handleChangeZhou"
      v-model="zhou"
      type="week"
      format="yyyy 第 WW 周"
      placeholder="选择周"
    ></el-date-picker>
  </div>
</template>

<script>
let id = 1000;
import { validateObj } from "@/utils/validate";
import {
  getYearDate,
  getYearWeek,
  formatDate,
} from "@/utils/data";
export default {
  data() {
    return {
      // data: JSON.parse(JSON.stringify(data)),
      // data: JSON.parse(JSON.stringify(data)),
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      ruleForm: {
        name: "",
      },
      rules: {
        name: [
          {
            required: true,
            validator: validateObj.isNumberFloat,
            trigger: "change",
          },
        ],
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      selectValue: "",
      yearMonth: "",
      zhou: getYearDate(),
      changeZhou:""
    };
  },
  methods: {
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              Append
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              Delete
            </el-button>
          </span>
        </span>
      );
    },
    chagneSelsect(val) {
      debugger;
    },
    visibleChangeSelect(val) {
      debugger;
      if (val) {
        return false;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChangeZhou(val) {
      this.changeZhou = getYearWeek(formatDate(val));
    },
  },
  mounted() {
    this.yearMonth = getYearDate();
    // this.zhou = getYearWeek();
    console.log(1111, getYearDate());
    console.log(222, getYearWeek());
    // console.log(getMonthWeek(getYearDate()));
  },
};
</script>