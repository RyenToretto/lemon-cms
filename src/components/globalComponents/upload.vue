<!--
@file: upload.vue
@createBy: lufei
@description: 上传组件
 -->
<template>
  <div class="do-upload">
    <slot :file-list="fileList"></slot>
    <el-upload
      ref="uploader"
      class=""
      v-bind="$attrs"
      :headers="headers"
      :action="$attrs.action || '/lemon/api/file/upload'"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-change="handleChange"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :disabled="!isNowUpload"
      v-on="$listeners"
    >
      <slot name="trigger">
        <el-button size="small" type="primary">点击上传</el-button>
      </slot>
      <div slot="tip" class="el-upload__tip"></div>
    </el-upload>
  </div>
</template>

<script>
// import api from '@/api/_sample'
import Vue from 'vue'
import errorList from '@/plugins/axios/errorList'
export default {
  name: 'DoUpload',
  components: {},
  inject: ['elForm', 'elFormItem'],
  props: {
    value: {}
  },
  data() {
    const token = localStorage.getItem('token')
    return {
      headers: {
        Authorization: token
      },
      fileList: [],
      isNowUpload: true, // 是否可以上传
      only: true
    }
  },
  watch: {
    // value: {
    //   handler (val) {
    //     this.fileList = this.$utils.deepClone(val)
    //   },
    //   immediate: true
    // }
  },

  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    handleRemove(file, fileList) {
      this.syncModel(fileList)
    },
    handlePreview(file) {},
    handleChange(file) {
      if (this.only) {
        //  只加载一次
        Vue.prototype.$abort = () => {
          this.$refs.uploader.abort(file)
          this.$refs.uploader.clearFiles()
          this.isNowUpload = true
          this.only = false
        }
      }
      if (file.status === 'success' || file.status === 'file') {
        // 上成功或者失败
        this.isNowUpload = true
      } else {
        // 上传中
        this.isNowUpload = false
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleSuccess(response, file, fileList) {
      if (response.ret === 200) {
        this.$emit('input', (response.result && response.result.url) || '')
        this.$message({ type: 'success', message: '上传成功' })
      } else {
        let errorMsg = `${file.name}上传失败，错误码:${response.ret}`
        if (response.ret && String(response.ret) in errorList) {
          errorMsg = errorList[String(response.ret)]
        }
        this.isNowUpload = true
        this.$message({
          type: 'error',
          message: errorMsg
        })
      }
      const uploadFiles = fileList
      const index = uploadFiles.findIndex((v) => v === file)
      uploadFiles.splice(index, 1)
      this.validFormItem()
    },
    handleError(err, file, fileList) {
      let errorMsg = `${file.name} 上传失败 ${err.ret ? '错误码:' + err.ret : ''}`
      if (err.ret && String(err.ret) in errorList) {
        errorMsg = errorList[String(err.ret)]
      }
      this.isNowUpload = true
      this.$message({
        type: 'error',
        message: errorMsg
      })
    },
    syncModel(fileList) {
      let data = fileList
      if (this.$attrs.format && typeof this.$attrs.format === 'function') {
        data = this.$attrs.format.call(null, fileList)
      }
      // this.fileList = fileList
      this.$emit('input', data)
    },
    validFormItem() {
      if (this.elForm && this.elFormItem) {
        const field = this.elFormItem?.prop
        field && this.elForm.validateField(field)
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
