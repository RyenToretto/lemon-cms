<!--
@file: SingleFileUpload.vue
@createBy: koujianfeng
@description: 单文件上传
 -->
<template>
  <div class="single-file-upload" :class="{ 'is-photo': isPhoto }">
    <div
      v-if="!isPhoto"
      class="lable"
      :class="{ 'has-value': value }"
      @click="$doCopy(value, $event)"
    >
      <el-tooltip
        placement="top"
        :disabled="$attrs['disabled-tooltip'] || !value || !(value.trim && value.trim())"
      >
        <div slot="content">{{ value }}</div>
        <el-input v-if="$attrs.uploading" :disabled="true" placeholder="上传中"></el-input>
        <el-input
          v-else
          v-model="value"
          :disabled="true"
          :placeholder="$attrs.placeholder || '请上传文件'"
        ></el-input>
      </el-tooltip>
    </div>

    <el-upload
      ref="upload"
      action="#"
      :accept="$attrs.accept"
      :disabled="!!$attrs.disabled || $attrs.uploading"
      :on-change="emitFileChange"
      :auto-upload="false"
    >
      <span v-if="isPhoto && value" class="file-header" :class="{ active: $attrs.uploading }">
        <span v-if="value && !$attrs.uploading" class="view-file" @click.stop="$doPreview([value])"
          ><i class="el-icon-view"></i
        ></span>
        <span
          v-if="!$attrs.disabled && (value || $attrs.uploading)"
          class="remove-file"
          @click.stop="$emit('remove')"
        >
          <i :class="$attrs.uploading ? 'el-icon-loading' : 'el-icon-close'"></i>
        </span>
      </span>
      <div v-if="isPhoto" class="photo-box">
        <img v-if="value" :src="value" :title="$attrs['img-title']" alt="" />
        <i v-else class="el-icon-plus icon-uploader"></i>
      </div>
      <el-button
        v-if="!isPhoto && !$attrs.disabled"
        v-loading="$attrs.uploading"
        size="small"
        class="loading-btn"
        type="primary"
        element-loading-spinner="el-icon-loading"
        >{{ $attrs['upload-btn-text'] || '点击上传' }}</el-button
      >
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'SingleFileUpload',
  components: {},
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      default() {
        return ''
      }
    },
    isPhoto: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    emitFileChange(e) {
      this.$refs.upload.clearFiles()
      this.$emit('change', e)
      return false
    }
  }
}
</script>

<style lang="less" scoped>
.single-file-upload {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /deep/.lable {
    padding-right: 10px;
    flex: 1;
    &.has-value .el-input {
      input {
        cursor: copy;
      }
    }
  }
  /deep/.el-upload {
    width: 100%;
    text-align: left;
    .loading-btn {
      .el-loading-mask {
        .el-loading-spinner {
          position: static;
          margin: 0;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
  &.is-photo {
    align-items: flex-start;
    > .label {
      display: none;
    }
    > div {
      /deep/.el-upload-list {
        display: none;
      }
      /deep/.el-upload {
        box-sizing: border-box;
        width: 100px;
        height: 100px;
        border: 1px solid #c0ccda;
        overflow: hidden;
        border-radius: 6px;
        background-color: #eee;
        display: flex;
        justify-content: flex-start;
        align-content: flex-end;
        position: relative;
        > .file-header {
          box-sizing: border-box;
          padding-right: 4px;
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
          &.active {
            display: flex;
            background-color: transparent;
            color: #000;
          }
          > .view-file,
          > .remove-file {
            box-sizing: border-box;
            width: 18px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            &:hover {
              color: #8cc3fa;
            }
          }
        }
        > .photo-box {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          > img {
            max-height: 100%;
          }
          > .icon-uploader {
            font-size: 28px;
            color: #8c939d;
            width: 48px;
            height: 48px;
            line-height: 48px;
            text-align: center;
          }
        }
        &:hover {
          > .file-header {
            display: flex;
          }
        }
      }
    }
  }
}
</style>
