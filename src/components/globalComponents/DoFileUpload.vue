<!--
@file: DoFileUpload.vue
@createBy: koujianfeng
@description: 文件上传封装 期望数据: [{ url: 'http://mv-res.xdplt.com/sandbox/2020/07/25/EF7C5661EEBE8530768F64E7BAD7482F.jpg' }]
 -->
<template>
  <div class="do-file-upload" :class="[custom, { disabled: $attrs.disabled }]">
    <div class="do-file-upload-wrapper">
      <do-upload
        ref="refDoUpload"
        v-bind="$attrs"
        :action="$attrs['action'] || actionApi"
        :accept="$attrs['accept'] || $MAPS.upload.accept.image"
        :file-list="realFileList"
        :must-photo="mustPhoto"
        :hide-btn="doFileList.length > 0 && +doFileList.length >= +$attrs['limit']"
        @update="doFileUpdate"
      ></do-upload>

      <do-file-list
        v-model="doFileList"
        :enable-remove="!$attrs.disabled"
        :is-all-photo="true"
        :drag="photoDrag"
        @sort-change="handleSortChange"
        @remove="removeFile"
      ></do-file-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DoFileUpload',
  inheritAttrs: true,
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    custom: {
      type: String,
      default() {
        return ''
      }
    },
    photoDrag: {
      type: [String, Boolean],
      default() {
        return false
      }
    },
    mustPhoto: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      realFileList: [],
      doFileList: [],
      doFileMap: {},
      actionApi: '/lemon/api/file/upload'
    }
  },
  methods: {
    init() {
      this.doFileList = []
      if (this.value) {
        this.value.forEach((imageInfo, index) => {
          const newFile = {
            name: this.$utils.filenameByUrl(imageInfo.url, index),
            url: imageInfo.url,
            md5: imageInfo.md5
          }
          this.doFileList.push(newFile)
          this.realFileList.push(newFile)
          this.doFileMap[imageInfo.url] = true
        })
      }
    },
    doFileUpdate({ fail, fileList }) {
      if (fail) {
        this.doFileList = []
        let i = 0
        for (const [url, isExist] of Object.entries(this.doFileMap)) {
          if (isExist) {
            const newImage = {
              name: this.$utils.filenameByUrl(url, i),
              url,
              md5: url
            }
            this.doFileList.push(newImage)
            this.value.push(newImage)
            i++
          }
        }
        this.$emit('update')
        return
      }
      if (!fileList.every((i) => i.status === 'success')) {
        return
      }
      this.doFileMap = {}
      const newArr = []
      fileList.forEach((item, index) => {
        if (item && item.response && item.response.result && item.response.result.url) {
          this.doFileMap[item.response.result.url] = true
          newArr.push({
            name: this.$utils.filenameByUrl(item.response.result.url, index),
            url: item.response.result.url,
            md5: item.response.result.url
          })
        } else if (item.url && !item.url.startsWith('blob')) {
          this.doFileMap[item.url] = true
          newArr.push({
            name: this.$utils.filenameByUrl(item.url, index),
            url: item.url,
            md5: item.url
          })
        }
      })
      this.doFileList = newArr
      this.realFileList = newArr
      this.$emit('change', this.doFileList)
      this.$emit('update')
    },
    removeFile(fileInfo) {
      delete this.doFileMap[fileInfo.url]
      const i = this.doFileList.findIndex((item) => item.url === fileInfo.url)
      this.doFileList.splice(i, 1)
      this.realFileList = this.doFileList
      this.$emit('change', this.doFileList)
      this.$emit('update')
    },
    handleSortChange() {
      this.$emit('change', this.doFileList)
    }
  }
}
</script>

<style lang="less" scoped>
@ico-width: 40px;

.do-file-upload {
  box-sizing: border-box;
  width: 100%;
  color: #909399;
  font-size: 14px;
  .do-file-upload-wrapper {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    /deep/.do-upload-box {
      box-sizing: border-box;
      margin-right: 8px;
      width: 148px;
    }
    .do-files {
      flex: 1;
    }
  }
  &.vertical {
    /deep/.do-file-upload-wrapper {
      .do-file-list {
        flex-wrap: nowrap;
        flex-direction: column;
        .do-file-item {
          margin: 0 0 8px;
          width: 100%;
          > .el-image {
            flex: 1;
          }
        }
      }
    }
  }
}
</style>
