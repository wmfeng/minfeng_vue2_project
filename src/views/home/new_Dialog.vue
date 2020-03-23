<template>
  <el-dialog title="11111111111" :visible.sync="newModalToggle" width="650px" :before-close="roleClose">
    <el-form ref="shForm" label-width="80px">
      <el-row type="flex" justify="space-between">
        <el-col :span="24">
          <el-form-item label="审核意见"></el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer" style="margin-top:-25px;">
      <el-button size="small" @click="close">取 消{{data333}}</el-button>
      <el-button size="small" type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      newModalToggle: false
    };
  },
  props: {
    newModal: Boolean,
    data333: Number
  },
  watch: {
    data(val) {
      debugger;
    },
    newModal(val) {
      this.newModalToggle = val;
    }
  },
  methods: {
    close() {
      this.newModalToggle = false;
      this.$emit("newToggle", this.newModalToggle);
    },
    roleClose() {
      this.close();
    }
  }
};
</script>