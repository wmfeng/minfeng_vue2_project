<template>
  <div>
    <el-upload
      :action="fullAction"
      multiple
      :file-list="fileList"
      :list-type="picture?'picture-card':'text'"
      :before-remove="beforeRemove"
      :on-remove="handleRemove"
      :on-progress="handleProgress"
      :on-success="handleSuccess"
      :on-error="handleError"
    >
      <el-button v-if="!picture" icon="el-icon-upload" size="small" type="primary">{{text}}</el-button>
      <i v-if="picture" slot="default" class="el-icon-plus"></i>
      <div v-if="picture" slot="file" slot-scope="{file}">
        <img class="el-upload-list__item-thumbnail" :src="file.url">
        <span class="el-upload-list__item-actions">
          <i class="el-icon-zoom-in" @click="handlePreview(file)"></i>
          <i class="el-icon-download" @click="handleDownload(file)"></i>
          <i class="el-icon-delete" @click="handleRemoveImg(file)"></i>
        </span>
      </div>
    </el-upload>
    <viewer :images="fileList" @inited="inited">
      <img style="display:none" v-for="(item,index) in fileList" :src="item.url" :key="index">
    </viewer>
  </div>
</template>
<script>
export default {
  name: "file-upload",
  data() {
    return {
      fullAction: "",
      fileList: [],
      loading: "",
      baseUrl: process.env.VUE_APP_DOWNLOAD_URL,
      viewer: ""
    };
  },
  props: {
    action: "",
    text: {
      default: "点击上传"
    },
    picture: Boolean,
    value: {
      default: () => []
    }
  },
  watch: {
    value(val) {
      let arr = JSON.parse(JSON.stringify(val));
      this.fileList = arr.map(v => {
        v.url = this.baseUrl + v.url;
        return v;
      });
    }
  },
  methods: {
    inited(viewer) {
      this.viewer = viewer;
    },
    handlePreview(file) {
      this.viewer.view(this.fileList.findIndex(f => f.url == file.url));
    },
    handleDownload(file) {
      window.open(this.baseUrl + file.url);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRemove(file, fileList) {
      let _this = this;
      let arr = fileList.slice();
      arr.map(s => {
        s.url = s.url.replace(_this.baseUrl, "");
      });
      this.$emit("input", arr);
    },
    handleRemoveImg(file) {
      this.$confirm(`确定移除 ${file.name}？`).then(() => {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        let arr = this.fileList.filter(f => f.url != file.url);
        arr.map(s => {
          s.url = s.url.replace(this.baseUrl, "");
        });
        this.$emit("input", arr);
      });
    },
    handleProgress() {
      this.loading = this.$loading({
        lock: true,
        text: "文件上传中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
    },
    handleSuccess(res, file, fileList) {
      this.loading.close();
      if (res.success) {
        this.$message({
          message: "上传成功",
          type: "success"
        });
      } else {
        this.$message({
          message: res.msg || "上传失败"
        });
        fileList.splice(fileList.length - 1, 1);
        return;
      }
      let arr = fileList.slice();
      let obj = {};
      obj.url = res.msg;
      obj.name = file.name;
      arr.splice(arr.indexOf(file), 1, obj);
      arr.map(s => {
        s.url = s.url.replace(this.baseUrl, "");
      });
      this.$emit("input", arr);
    },
    handleError(err, file, fileList) {
      this.loading.close();
      // fileList.splice(fileList.length - 1, 1);
      this.$message.error("上传失败");
    }
  },
  mounted() {
    this.fullAction = process.env.VUE_APP_BASE_URL + this.action;
    this.fileList = JSON.parse(JSON.stringify(this.value));
  }
};
</script>
