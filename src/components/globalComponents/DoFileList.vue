<!--
@file: DoFileList.vue
@createBy: koujianfeng
@description: 文件预览下载封装 期望数据: [{ url: 'http://mv-res.xdplt.com/sandbox/2020/07/25/EF7C5661EEBE8530768F64E7BAD7482F.jpg' }]
 -->
<template>
  <div v-if="value && value.length" class="do-file-list">
    <p v-if="normalFile && normalFile.length" class="file-tips normal-file-tips">普通文件：</p>
    <template v-for="(fileInfo, key) in normalFile">
      <div :key="'file_' + key + fileInfo.name" class="do-file-item normal-file">
        <div class="do-upload-file-left">
          <span class="do-upload-file-icon"><i class="el-icon-document"></i></span>
          <span class="do-upload-file-name">{{ fileInfo.name }}</span>
        </div>
        <div class="do-upload-file-right">
          <span class="do-upload-file-preview" @click.stop="previewFile(fileInfo)"
            ><i class="el-icon-view"></i
          ></span>
          <!-- <span class="do-upload-file-preview" @click.stop="previewFile(fileInfo, true)"><i class="el-icon-download"></i></span> -->
          <span class="do-upload-file-remove" @click.stop="doFileRemove(fileInfo)"
            ><i class="el-icon-close"></i
          ></span>
        </div>
      </div>
    </template>

    <p v-if="normalFile && videoFile.length" class="file-tips video-file-tips">视频文件：</p>
    <template v-for="(fileInfo, key) in videoFile">
      <div :key="'video_' + key + fileInfo.name" class="do-file-item video-file">
        <video :src="fileInfo.url" class="video" preload="metaData"></video>

        <span class="do-video-download">
          <span class="do-video-btn do-video-download-btn" @click.stop="doFileDownload(fileInfo)"
            ><i class="el-icon-view"></i
          ></span>
          <span
            v-if="$attrs['enable-remove']"
            class="do-video-btn do-video-remove-btn"
            @click.stop="doFileRemove(fileInfo)"
            ><i class="el-icon-close"></i
          ></span>
        </span>
      </div>
    </template>

    <p
      v-if="!isAllPhoto && normalFile && photoFile.length"
      class="file-tips image-file-tips"
      :class="{ 'can-drag': canDrag }"
    >
      图片文件：
    </p>
    <template v-if="canDrag && isAllPhoto">
      <draggable
        class="drag-box"
        :list="value"
        handle=".tag"
        filter=".ignore"
        :disabled="false"
        @change="handleDragSort"
      >
        <template v-for="(fileInfo, key) in value">
          <div :key="'photo_' + key + fileInfo.name" class="do-file-item photo-file tag">
            <el-image :src="fileInfo.url"></el-image>
            <span class="do-file-download">
              <span
                class="do-file-btn do-file-download-btn"
                @click.stop="doFileDownload(fileInfo, false, true, key)"
                ><i class="el-icon-view"></i
              ></span>
              <span
                v-if="$attrs['enable-remove']"
                class="do-file-btn do-file-remove-btn"
                @click.stop="doFileRemove(fileInfo)"
                ><i class="el-icon-close"></i
              ></span>
              <!-- <span class="do-file-btn do-file-download-btn" @click.stop="doFileDownload(fileInfo, true)"><i class="el-icon-download"></i></span>-->
            </span>
          </div>
        </template>
      </draggable>
    </template>
    <template v-else>
      <template v-for="(fileInfo, key) in photoFile">
        <div :key="'photo_' + key + fileInfo.name" class="do-file-item photo-file">
          <el-image :src="fileInfo.url"></el-image>
          <span class="do-file-download">
            <span
              class="do-file-btn do-file-download-btn"
              @click.stop="doFileDownload(fileInfo, false, true)"
              ><i class="el-icon-view"></i
            ></span>
            <span
              v-if="$attrs['enable-remove']"
              class="do-file-btn do-file-remove-btn"
              @click.stop="doFileRemove(fileInfo)"
              ><i class="el-icon-close"></i
            ></span>
            <!-- <span class="do-file-btn do-file-download-btn" @click.stop="doFileDownload(fileInfo, true)"><i class="el-icon-download"></i></span>-->
          </span>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
// const suffix = '(bmp|jpg|png|tif|gif|pcx|tga|exif|fpx|svg|psd|cdr|pcd|dxf|ufo|eps|ai|raw|WMF|webp|jpeg)'
// const photoRE = new RegExp(`.*.${suffix}`)
const photoRE = /.*\.(gif|svg|jpg|jpeg|png|bmp)$/i
const videoRE = /.*\.(mp4|rmvb|flv|mpeg|avi|swf|mov|wav|3gp)$/i

export default {
  name: 'DoFileList',
  components: {
    draggable
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      default: ''
    },
    isAllPhoto: {
      type: Boolean,
      default() {
        return true
      }
    },
    drag: {
      type: [String, Boolean],
      default() {
        return false
      }
    }
  },
  computed: {
    canDrag() {
      return this.$utils.booleanPropComputed(this.drag)
    },
    photoFile() {
      if (!this.value || !this.value.length) {
        return []
      }
      if (this.isAllPhoto) {
        return this.value
      }
      return this.value.filter(
        (item) => item.url && photoRE.test(item.url) && !videoRE.test(item.url)
      )
    },
    videoFile() {
      if (!this.value || !this.value.length) {
        return []
      }
      if (this.isAllPhoto) {
        return []
      }
      return this.value.filter(
        (item) => item.url && !photoRE.test(item.url) && videoRE.test(item.url)
      )
    },
    normalFile() {
      if (!this.value || !this.value.length) {
        return []
      }
      if (this.isAllPhoto) {
        return []
      }
      return this.value.filter(
        (item) => item.url && !photoRE.test(item.url) && !videoRE.test(item.url)
      )
    }
  },
  methods: {
    previewFile(fileInfo, isDownload = false) {
      if (isDownload) {
        return this.$utils.doDownload(fileInfo.url)
      }
      this.$utils.openFileUrl(fileInfo.url, isDownload, () => {
        this.$message.warning('下载失败：跨域')
      })
    },
    async doFileDownload(fileInfo, isDownload = false, isImagePreview = false, fileIndex) {
      if (isImagePreview) {
        if (this.value && this.value.length >= 2) {
          return this.$doPreview(this.$utils.doImageToStringArray(this.value), fileIndex)
        } else {
          return this.$doPreview([fileInfo.url])
        }
      }
      if (isDownload) {
        return this.$utils.doDownload(fileInfo.url)
      }
      this.$utils.openFileUrl(fileInfo.url, isDownload, () => {
        this.$message.warning('下载失败：跨域')
      })
    },
    doFileRemove(fileInfo) {
      this.$emit('remove', fileInfo)
    },
    handleDragSort() {
      this.$emit('sort-change')
    }
  }
}
</script>

<style lang="less" scoped>
.do-file-list {
  box-sizing: border-box;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  .file-tips {
    box-sizing: border-box;
    margin-top: 8px;
    width: 100%;
    &:first-child {
      margin-top: 0;
    }
  }
  /deep/.do-file-item {
    box-sizing: border-box;
    &.video-file {
      margin-right: 8px;
      margin-bottom: 8px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      position: relative;
      &:last-child {
        margin-right: 0;
      }
      .do-video {
        box-sizing: border-box;
        width: 146px;
        height: 146px;
        background-color: #eee;
        display: flex;
        justify-content: center;
        align-items: center;
        > img {
          width: auto;
          height: 100%;
        }
      }
      .do-video-download {
        box-sizing: border-box;
        width: 100%;
        height: 24px;
        background-color: rgba(0, 0, 0, 0.4);
        color: #fff;
        line-height: 24px;
        font-size: 12px;
        display: none;
        justify-content: flex-end;
        align-items: center;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 9;
        .do-video-btn {
          margin-right: 8px;
          cursor: pointer;
        }
      }
      &:hover {
        .do-video-download {
          display: flex;
        }
      }
    }
    &.photo-file {
      margin-right: 8px;
      margin-bottom: 8px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      position: relative;
      &:last-child {
        margin-right: 0;
      }
      .el-image {
        box-sizing: border-box;
        width: 146px;
        height: 146px;
        border: 1px solid #c0ccda;
        border-radius: 6px;
        background-color: #eee;
        display: flex;
        justify-content: center;
        align-items: center;
        > img {
          width: auto;
          height: 100%;
        }
      }
      .do-file-download {
        box-sizing: border-box;
        width: 100%;
        height: 24px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        background-color: rgba(0, 0, 0, 0.4);
        color: #fff;
        line-height: 24px;
        font-size: 12px;
        display: none;
        justify-content: flex-end;
        align-items: center;
        position: absolute;
        top: 0;
        right: 0;
        .do-file-btn {
          margin-right: 8px;
          cursor: pointer;
        }
      }
      &:hover {
        .do-file-download {
          display: flex;
        }
      }
    }
    &.normal-file {
      box-sizing: border-box;
      margin-right: 8px;
      margin-bottom: 8px;
      padding: 0 8px;
      width: 100%;
      list-style: none;
      outline: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:hover {
        background-color: #eee;
      }
      .do-upload-file-left {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .do-upload-file-icon {
          box-sizing: border-box;
          margin-right: 8px;
        }
        .do-upload-file-name {
          box-sizing: border-box;
          line-height: 1.5;
        }
      }
      .do-upload-file-right {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .do-upload-file-preview {
          box-sizing: border-box;
          margin-right: 8px;
          cursor: pointer;
        }
        .do-upload-file-remove {
          box-sizing: border-box;
          cursor: pointer;
        }
      }
    }
  }
  > .drag-box {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    .sortable-chosen {
      cursor: move;
      &.sortable-ghost {
        opacity: 0.3;
      }
      .el-image {
        border-style: dashed;
        border-color: #f56c6c;
        background-color: #d3d3d3;
      }
      .do-file-download {
        display: none;
      }
    }
  }
}
</style>
