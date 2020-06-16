<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row>
        <el-col :span="11">
          <el-form-item label="分类:">
            <el-checkbox-group v-model="flCheckList">
              <el-checkbox :label="item.name" v-for="item in flList" :key="item.name"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item label="服务品种:">
            <el-checkbox-group v-model="fwpzCheckList">
              <el-checkbox label="水稻"></el-checkbox>
              <el-checkbox label="玉米"></el-checkbox>
              <el-checkbox label="小麦"></el-checkbox>
              <el-checkbox label="大豆"></el-checkbox>
              <el-checkbox label="马铃薯"></el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="fwpzCheckList2">
              <el-checkbox label="柑橘"></el-checkbox>
              <el-checkbox label="苹果"></el-checkbox>
              <el-checkbox label="猕猴桃"></el-checkbox>
              <el-checkbox label="葡萄"></el-checkbox>
              <el-checkbox label="红枣"></el-checkbox>
            </el-checkbox-group>
            <!-- <el-checkbox-group v-for="(item,index) in fwpzList" :key="index">
              <el-checkbox v-for="j in item[index]" :key="j.name" :label="j.name"></el-checkbox>
            </el-checkbox-group> -->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "XXX",
  props: {},
  components: {},
  watch: {},
  data() {
    return {
      flCheckList: [],
      flList: [
        {
          label: "1",
          name: "粮棉油糖"
        },
        {
          label: "2",
          name: "果树茶叶"
        },
        {
          label: "3",
          name: "蔬菜花卉"
        },
        {
          label: "4",
          name: "畜牧养殖"
        },
        {
          label: "5",
          name: "渔业养殖"
        }
      ],
      fwpzCheckList: [],
      fwpzList: [
        // 粮棉油糖
        {
          0: [
            {
              label: "1",
              name: "水稻"
            },
            {
              label: "2",
              name: "玉米"
            },
            {
              label: "3",
              name: "大豆"
            },
            {
              label: "4",
              name: "马铃薯"
            }
          ]
        },
        // 果树茶叶
        {
          0: [
            {
              label: "1",
              name: "柑橘"
            },
            {
              label: "2",
              name: "苹果"
            },
            {
              label: "3",
              name: "猕猴桃"
            },
            {
              label: "4",
              name: "葡萄"
            },
            {
              label: "5",
              name: "红枣"
            }
          ]
        }
      ],
      fwpzCheckList2: [],
      formInline: {}
    };
  },
  watch: {
    flCheckList() {}
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style scoped lang='scss'>
</style>
